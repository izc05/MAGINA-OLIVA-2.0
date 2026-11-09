# Auditoría crítica del informe externo — REAFA / CUE / SIEX (09/11/2026)

**Estado:** documento de investigación contrastado parcialmente con BOE, Junta, FEGA y derecho UE. No sustituye a los anexos técnicos completos ni equivale a homologación. **NO se autoriza todavía implementar la API IUWS real ni dar por obligatorio un campo sin su contexto.**

## 1. Resumen ejecutivo (decisiones)

1. **Corregir el calendario del informe externo.** Las fechas 01/09/2024 y 01/09/2025 y los umbrales de >30 ha, >5 ha de regadío y >0,1 ha de invernaderos aparecen en la redacción antigua del RD 1054/2022, NO deben tratarse como obligación general vigente en noviembre de 2026. El art. 9 consolidado tras RD 34/2025 determina voluntariedad general cuando ninguna norma sectorial imponga registro electrónico.
2. **Registro fitosanitario:** art. 16 RD 1311/2012: obligación actual de mantener tratamientos registrados; papel permitido para operadores agrarios hasta **31/12/2026** tras la disposición final primera del RD 1039/2025. La Junta anuncia digital obligatorio de los tratamientos desde **01/01/2027**. No equiparar por defecto *registro digital* y *acuse IUWS*.
3. **Fertilización:** la página vigente de la Junta, basada en RD 1051/2022 y RD 934/2025, distingue registros de aportes desde 01/01/2026 (con excepciones y máximo un mes), y plan de abonado desde 01/09/2026 en los supuestos correspondientes (con excepciones). No es un requisito universal para toda explotación, ni implica automáticamente transmisión de cada coste o jornal.
4. **Registro como CUE comercial:** hay trámite real documentado de alta de software, vinculación, titular y entidad habilitada; la aplicación debe diferenciar permiso interno y autorización oficial. FEGA Anexo X y portal Junta contienen información más precisa que el informe externo.
5. **Contrato IUWS:** la publicación del **Anexo VI 3.11.4** y del **Anexo V 3.11** está confirmada por FEGA; sus archivos DOCX/XLSX no han podido extraerse aquí íntegramente. Por tanto, NO se autoriza ninguna matriz de payloads, endpoints o campos IUWS como definitiva.
6. **Arquitectura:** React Native/Expo/TypeScript + PostgreSQL/Supabase + SQLite local es candidato, no superioridad demostrada. La web requiere validación específica. Cifrado SQLite, RLS, conflictos, legalidad de reutilización y migración V1 deben probarse.
7. **Prioridad del producto:** primer camino completo y verificable: explotación ficticia + recinto oficial ficticio + tratamiento + persistencia sin conexión + validación local + réplica web + IUWS **simulado**.

## 2. Matriz jurídica vigente y errores detectados

