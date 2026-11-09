# Arquitectura V2, benchmark y plan de migración — decisión técnica revisable

**Fecha:** 09/11/2026 · **Estado:** diseño candidato, no infraestructura desplegada, no integración administrativa homologada.  
Documentos de entrada: `docs/normativa/AUDITORIA-INFORME-EXTERNO-2026-11-09.md` y `docs/normativa/MATRIZ-FITOSANITARIOS-BASE-2026-11-09.md`.

## 1. Decisión ADR-001: multiplataforma TypeScript con verificación de alcance

**Propuesta:** React Native + Expo Router + TypeScript para Android/iOS y web inicial. Monorepo ligero con dominio compartido y adaptadores distintos de almacenamiento. Si el navegador requiere gestión avanzada (grillas, SIGPAC, informes), crear `apps/web` React especializado conservando `packages/domain`, `packages/contracts` y `packages/validation`.

**No afirmamos** que Expo sea siempre más rápido/seguro que Kotlin; un benchmark con una vertical fitosanitaria decide si ampliar la migración. La app Kotlin V1 sigue siendo referencia de funcionalidad y datos.

| Plataforma | UI | Persistencia offline | Estado/decisión |
|---|---|---|---|
| Android/iOS | Expo, React Native, TS | SQLite local, migraciones, outbox | Objetivo de prueba |
| Web pequeña | Expo Router / RN Web | Adaptador web explícito (IndexedDB u otro probado) | **No** prometer paridad de `expo-sqlite` web sin probar en navegadores reales |
| Web avanzada | React/TypeScript separado (solo si justificado) | Servidor + caché/almacén web controlado | Futuro opcional |
| Servidor | PostgreSQL/Supabase + APIs con RLS | DB y colas de envío | No reutilizar bases DEV por simple copia de variables |
| IUWS | Adaptador de servidor aislado | cola, auditoría, acuses | Contrato oficial y autorización pendientes |

**Cifrado:** Expo SQLite no se considera cifrado por defecto. Para datos sensibles, estudiar SQLCipher/alternativa con desarrollo nativo y manejo de claves respaldado. No prometer protección criptográfica del fichero por instalar expo-sqlite. Nunca publicar certificados ni claves de firma.

**Mapas:** MapLibre RN es una opción; tiene dependencias nativas y requiere development build. Verificar licencias, origen y disponibilidad de geometrías SIGPAC y cartografía antes de activarlo comercialmente.

## 2. Modelo y permisos

```text
Cuenta privada (Auth)
  └─ Actor / sujeto legal: titular, persona autorizada, empresa, asesor
       └─ Explotación oficial [identificador por campaña]
           └─ Unidades de producción / cultivos por campaña
               └─ Recintos SIGPAC vigentes (muchos a muchos con finca de gestión)
                   └─ Tratamiento, fertilización, riego, otras actividades
                       └─ Submisión oficial + acuse/errores + evidencia
```

- **Finca** es un contenedor de gestión del agricultor: no equivale necesariamente a explotación REAFA.
- Los documentos, gastos, jornales, entregas y pesadas tienen relación con explotación o finca pero siguen en subsistemas comerciales; no incluir en payload CUE sin exigencia.
- `AppPermission`: quién puede ver/editar finca, parcela, gastos o pesadas en nuestro software.
- `OfficialAuthorization`: representante/titular/proveedor que puede acceder y actuar en el sistema de Junta. Es diferente, versionado y revocable.
- RLS multiusuario por explotación: permisos del rol interno jamás sustituyen autorización administrativa.
- Cambios de campaña, superficie, cultivo y geometría se versionan; no sobrescribir registros históricos para conservar validez.

## 3. Dos sincronizaciones distintas

**Privada**:
```text
SQLite local: operación UUID + revisión + outbox
   → API backend (autenticada) + RLS + idempotencia
   → PostgreSQL + change feed/sync
   → web / segundo dispositivo
```

