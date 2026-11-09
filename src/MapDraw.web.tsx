import type { Feature, FeatureCollection } from 'geojson';
import { GeoJSONSource, Map as MapLibre, MapMouseEvent, NavigationControl, setWorkerUrl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef } from 'react';
import { LngLat } from './geo';
import { color } from './theme';

export type MapDrawProps = { points: LngLat[]; onChange: (points: LngLat[]) => void };

const PNOA_TILES =
  'https://www.ign.es/wmts/pnoa-ma?layer=OI.OrthoimageCoverage&style=default&tilematrixset=GoogleMapsCompatible' +
  '&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix={z}&TileCol={x}&TileRow={y}';

setWorkerUrl('/maplibre-gl-worker.mjs');

// Sierra Mágina, Jaén.
const START: LngLat = [-3.46, 37.73];

function toGeoJson(points: LngLat[]): FeatureCollection {
  const features: Feature[] = points.map((p) => ({ type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: p } }));
  if (points.length >= 3) {
    features.push({ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [[...points, points[0]]] } });
  } else if (points.length === 2) {
    features.push({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: points } });
  }
  return { type: 'FeatureCollection', features };
}

export default function MapDraw({ points, onChange }: MapDrawProps) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<MapLibre | null>(null);
  const latest = useRef({ points, onChange });
  latest.current = { points, onChange };

  useEffect(() => {
    if (!container.current) return;
    const instance = new MapLibre({
      container: container.current,
      center: START,
      zoom: 13,
      attributionControl: { compact: false },
      style: {
        version: 8,
        sources: {
          pnoa: { type: 'raster', tiles: [PNOA_TILES], tileSize: 256, attribution: 'PNOA © Instituto Geográfico Nacional' },
          drawing: { type: 'geojson', data: toGeoJson(latest.current.points) },
        },
        layers: [
          { id: 'pnoa', type: 'raster', source: 'pnoa' },
          { id: 'fill', type: 'fill', source: 'drawing', filter: ['==', '$type', 'Polygon'], paint: { 'fill-color': color.accent, 'fill-opacity': 0.3 } },
          { id: 'line', type: 'line', source: 'drawing', filter: ['!=', '$type', 'Point'], paint: { 'line-color': '#FFFCF5', 'line-width': 2 } },
          { id: 'vertex', type: 'circle', source: 'drawing', filter: ['==', '$type', 'Point'], paint: { 'circle-radius': 5, 'circle-color': color.accent, 'circle-stroke-color': '#FFFCF5', 'circle-stroke-width': 2 } },
        ],
      },
    });
    instance.addControl(new NavigationControl({ showCompass: false }));
    instance.doubleClickZoom.disable();
    instance.on('click', (e: MapMouseEvent) => {
      latest.current.onChange([...latest.current.points, [e.lngLat.lng, e.lngLat.lat]]);
    });
    map.current = instance;
    return () => {
      instance.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    const instance = map.current;
    if (!instance) return;
    const update = () => (instance.getSource('drawing') as GeoJSONSource | undefined)?.setData(toGeoJson(points));
    if (instance.isStyleLoaded()) update();
    else instance.once('load', update);
  }, [points]);

  return <div ref={container} style={{ height: 380, borderRadius: 10, overflow: 'hidden' }} />;
}
