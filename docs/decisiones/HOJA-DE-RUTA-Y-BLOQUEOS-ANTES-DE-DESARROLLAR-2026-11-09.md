# ¿Estamos preparados para construir Mágina Olivo V2? — Hoja de ruta, bloqueos y decisiones

**Corte:** 2026-11-09 · **Responsable de revisión:** coordinación · **Estado:** plan técnico PROVISIONAL (no homologación ni aprobación legal).  
**Fuente documental interna:** [Índice maestro](../README.md). **Fuente de verdad externa:** BOE, Junta y FEGA (enlaces al final).

## Resumen ejecutivo

**Sí hay arquitectura y orden de ejecución definidos; no está cerrado el contrato administrativo IUWS ni la autorización de la aplicación.** Por tanto:

- **GO** para empezar un prototipo técnico sobre Expo/TypeScript con datos ficticios: explotación, finca, recinto, tratamiento, validación provisional, offline y navegación móvil/web.
- **NO-GO** para presentar un CUE «homologado», programar endpoints IUWS desde suposiciones, aceptar productos fitosanitarios sin verificar su autorización, aplicar migraciones a producción, subir NIF/certificados al repo o reemplazar APK V1.
- **NO-GO** para dictar todas las obligatoriedades IUWS sin extraer completa la matriz FEGA Anexo V 3.11 y su tabla de catálogos. La matriz RD 1311 Anexo III / modelo Junta V9 no es lo mismo que la especificación del payload IUWS.

## 1. Qué tenemos resuelto vs qué hay que conseguir

| Área | Claridad de diseño | Evidencia que falta antes de producción | Responsable/criterio |
|---|---|---|---|
| Marco normativo REAFA/SIEX | Alta: leyes, identidad y voluntariedad general verificadas | Vigencia concreta de reglas por actividad, campañas y futuras reformas | Coordinación + auditoría jurídica |
| Calendario fitosanitario | Alta: registro hoy, papel permitido hasta 31/12/2026, electrónica 01/01/2027 | Validar cambios posteriores antes de release | Normativa versionada |
| Modelo explotación ↔ finca ↔ SIGPAC | Alta a nivel conceptual | Formatos e identificadores reales, UHC/parcelas en Anexo V y REAFA por campaña | Codex + pruebas de importación |
| Campos tratamiento | Media: RD Anexo III, UE, Junta V9 consultados | **FEGA V 3.11 XLSX completo**, obligatoriedad condicionada, catálogos VII | N0 bloqueante para conector |
| Interfaz IUWS | Media: finalidad y alta/representación oficial conocidas | **FEGA VI 3.11.4 DOCX completo**: métodos, protocolo, auth, errores, acuses, modificaciones | N0 bloqueante para conector |
| Registro desarrollador y permisos | Media: productor individual y habilitado reconocidos | Certificado, forma de alta, Anexo IX/IV, prueba, revocación y habilitación reales | Respuesta formal Junta |
| Catálogo MAPA | Alta en necesidad de validar número y uso | Método de consulta autorizada, uso olivar, vigencia, etiqueta y actualización | Codex + fuente MAPA |
| Fertilización y riego | Media: regla 2026 con excepciones; V9 describe apartados | Obligaciones/atributos por caso y correspondencia V/VI | Matriz posterior a fitos |
| Seguridad/RGPD | Diseño: roles app vs representación, RLS y auditar cambios | Encargado/responsable, privacidad, ubicación, cifrado verificado, plan incidentes y retención | Revisión jurídica y pruebas |
| Android/iOS/web | Candidato: Expo Router + TypeScript | Prueba real de versión de Expo, builds nativos, web, offline sin red, navegadores y UX | Claude y Codex |
| SQLite y cifrado | Confirmada opción Expo SQLite | SQLCipher: **no por defecto**, requiere prebuild; prueba `cipher_version`; política de claves | QA seguridad |
| Sync privada | Diseñada en dos etapas con outbox, control de revisiones y reintentos | Pruebas A/B/C, conflictos, idempotencia, recuperación tras fallo | Codex |
| Migración V1 | Estrategia: preservar UUID/origen y realizar copia QA | Inventario Room/Supabase real, FKs, recuentos, kg y euros, outbox pendientes | Codex, sin tocar V1 |
| Competencia y negocio | Benchmark funcional propuesto | Precios, diferenciación, tareas de campo, soporte y coste de servidor | Producto |
| Operación y despliegue | Principios claros | CI, copias/restauración, observabilidad, publicación web/Play/App Store, soporte y costes | Tras vertical probada |

