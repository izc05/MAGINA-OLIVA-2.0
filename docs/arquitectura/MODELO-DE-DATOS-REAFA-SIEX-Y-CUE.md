# Modelo de datos y arquitectura de Mágina Olivo V2 (REAFA, SIEX, CUE, offline)

**Versión:** diseño 0.2 · **09/11/2026** · **Ningún SQL aplicado.** Modelo conceptual independiente del formato exacto IUWS, a confirmar cuando se interpreten FEGA V–VII.

## 1. Principio rector

**El libro de explotación privado NO es una réplica exacta de las tablas de la Administración.** Debe contener:
1. Identidad administrativa **referenciada** con fuente, fecha y campaña.
2. Entidades operativas propias para trabajo del agricultor.
3. Actividades tipadas, tratadas como historial verificable.
4. Adaptación versionada y separada a los mensajes oficiales.
5. Contabilidad y campañas comerciales separadas, aunque enlazadas al cultivo/finca.

El mismo contrato TypeScript gobierna Android/iOS y web. Las implementaciones concretas de almacenamiento, navegación y autenticación deben poder cambiarse sin alterar reglas normativas.

## 2. Entidades propuestas y relaciones

```text
account (usuario app, auth)
  └── app_membership [M:N] → holding (explotación)
party (persona física/jurídica, almacenada privada)
  ├── holding_legal_relation [M:N, vigencia] → holding
  └── official_authorization [M:N, alcance, modalidad] → holding
holding (UUID interno, REAFA, SIEX, origen/verificación)
  ├── holding_campaign [1:N]
  ├── farm [1:N] (agrupación de gestión creada por usuario)
  │    └── farm_enclosure [M:N por campaña]
  └── sigpac_enclosure_version [1:N, por campaña y origen oficial]
        └── cultivation_unit_enclosure [M:N] → cultivation_unit
               └── treatment_target [M:N] → treatment
                            ├── treatment_product [1:N]
                            ├── application_equipment [0:N]
                            ├── treatment_followup [0:N]
                            ├── evidence_document [0:N]
                            └── official_submission [0:N] (con acuse)
  ├── fertilization_record [0:N] + nutrient_application [0:N]
  ├── irrigation_record [0:N]
  ├── activity [0:N] (labores comerciales)
  ├── harvest/weighting/delivery/campaign [0:N]
  └── expense/income/labour/machinery_cost [0:N]

Cliente: outbox_private_operations → api → pg.
Backend: outbox_official_submissions → cue_connector → IUWS.
```

**Cautela:** la relación oficial explotación↔recintos y de superficie/campaña se ajustará a FEGA V y geometría REAFA real, no a supuestos del diagrama.

## 3. Diccionario de tablas candidatas

