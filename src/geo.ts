export type LngLat = [number, number];

const EARTH_RADIUS_M = 6371008.8;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Superficie de un polígono sin cerrar sobre la esfera, en hectáreas. */
export function areaHa(points: LngLat[]): number {
  if (points.length < 3) return 0;
  let sum = 0;
  points.forEach((p, i) => {
    const prev = points[(i + points.length - 1) % points.length];
    const next = points[(i + 1) % points.length];
    sum += (rad(next[0]) - rad(prev[0])) * Math.sin(rad(p[1]));
  });
  return Math.abs((sum * EARTH_RADIUS_M * EARTH_RADIUS_M) / 2) / 10000;
}

/** Formato de referencia catastral: 14 o 20 caracteres alfanuméricos. Solo comprueba la forma. */
export function validCadastralRef(value: string): boolean {
  return /^[0-9A-Z]{14}([0-9A-Z]{6})?$/.test(value.trim().toUpperCase());
}
