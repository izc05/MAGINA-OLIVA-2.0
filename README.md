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