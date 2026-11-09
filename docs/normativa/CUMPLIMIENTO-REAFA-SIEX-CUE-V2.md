# REAFA + SIEX + CUE — Especificación normativa verificable de Mágina Olivo V2

**Versión:** 1.0 (investigación) · **Fecha de corte:** 09/11/2026 · **Estado:** requisitos regulatorios validados a nivel normativo con BOE, FEGA y Junta, **NO homologación ni pruebas IUWS**.

> **Regla de interpretación:** VERIFICADO = existe fuente oficial precisa; DISEÑO = requisito funcional decidido para seguridad/usabilidad, no mandato literal; PENDIENTE = requiere anexo oficial o confirmación de la Junta. El informe externo que se recibió contiene fechas y umbrales derogados/desplazados: **no usarlo directamente para activar bloqueos**.

## 1. Resumen jurídico y decisiones

- **REAFA**: Registro de Explotaciones Agrarias y Forestales de Andalucía. Permite la identificación administrativa de la explotación. La Junta exige inscripción previa para **cumplimentar el CUE digital conectado**. No implica impedir que el usuario prepare una finca o borradores privados en Mágina Olivo.
- **SIEX**: sistema estatal de información e interoperabilidad; **código SIEX** único de **14 caracteres** (prefijo `ES` + 12 dígitos) definido en el RD 1054/2022 art. 2.1.i. No inventar ni generar códigos oficiales; almacenar solo los suministrados por fuente fiable.
- **SIGPAC**: identificación geográfica de parcelas/recintos. No confundir recinto y unidad de manejo propia; ni usar SIEX/REAFA como prueba de propiedad de la tierra. **El RD 1054/2022, DA 5.ª, expresamente advierte que los datos de SIEX no acreditan propiedad ni linderos legales**.
- **CUE**: cuaderno de explotación público (Sga Cex) o comercial; la herramienta privada puede registrar actividades, pero no debe afirmar que un envío está aceptado sin acuse oficial.
- **IUWS**: interfaz de intercambio entre cuadernos comerciales y sistemas REA/CUE. La Junta publica la sustitución de base de URL, no un endpoint completo ni sus mensajes; leer el Anexo VI original.
- **Papel/electrónico**: art. 16.1 RD 1311/2012 actualizado por DF1 RD 1039/2025: para operadores profesionales agrarios se permite registro fitosanitario **en papel hasta el 31/12/2026**. La Junta fija el uso digital para registrar tratamientos **desde el 01/01/2027**.
- **CUE digital general**: RD 1054/2022 art. 9 consolidado tras RD 34/2025: voluntario salvo norma sectorial específica; horizonte próximo marco PAC para obligaciones generales en determinados supuestos. **Los umbrales de 30 ha/5 ha/0,1 ha NO son un filtro de obligatoriedad digital 2026 vigente**, aunque aparecen en versiones anteriores y en contextos sectoriales diferentes.
- **Fertilización**: RD 1051/2022 mod. RD 934/2025: constancia de aportes a partir del **01/01/2026**, con plazo **máximo un mes** y excepciones; plan de abonado desde **01/09/2026**, con excepciones por tipo de unidad y superficie (ver abajo). No deducir que esta información debe transmitirse mensualmente por la IUWS.
- **Conservación fitosanitaria**: mínimo 3 años para registro y documentos justificativos, RD 1311/2012 art. 16.3. La política efectiva del producto deberá contemplar también plazos mercantiles, tributarios, RGPD y otras normas.

## 2. Tabla de trazabilidad jurídica

