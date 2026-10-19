# Spec · `faqs` — ¿Tienes alguna duda? (acordeón)

| Campo | Valor |
|---|---|
| Archivo | `HBpZap8ASqhsHPCTpe7OMN` |
| Nodo | O1 `8206:253` (y página 2688.5, 1440×628) · O2 `8206:790` (idéntico: textos, geometría y visibilidad comparados nodo a nodo) |
| En Entre oleadas / Final | No existe |
| Estado | Wireframe (Comic Sans MS, lorem). Sin móvil |
| Nivel Storybook | `Snippets/Faqs` |
| `figma.png` | export REST de `8206:253`, escala 1, 1440×628 (comprobado contra el nodo) |
| Hallazgo | El CTA «Ir a preguntas frecuentes» (`8206:288`) está **OCULTO** en O1 y O2: hoy no se ve |

## 1. Reparto vertical (y relativa al frame)

Frame: fondo `#f8f8f8`, AL vertical, gap 24, pad **80 / 188 / 24 / 188**, centrado.

| Nodo | Qué | y | Alto |
|---|---|---|---|
| `8206:254` | Cabecera (AL vertical, gap 8) | 80 | 56 |
| `8206:255` | Título «¿Tienes alguna duda?» | 80 | 28 |
| `8206:256` | Subtítulo (lorem) | 116 | 20 |
| `8206:257` | Lista (AL vertical, gap 24, ancho 1064) | 160 | 444 |
| `8206:258` | Ítem 1 **abierto** (pregunta 28 + 8 + respuesta 80) | 160 | 116 |
| `8206:263` | Separador 1 | 300 | 0,5 |
| `8206:264` | Ítem 2 cerrado | 324 | 28 |
| `8206:269` | Separador 2 | 376 | 0,5 |
| `8206:270` | Ítem 3 cerrado | 400 | 28 |
| `8206:275` | Separador 3 | 452 | 0,5 |
| `8206:276` | Ítem 4 cerrado | 476 | 28 |
| `8206:281` | Separador 4 | 528 | 0,5 |
| `8206:282` | Ítem 5 cerrado | 552 | 28 |
| `8206:287` | Separador 5 (también tras el último) | 604 | 0,5 |
| — | pad inferior | 604 → 628 | 24 |
| `8206:288` | Fila CTA «Ir a preguntas frecuentes» | (628 si visible) | 40 · **OCULTO** |

Cuadre: 80 + 56 + 24 + 444 + 24 = 628 ✓. Lista: 116 + 4×28 + 9 gaps×24 = 444 ✓.
Con el CTA visible (3.er hijo, tras la lista): 604 + 24 + 40 + 24 = **692**.

## 2. Medidas, tipografía y mapeo

| Elemento | Figma | Bootstrap 4.1.3 / SCSS (BEM) |
|---|---|---|
| Sección | fondo `#f8f8f8`, pad 80/24 | `section.faqs` · `padding: 80px 0 24px` |
| Contenedor | 1064 (1440 − 2×188) | `.faqs__inner` con `wrap` (`$container-max` del repo hoy 1320: P6) |
| Título | 700 · 28 / 28 · `#000` · centrado | `h2.faqs__title.text-center.mb-2` (gap 8) |
| Subtítulo | 400 · 16 / 20 · centrado · hug 413 | `p.faqs__subtitle.text-center.mb-0` |
| Cabecera → lista | 24 | `.faqs__list { margin-top: 24px }` |
| Ítem | ancho 1064 | `.faqs__item { padding-bottom: 24px; border-bottom: 1px solid rgba(0,0,0,.5); margin-bottom: 24px }` · el último, `margin-bottom: 0` |
| Separador | LINE, trazo **0,5 px** `#000` | 1 px `rgba(0,0,0,.5)`: en el export a 1x el trazo pinta 1 px `#7c7c7c` sobre `#f8f8f8`, el mismo píxel |
| Pregunta | fila AL horizontal, gap 10, centrada en vertical · texto 700 · 16 / **28** · izquierda, ancho 1038 (fill) | `button.faqs__question` (reset: sin fondo ni borde, `w-100`, `d-flex justify-content-between align-items-center text-left`) |
| Chevron | instancia 16×16 · glifo 8×4,94 `#000` · `expand_less` abierto / `expand_more` cerrado (Material Symbols) | `.faqs__icon` 16×16 · **un solo** SVG (`expand_more`) con `transform: rotate(180deg)` cuando `aria-expanded="true"`: son el mismo glifo girado |
| Pregunta → respuesta | 8 | `.faqs__answer { padding-top: 8px }` (dentro del `.collapse`, para que la animación no salte) |
| Respuesta | 400 · 16 / 20 · izquierda · ancho 1064 | `.faqs__answer` → `.collapse` (`.show` en el abierto) |
| CTA (oculto) | píldora 236×40 (hug), r 24, fondo `#000`, pad 0 8 + contenedor de label 0 8 · texto 700 · 16 / 24 blanco · iconos `shopping_bag`, `arrow_forward_ios` y `launch` **los tres ocultos** | `a.btn.faqs__cta` centrado (`.faqs__ctas.d-flex.justify-content-center`, gap 8). Mismo botón primario que `campaign-notice`: r 24 y r 800 dan la misma píldora a 40 de alto |