## 2. El orden correcto: siete puertas y sus pruebas

### N0 — Completar la investigación normativa **antes de aprobar formulario oficial definitivo**
- Descargar **Anexo V 3.11 XLSX**; extraer por hoja/fila cada variable fitosanitaria, requerido/condicional, tipos y catálogos.
- Descargar **Anexo VI 3.11.4 DOCX**; enumerar métodos reales, solicitudes, respuestas, errores, acuses y autenticación.
- FEGA VII: codificaciones; Junta V9: contraste fila/campo; anotar versión/hash de originales.
- Resultado: matriz de trazabilidad `BOE/UE → Junta V9 → FEGA V/VI → validación → prueba` con vacíos explícitos.
- **GO:** el caso olivar/tratamiento tiene 100% campos y reglas confirmados o pendientes bloqueantes identificados. **NO-GO** al envío oficial si falta un campo crítico.

### N1 — Determinar quién y cómo puede intercambiar datos
- Solicitar a la Junta por escrito procedimiento software comercial y modalidad productor individual / entidad habilitada; certificado, entorno de test, autorización, revocación, contrato de acuse y soporte.
- **GO:** evidencia oficial de procedimiento y permisos. **NO-GO:** asumir que email, rol app o un HTTP 200 son autorización/acuse.

### N2 — Modelo compartido y pruebas puras de negocio
- Tipos TS y modelo PostgreSQL conceptual: `party`, `holding`, `farm`, `sigpac_enclosure_version`, `crop_unit`, `treatment`, `treatment_target`, `treatment_product`, `evidence`, `authorization`, `submission`.
- Distinguir campaña PAC y campaña de recolección de aceituna. Guardar UUID internos estables y referencia administrativa por campaña; fincas sin REAFA pueden tener borradores privados.
- **GO:** tratamiento de 2 recintos, distinta superficie/cultivo, sin pérdida de detalle, con validación y tests.

### N3 — Prototipo universal comprobado
- Expo/React Native con UI móvil + web, formulario ordinario y asesorado según V9; almacenaje offline Android/iOS con reinicio y consulta web.
- **GO:** comprobar en dispositivo y navegador reales, no solo test unitario. Medir tiempo de iteración y coste de builds frente a Kotlin.

### N4 — Seguridad y sincronización privada real
- Backend QA con RLS por explotación, outbox local, reconciliación, conflictos, reintentos, bloqueo C, auditoría mínima, encriptación móvil comprobada.
- **GO:** usuario A crea, B autorizado consulta, C sin permiso recibe denegación; ningún duplicado por fallo de red.

### N5 — Simulador del conector
- Solo con DTO derivados de V/VI; devolver acuse, rechazo, timeout/UNKNOWN y error de permisos simulados, claramente etiquetados como MOCK.
- **GO:** no confundir guardado, sincronización privada y aceptación oficial.

### N6 — Interoperabilidad oficial (solo con autorización previa)
- Alta del software, autorizaciones y entorno oficial habilitado; prueba de respuesta válida; manejo de revocación y acuses; documentación de resultado.
- **NO-GO:** usar datos reales o certificados sin acuerdo formal y custodia segura.

### N7 — Migración y comercialización
- Copia y mapeo V1↔V2, conciliación de UUID, datos pendientes, kg, euros y documentos; rollback.
- Lanza solo tras pruebas de privacidad, soporte, observabilidad, coste, Términos/RGPD y plataforma de distribución.

## 3. Prototipo exacto que SÍ se puede empezar sin esperar a la Junta

**Primer recorrido:** Persona QA crea 1 explotación ficticia, 3 fincas, 4 recintos ficticios y 1 tratamiento con producto explícitamente **de prueba**. Trabaja sin señal, cierra/abre app y persiste; se sincroniza con cuenta de prueba y consulta desde web. La pantalla muestra «Guardado local», después «Sincronizado con servidor», y solo en mock «Aceptación simulada» (nunca «Presentado en Junta»).

