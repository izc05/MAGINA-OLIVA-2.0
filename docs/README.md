# Centro documental — Mágina Olivo V2

**Política del proyecto:** GitHub es la **fuente única de verdad** de la documentación técnica y funcional de Mágina Olivo V2. Decisiones, investigaciones y resultados que condicionen desarrollo deben tener un archivo versionado en este repositorio y aparecer en este índice. **No se considera concluida una investigación si su evidencia y conclusión no están en GitHub.**

**Última revisión del índice:** 2026-11-09  
**Estado general:** investigación y diseño en rama `docs/v2-reafa-cue-foundations`; PR #10 en borrador. **No homologado, no integrado IUWS real.**

## Índice de referencia

### Inicio y objetivos
- [¿Estamos listos para construir? Puertas GO/NO-GO y vacíos normativos/técnicos](decisiones/HOJA-DE-RUTA-Y-BLOQUEOS-ANTES-DE-DESARROLLAR-2026-11-09.md)
- [Estudio de implementación normativa CUE: modelo, evaluador de reglas, QA y bloqueos IUWS (09/11/2026)](decisiones/ESTUDIO-IMPLEMENTACION-NORMATIVA-CUE-2026-11-09.md)
- [Plan maestro V2 REAFA/CUE, arquitectura y primera vertical](PLAN-MAGINA-OLIVO-V2-REAFA-CUE.md)

### Normativa y fuentes oficiales
- [Cumplimiento normativo REAFA/SIEX/CUE, reglas actuales/futuras y pruebas](normativa/CUMPLIMIENTO-REAFA-SIEX-CUE-V2.md)
- [Auditoría crítica del informe de investigación externo](normativa/AUDITORIA-INFORME-EXTERNO-2026-11-09.md)
- [Matriz inicial de fitosanitarios desde RD 1311/2012 y Reglamento UE 2023/564](normativa/MATRIZ-FITOSANITARIOS-BASE-2026-11-09.md)
- [Correspondencia con formularios oficiales Junta Andalucía V9](normativa/FORMULARIOS-ANDALUCIA-V9-TRAZABILIDAD.md)
- [Registro de fuentes, contradicciones y pendientes FEGA](normativa/REGISTRO-FUENTES-Y-DISCREPANCIAS-2026-11-09.md)

### Competencia y posicionamiento
- **[Índice de competencia y dossier Olearia](competencia/README.md)** — punto de entrada recomendado.
- **[Dossier maestro de evidencias de Olearia 1.5.2](competencia/OLEARIA-DOSSIER-MAESTRO-EVIDENCIAS-2026-11-09.md)** — resumen auditado y límites.
- [Catálogo JSON de 22 afirmaciones con su estado de verificación](competencia/OLEARIA-CATALOGO-EVIDENCIAS-ESTADOS-2026-11-09.json)
- [Manifiesto Android: componentes, permisos, backup y privacidad](competencia/OLEARIA-ANDROID-COMPONENTES-PERMISOS-Y-PRIVACIDAD-2026-11-09.md)
- [Manual de análisis APK local seguro para Codex](../tools/research/README.md)
- [Olearia: cuarta auditoría de offline, NetInfo, ROPO/BBCH, WMS/WMTS y enlaces Android](competencia/OLEARIA-ANALISIS-RED-OFFLINE-ENLACES-2026-11-09.md)
- [Herramienta reproducible de inventario estático de APK para Codex](../tools/research/apk_metadata_audit.py)
- [Olearia: contraste de web comercial, privacidad, seguridad declarada y APK 1.5.2](competencia/OLEARIA-CONTRASTE-WEB-APK-Y-SEGURIDAD-2026-11-09.md)
- [Olearia APK: tercera inspección — composición del paquete, seguridad, respaldo, privacidad y arquitectura](competencia/OLEARIA-APK-PROFUNDIZACION-ARQUITECTURA-2026-11-09.md)
- [Olearia Hermes: mapa de indicios SIEX, SIGPAC, IA, OCR, cooperativas y cautelas](competencia/OLEARIA-BYTECODE-INDICIOS-FUNCIONALES-2026-11-09.md)
- [Olearia APK: auditoría estática ampliada — manifiesto, DEX, módulos, pagos, privacidad y límites](competencia/OLEARIA-APK-AUDITORIA-AMPLIADA-2026-11-09.md)
- [Olearia APK: inventario estructurado JSON de 40 permisos, 34 bibliotecas nativas y 31 enlaces](competencia/OLEARIA-APK-INVENTARIO-ESTATICO-2026-11-09.json)
- [Olearia: pruebas controladas pendientes y criterios de decisión para Mágina Olivo V2](competencia/OLEARIA-PRUEBAS-CONTROLADAS-Y-DECISIONES-V2-2026-11-09.md)
- [Olearia Agritech: análisis estático de los cuatro APK (09/11/2026)](competencia/OLEARIA-APK-ANALISIS-ESTATICO-2026-11-09.md)
- [Olearia Agritech: comparación, evidencia y diferenciación estratégica V2 (09/11/2026)](competencia/OLEARIA-COMPETENCIA-Y-DIFERENCIACION-2026-11-09.md)