**Administrativa**:
```text
Registro privado validado + autorización oficial vigente
   → cue-connector backend
   → payload generado con contrato FEGA/IUWS versionado
   → IUWS autorizado
   → respuesta/acreditación oficial
   → registro de acuse y conciliación
```

Los estados `pending/sent/accepted` NO se comparten entre las dos colas. El backend puede haber recibido un tratamiento y la Junta aún no. Un timeout significa estado desconocido hasta conciliar, no permiso para repetir ciegamente.

**Protecciones**: UUID operación, clave de idempotencia interna, hash payload, revisión monotónica, aislamiento por tenant, secretos de solo servidor, documentación privada, borrado legal compatible con retención, test A→B→A/C, backoff, conciliación, observabilidad sin NIF/tokens.

## 4. Estructura de carpetas incremental

```text
apps/
  mobile/              # Una app Expo Router; web básica si funciona en pruebas
  web/                 # Crear únicamente tras demostrar necesidad
packages/
  domain/              # Tipos/entidades/servicios agrícolas puros TS
  validation/          # Reglas validadas con fuente/versión
  cue-contracts/       # DTO FEGA/versiones, NO construir antes de extraer anexos
  ui/                  # Solo componentes que reutilicen móvil/web
services/
  cue-connector/       # Firma y contratos administrativos, ejecución servidor
supabase/
  migrations/          # Migraciones nuevas, sin aplicar por defecto
docs/
  normativa/
  arquitectura/
  pruebas/
```

**Política:** no generar decenas de paquetes vacíos. Comenzar con Expo + dominio + validación; añadir conectores luego de conocer el contrato exacto.

## 5. Reutilización de código abierto y competencia

| Referencia | Uso concreto | Reutilización / riesgo |
|---|---|---|
| Expo Router / plantilla Tabs | Arranque Android/iOS/web y navegación | Comparar versiones/dependencias y licencia de plantilla |
| React Hook Form | Formularios agrícolas con pasos y errores | MIT; lógica de obligatoriedad se valida también en backend |
| Zod | Contratos TS y reglas sincronizadas | MIT; no equiparar validación del cliente a aceptación legal |
| Expo SQLite | Almacenamiento móvil y migraciones | Necesita sync, cifrado y pruebas web independientes |
| MapLibre | Polígonos/selección de recintos | MIT; development build y legalidad de datos cartográficos |
| farmOS + Field Kit | Referencia de entidades/eventos, UX offline | Licencias GPL; **no copiar código directamente** a app cerrada sin análisis jurídico |
| oSIGris | Cuaderno móvil/web, estado de exportación CUE, maquinaria y asesor | Benchmark de funcionalidades; documentación pública no prueba una integración específica en nuestras condiciones |
| Agricolum / Agroptima | Formularios agrícolas, mapa, tratamiento, gastos, onboarding | Comparar con fuentes actuales; no copiar UI, textos ni bases privadas |
| Aplicaciones listadas Junta | Referencia de tramitación CUE comercial | Revisar listado oficial actualizado 28/10/2026 y diferenciar inclusión de prestaciones exactas |

Ejemplos y fuentes:
- https://docs.expo.dev/guides/monorepos/
- https://docs.expo.dev/versions/latest/sdk/sqlite/
- https://reactnative.dev/docs/integration-with-existing-apps
- https://github.com/expo/expo/tree/main/templates/expo-template-tabs
- https://github.com/react-hook-form/react-hook-form
- https://github.com/colinhacks/zod
- https://github.com/maplibre/maplibre-react-native
- https://github.com/farmOS/farmOS
- https://github.com/farmOS/field-kit
- https://osigris.com/
- https://play.google.com/store/apps/details?id=osigris.osigris

**Pendiente:** benchmarking medido, licencias exactas de todas las dependencias y precios comerciales actualizados. No inventar precios ni nivel de homologación de terceros.

## 6. Ensayo comparable de tecnología y tiempos

