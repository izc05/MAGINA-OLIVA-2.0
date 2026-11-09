# Benchmark de competencia — Olearia Agritech frente a Mágina Olivo V2
**Fecha:** 09/11/2026 · **Estado:** ANÁLISIS COMPETITIVO PROVISIONAL; sin test end-to-end de la aplicación · **Autor:** coordinación estratégica.

## Evidencias disponibles y límites
- Siete capturas aportadas por el promotor de móvil y web: portada oscura, onboarding sobre olivar, registro, mensaje de inspección digital, free hasta 10 ha, maquinaria, cooperativa, mensajería, alta con mapa/Catastro/SIGPAC, QR de botella y pasaporte de lote.
- Sitio comercial https://olearia.io/agritech ; precios https://olearia.io/pricing ; términos https://olearia.io/terms ; FAQ https://olearia.io/faq (consultados 09/11/2026).
- Ficha Google Play: https://play.google.com/store/apps/details?id=io.olearia.agritech (consulta 09/11/2026); acredita publicación y contenido declarado por desarrollador, no pruebas de calidad, seguridad, integridad offline o interoperabilidad oficial.
- El proveedor declara cuaderno para 2027, offline, SIEX/XML/PDF, SIGPAC, satélite, datos económicos, IA con dictado y consulta por finca. **Son afirmaciones del proveedor no verificadas mediante QA independiente.**
- Hay inconsistencias entre ofertas y páginas (Starter gratis hasta 10 ha frente a mensajes 4,99–5,99 €/mes en otras secciones). Confirmar en checkout y condiciones antes de usar cifras de comparación.
- La ficha de Play muestra cifra pública muy pequeña «1+ descargas» en la consulta; **no inferir usuarios activos, ingresos o tracción comercial**, ya que también existe acceso web y otros canales.
- El proveedor afirma conexión SIEX; aún no se dispone de prueba independiente de envío real y acuse aceptado por IUWS. No acusar de incumplimiento ni afirmar homologación sin soporte oficial.

## Matriz de implicaciones para el producto

| Eje | Evidencia Olearia | Estado Mágina Olivo V2 (GitHub) | Acción recomendada |
|---|---|---|---|
| Marca y onboarding | Fuerte visual, mensaje claro e inscripción directa | Solo documentación arquitectónica en rama de PR #10, sin producto V2 entregado | Prototipar un acceso/orientación muy sencillo con olivar y lenguaje cotidiano; no copiar diseño |
| Cuaderno fitosanitario | Declara completo, exportación y normativa | Matriz legal V9/UE/RD adelantada, FEGA V–VII pendientes | Tratar cumplimiento verificable por campo como requisito de lanzamiento; mostrar prueba/evidencia de recepción cuando exista |
| Offline | Promesa destacada; no auditada | Modelo offline y tests propuestos | Ensayo real modo avión → cierre forzado → reintento → conflicto con 2 móviles |
| IA y dictado | Ya anuncian asistente y dictado por voz | Gemini y OCR planificados, no implementados en V2 | Diferenciar por confirmación de documentos/vales reales, trazabilidad y robustez, no por afirmar «tenemos IA» |
| Parcelas/Cartografía | SIGPAC + Catastro por mapa, NDVI | Modelo separado REAFA/SIGPAC con campañas; prueba UI pendiente | Alta de finca en 3 pasos, fuente/versionado oficial y auditoría de superficies |
| Economía y cooperativas | Entregas, liquidaciones, equipo y reparto; incluso CRM asesor | Funcionalidades en V1 y modelo V2, sin validar migración | Foco inicialmente en cooperativa/almacén, rendimientos, liquidación y reparto de costes muy claros por finca |
| Precio | Oferta gratuita hasta 10 ha en web/FAQ/capturas, con contradicciones a revisar | No hay política de precios V2 | Evitar competir solo por precio; probar disposición a pagar por ahorros/servicio |
| Canal comercial | Promoción y presencia web + Google Play | Marca V2 en documentación | Piloto local 5–10 olivareros representativos y 1 asesor/cooperativa, medir uso real y fricciones |
| Integración oficial | Anunciada; no hemos visto acuse independiente | IUWS real BLOQUEADO por anexos/autorización | Completar FEGA V/VI/VII, autorización y demo real con pruebas antes de proclamar cumplimiento |

