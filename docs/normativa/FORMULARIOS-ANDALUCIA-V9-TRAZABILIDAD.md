# Correspondencia de formularios con modelo oficial Andalucía V9

**Modelo verificado:** PDF oficial del 10/03/2026, 22 páginas. **Fecha consulta:** 09/11/2026.  
Fuente directa: https://www.juntadeandalucia.es/sites/default/files/inline-files/2026/03/20260310_MODELO_DE_CUADERNO_DE_EXPLOTACION_v9.pdf

**Este documento transcribe etiquetas de secciones y describe campos del PDF V9**, pero **no** acredita el nombre del campo ni su obligatoriedad exacta en el FEGA Anexo V 3.11/IUWS. Se trata de matrices distintas y ambas se necesitan.

## 1. Índice funcional de secciones V9

| Sección del cuaderno V9 | Ubicación PDF 0-index | Interfaz V2 | Estado |
|---|---:|---|---|
| 1. Información general | 1–2 | Datos titular/explotación, personal, equipos | VERIFICADO estructura |
| 2. Identificación parcelas explotación | 3–4 | SIGPAC y ficha de recinto/cultivo | VERIFICADO estructura |
| 3.1 Actuaciones fitosanitarias parcela | 5 | Alta de tratamiento estándar | VERIFICADO campos |
| 3.1 bis Actuaciones por parcela, **solo objeto de asesoramiento** | 6 | Asesoramiento y justificación condicional | VERIFICADO campos |
| 3.2 Semilla tratada y 3.3 postcosecha | 7 | Módulos especiales futuros | VERIFICADO secciones |
| 3.4 Locales y 3.5 transporte | 8 | Módulos especiales futuros | VERIFICADO secciones |
| 4. Análisis de residuos de fitosanitarios | 9 | Documentos de resultados analíticos | VERIFICADO sección |
| 5. Cosecha comercializada | 10 | Producción y trazabilidad, no economía íntegra | VERIFICADO sección |
| 6. Caracterización de suelos | 11 | Suelo/laboratorio, metales pesados cuando proceda | VERIFICADO sección |
| 7. Fertilización | 12–15 aprox. | Aportes, plan de abonado, productos/empresas y nutrientes | VERIFICADO sección, falta desglose total |
| 8. Riego | 16 aprox. | Actividades de riego | VERIFICADO sección, falta desglose total |
| 9. Ecorregímenes y 10. ayudas asociadas | páginas finales | Actividades condicionadas por PAC | VERIFICADO existencia |

*Los índices son páginas **0-index** del archivo PDF, no «hoja nº» impresa.*

## 2. Formulario 3.1 — tratamiento ordinario de parcela

**Campos visibles de la página 6 impresa (PDF índice 5):**

| Etiqueta oficial V9 | Variable candidata | Comportamiento propuesto |
|---|---|---|
| Id. parcelas | `targets[].parcelOrder` | Selección 1..N fincas/recintos y referencia al número de orden |
| Cultivo: especie | `crop.species` | Valor desde ficha agronómica versionada |
| Cultivo: variedad | `crop.variety` | Si procede, desde ficha de cultivo |
| Intervalo de fechas | `application.dateFrom/dateTo` | Soportar fecha concreta o intervalo sin alterar fecha real |
| Superf. tratada (ha) | `targets[].treatedAreaHa` | Si varias parcelas, conservar área individual |
| Problema fitosanitario | `pest` | Plaga/problema, no usar catálogo inventado |
| Aplicador | `applicatorId` | Relacionar persona de información general |
| Equipo | `equipmentId` | Referencia a equipo utilizado en explotación |
| Nombre comercial / sustancia activa | `products[].name` | Validación MAPA cultivo/fecha/uso |
| Nº Registro | `products[].registration` | Verificar autorización en MAPA |
| Dosis (kg/ha o l/ha) | `products[].dose` y unidad | Validar unidad contra etiqueta y superficie |
| Eficacia | `followUp.efficacy` | V9 indica buena, regular o mala; admitir valoración posterior |
| Observaciones | `notes` | No confundir con requisito de justificar asesoramiento |

**Diseño móvil:** paso 1 parcela/cultivo; paso 2 tratamiento/fecha; paso 3 producto/dosis; paso 4 aplicador/equipo; paso 5 revisión/guardar. El orden de pasos es una **decisión UX**, no obligación legal. La fecha, plaga, producto, cantidad y otros campos deben revisar también **RD 1311 Anexo III**, que añade datos respecto a la plantilla V9 visible.

