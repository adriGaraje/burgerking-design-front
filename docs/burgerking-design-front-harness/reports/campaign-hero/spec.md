# campaign-hero · spec (Ojo, paso 2)

| Campo | Valor |
|---|---|
| Fuente | `HBpZap8ASqhsHPCTpe7OMN` · O1 `8206:99` · O2 `8206:636` (los dos se llaman «Hero»: casar por id) |
| Estado del diseño | Wireframe (grises, Comic Sans MS, lorem). Sin diseño visual. Sin móvil |
| Nivel | `Snippets/` — una sección que se pega sola |
| Referencia | `figma.png` = export REST de `8206:99`, escala 1, `use_absolute_bounds` → 1440×1024 (nodo 1440×1023.5) |
| Slug | **`campaign-hero` incluye «¿Qué puedes ganar?»**: el carrusel `8206:134` es hijo del mismo frame, comparte fondo `#e0e3e4` y el padding-bottom 100 del hero. No es banda separable → no hay `prize-carousel` como snippet (si se quiere reusar, como pieza `Basics/` dentro de este) |
| O1 vs O2 | **Idénticos**: 64 nodos comparados, 0 textos/fills/tamaños/visibilidad distintos; `pixel-diff` 8206:99 vs 8206:636 = 0 px de 1 474 560. La nota rosa `8206:846` anuncia «logotipo y copies nuevos» que **aún no están** en el wireframe |
| Franja superior | `8206:98` (imagen 1440×74, cabecera actual del sitio) va **fuera** del hero: no se maqueta. `config.pageStandard` está en TODO → distancia a la barra «sin comprobar». El logo empieza a 100 px del borde del hero |

## 1. Reparto vertical (y relativa al top de `8206:99`)

Auto-layout vertical, gap 40, padding 100/188/100/188, centrado. Fondo `#e0e3e4`.

| Nodo | Qué | x | y | w×h | Visible |
|---|---|---|---|---|---|
| `8206:100` | Logo (GROUP de 18 vectores) | 554 | 100 | 332×234.5 | sí |
| `8206:120` | Bloque texto (vertical, gap 12) | 339 | 374.5 | 762×202 | sí |
| `8206:121` | Titular (hug, salto forzado ` `) | 401.5 | 374.5 | 637×134 | sí |
| `8206:122` | Entradilla (fill 762) | 339 | 520.5 | 762×56 | sí |
| `8206:123` | Fila de CTAs (2 botones) | 188 | 616.5 | 1064×40 | **OCULTO** |
| `8206:134` | Carrusel (vertical, gap 24) | 188 | 616.5 | 1064×307 | sí |
| `8206:135` | «¿Qué puedes ganar?» | 188 | 616.5 | 1064×28 | sí |
| `8206:136` | Pista (horizontal, gap 40, hug, centrada) | **−61** | 668.5 | 1562×255 | sí |
| — | padding-bottom | — | 923.5 | 100 | — |

Si `8206:123` se mostrase: +40 (botones) +40 (gap) → hero 1103.5.

## 2. Medidas

### Tipografía (Comic Sans MS = fuente de wireframe, no de marca)

| Nodo | Texto | size / line-height | weight | align | color |
|---|---|---|---|---|---|
| `8206:121` | titular | 48 / 66.9 (intrínseco ≈1.394) | 700 | center | #000 |
| `8206:122` | entradilla | 20 / 27.9 (≈1.395) | 400 | center | #000 |
| `8206:135` | título carrusel | 28 / 28 (100 %) | 700 | center | #000 |
| `8206:139…154` | «Premio n» | 14 / 19.5 (≈1.393), caja h20 | 700 | center | #000 |
| `8206:127` / `8206:133` | label CTA (oculto) | 16 / 24 | 700 | — | #fff / #000 |
| `8206:156` / `8206:158` | glifo «>» «<» (Afacad Bold) | 26.18 / 34.9 | 700 | center | #000 |

### Logo y texto
- Logo 332×234.5, centrado. Lee «ROSCÓN **del** KING» (no «Roscón King»). Fill plano `#687787` (el BOOLEAN `8206:101` pinta la corona en gris; los colores internos `#f3efdd`/`#d19d7e` no se ven).
- Bloque texto: ancho fijo 762, gap 12. El titular es hug (637) con salto de línea forzado tras «rey»: `Encuentra al rey<br>para ganar hasta 50.000 €`.

### Carrusel (`8206:136`)
| Medida | Valor |
|---|---|
| Ítem `8206:137…152` | 227×255: imagen 227×227 r4 + gap 8 + label h20 |
| Gap entre ítems | 40 → paso 267 px |
| Nº ítems | 6 |
| Pista | 1562 (6×227 + 5×40), centrada en 1440 → sobresale 61 px por cada lado |
| Visibles a 1440 | 4 enteros (x 206 / 473 / 740 / 1007) + 2 cortados (ítem 1 en x −61, ítem 6 en x 1274; 166 px visibles de 227) |
| Ítems 1 y 6 | **opacity 0.4** (frame entero, imagen + label) |
| Flechas `8206:157` (‹) / `8206:155` (›) | 48×48, círculo (r 290.9), fondo #fff, borde 1 inside `#e0e3e4`, sombra `0 4px 4px rgba(0,0,0,.25)`, padding 5.82, posición ABSOLUTE |
| Posición flechas | ‹ x 40, › x 1352 (40 del borde derecho); top 92.5 desde el top de la pista → centro a 116.5 (el centro de la imagen está a 113.5: **3 px más abajo**) |

