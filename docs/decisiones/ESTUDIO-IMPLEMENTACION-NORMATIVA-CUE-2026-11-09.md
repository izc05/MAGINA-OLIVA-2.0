# Estudio de implementación — requisitos normativos CUE Andalucía (09/11/2026)

**Fecha de consulta:** 2026-11-09  
**Versión:** 0.1 · **Estado:** INVESTIGACIÓN / PROPUESTA TÉCNICA, NO homologación  
**Alcance:** nuevo Mágina Olivo V2, especialmente olivar, con posibilidad de ampliar a otros cultivos y casos de tratamiento.  
**Objetivo:** convertir requisitos BOE/UE/Junta en modelo de datos, reglas verificables, pruebas y decisiones de arquitectura. Las propuestas NO sustituyen al Anexo V FEGA 3.11 ni al contrato IUWS VI 3.11.4.

## 1. Fuentes oficiales verificadas en esta revisión

- **Junta de Andalucía — Cuaderno de explotación**, V9, REAFA, CUE comerciales, habilitación e IUWS: https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/agricultura/cuaderno-explotacion.html (consultado 09/11/2026).
- **RD 1311/2012**, art. 16 y anexo III parte I, información general, parcelas, tratamientos, fertilización y agua: https://www.boe.es/eli/es/rd/2012/09/14/1311/con (consolidado informativo, modificación 20/11/2025).
- **Reglamento de Ejecución (UE) 2023/564**, arts. 1–4 y anexo: https://www.boe.es/buscar/doc.php?id=DOUE-L-2023-80367 ; **modificación UE 2025/2203** https://www.boe.es/buscar/doc.php?id=DOUE-L-2025-81626 . El segundo texto modifica la transición de transferencia electrónica.
- **RD 1051/2022**, arts. 4 y 6 sobre fertilización y plan de abonado, con modificación por **RD 934/2025**: https://www.boe.es/buscar/act.php?id=BOE-A-2022-23052 .
- **RD 1054/2022**, arts. 4, 7, 9 y 10: https://www.boe.es/eli/es/rd/2022/12/27/1054/con .
- **MAPA RegFiWeb**, https://servicio.mapa.gob.es/regfiweb y https://servicio.mapa.gob.es/regfiweb/Productos/Index ; versión observada 1.3.22, actualización de datos 06/11/2026, advertencia explícita de actualización semanal. La interfaz pública muestra opciones de exportación Excel y JSON; **NO se ha probado una API estable ni autorización de reutilización/redistribución masiva**.

## 2. Matriz obligación → implementación → prueba

| ID | Fuente / obligación interpretada | Implementación propuesta | Prueba / condición de salida |
|---|---|---|---|
| N-01 | Explotación inscrita en REAFA para CUE digital andaluz | `holding` separa UUID interno, referencia REAFA, código SIEX, fuente, campaña y verificación | Se permite borrador privado sin REAFA; NO vínculo/envío administrativo |
| N-02 | Anexo III A.1: titular, personal, asesoramiento, zonas de protección, aguas y equipos | `holding_profile_version`, `qualified_person`, `equipment`, `water_protection_context` y evidencias | Datos condicionales activados por contexto; no obligar a todos los titulares a inventarlos |
| N-03 | Anexo III A.2: parcela, SIGPAC, uso, superficie, cultivo, modalidad regadío, certificación | `sigpac_enclosure_version` y `cultivation_unit` con campaña e historial; finca coloquial distinta | La actualización 2027 no reescribe el recinto usado en un tratamiento de 2026 |
| N-04 | Anexo III B: tratamiento de superficie | `treatment` + `treatment_target` + `treatment_product` + `treatment_followup` | Dos recintos con distintas superficies conservan líneas separadas; cantidades y eficacia permanecen trazables |
| N-05 | UE 2023/564: dosis de superficie por ha, localización, cultivo/OEPP y BBCH condicional | Dosis NUMERIC+unidad+base distinta de cantidad total; `crop_code`, `bbch_code`, `use_type`, método de localización y fecha/hora condicional | No aceptar dosis sin unidad; no exigir hora ni BBCH universalmente |
| N-06 | UE anexo: superficies, instalaciones/espacios cerrados y semillas tienen datos y unidades diferentes | Discriminador `treatment_context` (SURFACE/ENCLOSED/SEED) y esquemas condicionales; MVP implementa solo SURFACE olivar | Ningún tratamiento de almacén se introduce falsamente con hectáreas obligatorias; casos no cubiertos aparecen como fuera de alcance |
| N-07 | RD 1311 art. 16: conservación de registros y documentos al menos 3 años | `evidence_document`, políticas de retención, hash y vínculos a actividad/asesor/inspección | Exportación íntegra, huella verificable, sin borrado prematuro |
| N-08 | RD 1051 art. 4.1: asiento de aportes en un mes, con exenciones | Evaluador `fertilization_record_required(holding, date, unit)` con fundamento, versión y explicación | Casos bajo/sobre 5 ha, 1 ha de riego, pastos e invernadero; no crear obligación universal |
| N-09 | RD 1051 art. 4.2: plan de abonado por unidad, regla distinta de asientos | `fertilization_plan_required(unit, date)`; `fertilization_plan` separado de cada `fertilization_application` | Exento de plan ≠ exento de anotar aportes |
| N-10 | Anexo III A.3 + Junta V9 sección 6: caracterización de suelos y excepciones | `soil_profile`, `soil_analysis`, `soil_data_source`, `material_risk`; procedencia (mapa/analítica), vigencia y estado | No exigir analíticas generales sin comprobar publicación de guías y excepción específica; activar metales/lodos si procede |
| N-11 | Anexo III C: fertilización y riego, material, nutrientes, proveedor, forma y cantidad | `fertilizer_material` con composición snapshot; aplicaciones por unidad, dosis, documentos, modalidad y proveedor si corresponde | Mantener N total/orgánico/ureico/nítrico/amoniacal, P/K y casos condicionales según producto; validar unidades |
| N-12 | Junta: alta software, productor individual o entidad habilitada; autorizaciones distintas de roles de app | `official_software_registration`, `official_authorization`, `app_membership` independientes | Usuario con rol administrador de app pero sin autorización oficial NO puede enviar IUWS |
| N-13 | Junta: habilitaciones con actualizaciones generalmente 1 y 15 de mes | Estados PENDING/ACTIVE/REVOKED/EXPIRED con fecha de comprobación | Una solicitud pendiente no habilita IUWS; revocación impide siguientes llamadas |
| N-14 | IUWS y Sga Cex: transporte de solicitudes y acuses, pendiente contrato VI | Adaptador server-only, DTO versionado, `official_submission` con evidencia; no publicar endpoints supuestos | Transporte 200 nunca equivale a aceptación; timeout => UNKNOWN + conciliación |
| N-15 | RegFiWeb: autorización de producto por cultivo, uso y fecha | Snapshot producto/nº registro/etiqueta/versión/fecha de comprobación y política de caché sin permiso automático | Producto no verificado: mostrar PENDIENTE DE VALIDAR; sin recomendaciones de dosis inferidas |

