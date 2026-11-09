# Centro de investigación de competencia — Mágina Olivo V2

**Estado:** dossier vivo en rama docs/v2-reafa-cue-foundations; PR #10 pendiente de revisión. **Fecha de corte: 09/11/2026**.

## Entrada principal
**[DOSSIER MAESTRO — Olearia Agritech 1.5.2](OLEARIA-DOSSIER-MAESTRO-EVIDENCIAS-2026-11-09.md)**: resumen integrado de los hallazgos confirmados, sus limitaciones y decisiones concretas para Mágina Olivo V2. Leerlo antes de cualquier documento aislado.

**[CATÁLOGO JSON DE 22 EVIDENCIAS](OLEARIA-CATALOGO-EVIDENCIAS-ESTADOS-2026-11-09.json)**: datos consumibles por Codex/Claude con grados de certeza. **[Inventario JSON Android](OLEARIA-APK-INVENTARIO-ESTATICO-2026-11-09.json)**: permiso, biblioteca y prefijo de app link.

## Profundización técnica por área

| Documento | Finalidad | Estado |
|---|---|---|
| [Primer análisis APK](OLEARIA-APK-ANALISIS-ESTATICO-2026-11-09.md) | Identidad, splits, framework, bibliotecas | Estático |
| [Auditoría ampliada](OLEARIA-APK-AUDITORIA-AMPLIADA-2026-11-09.md) | DEX, componentes, pagos, privacidad | Estático |
| [Arquitectura y pesos](OLEARIA-APK-PROFUNDIZACION-ARQUITECTURA-2026-11-09.md) | Recursos, backup, Expo y almacenamiento | Estático |
| [Manifiesto y permisos](OLEARIA-ANDROID-COMPONENTES-PERMISOS-Y-PRIVACIDAD-2026-11-09.md) | 40 permisos, componentes y controles propios | Estático |
| [Indicios Hermes](OLEARIA-BYTECODE-INDICIOS-FUNCIONALES-2026-11-09.md) | SIEX, SIGPAC, IA, OCR y límites de contadores | Indicativo; NO prueba de uso |
| [Conectividad y app links](OLEARIA-ANALISIS-RED-OFFLINE-ENLACES-2026-11-09.md) | NetInfo, cache, tareas, enlaces y validaciones ROPO/BBCH | Estático/indicio |
| [Web frente a APK](OLEARIA-CONTRASTE-WEB-APK-Y-SEGURIDAD-2026-11-09.md) | Afirmaciones públicas comparadas con binario | Contraste |
| [Benchmark estratégico](OLEARIA-COMPETENCIA-Y-DIFERENCIACION-2026-11-09.md) | Posicionamiento y propuestas comerciales | Provisional |
| [Pruebas controladas](OLEARIA-PRUEBAS-CONTROLADAS-Y-DECISIONES-V2-2026-11-09.md) | 15 experimentos con cuenta propia y datos sintéticos | PENDIENTES |
| [Decisiones propias V2](../decisiones/DECISIONES-V2-TRAS-AUDITORIA-OLEARIA-2026-11-09.md) | 17 decisiones propuestas y criterios de aceptación | PROPUESTA |

## Fuente original y política de publicación

- Archivo original: «Olearia Agritech.zip», **150.019.914 B**, SHA-256 **d4c232f8b687e4bd02eccd041917c85f7419ebd0ff14a5205ea18d967af791d6**.
- Está en **Google Drive privado del usuario**, no en el repositorio. No incorporar APK, splits, bytecode, source maps, código propietario reconstruido, modelos, recursos gráficos, certificados, cookies, tokens ni datos de cuentas.
- El análisis de biblioteca o manifiesto es lectura estática, no reproducción del software. La publicación consiste solo en nuestros informes, metadatos generales y herramientas de investigación originales.
- No utilizar hallazgos de paquetes de terceros para acusar de vulnerabilidad o incumplimiento sin pruebas reproducibles y autorización.
- Para reproducir inventarios en PC: [manual del analizador](../../tools/research/README.md) y [script Python](../../tools/research/apk_metadata_audit.py).

## Niveles de evidencia

- **E1 BINARIO:** observado en APK/manifest/DEX/biblioteca.
- **E2 CONFIG:** declarado por app.config (no asegura activación).
- **E3 INDICIO:** un texto en Hermes, SDK transitivo o inferencia.
- **E4 PROVEEDOR:** afirmación de web/política (no auditada).
- **E5 PRUEBA:** validado con un ensayo funcional reproducible (no hay aún pruebas E5).
- **E0 DESCONOCIDO:** sin evidencia suficiente.

## Lo que NO sabemos todavía

No conocemos la arquitectura privada del servidor, esquema de base de datos, mecanismos reales de resolución de conflictos, precisión de OCR de tickets, funcionamiento del asistente, interoperabilidad administrativa IUWS, garantías de privacidad en ejecución ni calidad del mapa SIGPAC. Tampoco hay fundamento para afirmar que el código original fue escrito por IA.

## Qué hacer a continuación

1. Probar con cuenta propia y datos ficticios el registro de tratamiento y la recuperación offline tras cierre forzado.
2. Probar documento de pesada sintético y dictado con confirmación antes de registrar.
3. Verificar en Android los app links con función del sistema y sin tocar servicios ajenos.
4. Tras las pruebas, añadir por caso: versión, dispositivo, fecha, pasos, resultado, captura saneada, limitaciones y nivel E5.
5. Para Mágina Olivo V2, desarrollar arquitectura y módulos **independientes** basados en normativa y necesidades reales; no clonar código o diseños.

**Referencias:** [Índice documental completo](../README.md) · [PR #10](https://github.com/izc05/MAGINA-OLIVA-2.0/pull/10).