### CTAs ocultos (`8206:123`, horizontal, gap 8, centrados)
| Nodo | Botón | Medidas |
|---|---|---|
| `8206:124` | «Ver menús» primario | 235×40 **fijo**, r 800 (píldora), fondo #000, padding 0 8; label en contenedor con padding 0 8; icono `launch` 16 blanco a la derecha (`8206:129`) |
| `8206:130` | «¿Cómo jugar?» secundario | 235×40 fijo, píldora, fondo #fff, borde 1 inside #000, sin icono → **es el ancla a `how-to-play`** |

### Mapeo Bootstrap 4.1.3 + SCSS propio

| Parte | Bootstrap | SCSS propio (BEM) |
|---|---|---|
| Sección | `<section>` + `text-center` | `.campaign-hero` padding 100 0; fondo `#e0e3e4` |
| Contenedor 1064 | — | mixin `wrap` (hoy `$container-max: 1320` → **cambiar a 1064** o max-width local; ver pregunta 9) |
| Logo | `img-fluid d-block mx-auto` | `.campaign-hero__logo` width 332 |
| Texto | `mx-auto` | `.campaign-hero__text` max-width 762; gap 12 |
| CTAs | `btn` + `d-flex justify-content-center` | `.campaign-hero__ctas` gap 8; botón píldora 235×40 (Bootstrap 4.1.3 no trae `rounded-pill`: `border-radius: 50rem` propio) |
| Carrusel | **no** `.carousel` de Bootstrap (es de 1 slide visible) | `.campaign-hero__prizes` (título), `__track` (full-bleed 100vw, `display:flex; gap:40px; overflow-x:auto; scroll-snap-type:x mandatory`, scrollbar oculta), `__prize` (flex 0 0 227), `__prize--dimmed` (opacity .4), `__arrow` / `__arrow--prev|--next` |

Separaciones verticales: logo→texto 40, texto→carrusel 40, título carrusel→pista 24.

## 3. Hooks
No aplica (HTML estático). Texto literal en el partial.

## 4. Contenido · `datos-campaign-hero.js`

`filler`: campos con lorem/placeholder (se maquetan tal cual, marcados como relleno).

```json
{
  "oleada1": {
    "logo": { "src": "logo-roscon-del-king.svg", "alt": "Roscón del King", "width": 332, "height": 235 },
    "title": ["Encuentra al rey", "para ganar hasta 50.000 €"],
    "lead": "Premio de hasta 50.000 €, copy mencionando premios. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam urna purus, cursus eu felis non.",
    "ctas": {
      "visible": false,
      "items": [
        { "label": "Ver menús", "href": null, "variant": "primary", "icon": "launch", "external": true },
        { "label": "¿Cómo jugar?", "href": "#how-to-play", "variant": "secondary", "icon": null, "external": false }
      ]
    },
    "prizes": {
      "title": "¿Qué puedes ganar?",
      "prevLabel": null,
      "nextLabel": null,
      "items": [
        { "image": "placeholder.png", "alt": "", "label": "Premio 1" },
        { "image": "placeholder.png", "alt": "", "label": "Premio 2" },
        { "image": "placeholder.png", "alt": "", "label": "Premio 3" },
        { "image": "placeholder.png", "alt": "", "label": "Premio 4" },
        { "image": "placeholder.png", "alt": "", "label": "Premio 5" },
        { "image": "placeholder.png", "alt": "", "label": "Premio 6" }
      ]
    },
    "filler": ["lead", "prizes.items[].label", "prizes.items[].image"]
  }
}
```

**oleada2**: idéntica a oleada1 en el wireframe (`export const oleada2 = { ...oleada1 }`). El logo y los copies nuevos de la nota `8206:846` no existen todavía → pregunta 1.

Valores que **no** están en el nodo (van a `null` y a preguntas): `href` de «Ver menús», `alt` de premios, `aria-label` de flechas (propuesta nuestra: «Premio anterior» / «Premio siguiente»).

## 5. Assets

| Asset | Nodo | Formato | Notas |
|---|---|---|---|
| Logo «Roscón del King» | `8206:100` (O2 `8206:637`) | **SVG** (vector puro, 0 `<image>`, 13.8 KB) → `assets/logo-roscon-del-king.svg` | 332×235. Gris de wireframe `#687787`. O2 = O1: 0 px de diferencia (el path del BOOLEAN `8206:101` difiere en el árbol, no en el render) |
| Imagen de premio | `8206:138` (fill IMAGE `123b652f`, scaleMode FILL) | PNG 800×800 → `assets/placeholder.png` | Placeholder de wireframe (icono de imagen sobre `#eff1f3`). `object-fit: cover` en 227×227, r4. Las fotos reales no existen |
| Icono `launch` | `8206:129` (oculto; mismo componente `8006:19578` que `8206:241`) | SVG 16×16 → `../menu-grid/assets/icon-launch.svg` | Solo si se muestran los CTAs |
| Flechas | `8206:156` / `8206:158` | Son **texto** «<» «>» en Afacad Bold | Propuesta: chevron SVG inline (pregunta 6) |