| Norma o fuente | Qué confirma | Clasificación | Consecuencia |
|---|---|---|---|
| RD 1054/2022 art. 9 consolidado tras RD 34/2025 | CUE digital en general **voluntario**, salvo registro electrónico impuesto por norma sectorial | VERIFICADO | Descartar obligatoriedad general 2024/25 de informe externo; no usarla para reglas |
| RD 1311/2012 art. 16.1, modificado RD 1039/2025, DF 1.ª | Tratamientos agrarios registrados; papel hasta 31/12/2026 | VERIFICADO | Datos fitosanitarios prioritarios; retención y trazabilidad |
| Junta de Andalucía, Cuaderno de explotación (actualización 2026) | Obligación digital 01/01/2027 para información de tratamientos; CUE completo no obligado generalmente hasta próximo marco PAC salvo sectorial | VERIFICADO como criterio publicado por Junta | Calendario normativo versionado y alertas, no reglas de 2024/25 |
| RD 1311/2012 art. 16.3 | Documentación justificativa y conservación durante **al menos 3 años** | VERIFICADO | Documentos privados e históricos inalterados |
| Reglamento UE 2023/564, arts. 1–4 y anexo, mod. UE 2025/2203 | Campos mínimos de registros profesionales y formato electrónico legible por máquina; opciones de aplazamiento antes de 2027 y plazos según norma nacional | VERIFICADO | Validaciones del núcleo fitosanitario; no confundir anexo UE con todas las columnas IUWS |
| RD 1051/2022 modificado RD 934/2025, resumen Junta | Desde 01/01/2026, registros de aportes en hasta un mes con excepciones; plan de abonado desde 01/09/2026 en sus casos | VERIFICADO a nivel de resumen Junta; revisar redacción consolidada para cálculo por explotación | Módulo fertilización con reglas condicionales |
| REAFA, Orden 27/10/2019 mod. Orden 19/08/2024 | Explotación, titular, habilitación y vínculo con CUE, procedimiento electrónico | VERIFICADO para marco general | Modelo de explotación independiente de finca de la app |
| Anexo V FEGA versión 3.11 | Documento de campos de REA/CUE y obligatoriedad por campo **publicado** | VERIFICADO existencia/versión, PENDIENTE extracción | No publicar matriz IUWS completa sin XLSX |
| Anexo VI FEGA IUWS 3.11.4 | Documento técnico del interfaz **publicado**; versión actual listada por FEGA el 08/04/2026 | VERIFICADO existencia/versión, PENDIENTE extracción | No codificar rutas ni firmas por inferencia |
| Anexo X FEGA (actualizado 28/05/2024) | Procedimiento desarrollador, entidad habilitada y titular, diferenciados | VERIFICADO | Alta/consentimiento independiente del login |
| REAFA inscripción dentro de un mes / obligación telemática para todos | Aparece en informe externo pero esta auditoría no ha confirmado **todas las excepciones, casos y redacción exacta** | PENDIENTE | No activar validación universal sin verificar procedimiento |
| Sanciones, excepción exacta por tamaño y obligación de remisión al CUE | No confirmadas íntegramente contra texto consolidado y contratos | PENDIENTE | No generar multas/advertencias automáticas como hechos |

**Atención a RD 1039/2025:** es un RD cuyo título principal se refiere a subvenciones y asesoramiento, **pero su disposición final primera sí modifica** el art. 16.1 del RD 1311/2012. El informe externo solo registraba su objeto principal y omitía el impacto fitosanitario. Fuente: BOE-A-2025-23421.

**Obligación de registro ≠ obligación de formato electrónico ≠ entrega IUWS:** no mostrar “presentado ante Junta” por tener un JSON guardado, un PDF o un HTTP 200. Según el art. 16.5 RD 1311/2012 hay previsión de provisión electrónica mensual, cuya aplicación práctica y medio exacto requieren contrastar contrato y autorización por explotación; la periodicidad no autoriza a inventar un acuse.

## 3. Sistema REAFA / parcela y roles

**VERIFICADO:** Junta distingue la inscripción REAFA del cuaderno digital y la figura del desarrollador, entidad habilitada y productor individual. Los CUE comerciales toman datos de recintos/cultivos de REAFA y pueden intercambiar información con Sga Cex vía IUWS. El titular puede elegir cuaderno comercial.

Modelo interno **propuesto**, NO copia literal de campos FEGA:
- Titular / identidad legal con datos privados y autorización temporal.
- Explotación administrativa (identificadores oficiales versionados).
- Finca interna de Mágina Olivo como agrupación de manejo (no necesariamente explotación).
- Recintos SIGPAC/REAFA por campaña, geometría y cultivo versionados.
- UHC/unidad de cultivo cuando corresponda.
- Actividades y tratamientos vinculados a explotación, unidades y superficies.
- Permisos de app (operador, asesor, propietario, recolector) **separados** de autorización IUWS.

Ejemplo únicamente ficticio, SIN NIF ni referencias que parezcan reales: titular QA, una explotación QA-000, fincas A/B/C, recintos de prueba R1–R4, campañas agrícolas 2026/27. Mantener UUID internos independientes de códigos externos; actualizar geometría/cultivo por vigencia, no sobrescribir históricos.

