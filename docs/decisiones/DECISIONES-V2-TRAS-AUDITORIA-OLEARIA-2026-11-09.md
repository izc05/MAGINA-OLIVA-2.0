# Decisiones de ingeniería para Mágina Olivo V2 derivadas de la investigación de Olearia
**Versión:** 0.1 · **Fecha:** 09/11/2026 · **Estado:** propuesta para revisión antes de programar, NO contrato técnico definitivo de IUWS.

## 0. La distinción obligatoria
Se analizaron estáticamente los cuatro APK de una instalación legítima de Olearia Agritech 1.5.2. Vimos dependencias (React Native/Expo/Hermes, MapLibre, scanner, voz, facturación, telemetría) y metadatos del manifiesto. **No se ha comprobado su lógica comercial, código fuente, backend, seguridad de ejecución, sincronización ni aceptación oficial.** No hay evidencia de que su código se haya escrito con IA.

Los hallazgos sirven para descartar o valorar alternativas técnicas, **no para reproducir código, copiar UI ni inferir obligaciones legales**. Las obligaciones REAFA/CUE deben venir de BOE/FEGA/Junta y anexos completos, no de la competencia.

## 1. Decisiones propuestas

| ID | Decisión propia V2 | Motivo | Evidencia / aceptación necesaria |
|---|---|---|---|
| ARQ-01 | Cliente Android/iOS con React Native + Expo + TypeScript, y reglas de dominio independientes de UI | Competidor usa combinación real de esta familia; soporte oficial Expo SDK 57↔RN0.86 | Spike Android real y web; lockfile, EAS/dev build, empaquetado y CI; versión elegida por soporte, no copia |
| ARQ-02 | Web con React + el mismo núcleo TypeScript, pero driver offline propio | Las capacidades de SQLite/MapLibre nativas pueden diferir en navegador | Guardar/reabrir sin conexión en Chrome/Firefox/Safari y documentar limitaciones |
| ARQ-03 | Entidades `holding`, `farm`, `sigpac_enclosure_version`, `cultivation_unit`, `treatment`, `treatment_target` y `official_submission` separadas | Finca coloquial ≠ explotación REAFA ≠ recinto SIGPAC; tratamiento con varios objetivos | Historial por campaña, referencia de origen y tratamiento que no cambia si se actualiza SIGPAC |
| OFF-01 | SQLite transaccional para registros críticos móviles + `outbox` atómica | La presencia de AsyncStorage no valida comportamiento offline ni integridad | Repetir 100 escrituras, matar app en fase de fallo, reiniciar, ningún registro confirmado perdido |
| OFF-02 | Sync privada con UUID de operación, revisión base, conflictos explícitos e idempotencia | Evitar registros duplicados y sobrescritura silenciosa | Reintento de 10 operaciones, duplicados cero; 2 móviles A/B y usuario C sin acceso |
| MAP-01 | Evaluar MapLibre con proveedor de teselas/SIGPAC permitido, cache verificable y geometría versionada | MapLibre observado en APK competidor; no prueba éxito de su flujo SIGPAC | Demostración 2 polígonos ficticios, georreferenciación, atribución, modo avión, test de áreas |
| FIT-01 | Formularios de tratamiento por contexto, no un «formulario genérico» | RD 1311/2012, UE 2023/564 y V9; reglas condicionales | Matriz campo→artículo→regla→test, dose/quantity distintos, aplicador, asesor solo si procede |
| FIT-02 | Verificación de producto MAPA por cultivo, uso y fecha, con estado «pendiente» si no hay fuente fiable | No confundir reconocimiento de nombre con autorización | Pruebas con catálogos versionados y fecha de registro, sin recomendar dosis inferidas |
| IA-01 | IA/voz traduce intención en borradores tipados, con validación y confirmación humana | La competencia incorpora componentes de voz; valor real está en exactitud y confianza | Dictado crea PREVIEW y solo `confirm` persiste, permisos comprobados, acción reversible cuando proceda |
| OCR-01 | Vale de cooperativa → captura/OCR → revisión editable → transacción de pesada/gasto/campaña | Scanner/«OCR» de competidor no acredita precisión; oportunidad de flujo integral | 30 vales ficticios de distintos formatos; precisión y corrección manual medidas |
| PRIV-01 | Geolocalización segundo plano solo en función explícita de recorridos; consentimiento, indicador y parada | Olearia declara permisos de localización de fondo; sensibilidad laboral | Inicio/fin jornada detiene servicio; acceso del empleador condicionado y auditado |
| SEC-01 | Tokens seguros, datos agrícolas protegidos, RLS por explotación, backups cifrados y pruebas de restauración | Manifest backup y SDK de terceros no garantizan RGPD | No token en logs/DB sin cifrado; usuario C denegado; restauración controlada validada |
| OBS-01 | Telemetría y errores sin NIF, localizaciones, documentos ni contenidos fitosanitarios por defecto | SDK Sentry/Firebase presente en competidor; riesgo propio a prevenir | Tests automatizados de sanitización de eventos |
| CUE-01 | Conector IUWS **solo en backend autorizado**, con acuse, conciliación, versión DTO y estado independiente del privado | No hay evidencia binaria de integración real de competencia; nuestros anexos FEGA aún pendientes | FEGA V/VI/VII completos y autorización Junta; ensayo oficial con respuesta verificable |
| COM-01 | Suscripciones y tarifas al final de la primera vertical útil, sin vincular permisos administrativos a pagos | RevenueCat/Billing muestra infraestructura comercial existente | Plan de precios probado con usuarios reales y reglas claras de acceso/exportación |
| UPD-01 | Actualización versionada de catálogos y normas sin perder histórico, separada de la versión de app | Olearia lleva `expo-updates.ENABLED=false`, pero puede tener alternativas; nosotros debemos diseñarlo | Un tratamiento 2026 se valida con norma/catalogo vigente entonces, tras actualizar la app |

