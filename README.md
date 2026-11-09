# Mágina Olivo V2

Nueva etapa de Mágina Olivo: **cuaderno agrícola multiplataforma (Android, iOS y web)**, especializado en olivar, con prioridad en **REAFA, CUE digital, SIGPAC e interoperabilidad IUWS de Andalucía**.

> **Estado:** investigación y arquitectura propuesta. **No es** un CUE comercial oficialmente conectado, autorizado ni certificado. No subir datos personales, claves ni certificados: este repositorio es público.

## Empezar por aquí

**[Plan maestro REAFA/CUE, arquitectura, ejemplos de código abierto y fases de desarrollo](docs/PLAN-MAGINA-OLIVO-V2-REAFA-CUE.md)**

## Decisiones iniciales

- Explorar **Expo + React Native + TypeScript** para móvil y web, aprovechando componentes libres con licencias verificadas.
- Diseñar primero la matriz de datos exigidos por Junta/FEGA y los contratos administrativos.
- Conservar intactos el repositorio y la APK Kotlin de la versión anterior; no hacer una migración completa antes de probar una vertical de tratamientos.
- Mantener **separados** la sincronización entre dispositivos y el estado de envío/aceptación oficial del CUE.
- No usar servicios IUWS reales ni claves/certificados hasta obtener autorización y el contrato técnico validado.

## Fuentes oficiales

- [Junta de Andalucía — Cuaderno de explotación](https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/agricultura/cuaderno-explotacion.html)
- [FEGA — Documentación Técnica Agrícola SIEX](https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex)

Las decisiones y cambios de código se registrarán mediante ramas y PR revisadas.
## Auditoría normativa y técnica (09/11/2026)

**LEER ESTOS DOCUMENTOS ANTES DE PROGRAMAR**. El informe de investigación externo contenía fechas normativas antiguas (2024/2025). La revisión usa BOE/Junta/FEGA y distingue hechos comprobados de contratos pendientes:

1. [Auditoría crítica y marco vigente REAFA/CUE](docs/normativa/AUDITORIA-INFORME-EXTERNO-2026-11-09.md)
2. [Matriz inicial campo a campo fitosanitarios, RD 1311 Anexo III y UE 2023/564](docs/normativa/MATRIZ-FITOSANITARIOS-BASE-2026-11-09.md)
3. [Arquitectura Expo/React, offline, benchmark y migración V1→V2](docs/arquitectura/DECISIONES-MULTIPLATAFORMA-Y-MIGRACION-2026-11-09.md)

**BLOQUEO:** aún falta extraer y mapear íntegramente el XLSX oficial Anexo V 3.11 y DOCX Anexo VI IUWS 3.11.4. No desarrollar transportes IUWS ni declarar validez administrativa antes de esa revisión y autorización oficial.

## Dossier REAFA / SIEX / CUE — segunda entrega (09/11/2026)

**Documentación comprobada y revisada a partir de la investigación facilitada por el promotor.** Empezar por estos documentos, que **corrigen** el calendario 2026 y las antiguas reglas de superficie:

- [Cumplimiento REAFA/SIEX/CUE — matriz legal y criterios QA](docs/normativa/CUMPLIMIENTO-REAFA-SIEX-CUE-V2.md)
- [Autorizaciones — software, productor individual y entidad habilitada / IUWS](docs/integraciones/ALTA-CUE-AUTORIZACIONES-IUWS-ANDALUCIA.md)
- [Modelo de datos — explotaciones, recintos, actividades y sincronización](docs/arquitectura/MODELO-DE-DATOS-REAFA-SIEX-Y-CUE.md)
- [Modelo oficial de cuaderno V9 — formularios 3.1 y 3.1 bis](docs/normativa/FORMULARIOS-ANDALUCIA-V9-TRAZABILIDAD.md)
- [Registro de fuentes, errores del informe externo y bloqueos FEGA](docs/normativa/REGISTRO-FUENTES-Y-DISCREPANCIAS-2026-11-09.md)

**Regla vigente:** papel fitosanitario hasta 31/12/2026 y registro digital desde 01/01/2027; el CUE digital general es voluntario salvo obligación sectorial. **No bloquear borradores locales sin REAFA; bloquear vinculación/envío oficial** hasta comprobación de identidad y autorización. Separar siempre `PRIVATE_SYNCED` de `OFFICIAL_ACCEPTED`.

**NO-GO transporte oficial:** las descargas del FEGA **Anexo V 3.11 XLSX** y **Anexo VI IUWS 3.11.4 DOCX** están localizadas pero todavía **no se han extraído íntegramente**. Hasta entonces, no codificar mensajes/endpoints oficiales ni afirmar homologación de Mágina Olivo.