**Anexo X FEGA:** apartado 3.1 indica que la empresa desarrolladora debe registrar el software en la CCAA, proporcionando NIF, razón social, nombre, contacto y, para servicio directo, dominio y Anexo IX firmado por agricultor. Apartado 3.2 distingue entidad habilitada. Apartado 3.3 distingue agricultor individual, que puede autorizar el acceso al software mediante Anexo IX, del delegado en entidad habilitada. Procedimiento preciso a confirmar con Andalucía antes de enviar solicitudes.

**Actualización Junta 05/11/2026:** habilitaciones de entidades se actualizan de manera general los días 1 y 15 de cada mes, no instantáneamente. Un permiso recién otorgado no debe presumirse efectivo al instante.

## 4. Registro fitosanitario: qué está demostrado y qué no

### Confirmado por UE 2023/564, artículo 1 y anexo, para tratamientos de superficies
- Tipo de uso: tratamiento de superficies, instalación cerrada, material de reproducción, etc.
- **Nombre del producto y número de autorización.**
- **Fecha**, con hora de inicio **solo cuando proceda**.
- **Dosis de producto por superficie** (kg/ha o L/ha en tratamiento de superficies, con ajustes de unidades permitidos).
- **Localización** mediante unidad de terreno de declaración geoespacial cuando esté disponible u otro método permitido.
- **Hectáreas tratadas**, con fracción de recinto cuando proceda.
- **Cultivo/uso de tierra** conforme a referencia EPPO/OEPP cuando proceda y estado fenológico BBCH **condicional**.
- Registro sin demora indebida; conservación electrónica legible por máquina de acuerdo con calendario y posibilidad nacional de extensiones.

### Requiere verificación adicional antes de afirmar obligatoriedad por campo
- Hora obligatoria en todos los tratamientos; plaga, motivo, alternativa química/no química, asesor, nº de carné, equipo, eficacia, caldo, cantidad total, fechas límite, firmas, facturas/fotos. Muchos pueden ser exigidos por el RD 1311/2012, su anexo III, modelos Junta, etiquetas o el Anexo V; **NO** tratarlos uniformemente como obligatorios por el anexo UE.
- Dosis máxima, usos autorizados, intervalos, plazos de seguridad y restricciones derivadas de etiqueta: verificar **producto, fecha, cultivo y condiciones** en Registro MAPA. No derivar seguridad del simple nombre comercial.

Fuente para catálogo de productos actualizados: https://servicio.mapa.gob.es/regfiweb ; el MAPA ofrece búsqueda y exportación de productos, con actualizaciones semanales. No utilizar productos ficticios como recomendaciones agronómicas.

La matriz inicial de campos, estados y fuentes se detalla en el documento acompañante `MATRIZ-FITOSANITARIOS-BASE-2026-11-09.md`. **No es todavía el Anexo V desglosado campo a campo**.

## 5. Fertilización, riego y comercial

- **Fertilización oficial:** registrar aportes, plan de abonado y prácticas que procedan según RD 1051/2022/RD 934/2025, ayudas, zona y excepciones; asociar parcela/cultivo/campaña. La Junta V9 actualiza secciones 6 (caracterización suelos), 7 (fertilización) y 8 (riego).
- **Riego:** modelar como actividad y, si le corresponde, datos exigidos por cuaderno, concesiones o ayudas; no asumir que todo contador o coste es comunicación IUWS.
- **Cosechas, maquinaria, operaciones agronómicas, ecorregímenes:** separar campos reglados de estadísticas propias; verificar sección exacta del V9 y condiciones PAC.
- **Economía, jornales, cooperativas, pesadas y liquidaciones:** seguir siendo módulos privados; **no** mapear a CUE automáticamente salvo requisito documentado.
- **Olivar y seguridad:** el plazo de seguridad y restricciones por tratamiento deben basarse en etiqueta vigente y quedar disponibles al planificar recolección; no recomendar tratamientos automáticamente sin validación.

## 6. IUWS: contrato comprobado frente a contrato no comprobado

**COMPROBADO:**
- Junta publica base `https://ws108.juntadeandalucia.es/` para reemplazar la cadena genérica del Anexo VI; **esto no es por sí solo una URL de servicio operativo**.
- FEGA lista Anexo VI **3.11.4** (noviembre 2025), Anexo V **3.11**, Anexo VII catálogos, Anexos VIII–X autorizaciones.
- Anexo X describe los procedimientos separados de desarrollador / entidad habilitada / titular y sus vínculos.