Mismo recorrido y mismo contrato ficticio:
1. Alta de explotación/recinto QA.
2. Tratamiento con fecha, parcela, plaga, aplicador, cultivo/variedad, superficie, producto/n.º registro, equipo, cantidad/dosis, evaluación e históricos.
3. Persistencia sin red, reinicio, edición/versión y cancelación.
4. Sincronización web con dos cuentas A y B autorizadas, C denegada.
5. IUWS mock, con errores/timeout/rechazo/aceptado simulado explícitamente.

Medir en Kotlin V1, Expo móvil y web: tiempos de cambio de un campo y una regla, compilación fría/caliente, tests, tamaño APK, memoria, incidencias y complejidad de doble plataforma. No dar GO a migración masiva si no supera calidad y coste de mantenimiento del prototipo.

## 7. Plan de migración V1 → V2

**Origen probado (no tocar):** `izc05/magina-olivo-v20`, APK global Kotlin `f772a093e`; Room 36 y Supabase DEV con cambios históricos que deben inventariarse sin exponer credenciales.

1. Inventario con SHA de esquema, tablas, índices, FKs, exportación de metadatos y recuentos; ninguna copia de datos reales en repo público.
2. Matriz de correspondencia por entidad: titular/explotación/finca/parcela/ciclo/tratamiento/actividad/gasto/jornal/pesada/entrega/documento/outbox.
3. Mapeos preservando `legacy_uuid`, `source_system`, `source_record_id`, `migration_batch_id`, relación original y fecha; campo oficial independiente de UUID interno.
4. ETL **en copia QA**, balance de registros y sumas de kg/euros por ciclo, manejo de FK huérfanas y duplicados, documentos y hashes.
5. Validar en móvil/web el mismo contenido, sin sincronizar operaciones antiguas pendientes a producción.
6. Probar corte/rollback en entorno aislado; **no aplicar doble escritura V1/V2 por defecto**.
7. Ampliar migración tras disponer de pruebas de integridad, privacidad y autorización.

## 8. Plan de ejecución por responsables

| Hito | Responsable | Entregable | Puerta |
|---|---|---|---|
| N0 Normativa | Codex + revisión | XLSX V3.11 desglosado, modelo Junta V9, catálogos, reglas con evidencia exacta | No construir validación oficial sin obligatoriedad |
| N1 Alta IUWS | Coordinación/Junta | Consulta formal alta desarrollador/titular, certificados, test, acuses | No usar endpoint oficial sin autorización |
| N2 Dominio | Codex | Tipos TS + tests, UUID y REAFA/recinto versionados | Sin pérdida de atributos |
| N3 UX vertical | Claude | Expo para una explotación y un tratamiento ficticio, pantallas móvil y web | Funciona realmente, sin duplicar UI |
| N4 Sync | Codex | SQLite/offline + backend + RLS + pruebas A/B/C | No fugas de datos ni duplicados |
| N5 IUWS mock | Codex + Claude | Simulador estrictamente identificado; trazabilidad y errores | Nunca presentar mock como aceptación oficial |
| N6 Integración real | Solo tras alta/autorización | Evidencia de consulta/envío/acuse oficial | GO administrativo escrito |
| N7 Resto del producto | Claude/Codex | Migración campañas/economía y funcionalidades olivar | Contabilidad e históricos conciliados |

## 9. Preguntas sin resolver para Junta (no inventar contrato)

Alta desarrollador persona física, dominio, cert público/privado y custodia, modalidad productor individual, Anexos VIII–X, entorno de preproducción, mensajes WSDL/XSD, códigos de error, acuse oficial, rectificaciones, revocación, permisos por titular/explotación, cargas offline tardías, versiones de catálogos, validaciones por campaña y recomendaciones para RGPD/retención.

Correo facilitado por página Junta: consultareafa.capadr@juntadeandalucia.es

**Criterio general:** no confundir promesa del proveedor con contrato oficial; ni pruebas unitarias con conexión aceptada; ni rapidez de crear UI con tiempo total de entrega.
