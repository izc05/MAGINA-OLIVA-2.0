# Olearia — contraste web pública, privacidad, seguridad y APK
**Fecha de investigación:** 2026-11-09 · **Estado:** contraste documental, NO auditoría de seguridad, homologación ni pruebas live.

## 1. Fuentes comprobadas

1. **Archivo ZIP privado del usuario**, 150.019.914 bytes, `Olearia Agritech.zip`: `versionName=1.5.2`, Android `versionCode=40`, React Native + Expo 57. Ver [auditoría](OLEARIA-APK-PROFUNDIZACION-ARQUITECTURA-2026-11-09.md).
2. **Web Agritech** https://olearia.io/agritech, consultada el 09/11/2026: declara cuaderno 2027, exportación SIEX/XML/PDF, funcionamiento offline, registro rápido, satélite/NDVI, asesor y cooperativa. La página accesible anuncia además descarga Android **1.0.3 (~191 MB)** desde otro origen. **La versión expuesta en marketing NO corresponde a la 1.5.2 analizada**, lo cual puede deberse a distintas distribuciones o a contenido no actualizado; no inferir problemas de producto.
3. **Política de privacidad** https://olearia.io/privacy, indica «última actualización 06/04/2026»; declara Supabase, PostgreSQL, datos de explotaciones SIEX y uso de modelo de IA **local** para procesar tickets de pesaje, eliminando las imágenes tras la extracción salvo adjunto explícito.
4. **Página de seguridad** https://olearia.io/security, indica «última actualización 11/01/2026»; la empresa manifiesta defensa en profundidad, TLS, cifrado, backups, 2FA en roadmap, control de acceso y prácticas inspiradas en ISO 27001. **Estas son afirmaciones del operador**, no pruebas independientes. La expresión «ISO 27001 Inspired» **no es un certificado ISO 27001 acreditado**.
5. **Documentación Expo SDK 57** https://expo.dev/changelog/sdk-57, confirma RN 0.86 para SDK 57; no certifica la configuración exacta de esta APK.

Las páginas públicas consultadas pueden ser anteriores a 09/11/2026 y estar desactualizadas; por tanto, cada conclusión conserva su tipo de fuente.

## 2. Matriz de triangulación

| Afirmación publicada por Olearia | Evidencia en la APK 1.5.2 | Estado real de comprobación | Ensayo seguro recomendado |
|---|---|---|---|
| «100 % offline» | React Native; AsyncStorage; sin identificación de esquema privado | **NO PROBADO** | Modo avión→tratamiento ficticio→cierre forzado→reapertura→reconexión sin duplicación |
| «CUE 2027 / SIEX/XML/PDF listo» | `SIEX` y `REAFA` aparecen como fragmentos en Hermes; `IUWS` no aparece literalmente | **NO PROBADO**; el servidor podría realizar IUWS | Ver en cuenta propia un acuse oficial real, no confundir con PDF/exportación |
| Mapas SIGPAC/PNOA, Catastro, NDVI | MapLibre nativo; términos presentes en bytecode | **COMPROBADO componente; funcionalidad NO PROBADA** | Alta de recinto y comparación con fuente oficial, campañas, áreas y mapa offline |
| Voz/asistente | Plugin `expo-speech-recognition`, permisos audio | **COMPROBADO componente; funcionamiento NO PROBADO** | Dictado ficticio, corrección y confirmación |
| OCR de vales con IA local | ML Kit Document Scanner y barcode; no halladas clases ML Kit Text Recognition en DEX | **NO PROBADO motor OCR ni localía**; el escaneo no implica OCR de texto | Ticket ficticio, modo avión, OCR y corrección; nunca exponer tickets reales |
| Supabase/PostgreSQL | Menciones en Hermes a Supabase, declaración en privacidad | **DECLARADO + INDICIO cliente**; esquema, RLS, topología no verificados | No inspeccionar cuentas, endpoints o DB de terceros; usar controles propios en V2 |
| Cifrado AES-256/TLS 1.3/RBAC/backups | Backup Android con exclusión SecureStore; Sentry, SDKs, Android target 36 | **DECLARADO, NO AUDITADO**; una política no prueba implementación | Para V2 establecer threat model, revisión RLS, pruebas de restauración y telemetría |
| «ISO 27001 Inspired» | Nada en APK puede certificar ISO | **No equivale a certificación acreditada** | No inferir homologación/certificación sin registro verificable |
| App multiplataforma | React Native+Expo en APK; web pública separada | **BINARIO Android confirmado; backend/web no inspeccionados a nivel código** | Probar experiencia de propia cuenta desde móvil y web |
| Tarifas y monetización | RevenueCat/Play Billing; páginas muestran distintos planes según producto | **Infraestructura confirmada, tarifa activa NO** | Pantalla de suscripción y condiciones actuales antes de comparar precios |