**PENDIENTE — BLOQUEO DE IMPLEMENTACIÓN:** métodos reales, estructura SOAP/REST, WSDL/XSD/JSON, autenticación y certificados, códigos y semántica de acuses, query de revocaciones, entorno de pruebas, idempotencia estatal, operaciones de rectificación/anulación. No hay prueba de comunicación de Mágina Olivo con IUWS. No deducir datos de ejemplos externos sin validar FEGA/Andalucía.

**Diseño propuesto:** adaptador en backend; almacenamiento seguro de credenciales y certificados; autorización por explotación, control de revocación, outbox de envíos, idempotencia **interna** mediante UUID, registro de hash de petición/respuesta, estado UNKNOWN cuando no hay respuesta verificable, reconciliación antes de reintentar. Los estados de IUWS oficiales se mapearán cuando el anexo identifique sus significados; no asumir que la IUWS usa los mismos nombres internos.

## 7. Arquitectura, alternativas, benchmark y costes: interpretación técnica

| Camino | Ventajas | Riesgos | Decisión actual |
|---|---|---|---|
| Kotlin/Compose/Room (V1) | APK y migraciones probadas; excelente offline Android | iOS/web requerirían adaptaciones | Conservar referencia; no borrar |
| React Native + Expo + TypeScript | Móvil Android/iOS y compartir dominio con web; iteración UI ágil | Web y SQLite deben probarse; módulos nativos y build más complejos de lo anunciado | **Candidato preferente, sujeto a vertical de prueba** |
| Flutter | Multiplataforma sólida y componentes consistentes | Reescritura completa y web propia, Dart | Alternativa |
| React web + Capacitor | Muy potente para portal web; empaquetado móvil | Persistencia offline y UX nativa necesitan adaptación | Considerar para web especializada |
| Kotlin + RN híbrido | Migración incremental de pantallas Android | Dos runtimes, puentes y doble mantenimiento | Solo temporal o si la medición lo justifica |

Comparar tiempos **medidos**: arranque, iteración de formulario, build frío/caliente, uso de memoria, tamaño de app, offline A/B, cambios de modelo y pruebas en PC de 16 GB. **No** prometer de antemano que Expo será más rápido globalmente.

