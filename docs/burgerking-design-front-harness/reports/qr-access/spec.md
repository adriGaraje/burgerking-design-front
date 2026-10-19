# qr-access · spec (Ojo, paso 2)

| Campo | Valor |
|---|---|
| Fuente | `HBpZap8ASqhsHPCTpe7OMN` · O1 `8206:193` · O2 `8206:730` (nombre de capa «Hero»: casar por id) |
| Estado del diseño | Wireframe (grises, Comic Sans MS). Sin móvil |
| Nivel | `Snippets/` |
| Referencia | `figma.png` = export REST de `8206:193`, escala 1 → 1440×307 (= nodo) |
| Slug | `qr-access` correcto: frame propio, fondo propio (#f8f8f8), se pega solo |
| O1 vs O2 | **Idénticos**: 18 nodos, 0 diferencias; `pixel-diff` = 0 px de 442 080 |

## 1. Reparto (coordenadas relativas a `8206:193`)

Auto-layout **horizontal con wrap** (`layoutWrap: WRAP`, gap 24, gap de fila 24), padding 40/188/40/188, centrado en los dos ejes. Alto hug = 307. Fondo `#f8f8f8`.

| Nodo | Qué | x | y | w×h |
|---|---|---|---|---|
| `8206:194` | Columna de texto (vertical, gap 16, **ancho fijo 343**) | 348 | 49.5 | 343×208 |
| `8206:195` | Título (2 líneas por ancho) | 348 | 49.5 | 343×56 |
| `8206:196` | Texto (4 líneas, salto forzado ` `) | 348 | 121.5 | 343×80 |
| `8206:197` | CTAs (horizontal, gap 16) | 348 | 217.5 | 343×40 |
| `8206:207` | Imagen | 715 | 40 | 377×227 |

Grupo = 343 + 24 + 377 = **744**, centrado en 1064 → empieza en x 348 (160 dentro del contenedor). Columna de texto centrada en vertical respecto a la imagen (49.5 = (307 − 208)/2).

## 2. Medidas

### Tipografía (Comic Sans MS = wireframe)

| Nodo | Texto | size / line-height | weight | align |
|---|---|---|---|---|
| `8206:195` | título | 28 / 28 (100 %) | 700 | **left** |
| `8206:196` | texto | 16 / 20 (125 %) | 400 | left |
| `8206:201` / `8206:206` | labels de botón | 16 / 24 | 700 | — |

### Botones

| Nodo | Botón | Medidas |
|---|---|---|
| `8206:198` | «Escanear QR» primario | hug **133×40**, píldora (r 800), fondo #000, texto #fff; padding 0 8 + contenedor de label 0 8 → 16 a cada lado |
| `8206:203` | «Acceso al juego» secundario | hug **154×40**, píldora, fondo #fff, borde 1 inside #000, texto #000 |
| — | Separación | gap 16 |
| — | Iconos ocultos | `shopping_bag`, `arrow_forward_ios` en los dos (no se pintan) |

### Imagen
`8206:207`: 377×227, r4, fill IMAGE `123b652f` (FILL → `object-fit: cover`).

### Mapeo Bootstrap 4.1.3 + SCSS propio

| Parte | Bootstrap | SCSS propio (BEM) |
|---|---|---|
| Sección | `<section>` | `.qr-access` padding 40 0; fondo `#f8f8f8` |
| Contenedor | — | mixin `wrap` (1064) |
| Fila | `d-flex flex-wrap justify-content-center align-items-center` | `.qr-access__inner` gap 24 (las columnas 343/377 no salen de la rejilla de 12: 4 columnas en 1064 = 334.67) |
| Texto | `text-left` | `.qr-access__text` flex 0 0 343 (max-width 100 %); gap 16 |
| CTAs | `btn` + `d-flex flex-wrap` | `.qr-access__ctas` gap 16 · botón píldora height 40, padding 0 16, `border-radius: 50rem` (4.1.3 no trae `rounded-pill`) |
| Imagen | `img-fluid` | `.qr-access__image` 377×227, r4, `object-fit: cover` |

Los botones píldora (primario negro / secundario blanco con borde) son los mismos que en `campaign-hero` (`8206:124`/`8206:130`, allí a ancho fijo 235) y `menu-grid` (`8206:236`). Candidato a pieza `Basics/` común (pregunta 6).

## 3. Hooks
No aplica (HTML estático).

## 4. Contenido · `datos-qr-access.js`

```json
{
  "oleada1": {
    "title": "¿Ya tienes tu QR? Escanea y participa",
    "text": [
      "Si ya tienes la app descargada y sesión iniciada, escanea el QR y juega sin tener que introducir los 15 digitos.",
      "Tienes hasta X día para participar."
    ],
    "ctas": [
      { "label": "Escanear QR", "href": null, "variant": "primary" },
      { "label": "Acceso al juego", "href": null, "variant": "secondary" }
    ],
    "image": { "src": "placeholder.png", "alt": "" },
    "filler": ["text[1] («X día»)", "image"]
  }
}
```

Literal de Figma: «digitos» va sin tilde y «Tienes hasta X día» lleva una X de relleno (pregunta 2). Las dos líneas de `text` están separadas por un salto forzado (`<br>`), no son dos párrafos.

**oleada2**: idéntica (`export const oleada2 = { ...oleada1 }`); pendiente de copies nuevos (nota `8206:846`).

## 5. Assets

| Asset | Nodo | Formato | Notas |
|---|---|---|---|
| Imagen | `8206:207` | PNG 800×800 → `../campaign-hero/assets/placeholder.png` | Placeholder de wireframe; recorte cover a 377×227. ¿Será una captura del juego/QR? (pregunta 3) |

## 6. Interacción y JS
Sin JS. Dos enlaces con aspecto de botón. Sin hover en el diseño.

## 7. Responsive · 390 px — **decisión nuestra, no hay móvil**

El propio frame lleva wrap: cuando 744 no cabe (viewport < 774) la imagen baja bajo el texto con 24 de separación.

| Parte | < md (390, contenido 360) | ≥ md |
|---|---|---|
| Padding sección | 40 0 | 40 0 |
| Orden | texto arriba, imagen abajo (orden del DOM) | texto izq., imagen der. |
| Texto | ancho 100 % | 343 |
| Imagen | ancho 100 %, `aspect-ratio: 377 / 227` | 377×227 |
| Botones | fila, 133 + 16 + 154 = 303 → caben | igual |

## 8. Accesibilidad

| Elemento | Marcado |
|---|---|
| Sección | `<section aria-labelledby="qr-access-title">` |
| Título | `<h2 id="qr-access-title">` |
| Texto | `<p>` con `<br>` |
| CTAs | `<a class="btn …">` (navegan); si «Escanear QR» abre la cámara/app, lo decide la URL (pregunta 4) |
| Imagen | `alt` real si informa (p. ej. un QR de ejemplo) o `alt=""` si es decorativa |

## 9. Preguntas a diseño

1. Oleada 2 idéntica al píxel: ¿cambia este copy en O2?
2. Copy: «15 digitos» → ¿«dígitos»? ¿Qué fecha sustituye a «X día»? ¿Cambia por oleada?
3. ¿Qué imagen va a la derecha (QR, captura de la app, ilustración)?
4. ¿Destino de «Escanear QR» (deep link a la app, URL web) y de «Acceso al juego»?
5. Tipografía y colores de wireframe (fondo `#f8f8f8`): ¿finales?
6. ¿Botón píldora único para toda la landing (primario negro / secundario con borde) con ancho hug, o el ancho fijo 235 de hero y menús es intencionado?
