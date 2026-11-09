# Dossier maestro de ingeniería — Olearia Agritech 1.5.2
**Versión documental:** 1.0 · **Fecha de investigación:** 09/11/2026 · **Revisado por:** ChatGPT
**Estado:** ANÁLISIS ESTÁTICO VERIFICADO EN LOS APARTADOS INDICADOS; LA EJECUCIÓN, EL BACKEND Y EL CUMPLIMIENTO OFICIAL NO ESTÁN AUDITADOS.

> Este documento consolida la investigación dispersa en varios informes para que Codex, Claude y el equipo de Mágina Olivo V2 sepan qué se ha comprobado, qué no, y qué decisión tomar. No reemplaza las evidencias especializadas enlazadas al final.

## 1. Fuente primaria y límites de acceso

- Fuente: ZIP privado «Olearia Agritech.zip», aportado por el propietario de una instalación legítima Android y conservado en su Google Drive; no se publica en GitHub.
- SHA-256 del ZIP: d4c232f8b687e4bd02eccd041917c85f7419ebd0ff14a5205ea18d967af791d6.
- Tamaño: 150.019.914 bytes. Contenido: base.apk (97.016.010 B), split_config.arm64_v8a.apk (52.698.103 B), split_config.es.apk (98.713 B), split_config.xxhdpi.apk (182.840 B), un README de exportación.
- Métodos: lectura binaria de AndroidManifest y reglas XML de backup, listado de entradas ZIP, cálculo SHA-256, recuento de class_defs de nueve DEX, identificación de bibliotecas .so y módulos de SDK, lectura acotada de campos públicos de Expo, y recuento de palabras indicativas del bytecode Hermes.
- No realizado: ejecución de la app, inspección de tráfico, prueba de usuarios, análisis de endpoints no públicos, extracción del código TypeScript original, verificación integral de firma APK, prueba de interoperabilidad oficial o auditoría de seguridad ofensiva.
- Propiedad intelectual: no copiar diseño, código reconstruido, recursos, modelos, APK, bundle, certificados, ni publicar cadenas de rutas privadas, claves o datos de terceros.

## 2. Convención de certeza obligatoria

| Estado | Significado | Ejemplo |
|---|---|---|
| **E1 BINARIO** | Presente y medido en el APK aportado | Biblioteca libmaplibre.so; minSdk 24 |
| **E2 CONFIG** | Declarado en la configuración de Expo/manifiesto; puede no ejecutarse | Plugin expo-speech-recognition |
| **E3 INDICIO** | Nombre o término encontrado en Hermes o dependencias; puede ser código inactivo | «idempotency»; «WMS» |
| **E4 PROVEEDOR** | Afirmación comercial o de privacidad del fabricante | OCR local de tickets; cumplimiento CUE |
| **E5 PRUEBA** | Comportamiento reproducido en nuestra propia cuenta y dispositivo | Todavía NO existe para este estudio |
| **E0 DESCONOCIDO** | No hay prueba suficiente | Motor real de sincronización, contrato IUWS |

Una dependencia E1 no convierte automáticamente la funcionalidad correspondiente en E5. Una declaración E4 tampoco.

## 3. Huella Android y composición de la aplicación (E1/E2)

| Medición | Valor |
|---|---|
| Paquete | io.olearia.agritech |
| Versión móvil del ZIP | 1.5.2 (versionCode 40) |
| Android mínimo / objetivo / compilación | API 24 / 36 / 36 |
| SDK Expo declarado | 57.0.0 (configuración E2) |
| RN asociado oficialmente a Expo SDK 57 | React Native 0.86 (documentación externa de Expo, no versión exacta deducida de cada .so) |
| Arquitectura nativa suministrada en el split | ARM64 |
| DEX | 9 archivos; 58.066 class_defs; 69.915.816 B descomprimidos |
| Clases bajo io.olearia.* | 32, incluidas las generadas; no miden el tamaño de producto |
| Bundle JavaScript | 17.504.504 B; bytecode Hermes, no TypeScript |
| Bibliotecas ARM64 | 34 .so; 52.374.432 B descomprimidos |
| Modelos TFLite | 3; 880.888 B; asociados a lectura de códigos |
| Componentes Android | 14 actividades, 10 providers, 10 servicios, 6 receivers |
| Permisos | 40 declaraciones, muchas incorporadas por SDK y fabricantes |
| Prefijos HTTPS de app links | 31 repartidos entre dos dominios; verificación efectiva desconocida |

