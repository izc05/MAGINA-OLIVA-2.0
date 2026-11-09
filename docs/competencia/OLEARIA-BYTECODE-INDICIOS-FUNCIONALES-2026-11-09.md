# Olearia — mapa de indicios del bytecode Hermes (no código fuente)
**Fecha:** 2026-11-09 · **Versión:** APK 1.5.2 / `assets/index.android.bundle`, 17.504.504 bytes · **Estado:** CONTABILIDAD DE CADENAS, SIN EJECUTAR.

## 1. Alcance y advertencia metodológica

Se contó, de forma insensible a mayúsculas/minúsculas, la cantidad de apariciones de **fragmentos de texto** de interés en el bytecode Hermes incluido en el APK aportado. Un fragmento puede repetirse dentro de una librería, un mensaje de error, una traducción, un texto de marketing o una ruta sin uso. **El recuento NO equivale a pantallas, funciones terminadas, líneas de código o llamadas efectivas**. Cero apariciones **NO descarta** soporte por servidor, minificación o vocabulario distinto. No se extrajeron ni publicaron strings extensas, lógica privada ni endpoints.

## 2. Indicios observados

| Área | Fragmento buscado | Coincidencias | Interpretación adecuada |
|---|---|---:|---|
| Administraciones | `IUWS` | 0 | **No demuestra que no exista IUWS**; podría estar enteramente en servidor u otro nombre |
| Administraciones | `SIEX` | 69 | Existe vocabulario relacionado; NO prueba envío ni aceptación |
| Administraciones | `REAFA` | 6 | Referencias; no verifica alta ni procedencia oficial |
| Geoespacial | `SIGPAC` | 67 | Referencias al sistema; funcionalidad real pendiente |
| Geoespacial | `Catastro` | 30 | Referencias, no prueba de API de Catastro |
| Geoespacial | `PNOA` | 4 | Referencias cartográficas |
| Geoespacial | `NDVI` | 28 | Menciones sobre vegetación satelital, no cálculo validado |
| Cuaderno | `cuaderno` | 115 | Dominio funcional muy presente |
| Cuaderno | `tratamiento` | 106 | No acredita completitud de campos CUE |
| Cuaderno | `fitosanit` | 43 | No acredita registro de producto actualizado |
| Cuaderno | `riego` | 68 | Dominio funcional visible en cadenas |
| Cuaderno | `fertiliza` | 60 | Dominio visible, sin reglas de excepción verificadas |
| Economía | `cooperativa` | 127 | Es un tema recurrente en el bundle |
| Economía | `pesada` | 13 | Indicios de entregas/pesadas |
| Economía | `liquidaci` | 36 | Indicios de liquidación |
| OCR | `OCR` | 16 | El nombre aparece; no identifica motor OCR |
| Base de datos | `AsyncStorage` | 9 | Referencia al módulo de persistencia de claves |
| Base de datos | `sqlite` | 1 | No permite concluir el motor usado |
| Base de datos | `watermelondb` | 0 | No demuestra ausencia absoluta |
| Backend | `supabase` | 8 | Indicio de la tecnología declarada por el fabricante; no vemos RLS ni esquema |
| IA | `openai` | 11 | Mención, no prueba proveedor utilizado en runtime |
| IA | `gemini` | 1 | Mención, no prueba modelo empleado |
| IA | `mistral` | 2 | Mención, no prueba modelo empleado |
| IA | `ollama` | 2 | Mención, no prueba inferencia local |
| Mapas | `maplibre` | 9 | Dependencia confirmada también en `.so` y DEX |
| UX | `skia` | 207 | Dependencia confirmada también en `.so`; no explica sus pantallas |
| Suscripciones | `revenuecat` | 28 | SDK confirmado por DEX; no indica plan activo |
| Monitorización | `sentry` | 448 | SDK confirmado; no demuestra qué datos envía |
| Voz | `voice` | 95 | Indicio genérico, no evidencia de dictado correcto |
| Voz | `speech` | 17 | Relacionado con SDKs de voz, sin prueba funcional |

**Limitación:** algunos fragmentos como `voice`, `openai` o `OCR` pueden estar presentes por librerías o documentación interna. No son conteos de acciones reales ni trazas de red.

## 3. Precisión adicional sobre AsyncStorage

Se confirmaron **18 definiciones DEX bajo `com.reactnativecommunity.asyncstorage.*`**, entre ellas la clase bibliotecaria `ReactDatabaseSupplier`. Esto aclara por qué la simple frase «no hemos visto expo-sqlite» **NO equivale a «la app no usa SQLite»**: AsyncStorage de Android tiene su propia implementación nativa y puede usar SQLite internamente. Eso **no demuestra** que la base de negocio (tratamientos, recintos, finanzas) se almacene allí, ni que existan transacciones semánticas de dominio.

**Para Mágina Olivo V2:** los contratos de persistencia de datos agrícolas deben expresar invariantes y operaciones atómicas de alto nivel y tener una outbox independiente. Ni la presencia ni la ausencia de nombres en DEX sustituye a pruebas de persistencia y recuperación.

## 4. Pruebas que resolverían las incógnitas principales

- IUWS/SIEX: **documento de acuse administrativo** en operación propia y autorizada, si el servicio lo permite; un PDF exportado o un HTTP 200 no prueba aceptación.
- SIGPAC/REAFA: trazabilidad de referencia oficial, campaña, superficie y actualización; distinguir finca creada por usuario de parcela administrativa.
- OCR: usar un ticket *sintético* con pesos y fecha conocidos; inspeccionar errores y posibilidad de corregir antes de registrar.
- Voz: dictar actividad ficticia y comprobar reconocimiento, campos, pregunta de confirmación y cancelación.
- Offline: crear registros ficticios sin red, forzar parada, reabrir, reconectar y comprobar integridad/deduplicación.

## 5. Buenas prácticas de investigación

Solo se publican **números, nombres generales de componentes y conclusiones**, no cadenas copiadas del bundle, source maps, URLs internas, secretos, datos personales ni instrucciones para evadir protecciones. En caso de investigar más en PC con Codex, trabajar sobre copia privada y publicar únicamente informes resumidos y reproducibles.

**Relacionado:** [Profundización arquitectónica](OLEARIA-APK-PROFUNDIZACION-ARQUITECTURA-2026-11-09.md), [QA de pruebas controladas](OLEARIA-PRUEBAS-CONTROLADAS-Y-DECISIONES-V2-2026-11-09.md).
