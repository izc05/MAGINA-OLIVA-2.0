# Auditoría estática ampliada — Olearia Agritech APK

**Fecha:** 2026-11-09 · **Estado:** INFORME TÉCNICO SOBRE BINARIO, NO PRUEBA DE EJECUCIÓN  
**Fuente:** APK extraídos de una instalación legítima facilitada por el promotor mediante un ZIP privado en Google Drive. **No distribuir el ZIP, los APK, los modelos, el bundle ni código propietario en GitHub.** No se han utilizado cuentas de terceros, capturado tráfico ni modificado software.

## 0. Método y escala de evidencia

- **BINARIO**: observable y reproducible en manifiesto Android, DEX, recursos o bibliotecas del ZIP recibido.
- **CONFIGURACIÓN**: existe en `assets/app.config` de Expo, pero no necesariamente demuestra uso efectivo en producción.
- **INDICIO**: cadena o referencia de biblioteca que sugiere una función; puede provenir de dependencias o código inactivo.
- **NO VERIFICADO**: requiere prueba funcional, análisis autorizado del comportamiento, documentos oficiales o revisión del backend.

Inspección realizada sin ejecutar la app: ZIP y sus cuatro APK (listas de entradas, tamaño y SHA-256); parser binario de AndroidManifest.xml y reglas XML de respaldo; inventario de bibliotecas .so, encabezados DEX y descriptores de clases; configuración Expo y cadenas indicativas del bytecode Hermes. No se ha intentado extraer código fuente equivalente ni evitar protecciones de licencia.

## 1. Proveniencia, integridad y estructura de distribución

| Archivo | Tamaño (bytes) | SHA-256 |
|---|---:|---|
| `Olearia Agritech.zip` | 150.019.914 | `d4c232f8b687e4bd02eccd041917c85f7419ebd0ff14a5205ea18d967af791d6` |
| `base.apk` | 97.016.010 | `0e1bc58ce0c50dfac4da937276fcd314610137090dfa09be97627f9fc8308049` |
| `split_config.arm64_v8a.apk` | 52.698.103 | `5e55deacea7ba95e8c84b3810ab52f3a6eae3cab1bfa9a5b3020418be2f67fd9` |
| `split_config.es.apk` | 98.713 | `7055f3994262672c4d1ec5f8019572b7e88fc4e8d2ab885d921462d9fb17a790` |
| `split_config.xxhdpi.apk` | 182.840 | `a6087c682a58559d7f44c9b891587a7e9518fab5a3248cf16193eccefb18c67e` |

El ZIP incluye además un `README.txt` descriptivo del backup. Los splits ARM64, español y densidad xxhdpi son compatibles con distribución Android App Bundle/Google Play; **no prueban el soporte de todas las arquitecturas, idiomas o densidades disponibles en Play**. Tres splits contienen un certificado PKCS#7 con igual huella observada; no se ha validado el esquema de firma APK completo de base ni su procedencia de Play de manera criptográfica. El manifiesto indica distribución desde Play y `splits.required=true`.

## 2. Identidad y compatibilidad Android (BINARIO)

- `package`: `io.olearia.agritech`.
- `versionName=1.5.2`, `versionCode=40`; `compileSdkVersion=36`; `targetSdkVersion=36`.
- `minSdkVersion=24` (Android 7.0).
- `assets/app.config`: `sdkVersion=57.0.0` (Expo SDK, CONFIGURACIÓN); plataformas declaradas `ios`, `android`, `web`.
- `application`: `com.pairip.application.Application` (componente de protección/licencia del paquete de distribución, no analizar ni eludir).
- `expo.modules.updates.ENABLED=false` en el manifiesto; **no afirmar que la app carece de cualquier mecanismo remoto de contenidos o actualizaciones**.

## 3. Tecnología y tamaño de código

**Confirmado:** React Native y Expo nativos, motor Hermes, MapLibre, Skia/Reanimated y módulos Expo. No es solamente un WebView.

- `assets/index.android.bundle`: **17.504.504 bytes**, cabecera de bytecode Hermes; no se hallaron archivos `.js`, `.ts`, `.tsx` ni source maps `.map` distribuidos de forma separada. Esto no es el repositorio TypeScript original.
- **9 archivos DEX**, **58.066 definiciones de clases** contadas desde las tablas `class_defs`. Incluyen clases del framework y dependencias transitivas; NO son 58.066 clases de Olearia desarrolladas a mano.
- **34 bibliotecas ARM64 (.so)**; principales por tamaño: `librnskia.so` ~10,78 MiB, `libmaplibre.so` ~10,34 MiB, `libreactnative.so` ~6,66 MiB, `libbarhopper_v3.so` ~4,72 MiB, `libappmodules.so` ~2,79 MiB y `libhermesvm.so` ~2,36 MiB.
- DEX: paquetes `com.facebook.react`, `expo.modules.kotlin`, `org.maplibre.android`, `org.maplibre.reactnative`, `com.shopify.reactnative.skia`, `com.revenuecat.purchases`, `com.google.firebase`, `io.sentry.android`, `androidx.camera`, `androidx.compose`. **La presencia de Jetpack Compose proviene al menos de dependencias nativas; no implica que toda la interfaz principal esté hecha con Compose.**
- Recursos tipográficos: variantes de **Inter** incrustadas como recursos, no redistribuir.
- El paquete lleva perfil de optimización ART (`assets/dexopt/baseline.prof` y `.profm`).

