# Olearia Agritech — tercera investigación estática de la APK
**Fecha:** 2026-11-09 · **Versión inspeccionada:** 1.5.2 (build Android 40) · **Estado:** observación estática reproducible, **NO** auditoría del backend ni análisis de comportamiento.  
**Procedencia:** ZIP privado del titular, `Olearia Agritech.zip`, 150.019.914 bytes, SHA-256 `d4c232f8b687e4bd02eccd041917c85f7419ebd0ff14a5205ea18d967af791d6`. Copia destinada únicamente a investigación; **no añadir los binarios, recursos, bundle Hermes ni código reconstruido a GitHub**.

## 1. Qué se ha vuelto a comprobar

Se ha abierto el ZIP y los cuatro split APK con Python `zipfile`, leído su manifiesto Android binario y las reglas de backup, examinado `assets/app.config` **solo en campos no sensibles**, contado las definiciones de clases de los **9 DEX** a partir de la cabecera y tabla `class_defs`, e inventariado bibliotecas ARM64 y cabecera/longitud del bundle Hermes. No se ha ejecutado la app, descifrado tráfico, burlado protecciones ni accedido a ningún backend.

La comprobación **reconfirma las cuatro huellas SHA-256** del informe [anterior](OLEARIA-APK-AUDITORIA-AMPLIADA-2026-11-09.md). Los recuentos se refieren al APK proporcionado, no necesariamente a la versión disponible actualmente en Play.

### Distribución del tamaño de los componentes

| Componente | Tamaño aproximado descomprimido | Qué significa |
|---|---:|---|
| Clases Android (9 DEX) | 66,68 MiB | Java/Kotlin/bytecode de bibliotecas de Android y puentes nativos; **no solo código de Olearia** |
| Lógica JavaScript compilada (Hermes) | 16,69 MiB | `assets/index.android.bundle`, bytecode Hermes **no legible como código fuente TypeScript** |
| Recursos base Android | 10,77 MiB | Recursos de la app y dependencias |
| Bibliotecas nativas ARM64 (34 ficheros) | 49,95 MiB | MapLibre, Skia, React Native, ML Kit y otras |
| Modelos ML Kit embebidos (3 `.tflite`) | 0,84 MiB | Modelos asociados a lectura de códigos; **no prueban OCR textual de vales** |

**Recuento comprobado:** 58.066 definiciones de clases DEX en total, pero solo **32** bajo `io.olearia.*`; estas 32 incluyen clases auxiliares/generadas y **no** equivalen al volumen real de lógica propia, que en una aplicación React Native se concentra en la capa JS. El paquete no contiene archivos fuente `.tsx`, `.ts`, `.js` ni mapas de fuentes independientes detectables como tales.

### Principales paquetes en las tablas de clases DEX

| Prefijo (clases propias y de bibliotecas) | Definiciones |
|---|---:|
| `com.google` | 10.955 |
| `androidx.compose` | 10.649 |
| `expo.modules` | 5.987 |
| `androidx.media3` | 3.700 |
| `com.facebook` | 3.320 |
| `androidx.camera` | 3.223 |
| `com.revenuecat` | 3.054 |
| `io.sentry` | 1.575 |
| `org.maplibre` | 1.081 |

**Interpretación importante:** `androidx.compose` o `androidx.media3` son dependencias nativas/transitivas. Su tamaño no demuestra que la interfaz principal sea Jetpack Compose ni que Olearia tenga una funcionalidad de vídeo avanzada. Tampoco las 58.066 clases deben presentarse como trabajo de sus desarrolladores.

## 2. Arquitectura móvil: observación frente a inferencia

- **BINARIO — alta confianza:** React Native, módulos Expo, Hermes, MapLibre, Skia, Reanimated, Sentry y Google ML Kit. Hay **34 bibliotecas** `.so` ARM64.
- **CONFIGURACIÓN — alta confianza:** `assets/app.config` contiene `sdkVersion=57.0.0`, móvil Android/iOS y web como plataformas declaradas, `expo-speech-recognition`, `expo-location`, `expo-camera`, `expo-image-picker`, `expo-audio`, `expo-local-authentication`, `@maplibre/maplibre-react-native` y `expo-notifications`.
- **OFICIAL EXPO (documentación externa):** SDK 57 corresponde a React Native 0.86. Fuente: https://expo.dev/changelog/sdk-57 (consultado 09/11/2026). Una versión declarada en configuración **no revela necesariamente la versión de parche exacta** de cada dependencia.
- **INFERENCIA, aún no prueba:** el núcleo funcional es principalmente JS/TS. La interfaz móvil real no es simplemente un WebView, pero no se conoce su repositorio original ni el código de su servidor.

### Las bibliotecas ARM64 más voluminosas

