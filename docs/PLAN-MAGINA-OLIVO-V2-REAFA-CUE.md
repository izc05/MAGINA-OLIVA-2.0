# Mágina Olivo V2 — plan maestro técnico y normativo

**Versión del documento:** 0.1 · **Fecha de revisión:** 2026-11-09  
**Estado:** propuesta de arquitectura; NO implementada; NO certificada; NO conectada a IUWS.  
**Prioridad:** cumplimiento REAFA/CUE y validación de tratamientos fitosanitarios antes de ampliar economía, IA y roles.

> Este repositorio es **público**. Nunca guardar DNI/NIF reales, certificados o claves privadas, credenciales, datos de fincas reales, copias de bases de datos, tokens de prueba o información de agricultores. Las pruebas deben usar datos ficticios. Este documento no sustituye confirmación escrita de la Junta ni revisión jurídica.

## 0. Decisión y límites

- **Tecnología objetivo:** TypeScript, React Native y Expo Router para la primera aplicación universal Android/iOS/web. Si la web necesita tablas, mapas o administración de gran tamaño, extraer una web React especializada sin duplicar el dominio.
- **Backend previsto:** PostgreSQL/Supabase, sujeto a revisión de autorización por explotación, RLS, auditoría y sincronización. No reutilizar automáticamente el proyecto DEV anterior.
- **Offline móvil:** SQLite local, outbox de operaciones, reintentos idempotentes y resolución de conflictos comprobada. La persistencia web se evalúa separadamente.
- **Integración Junta:** servicio backend aislado `cue-connector` que valide y mapee contratos oficiales. Nunca exponer certificados, firma o credenciales administrativas en la app o navegador.
- **Código anterior:** conservar `izc05/magina-olivo-v20` y la APK Kotlin validada como referencia. Reaprovechar procesos, reglas y pruebas; no asumir que Room o Compose pueden copiarse automáticamente a TypeScript.
- **Criterio:** probar **una vertical completa** antes de migrar Campañas, economía y demás módulos. No ejecutar despliegues ni API oficiales sin autorización.

## 1. Hechos normativos contrastados (consultados el 09/11/2026)

| Tema | Estado verificado | Fuente |
|---|---|---|
| Inscripción REAFA | La explotación debe estar inscrita en REAFA para cumplimentar CUE digital andaluz. | Junta, Cuaderno de explotación |
| Software comercial | La Junta contempla CUE comercial elegido por titular y comunicación con IUWS; la empresa desarrolladora debe dar de alta el software y aportar la parte pública de su certificado. | Junta, CUE comerciales |
| Vías de acceso | Productor individual o entidad habilitada. La representación administrativa no equivale a un rol dentro de la aplicación. | Junta, Cuaderno; Orden de 19/08/2024 |
| Digital obligatorio | La Junta indica obligatoriedad digital para registros de tratamientos fitosanitarios desde **01/01/2027**; para el cuaderno completo se aplaza en general al próximo marco PAC, salvo normativa sectorial. | Junta, Obligatoriedad CUE |
| Fertilización | La Junta indica obligaciones de registro en 2026 y plan de abonado, con umbrales/excepciones. Deben codificarse condicionalmente por explotación, no marcarse todos los campos obligatorios para todos. | Junta, Cuaderno |
| Formato oficial | Modelo andaluz de Cuaderno V9 de 10/03/2026 y documento técnico SIEX. | Junta; FEGA |
| Contrato de integración | FEGA presenta Anexo V (variables 3.11), VI (IUWS 3.11.4), VII (catálogos), VIII–X (representación, acceso y registro de aplicaciones). | FEGA, documentación SIEX |
| Endpoint Andalucía | La Junta publica `https://ws108.juntadeandalucia.es/` como sustitución de la base genérica del Anexo VI. **No inferir rutas, autenticación ni payloads a partir de esa base**. | Junta, CUE comerciales |

**Pendiente de verificación de ingeniería:** descargar los anexos originales DOCX/XLSX del FEGA, anotar revisión y hash de cada archivo, inventariar variables/códigos, opcionalidad condicionada, esquemas, operaciones reales IUWS, autenticación/firma, controles de acceso, acuses, errores, cambios y entornos disponibles. No afirmar interoperabilidad certificada antes de completar ese trabajo.

### Referencias oficiales vivas