**Interpretación:** la app Android está construida con React Native/Expo y motor Hermes, con módulos nativos reales (no solo una web abierta en un WebView). La mayor parte del código de negocio **podría** estar en JS/TS, pero no hay repositorio fuente ni prueba de cómo fue programado.

## 4. Mapa de dependencias (presencia E1; uso real no ensayado)

| Capa | Evidencia detectable | Pregunta pendiente |
|---|---|---|
| UI móvil | React Native, expo modules, Skia, Reanimated, Worklets | Arquitectura de pantallas, rendimiento real y accesibilidad |
| Navegación | Intent MAIN/LAUNCHER, esquema olearia://, 31 prefijos HTTPS | ¿Se abren todas las rutas con sesión y permisos? |
| Mapas | MapLibre (libmaplibre.so y 1.081 clases), términos GeoJSON/WMS/WMTS/PNOA/SIGPAC | Fuente oficial de geodatos, licencia, caché offline, campañas |
| Datos locales | AsyncStorage (18 clases), SecureStore (53), NetInfo (23), TaskManager (48) | Esquema de negocio, durabilidad, conflictos, outbox |
| Captura | expo-camera, expo-image-picker, ML Kit Document Scanner | Flujo real de documentos, redacción de PII y retención |
| Códigos | ML Kit Barcode y modelos incluidos | Formatos admitidos, precisión y condiciones |
| Voz | expo-speech-recognition y expo-audio declarados | Dictado sin cobertura, idioma, permisos, proveedor |
| Notificaciones | Expo Notifications, Firebase, Google Datatransport | Consentimiento, envío y tipos de datos transmitidos |
| Incidencias | Sentry y provider de inicialización | Configuración efectiva y saneamiento de datos |
| Comercial | RevenueCat, Google Play Billing 8.3.0, Amazon IAP SDK | Planes realmente activos y conciliación |
| Multimedia | Expo Video y Media3 | Si se utiliza para contenidos de negocio o solo dependencia |
| Ubicación | Expo Location y servicio de trabajo de fondo | Seguimiento de jornadas, avisos, retención y permisos |
| Protección | com.pairip.application.Application y componente de licencia | Comportamiento interno no investigado; no eludir controles |

La inclusión de androidx.compose (10.649 definiciones) y Media3 (3.700) **no demuestra** que la UI de negocio use Compose o que exista una funcionalidad de vídeo concreta: pueden ser dependencias transitivas.

## 5. Contadores de indicios del bytecode (E3, nunca pruebas funcionales)

Conteo de fragmentos dentro del archivo binario Hermes, insensible a mayúsculas; no son conteos de funciones ni evidencia de API real.

- Administración: SIEX 69, REAFA 6, IUWS 0, SIGPAC 67, ROPO 125, BBCH 29.
- Agronomía/servicios: Catastro 30, PNOA 4, NDVI 28, GeoJSON 17, WMS 9, WMTS 4.
- Operaciones y economía: cuaderno 115, tratamiento 106, fertiliza 60, riego 68, cooperativa 127, pesada 13, liquidaci 36.
- Sincronización: AsyncStorage 9, queryClient 8, persistQuery 5, NetInfo 4, offline 27, queued 51, retry 52, idempotency 4.
- IA/captura: OCR 16, voice 95, speech 17, gemini 1, mistral 2, ollama 2, supabase 8.
- La cadena «IUWS» ausente **no demuestra** la ausencia de un conector oficial en un servidor que no forma parte de la APK.
- La palabra «OCR» **no demuestra** un motor local de reconocimiento de texto: sí hay scanner de documentos; se desconoce el motor de extracción de campos.

