# Spec · `campaign-video` — Vídeo de campaña

| Campo | Valor |
|---|---|
| Archivo | `HBpZap8ASqhsHPCTpe7OMN` (Rosking 2026 Campaña Navidad) |
| Nodo | O1 `8206:250` «Video» · O2 `8206:787` (idéntico: textos, geometría y visibilidad comparados nodo a nodo) |
| En Entre oleadas / Final | **No existe** (barridos `8206:850` y `8206:539` enteros: 0 nodos «Video») |
| Estado del diseño | Wireframe (Comic Sans MS, placeholder de imagen). Sin móvil |
| **Visibilidad** | **OCULTO** (`visible: false`) en O1 y O2 |
| Nivel Storybook | `Snippets/Campaign Video` |
| `figma.png` | **Compuesto**: la REST devuelve `null` y el MCP 1×1 px para un nodo oculto. Montado con el export REST de sus hijos visibles `8206:251` (rect) y `8206:252` (rótulo) sobre fondo `#f8f8f8` en sus offsets reales → 1440×485 |

## 0. El «solape» con FAQ: no es solape

- El padre `8206:97` es auto-layout VERTICAL. Un hijo oculto **no ocupa sitio** en el flujo; Figma conserva su
  última caja calculada. La `y=2636.5` es **rancia**: el render real va `8206:208` (termina en 2688.5) →
  FAQ `8206:253` (empieza en 2688.5), sin hueco ni solape.
- Orden en el árbol: hijo 7 de 10, **entre `8206:208` y la FAQ `8206:253`**. Si se hiciera visible, entraría
  ahí y empujaría todo 485 px (página 4138.5 → 4623.5).
- Inferencia, no comprobada: los 52 px de diferencia (2688.5 − 2636.5) dicen que `8206:208` creció 52 px
  después de ocultar el vídeo.
- **Caja útil**: frame 1440×485; vídeo 720×405 centrado.

## 1. Reparto vertical (y relativa al frame)

| Nodo | Qué | y | Alto | Visible |
|---|---|---|---|---|
| `8206:250` | Frame «Video», fondo `#f8f8f8`, AL vertical, pad 40/0/40/0, gap 10, centrado horizontal | 0 | 485 | **no** |
| `8206:251` | Rectángulo del vídeo 720×405 (16:9), x=360 | 40 | 405 | sí |
| `8206:252` | Rótulo «Vídeo campaña», **ABSOLUTE**, constraint H=CENTER, x=635 (w 170) | 65 | 28 | sí |

40 + 405 + 40 = 485 ✓ (el rótulo, al ser absoluto, no suma).

## 2. Medidas, tipografía y mapeo

| Elemento | Figma | Bootstrap 4.1.3 / SCSS propio |
|---|---|---|
| Sección | 1440 × 485, fondo `#f8f8f8`, pad 40 arriba/abajo | `section.campaign-video` · `padding: 40px 0` · fondo `#f8f8f8` (no es `$gray-100` `#f8f9fa`) |
| Contenedor | vídeo centrado, sin padding lateral | `.campaign-video__inner` con mixin `wrap` |
| Marco | 720×405, `border-radius: 32px`, borde 1px **inside** `rgba(0,0,0,.1)`, relleno `#eff1f3` | `.campaign-video__frame.embed-responsive.embed-responsive-16by9` (existe en 4.1.3) · `max-width: 720px; margin: 0 auto; border-radius: 32px; overflow: hidden` · borde con `box-shadow: inset 0 0 0 1px rgba(0,0,0,.1)` (inside, no suma tamaño) |
| Placeholder | imagen FIT `imageRef 123b652f…` (icono genérico de «imagen», gris `#687787`) | **no se maqueta**: es relleno de wireframe |
| Rótulo | Comic Sans MS 700 · 24 / 28 · `#000` (style `Functional/Utility/Black`) · centrado, 25 px bajo el borde superior del marco | ver Pregunta 2: probablemente anotación de wireframe, no contenido |
| iframe | — | `.embed-responsive-item` |

Tipografía: Comic Sans MS es la fuente de wireframe. Si el rótulo resulta ser un titular, usa la escala
provisional de `reports/brand-tokens/spec.md`.

## 3. Hooks

No aplica (HTML estático, `config.repo.handoff = html`).

## 4. Contenido → `datos-campaign-video.js`

```json
{
  "oleada1": {
    "visible": false,
    "heading": null,
    "_wireframeLabel": "Vídeo campaña",
    "video": {
      "provider": "youtube",
      "id": null,
      "title": null,
      "poster": null
    }
  },
  "oleada2": "= oleada1 (idéntico en el wireframe)"
}
```

`_wireframeLabel` es literal del wireframe. Todavía no es contenido: ver P2. `id`, `title` y `poster` no están en el diseño.

## 5. Assets

| Asset | Nodo | Formato | Nota |
|---|---|---|---|
| Placeholder de imagen | `8206:251` (fill IMAGE `123b652f…`) | — | relleno de wireframe, **no exportar** |
| Póster / miniatura | — | JPG/WebP 1440×810 (2x de 720×405) | **no existe**: P1 |

## 6. Interacción / JS

| Tema | Diseño | Propuesta |
|---|---|---|
| Proveedor | no lo dice | YouTube: la referencia Grand King (`8004:59852`, «YouTube Player» 1136×639, miniatura + botón play de YouTube) usa embed de YouTube |
| Embed | — | `<iframe src="https://www.youtube-nocookie.com/embed/<id>" loading="lazy" allowfullscreen>` **sin JS** (decisión nuestra). La «fachada» (póster + clic que carga el iframe) necesita JS propio y no la pide el diseño |
| Autoplay | — | no |

## 7. Responsive 390 px · **decisión nuestra** (no hay diseño móvil)

| Propiedad | 390 | 1440 |
|---|---|---|
| Pad sección | 24 / 0 | 40 / 0 |
| Ancho marco | 100 % del `wrap` (≈ 358) | 720 |
| Radio | 16 | 32 |
| Proporción | 16:9 | 16:9 |

## 8. Accesibilidad

- `iframe` con `title` descriptivo (obligatorio). El texto falta: P1.
- Si hay titular visible: `h2`. Si no, `section` con `aria-label`.
- Sin autoplay. El borde `rgba(0,0,0,.1)` es decorativo.

## 9. Preguntas a diseño

1. **¿El vídeo entra en alguna oleada?** Está oculto en O1 y O2 y no existe en Entre/Final. ¿ID de YouTube, título y póster propio?
2. ¿«Vídeo campaña» (24 bold, superpuesto **dentro** del marco) es un titular de la sección o una anotación del wireframe? Si es un titular, ¿va encima del vídeo y no sobre él?
3. ¿Radio 32 y borde 10 % se mantienen en el diseño final? (La referencia Grand King no tiene radio.)
4. Si se activa, ¿posición confirmada entre `8206:208` y la FAQ, con fondo `#f8f8f8` continuo con la FAQ?
