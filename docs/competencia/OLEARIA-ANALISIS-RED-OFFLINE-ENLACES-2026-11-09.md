# Olearia: cuarta pasada de análisis — señales offline, cartografía, enlaces y arquitectura multiplataforma

**Fecha:** 2026-11-09 · **Versión analizada:** APK 1.5.2, Android build 40, Expo SDK declarado 57 · **Estado:** auditoría estática del paquete suministrado, **NO** evaluación de funcionamiento real.

## A. Método y evidencia

Se ha vuelto a abrir `Olearia Agritech.zip` (150.019.914 bytes; SHA-256 `d4c232f8b687e4bd02eccd041917c85f7419ebd0ff14a5205ea18d967af791d6`), inspeccionado sus 4 split APK con `zipfile`, revisado el AndroidManifest binario, leído **solo campos públicos permitidos** de configuración Expo y contado clases DEX y fragmentos del bytecode Hermes. No se ha iniciado sesión, ejecutado código, investigado servidores internos, extraído secretos ni eludido la protección de distribución.

Para hacer reproducible el resultado sin publicar archivos de terceros, se añade el script independiente `tools/research/apk_metadata_audit.py`, que solo genera hashes, tamaños y conteos de módulos. **No subir jamás al repositorio el ZIP, APK, bundle Hermes, certificados, datos personales ni código ajeno reconstruido**.

**Reproducción del segundo conteo independiente:** 4 APK; `base.apk` con 9 DEX, **58.066** definiciones de clase, **69.915.816 bytes** de DEX, **17.504.504 bytes** de bundle Hermes y 3 modelos TFLite (~880.888 bytes); el split ARM64 incluye **34 .so**, **52.374.432 bytes** descomprimidos. Coincide con los informes precedentes. Las miles de clases de SDK no indican líneas de código propio de Olearia.

## B. La parte offline y de sincronización aún no visible como fuente

| Indicador | Evidencia | Qué permite concluir |
|---|---:|---|
| `com.reactnativecommunity.netinfo` | **23 clases DEX** | Hay SDK nativo para observar conectividad; **no** prueba que se use en todos los flujos |
| `com.reactnativecommunity.asyncstorage` | **18 clases DEX** | Hay persistencia de pares clave/valor, con puente nativo; no prueba el esquema de actividades |
| `expo.modules.securestore` | **53 clases DEX** | Hay infraestructura de almacenamiento seguro; no prueba cómo se almacenan todos los datos |
| `expo.modules.taskManager` | **48 clases DEX** | Hay soporte de tareas; no prueba periodicidad ni sync en background |
| Hermes: `queryClient` / `persistQuery` | **8 / 5 apariciones** | Indicios de mecanismo de consulta/cache/persistencia; no identificar librería ni semántica con certeza |
| Hermes: `NetInfo` / `sync_status` / `idempotency` | **4 / 3 / 4 apariciones** | Referencias a conexión/estado y una noción de idempotencia; **no demuestra** reintentos correctos ni ausencia de duplicados |
| Hermes: `offline` / `queued` / `retry` | **27 / 51 / 52 apariciones** | Vocabulario compatible con colas y reconexión, pero puede proceder de bibliotecas, traducciones o código no activo |
| `expo.modules.sqlite` / `androidx.room` | **0 / 0 clases DEX** | No identificadas estas dependencias específicas. **No implica ausencia de SQLite** |
| SDK de conectividad + cache | componentes presentes | Hipótesis: **ha previsto diseño offline**; ningún resultado de resiliencia ha sido probado |

**Requisito de comparación real:** con cuenta propia y datos sintéticos hacer modo avión → apunte → forzar cierre → reabrir → reconectar → segunda sesión; conservar evidencias y comprobar duplicados y conflictos. El éxito de una sola pantalla no demuestra funcionamiento general.

## C. Cartografía y agronomía

| Señal identificada | Evidencia | Límite |
|---|---|---|
| `org.maplibre` | **1.081 clases DEX**, `libmaplibre.so` | MapLibre efectivamente empaquetado, **sin probar** teselas ni precisión |
| Hermes: `GeoJSON` / `raster` | **17 / 13 apariciones** | Vocabulario de capas/formatos |
| Hermes: `WMS` / `WMTS` | **9 / 4 apariciones** | Indicios de servicios cartográficos estándar; **no confirma** cuál usa ni su licencia |
| Hermes: `SIGPAC` / `PNOA` | **67 / 4 apariciones** | Referencias al dominio; fuente/versión de dato por verificar |
| Hermes: `ROPO` / `BBCH` | **125 / 29 apariciones** | Indicios de modelado agronómico especializado; **no** certifican validaciones legales |
| Hermes: `REAFA` / `SIEX` / `IUWS` | **6 / 69 / 0 apariciones** | No acreditar conexión IUWS ni negarla: la operación puede estar en backend |

**Implicación V2:** no subestimar la cobertura agraria anunciada por el competidor. Nuestra diferenciación debe proceder de reglas normativas versionadas y verificables, trazabilidad por recinto/campaña, datos reales interoperables autorizados y un flujo sencillo probado con agricultores; no por decir que nadie más implementa ROPO, BBCH, SIEX u OCR.

## D. Enlaces móvil/web: configuración exacta del manifiesto