| Tabla | PK y FK conceptuales | Campos base | Notas |
|---|---|---|---|
| `party` | `id` UUID | `name`, `tax_id_private`, `type` | NIF sensible; limitar acceso y no mostrar en logs |
| `holding` | `id` UUID | `reafa_reference?`, `siex_code?`, `identity_status`, `official_verified_at?`, `source` | Un campo oficial NULL no debe bloquear uso privado |
| `holding_legal_relation` | `id`, `holding_id`, `party_id` | `relationship`, `from`, `to`, `evidence_ref` | Titular ≠ propietario ≠ arrendatario ≠ representante |
| `holding_campaign` | `id`, `holding_id` | `year`, `state`, `date_range` | No asumir que campaña oleícola = PAC |
| `farm` | `id`, `holding_id?` | `display_name`, `notes`, `created_by` | Puede existir pendiente de vinculación |
| `sigpac_enclosure_version` | `id`, `holding_id` | `sigpac_components`, `campaign`, `cultivation_area`, `use`, `source`, `geometry` | Conserva original/histórico; SRID oficial por verificar |
| `farm_enclosure` | `id`, `farm_id`, `enclosure_version_id` | `area_share`, `from`, `to` | Finca de gestión agrupa recintos |
| `cultivation_unit` | `id`, `holding_id`, `campaign_id` | `crop_code`, `variety?`, `management`, `area` | Relación por unidades controladas y campaña |
| `treatment` | `id`, `holding_id`, `campaign_id` | `performed_at`, `target_pest`, `applicator_id`, `advisor_id?`, `efficacy_status`, `audit_revision` | RD 1311 Anexo III y FEGA V |
| `treatment_target` | `id`, `treatment_id`, `enclosure_version_id` | `treated_area`, `crop_at_date` | Evitar arrays de recintos no referenciados |
| `treatment_product` | `id`, `treatment_id` | `registration_number`, `name`, `dose_value`, `dose_unit`, `quantity_value`, `quantity_unit`, `authorization_snapshot` | Autorizar para olivar/uso/fecha, no solo nombre |
| `treatment_followup` | `id`, `treatment_id` | `evaluated_at`, `efficacy`, `author_id` | Valoración posterior sin modificar tratamiento original |
| `equipment` | `id`, `holding_id` | `label`, `registration?`, `inspection?`, `operator?` | Distinguir propio, utilizado y empresa contratada |
| `fertilization_record` | `id`, `holding_id` | `date`, `unit_id`, `nutrient`, `quantity`, `type` | Excepciones/obligatoriedad por explotación |
| `evidence_document` | `id`, `holding_id`, `subject_id` | `storage_private_ref`, `sha256`, `mime`, `retain_until` | Almacenamiento privado, RGPD |
| `app_membership` | `id`, `account_id`, `holding_id` | `permissions`, `from`, `revoked_at` | RLS interno, no equivale autorización oficial |
| `official_authorization` | `id`, `holding_id`, `party_id` | `annex_type`, `scope`, `evidence_ref`, `status`, `verified_at` | Documentar Anexo IV o IX |
| `sync_outbox` | `operation_id`, `account_id` | `entity_uuid`, `base_revision`, `payload_hash`, `state` | Local/prueba sync privado |
| `official_submission` | `id`, `treatment_id`, `authorization_id` | `contract_version`, `payload_hash`, `attempt_no`, `status`, `ack_ref`, `raw_response_protected_ref` | Servidor, sin falsos acuses |
| `audit_log` | `id`, `holding_id`, `actor_id` | `entity`, `entity_id`, `change_type`, `timestamp`, `source` | Registro de responsabilidad |

No ejecutar este esquema como migración automática: primero completar los DTO y restricciones del Anexo V, validar relaciones, permisos y pruebas de datos.

## 4. Contrato TypeScript provisional — NO IUWS oficial

```ts
type UUID = string;

type OfficialIdentity = {
  reafaReference?: string;          // solo si lo entrega autoridad o fuente verificada
  siexCode?: string;                // ^ES[0-9]{12}$  (RD 1054/2022 art 2.1.i)
  verification: "unlinked" | "user_declared" | "verified" | "stale";
  source?: "REAFA" | "SIEX" | "user" | "import";
  verifiedAt?: string;
};

type HoldingDraft = {
  id: UUID;
  name: string;
  official: OfficialIdentity;
};

type TreatmentDraft = {
  id: UUID;
  holdingId: UUID;
  performedAt: string;
  targetEnclosures: Array<{ enclosureVersionId: UUID; areaHa: string }>;
  pestTarget: string;
  applicatorId: UUID;
  product: {
    registrationNumber: string;
    commercialName: string;
    doseValue: string;
    doseUnit: string;
    usedQuantity: string;
    usedQuantityUnit: string;
    verificationStatus: "unknown" | "verified_for_use" | "invalid";
  };
  equipmentId?: UUID;
  adviserId?: UUID;
  efficacy?: { assessedAt: string; result: string };
};

type PrivateSyncState = "LOCAL_ONLY" | "PENDING" | "SYNCED" | "CONFLICT";
type OfficialSubmissionState =
  | "NOT_READY" | "READY" | "QUEUED" | "SENT"
  | "UNKNOWN" | "ACCEPTED_WITH_ACK" | "REJECTED" | "CANCELLED";

type RecordEnvelope<T> = {
  id: UUID;
  schemaVersion: string;
  revision: number;
  createdAt: string;
  changedAt: string;
  privateSyncState: PrivateSyncState;
  officialSubmissionState: OfficialSubmissionState;
  payload: T;
};
```

