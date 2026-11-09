# Matriz inicial comprobada — Fitosanitarios y explotación (09/11/2026)

**Versión 0.2.** Fuentes contrastadas:
- **RD**: RD 1311/2012, **Anexo III, parte I, A.1 / A.2 / B** y art. 16, consolidado con modificación 20/11/2025. https://www.boe.es/buscar/act.php?id=BOE-A-2012-11605
- **UE**: Reglamento de Ejecución (UE) 2023/564, art. 1 y anexo, mod. UE 2025/2203. https://www.boe.es/buscar/doc.php?id=DOUE-L-2023-80367
- **MAPA**: registro de autorizaciones de productos: https://servicio.mapa.gob.es/regfiweb
- **JUNTA**: modelo de cuaderno V9 de 10/03/2026: https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/agricultura/cuaderno-explotacion.html

**Ámbito:** primer caso de uso: tratamiento de superficie en **olivar profesional** andaluz. Los tipos semillas, instalaciones, tratamientos no agrarios, etc., tienen otros apartados y no deben reutilizar sin adaptación estos requisitos.

**Regla de lectura:** «Exigido» significa recogido en la norma citada para el supuesto aplicable; «Condicional» significa que la propia norma especifica «en su caso», «cuando proceda» o depende de datos no fijados; «Interno» no se presenta como dato oficial. **La obligatoriedad exacta de cada campo en los mensajes IUWS sigue PENDIENTE de desglosar el Anexo V 3.11 y VII.**

## 1. Información general de explotación (se registra una vez y se versiona)

| Código | Dato y campo candidato | Requisito legal y fuente | Validación/mapeo pendiente |
|---|---|---|---|
| EX-01 | Nombre explotación `holding_name` | Exigido, RD A.1.a | No deducirlo del nombre de la finca visual |
| EX-02 | Dirección explotación `holding_address` | Exigido, RD A.1.a | Reglas de formato IUWS por confirmar |
| EX-03 | Número registro si existe `holding_official_ref` | Condicional, RD A.1.a; REAFA | No inventar prefijos; distinguir SIEX/REAFA |
| EX-04 | Nombre apellidos titular `holder_legal_name` | Exigido, RD A.1.b | Privado, solo datos reales bajo autorización |
| EX-05 | Identificación fiscal titular `holder_tax_id` | Exigido, RD A.1.b | Validar formato/identidad sin publicar en repo |
| EX-06 | Personal propio con carné o condición asesor `qualified_staff` | Condicional, RD A.1.c | Número, habilitación y vigencia |
| EX-07 | Agrupación/entidad asesora reconocida `advisory_entity` | Condicional, RD A.1.d | Verificar en registros autorizados |
| EX-08 | Situación zonas art. 35 `protected_area_context` | Exigido como dato contextual, RD A.1.e | Cálculo geográfico/confirmación, no asumir |
| EX-09 | Captaciones/masas agua consumo y distancias `drinking_water_context` | Según existencia, RD A.1.f–g | Datos ambientales, distancias y excepciones |
| EX-10 | Equipos propios, compra/inspección/ROMA `farm_equipment` | Condicional según equipos, RD A.1.h | No confundir máquinas propias con contratado |

## 2. Ficha oficial de parcela/recinto (por campaña/versión)

| Código | Dato candidato | Requisito y fuente | Validación |
|---|---|---|---|
| PAR-01 | Identificador interno parcela `parcel_ordinal` | Exigido, RD A.2.a | Número dentro de explotación; UUID adicional interno |
| PAR-02 | Referencia SIGPAC `sigpac_ref` | Exigido, RD A.2.b | Descomponer provincia/municipio/polígono/parcela/recinto si lo requiere contrato |
| PAR-03 | Superficie `surface_ha` | Exigido, RD A.2.c | Decimal > 0, exactitud y vigencia |
| PAR-04 | Uso SIGPAC `land_use_code` | Exigido, RD A.2.d | Catálogo oficial/versionado |
| PAR-05 | Cultivo leñoso especie y variedad `crop_species`, `crop_variety` | Condicional según cultivo, RD A.2.d | Olivo/variedad, no deducir por finca |
| PAR-06 | Secano/regadío, sistema riego `irrigation_system` | Exigido con detalles condicionales, RD A.2.e | La finca puede tener sectores distintos |
| PAR-07 | Aire libre/protegido `production_environment` | Exigido con detalles condicionales, RD A.2.e | Adaptable a cultivos diferentes |
| PAR-08 | Certificación/régimen control plagas `certification_scheme` | Condicional, RD A.2.f | Ecológico, integrado u otros si aplica |
| PAR-09 | Vigencia/campaña `valid_from`, `valid_to` | Diseño interno, no columna obligatoria del RD A.2 | Evitar sobrescribir datos históricos |