| Biblioteca | Bytes | MiB aprox. |
|---|---:|---:|
| `librnskia.so` | 11.305.624 | 10,78 |
| `libmaplibre.so` | 10.846.016 | 10,34 |
| `libreactnative.so` | 6.985.168 | 6,66 |
| `libbarhopper_v3.so` | 4.946.720 | 4,72 |
| `libappmodules.so` | 2.925.944 | 2,79 |
| `libhermesvm.so` | 2.477.320 | 2,36 |

El tamaño puede influir en APK, descargas y mantenimiento. **No permite estimar rendimiento, consumo real de RAM, batería o velocidad de arranque sin medir en dispositivo.**

## 3. Almacenamiento real: qué sabemos y qué falta

En DEX aparecen **18 clases** `com.reactnativecommunity.asyncstorage.*`, incluida la capa de almacenamiento de ese módulo. No se han detectado clases `expo.modules.sqlite.*` ni `androidx.room.*` y no aparece `watermelondb` en una búsqueda sencilla del bundle Hermes.

**No concluir «no tiene SQLite».** AsyncStorage puede almacenar internamente usando componentes nativos; además, una app puede utilizar otros mecanismos de persistencia. El análisis estático **no determina** si tratamientos/recintos se guardan localmente, se envían a servidor ni cómo se resuelven conflictos.

**Prueba decisiva pendiente:** crear registros ficticios sin red, forzar cierre y reabrir, recuperar cobertura y observar duplicados; repetir con cuenta propia en segundo dispositivo. Hasta disponer de resultado, marcar OFFLINE = NO VERIFICADO.

**Decisión V2:** SQLite transaccional para actividades agrarias, outbox con UUID/idempotencia, historial de revisiones y permisos por explotación. Para web, evaluar almacenamiento offline por separado. No almacenar tratamientos críticos como un simple diccionario de preferencias sin pruebas de integridad. Fuente: https://docs.expo.dev/guides/local-first/ y https://docs.expo.dev/versions/latest/sdk/sqlite/ (la versión concreta del cliente debe fijarse por compatibilidad).

## 4. Manifiesto, permisos y privacidad

**Observación binaria:** Android `minSdkVersion=24`, `targetSdkVersion=36`, `compileSdkVersion=36`; **40 `uses-permission`** (numerosos corresponden a SDK o badges de fabricantes), **14 activities, 10 providers, 10 services y 6 receivers**.

- La `MainActivity` tiene `exported=true` con enlace interno `olearia://` y enlaces web `https://`. Otros tres receivers de bibliotecas también tienen `exported=true` y permisos asociados: Amazon, Firebase y AndroidX ProfileInstaller.
- Los permisos de ubicación precisa/aproximada, ubicación en segundo plano, servicio de primer plano de ubicación, cámara, micrófono y biometría figuran en el manifiesto o configuración. **Declarar un permiso no demuestra concederlo ni usarlo**.
- `READ_EXTERNAL_STORAGE` y `WRITE_EXTERNAL_STORAGE` aparecen limitados a **`maxSdkVersion=32`**; no describirlos como acceso irrestricto a todos los ficheros en Android 13+.
- `app.config` bloquea explícitamente `SYSTEM_ALERT_WINDOW` y `FOREGROUND_SERVICE_MEDIA_PLAYBACK`, ausentes del manifiesto observado. Es una decisión de configuración, **no una garantía integral de seguridad**.
- No se ha hallado en `<application>` una habilitación explícita de `debuggable`, `usesCleartextTraffic` ni `networkSecurityConfig`. Con target SDK 36 Android normalmente restringe tráfico claro por defecto; esto **no certifica todos los flujos de red ni la protección TLS**.
- Las políticas de backup (`secure_store_backup_rules.xml`, `secure_store_data_extraction_rules.xml`) incluyen `sharedpref` y excluyen `SecureStore` tanto de copia cloud como transferencia de dispositivo. **No sabemos qué contienen las demás preferencias**. Como usan inclusiones explícitas de `sharedpref`, tampoco debe darse por hecho que los archivos/BD de negocio se recuperan por copia del sistema.
- `expo.modules.updates.ENABLED=false` se declara en el manifiesto: el mecanismo `expo-updates` **no está activo en este build**. No excluye otras formas de actualización de contenidos/configuración.
- `com.pairip.application.Application` y actividad de licencia figuran como componentes de protección/distribución; **no se ha realizado ninguna intervención sobre esa protección**.

**Diseño V2 resultante:** permisos progresivos por contexto, consentimiento explícito para geolocalización de cuadrillas, interruptor de fin de jornada, backups cifrados comprobados y prueba de recuperación; no poner tokens/certificados IUWS en la app.

