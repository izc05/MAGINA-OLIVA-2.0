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