## 3. Cada tratamiento fitosanitario agrario de superficie

| Código | Campo propuesto / tipo SQL conceptual | Regla RD 1311 Anexo III B | Regla UE 2023/564 | Validación / condiciones |
|---|---|---|---|---|
| FIT-01 | `treatment_date` / DATE | B.a exigido | Fecha exigida | Fecha real; no inferir del momento de alta |
| FIT-02 | `parcel_id` / FK | B.b número identificación parcela | Identificación zona/unidad | Una o varias unidades con superficie trazable; integridad referencial |
| FIT-03 | `pest_code_or_text` / código o texto | B.c plaga a controlar, exigido | No siempre parte mínima UE | Catálogo oficial para IUWS PENDIENTE |
| FIT-04 | `applicator_id` / FK | B.d aplicador, exigido | No listado en columna UE mínima | Identidad profesional, no igual a usuario editor |
| FIT-05 | `advisor_id` / FK nullable | B.d «en su caso», condicional | No mínimo UE | Asesor ROPO/justificación según régimen |
| FIT-06 | `crop_species` / referencia | B.e cultivo/especie, exigido | Cultivo/uso de tierra | Vincular a unidad cultivada versionada |
| FIT-07 | `crop_variety` / referencia | B.e variedad, cuando corresponda | En UE no siempre se detalla | Olivo variedad, evitar texto libre sin control cuando haya catálogo |
| FIT-08 | `treated_area_ha` / NUMERIC | B.f superficie ha exigida para superficie | Ha tratadas | >0 y no exceder área asignada sin explicación/caso especial |
| FIT-09 | `product_name` / VARCHAR | B.g nombre comercial exigido | Nombre exigido | Denominación vigente a fecha de uso |
| FIT-10 | `registration_number` / VARCHAR | B.g número registro exigido | Autorización exigida | Resolver producto en MAPA, no inventar referencia |
| FIT-11 | `equipment_id` / FK | B.h equipo exigido, registro cuando proceda | No mínimo UE | Separar datos del equipo y comprobaciones inspección |
| FIT-12 | `quantity_value` y `quantity_unit` / NUMERIC+código | B.i kilos o litros utilizados, exigido | Registra dosis por superficie | No confundir cantidad total con dosis |
| FIT-13 | `dose_value` y `dose_unit` / NUMERIC+código | Derivable/complementario frente B.i | Dosis por ha exigida para tratamientos superficiales | Unidad y conversión según etiqueta y superficie |
| FIT-14 | `efficacy_assessment` / texto o código | B.j valoración eficacia exigida | No mínimo UE | Puede completarse después del tratamiento, con fecha/autor de evaluación |
| FIT-15 | `observations` / texto | B.k observaciones pertinentes | No mínimo UE | Campo para observaciones relevantes, no necesariamente texto no vacío en todos |
| FIT-16 | `start_time` / TIME nullable | No nombrada en B.a | Solo «en su caso» | Obligatoria cuando producto/uso exige momento específico |
| FIT-17 | `phenological_stage` / código nullable | No nombrada en B.e explícitamente | BBCH «en su caso» | Activar si condición de producto/uso |
| FIT-18 | `location_method` y referencia de terreno | RD B.b + ficha de parcela | Geoespacial o alternativo cuando proceda | No convertir sólo latitud GPS en recinto oficial |
| FIT-19 | `mix_volume` / NUMERIC nullable | No figura en B genérico | No parte base de anexo UE de superficies | Puede exigirse por etiqueta o otro apartado; Anexo V PENDIENTE |
| FIT-20 | `preharvest_interval` + `earliest_harvest_date` | Derivado de etiqueta, no columna B | No columna UE mínima | Medida de seguridad calculada/alerta con versión de etiqueta; no asegurar sin validación |
| FIT-21 | `advisor_justification` / detalle | Art. 11 documentación del asesor cuando proceda | No mínima UE | Anexo V y modalidad de asesoramiento PENDIENTES |
| FIT-22 | `nonchemical_alternatives` / detalle | GIP / documento asesoramiento condicionado | No mínima UE | No exigir texto a todos automáticamente |
| FIT-23 | `attachments` / referencias | Art. 16.3: conservar documentos acreditativos | No requisito de foto en UE | Contratos, facturas, asesoramiento, inspección, análisis si existen; retención >= 3 años |
| FIT-24 | `record_uuid`, `revision`, `official_submissions` | Diseño de trazabilidad interna | No columnas del registro UE | Inmutabilidad de históricos; no confundir con acuse IUWS |
| FIT-25 | `application_method` / código | Relevante para condiciones de uso | Dependiente de producto | PENDIENTE modalidad exacta del Anexo V y etiqueta |

