# Olearia — componentes Android, permisos y privacidad por diseño
**Fecha:** 2026-11-09 · **Evidencia:** AndroidManifest.xml binario de base.apk, reglas XML y configuración Expo del ZIP privado (app 1.5.2 / build 40).
**Estado:** VERIFICADO como metadatos estáticos; **no se ha auditado seguridad en ejecución, tráfico ni datos privados**.

## 1. Resumen comprobado
- 14 actividades, 10 proveedores de contenido, 10 servicios y 6 receptores declarados.
- 40 declaraciones de permisos: la mayoría las aportan los SDK de cámara, Android, Firebase, notificaciones, localización, bibliotecas de badge y pagos. **No son 40 permisos sensibles concedidos por el usuario**.
- Actividad principal exportada y preparada para abrirse con el lanzador, con esquema personalizado y enlaces HTTPS.
- Tres receptores de bibliotecas exportados, todos con declaración de permisos; comprobar la semántica del receptor sería trabajo distinto.
- Providers incluidos, entre otros, de Expo FileSystem/Sharing/ImagePicker, Cropper, ML Kit, Firebase, Sentry y AndroidX Startup. En el manifiesto inspeccionado figuran con exported=false. **No equivale a certificar que ningún URI pueda filtrarse desde un intent autorizado.**
- El manifiesto indica Android API mínima 24, objetivo 36; la característica Wi-Fi declara required=false.
- Se contabilizan 12 consultas de intents a otras aplicaciones, sin evidencia de que todas se ejecuten.
- Hay tres librerías nativas opcionales registradas: androidx.camera.extensions.impl y dos APIs de extensiones de ventana. Ninguna está marcada como requerida para instalar.
- No se halló android:debuggable=true explícito ni usesCleartextTraffic=true explícito; **esto no acredita confidencialidad integral ni justifica escanear o atacar el producto**.

## 2. Familias de permisos (vista de ingeniería)

| Familia | Ejemplos observados | Razón técnicamente plausible | Pregunta que falta comprobar | Política Mágina V2 |
|---|---|---|---|---|
| Red | INTERNET, ACCESS_NETWORK_STATE, ACCESS_WIFI_STATE | Comunicaciones, estado de conexión | Qué datos viajan, si hay modo avión real | Sólo solicitudes autorizadas; cifrado; no publicar claves |
| Ubicación | ACCESS_COARSE_LOCATION, ACCESS_FINE_LOCATION | Posicionar recinto o trabajador | Cuándo se solicita y guarda | Pedir solo al entrar en mapa/función |
| Ubicación de fondo | ACCESS_BACKGROUND_LOCATION, FOREGROUND_SERVICE_LOCATION y FOREGROUND_SERVICE | Seguir jornada/recorrido | Indicador visible, inicio/fin, revocación | Desactivado por defecto; habilitar con objetivo legítimo |
| Cámara/documentos | CAMERA | Fotografiar vales/productos, escanear | Qué retiene y durante cuánto tiempo | Consentimiento y archivo privado por finca |
| Voz/audio | RECORD_AUDIO, MODIFY_AUDIO_SETTINGS | Dictado y reproducción | Si se procesa local/remoto y si hay retención | Confirmar antes de guardar; no grabar sin indicación |
| Identificación local | USE_BIOMETRIC, USE_FINGERPRINT | Desbloqueo local | Si la biometría sustituye o no autorización | El rol y RLS del servidor prevalecen |
| Notificaciones | POST_NOTIFICATIONS, VIBRATE, WAKE_LOCK, RECEIVE_BOOT_COMPLETED | Alertas/push y restauración tras inicio | Qué se reprograma al reiniciar | Preferencias por usuario/fin y baja de notificaciones |
| Comercio | com.android.vending.BILLING, CHECK_LICENSE, proveedor Amazon IAP | Suscripciones/pagos/distribución | Qué planes son realmente activos | Separar cuenta, pagos y derechos CUE; auditoría |
| Almacenamiento legado | READ_EXTERNAL_STORAGE y WRITE_EXTERNAL_STORAGE (maxSdk 32) | Compatibilidad con Android anterior | No implica acceso irrestricto en Android 13+ | Selector de documentos y storage privado moderno |
| Badges/fabricantes | Varios permisos Samsung, HTC, Sony, Huawei, Oppo | Compatibilidad de indicadores de notificación | Ninguna función agrícola confirmada | Evitar añadir SDK solo por compatibilidad no usada |

**No asumir que el agricultor acepta todos estos permisos.** Diferenciar permiso declarado, permiso solicitado en runtime, permiso concedido y capacidad utilizada. No usar permisos propios del competidor como plantilla.

## 3. Componentes exportados e implicaciones

| Componente | Tipo | exported | Observación |
|---|---|---|---|
| io.olearia.agritech.MainActivity | activity | true | Lanzador y punto de entrada de enlaces personalizados/HTTPS |
| com.amazon.device.iap.ResponseReceiver | receiver | true | Tiene permiso declarado; componente de biblioteca |
| com.google.firebase.iid.FirebaseInstanceIdReceiver | receiver | true | Tiene permiso declarado; componente Firebase |
| androidx.profileinstaller.ProfileInstallReceiver | receiver | true | Tiene permiso declarado; componente AndroidX |