**No** convertir `OfficialSubmissionState` en enum que refleje exactamente códigos IUWS: es solo un vocabulario interno. La forma del DTO oficial requiere documentación FEGA. Los valores `string` de decimales evitan redondeos del cálculo JS hasta normalización por capa apropiada.

## 5. Flujos de trabajo y persistencia

**Registro local offline**: `draft → validate-local → transaction(write record + outbox) → return confirmation «guardado en dispositivo»`. La transacción debe ser atómica.

**Sync privado**: verificar token privado, RLS por explotación, idempotencia por `operation_uuid`, `base_revision`; resolver cambios concurrentes y duplicados; dar lectura web.

**Sync oficial**: comprobar identidad REAFA, permiso oficial, producto y contrato, estado versión; preparar request, guardar hash y correlación; transmitir de manera autorizada; capturar acuse; reconciliar en timeout antes de reintento.

**Web**: decidir explícitamente IndexedDB o equivalente para offline; **no asumir que Expo SQLite web está soportado de igual forma**. Hacer prueba real con reinicio, pestaña privada, Safari/Chrome y limpieza de caché.

**Seguridad**: no persistir contraseña, certificados IUWS, documentos de identificación o tokens en SQLite sin modelo de amenaza y cifrado; `expo-sqlite` por defecto no da cifrado de datos en reposo. Revisar SQLCipher/Keychain/Keystore según build.

## 6. Migración Kotlin → V2

La versión Kotlin se conserva en `izc05/magina-olivo-v20` y APK QA global asociada al commit `f772a093e`. No mover ni eliminar su GitHub o Room.

Matriz mínima de continuidad:
| V1 | V2 candidata | Prueba |
|---|---|---|
| Finca UUID | `farm.id`, holding pendiente | UUID idéntico / referencias conservadas |
| Parcelas UUID y contexto | `sigpac_enclosure_version` + mapping origin | No inventar SIGPAC si faltaba |
| Campañas/ciclos | `holding_campaign` + `campaign` oleícola comercial | Dos periodos sin mezclar |
| Tratamientos/actividades | `treatment`/`activity` | Conteos, fechas, products, relación parcela |
| Pesadas/entregas | `weighting`/`delivery` | Sumas kg por finca y ciclo iguales |
| Gastos/jornales | `expense`/`labour` | Sumas euros y tipos iguales |
| Docs/fotos | `evidence_document` | Hashes, tipos, relación y acceso privado |
| Outbox operaciones | `sync_outbox` con estado preservado | No retransmitir por defecto ni duplicar |

**No usar doble escritura V1/V2 por defecto**: puede romper idempotencia y enviar dos veces una operación oficial. Antes de plan de corte, ensayo con copia restaurada QA, conciliación e importación idempotente, recuperación y rollback.

## 7. Primer ensayo de extremo a extremo

*Fixtures ficticios*: `QA-HOLDING-01`, `QA-FARM-01`, `QA-RECINTO-01` no son referencias reales de SIEX/SIGPAC; catálogos mock etiquetados como tales.

1. Alta en móvil de titular QA, explotación, 3 fincas y 4 recintos; guardar sin conexión.
2. Crear tratamiento en 2 recintos con cantidades coherentes y etiquetas simuladas.
3. Reiniciar el teléfono sin red y recuperar todo.
4. Volver a tener red, sincronizar backend QA y abrir navegador; comprobar datos.
5. Probar cuenta C sin acceso, cambios A/B, reintentos, duplicados y pérdidas.
6. Mock de envío oficial: pendiente / rechazo / timeout / aceptación *simulada*; mantener mensajes claros.
7. Exportar evidencia técnica, no una acreditación real de Junta.
8. Comparar con implementación Kotlin existente: días-persona reales de modificación, número de incidencias, tamaño, build, memoria, pruebas.

**GO solo con N0 (Anexo V/VI extraídos), datos coherentes, seguridad demostrada, respuesta de mock identificada y comparación real.** Integración oficial está fuera de esta fase.