## 6. Manifiesto, permisos y respaldo (E1/E2)

- Android 7+ como mínimo; API 36 objetivo. Solicita permisos de cámara, micrófono, ubicación precisa/aproximada/fondo, notificaciones, biometría, red y servicio de localización. Hay permisos de almacenamiento tradicional limitados a maxSdk 32.
- Actividad principal exportada para el lanzador y enlaces; la mayoría de providers/servicios son no exportados; tres receivers de biblioteca exportados incluyen declaración de permiso. Esta descripción **no constituye un informe de vulnerabilidades**.
- El manifiesto declara android.hardware.wifi con required=false: **no obliga a disponer de radio Wi-Fi** para instalar.
- 12 intent queries para interacciones con otras aplicaciones; no demuestra que todas se utilicen.
- Se declaran tres librerías Android opcionales: extensiones de cámara y ventana (dos variantes). Son capacidades oportunistas, no requisitos universales de instalación.
- Backup activado (allowBackup=true), pero el XML incluye el ámbito sharedpref y excluye SecureStore tanto de cloud backup como de device-transfer. **No se ha auditado el contenido de otras preferencias ni la recuperación de una BD empresarial**.
- expo-updates.ENABLED=false en este build; no implica inexistencia de configuración dinámica remota.
- Plugins Expo bloquean SYSTEM_ALERT_WINDOW y FOREGROUND_SERVICE_MEDIA_PLAYBACK; el manifiesto observado no los solicita.
- Manifiesto sin debug explícitamente activado ni usesCleartextTraffic explícito; esto por sí solo **no certifica** TLS, cifrado, RLS, calidad de permisos o seguridad total.

## 7. Enlaces Android públicos: lo observable

- Filtro de esquema propio: olearia:// (no se verifica mediante Digital Asset Links).
- Dos filtros HTTPS con autoVerify=true y dos dominios públicos: 30 prefijos para agritech.olearia.io y uno de acceso para olearia.io.
- Familias de rutas: cuaderno, actividad, asistencia, cooperativa, maquinaria, contratos, documentos, personal, asesoría, pasaporte de lote, configuración y cuenta.
- **Pendiente:** comprobar que los servidores publiquen Digital Asset Links de modo válido y que Android marque el dominio verificado; tener autoVerify no prueba que haya tenido éxito.
- Para V2, cada entrada compartida debe validar sesión y autorización efectiva de explotación, no solo la ruta.

Referencias oficiales: https://developer.android.com/training/app-links/about y https://developer.android.com/training/app-links/verify-applinks.

## 8. Comparación con afirmaciones del proveedor

El sitio de Olearia y su política https://olearia.io/privacy anuncian gestión agrícola, offline, OCR local, Supabase/PostgreSQL y funcionalidades CUE/SIEX. **La APK demuestra que existen SDK compatibles con parte de esas promesas, no que los flujos estén completos**. No inferir cumplimiento IUWS ni falta de él por apariciones de palabras. Tampoco se puede demostrar que su código se haya escrito con IA generativa.

La copia del usuario es 1.5.2; en una sección comercial se ha visto un anuncio de descarga 1.0.3. No confundir builds o canales de distribución.

## 9. Lo que extraemos para Mágina Olivo V2 (diseño propio)

**Alta prioridad:**
1. React Native + Expo + TypeScript como candidato, pero elegir versión por mantenimiento y pruebas; no por reproducir Expo 57.
2. Núcleo tipado: explotación REAFA, finca de gestión, recinto SIGPAC histórico, cultivo, tratamiento, dosis/cantidad, persona/ROPO, documentos, aplicación fertilizante y campaña.
3. SQLite transaccional móvil + outbox de operaciones, sync privada idempotente y conflictos explícitos. Driver de almacenamiento web separado; nunca dar por demostrado el offline por la sola presencia de NetInfo.
4. MapLibre en prototipo GIS autónomo, con fuente oficial permitida, atribución y manejo de recintos/campaña.
5. OCR de vales y voz **solo como borradores revisables con confirmación humana**.
6. Separar autorización administrativa IUWS, derechos por explotación en backend, «guardado local», «sincronizado privado» y «aceptado oficialmente».
7. Minimizar permisos Android y telemetría con RGPD, especialmente la localización de trabajadores.
8. Presupuesto de peso APK, memoria y tiempos de arranque, medidos en Android real.
9. Versionar reglas normativas, catálogos y geometrías al margen de la versión de la app.
10. Pruebas de interoperabilidad oficial después del mapeo FEGA V/VI/VII y autorización Junta.