## 3. Formulario 3.1 bis — cultivos y superficies objeto de asesoramiento

Es una ficha **diferenciada**, con texto explícito «SOLAMENTE PARA CULTIVOS Y SUPERFICIES OBJETO DE ASESORAMIENTO». No mezclar sus campos con el tratamiento estándar en una obligatoriedad universal.

| Grupo V9 | Campos visibles | Activación |
|---|---|---|
| Cultivo | Especie, variedad | Desde ficha de cultivo |
| Datos parcela | Identificación, superficie cultivada, tratada | Por recinto/área |
| Plaga | Plaga; justificación de la actuación (umbrales, meteo, etc.) | **Solo si objeto asesoramiento** |
| Alternativas no químicas | Tipo de medida, intensidad (trampas/difusores...), fecha | Solo si corresponde a ficha asesoramiento |
| Alternativas químicas | Producto/sustancia, nº registro, dosis, fecha actuación | Solo en tratamiento/asesoramiento correspondiente |
| Resultado | Eficacia (buena, regular, mala), observaciones | Documentar seguimiento |
| Validación intermedia | Firma, asesor, inscripción ROPO, fecha | Procedimiento del asesor, no firma simulada |
| Validación final | Firma, asesor, inscripción ROPO, fin campaña | Procedimiento del asesor, no firma simulada |

**Criterio QA:** una explotación `without_advisory` no puede recibir automáticamente un formulario de asesoramiento obligatorio. Si la explotación sí está asesorada, esa condición se demuestra, se conserva y determina reglas de validación y firma. Un campo «Firma» de papel NO implica que IUWS acepte una firma digital inventada: confirmar contrato exacto.

## 4. Hoja 2.1 — identificación de parcela

La V9 lista: código provincia, término municipal, código agregado, zona, polígono, parcela, recinto, uso SIGPAC, superficie SIGPAC, superficie cultivada, especie, variedad, secano/regadío, aire libre/protegido, sistema asesoramiento GIP.

**Arquitectura:** registrar los componentes con tipo/validación, origen de dato, campaña y geometría versionada; los nombres internos del usuario («Olivos de arriba») se guardan aparte. La clasificación de asesoramiento emplea códigos indicativos AE, PI, CP, Atrias, AS y NO en el pie de página de la V9: **no suponer que sean códigos IUWS**, resolver en FEGA VII.

## 5. Servicios de aplicación recomendados

- `getHoldingProfile(holdingId, campaign)`: devuelve titular, equipos, asesor/ROPO, parcelas, variedades y reglas que aplican.
- `startTreatmentDraft(holdingId, targetEnclosures)`: precarga datos verificados, pero permite registrar sin red.
- `validateTreatmentLocally(draft, rulesVersion)`: informe con errores, advertencias y fuente de cada regla.
- `validateProductUse(registration, crop, date, applicationType)`: requiere fuente oficial MAPA; sin red/cache vigente = «pendiente de verificar», nunca recomendar uso.
- `saveDraftAtomically(draft)`: documento y outbox local, sin datos oficiales inventados.
- `finalizeAdvisoryFollowup(treatmentId, advisorEvidence)`: revisión posterior preservando el original.
- `prepareOfficialSubmission(treatmentId)`: **solo backend** tras identidad/contrato/consentimiento autorizado, con DTO FEGA del anexo vigente.
- `showOfficialStatus(submissionId)`: distingue envío privado y acuse administrativo real.

## 6. Pruebas que debe implementar Claude

1. Formulario ordinario de olivar sin asesoramiento: **no** obliga a justificación de alternativas del 3.1 bis.
2. Formulario asesorado: incluye condiciones, alternativas, asesor y validación intermedia/final.
3. Formulario crea tratamiento con varias parcelas, superficies y variedad; conserva versión histórica.
4. El agricultor puede guardar borrador si REAFA no está verificado; no puede enviar IUWS.
5. Intercambio offline/online no duplica los tratamientos ni la evaluación de eficacia.
6. No muestra «producto autorizado» si no se ha validado su uso para olivar.
7. Importación de papel anterior conserva fecha y origen; no afirmar envíos oficiales.
8. El documento inspector muestra firma y registros reales, no inventados.
9. Productor sin cobertura puede consultar los campos precargados y su procedencia.
10. El backend valida las mismas restricciones antes de pasar al adaptador oficial.

**PENDIENTE:** comparación **columna por columna con Anexo V FEGA 3.11** y confirmación en IUWS del modo de expresar múltiples recintos, seguimiento de eficacia y firma de asesor.
