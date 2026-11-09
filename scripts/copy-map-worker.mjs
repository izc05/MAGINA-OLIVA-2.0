// MapLibre carga su worker como archivo aparte y Metro no lo empaqueta: se publica desde public/.
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';

mkdirSync('public', { recursive: true });
for (const file of readdirSync('node_modules/maplibre-gl/dist')) {
  if (/^maplibre-gl-(worker|shared)\.mjs$/.test(file)) {
    copyFileSync(`node_modules/maplibre-gl/dist/${file}`, `public/${file}`);
  }
}
