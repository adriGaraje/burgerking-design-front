# Spec · `legal-links` — Franja de enlaces legales

| Campo | Valor |
|---|---|
| Archivo | `HBpZap8ASqhsHPCTpe7OMN` |
| Nodos | O1 `8206:295` · O2 `8206:832` (= O1) · Entre oleadas `8206:882` · Final `8206:571` (= Entre) |
| Estado | Wireframe. Sin móvil |
| Nivel Storybook | `Snippets/Legal Links` |
| `figma.png` | Entre oleadas `8206:882` (1440×100, 4 enlaces) · `figma-oleada.png` = O1 `8206:295` (1440×100) |
| **Corrección al brief** | O1 **no tiene 3 enlaces visibles: tiene 2**. El 3.º, «Preguntas frecuentes» (`8206:299`), está **OCULTO**. Además, la fila de O1 va **alineada a la izquierda** y la de Entre/Final, **centrada** |

## 1. Reparto y variantes

Frame (los 4 iguales): 1440×100, fondo `#f8f8f8`, AL vertical, pad **40 / 188 / 40 / 188**, gap 24. Fila
`ctas` 1064×20 (fill), AL horizontal, **gap 24**, centrada en vertical.

| Variante | Fila | `primaryAxisAlign` | Enlaces visibles (x en página, ancho) | Ocultos |
|---|---|---|---|---|
| O1 / O2 | `8206:296` / `8206:833` | **MIN (izquierda)** | «Condiciones legales» x188 w142 · «Pólitica de privacidad» x354 w159 | «Preguntas frecuentes» `8206:299` |
| Entre / Final | `8206:883` / `8206:572` | **CENTER** | «Condiciones legales» x384.5 w142 · «Pólitica de privacidad» x550.5 w159 · «Pólitica de cookies» x733.5 w137 · «Preguntas frecuentes» x894.5 w161 | — |

Cuadre Entre: 142 + 159 + 137 + 161 + 3×24 = 671 → (1064 − 671) / 2 = 196.5 → x = 188 + 196.5 = 384.5 ✓.
y del texto dentro del frame: 40 (alto 20) en las cuatro variantes.

**Inferencia (no confirmada):** «Preguntas frecuentes» se oculta en O1/O2 porque en esas páginas ya está la
FAQ. En Entre/Final no hay FAQ y el enlace aparece.

## 2. Medidas, tipografía y mapeo

| Elemento | Figma | Bootstrap 4.1.3 / SCSS (BEM) |
|---|---|---|
| Sección | fondo `#f8f8f8`, pad 40/0 | `nav.legal-links` (`aria-label`) · `padding: 40px 0` |
| Contenedor | 1064 | `.legal-links__inner` con `wrap` |
| Lista | fila, gap 24 | `ul.legal-links__list.list-unstyled.d-flex.flex-wrap.mb-0` + `justify-content-center` · el gap, con `margin` en los ítems (BS 4.1.3 no trae `gap` utilitario) |
| Variante izquierda (O1) | MIN | modificador `.legal-links--start` → `justify-content-start` (si se confirma, P2) |
| Enlace | Comic Sans MS 400 · 16 / 20 · `#000` (style `Functional/Utility/Black`) · **subrayado** · `text-align: center` | `a.legal-links__link` · `color: inherit; text-decoration: underline` |

Tipografía de wireframe. Provisional de marca: `Semantic/Link` Flame 16/24 (`reports/brand-tokens/spec.md`).

## 3. Hooks

No aplica (HTML estático).

## 4. Contenido → `datos-legal-links.js`

Literal, incluida la errata «**Pólitica**» (debería ser «Política»): ver P1. Los `href` no están en el diseño.

```json
{
  "oleada1": {
    "align": "start",
    "links": [
      { "label": "Condiciones legales", "href": null },
      { "label": "Pólitica de privacidad", "href": null },
      { "label": "Preguntas frecuentes", "href": null, "visible": false }
    ]
  },
  "oleada2": "= oleada1",
  "entreOleadas": {
    "align": "center",
    "links": [
      { "label": "Condiciones legales", "href": null },
      { "label": "Pólitica de privacidad", "href": null },
      { "label": "Pólitica de cookies", "href": null },
      { "label": "Preguntas frecuentes", "href": null }
    ]
  },
  "final": "= entreOleadas"
}
```

Las stories salen por nº de enlaces visibles (2 y 4). La pieza acepta N enlaces.

## 5. Assets

Ninguno.

## 6. Interacción / JS

Sin JS. Hover/foco sin diseñar: subrayado siempre y foco por defecto del navegador. ¿Pestaña nueva para los legales? P3.

## 7. Responsive 390 px · **decisión nuestra**

| Propiedad | 390 | 1440 |
|---|---|---|
| Pad | 32 / 0 | 40 / 0 |
| Lista | `flex-wrap`, centrada, separación 8 vertical × 24 horizontal | una fila |
| Texto | 16 / 20 | igual |

A 358 px de ancho útil, los 4 enlaces (671 px) ocupan 2–3 líneas. Los 2 de O1 (325 px) caben en una.

## 8. Accesibilidad

- `nav` con `aria-label="Enlaces legales"` + `ul/li`. El subrayado distingue los enlaces sin depender del color.
- Contraste: negro sobre `#f8f8f8` ≈ 19,8:1.
- Si un enlace abre en otra pestaña: `target="_blank" rel="noopener"` + aviso («se abre en una pestaña nueva») en texto oculto.

## 9. Preguntas a diseño

1. **Errata «Pólitica»** (×2: privacidad y cookies) en los 4 frames. ¿Corregimos a «Política»?
2. **Alineación**: O1/O2 a la izquierda, Entre/Final centrada. ¿Es intencionado o un descuido del wireframe?
3. URLs de los 4 enlaces (¿las de burgerking.es o bases propias de la campaña?) y si abren en pestaña nueva.
4. ¿«Preguntas frecuentes» oculto en O1/O2 porque la FAQ está en la página? ¿A dónde enlaza en Entre/Final, si allí no hay FAQ?
5. ¿Las bases legales del concurso tienen enlace propio? (Mystery King llevaba un bloque de letra pequeña con condiciones al pie de la landing.)