### Cautelas importantes

- Los datos de **fertilización** y el **plan de abonado** son obligaciones distintas y tienen excepciones independientes.
- Los datos agrarios básicos pueden compartirse entre fitosanitarios, fertilización y riego, pero sus actividades y reglas se conservan separadas.
- El **Anexo III del RD 1311** y el **Anexo UE 2023/564** no sustituyen la tabla técnica de variables y validaciones del **FEGA V 3.11**; sin el archivo oficial íntegro NO se aprueba payload IUWS.
- Guardado local, sincronización privada y aceptación administrativa son eventos separados.
- En España, según art. 16 modificado y Junta, los operadores agrarios pueden mantener soporte papel de fitosanitarios hasta 31/12/2026; el registro sigue siendo obligatorio antes de esa fecha. El Reglamento UE es aplicable desde 2026 con transición 2025/2203. No convertir este cambio en obligación de **todo el CUE digital** desde 2027.
- El modelo es específico de olivar al inicio, pero debe permitir otros usos y actividades sin cambiar o inventar requisitos legales.

## 3. Propuesta de motor de reglas (no contrato oficial)

Cada regla se almacenará con: `rule_id`, `source_url`, `article_or_annex`, `version`, `effective_from`, `effective_to`, `scope`, `predicate`, `severity`, `message`, `evidence_status`, `test_case_ids`.

Separar:
1. **Exigencia normativa**: ¿debe registrarse? ¿cuál es el plazo? ¿hay excepción?
2. **Completitud del registro privado**: ¿dispone de información mínima verificable?
3. **Autorización fitosanitaria**: ¿la combinación producto/cultivo/plaga/uso/fecha está respaldada por MAPA?
4. **Contrato IUWS**: ¿el DTO supera reglas de formato/catálogos/identidades según V/VI/VII? (pendiente).
5. **Permiso administrativo**: ¿software, explotación y representante están efectivamente autorizados?

Ejemplo de salida del evaluador para la UI: `{ applicable: true|false|unknown, status: "required"|"exempt"|"conditional"|"pending_verification", ruleId, source, explanation, checkedAt }`. No convertir `unknown` en `false`.

## 4. Tabla inicial de pruebas funcionales (propuestas; olivar, sin otros condicionantes sectoriales)