1. Junta — [Cuaderno de explotación / REAFA, CUE e IUWS](https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/agricultura/cuaderno-explotacion.html)
2. Junta — [Registro REAFA](https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/agricultura/produccion-agricola/paginas/reafa.html)
3. Junta — [Procedimiento administrativo REAFA 11737](https://www.juntadeandalucia.es/servicios/sede/tramites/procedimientos/detalle/11737.html)
4. BOJA — [Orden 19 de agosto de 2024](https://www.juntadeandalucia.es/boja/2024/166/9)
5. FEGA — [Documentación Técnica Agrícola SIEX](https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex)
6. FEGA — [Anexo VI IUWS 3.11.4](https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex/anexo-vi-interfaz-unico-comun-3114)

**Regla:** consultar periódicamente versiones y modificaciones normativas. Las páginas oficiales son fuente de verdad; los campos mencionados abajo son **modelo candidato de análisis**, no una transcripción exhaustiva certificada del Anexo V.

## 2. Modelo de dominio normativo (propuesta, NO esquema SQL aprobado)

| Agregado | Identificadores / relaciones | Observaciones |
|---|---|---|
| `Account` / `Person` | UUID interno, identidad verificada por separado | No usar el correo como identificador administrativo; datos sensibles protegidos. |
| `Holder` (titular) | Identidad y condición administrativa | Diferenciar titular, arrendatario, representante y usuario de la app. |
| `OfficialHolding` | UUID interno + identificador REAFA/SIEX y versión/campaña | **No equivale** a la finca visual creada por el agricultor. |
| `Farm` | UUID interno + `officialHoldingId?` | Agrupación operativa propia; varias fincas pueden pertenecer a una explotación. |
| `OfficialParcel / CultivationUnit` | Identificación SIGPAC/REAFA, superficie, uso, cultivo y vigencia | Gestionar cambios por campañas, recintos y posibles UHC. No asumir 1 finca = 1 recinto. |
| `Treatment` | UUID, explotación, fecha, unidades/parcelas tratadas, cultivo, producto, plaga, dosis, cantidad, superficie | Los campos obligatorios exactos y restricciones deben provenir del Anexo V y normas aplicables. |
| `ProductReference` | Producto, nº de registro, validez temporal y condiciones | Referenciar catálogo oficial MAPA y conservar versión; nunca inventar dosis o plazo de seguridad. |
| `ApplicationOperator / Equipment` | Identidad/habilitación del aplicador, asesor/equipo si procede | Verificar requisitos y excepciones para cada actividad. |
| `FertilizationRecord` | Aporte, fecha, parcela/UHC, producto/nutrientes, dosis, otros condicionados | Modelo separado de fitosanitarios; obligaciones por normativa sectorial. |
| `DocumentEvidence` | UUID, hash, tipo, fecha, propietario, relación con registro | Almacenamiento privado con política de retención y acceso. |
| `OfficialAuthorization` | Titular, sujeto habilitado/software, alcance, inicio, vencimiento, revocación | Independiente de `AppRole`; nunca presumir permiso por acceso interno. |
| `CueSubmission` | UUID local, versión de contrato, payload fingerprint, idempotency key, estado, respuesta | Bitácora inmutable y reconciliación; una respuesta HTTP no equivale por sí sola a aceptación administrativa. |

### Flujo agrario mínimo

`Titular → Explotación REAFA → Recintos / unidades de cultivo → Tratamiento → validación → cola → envío autorizado IUWS → respuesta/acreditación`.

Los ciclos internos del olivar, pesadas, cooperativas, jornales y economía se relacionarán con estas entidades sin sustituir identificadores oficiales ni sobrescribir históricos. Las referencias administrativas pueden variar con la campaña.

## 3. Diseño del servicio oficial

```text
Android/iOS (Expo) ──SQLite/outbox──┐
                                   ├── API propia / Supabase (RLS y auditoría)
Web (React) ────────────────────────┘                │
                                                    ▼
                                 Servicios de dominio / validación
                                                    │
                                         cue-connector (servidor)
                                 ┌──────────────────┴──────────────┐
                                 │ permisos/representación        │
                                 │ mapeo a contratos SIEX         │
                                 │ firma/certificados protegidos  │
                                 │ reintentos, acuses, conciliación│
                                 └──────────────────┬──────────────┘
                                                    ▼
                                        IUWS Andalucía / REAFA
                                               Sga Cex
```

Estados separados para **sincronización privada** y **comunicación oficial**:

- `LOCAL_ONLY` → `SERVER_SYNCED` o `SYNC_ERROR`.
- `DRAFT` → `READY` → `PENDING_SUBMISSION` → `SENT` → `ACCEPTED` / `REJECTED` / `UNKNOWN`.
- El estado `ACCEPTED` requiere evidencia verificable de respuesta oficial; nunca deducirlo de `SENT`, una respuesta 200 aislada o del guardado en Supabase.

**Seguridad:** secretos solo en infraestructura protegida; mínimo privilegio, RLS por explotación, cifrado y restricciones de acceso a documentos, historial de autorizaciones, revocación, protección RGPD, pruebas de aislamiento entre cuentas, trazabilidad de cada registro y control de duplicados. Nunca guardar NIF ni certificados reales en repositorio.

## 4. Base de código abierta y ejemplos aprovechables

| Referencia | Uso recomendado | Licencia / precaución |
|---|---|---|
| [Expo Tabs Template](https://github.com/expo/expo/tree/main/templates/expo-template-tabs) | Proyecto base de navegación universal, Android/iOS/web. | 0BSD en el paquete de plantilla; revisar licencia exacta al fijar versión. |
| [Expo monorepos](https://docs.expo.dev/guides/monorepos/) | Organización `apps/` y `packages/` con workspaces. | Documentación; evitar monorepo complejo antes de tener dos apps. |
| [Supabase Expo quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native) | Patrón de cliente, Auth y RLS, no motor de sync listo para producción. | Comprobar seguridad, almacenamiento de sesiones y límites. |
| [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) | Persistencia local y pruebas tras reinicios. | La web exige WASM/cabeceras específicas; validar su compatibilidad y persistencia real. |
| [React Hook Form](https://github.com/react-hook-form/react-hook-form) + [Zod](https://github.com/colinhacks/zod) | Formularios y validaciones reutilizables nativo/web. | MIT; conservar avisos de licencia. No usar el esquema de UI como única validación de backend. |
| [gluestack-ui](https://github.com/gluestack/gluestack-ui) | Componentes y diseño consistente con Expo Router. | MIT; seleccionar componentes concretos, revisar dependencia NativeWind. |
| [MapLibre React Native](https://github.com/maplibre/maplibre-react-native) | Cartografía y polígonos en móvil. | MIT. Requiere development build, no Expo Go; verificar fuente y derechos de las capas SIGPAC. |
| [farmOS](https://github.com/farmOS/farmOS) | Referencia de entidades agrícolas e históricos. | GPL-2.0: **estudiar, no copiar código** sin análisis legal. |
| [farmOS Field Kit](https://github.com/farmOS/field-kit) | Inspiración para flujos offline y actividades. | GPL-3.0: **estudiar, no copiar código** sin análisis legal. |

**Regla de reutilización:** no copiar código ni diseños de aplicaciones comerciales competidoras. Tomar patrones generales de UX, realizar implementación propia y registrar licencia, URL, versión, autoría y avisos de dependencias seleccionadas. Un repo con licencia ausente no es automáticamente reutilizable.

## 5. Benchmark funcional competitivo (sin replicar diseños)

Estudiar en Agricolum, Agroptima, oSIGris, farmOS y otros CUE del listado oficial andaluz: alta de explotación, selección de finca/recinto, tratamiento en pocos pasos, validación de producto, evidencias, estado de envío, consulta de históricos y exportación. Para cada función documentar:

1. Objetivo del agricultor y pasos/taps necesarios.
2. Datos obligatorios versus opcionales, validación y mensajes de error.
3. Uso sin conexión, reintento, duplicados y estado administrativo.
4. Cómo se resuelve móvil frente a escritorio.
5. Referencia de fuente/captura autorizada y fecha; distinguir declaraciones comerciales de interoperabilidad oficial verificada.

La inclusión en listados oficiales y las condiciones de autorización se comprueban en la página actualizada de la Junta, no por las afirmaciones de marketing.

## 6. Estructura candidata del repositorio

```text
/
  apps/
    mobile/                  # Expo Router Android/iOS y web inicial
    web/                     # Solo si se justifica web avanzada
  packages/
    domain/                  # Explotación, parcelas, tratamientos, economía
    cue-contracts/           # DTO/versiones/catálogos FEGA; sin secretos
    validation/              # Reglas verificadas con referencias
    ui/                      # Componentes compartidos cuando compense
  services/
    cue-connector/           # Sólo backend, nunca embebido en móvil
  supabase/
    migrations/              # Nuevas migraciones, solo con autorización
  docs/
    normativa/
    arquitectura/
    qa/
```

**Secuencia:** empezar con una aplicación Expo universal + `packages/domain` y `packages/validation`. No crear servicios vacíos por decoración ni desplegar IUWS real sin tener el contrato y autorización.

## 7. Primera vertical funcional y criterios GO/NO-GO

**Objetivo:** una explotación ficticia, un recinto ficticio y un tratamiento de prueba, guardados sin conexión en móvil, visibles en navegador con la misma cuenta tras sincronizar al backend de pruebas, validados contra un contrato SIEX identificado, y con respuesta **simulada** de IUWS.

| Hito | Resultado verificable | GO |
|---|---|---|
| N0 — Inventario normativo | Matriz Anexo V/VII + requisitos del modelo Junta V9, cada campo con referencia y condición | Sin campos inventados; dudas marcadas como pendientes |
| N1 — Acceso administrativo | Respuesta oficial sobre alta de CUE, certificados, identidad, productor individual/entidad habilitada y entorno de pruebas | Sin prometer conexión hasta obtener respuesta |
| N2 — Modelo | UUID internos + IDs oficiales por campaña; validación y trazabilidad | Pruebas unitarias de contratos |
| N3 — Expo móvil/web | Tratamiento con validación, persistencia móvil offline y consulta web | Sin pérdida ni duplicados tras reinicios |
| N4 — Sync privado | A→B, B→A, cuenta C sin permisos, idempotencia/reintentos | RLS y conciliación demostradas |
| N5 — IUWS simulado | Petición/acuse/rechazo/timeout y reintentos reproducibles | Identificación de errores y `UNKNOWN` sin falso `ACCEPTED` |
| N6 — IUWS real | Alta/autorización y test en entorno oficial permitido | **No ejecutar** antes de habilitación y aprobación explícita |
| N7 — Migración del legado | Fincas/campañas/economía desde Kotlin con reconciliación y plan de reversión | Misma identidad de registros y valores |

**No-GO:** fallos de permisos, pérdida de UUID, registros que desaparecen, duplicación, registros inventados, uso de credenciales reales en cliente, una aceptación administrativa simulada presentada como real.

## 8. Preguntas oficiales a consultar por escrito con la Junta

Canal publicado: `consultareafa.capadr@juntadeandalucia.es`.

1. ¿Procedimiento actual y requisitos exactos para dar de alta Mágina Olivo como CUE comercial? ¿Puede hacerlo una persona física?
2. ¿Qué certificados, relación de dominios y controles exige la modalidad **productor individual**?
3. ¿Cuándo es imprescindible la entidad habilitada y cómo se registra/revoca la representación? ¿Qué consulta permite detectar revocaciones?
4. ¿Existe entorno IUWS de pruebas, documentación de autenticación, WSDL/OpenAPI, ejemplos de payload y errores, y datos ficticios admitidos?
5. ¿Cómo se valida que un tratamiento se ha aceptado y cómo se obtiene su identificador/acuse oficial?
6. ¿Qué plazos y campos son obligatorios para una explotación oleícola, incluyendo excepciones de fertilización?
7. ¿Qué ocurre con rectificaciones, anulaciones, cambios de recinto/campaña y duplicados?
8. ¿Puede un software almacenar su backend en un proveedor cloud y cómo debe custodiarse el certificado de comunicación?

No enviar datos reales, certificados ni documentos personales sin recibir instrucciones oficiales y establecer un canal seguro.

## 9. Reparto de trabajos sin duplicidades

- **Codex:** documentos FEGA, contrato/versiones IUWS, modelo de datos, seguridad/RLS, sincronización y pruebas de compatibilidad. No implementar endpoint real hasta evidencia contractual.
- **Claude:** pantallas Expo/web y auditoría de formularios contra la matriz N0, con foco en registro rápido en campo y accesibilidad. No rediseñar todo antes de N0.
- **Coordinación:** aprobar matriz, alcance, decisiones, criterios de GO/NO-GO y migraciones. GitHub documenta hitos comprobados; desarrollo local para iterar rápido.

## 10. Próximos entregables

1. `docs/normativa/MATRIZ-CUE-REAFA-V1.md`: listado **campo por campo** (no resumen) desde Anexo V y modelo Junta V9, referencia exacta, regla de obligatoriedad, origen de dato, tipo, catálogo, validación, ejemplo y estado de implementación.
2. `docs/arquitectura/CONTRATO-IUWS-3.11.4.md`: operaciones reales y seguridad del Anexo VI; especificación de transporte y ejemplos **solo si salen del anexo**.
3. `docs/arquitectura/DECISIONES-ARQUITECTURA.md`: razones, ADR de móvil/web/offline/Supabase, comparación medida con Kotlin existente.
4. `docs/qa/PRIMER-RECORRIDO-FITOSANITARIO.md`: caso ficticio reproducible y pruebas N2–N5.
5. Registro de autorizaciones, versión de anexos, licencia de cada librería y riesgos pendientes.

---

**Estado del plan:** investigación y propuesta. **No está aprobada la adaptación legal de todos los campos ni se ha probado una conexión oficial.**