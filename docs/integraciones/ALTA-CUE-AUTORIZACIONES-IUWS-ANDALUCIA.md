# Integración oficial — CUE comercial, autorizaciones e IUWS (Andalucía)

**Versión:** 1.0 investigación · **Fecha:** 09/11/2026 · **Estado:** procedimiento y responsabilidades verificados; contrato de transporte **PENDIENTE** de extraer Anexo VI 3.11.4 y confirmar pruebas ante Junta.

## 1. Los tres agentes que no podemos confundir

1. **Empresa/persona desarrolladora y su software:** proveedor de Mágina Olivo; el FEGA Anexo X §3.1 establece registro del CUE comercial como INSCRITA ante la CA e identifica datos, contacto y vínculo con software.
2. **Titular de explotación:** titular inscrito en REAFA, responsable de información; puede usar la aplicación directamente o delegar gestión a un habilitado. Si usa directamente CUE comercial, el Anexo X §3.3 contempla autorización a empresa desarrolladora mediante **Anexo IX**.
3. **Entidad habilitada:** representante con autorización escrita del titular (Andalucía, **Anexo IV**) y alta/habilitación formal, selección/vinculación de un software comercial; puede ser otra empresa, cooperativa, asesoría o el desarrollador si cumple requisitos de entidad habilitada.

**ACLARACIÓN CRÍTICA:** «desarrollador que no es entidad habilitada» NO significa necesariamente «sin ninguna integración IUWS». El FEGA Anexo X §§3.1 y 3.3 contempla el suministro directo a agricultor autorizado por Anexo IX; la Junta declara dos vías de comunicación: **habilitado** y **productor individual**. La operativa exacta de esta modalidad, certificados, endpoints y derechos se debe confirmar con la Junta. No vender «integración completa» ni bloquear el diseño para esa vía sin respuesta.

**OTRA ACLARACIÓN:** no basta un checkbox de términos de servicio de Mágina Olivo. Los permisos de lectura/escritura en Supabase, el contrato RGPD, la elección del software y los **documentos/procedimientos administrativos** son distintos.

## 2. Fuentes exactas y pasajes verificados