Competidores a estudiar por fuentes públicas, nunca copiar diseños ni código propietario:
- [oSIGris](https://osigris.com/) anuncia web y móvil; ficha Google Play 2026 anuncia asistente fitosanitario, riego, trabajos y producción. Su historial de cambios menciona visualización del estado de exportación a CUE. Son **afirmaciones comerciales**, no comprobación técnica IUWS.
- Agricolum, Agroptima, farmOS/Field Kit: analizar selección parcela, datos fitosanitarios, offline, estados de envío, documentación y soporte de cooperativas; no atribuir homologación por publicidad.
- Código abierto: Expo Router, React Hook Form, Zod, MapLibre; estudiar farmOS y Field Kit, pero no copiar componentes GPL sin análisis de licencia.
- Precios vigentes y comparativa financiera: **PENDIENTE**, no inventar importes.

## 8. Migración V1 → V2 sin pérdida

1. Congelar commit y APK global Kotlin como evidencia; copia cifrada y comprobada de datos de prueba, sin secretos en repo.
2. Inventariar entidades Room 36, eventos/ciclos/relaciones y esquema Supabase separado. No asumir que SQLite Expo abre directamente BD Room cifrada o esquema equivalente.
3. Crear mapeos de tipos y compatibilidad por entidad: holder, holding, farm, parcel, activity, treatment, cycle, expense, weighing, document; conservar UUID + origen V1 + id lote migración.
4. Probar ETL de una finca ficticia, relaciones y totales; reconciliar operaciones pendientes **sin emitirlas** y sin duplicarlas. La “doble escritura” no debe aplicarse a producción sin diseño de compatibilidad transaccional: puede duplicar tratamientos.
5. Probar rollback, idempotencia y aislamiento entre usuarios; producción y cuentas reales requieren autorización expresa.

## 9. Plan por hitos / puertas GO-NO-GO

| Fase | Evidencia requerida | No avanzar si… |
|---|---|---|
| N0 | Descargar Anexo V 3.11 (.xlsx), VI 3.11.4 (.docx), VII y Junta V9; inventario con hashes, contratos y reglas exactas | falta versión o obligatoriedad condicionada |
| N1 | Procedimiento alta CUE + modalidad productor individual/entidad + certificado y sandbox confirmados por Junta | identidad y autorización indefinidas |
| N2 | Modelos TypeScript y validaciones comprobadas con fixtures oficiales sin datos reales | identificadores y relaciones inconsistentes |
| N3 | Expo Android/iOS + web funcional en una vertical de fitosanitarios, SQLite offline + DB web probadas | pérdida de datos / soporte web simulado |
| N4 | Backend + RLS, sync A→B→A y cuenta C sin acceso, idempotencia y conflictos | fuga de datos o duplicados |
| N5 | IUWS mock solo con contrato real verificado, respuestas/error/timeout/acuse | se confunde enviado y aceptado |
| N6 | Alta oficial y sandbox autorizado | credenciales/registro no aprobados |
| N7 | Migración económica y campañas V1 con conciliación contable | importes, históricos o UUID no coinciden |

## 10. Consultas imprescindibles a Andalucía

Dirección publicada: **consultareafa.capadr@juntadeandalucia.es**. Preguntar por alta como desarrollador persona física, modalidad proveedor individual, certificados admitidos, dominio, Anexo IX, requisitos RGPD, sandbox IUWS, habilitación, acuse y revocación, tratamiento de errores, rectificación y alcance exacto de las comunicaciones.

**No enviar** NIF reales, certificados privados ni datos de agricultores por correo ordinario sin instrucciones oficiales.

## 11. Fuentes primarias revisadas

- Junta, página viva CUE/REAFA (novedad 05/11/2026): https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/agricultura/cuaderno-explotacion.html
- BOE RD 1054/2022, art. 9 consolidado: https://www.boe.es/eli/es/rd/2022/12/27/1054/con
- BOE RD 34/2025: https://www.boe.es/buscar/doc.php?id=BOE-A-2025-998
- BOE RD 1039/2025, DF 1: https://www.boe.es/buscar/doc.php?id=BOE-A-2025-23421
- BOE RD 1311/2012, art. 16 y anexo III: https://www.boe.es/buscar/act.php?id=BOE-A-2012-11605
- UE Reglamento 2023/564, artículo 1 y anexo: https://www.boe.es/buscar/doc.php?id=DOUE-L-2023-80367
- UE Reglamento 2025/2203: https://www.boe.es/buscar/doc.php?id=DOUE-L-2025-81626
- FEGA índice SIEX (Anexo V 3.11, VI 3.11.4, VII, VIII–X): https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex
- FEGA Anexo X autorización comercial (PDF 2024): https://www.fega.gob.es/sites/default/files/files/document/2024.05.17-ANEXO_X-ProcedimientoAutorizacionCUE_PUBLICADO.pdf
- MAPA registro fitosanitarios: https://servicio.mapa.gob.es/regfiweb
- Junta Orden 19/08/2024: https://www.juntadeandalucia.es/boja/2024/166/9

### Cuestiones que invalidan afirmaciones del informe externo

- **Errónea:** obligatoriedad digital general desde 01/09/2024/2025 para grandes/medianas fincas.
- **Incompleta:** RD 1039/2025 “no regula CUE” sin advertir que **modifica** plazos fitosanitarios del RD 1311/2012.
- **No demostrada:** “REAFA tiene código de forma X”; ejemplos de números inventados NO se deben insertar como referencias oficiales reales.
- **No demostrada:** todo lo propuesto como campo es obligatorio para todo tratamiento.
- **No demostrada:** todos los registros digitales se transmiten automáticamente al IUWS y una sincronización Supabase sirve como acuse oficial.
- **No demostrada:** que SQLite está cifrado o que Expo es compatible con todas las funciones web de forma idéntica sin configuración específica.