La documentación de Expo indica limitaciones de ubicación en segundo plano según Android y fabricantes, y exige configurar la tarea y solicitar el permiso correspondiente: https://docs.expo.dev/versions/latest/sdk/location/ .

## 5. Enlaces y estrategia de producto

`app.config` declara **31 entradas de prefijo de URL**, mediante dos filtros web (dominios públicos de Olearia); aparecen áreas de `/field-book`, `/asistente`, `/cooperativa`, `/machinery`, `/documents`, `/trabajo`, `/pasaporte` y otras. **Un enlace registrado no prueba que la pantalla exista, esté acabada o sea accesible a cualquier cuenta.**

Esto indica una intención de unir gestión agrícola, personal, cooperativa, trazabilidad y aplicaciones web/móvil. Para Mágina Olivo sería un error intentar construir todas esas superficies a la vez; mejor una vertical cerrada y contrastada con agricultores.

## 6. Reconocimiento de documentos, voz e IA

- `com.google.mlkit.vision.documentscanner.*`: **34 clases**. Confirma SDK de **escaneo de documentos**, que no equivale a OCR textual.
- Hay modelos del sistema de lectura de códigos/barcode. No se identificaron clases `com.google.mlkit.vision.text.*` en los nueve DEX; esto **no refuta** que el OCR se haga vía servidor, WebAssembly, otra librería o un servicio distinto.
- Los plugins de voz y cámara aparecen en Expo config; no se ha verificado proveedor/modelo, procesamiento local/remoto, coste ni precisión.
- Nada en el paquete demuestra que la aplicación haya sido **programada por IA**, aunque integre funciones de IA.

## 7. Matriz de decisión — Mágina Olivo V2

| Tecnología/función observada en Olearia | Qué debemos decidir por nuestra cuenta | Puerta de calidad |
|---|---|---|
| Expo SDK 57 + RN | Elegir versión actual soportada y fijar dependencias probadas; no copiar números de versión por imitación | Build Android e iOS, test de arranque/actualización y permisos |
| MapLibre | Licencia teselas, atribución, fuente oficial SIGPAC/PNOA, caché rural y control de versiones | Polígonos verificables, mapa offline probado, sin falsear superficies |
| Hermes y capa JS | Contratos TypeScript estables entre móvil/web; motor normativo independiente del framework | Validadores idénticos en clientes y servidor |
| AsyncStorage y persistencia desconocida | SQLite + outbox, protección de datos, backup y revisión de conflictos | Guardar sin cobertura, cierre forzado, recuperación, A↔B |
| Voz y scanner documental | OCR y voz con revisión humana, no alta automática de tratamientos autorizados | Campos corregibles, evidencia original, auditoría y tasa de error medida |
| GPS en segundo plano | Solo para trabajador con jornada iniciada y controles visibles; no para todos los agricultores | Sin seguimiento fuera de jornada; trazabilidad de consentimiento |
| Sentry/Firebase | Telemetría mínima, sin NIF, coordenadas ni payload legal por defecto; acceso por rol | Tests de sanitización y RGPD |
| RevenueCat/Billing | Plan comercial, cooperativa y pruebas de compra/cancelación por separado | No bloquear exportación de documentación agraria por fallo de pago sin análisis de obligaciones |
| Expo OTA desactivado | Diseño propio de actualización de normas/catálogos y versión de reglas | Datos históricos siguen interpretables con versión anterior |
| Enlaces verificados web | Deep links con autenticación, autorización por explotación y manejo de redirecciones | Ninguna ruta permite eludir RLS o revelar documentos |

## 8. Qué está realmente cerrado y qué no

**CONFIRMADO mediante APK:** cifras, hashes, manifiesto, permisos y componentes descritos, 32 clases del paquete propio, librerías, backup, actualizaciones Expo desactivadas y presencia de scanner/voz.  
**DOCUMENTADO externamente:** relación Expo SDK 57 ↔ RN 0.86.  
**HIPÓTESIS:** que la mayoría de las pantallas y reglas sean código JS/TS; la arquitectura exacta de datos offline.  
**SIN EVIDENCIA:** código fuente original, sistema privado servidor, endpoints IUWS finales, calidad/seguridad de ejecución, OCR de tickets, autoría con IA, precisión SIGPAC y aceptación administrativa real.

### Próxima investigación empírica

Requiere pruebas **en cuenta propia con datos ficticios** de la demo y la app (sin intrusión): tratamiento, mapa/recinto, offline+reinicio, reconexión, pesada+escáner, voz, permisos en cuadrilla y exportación CUE. Usar las fichas del [plan de pruebas](OLEARIA-PRUEBAS-CONTROLADAS-Y-DECISIONES-V2-2026-11-09.md), y añadir capturas saneadas, versión, fecha, dispositivo, pasos, resultado y conclusión. **No confundir una declaración comercial con una prueba realizada.**