| ID | Hecho confirmado | Base oficial / detalle | Implicación |
|---|---|---|---|
| LEG-01 | SIEX, REA y CUE son sistemas distintos y relacionados | RD 1054/2022, arts. 2, 4, 5, 9–10 | Mantener identidad administrativa y registros por separado |
| LEG-02 | Código SIEX = ES + 12 dígitos | RD 1054/2022, art. 2.1.i | Persistir `siexCode` validado solo como formato, nunca generarlo |
| LEG-03 | REAFA exige procedimiento y admite alta de oficio | Junta procedimiento 11737, requisitos | Registrar origen de verificación; no asumir alta manual necesaria siempre |
| LEG-04 | Alta/modificación REAFA a instancia de parte: declaración responsable dentro del mes | Junta procedimiento 11737, requisitos | Mostrar orientación y enlace; no tramitar de oficio por app |
| LEG-05 | Trámite REAFA es electrónico; excluye explotaciones solo autoconsumo | Junta procedimiento 11737, descripción | Onboarding según uso profesional/consumo doméstico |
| LEG-06 | Sin REAFA no se puede cumplimentar CUE digital andaluz | Junta, Cuaderno de explotación, sección CUE | Requerir REAFA para **activar vinculación oficial**, NO para guardar borrador privado |
| LEG-07 | Digitalización CUE general voluntaria salvo imposición sectorial | RD 1054/2022 art. 9 consolidado, RD 34/2025 | No utilizar calendario antiguo 2024/25 |
| LEG-08 | Papel fitosanitario agrario hasta 31/12/2026 | RD 1311/2012 art. 16.1, RD 1039/2025 DF1 | Registro electrónico a partir de 01/01/2027 |
| LEG-09 | Identificación y campos de tratamientos | RD 1311/2012 art. 16, Anexo III.I | Construir matriz de tratamiento; contrastar Anexo V FEGA |
| LEG-10 | Documentación de tratamientos y retención mínima 3 años | RD 1311/2012 art. 16.3 | Retención, permiso y exportación |
| LEG-11 | RD 1311/2012 art. 16.5 prevé suministro electrónico al menos mensual | Norma consolidada; alcance práctico sujeto a implementación CUE | No prometer cumplimiento de comunicación por simple guardado offline; confirmar operativa IUWS |
| LEG-12 | Obligación de anotar aportes de nutrientes desde 01/01/2026, máximo un mes, con excepciones | RD 1051/2022 mod. RD 934/2025; Junta CUE, Nota importante | Asistente de fertilización por tipo de unidad/explotación |
| LEG-13 | Plan abonado 01/09/2026, exentas unidades pastos sin fertilizar y secano hasta 10 ha u otros supuestos | Junta, Cuaderno, Nota importante; confirmar aplicabilidad exacta en RD | Evaluación a nivel **unidad de producción**, no solo global |
| LEG-14 | Exención anotaciones nutrientes por superficie <=5 ha y regadío <=1 ha en los supuestos previstos | Junta, Cuaderno, Nota importante y RD 934/2025 | **Es umbral fertilización**, no exención general de tratamientos electrónicos |
| LEG-15 | Cuaderno público o comercial elegido por titular | Junta, CUE digital | Registrar software elegido y vinculación autorizada |
| LEG-16 | Descarga REAFA y envío CUE comercial mediante IUWS | Junta, CUE comerciales; FEGA VI | Conector backend, rutas/operaciones pendientes |
| LEG-17 | Alta del desarrollador/software | Junta, CUE comerciales; FEGA Anexo X §3.1 | Flujo formal del proveedor antes de integración real |
| LEG-18 | Dos modalidades de comunicación IUWS: habilitado y productor individual | Junta, CUE comerciales | No exigir entidad habilitada para **todos** los escenarios |
| LEG-19 | Software comercial puede utilizarse directamente con autorización del agricultor Anexo IX | FEGA Anexo X §§3.1 y 3.3 | Diseñar permisos directos, sujetos a confirmación con Junta |
| LEG-20 | Habilitado REAFA actúa con autorización escrita titular Anexo IV | Junta, sección habilitación; Orden 19/08/2024 | Modelar habilitación administrativa por titular y alcance |
| LEG-21 | Habilitación múltiple <=50 y masiva >50 | Junta, CUE comercial | No inferir soporte masivo listo en aplicación |
| LEG-22 | Habilitación no instantánea, actualización normalmente días 1 y 15 | Junta, novedad 10/08/2026 | Estado `pending_activation`; no habilitar llamadas prematuras |
| LEG-23 | Mágina Olivo no es prueba de propiedad de terreno | RD 1054/2022 DA5 | Mostrar superficie oficial sin pronunciarse sobre titularidad registral |

