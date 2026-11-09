# Olearia Agritech — análisis estático de la APK instalada (09/11/2026)

**Estado:** EVIDENCIA BINARIA VERIFICADA (parcial), exclusivamente análisis local de una copia facilitada por el propietario del dispositivo. Sin ejecución, sin acceso a cuentas ni backend, sin elusión de protecciones. **No publicar ni subir los APK, bundle JavaScript o código propietario a este repositorio público.**

## 1. Procedencia y control de integridad
- Archivo original: `Olearia Agritech.zip`, ubicado en Google Drive privado del usuario, carpeta «Magina oliva v2». No se enlaza ni adjunta aquí.
- Tamaño ZIP: **150.019.914 bytes** (aprox. 143,1 MiB).
- SHA-256 ZIP: `d4c232f8b687e4bd02eccd041917c85f7419ebd0ff14a5205ea18d967af791d6`.
- Paquetes: `base.apk` (97.016.010 B), `split_config.arm64_v8a.apk` (52.698.103 B), `split_config.es.apk` (98.713 B) y `split_config.xxhdpi.apk` (182.840 B). `README.txt` describe backup de split APK.
- Paquete: `io.olearia.agritech`; `assets/app.config` indica **versión 1.5.2, Android versionCode 40, Expo SDK 57.0.0**.

## 2. Tecnología observada directamente en el binario

| Hallazgo | Evidencia binaria | Confianza / límite |
|---|---|---|
| React Native | `libreactnative.so`, `libjsi.so`, `libreact_codegen_*.so`, nueve archivos DEX | Alta: capa móvil RN |
| Expo | `libexpo-modules-core.so`, configuración Expo, plugins declarados | Alta |
| Motor Hermes | `libhermesvm.so`, `libhermestooling.so`; `assets/index.android.bundle` (17.504.504 B) con cabecera de bytecode Hermes, no código JS legible | Alta |
| MapLibre | `libmaplibre.so`, plugin `@maplibre/maplibre-react-native` | Alta: dependencia incluida; no se han probado mapas ni descargas de teselas |
| Skia y animaciones | `librnskia.so`, `libreanimated.so`, `libworklets.so` | Alta |
| Monitorización | Bibliotecas nativas Sentry | Alta: dependencia incluida; no se examinó tráfico/telemetría |
| Lectura códigos | Modelos ML Kit de código de barras `.tflite` y `libbarhopper_v3.so` | Alta para componentes de barcode; **no prueba OCR de texto de vales** |
| Voz, cámara y biometría | Plugins Expo `expo-speech-recognition`, `expo-camera`, `expo-audio`, `expo-local-authentication`, `expo-image-picker` | Alta como configuración incluida; funciones reales no probadas |
| Navegación | referencias `expo-router`, `@react-navigation` en bytecode | Indicios fuertes, falta análisis funcional |
| Autenticación/base de datos | referencias `supabase` en bytecode; proveedor declara Supabase/PostgreSQL públicamente | Supabase plausible; **no se ha probado la conexión, el esquema ni RLS** |
| Persistencia offline | referencias AsyncStorage en bytecode y DEX; no se hallaron identificadores explícitos `expo-sqlite`, `WatermelonDB`, `RxDB` ni `react-native-mmkv` | **INDETERMINADO**: no deducir que solo usa AsyncStorage ni afirmar que SQLite no existe; probar comportamiento de datos |
| Firebase/notificaciones | referencias Firebase y plugin `expo-notifications` | Dependencia incluida; no significa que se envíen datos concretos |
| PDF/OCR | referencias aisladas a «ocr»; **no** se observó paquete `com/google/mlkit/vision/text` en las cadenas DEX examinadas | No permite confirmar motor OCR ni inferir que no exista por otras vías |

### Permisos declarados en Expo app.config
Ubicación aproximada y precisa, ubicación en segundo plano, servicios en primer plano de localización, cámara, grabación de audio, modificación de ajustes de audio y biometría. Esto es **configuración declarada**, no la lista definitiva validada del manifiesto resultante ni prueba de uso efectivo de todos ellos.

## 3. Interpretación para Mágina Olivo V2
1. **React Native + Expo** queda validado como **opción viable de implementación móvil real** en un competidor, no como garantía de calidad/seguridad o de interoperabilidad IUWS.
2. **MapLibre** merece un spike propio con teselas PNOA/SIGPAC, licencias, versiones de geometría, cobertura rural y caché; no copiar configuración de Olearia.
3. No prometer persistencia segura por detectar AsyncStorage. Antes de elegir capa local exigir pruebas de modo avión, cierre forzado, actualización, duplicación, concurrencia, cifrado y reconciliación.
4. Voz y escaneo son viables como componentes, pero el registro normativo debe depender de formularios y reglas, no de una salida de IA sin verificación.
5. **No hay evidencia en estos archivos de que el código fuera escrito mediante IA generativa**, aunque el producto incorpora librerías y servicios de IA. No atribuir proceso de autoría.
6. No hemos recuperado el código fuente original ni el backend; Hermes bytecode + bibliotecas nativas ≠ repositorio fuente.
7. La SDK, versión y fecha son las del ZIP analizado, no la versión más reciente del producto publicada posteriormente.

## 4. Ensayos de uso controlados pendientes
- En cuenta propia y con datos ficticios: alta de explotación/recintos, tratamiento y documentos; controlar persistencia tras reiniciar con modo avión.
- Probar SIN internet al guardar un registro nuevo, y reconexión en dos sesiones/autorizaciones de prueba: deduplicación y resolución visible de conflictos.
- Comprobar si el registro tiene evidencia inequívoca de aceptación administrativa real o solo texto comercial.
- Examinar UX de mapa: geometría, recintos, edición, campañas, descargar área, cobertura y velocidad.
- Comprobar en demo la entrada por voz, OCR de vale y verificación humana; nunca introducir vales con datos reales ajenos ni eludir controles.
- Si se usa Codex local: instalar herramientas de lectura estática de APK y hacer un **informe propio** con SBOM aproximado, permisos, componentes, tamaños y capturas funcionales. No intentar recuperar credenciales, eludir protecciones, acceder a endpoints privados o publicar código propietario.

## 5. Conclusiones y estado
**CONFIRMADO:** app nativa React Native/Expo con Hermes, MapLibre, Skia, ML Kit barcode, Sentry; cuatro splits y versión indicada.  
**INDICIO:** uso de Supabase y AsyncStorage; referencias Firebase, navegación y conexión.  
**NO VERIFICADO:** esquema de datos, motor real de sync, tecnologías de OCR de texto, código fuente, IA utilizada para programar, seguridad real, cumplimiento SIEX/IUWS, rendimiento offline y arquitectura backend.

**Siguiente acción:** decidir spike propio React Native/Expo + MapLibre + persistencia duradera de un tratamiento de olivar, basado en requisitos y pruebas del CUE, NO en reproducción de código de terceros.