El AndroidManifest de `base.apk` contiene:
- **1 filtro MAIN/LAUNCHER**.
- **1 filtro de esquema personalizado `olearia://`**, que por naturaleza **no está verificado por el mecanismo de dominios HTTPS**.
- **2 filtros con `android:autoVerify=true` y `https`**, uno para `agritech.olearia.io` (**30 prefijos**) y otro para `olearia.io` (**1 prefijo**, acceso). Total **31 prefijos** HTTPS.
- 12 declaraciones de consultas de intents para visibilidad de otras aplicaciones, sin que eso implique que se realicen todas esas interacciones.
- Android `minSdk=24`, `targetSdk=36`; orientación `portrait` y estilo automático de tema según configuración Expo.
- Expo declara `ios`, `android` y `web`, plugins para Quick Actions, Apple Sign In, cámara, voz, video, SecureStore, ubicación, notificaciones y MapLibre. Esta declaración **no prueba que todas esas plataformas o funciones estén activas públicamente**.

**Verificación de los enlaces:** se intentó consultar los dos documentos públicos `https://<host>/.well-known/assetlinks.json` pero el navegador de investigación no pudo recuperarlos. **Estado = DESCONOCIDO**, no declarar que Olearia tiene enlaces verificados en producción solo porque `autoVerify` está en la APK. Android exige concordancia entre dominio, fichero Digital Asset Links y firma. Fuente oficial: https://developer.android.com/training/app-links/verify-applinks ; recomendación OWASP: https://mas.owasp.org/MASTG/best-practices/MASTG-BEST-0070/.

**Criterios de seguridad para Mágina Olivo V2:** `app links` HTTPS preferibles a esquemas privados para acciones sensibles; validar siempre sesión, permisos de finca y parámetros de ruta en el backend; `assetlinks.json` comprobado desde dispositivo Android con `adb shell pm get-app-links`; nunca tratar un deep link como autorización de una cooperativa o un titular.

## E. Tamaño, permisos y sostenibilidad

- `base.apk` = **97.016.010 bytes**; `split_config.arm64_v8a.apk` = **52.698.103 bytes**.
- Binarios distribuidos según dispositivo (ARM64, español, xxhdpi). El ZIP no es el tamaño de descarga para todos los usuarios ni permite extrapolar consumo RAM/batería.
- Dos permisos explícitamente **bloqueados por configuración**: `android.permission.SYSTEM_ALERT_WINDOW` y `android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK`. Esto solo valida una medida declarativa.
- `android.permission.READ_EXTERNAL_STORAGE` y `WRITE_EXTERNAL_STORAGE` se limitan a SDK <=32.
- `expo.modules.updates.ENABLED=false` en manifiesto del build; no garantiza que todos los datos remotos sean estáticos.
- 19 plugins Expo configurados; varios aportan funcionalidades genéricas. Seleccionar dependencias V2 por requisito demostrado, no añadir todos los módulos por imitación.

## F. Nuevas hipótesis y cómo falsarlas

| Hipótesis | Estado | Prueba necesaria |
|---|---|---|
| La app puede detectar pérdida de red | SDK NetInfo incluido | Desactivar red y observar estado/consecuencia en un registro ficticio |
| Hay cache persistente de consultas | Fragmentos `persistQuery` / `queryClient` | Borrador offline, forzar detención, reinicio y comparar |
| Usan mecanismos de idempotencia en sync | `idempotency` aparece cuatro veces | Reintentos repetidos con cuenta propia y registro ficticio; sin intrusión |
| Los mapas tienen capas WMS/WMTS | Nombres en bytecode | Comprobar interfaz y atribución, no investigar APIs privadas |
| Hay validaciones ROPO/BBCH | Textos en bundle | Revisar formularios con datos sintéticos y casos de error |
| Los enlaces HTTPS están verificados | `autoVerify=true` | `assetlinks.json` accesible + estado Android `pm get-app-links` |
| El motor OCR es local | Escáner documental y declaración comercial | Ticket sintético en modo avión y estudio de resultados, sin afirmar proveedor |

## G. Decisiones técnicas propias prioritarias

1. Adoptar **una capa transaccional de hechos agrícolas** en móvil (SQLite + outbox) y control de conflictos para sincronización; comprobar web por separado. Los fragmentos de Olearia no equivalen a prueba para copiar un diseño.
2. Tratar **SIGPAC, REAFA, cultivo, campaña, ROPO y BBCH** como datos tipados/versionados, con fuente y validación condicional, y no simplemente textos libres.
3. Dar a la IA acceso solo a **herramientas de dominio permitidas**, generando borradores, nunca afirmaciones de producto autorizado ni envíos oficiales sin comprobación.
4. Probar **Deep Links verificados** y autorización en cada paso para contratos, documentos y fincas compartidas.
5. Controlar peso inicial de app, SDKs prescindibles, permisos de fondo y telemetría con criterios de privacidad/rendimiento; establecer presupuestos y medir en Android real.
6. Mantener separados `LOCAL_SAVED`, `PRIVATE_SYNCED`, `OFFICIAL_SUBMITTED` y `OFFICIALLY_ACCEPTED` hasta cerrar el contrato FEGA/IUWS de Andalucía.

**NO probado:** arquitectura servidor, esquema exacto de persistencia offline, código fuente original, rendimiento real, seguridad de endpoints, funcionamiento IUWS, OCR y autoría del código mediante IA. No se ha realizado pentesting, ejecución ni interacción con datos ajenos.

**Documentación relacionada:** [auditoría ampliada](OLEARIA-APK-AUDITORIA-AMPLIADA-2026-11-09.md), [profundización](OLEARIA-APK-PROFUNDIZACION-ARQUITECTURA-2026-11-09.md), [pruebas de competencia](OLEARIA-PRUEBAS-CONTROLADAS-Y-DECISIONES-V2-2026-11-09.md), [decisiones V2](../decisiones/DECISIONES-V2-TRAS-AUDITORIA-OLEARIA-2026-11-09.md).