**Nunca** usar identificadores REAFA/SIGPAC ficticios haciéndolos pasar por oficiales ni un producto simulado como recomendado para aplicación.

## 4. Lo que el agricultor debe ver, no las normas internas

- **Mis explotaciones:** finca, parcelas, campaña, superficie y estado de vinculación oficial.
- **Cuaderno:** nueva actividad, tratamientos, fertilización, riego, historial, justificantes; asistente guiado normal/asesorado.
- **Estado del registro:** local → sincronizado servidor → preparado para envío → pendiente/aceptado/rechazado oficialmente.
- **Economía:** gastos, jornales, entregas/cooperativa, precio/kg/rentabilidad; **no todo se remite** a la Administración.
- **Cuenta y permisos:** titular, colaboradores, asesores/gestores, consentimiento y autorizaciones oficiales sin equivalencias automáticas.
- **Web:** mismos datos autorizados, tablas/consultas de varias fincas, exportaciones e informes; UX web diferenciada si mejora productividad.

## 5. Riesgos de falsa seguridad tecnológica

- El framework no resuelve por sí solo normativa ni los contratos IUWS. Expo SQLite es persistente, pero **su opción `useSQLCipher` es `false` por defecto**, requiere compilación nativa y `PRAGMA cipher_version` para verificar que el cifrado está activo.
- Expo SQLite web requiere configuración WASM y cabeceras COOP/COEP; **no prometer equivalencia móvil/web sin ensayo**.
- React Native no permite reutilizar directamente el código Kotlin/Room; solo reglas, pruebas, datos y backend cuando sean compatibles.
- Datos de gastos/producción nunca se envían al CUE sin campo verificado en anexo o norma; digitalizar no equivale a transmitir.

## 6. Qué información o actuación falta del propietario

1. **Para avanzar con ingeniería hoy: ninguna credencial.** Se puede crear el prototipo con datos QA.
2. **Para cerrar la investigación**: acceder al Anexo V XLSX y Anexo VI DOCX original desde el navegador y compartir los archivos con el equipo si el sistema de descarga automatizada no los obtiene; validar que son del FEGA y registrar SHA/versión. La página FEGA publica las versiones pero la extracción automatizada falló aquí; no fingir lectura.
3. **Para integración real**: decidir y acreditar si actúa como desarrollador individual/empresa y modalidad de representación; realizar alta y autorizar prueba, certificado y acuerdos legales bajo custodia del titular. La decisión depende de instrucciones de la Junta.
4. **Para comercialización**: modelo de suscripción/soporte, tratamiento de datos, costes y responsabilidades jurídicas antes del lanzamiento.

## 7. Fuentes y trazabilidad

- Junta Cuaderno de explotación (página actualizada nov. 2026), incl. fertilización, CUE e IUWS: https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/agricultura/cuaderno-explotacion.html
- FEGA índice (actualización 08/04/2026), Anexo V 3.11, VI 3.11.4, VII–X: https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex
- FEGA Anexo V página (actualizado 21/11/2025): https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex/anexo-v-definicion-de-variables-311
- FEGA Anexo VI página (actualizado 19/11/2025): https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex/anexo-vi-interfaz-unico-comun-3114
- BOE RD 1311/2012 consolidado: https://www.boe.es/buscar/act.php?id=BOE-A-2012-11605
- BOE RD 1039/2025 DF primera: https://www.boe.es/buscar/doc.php?id=BOE-A-2025-23421
- BOE RD 1054/2022 consolidado: https://www.boe.es/eli/es/rd/2022/12/27/1054/con
- Expo SQLite setup / SQLCipher / web: https://docs.expo.dev/versions/latest/sdk/sqlite/

## Decisión de coordinación

**Construir con pruebas y evitar falsas certezas:** N0/N1 en paralelo con esqueleto prototipo N2/N3 usando datos ficticios; **bloquear oficialmente** los envíos IUWS y la aceptación de productos hasta evidencias reales. Conservar documentación y pruebas en GitHub mediante PR y revisión. No fusionar ni cambiar producción por rutina.