## 2. Primera vertical que debe quedar impecable

**Usuario ficticio → explotación/REAFA no verificada → dos recintos simulados → cultivo de olivar → tratamiento ficticio de superficie → comprobaciones RD/UE → guardado offline transaccional → sincronización privada en otra sesión → PDF de registro claramente privado.**

No usar datos reales de terceros ni afirmar «presentado a Junta». Una vez existan FEGA V/VI/VII + autorización, se añadirá envío IUWS real y acuse oficial.

## 3. Pruebas prioritarias para Codex y Claude

### Infraestructura de desarrollo
1. Distinguir repositorios **V1 Kotlin** y **V2** y no tocar V1 para esta prueba.
2. Crear spike en rama aislada del repositorio V2. Sin cambios directos en `main` ni migraciones en Supabase real/DEV sin autorización.
3. Introducir tests unitarios, instrumentados y end-to-end desde el principio; prueba real de Android y web, no solo TypeScript.

### Móvil/offline
4. Crear y editar 2 tratamientos ficticios sin red; cerrar y reabrir; ambos sobreviven.
5. Outbox privada idempotente: 2 reintentos después de timeout no generan doble registro.
6. Resolver una edición simultánea del campo dosis sin «último en escribir gana» invisible.
7. Seguridad: usuario C no puede consultar finca A ni archivos adjuntos por URL.

### GIS
8. Cargar 2 recintos simulados; separar polígono interno de identificador SIGPAC. No mostrar cartografía privada como oficial.
9. Validar la política del proveedor de mapa antes de cachear teselas, con atribución.
10. Dos superficies distintas deben conservarse al crear un tratamiento en un conjunto de recintos.

### IA/documentos
11. Crear un vale sintético de 1.234 kg, 1 albarán y una fecha; OCR detecta, pero nada se registra sin confirmación del usuario.
12. Voz: «apunta un tratamiento» solo inicia un borrador; no receta productos ni inventa dosis.
13. Trazabilidad: adjunto con hash y acceso por rol, con borrado/retención regulados.

### CUE
14. Motor de reglas muestra fuente y vigencia (RD 1311 Anexo III, UE 2023/564, V9).
15. Simulador IUWS distingue `LOCAL_ONLY`, `PRIVATE_SYNCED`, `SENT`, `ACCEPTED_WITH_ACK`, `REJECTED`, `UNKNOWN`; sin reintento ciego.
16. No hay llamada real IUWS, certificado ni falso acuse sin autorización y DTO confirmado.

## 4. Qué resultados medir antes de comparar con Olearia

- Tiempo medio y tasa de finalización de alta de finca; no declarar «más rápido» sin ensayo comparativo.
- Errores normativos evitados por reglas y cobertura real de campos.
- Pérdida de apuntes tras 24 h sin cobertura, reinicio y reconexión; duplicados y conflictos visibles.
- Precisión de campos OCR **antes y después de corrección**; tiempo de tarea y documentos vinculados.
- Tasa de aceptación y legibilidad de justificantes; separar PDF privado de acuse administrativo.
- Satisfacción de 5–10 agricultores, asesores y cooperativas representativas, evitando sesgo de un solo usuario.

## 5. Bloqueos, responsables y siguiente acción

**Se puede implementar ya:** spike RN/Expo, MapLibre con fuente permitida, SQLite y outbox, datos ficticios de recintos, tratamiento y OCR de ejemplo.

**No presentar como homologado:** REAFA/SIEX/IUWS hasta descargar y cotejar FEGA Anexo V 3.11, VI IUWS 3.11.4, VII catálogos y autorización administrativa aplicable. Ver [estudio normativo](ESTUDIO-IMPLEMENTACION-NORMATIVA-CUE-2026-11-09.md).

**Entorno de investigación:** si Codex inspecciona Olearia en Windows, que use la copia privada del APK, limitando la publicación al informe agregado, sin publicar binarios, firmas, recursos o código del competidor.

**Evidencia de partida:** [auditoría detallada](../competencia/OLEARIA-APK-PROFUNDIZACION-ARQUITECTURA-2026-11-09.md), [indicios Hermes](../competencia/OLEARIA-BYTECODE-INDICIOS-FUNCIONALES-2026-11-09.md), [plan funcional](../competencia/OLEARIA-PRUEBAS-CONTROLADAS-Y-DECISIONES-V2-2026-11-09.md).