## 6. Interacción y JS

| Tema | Diseño (medido) | Decisión nuestra (propuesta, no medida) |
|---|---|---|
| Tipo | Fila de 6 ítems con 2 flechas absolutas | Pista con `scroll-snap` + JS vanilla en `campaign-hero.js`; **no** `.carousel` de Bootstrap 4 |
| Encuadre inicial | Ítem 1 en x −61 (pista centrada) | `scrollLeft = (scrollWidth − clientWidth) / 2` → con 6 ítems a 1440 reproduce exactamente −61 |
| Rango de scroll a 1440 | 1562 − 1440 = **122 px** | Con 6 premios casi no hay recorrido: ver pregunta 3 |
| Flecha | — | `scrollBy(±267)` (un ítem); `disabled` en los extremos; sin autoplay (no hay en diseño) |
| Atenuado | Ítems 1 y 6 a opacity .4 | Atenuar los ítems no visibles enteros (`IntersectionObserver`, umbral ~0.99) → reproduce el diseño en carga |
| Nº ítems | 6 | Cualquiera ≥1 desde datos; si caben todos, ocultar flechas |
| CTA «¿Cómo jugar?» | Oculto | `href="#how-to-play"` (id de la sección `how-to-play`) |

## 7. Responsive · 390 px — **decisión nuestra, no hay móvil en Figma**

| Parte | < md (390) | ≥ md |
|---|---|---|
| Padding sección | 48 0 | 100 0 |
| Logo | width 240 (h ≈ 170) | 332 |
| Titular | 32 / 1.4; el `<br>` solo desde md (`d-none d-md-inline`) | 48 / 1.394 |
| Entradilla | 16 / 1.4 | 20 / 1.395 |
| Gaps logo/texto/carrusel | 24 | 40 |
| Carrusel | ítems 160 (imagen 160²), gap 16, flechas ocultas (swipe), atenuado activo | 227, gap 40, flechas visibles |
| CTAs | apilados o en fila con wrap, gap 8 | fila, gap 8 |

## 8. Accesibilidad

| Elemento | Marcado |
|---|---|
| Sección | `<section class="campaign-hero" aria-labelledby="campaign-hero-title">` |
| Logo | `<img alt="Roscón del King">` (no decorativo: es la marca de la campaña) |
| Titular | `<h1 id="campaign-hero-title">` (único h1 de la landing) |
| «¿Qué puedes ganar?» | `<h2>`; pista `<ul>` / `<li>`, región con `aria-roledescription="carousel"` y `aria-label` = título |
| Flechas | `<button type="button" aria-controls="…track" aria-label="Premio anterior/siguiente">`; glifo `aria-hidden="true"` |
| Ítems atenuados | Siguen en el árbol de accesibilidad; no usar `aria-hidden` |
| CTA externo | `target="_blank" rel="noopener"` + texto oculto «(se abre en una pestaña nueva)»; icono `aria-hidden` |
| Contraste | #000 sobre #e0e3e4 OK; label «Premio» a opacity .4 → contraste bajo (es wireframe) |

## 9. Preguntas a diseño

1. **Oleada 2 = Oleada 1 al píxel** (0 px). ¿Dónde están el logo y los copies nuevos que anuncia la nota `8206:846`? ¿Cuál es el nombre de cada etapa (Roscón King / Roscón King 2 / De vuelta)?
2. El logo dice «Roscón **del** King» y el brief «Roscón King». ¿Cuál es el nombre oficial (alt del logo)? ¿Vendrá el logo final en SVG y en color de marca?
3. Carrusel: con 6 premios a 1440 el recorrido es de 122 px. ¿La flecha avanza 1 ítem (267 px), es infinito/en bucle, o el carrusel solo existe para cuando hay más premios? ¿Atenuado de los cortados: fijo en los extremos o dinámico al desplazar?
4. Los CTAs «Ver menús» y «¿Cómo jugar?» del hero (`8206:123`) están **ocultos**. ¿Entran en alguna oleada? ¿URL de «Ver menús» (el icono `launch` indica enlace externo)?
5. ¿Imágenes reales de los 6 premios, nombres de premio y textos alternativos?
6. Las flechas son texto «<» «>» en Afacad. ¿Icono definitivo?
7. Las flechas caen 3 px por debajo del centro de la imagen (116.5 vs 113.5). ¿Intencionado o se centran en la imagen?
8. Tipografía y colores son de wireframe (Comic Sans MS; grises `#e0e3e4`, `#687787`). ¿Fuente y paleta de la campaña?
9. Ancho de contenido 1064 (padding 188 a 1440), común a los 4 bloques; el repo tiene `$container-max: 1320`. ¿Confirmáis 1064 como contenedor de la landing?
10. Versión móvil: no existe. ¿Validáis la propuesta del §7?