El resto de activities/services/providers/receivers inspeccionados no se declaró exportado (false explícito en la mayoría; algunas activities no incluyen atributo explícito). **Los estados omitidos no se tratan como permisos efectivos sin aplicar las reglas de Android a la versión objetivo.** Que un componente sea exported no es por sí solo una vulnerabilidad: exige estudiar el manejo de entrada, permisos y autorización.

**Referencia Android:** https://developer.android.com/guide/components/intents-filters .

## 4. Servicios y componentes que muestran una arquitectura amplia

- Localización: expo.modules.location.services.LocationTaskService y gestión de tareas Expo, foregroundServiceType de location.
- Notificaciones: ExpoFirebaseMessagingService, FirebaseMessagingService, receiver de notificación y componentes para arranque/actualización.
- Multimedia/documentos: Activities de ML Kit Document Scanner y Barcode Scanner; cropper e image-picker; Expo Video; providers temporales de compartición.
- SDK: componentes Firebase/Sentry/ML Kit/Google Play; servicios programados con JobScheduler/AlarmManager.
- Protección y compra: actividad de licencia de la distribución y billing. No intervenir sobre ellas ni inferir modelo de negocio activo.

Los nombres de clases son **bibliotecas observadas**, no una lista de pantallas implementadas por Olearia.

## 5. Backup Android: lectura exacta

En el manifiesto: allowBackup=true, con fullBackupContent y dataExtractionRules. Los XML de recursos inspeccionados son:

- secure_store_backup_rules.xml: regla include de dominio sharedpref, ruta «.»; exclude de sharedpref, ruta «SecureStore».
- secure_store_data_extraction_rules.xml: igual exclusión de SecureStore para cloud-backup y para device-transfer.

**Interpretación:** se excluyen ciertas preferencias de SecureStore de la copia/transferencia automática; esto es coherente con que las claves almacenadas por Keystore puedan ser específicas del dispositivo. **No sabemos qué hay en las demás preferencias, si una base de datos de tratamientos se respalda, ni si se recupera íntegramente**.

### Pruebas de V2 derivadas
1. Restaurar en dispositivo nuevo con base agraria ficticia y comprobar integridad referencial y trazabilidad.
2. Tokens y claves no migran legibles; se exige volver a autenticar o revalidar sesión segura.
3. No duplicar altas tras la restauración y reconexión.
4. Revocación de acceso de un trabajador sigue aplicando después de recuperar backup.
5. Documentos y referencias de archivos se restauran con autorización y hashes, o la app explica su indisponibilidad.
6. Log de telemetría sin NIF, DNI, geolocalización precisa, vales o contenidos de tratamientos.

Fuentes Android: https://developer.android.com/identity/data/autobackup y https://developer.android.com/guide/topics/data/autobackup .

## 6. Enlaces externos

- Enlace de esquema: olearia://, sin mecanismo de verificación de dominio.
- Dos intent filters HTTPS con autoVerify=true, dominios agritech.olearia.io y olearia.io (31 prefijos de ruta en conjunto).
- **No se ha verificado** que assetlinks.json del servidor coincida con firma y dominio, ni que Android marque el enlace como verificado.

**Para V2:** usar enlaces HTTPS verificados cuando proceda y comprobar permisos en servidor para cualquier recurso sensible. Un enlace a una finca jamás debe otorgar acceso por sí solo.

Referencia Android: https://developer.android.com/training/app-links/verify-applinks .

## 7. Lista de riesgos para nuestro diseño, NO hallazgos de vulnerabilidad en Olearia

- S1 Seguimiento GPS laboral sin inicio/fin de jornada y consentimiento → prohibir por diseño y test de revocación.
- S2 Documentos de vales con terceros visibles → OCR privado, minimización y confirmación; política de retención.
- S3 Sesión/permisos sólo locales → validar siempre en API y RLS por explotación.
- S4 Backups que contienen información sin cifrado → protección y ensayo de restauración reales.
- S5 Deep links que permiten ver fincas por ID → autorización en cada petición, caducidad de invitaciones.
- S6 Telemetría con identificadores personales o payload fitosanitario → saneamiento automatizado.
- S7 Conector IUWS desde teléfono con certificado → prohibido en arquitectura propuesta; backend autorizado con acuse y control de identidades.
- S8 Plugins innecesarios por imitación → presupuesto de dependencias y permiso mínimo.

**Este fichero no comunica defectos hallados en Olearia.** Son controles para Mágina Olivo V2 motivados por la superficie tecnológica observada.

**Relacionado:** [Dossier maestro](OLEARIA-DOSSIER-MAESTRO-EVIDENCIAS-2026-11-09.md), [inventario JSON](OLEARIA-APK-INVENTARIO-ESTATICO-2026-11-09.json), [pruebas](OLEARIA-PRUEBAS-CONTROLADAS-Y-DECISIONES-V2-2026-11-09.md).