Tipografía: Comic Sans MS es de wireframe. Para la equivalencia provisional, ver `reports/brand-tokens/spec.md`
(título → Header One 30/32, pregunta → Flame 16/24 o 20/24, respuesta → Flame Sans 16–20/28).

## 3. Hooks

No aplica (HTML estático).

## 4. Contenido → `datos-faqs.js`

```json
{
  "oleada1": {
    "title": "¿Tienes alguna duda?",
    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "_subtitleIsPlaceholder": true,
    "openIndex": 0,
    "items": [
      { "question": "Lorem ipsum dolor sit amet?", "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed sapien orci. Praesent ac est ut magna lobortis posuere sodales vitae risus. Maecenas luctus dui magna, quis hendrerit tortor vulputate eu. Nunc eu ornare dui, non cursus mi. Aenean condimentum lorem id nibh lacinia congue. Donec ac pharetra risus. Sed risus odio, posuere vitae gravida a, feugiat eu eros. Donec lectus libero, imperdiet vitae porta sed, rutrum quis velit. Nulla aliquam aliquam dui non accumsan. Donec tincidunt cursus massa quis feugiat." },
      { "question": "Lorem ipsum dolor sit amet?", "answer": "(mismo lorem)" },
      { "question": "Lorem ipsum dolor sit amet?", "answer": "(mismo lorem)" },
      { "question": "Lorem ipsum dolor sit amet?", "answer": "(mismo lorem)" },
      { "question": "Lorem ipsum dolor sit amet?", "answer": "(mismo lorem)" }
    ],
    "_itemsArePlaceholder": true,
    "cta": { "label": "Ir a preguntas frecuentes", "href": null, "variant": "primary", "icon": null, "external": false, "visible": false }
  },
  "oleada2": "= oleada1 (idéntico en el wireframe)"
}
```

- Las 5 preguntas y las 5 respuestas son **lorem** (las 5 respuestas son el mismo párrafo, también en los ítems 2–5,
  que están ocultos). El subtítulo lleva un espacio final en Figma; aquí va recortado.
- El título es el único texto real.
- **Pieza flexible**: nº de ítems libre (N ≥ 1), CTA opcional y `openIndex` (o ninguno abierto).

## 5. Assets

| Asset | Nodo | Formato | Ruta |
|---|---|---|---|
| Chevron cerrado | `8206:267` (comp. `8156:19709` `expand_more`) | SVG 16×16, `fill="black"` | `reports/faqs/assets/icon-expand-more.svg` |
| Chevron abierto | `8206:261` (comp. `8156:19715` `expand_less`) | SVG 16×16 | `reports/faqs/assets/icon-expand-less.svg` (solo de referencia; usar el otro girado) |

En el `.html`, inline y con `fill="currentColor"`.

## 6. Interacción / JS

| Tema | Diseño | Propuesta |
|---|---|---|
| Estado inicial | ítem 1 abierto (`expand_less`, respuesta visible); 2–5 cerrados (respuesta `visible:false`) | primer ítem `.show` + `aria-expanded="true"` |
| ¿Uno abierto a la vez? | **El diseño no lo dice** (un solo frame estático, sin prototipo: 0 `interactions` en el nodo) | **decisión nuestra**: sí. Collapse de Bootstrap 4.1.3 con `data-parent="#faqs-<id>"` |
| JS | — | Collapse de BS 4 = jQuery + `bootstrap.js` (`globals.js`: «los pone la página»). Si la página del CMS no los carga, plan B: `<details>/<summary>` nativo, sin JS (P3) |
| Hover/foco | no diseñados | foco visible por defecto. Hover: nada (P5) |

## 7. Responsive 390 px · **decisión nuestra**

| Propiedad | 390 | 1440 |
|---|---|---|
| Pad sección | 48 / 24 | 80 / 24 |
| Contenedor | 100 % − gutter del `wrap` | 1064 |
| Título | 24 / 28 | 28 / 28 |
| Pregunta | 16 / 24, varias líneas; chevron arriba (`align-items-start`, `margin-top: 4px`) | 16 / 28 |
| Respuesta | 16 / 20 | igual |
| Gaps | 24 | igual |

## 8. Accesibilidad

- `h2` para el título. Cada pregunta, en un `<button type="button" aria-expanded aria-controls="faq-<n>">`
  (dentro de `h3` si hace falta jerarquía). Respuesta: `id="faq-<n>"`, `role="region"` y `aria-labelledby`.
- Chevron con `aria-hidden="true" focusable="false"`.
- Contraste: negro sobre `#f8f8f8` ≈ 19,8:1. Separador decorativo.

## 9. Preguntas a diseño

1. ¿Textos reales de las preguntas y respuestas? ¿Cuántas por oleada? ¿Cambian entre oleadas?
2. **CTA «Ir a preguntas frecuentes» oculto** (`8206:288`): ¿entra? ¿URL? ¿Abre en pestaña nueva?
3. ¿Uno abierto a la vez o varios? ¿Primero abierto por defecto? ¿La página del CMS de burgerking.es ya carga jQuery + Bootstrap JS?
4. El separador va también **después del último** ítem. ¿Intencionado?
5. Estados hover/foco de la pregunta y animación de apertura: sin diseñar.
6. Contenido de 1064 (pad 188 a 1440), común a toda la landing; la rejilla del frame (`8006:19597`, 12 col × 74 + gutter 24 = 1152) no coincide. ¿Cuál vale?