**No es conclusión válida:** «Olearia no tiene SQLite», «Olearia no está conectada a IUWS», «Olearia cumple perfectamente la Junta», «Olearia está hecha por IA», «su app es un WebView» o «sus 58.066 clases son propias».

## 10. Puertas pendientes para finalizar la investigación

| Prioridad | Pregunta | Evidencia necesaria |
|---|---|---|
| P0 | ¿Perdura un tratamiento sin red y tras cierre forzado? | Prueba con cuenta propia y registro ficticio |
| P0 | ¿Hay duplicados al reconectar y repetir? | Prueba A/B autorizada, observación de estados |
| P0 | ¿Exporta o transmite oficialmente mediante IUWS? | Acuse administrativo propio y autorizado, si aplica |
| P0 | ¿Cómo liga superficie/recinto SIGPAC a campaña? | Alta de recinto ficticio/propio, origen y fecha |
| P1 | ¿Escanea un vale y confirma los campos? | Vale sintético con resultado esperado |
| P1 | ¿Qué instrucciones entiende la IA por voz? | Dictado ficticio + revisión/cancelación |
| P1 | ¿Qué mapas sobreviven a modo avión? | Prueba con teselas permitidas y zona de ensayo |
| P1 | ¿Se abre el enlace web en app? | Estado app links + navegación de cuenta propia |
| P1 | ¿Qué hace el seguimiento GPS fuera de jornada? | Ensayo consentido con permisos de prueba |
| P2 | ¿Qué cuota/funciones requieren suscripción? | Consulta comercial actual, sin compra no autorizada |
| P2 | ¿Cuál es el coste real de recursos y datos? | Medición de CPU, RAM, descarga y uso móvil, sin interceptar tráfico ajeno |

## 11. Índice de todas las evidencias especializadas

- [Inventario estructurado de permisos, bibliotecas y rutas](OLEARIA-APK-INVENTARIO-ESTATICO-2026-11-09.json).
- [Informe de APK inicial](OLEARIA-APK-ANALISIS-ESTATICO-2026-11-09.md).
- [Auditoría ampliada de manifiesto y DEX](OLEARIA-APK-AUDITORIA-AMPLIADA-2026-11-09.md).
- [Composición y arquitectura](OLEARIA-APK-PROFUNDIZACION-ARQUITECTURA-2026-11-09.md).
- [Mapa de términos Hermes](OLEARIA-BYTECODE-INDICIOS-FUNCIONALES-2026-11-09.md).
- [Offline, red, agronomía y app links](OLEARIA-ANALISIS-RED-OFFLINE-ENLACES-2026-11-09.md).
- [Web declarada frente al APK observado](OLEARIA-CONTRASTE-WEB-APK-Y-SEGURIDAD-2026-11-09.md).
- [Plan de ensayos funcionales sin intrusión](OLEARIA-PRUEBAS-CONTROLADAS-Y-DECISIONES-V2-2026-11-09.md).
- [Benchmark comercial](OLEARIA-COMPETENCIA-Y-DIFERENCIACION-2026-11-09.md).
- [Decisiones propuestas Mágina V2](../decisiones/DECISIONES-V2-TRAS-AUDITORIA-OLEARIA-2026-11-09.md).
- [Herramienta de auditoría reproducible sin recursos ajenos](../../tools/research/apk_metadata_audit.py).

**Fuente de verdad:** este dossier y los anexos están en la rama docs/v2-reafa-cue-foundations / PR #10 (borrador), no necesariamente en main. La investigación no añade ni modifica producto o SQL.