## 4. Mapas, GPS y agronomía

- **BINARIO:** `libmaplibre.so`, `org.maplibre.reactnative` y plugin `@maplibre/maplibre-react-native`.
- **CONFIGURACIÓN:** `expo-location` con uso en segundo plano y servicio de primer plano; textos de permisos describen recorridos de labores/tratamientos y ubicación del trabajador durante la jornada si procede.
- **INDICIO Hermes:** referencias textuales a SIGPAC, Catastro, PNOA, GeoJSON, NDVI, recintos, cooperativas y SIEX. La mera aparición de cadenas **no valida integración**, origen de teselas, licencias, descargas offline, cálculo NDVI, acceso a REAFA o acuse IUWS.
- **Relevancia V2:** diseñar aparte `finca de gestión`, `explotación REAFA`, `recinto SIGPAC por campaña` y `geometría versionada`. Probar caché cartográfica con licencias/atribuciones y geometrías reales permitidas.

## 5. IA, voz, cámara y documentos

| Componente observado | Evidencia | Límite |
|---|---|---|
| Voz/dictado | Plugin `expo-speech-recognition`, permisos de micro y servicios `expo-audio` | No demuestra que la transcripción sea siempre local ni qué proveedor de IA se usa |
| Escaneo documental | Actividad `com.google.mlkit.vision.documentscanner.internal.GmsDocumentScanningDelegateActivity`, `play-services-mlkit-document-scanner` v16.0.0 | Escanear documentos no prueba reconocimiento OCR del texto |
| Códigos de barras | `libbarhopper_v3.so`, 3 modelos `.tflite`, `barcode-scanning` v17.3.0 y Play Services ML Kit v18.3.1 | Presencia no prueba qué códigos/formatos o productos reconoce |
| Cámara/imágenes | `expo-camera`, `expo-image-picker`, cropper | Necesita pruebas de permiso y fiabilidad |
| Modelos generativos | Menciones en bytecode a nombres de proveedores de IA | No identifica modelos, petición, privacidad ni funcionamiento del backend |
| Gráficos/animación | Skia, Reanimated, Worklets | Biblioteca incluida, no prueba rendimiento real |

**NO VERIFICADO:** motor OCR de vales, exactitud, si procesa texto en dispositivo o en servidor, política de confirmación, calidad de respuestas o uso de IA para escribir el código de Olearia.

## 6. Persistencia, sincronización y notificaciones

- **BINARIO:** `com.reactnativecommunity.asyncstorage` / AsyncStorage; `expo-secure-store` en configuración; descriptores de clases de Firebase, Expo Notifications, Task Manager y servicios de localización.
- **NO IDENTIFICADO en DEX**: clases de `expo.modules.sqlite`, `androidx.room` y `com.google.mlkit.vision.text`. Hermes contiene una aparición textual de «sqlite», pero esto NO identifica un motor de datos fiable.
- **NO VERIFICADO:** base local real, esquema de tablas, estados de outbox, cifrado de registros, semántica de conflictos, sincronización A↔B, funcionamiento sin red y recuperación tras cierre.
- Para Mágina Olivo, `AsyncStorage` es útil para preferencias/estado, **no elegirlo como único almacén de hechos agrarios críticos** sin evaluación de integridad y transacciones; especificar SQLite + outbox y pruebas adversas.

## 7. Pagos, operaciones y 31 deep links