### Fuentes originales y edición aplicable

- [F01] BOE consolidado RD 1054/2022 (consultado 09/11/2026): https://www.boe.es/eli/es/rd/2022/12/27/1054/con
- [F02] BOE RD 34/2025, publicado 22/01/2025: https://www.boe.es/buscar/doc.php?id=BOE-A-2025-998
- [F03] BOE RD 1311/2012, consolidado actualizado 20/11/2025: https://www.boe.es/buscar/act.php?id=BOE-A-2012-11605
- [F04] BOE RD 1039/2025, DF1, BOE 20/11/2025 y eficacia DF1 23/11/2025: https://www.boe.es/buscar/doc.php?id=BOE-A-2025-23421
- [F05] Junta CUE y CUE comerciales; modelo V9 de 10/03/2026; consultado 09/11/2026: https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/agricultura/cuaderno-explotacion.html
- [F06] Junta REAFA procedimiento 11737, ficha actualizada 09/03/2026: https://www.juntadeandalucia.es/servicios/sede/tramites/procedimientos/detalle/11737.html
- [F07] RD 934/2025 modifica nutrición RD 1051/2022: https://www.boe.es/buscar/doc.php?id=BOE-A-2025-21211
- [F08] Junta Orden 19/08/2024: https://www.juntadeandalucia.es/boja/2024/166/9
- [F09] FEGA Anexo X mayo 2024, registro CUE comerciales: https://www.fega.gob.es/sites/default/files/files/document/2024.05.17-ANEXO_X-ProcedimientoAutorizacionCUE_PUBLICADO.pdf

## 3. Requisitos funcionales comprobables

| Requisito | Tipo | Comportamiento obligatorio en V2 | Prueba de aceptación |
|---|---|---|---|
| REA-01 | DISEÑO desde LEG-06 | Permitir crear borrador de explotación aunque no figure en REAFA | Usuario nuevo crea tres fincas QA sin conexión |
| REA-02 | DISEÑO desde LEG-06 | Bloquear únicamente **vinculación/envío administrativo** cuando REAFA no verificado | Borrador se guarda; botón IUWS deshabilitado con explicación |
| REA-03 | DISEÑO | Guardar `reafaReference?`, `siexCode?`, fuente/fecha/estado sin inventarlos | Identificadores nulos válidos, no generan falso código |
| REA-04 | DISEÑO | Titular distinto de propietario y de usuarios colaboradores | Rol interno no otorga poder administrativo |
| REA-05 | DISEÑO | Finca interna ≠ explotación REAFA; 1 explotación ↔ varias fincas ↔ recintos | Tres fincas, cuatro recintos, superficie históricamente estable |
| REA-06 | DISEÑO | Versionar cultivo/superficie/uso/arrendamiento por campaña | Modificación 2027 no altera ficha 2026 |
| REA-07 | DISEÑO | Autorizar por titular, explotación, servicio, vigencia, revocación | Revocado impide envío sin borrar cuaderno privado |
| REA-08 | DISEÑO | Almacenar estado administrativo verificado separado del registro local | No etiqueta «presentado» con solo HTTP 200 o `synced` |
| SIEX-01 | VERIFICADO formato | Código SIEX almacenado como `ES[0-9]{12}` si recibido oficialmente | Rechaza formato incorrecto; no lo genera automáticamente |
| SIEX-02 | DISEÑO | Guardar origen/vigencia del código de explotación y referencias SIGPAC | Importación de campaña tiene control de versión y autoridad |
| CUE-01 | DISEÑO | Formularios fitosanitarios alineados con RD Anexo III y FEGA V | Cada campo obligatorio/condicional tiene prueba y fuente |
| CUE-02 | DISEÑO | Papeles/registros anteriores se importan sin falsear la fecha | Registro de 2025 sigue con fecha real y procedencia |
| CUE-03 | DISEÑO | Distinción `LOCAL_ONLY`, `PRIVATE_SYNCED`, `OFFICIAL_PENDING`, `OFFICIAL_ACCEPTED` | UI nunca confunde servidor y Junta |
| CUE-04 | DISEÑO | Validación de autorización de producto MAPA a fecha de uso y cultivo | Sin catálogo/no verificable: borrador, no recomendación de uso |
| CUE-05 | DISEÑO | Gestión de documentos justificativos privados mínimo 3 años, salvo retenciones más largas | Control permisos/descarga/retención |
| FER-01 | LEG-12 + DISEÑO | Registro aportes según supuestos, plazo mes y excepciones | Escenarios 3 ha secano, 12 ha secano, 6 ha regadío |
| FER-02 | LEG-13 + DISEÑO | Plan abonado cuando corresponda según unidad | Pasto no fertilizado exento; secano y unidad se calculan por norma |
| IUWS-01 | PENDIENTE | Alta desarrollador + certificado público + autorización titular | No conector real hasta prueba oficial |
| IUWS-02 | PENDIENTE | Contrato técnico exacto FEGA VI 3.11.4 | Parser/cliente generado desde especificación real, tests |
| IUWS-03 | DISEÑO | Idempotencia/conciliación de errores antes de retransmisión | Timeout genera estado UNKNOWN, no un doble envío |
| MIG-01 | DISEÑO | No perder UUID/Room/operaciones pendientes de V1 | QA compara UUID, kg, euros, documentos y FKs |