## Estrategia sugerida
No construir un clon de toda Olearia. Competir inicialmente con el flujo **«del campo a la cooperativa y a la inspección sin volver a escribir los datos»**, con tres resultados verificables:
1. **Registro agrícola fiable**: fecha, recinto SIGPAC/campaña, producto/uso autorizado, dosis y cantidad, firma o documentación si corresponde, reglas transparentes y estado inequívoco de envío.
2. **Control económico comprensible**: una entrega/pesada se asigna a finca y campaña, cantidades y rendimientos cuadran, gastos/jornales trazables y reparto entre titulares/gestores; conectar documento OCR solo con revisión humana antes de guardar.
3. **Sencillez comprobada en campo**: menos pasos para registrar labores, acceso sin red, recuperación sin duplicados, textos grandes y soportes físicos; medir con agricultores, no asumir rapidez.

**Diferenciación real se demuestra con pilotaje**: tiempo medio por apunte, tareas completadas sin ayuda, tasa de errores legales, precisión de OCR validada por humano, estabilidad sin cobertura, tiempo de resolución de incidencias, retención 30 días, coste por explotación/ha. Definir metas tras línea base; no inventar ventaja cuantitativa.

## Restricciones jurídicas y comerciales
- No repetir afirmaciones del proveedor sobre SIEX como hechos auditados.
- No declarar que «2028 es fecha universal fija del CUE» sin normativa confirmada; mantener matriz por sector, explotación y fecha.
- No copiar capturas, textos comerciales, código ni estética de Olearia.
- No publicar datos de agricultores, nombres/credenciales de pruebas ni material restringido.
- Los avisos de fitosanitarios no deben prescribir tratamiento, producto o dosis sin validar fuentes y habilitación pertinentes.

## Próximos trabajos verificables
- **QA competidor**: probar demo sin información personal; con ficha reproducible de registro, parcelas, exportación, costes y offline; no confiar solo en marketing.
- **Producto V2**: primer recorrido de una explotación ficticia, 2 recintos de olivar, tratamiento, gasto y pesada conectados a su ficha y revisión; prueba en móvil y web.
- **Normativa**: mapa RD/UE/Junta ↔ FEGA V/VII ↔ DTO IUWS VI ↔ pruebas.
- **Negocio**: 5–10 entrevistas a agricultores sobre tiempo de apuntes, cuaderno usado, cooperativa, documentación y valor del producto. Priorizar con datos, no solo impresiones.


## Hallazgo adicional: arquitectura declarada públicamente (09/11/2026)

**Fuentes del propio proveedor (evidencia documental, no auditoría de código ni de producción):**
- Política de privacidad https://olearia.io/privacy (apartados 2, 3.3, 6.1, 9). Declara **Supabase Auth, PostgreSQL**, plataforma de facturación Stripe/Redsys, servidor Hetzner para base de datos, datos GeoJSON de parcelas, datos SIEX y OCR local de tickets. Enumera procesadores de IA **Cerebras/Groq, Mistral, Google Gemini, OpenRouter y Ollama**. Algunos proveedores están fuera del EEE y el texto dice emplear medidas de transferencia internacional; su declaración de «datos en UE» requiere entenderse según tipo de dato/proveedor, no reproducirse como garantía auditada.
- Web corporativa https://aixa-ai.com/ (apartado «Stack Tecnológico Principal»): la propia empresa identifica **PWA offline-first**, RAG, agentes con varios modelos, datos Copernicus, pipelines ETL/ELT y plataformas cloud-native.
- Google Play https://play.google.com/store/apps/details?id=io.olearia.agritech : paquete Android `io.olearia.agritech`; anuncia dictado, IA y offline; **no prueba si APK es envoltorio PWA/TWA/Capacitor o desarrollo nativo**.

### Implicación nueva para Mágina Olivo

1. **No usar «Supabase» ni «tener IA» como diferenciación competitiva**: ya lo declara Olearia.
2. **OCR de tickets no es una ventaja inédita**: su propia política afirma que usa modelo local para extraer peso/variedad/fecha/nº albarán. El diferencial, si existe, debe demostrarse mediante exactitud por cooperativa, revisión humana, operaciones contables enlazadas, documentos y uso sin conexión.
3. **PWA no equivale a conocer el código fuente Android**: hace falta APK legítima para examinar manifiesto, dependencias y componentes (sin eludir controles), y pruebas funcionales en demo autorizada.
4. **La IA usada como herramienta de programación NO está demostrada**: que la empresa desarrolle soluciones IA y utilice modelos IA en el producto no implica que todo el software haya sido generado con asistentes de programación.
5. Antes de codificar un reemplazo, evaluar con pilotos el grado de integración de datos realmente útil al agricultor: SIGPAC + tratamiento CUE + recibo cooperativa + balance finca + permisos y auditoría.

**Próxima evidencia solicitada:** APK o conjunto de splits instalado, revisión estática de componentes y bibliotecas, prueba controlada de experiencia/offline en cuenta propia; separar lo CONFIRMADO, DECLARADO y NO VERIFICADO.