- **BINARIO:** `com.revenuecat.purchases` (3.054 definiciones de clases aproximadas bajo ese paquete, muchas procedentes del SDK), Play Billing **8.3.0**, servicios de compras Amazon incluidos. Indicio de infraestructura de suscripciones; no prueba tarifas ni activación de todos los proveedores.
- **INDICIO Hermes:** referencias a compras, paywalls y Stripe. No prueba que Stripe procese pagos desde Android.
- **BINARIO:** el manifiesto contiene **31 prefijos de enlace** en dos hosts públicos. Agrupación orientativa de rutas (no pruebas de pantallas finalizadas):
  - Inicio/cuenta: `/dashboard`, `/portfolio`, `/perfil`, `/settings`, `/help`, `/agritech/entrar`.
  - Cuaderno y actividad: `/field-book`, `/actividad`, `/compliance`, `/huella`, `/estadisticas`.
  - Relaciones y personal: `/advisor`, `/mis-agricultores`, `/mis-asesores`, `/trabajo`, `/team`, `/worker-link`, `/mensajes`.
  - Economía y cadenas de suministro: `/cooperativa`, `/machinery`, `/contratos`, `/encargos`, `/pasaporte`, `/cartilla`.
  - Documentos, asistencia y vinculación: `/documents`, `/documentos`, `/asistente`, `/traer-datos`, `/conectar`, `/c/`, `/connect`.
- Estos 31 enlaces hacen verosímil una estrategia multifunción, pero **el manifiesto no demuestra que las rutas funcionen ni que el usuario tenga acceso a ellas**.

## 8. Seguridad, permisos y protección de datos

- Manifiesto: **40 permisos declarados** (incluyen permisos estándar o aportados automáticamente por bibliotecas y fabricantes); **14 actividades, 10 proveedores, 10 servicios y 6 receptores**.
- Componentes con `android:exported=true` explícito: actividad principal y tres receptores de servicios/SDK (Amazon IAP, FirebaseInstanceIdReceiver, ProfileInstaller). Los receptores incluyen permisos específicos; estos datos no demuestran una vulnerabilidad.
- Incluye ubicación aproximada/precisa/en segundo plano, foreground service de localización, cámara, micrófono, biometría, notificaciones, internet y permisos de almacenamiento histórico limitados a Android <=32.
- Configuración de `allowBackup=true` con `fullBackupContent` y `dataExtractionRules`. Los XML de respaldo incluyen `sharedpref` excepto el elemento `SecureStore` en cloud-backup y device-transfer; **no sabemos el contenido real de las otras preferencias ni si incluyen datos sensibles**.
- `android:debuggable` no figura habilitado en el manifiesto inspeccionado.
- `io.sentry.auto-init=false` en metadatos; librerías Sentry presentes, pero no confirma desactivación total de telemetría.
- Firebase Messaging y notificaciones presentes. No inspeccionado tráfico en tiempo real ni destinatarios de datos.
- **No publicar rutas de sistema privadas, identificadores de cuenta, tokens, configuraciones internas de servicios, claves, bundles ni certificados privados.**

### Controles derivados para Mágina Olivo
- Pedir ubicación en segundo plano **solo si existe una función explícita que la necesita**, informar con claridad de su duración, impedir vigilancia inadvertida y aplicar RGPD.
- Reglas de backup/migración y cifrado: no respaldar tokens, claves ni datos agrarios sensibles de forma legible; verificar de verdad el mecanismo (no asumir que `expo-secure-store` cifra toda SQLite).
- Revisar exported components, deep links y app links con tests positivos y negativos; nunca usar un deep link como autorización.
- Auditar que las peticiones IUWS se ejecutan únicamente desde servidor autorizado y que ninguna credencial administrativa acaba en cliente.

## 9. Conclusiones y grados de confianza

**CONFIRMADO POR BINARIO:** React Native/Expo/Hermes; MapLibre; Skia; ML Kit Document Scanner y Barcode; RevenueCat y Play Billing; Firebase/Expo Notifications; Sentry; AsyncStorage; Expo SecureStore; ubicación en segundo plano; versionName 1.5.2; 31 prefijos deep link; políticas de backup descritas.

**CONFIGURADO O SUGERIDO:** modalidades de recorrido, asistencia por voz, uso de datos agrarios SIGPAC/NDVI/SIEX y módulos amplios, según configuración/cadenas; no necesariamente activos.

**DESCONOCIDO:** arquitectura servidor, BD local exacta, consistencia offline, proveedores y flujos IA reales, motor OCR de texto, seguridad y rendimiento en ejecución, validación MAPA, interoperabilidad IUWS con respuesta administrativa, autoría IA del código y madurez de cada módulo.

**Acción siguiente:** realizar ensayos controlados con cuenta propia en móvil/web y datos ficticios (ver documento de QA enlazado desde el índice). En paralelo, prototipar una vertical propia Expo/React Native con persistencia SQLite transaccional, prueba de mapa SIGPAC/PNOA autorizada, control de permisos y mecanismo de sincronización verificable. **No copiar código o diseño del competidor.**

**Véase también:** [Informe estático inicial](OLEARIA-APK-ANALISIS-ESTATICO-2026-11-09.md), [Estrategia comparativa](OLEARIA-COMPETENCIA-Y-DIFERENCIACION-2026-11-09.md).
