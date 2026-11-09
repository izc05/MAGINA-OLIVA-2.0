import { Text, View } from 'react-native';
import { LngLat } from './geo';
import { color, radius } from './theme';

export type MapDrawProps = { points: LngLat[]; onChange: (points: LngLat[]) => void };

/** El dibujo en mapa está implementado solo en web (MapDraw.web.tsx). */
export default function MapDraw(_: MapDrawProps) {
  return (
    <View style={{ height: 180, alignItems: 'center', justifyContent: 'center', backgroundColor: color.line, borderRadius: radius, padding: 16 }}>
      <Text style={{ color: color.ink, textAlign: 'center' }}>El dibujo de parcelas de momento solo está disponible en la versión web.</Text>
    </View>
  );
}