| Caso QA | Explotación / unidad | Registro fertilización | Plan abonado |
|---|---|---|---|
| FERT-01 | Olivar 4 ha secano, sin otros supuestos | Exención general del asiento del RD 1051 art. 4.1 | Unidad secano <=10 ha exenta del plan |
| FERT-02 | Olivar 7 ha secano | Asiento exigible si hay aporte | Unidad secano <=10 ha exenta del plan |
| FERT-03 | Olivar 12 ha secano | Asiento exigible si hay aporte | Plan exigible desde fecha aplicable |
| FERT-04 | Olivar 3 ha, 2 ha regadío | No cumple excepción de regadío <=1 ha: asiento exigible | Plan en unidad de regadío, salvo otra excepción |
| FERT-05 | Explotación <=5 ha/<=1 ha riego pero invernadero >0,1 ha | Registrar únicamente la información relativa a esas superficies según supuesto legal | Evaluar tipo/unidad específica por separado |

Fitosanitarios: probar misma parcela tratada con distintas fechas/campañas, dosis en L/ha y cantidad total en L, varias parcelas, fecha en 2026 vs 2027, producto desautorizado/no verificable, seguimiento de eficacia posterior, conservación de documentos y asesoramiento condicional.

Seguridad/offline: probar 1) corte de red durante escritura, 2) cierre forzado antes/después de la transacción, 3) duplicado de envío, 4) edición concurrente de dosis, 5) usuario C sin permisos, 6) autorización oficial revocada, 7) respuesta administrativa perdida, 8) cambio de campaña sin pérdida de histórico.

**Nota QA:** la tabla anterior prueba la lógica general documentada, pero no resuelve nitratos, ayudas PAC, zonas de protección, situaciones hídricas ni reglas posteriores. Cualquier excepción debe estar vinculada a fuente y caso concreto.

## 5. Diseño recomendado de primera vertical

1. Crear explotación **ficticia** y titular QA sin datos personales.
2. Agregar 2 recintos ficticios por campaña, con claves locales y referencias SIGPAC expresamente simuladas.
3. Crear tratamiento superficial de olivar con 2 objetivos y un producto marcado TEST, dosis/unidad, cantidad total, aplicador, equipo y fecha.
4. Validar campos mediante reglas versionadas, guardar **atómicamente** registro + evento outbox SQLite; reiniciar sin pérdida.
5. Sincronizar a backend QA con idempotencia y RLS; consultar desde web; comparar revisión e historial.
6. Probar un adaptador **MOCK** para estados enviados, en proceso, aceptado simulado, rechazado y desconocido; jamás mostrar «presentado en Junta».
7. Añadir fertilización y plan de abonado con el evaluador de excepciones; luego riego y caracterización de suelos.
8. Solo después, con anexos completos y autorización, construir DTO/transporte IUWS real.

## 6. Bloqueos y preguntas concretas

### FEGA / Junta (bloqueantes para interoperabilidad real)
- Extraer y cotejar completamente **Anexo V 3.11 (XLSX)**, **VI IUWS 3.11.4 (DOCX)** y **VII catálogos**; guardar versión, fecha, hash, nombre exacto de variable, tipo, condicionalidad, enumeración, operación y regla de rechazo.
- Confirmar credenciales, certificados, alta real de software y modalidad productor individual; documento de autorización, vigencia y revocación, entorno de pruebas y ejemplos aceptados.
- Verificar estados semánticos y plazo real de los acuses; rectificaciones posteriores y reintentos de solicitudes desconocidas.
- Consultar confirmación oficial de detalles no publicados (no inferir SOAP, OAuth o URL final a partir de descriptores).
- Verificar disponibilidad y publicación de las guías de toma/análisis de suelos antes de imponer ese requisito condicional.

### MAPA / producto (antes de recomendar un fitosanitario)
- Evaluar si la exportación JSON pública tiene condiciones, contrato y estabilidad suficientes para alimentar un catálogo; comprobar autorización por **fecha de aplicación**, cultivo y uso.
- Registrar la versión/cache del catálogo y la procedencia; si no se ha comprobado un producto, no declararlo autorizado ni proponer dosis.

## 7. Responsables y puerta de salida

- **Investigación normativa**: cerrar matriz UE/RD/Junta/FEGA y reglas condicionales con fuente.
- **Arquitectura**: implementar evaluador versionado + entidades compartidas + separación estricta app/backend/IUWS.
- **QA**: tests de excepciones, campos, offline, permisos y ausencia de falsos acuses.
- **Administración**: obtener autorización documentada para pruebas oficiales.

**GO** para desarrollar prototipo local y backend QA con datos simulados.  
**NO-GO** para declarar homologación, lanzar integración oficial, usar certificados reales o definir DTO final sin anexos verificados y procedimiento de autorización.

**Enlaces internos relacionados:** [Matriz fitosanitaria](../normativa/MATRIZ-FITOSANITARIOS-BASE-2026-11-09.md), [V9](../normativa/FORMULARIOS-ANDALUCIA-V9-TRAZABILIDAD.md), [Modelo datos](../arquitectura/MODELO-DE-DATOS-REAFA-SIEX-Y-CUE.md), [Hoja de ruta](HOJA-DE-RUTA-Y-BLOQUEOS-ANTES-DE-DESARROLLAR-2026-11-09.md).