**Campos de normativa versus IUWS:** una regla jurídica VERIFICADA **no acredita** por sí misma cuál es la clave JSON/XML en un mensaje FEGA. Las columnas de integración siguen condicionadas al Anexo V/VI originales.

## 4. Diagrama realista y dominio de referencia

```text
                      ESTADO / FEGA-SIEX
                 Intercambio interoperable de datos
                              ▲
                              │
                REAFA (Andalucía, origen oficial)
                     │  Explotación, titular,
                     │  unidades/recintos/cultivos
                     ▼
           CUE público Sga Cex  ◄── IUWS ──►  CUE Mágina Olivo
                                          │
                                   APP Android/iOS/Web
                                          │
                        SQLite local ↔ API/Supabase ↔ PostgreSQL
                                          │
                                 Economía / campañas
                           (privadas, no todo va a IUWS)
```

Nota: es un **diagrama conceptual**, no especifica enlaces de red ni asegura que Mágina Olivo tenga permisos activos. SIEX es un conjunto de registros e intercambio; no una única URL donde la app debe subir todos los datos.

## 5. Riesgos de no-conformidad

- Mostrar que un registro privado está presentado oficialmente.
- Aplicar los umbrales antiguos 30 ha/5 ha/0,1 ha como condicional de CUE electrónico en 2026.
- Tratar el código SIEX como referencia de finca o acreditar titularidad registral.
- Confiar en usuario con rol `admin` de Supabase como si fuese representante oficial.
- Presentar una autorización `Anexo IV` como equivalente al consentimiento directo `Anexo IX`.
- Exigir todos los campos de asesoramiento a todas las explotaciones sin condiciones.
- Retener NIF y documentos sin base, protección y permisos apropiados.
- Perder histórico o duplicar tratamiento ante timeout.
- Generar códigos SIGPAC oficiales falsos para modo demo.

## 6. Bloqueos vigentes de la especificación

1. **FEGA Anexo V 3.11 XLSX**: confirmar tablas de variables y obligatoriedad real IUWS por operación.
2. **FEGA Anexo VI 3.11.4 DOCX**: extraer métodos, estructuras, autenticación, errores, acuses y ejemplo oficial.
3. **Catálogos FEGA VII y referencia MAPA**: codificaciones, versiones, vigencia y actualizaciones.
4. **Procedimiento andaluz individual**: confirmar ruta real, certificados, entorno de pruebas y revocación.
5. **RGPD, encargado/responsable y plazos adicionales**: revisión antes de producción.

**No-GO:** no iniciar IUWS real, producción ni migraciones del backend histórico hasta superar estos bloqueos.
