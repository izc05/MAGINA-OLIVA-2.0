# Investigación técnica reproducible de APK (solo metadatos)

**Alcance:** herramientas propias para analizar localmente paquetes Android obtenidos legítimamente. El repositorio Mágina Olivo V2 es **público**: nunca subir APK de terceros, bytecode, código reconstruido, materiales originales, datos personales ni informes con secretos.

## Requisitos y uso en PC Windows con Codex

- Python 3.11+ instalado; no requiere Android Studio ni instalar el APK en el PC para obtener los metadatos.
- Copiar un ZIP que contenga base.apk y splits, o un APK independiente, a una carpeta **privada fuera del repositorio** (por ejemplo, una carpeta de investigación local que no sincronice a GitHub).
- Abrir PowerShell en la raíz del repositorio V2 y ejecutar:

```powershell
python tools/research/apk_metadata_audit.py "C:\RutaPrivada\Olearia Agritech.zip" --output "C:\RutaPrivada\olearia-inventario-local.json"
```

- El script calcula SHA-256, tamaños, recuento de DEX/clases, bibliotecas .so, modelos TFLite y una lista permitida de plugin names de Expo. **No ejecuta el APK, no envía archivos, no elude protecciones y no extrae código original**.
- Revisión manual: comprobar fecha/versión/ZIP, contrastar los indicadores con el dossier, marcar cada hallazgo E1/E2/E3/E4/E5/E0 y publicar solo una síntesis saneada.
- La salida completa permanece privada; si hay dudas sobre información publicable, publicar solamente recuentos y conclusiones humanas sin archivos de terceros.
- Para análisis de permisos y app links, utilizar aapt2/apkanalyzer del SDK de Android **en local**, observar manifiesto y estado de enlaces únicamente en dispositivo propio; no auditar servidores ajenos ni interceptar comunicaciones sin autorización.

## Referencia verificada de la investigación inicial

- ZIP de Olearia Agritech: 150.019.914 B, SHA-256 d4c232f8b687e4bd02eccd041917c85f7419ebd0ff14a5205ea18d967af791d6.
- 4 APK, 9 DEX, 58.066 class_defs, 34 bibliotecas ARM64 y 3 modelos TFLite de lectura de códigos.
- Los resultados anteriores se contrastaron por más de un procedimiento de lectura estática. La primera ejecución de una versión de esta herramienta no constituye prueba funcional de la aplicación.
- Si otra versión de la APK da hashes o recuentos diferentes, **crear un informe nuevo** con versión/fecha; no sobrescribir silenciosamente el historial anterior.

## Reglas de seguridad y propiedad intelectual

1. Trabajar con la instalación/copia que posee legítimamente el usuario.
2. Evitar herramientas para romper licencias, ocultar identidad, eludir controles o obtener secretos.
3. No publicar código Java/Kotlin/JS reconstruido, fragmentos extensos del bundle, recursos, tipografías ni modelos propietarios.
4. No realizar pruebas de penetración de producción ni enumerar recursos privados de la empresa.
5. No usar datos reales de terceros en pruebas de OCR, voz o cuaderno; emplear vales ficticios y explotaciones de demostración.
6. No confundir una dependencia con una funcionalidad activa, ni una cadena «SIEX» con un acuse IUWS de la Junta.
7. Guardar únicamente hallazgos de alto nivel y recomendaciones de diseño independiente.

## Dónde se documenta el resultado

- [Dossier maestro y niveles de evidencia](../../docs/competencia/OLEARIA-DOSSIER-MAESTRO-EVIDENCIAS-2026-11-09.md).
- [Catálogo JSON consumible por Codex](../../docs/competencia/OLEARIA-CATALOGO-EVIDENCIAS-ESTADOS-2026-11-09.json).
- [Índice de competencia](../../docs/competencia/README.md).
- [Tareas de prueba funcional autorizadas](../../docs/competencia/OLEARIA-PRUEBAS-CONTROLADAS-Y-DECISIONES-V2-2026-11-09.md).

El código de Mágina Olivo se diseña desde requisitos propios y fuentes oficiales de normativa, no a partir de código reconstruido de Olearia.