| Tema | Evidencia | Fuente |
|---|---|---|
| Registro del CUE comercial | FEGA Anexo X §3.1, página 5: NIF, razón social, nombre software, contactos, dominio si se presta servicio directo, Anexo IX si servicio directo | [Anexo X](https://www.fega.gob.es/sites/default/files/files/document/2024.05.17-ANEXO_X-ProcedimientoAutorizacionCUE_PUBLICADO.pdf) |
| Registro de gestor/habilitado | FEGA Anexo X §3.2, páginas 7–10: identificador, software, dominio, autorización de titulares | Mismo Anexo X |
| Agricultor directo | FEGA Anexo X §3.3, páginas 10–11: directa autoriza desarrollador Anexo IX; delegada habilitado Anexos VIII/IX | Mismo Anexo X |
| Alta andaluza software | Junta: alta CUE comercial con certificado y remisión parte pública a `consultareafa.capadr@juntadeandalucia.es` | [Junta Cuaderno](https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/agricultura/cuaderno-explotacion.html) |
| Dos vías IUWS | Junta: «figura del habilitado» y «directamente el productor individual» | Mismo sitio |
| Habilitación en Andalucía | Junta: Anexo IV + VEA, múltiple hasta 50 y masiva más de 50, no instantánea | Mismo sitio |
| Vínculo CUE habilitado | `Mis Explotaciones → Entidades Habilitadas CUE comercial → Nuevo`, software y dominio cuando proceda | Mismo sitio |
| Desarrollador como habilitado | Posible cumpliendo Orden 27/10/2019, modificada Orden 19/08/2024; alcance y objeto social requerido en caso jurídico | [Orden de 19/08/2024](https://www.juntadeandalucia.es/boja/2024/166/9) |
| Contrato de red | FEGA publica Anexo VI IUWS 3.11.4 desplegado noviembre 2025; Junta cambia cadena base ejemplo a `https://ws108.juntadeandalucia.es/` | [FEGA](https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex) |

## 3. Flujo A: productor individual con software Mágina Olivo

```text
Titular con REAFA
   ↓
Elige CUE comercial Mágina Olivo
   ↓
Desarrollador registra software / dispone de requisitos de CA
   ↓
Titular autoriza acceso software (FEGA Anexo IX)
   ↓
Junta reconoce autorización/vinculación y certificados
   ↓
Back-end Mágina Olivo solicita datos autorizados vía IUWS
   ↓
Titular registra actividad móvil/web
   ↓
Validación de campos/catálogos FEGA → IUWS → acuse oficial
```

**Verificado:** existencia de modalidad directa y Anexo IX.  
**PENDIENTE:** pantallas exactas de alta/autorización del titular en Andalucía, sujeto titular de certificado usado en la llamada, propagación de revocación, horario actualizaciones, derecho exacto de escribir vs consultar, sandbox. Por ello diagrama = objetivo de proceso, no prueba operativa.

## 4. Flujo B: entidad habilitada / cooperativa / gestor

```text
Titular con REAFA
   ↓ Autoriza habilitado mediante documento Anexo IV
Entidad gestora obtiene habilitación Andalucía (VEA)
   ↓ Registro/activación no instantánea
Entidad elige CUE comercial registrado y lo vincula
   ↓ IUWS con alcance a titulares autorizados
Personal con roles internos registra y revisa tratamientos
   ↓ Conector oficial verifica habilitación y ejecuta operación admitida
   ↓ Respuesta oficial comprobada, almacenada y visible al titular
```

**Diseño:** soporte múltiple autorizaciones por explotación y representante, vigencia y revocación. No otorgar acceso a toda una cooperativa sin comprobación por titular.

## 5. Modelo de permisos: entidades y estados

| Entidad de dominio | Campos candidatos | Regla |
|---|---|---|
| `software_registration` | `software_id`, `administration`, `application_number?`, `status`, `proof_ref`, `verified_at` | Alta pendiente/inscrita/rechazada/suspendida, prueba documental |
| `official_actor` | `party_id`, `role`, `certificate_public_fingerprint?`, `status` | Nunca guardar clave privada en repositorio ni app |
| `official_authorization` | `holder_id`, `holding_id`, `delegate_id`, `software_id`, `annex_type`, `scope`, `from`, `to`, `revoked_at`, `evidence_ref` | Tipo IV/IX según vía y vigencia |
| `app_permission` | `account_id`, `holding_id`, `scope`, `status` | Solo acceso privado; **no** basta para IUWS |
| `official_exchange` | `submission_uuid`, `holding_id`, `authorization_id`, `payload_hash`, `transport_version`, `attempts`, `last_ack`, `official_ref` | No crear aceptación ficticia |
| `official_audit_event` | `who`, `what`, `why`, `when`, `outcome`, `request_id` | No registrar claves, NIF enteros ni tokens en logs |

Estados internos candidatos:
- Software: `NOT_REGISTERED`, `REGISTRATION_PENDING`, `REGISTERED`, `SUSPENDED`.
- Autorización: `DRAFT`, `SUBMITTED`, `PENDING_ACTIVATION`, `ACTIVE`, `REVOKED`, `EXPIRED`.
- **Sync privado**: `LOCAL_ONLY`, `QUEUED`, `PRIVATE_SYNCED`, `CONFLICT`.
- **IUWS**: `DRAFT`, `VALIDATED`, `PENDING_SUBMISSION`, `SENT`, `UNKNOWN`, `REJECTED`, `OFFICIALLY_ACCEPTED`.

Nombres internos no implican que los códigos oficiales de la Junta sean iguales.

## 6. Políticas de seguridad obligatorias por diseño

- Prohibir que cliente Android/iOS/web contenga certificados de firma, claves o credenciales IUWS.
- Aislar `cue-connector` del backend de usuario; mínimo privilegio, HSM/KMS o custodio equivalente adecuado.
- Separar identificador de autorización oficial y rol interno de la aplicación.
- Registrar consentimiento/vinculación, versión, evidencia y revocación; **verificar revocación antes de cada envío** siempre que exista mecanismo oficial confirmado.
- Revisar contratos de tratamiento de datos, roles responsable/encargado, privacidad de documentos, retenciones y residencia/transferencia internacional.
- Cifrar información sensible local según modelo de amenazas; **SQLite ordinario no significa cifrado**.
- Proteger documentos y acuses con control por titular/explotación, auditoría, aislamiento y expiración.
- En caso de timeout, la submisión entra en `UNKNOWN`; ejecutar conciliación con respuesta administrativa antes de reintentar para evitar duplicados.

## 7. Especificación IUWS: lo que NO sabemos todavía

No se han descargado/anotado íntegramente los XLSX y DOCX FEGA. **Bloqueo de desarrollo de transporte** hasta extraer:
- Anexo V 3.11: tabla de operaciones/variables, nombres exactos, formato, obligatoriedad y condicional.
- Anexo VI 3.11.4: protocolo, path completo, certificados, identificadores, versión, operación, esquema, errores, acuses, búsquedas, modificación y anulación.
- Anexo VII: catálogos versionados y fuente.
- Anexos VIII/IX: texto exacto de autorización y validación de firmas.

**No debemos inventar un `POST /treatments`, JWT, OAuth, SOAP ni WSDL si el anexo no lo demuestra.**

## 8. Preguntas que requieren respuesta escrita de Andalucía

Enviar a `consultareafa.capadr@juntadeandalucia.es` (sin certificados privados, NIF de agricultores ni adjuntos sensibles):
1. ¿Qué modalidad exacta de alta corresponde a desarrollador persona física que ofrece CUE propio directamente a titulares? ¿Qué identificación o forma societaria requiere el portal?
2. Para modalidad individual FEGA Anexo IX, ¿cómo se registra en Andalucía el consentimiento, y con qué certificado se autentica cada petición IUWS?
3. ¿Un desarrollador no habilitado con titular autorizado puede **leer REAFA y escribir en Sga Cex**? ¿En qué condiciones?
4. ¿Qué diferencia hay entre certificado de la compañía, representante y agricultor?
5. ¿Dónde se solicita entorno de prueba/preproducción y documentación WSDL/OpenAPI/XSD o ejemplos oficiales?
6. ¿Cómo se identifica una aceptación oficial, un duplicado, una anulación y una rectificación? ¿Existen consultas de estado?
7. ¿Cómo se propagan revocaciones y cambios de habilitación? ¿Hay propagación diferente para productor individual?
8. ¿Existe límite de plazo para envío diferido de tratamientos registrados offline?
9. ¿Es suficiente autorizar al software por Anexo IX o se requiere además comunicación activa a través de Sga Pec?
10. ¿Existen certificaciones, pruebas de interoperabilidad obligatorias y responsabilidades del proveedor?

## 9. Pruebas de aceptación y NO-GO

- Titular A autoriza gestor B; B puede trabajar solo con la explotación autorizada. Otro gestor C obtiene denegación de acceso.
- Revocar autorización bloquea llamadas administrativas pendientes y futuras, manteniendo los registros privados.
- Conmutar entre modalidad individual y habilitado no transfiere automáticamente certificados/permisos.
- Actualizar certificado público no revela/traslada clave privada.
- Perder respuesta IUWS jamás presenta «aceptado».
- Exportación de actividad y sus acuses puede verificarse sin permitir editar el original.
- Cambio de titular/explotación/campaña no mezcla historial.
- Sin documentación FEGA y autorización real, **solo mocks y datos ficticios**.

**Referencias fuente de verdad:** Junta CUE y FEGA Anexo X; para transporte esperar contrato del Anexo VI y confirmación Junta.
