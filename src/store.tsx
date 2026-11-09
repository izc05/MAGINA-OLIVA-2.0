import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { LngLat } from './geo';

export type Farm = {
  id: string;
  name: string;
  municipality: string;
  variety: string;
  cadastralRef: string;
  points: LngLat[];
  hectares: number;
  createdAt: string;
};

export type User = { name: string; email: string };
type Data = { user: User | null; farms: Farm[] };

const KEY = 'magina-oliva/v1';
const EMPTY: Data = { user: null, farms: [] };

type Store = Data & {
  ready: boolean;
  signIn: (user: User) => void;
  signOut: () => void;
  addFarm: (farm: Omit<Farm, 'id' | 'createdAt'>) => void;
  removeFarm: (id: string) => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Data>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => raw && setData({ ...EMPTY, ...JSON.parse(raw) }))
      .catch((e) => console.warn('No se pudieron leer los datos locales', e))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) {
      AsyncStorage.setItem(KEY, JSON.stringify(data)).catch((e) =>
        console.warn('No se pudieron guardar los datos locales', e),
      );
    }
  }, [data, ready]);

  const value = useMemo<Store>(
    () => ({
      ...data,
      ready,
      signIn: (user) => setData((d) => ({ ...d, user })),
      signOut: () => setData((d) => ({ ...d, user: null })),
      addFarm: (farm) =>
        setData((d) => ({
          ...d,
          farms: [
            ...d.farms,
            { ...farm, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, createdAt: new Date().toISOString() },
          ],
        })),
      removeFarm: (id) => setData((d) => ({ ...d, farms: d.farms.filter((f) => f.id !== id) })),
    }),
    [data, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const store = useContext(Ctx);
  if (!store) throw new Error('useStore debe usarse dentro de StoreProvider');
  return store;
}
