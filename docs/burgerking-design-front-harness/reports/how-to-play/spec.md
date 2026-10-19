# how-to-play · spec (Ojo, paso 2)

| Campo | Valor |
|---|---|
| Fuente | `HBpZap8ASqhsHPCTpe7OMN` · O1 `8206:159` · O2 `8206:696` (nombre de capa «Hero»: casar por id) |
| Estado del diseño | Wireframe (grises, Comic Sans MS, lorem). Sin móvil |
| Nivel | `Snippets/` |
| Referencia | `figma.png` = export REST de `8206:159`, escala 1 → 1440×500 (= nodo) |
| Slug | `how-to-play` correcto: frame propio, fondo propio (#fff), se pega solo. Id de ancla: `how-to-play` (destino del CTA oculto «¿Cómo jugar?» del hero `8206:130`) |
| O1 vs O2 | **Idénticos**: 40 nodos, 0 diferencias; `pixel-diff` = 0 px de 720 000 |

## 1. Reparto vertical (y relativa al top de `8206:159`)

Auto-layout vertical, gap 24, padding declarado 40/188/40/188, centrado. Fondo #fff. **Alto FIJO 500.**

| Nodo | Qué | x | y | w×h |
|---|---|---|---|---|
| `8206:160` | Cabecera (vertical, gap 8) | 188 | **27.5** | 1064×56 |
| `8206:161` | «¿Cómo jugar?» | 188 | 27.5 | 1064×28 |
| `8206:162` | Subtítulo (hug) | 513.5 | 63.5 | 413×20 |
| `8206:163` | Fila de pasos (horizontal, gap 24) | 188 | 107.5 | 1064×255 |
| `8206:176` | Pie (vertical, gap 16, centrado) | 188 | 386.5 | 1064×86 |
| `8206:177` | Texto del pie | 188 | 386.5 | 1064×20 |
| `8206:178` | Badges (horizontal, gap 8, hug) | 536 | 422.5 | 368×50 |
| — | fin del contenido | — | 472.5 | — |

**Altura que no cuenta el padding**: contenido = 56+24+255+24+86 = 445 > 420 (500 − 2×40). Con el alto fijo y centrado, el contenido desborda el padding y queda a **27.5 arriba y abajo**, no a 40. Para el pixel-check contra `figma.png`: bloque 500, contenido en y 27.5. Pregunta 2.

## 2. Medidas

### Tipografía (Comic Sans MS = wireframe)

| Nodo | Texto | size / line-height | weight | align |
|---|---|---|---|---|
| `8206:161` | título | 28 / 28 (100 %) | 700 | center |
| `8206:162` | subtítulo | 16 / 20 (125 %) | 400 | center |
| `8206:166/170/174` | título de paso | 14 / 19.5 (≈1.393), caja h20 | 700 | center |
| `8206:167/171/175` | texto de paso (3 líneas, h60) | 16 / 20 (125 %) | 400 | center |
| `8206:177` | texto del pie | 16 / 20 | 400 | center |
| `8206:183` / `8206:190` | «Consíguelo en el» / «Disponible en» | 10 / 10 | 400 | left |
| `8206:184` / `8206:191` | «App Store» / «Google Play» | 16 / 24 | 700 | left |

Todo el texto #000 salvo badges (#fff).

### Tarjeta de paso (`8206:164`, `8206:168`, `8206:172`)

| Medida | Valor |
|---|---|
| Ancho | fill → (1064 − 2×24) / 3 = **338.67** |
| Alto | 255 (16 + 127 + 8 + 20 + 8 + 60 + 16) |
| Padding / gap | 16 / 8, contenido centrado |
| Borde / radio / fondo | 1 px inside `#687787` / r4 / #fff |
| Imagen `8206:165/169/173` | **211×127** r4, centrada (no ocupa el ancho: interior 306.67) |
| Texto | ancho 306.67 |

### Badges de tienda (`8206:179` App Store, `8206:186` Google Play)

| Medida | App Store | Google Play |
|---|---|---|
| Tamaño (hug) | 176×50 | 184×50 |
| Fondo / radio | #000 / r8 | #000 / r8 |
| Padding / gap | 8 24 / 8 | 8 24 / 8 |
| Icono | `Apple` 24×24 (`8206:181`) | `android` 24×24 (`8206:188`) |
| Bloque de label | vertical, padding 0 8, 2 líneas (10/10 + 16/24 = 34) | ídem |
| Iconos ocultos | `shopping_bag`, `arrow_forward_ios` (no se pintan) | ídem |

### Mapeo Bootstrap 4.1.3 + SCSS propio

| Parte | Bootstrap | SCSS propio (BEM) |
|---|---|---|
| Sección | `<section id="how-to-play">` `text-center` | `.how-to-play` padding 27.5 0 (o 40, pregunta 2); fondo #fff |
| Contenedor 1064 | — | mixin `wrap` (ver pregunta 9 de `campaign-hero`: `$container-max`) |
| Cabecera | `mb-0` en h2/p | `.how-to-play__header` gap 8 |
| Pasos | `list-unstyled d-flex` | `.how-to-play__steps` gap 24 (Bootstrap 4.1.3 no tiene `gap`; la rejilla da 30 de gutter → 334.67, **no** 338.67) · `.how-to-play__step` flex 1 1 0, borde, r4, padding 16 · `__step-image` 211×127 `object-fit:cover` r4 |
| Pie | `d-flex flex-column align-items-center` | `.how-to-play__footer` gap 16 |
| Badges | `d-flex justify-content-center` | `.how-to-play__stores` gap 8 · `.store-badge` (o `how-to-play__store`) d-inline-flex, align-items-center, gap 8, padding 8 24, r8 |

Separaciones verticales: cabecera→pasos 24, pasos→pie 24, texto pie→badges 16.

## 3. Hooks
No aplica (HTML estático).

## 4. Contenido · `datos-how-to-play.js`

```json
{
  "oleada1": {
    "id": "how-to-play",
    "title": "¿Cómo jugar?",
    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    "steps": [
      { "image": "placeholder.png", "alt": "", "title": "1- Compra tu menú", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam urna purus, cursus eu felis non, rhoncus dictum lacus." },
      { "image": "placeholder.png", "alt": "", "title": "2- Escanea tu QR", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam urna purus, cursus eu felis non, rhoncus dictum lacus." },
      { "image": "placeholder.png", "alt": "", "title": "3- ¡Gira la ruleta!", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam urna purus, cursus eu felis non, rhoncus dictum lacus." }
    ],
    "footnote": "Lorem ipsum amet id sapien erat lectus tristique nec tellus vitae sit in ultrices.",
    "stores": [
      { "platform": "ios", "icon": "icon-apple.svg", "kicker": "Consíguelo en el", "label": "App Store", "href": null },
      { "platform": "android", "icon": "icon-android.svg", "kicker": "Disponible en", "label": "Google Play", "href": null }
    ],
    "filler": ["subtitle", "steps[].text", "steps[].image", "footnote"]
  }
}
```

Literal: el subtítulo termina en espacio («elit. ») en Figma; recortarlo al maquetar no cambia el render.

**oleada2**: idéntica (`export const oleada2 = { ...oleada1 }`); pendiente de copies nuevos (nota `8206:846`).

No están en el nodo: `href` de las tiendas, `alt` de las imágenes de paso.

## 5. Assets

| Asset | Nodo | Formato | Notas |
|---|---|---|---|
| Imagen de paso | `8206:165` (fill IMAGE `123b652f`, FILL) | PNG 800×800 → `../campaign-hero/assets/placeholder.png` | Placeholder de wireframe; `object-fit: cover` en 211×127 |
| Icono Apple | `8206:181` (comp `8123:869`) | SVG 24×24 → `assets/icon-apple.svg` | fill white, trae `clipPath` con id fijo `clip0_8206_181`: renombrarlo o quitarlo si se inlinea dos veces |
| Icono Android | `8206:188` (comp `8123:881`) | SVG 24×24 → `assets/icon-android.svg` | fill white |

Los badges son **dibujados**, no los oficiales de Apple/Google (pregunta 3).

## 6. Interacción y JS
Sin JS. Badges = enlaces. Sin estados hover en el diseño (pregunta 5).

## 7. Responsive · 390 px — **decisión nuestra, no hay móvil**

| Parte | < md (390, contenido 360) | ≥ md |
|---|---|---|
| Padding sección | 40 0 | 27.5 0 (o 40) |
| Pasos | apilados, ancho 100 %, gap 16 (`flex-direction: column` < md) | 3 columnas fill, gap 24 |
| Imagen de paso | 211×127 centrada | igual |
| Badges | 176 + 8 + 184 = 368 > 360 → `flex-wrap`, centrados, gap 8 | una fila |

## 8. Accesibilidad

| Elemento | Marcado |
|---|---|
| Sección | `<section id="how-to-play" aria-labelledby="how-to-play-title">` |
| Título | `<h2 id="how-to-play-title">` |
| Pasos | `<ol class="list-unstyled">` (el número ya va en el texto «1- …»); título de paso `<h3>` |
| Imágenes de paso | `alt` real o `alt=""` si son ilustración decorativa (pregunta 4) |
| Badges | `<a>` con nombre accesible completo («Consíguelo en el App Store»); iconos `aria-hidden="true"`; si abren tienda: `target="_blank" rel="noopener"` + aviso oculto |
| Jerarquía | título de paso 14 bold < texto 16 regular: visualmente invertido (pregunta 7) |

## 9. Preguntas a diseño

1. Oleada 2 idéntica al píxel: ¿copies nuevos de los pasos para O2?
2. El alto fijo de 500 deja el contenido a 27.5 de los bordes, no a los 40 de padding. ¿Padding real 40 (bloque 525) o se mantiene 500?
3. ¿Badges oficiales de App Store y Google Play (las guías de marca de Apple/Google los exigen) o los dibujados del wireframe?
4. ¿Imágenes/ilustraciones reales de los 3 pasos y su texto alternativo?
5. ¿URLs de tienda (o un enlace inteligente único)? ¿Estado hover/focus de badges y tarjetas?
6. ¿Nº de pasos fijo en 3 o puede variar por oleada? (la pieza acepta n; a partir de 4, ¿4 columnas o wrap?)
7. Título de paso a 14 bold y texto a 16 regular: ¿se mantiene esa jerarquía en el diseño final?
8. Tipografía y colores de wireframe (borde `#687787`): ¿paleta y fuente finales?