### Decisiones derivadas de la competencia
- [Decisiones técnicas Mágina Olivo V2 derivadas de la auditoría APK Olearia](decisiones/DECISIONES-V2-TRAS-AUDITORIA-OLEARIA-2026-11-09.md)

### Integraciones y autorización administrativa
- [Alta de CUE comercial, productor individual, entidad habilitada e IUWS](integraciones/ALTA-CUE-AUTORIZACIONES-IUWS-ANDALUCIA.md)

### Arquitectura y migración
- [Modelo de datos REAFA/SIEX/CUE, sincronización y tipos TypeScript provisionales](arquitectura/MODELO-DE-DATOS-REAFA-SIEX-Y-CUE.md)
- [Decisiones multiplataforma, benchmark de competencia y migración de V1](arquitectura/DECISIONES-MULTIPLATAFORMA-Y-MIGRACION-2026-11-09.md)

## Normas para documentar a partir de ahora

1. **Ubicación:** 
   - `docs/normativa/`: obligaciones, matriz campo por campo, artículos vigentes, calendarios y catálogos.
   - `docs/integraciones/`: contratos FEGA/IUWS, permisos, modalidades y ensayos.
   - `docs/arquitectura/`: decisiones tecnológicas, dominio, DB, offline, RLS y migración.
   - `docs/competencia/`: análisis de servicios competidores, capturas autorizadas y fuentes.
   - `docs/pruebas/`: casos de QA, resultados reproducibles y evidencias no sensibles.
   - `docs/decisiones/`: ADR numerados de decisiones aprobadas, alternativas y motivos.
2. **Cabecera de cada documento:** título, versión, fecha, responsable/agente, estado (**PROPUESTA**, **VERIFICADO**, **PENDIENTE**, **OBSOLETO**), fuente original, fecha de consulta y versión normativa/técnica.
3. **Evidencia:** indicar artículo, apartado, página o anexo exacto y URL a fuente oficial. Distinguir cita normativa, interpretación propia y requisito aún no comprobado. Las conclusiones de búsquedas externas no se incorporan automáticamente como hechos.
4. **Cambios normativos:** no sobrescribir silenciosamente fechas antiguas. Registrar corrección, norma modificadora, cuándo entró en vigor, pruebas afectadas y consecuencias. Actualizar el índice y advertencias en documentos previos.
5. **Documentación viva:** cambiar un modelo, un campo o una regla exige actualizar su documento y prueba en la misma PR del código. Sin documento actualizado no se da la tarea por cerrada.
6. **Seguridad:** nunca subir NIF/DNI reales, contraseñas, claves, tokens, certificados privados, datos productivos de clientes, fotos de parcelas con información identificable o copias de bases privadas; utilizar datos ficticios y enlaces a documentos originales oficiales. Repositorio actualmente **público**.
7. **Contratos de terceros:** conservar licencia y URL del código abierto; no copiar fuentes o diseños privativos. Cuando se usan anexos descargados, registrar hash SHA-256, versión y origen sin incluir información personal.
8. **Ramas y revisión:** redactar en rama de documentación o de funcionalidad, PR revisable y fusionar a `main` **después** de aprobar. Mientras la PR #10 esté en Draft, su contenido **no está en main**. Claude y Codex deben leer siempre la rama/PR vigente.
9. **Auditoría de estados:** `registrado localmente`, `sincronizado con servidor` y `aceptado oficialmente` son estados distintos. No afirmar integración legal sin acuse real y permisos.
10. **Entrega al coordinador:** cada trabajo indicará archivo(s) guardados, commit SHA/PR, fuentes, qué se verificó, qué sigue pendiente y la siguiente decisión necesaria.

## Fuentes prioritarias

- [BOE texto consolidado RD 1054/2022 — SIEX y CUE](https://www.boe.es/eli/es/rd/2022/12/27/1054/con)
- [BOE RD 1311/2012 — fitosanitarios](https://www.boe.es/buscar/act.php?id=BOE-A-2012-11605)
- [Junta de Andalucía — REAFA / Cuaderno de explotación](https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/agricultura/cuaderno-explotacion.html)
- [FEGA — documentación SIEX (Anexos V–X)](https://www.fega.gob.es/es/siex/documentacion-tecnica-agricola-siex)

## Bloqueos antes de IUWS real

**PENDIENTE:** extraer y auditar completamente el XLSX Anexo V 3.11, DOCX Anexo VI IUWS 3.11.4 y catálogos Anexo VII, además de obtener el acceso/alta administrativa correspondiente. Los documentos actuales incluyen modelos **propuestos**, no contratos oficiales completos. No inventar operaciones, auth, endpoints, datos ni acuses oficiales.

## Referencias de trabajo

- [PR #10 — dossier REAFA/SIEX/CUE en elaboración](https://github.com/izc05/MAGINA-OLIVA-2.0/pull/10)
- [Código de Mágina Olivo V1 Kotlin, preservado](https://github.com/izc05/magina-olivo-v20)
