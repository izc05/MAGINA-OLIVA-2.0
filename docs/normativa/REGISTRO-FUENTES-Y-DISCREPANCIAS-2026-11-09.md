# Registro de fuentes, contradicciones y trabajo pendiente (N0) — Mágina Olivo V2

**Corte documental:** 09/11/2026. Para fuentes oficiales actualizar sus enlaces, versión y fecha de consulta antes de programar reglas. **No guardar en repo público copias de datos de usuarios ni certificados.**

## 1. Inventario de fuentes y acceso

| ID | Fuente primaria | Edición encontrada | Lectura efectuada | Implicación |
|---|---|---|---|---|
| BOE-01 | [RD 1054/2022 consolidado](https://www.boe.es/eli/es/rd/2022/12/27/1054/con) | Consolidado tras RD 34/2025 | Sí, art. 2, 9, DA5 | SIEX, voluntariedad digital, código 14 caracteres |
| BOE-02 | [RD 34/2025](https://www.boe.es/buscar/doc.php?id=BOE-A-2025-998) | 22/01/2025 | Sí, cambio art. 9 RD1054 y art16 RD1311 | Deroga/reconfigura calendario previo |
| BOE-03 | [RD 1311/2012 consolidado](https://www.boe.es/buscar/act.php?id=BOE-A-2012-11605) | Actual. publicada 20/11/2025 | Sí, art. 16 y Anexo III base | Fitosanitarios, documentos, 3 años, comunicación |
| BOE-04 | [RD 1039/2025](https://www.boe.es/buscar/doc.php?id=BOE-A-2025-23421) | 20/11/2025, DF1 eficaz 23/11 | Sí, DF1 | Papel hasta 31/12/2026 |
| BOE-05 | [RD 934/2025](https://boe.es/buscar/doc.php?id=BOE-A-2025-21211) | 22/10/2025 | Parcial + resumen oficial Junta | Fertilización/plan con excepciones |
| BOJA-01 | [Orden 19/08/2024](https://www.juntadeandalucia.es/boja/2024/166/9) | BOJA 2024/166 | Sí para habilitación y cambios de REAFA | Representación administrativa |
| JUN-01 | [Junta CUE](https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/agricultura/cuaderno-explotacion.html) | V9 10/03/2026; página viva | Sí | Calendario 2027, procedimientos IUWS, modalidades |
| JUN-02 | [REAFA trámite 11737](https://www.juntadeandalucia.es/servicios/sede/tramites/procedimientos/detalle/11737.html) | Ficha actualizada 09/03/2026 | Sí | REAFA, declaraciones, plazo 1 mes, exclusiones |
| JUN-03 | [Modelo V9 PDF](https://www.juntadeandalucia.es/sites/default/files/inline-files/2026/03/20260310_MODELO_DE_CUADERNO_DE_EXPLOTACION_v9.pdf) | 10/03/2026, 22 páginas | Secciones/hojas relevantes consultadas, incl. 2.1, 3.1, 3.1 bis y fertilización | Aporta formulario, **no contrato IUWS** |
| FEGA-00 | [Índice SIEX](https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex) | V3.11 y VI 3.11.4 | Sí, portada/índice | Fija versión de anexos |
| FEGA-05 | [Anexo V 3.11 XLSX](https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex/anexo-v-definicion-de-variables-311) | 3.11, corrección publicada 20/11/2025 | **No se logró descargar/examinar archivo XLSX** | BLOQUEA matriz exacta SIEX/REA/CUE |
| FEGA-06 | [Anexo VI 3.11.4 DOCX](https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex/anexo-vi-interfaz-unico-comun-3114) | 3.11.4, actualizado 19/11/2025 | **No se logró descargar/examinar archivo DOCX** | BLOQUEA contrato y endpoints IUWS |
| FEGA-07 | [Anexo VII catálogos](https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex) | Índice actual | Solo índice; no catálogos desglosados | BLOQUEA validación por código |
| FEGA-08 | [Anexos VIII y IX](https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex) | Índice actual | Publicación confirmada, formularios no extraídos | Confirmar alcance documental |
| FEGA-10 | [Anexo X PDF](https://www.fega.gob.es/sites/default/files/files/document/2024.05.17-ANEXO_X-ProcedimientoAutorizacionCUE_PUBLICADO.pdf) | Versión publicada 28/05/2024, 13 págs. | **Sí**, secciones 3.1, 3.2, 3.3 y capturas | Desarrollador/entidad/titular |
| MAPA-01 | [Registro Oficial Productos Fitosanitarios](https://servicio.mapa.gob.es/regfiweb) | Servicio en vivo | Referencia identificada, sin contrato API/descarga | Validar usos/etiquetas por fecha y olivar |
| EU-01 | [Reglamento UE 2023/564](https://www.boe.es/buscar/doc.php?id=DOUE-L-2023-80367) | Modificado por normativa posterior | Revisión parcial | Formato y campos mínimos, revisar consolidado |

**Rutas de descarga encontradas (ficheros oficiales; NO han sido leídos y los hashes están pendientes):**
- Anexo V: https://www.fega.gob.es/sites/default/files/files/document/2025.11.20-ANEXO_V_Definicion_de_variables_3.11_CORRECCION_ERRORES_PUBLICACION.xlsx
- Anexo VI: https://www.fega.gob.es/sites/default/files/files/document/2025.11.19-ANEXO%20VI.Interfaz%20%C3%9Anico%20Com%C3%BAn_V3_11_4.docx
- Anexo X PDF leído: https://www.fega.gob.es/sites/default/files/files/document/2024.05.17-ANEXO_X-ProcedimientoAutorizacionCUE_PUBLICADO.pdf

En esta revisión, el navegador pudo resolver las páginas y los PDF; la descarga del XLSX/DOCX no fue posible, por lo que sus contenidos no han sido extraídos. **No es evidencia de que esos anexos estén vacíos o sean inaccesibles para un navegador normal**.

## 2. Discrepancias del texto remitido y correcciones

| Claim del texto recibido | Dictamen | Causa | Acción |
|---|---|---|---|
| Registro electrónico obligatorio 01/01/2026 | **FALSO como fecha actual** | RD 1039/2025 permitió papel hasta 31/12/2026 | Sustituir por 01/01/2027 |
| RD 34/2025 «fija la fecha definitiva 2026» | Desactualizado | Reforma posterior 2025 | Añadir fecha y referencia DF1 RD1039 |
| CUE desde 2024/25 por >30 ha/>5 ha/>0,1 ha | **No vigente como filtro general 2026** | Cláusulas anteriores RD1054 | Eliminar de motor de obligación CUE |
| Olivar 12 ha secano exento electrónicamente por umbral | **Incorrecto si se aplica a fitosanitarios desde 2027** | Confusión con umbral anterior, fertilización | Evaluar por norma sectorial, no tamaño heredado |
| Sin REAFA no permitir crear CUE | Sobre-restrictivo | ReaFA obligatorio para **CUE digital vinculado** | Permitir borrador privado, bloquear solo vinculación oficial |
| REAFA y SIEX códigos de ejemplos ficticios válidos | No demostrado | SIEX sí tiene formato oficial, REAFA no fijado por ejemplo | No fabricar IDs oficiales |
| Desarrollador no habilitado = no IUWS | **Simplificación riesgosa** | FEGA X contempla agricultor directo Anexo IX | Diseñar productor individual + habilitado |
| Toda autorización usa Anexo IV | Incompleto | Anexo IV habilitado Junta; Anexo IX software FEGA | Modelar separado y consultar Junta |
| Datos económicos de factura = datos oficiales CUE | No demostrado | No todas las finanzas se envían | Módulos comerciales separados |
| Cualquier lectura de producto MAPA implica uso seguro | No demostrado | Vigencia/etiqueta/cultivo/dosis/registro | Validación condicionada a producto, uso y fecha |
| Siempre cifrado SQLite con Expo | No demostrado | `expo-sqlite` no es cifrado por defecto | Diseñar cifrado y test |
| IUWS ya listo con URL base | No demostrado | Base no es contrato completo | Extraer Anexo VI + alta oficial |

## 3. Trabajo N0 que hay que terminar antes de construir el CUE definitivo

**N0.1 — Matriz FEGA V**: abrir XLSX oficial (hojas REA/CUE), exportar cada variable con **hoja+fila o código**, nombre, tipo, categoría, obligatoriedad, condición, formato, catálogo, equivalente V9, BD, pregunta/resolución y test. Conservar versión y hash del archivo *internamente*; no subir datos privados.

**N0.2 — Contrato IUWS VI**: abrir DOCX oficial y registrar **sección/página, operación exacta, método, URL/path, protocolo, autenticación/certificado, request/response, errores, idempotencia, consulta de estados/acuse**, solo tal como aparece, y diferencias de despliegue Andalucía. Validar en mock; no llamar endpoints reales.

**N0.3 — Catálogos VII**: asignar códigos de provincia, municipio, uso, cultivo, plaga, variedad, unidades, equipos, fertilización con origen/versionado. Distinguir catálogos MAPA y FEGA, no mezclarlos.

**N0.4 — Modelo Junta V9**: cubrir 22 páginas: fechas, plantas leñosas, asesoramiento ordinario/3.1bis, semillas, postcosecha, locales, transporte, residuos, cosecha comercializada, suelos, abonado, riego, PAC. Generar matriz de diferencias V9 vs FEGA V.

**N0.5 — Confirmación administrativa**: preguntar por persona física desarrolladora, modalidad productor individual, Anexo IX, certificado, test, revocación, respuesta/acuse real y documentación de integración.

**GO N0**: 100 % campos requeridos del caso «olivar, tratamiento en superficie» tienen **fuente/versión/regla/catálogo/prueba**, y los no resueltos están marcados como NO-GO para transmisión. No confundir objetivo de QA con la obligación de todos los casos de cultivo.

## 4. Roadmap con tareas para Codex y Claude

| Fase | Responsable | Entrega mínima | Verificación |
|---|---|---|---|
| N0 | Codex | Matriz exacta FEGA V + contrato VI + catálogos VII | Revisión cruzada con fuente, hashes |
| N0 UX | Claude | Flujo 3.1 y 3.1 bis con secciones del modelo Junta V9 | No exigir asesoramiento a todos |
| N1 | Coordinación/Junta | Alta CUE, modalidad individual/habilitado y acceso pruebas | Evidencia administrativa, no hipótesis |
| N2 | Codex | Modelo TS, permisos, contratos de validación y fixtures | Tests unitarios y RLS |
| N3 | Claude | Expo Android/web, una explotación y un tratamiento | Persistencia móvil y uso web demostrados |
| N4 | Codex | Sync A/B/C, conflicto, idempotencia | No fuga ni duplicados |
| N5 | Codex | Mock con contrato oficial FEGA VI | Todos los errores y acuses simulados explícitos |
| N6 | Tras aprobación | Entorno de pruebas oficial | Respuesta auténtica y trazable |
| N7 | Claude+Codex | Migración de fincas/parcelas/campañas/economía V1 | Totales/UUID/documentos conciliados |

## 5. Normas para la próxima investigación

- Priorizar BOE/BOJA consolidado, luego FEGA y Junta; conservar citas al artículo/epígrafe exacto.
- Registrar fecha de consulta y modificación; no mezclar textos históricos y vigentes.
- Cualquier dato sin referencia se etiqueta **HIPÓTESIS**, nunca «VERIFICADO».
- Documentos técnicos de FEGA son fuentes de contrato; un artículo del BOE no establece automáticamente nombres de los campos del API.
- No tratar fotos, ejemplos de competidores o Google Play como pruebas de compatibilidad administrativa.
- Mantener repo público libre de datos reales y certificados.