**La mayoría de las promesas son plausibles**, pero el objetivo de esta investigación no es desmentirlas sin pruebas ni certificarlas por publicidad. Se separan **declaraciones**, **dependencias** y **comportamiento demostrado**.

## 3. Riesgos de interpretación evitados

- **APK 1.5.2 vs web 1.0.3**: evitar extrapolar datos de una distribución a otra. La política pública es anterior a nuestro ZIP.
- **No hay texto «IUWS» en Hermes**: podría ser la nomenclatura de un backend; ausencia no implica falta de cumplimiento ni se utiliza para desacreditar al proveedor.
- **ML Kit Document Scanner** ≠ **Text Recognition**: un scanner prepara capturas PDF/imagen; el OCR puede estar en otra capa.
- **Supabase en web** ≠ seguridad de todas las explotaciones: el papel del backend requiere pruebas autorizadas.
- **ISO 27001 Inspired** ≠ ISO 27001 certificado, y disponer de una política no garantiza control operativo.
- **«React Native + Expo»** no dice si el código fue escrito manualmente o con herramientas de IA generativa.
- **Promesa de «un minuto»** no es un resultado comparativo medido por nosotros.

## 4. Implicaciones propias para Mágina Olivo V2

- Publicar un **estado de cumplimiento verificable**, nunca un «CUE homologado» antes de tener mapeo FEGA completo, autorización y aceptación IUWS.
- Mantener **versiones históricas** de parcelas, reglamento, catálogo MAPA, certificado y documentos, sin sobrescribir datos por actualización de app.
- Operaciones offline con **transacciones duraderas** e historial, pruebas de reintento/conflictos y backups completos verificables.
- IA/voz/OCR como asistentes que preparan **borradores revisables**, no registro automático ni prescripción fitosanitaria.
- Seguridad observable: matriz de roles, aislamiento tenant, sanitización de logs, ubicaciones de trabajadores con permiso y fin explícito.
- Comercial: precio, asistencia, facilidad y uso medidos en piloto local; evitar reclamos comparativos no auditados.

## 5. Limitaciones de la investigación de la web

La web comercial y las políticas fueron accesibles como documentos públicos; **no se pudo abrir el JavaScript ejecutado de `agritech.olearia.io` ni operar la demo en un navegador autenticado en esta sesión**. No se ha realizado pentesting, análisis de red, inspección de API no documentada ni acceso a datos de usuarios de Olearia. Para comprobar flujos hace falta una prueba funcional propia con consentimiento y datos ficticios.

**Enlaces internos:** [indicios Hermes](OLEARIA-BYTECODE-INDICIOS-FUNCIONALES-2026-11-09.md), [auditoría estática](OLEARIA-APK-PROFUNDIZACION-ARQUITECTURA-2026-11-09.md), [plan de pruebas](OLEARIA-PRUEBAS-CONTROLADAS-Y-DECISIONES-V2-2026-11-09.md), [decisiones de V2](../decisiones/DECISIONES-V2-TRAS-AUDITORIA-OLEARIA-2026-11-09.md).
