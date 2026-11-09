# Olearia — pruebas funcionales controladas y decisiones para Mágina Olivo V2

**Fecha:** 2026-11-09 · **Estado:** PLAN DE ENSAYOS, NO RESULTADOS  
**Fuente:** [Auditoría APK 1.5.2](OLEARIA-APK-AUDITORIA-AMPLIADA-2026-11-09.md) + [benchmark comercial](OLEARIA-COMPETENCIA-Y-DIFERENCIACION-2026-11-09.md).  
**Alcance permitido:** instalar y utilizar la app legítima en cuenta propia, con datos ficticios, observar UX y efectos en el cliente. No interceptar credenciales ajenas, eludir DRM/licencia, forzar APIs privadas, realizar fuzzing sobre producción ni publicar documentos o código propietario.

## 1. Matriz de pruebas pendientes

| Caso | Procedimiento lícito reproducible | Evidencia | Decisión de producto |
|---|---|---|---|
| COMP-01 Instalación | Instalar legítimamente base+splits / Play; comprobar versión, primer inicio y solicitud contextual de permisos | Capturas y fechas, sin NIF ni identidad | Onboarding corto, permisos progresivos |
| COMP-02 Recinto | Crear explotación de prueba, seleccionar recinto/mapa si la demo lo permite | Pasos, errores, tiempo medido, fuentes de mapa declaradas | UX de alta SIGPAC separada de finca privada |
| COMP-03 Tratamiento normal | Registrar un tratamiento ficticio sin usar producto como recomendación real | Campos solicitados, ayudas, validaciones, exportación | Completar matriz RD/UE/V9/FEGA V |
| COMP-04 Tratamiento asesorado | Seguir flujo de asesoramiento solo si cuenta y demo lo permiten | Justificación, aplicador/asesor, firma y estados | Campos condicionales y auditoría |
| COMP-05 Modo avión | Registrar un borrador **ficticio** sin conexión, cerrar forzosamente y reiniciar | Borrador recuperado o no; capturas con fecha | SQLite transaccional propia |
| COMP-06 Reconexión | Recuperar señal; observar estado local/sync/duplicados | Recuento antes/después, errores y tiempos | Outbox idempotente y conflictos visibles |
| COMP-07 Dos dispositivos | Solo con cuentas propias y permisos concedidos; observar un dato compartido | Latencia y política de conflictos | Pruebas A↔B/C no autorizado en V2 |
| COMP-08 Cámara/vale | Usar ticket inventado impreso o generado; escanear y comprobar si requiere confirmar | Matriz de campos extraídos/errores, sin datos reales | OCR con revisión humana |
| COMP-09 Voz | Dictar tarea ficticia y observar si pide confirmación | Pasos, transcripción, sin grabar voz de terceros | Gemini/orquestación y formularios |
| COMP-10 Mapas sin red | Abrir mapa con cobertura, activar modo avión y reabrir zona | Capas disponibles, comportamiento de error | Tiles/caché/licencias, fuente de verdad SIGPAC |
| COMP-11 Localización laboral | Con permisos propios, simular inicio/fin tarea y observar solicitud de GPS | Indicadores visibles, posibilidad desactivar, permisos Android | Privacidad por diseño y minimización |
| COMP-12 Cooperativa/economía | Introducir pesada y gasto **ficticios** si demo permite | Correlación finca/campaña, posibilidad adjuntar documento | Balance económico diferenciado del CUE |
| COMP-13 Evidencia oficial | Comprobar textos de interfaz sin realizar envío administrativo no autorizado | Si ofrece estados de exportado/enviado/aceptado y resguardo | No declarar aceptación sin acuse oficial verificable |
| COMP-14 Monetización | Consultar tarifa/checkout públicamente, sin contratar salvo voluntad expresa | Plan/fecha/precio/limitaciones | Evitar competir solo por precio |
| COMP-15 Privacidad | Revisar permisos mostrados por el SO y política pública; no manipular cuentas ajenas | Fichas sin datos personales | Consentimiento separado para asesor/empleado/GPS |

**Puntuación por caso:** 0 = no hay dato; 1 = solo marketing; 2 = observado en demo/cliente; 3 = probado con resultados reproducibles. No atribuir nivel 3 a declaraciones del vendedor.