**Advertencia importante:** el anexo RD 1311/2012 contempla valoración de eficacia; la aplicación debe permitir anotar la evaluación posterior sin falsear la fecha del tratamiento. La obligación de consignarla debe revisarse con el CUE oficial en el momento del envío.

## 4. Modelo de tratamiento: normalización sugerida, no SQL final

- `treatment`: UUID, titular/explotación, fecha, causa, aplicador, asesor condicional, estado y revisiones.
- `treatment_target`: relaciona tratamiento ↔ parcela/recinto ↔ superficie; evita arrays de IDs sin claves foráneas.
- `treatment_product`: producto, n.º registro, dosis, unidad, cantidad aplicada, copia de condiciones/versiones de etiqueta; permite varios productos solo si el modelo oficial lo admite y los controla.
- `treatment_equipment`: máquina/equipo e identificador oficial.
- `treatment_followup`: valoración de eficacia y evidencias posteriores.
- `evidence_document`: fichero privado, referencia, hash, tipo, retención, autor y fecha.
- `cue_submission`: envío administrativo versionado, payload, respuesta, acuse y estado **separados** de sync privado.

**No usar un `activity.payload_jsonb` como único lugar sin columnas estructuradas de los campos oficiales.** Se puede conservar JSONB para elementos flexibles, pero los FK, claves y restricciones deben ser consultables, versionadas y verificables.

## 5. Matriz de verificación IUWS aún bloqueada

No hay confirmación de nombres de campos ni obligatoriedad IUWS de esta tabla hasta leer línea por línea **Anexo V 3.11 XLSX** y las instrucciones de la Junta:
- Dónde se identifica en el payload el titular, explotación, campaña, UHC/recinto y producto.
- Enumerados de tipo de uso, catálogo plaga, BBCH, evaluación, unidades y máquinas.
- Si una operación de tratamiento abarca varios recintos o se requiere segmentación.
- Qué datos se pueden modificar tras remisión y cómo se refleja una evaluación posterior.
- Semántica de solicitud/respuesta, rechazos y confirmaciones administrativas.

Fuente índice: https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex
Fuente anexo V: https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex/anexo-v-definicion-de-variables-311

## 6. Datos falsos de prueba para QA

Usar nombres como `Finca QA Olivar Norte`, `Tratamiento QA 001`, explotación `QA-HOLDING-01` y recinto `QA-RECINTO-01`; **no son referencias válidas SIGPAC ni REAFA**. Los mocks de catálogo deben marcarse explícitamente `SIMULADO`, y cualquier aplicación real debe exigir resolución contra códigos oficiales válidos.

## 7. QA / criterios de aceptación

- Crear tratamiento en dos parcelas de una finca, con áreas diferentes; guardar sin conexión.
- Validar producto por nombre y n.º registro, dosis, unidad y cantidad (sin inventar autorización de uso).
- No permitir mostrar «apto para olivar» si la autorización oficial no se ha consultado.
- Guardar aplicación, asesor cuando proceda y equipo; registrar valoración de eficacia posterior sin alterar fecha.
- Adjuntar documentación privada, retener referencias, controlar permisos y simular pérdida de archivos.
- Reiniciar sin perder UUID, relacionar superficie por recinto, descartar reenvíos duplicados.
- Replicar al backend y consultar desde web con controles de acceso y RLS.
- Simular IUWS: enviado / timeout / pendiente / rechazado / acuse, nunca afirmar **aceptado** sin prueba y correlación.
- Rechazar acceso de otra cuenta o explotación; preservar trazabilidad tras anulación.

**Estado:** matriz normativa y conceptual basada en BOE/UE, **NO** matriz de integración IUWS terminada. El siguiente entregable necesita extracción y revisión del FEGA XLSX/Anexo VI DOCX.
