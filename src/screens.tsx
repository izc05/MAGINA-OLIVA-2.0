import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { areaHa, LngLat, validCadastralRef } from './geo';
import MapDraw from './MapDraw';
import { useStore } from './store';
import { color, space } from './theme';
import { Button, Card, Field } from './ui';

const ha = (n: number) => `${n.toLocaleString('es-ES', { maximumFractionDigits: 2 })} ha`;

export function SignIn() {
  const { signIn } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (!name.trim()) return setError('Escribe tu nombre.');
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError('Revisa el correo electrónico.');
    signIn({ name: name.trim(), email: email.trim() });
  };

  return (
    <View style={s.signIn}>
      <Text style={s.brand}>Mágina Oliva</Text>
      <Text style={s.lead}>Tu olivar, campaña a campaña.</Text>
      <Card>
        <Field label="Nombre" value={name} onChangeText={setName} autoComplete="name" />
        <Field label="Correo electrónico" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoComplete="email" error={error} />
        <Button label="Entrar" onPress={submit} />
        <Text style={s.note}>Versión de desarrollo: sin contraseña y con los datos guardados solo en este dispositivo.</Text>
      </Card>
    </View>
  );
}

export function Dashboard({ onAdd, onFarms }: { onAdd: () => void; onFarms: () => void }) {
  const { user, farms } = useStore();
  const total = farms.reduce((sum, f) => sum + f.hectares, 0);
  return (
    <View style={s.stack}>
      <Text style={s.h1}>Hola, {user?.name}</Text>
      <View style={s.row}>
        <View style={s.grow}><Card><Text style={s.big}>{farms.length}</Text><Text style={s.muted}>{farms.length === 1 ? 'finca' : 'fincas'}</Text></Card></View>
        <View style={s.grow}><Card><Text style={s.big}>{ha(total)}</Text><Text style={s.muted}>de olivar dibujadas</Text></Card></View>
      </View>
      {farms.length === 0 ? (
        <Card>
          <Text style={s.h2}>Empieza por tu primera finca</Text>
          <Text style={s.muted}>Dibuja sus lindes sobre el mapa y la superficie se calcula sola.</Text>
          <Button label="Añadir finca" onPress={onAdd} />
        </Card>
      ) : (
        <Button label="Ver mis fincas" onPress={onFarms} />
      )}
      <Card>
        <Text style={s.h2}>Clima y agenda</Text>
        <Text style={s.muted}>Aún sin conectar. El proveedor de clima está pendiente de decidir.</Text>
      </Card>
    </View>
  );
}

export function Farms({ onAdd }: { onAdd: () => void }) {
  const { farms, removeFarm } = useStore();
  return (
    <View style={s.stack}>
      <View style={s.between}>
        <Text style={s.h1}>Mis fincas</Text>
        <Button label="Añadir finca" onPress={onAdd} />
      </View>
      {farms.length === 0 && <Text style={s.muted}>Todavía no hay fincas.</Text>}
      {farms.map((f) => (
        <Card key={f.id}>
          <Text style={s.h2}>{f.name}</Text>
          <Text style={s.muted}>{[f.municipality, f.variety, ha(f.hectares)].filter(Boolean).join(' · ')}</Text>
          {!!f.cadastralRef && <Text style={s.muted}>Ref. catastral: {f.cadastralRef}</Text>}
          <Button ghost label="Eliminar" onPress={() => removeFarm(f.id)} />
        </Card>
      ))}
    </View>
  );
}

export function NewFarm({ onDone }: { onDone: () => void }) {
  const { addFarm } = useStore();
  const [name, setName] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [variety, setVariety] = useState('');
  const [cadastralRef, setCadastralRef] = useState('');
  const [points, setPoints] = useState<LngLat[]>([]);
  const [errors, setErrors] = useState<{ name?: string; ref?: string; map?: string }>({});
  const hectares = areaHa(points);

  const save = () => {
    const ref = cadastralRef.trim().toUpperCase();
    const next = {
      name: name.trim() ? undefined : 'Ponle un nombre a la finca.',
      ref: !ref || validCadastralRef(ref) ? undefined : 'Debe tener 14 o 20 letras y números.',
      map: points.length >= 3 ? undefined : 'Marca al menos tres puntos en el mapa.',
    };
    setErrors(next);
    if (next.name || next.ref || next.map) return;
    addFarm({ name: name.trim(), municipality: municipality.trim(), variety: variety.trim(), cadastralRef: ref, points, hectares });
    onDone();
  };

  return (
    <View style={s.stack}>
      <Text style={s.h1}>Nueva finca</Text>
      <Text style={s.muted}>Haz clic en cada esquina de la finca.</Text>
      <MapDraw points={points} onChange={setPoints} />
      <View style={s.between}>
        <Text style={s.h2}>{ha(hectares)}</Text>
        <View style={s.row}>
          <Button ghost label="Deshacer" disabled={!points.length} onPress={() => setPoints(points.slice(0, -1))} />
          <Button ghost label="Borrar" disabled={!points.length} onPress={() => setPoints([])} />
        </View>
      </View>
      {!!errors.map && <Text style={s.error}>{errors.map}</Text>}
      <Field label="Nombre de la finca" value={name} onChangeText={setName} error={errors.name} />
      <Field label="Municipio" value={municipality} onChangeText={setMunicipality} />
      <Field label="Variedad" value={variety} onChangeText={setVariety} />
      <Field label="Referencia catastral (opcional)" value={cadastralRef} onChangeText={setCadastralRef} autoCapitalize="characters" error={errors.ref} />
      <Button label="Guardar finca" onPress={save} />
      <Button ghost label="Cancelar" onPress={onDone} />
    </View>
  );
}

const s = StyleSheet.create({
  signIn: { flexGrow: 1, justifyContent: 'center', gap: space.m, width: '100%', maxWidth: 420, alignSelf: 'center', padding: space.m },
  brand: { fontSize: 38, fontWeight: '800', color: color.accent },
  lead: { fontSize: 18, color: color.ink },
  note: { color: color.muted, fontSize: 13 },
  stack: { gap: space.m },
  row: { flexDirection: 'row', gap: space.s },
  grow: { flex: 1 },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space.s, flexWrap: 'wrap' },
  h1: { fontSize: 28, fontWeight: '800', color: color.ink },
  h2: { fontSize: 18, fontWeight: '700', color: color.ink },
  big: { fontSize: 26, fontWeight: '800', color: color.accent },
  muted: { color: color.muted, fontSize: 15 },
  error: { color: color.danger, fontSize: 13 },
});