## 2. QA de arquitectura propia: puertas críticas (no dependen de Olearia)

**REG-01:** tratamiento superficial olivar con dos recintos versionados, producto MAPA con referencia de prueba, aplicador, dosis/unidad y cantidad total.  
**REG-02:** asesoramiento condicional, evaluación de eficacia posterior, documentos y cadena de modificaciones.  
**OFF-01:** modo avión + cierre forzado + reinicio preserva registro confirmado localmente sin corrupción.  
**SYNC-01:** reintentos con mismo UUID no duplican ni gastos ni tratamientos; edición concurrente nunca sobrescribe silenciosamente cantidades.  
**SEC-01:** acceso denegado a explotación de C; token privilegiado/certificado IUWS nunca en móvil.  
**DOC-01:** OCR obtiene campos de ticket sintético, usuario verifica antes de guardar, y adjunto con hash.  
**MAP-01:** geometría oficial por campaña y uso en tratamientos históricos; fallo de red no cambia ID oficial.  
**IUWS-01:** envío backend solo si software, titular y autorización verificados; HTTP 200 no implica aceptación; estado UNKNOWN se reconcilia antes de reintento.  
**PRIV-01:** ubicación de trabajadores requiere finalidad, aviso visible y periodo limitado; desactivar finaliza seguimiento y permisos.

## 3. Tareas recomendadas de ingeniería en V2

### A. Spike plataforma
- Expo/React Native/TypeScript con módulo `holding`, `sigpac_enclosure_version`, `treatment`, `treatment_target`, `evidence`, `sync_outbox`.
- Validar en Android real **y web**, sin asumir igual almacenamiento en ambos; RN y React web pueden compartir reglas, no necesariamente el driver local.
- MapLibre con proveedor cartográfico y atribución verificados; prototipo de geometrías de recintos ficticios.

### B. Seguridad/offline
- Seleccionar backend y RLS; modelar identidad legal, rol app y autorización oficial por separado.
- SQLite persistente y política de claves/backup probada, no dar por cifrada la BD por instalar SecureStore.
- Outbox atómica y estados privada/oficial diferenciados; pruebas con interrupción y recuperación.

### C. IA y OCR
- Escaneo/imagen, OCR validado sobre muestras sintéticas de vales, confirmación editable de campos.
- Asistente conversacional opera sobre funciones de dominio con permisos y revisión del usuario; nunca inventa tratamientos/dosis/autorizaciones oficiales.

### D. Completar interop real
- Extraer íntegramente Anexo V FEGA v3.11, Anexo VI IUWS v3.11.4 y Anexo VII de catálogos; contrato versionado.
- Tramitar alta comercial, certificados y entorno autorizado con Junta; simulador IUWS primero, real después.

## 4. Qué herramientas puede usar Codex en el PC (si se desea auditoría adicional)

- `adb shell pm path io.olearia.agritech` para localizar los paquetes instalados; extraer solo si usuario tiene derecho a la copia.
- Inspección local pasiva con `apkanalyzer` / `aapt2` para manifiesto, `jadx` para nombres y dependencias de bibliotecas, `zipinfo` y `sha256sum` para inventario. Evitar copiar/republicar fuentes reconstruidas.
- Verificar permisos, enlaces, reglas de backup y componentes; comprobar comportamiento en la propia cuenta/demo sin test de intrusión ni bypass.
- Guardar **solo hallazgos y capturas saneadas** en el repositorio público, jamás APK, bundle, contraseñas, tokens, extractos de datos privados o código de Olearia.

## 5. Prioridad estratégica

**No competir por cantidad de iconos**. Priorizar una vertical que cierre un proceso: «finca/recinto → tratamiento normativo → justificantes → estado administrativo verificable»; añadir «pesada → gasto → liquidación» con OCR y confirmación, y voz cuando existan operaciones fiables. Frente a cualquier competidor, exigir **evidencias** de funcionamiento offline, privacidad, exactitud de campo y satisfacción del agricultor.

**Pendiente:** ninguna de las pruebas COMP-01…15 figura aquí como realizada. Son instrucciones reproducibles para test con usuario legitimado.
