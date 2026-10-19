# menu-grid · spec (Ojo, paso 2)

| Campo | Valor |
|---|---|
| Fuente | `HBpZap8ASqhsHPCTpe7OMN` · O1 `8206:208` · O2 `8206:745` (nombre de capa «Hero»: casar por id) |
| Estado del diseño | Wireframe (grises, Comic Sans MS, lorem). Sin móvil |
| Nivel | `Snippets/` |
| Referencia | `figma.png` = export REST de `8206:208`, escala 1 → 1440×784 (= nodo; el frame recorta, `clipsContent`) |
| Slug | `menu-grid` correcto: frame propio, fondo #fff, se pega solo |
| Cuenta atrás | **Está aquí**: `8206:242` («principal», 1064×130), hijo de `8206:208` tras los CTAs, **OCULTO** (O1 y O2). No es banda propia → **no hay slug `countdown`**: va como sub-bloque opcional de `menu-grid`, apagado por defecto (§1b) |
| O1 vs O2 | **Idénticos**: 45 nodos, 0 diferencias (incluida la visibilidad de la cuenta atrás); `pixel-diff` = 0 px de 1 128 960 |

## 1. Reparto vertical (y relativa al top de `8206:208`)

Auto-layout vertical, gap 42, padding 40/188/40/188, eje cruzado centrado. Alto hug = 784. Fondo #fff.

| Nodo | Qué | x | y | w×h | Visible |
|---|---|---|---|---|---|
| `8206:209` | «principal» (vertical, gap 24) | 188 | 40 | 1064×622 | sí |
| `8206:210` | Cabecera (vertical, gap 8, centrada) | 188 | 40 | 1064×56 | sí |
| `8206:211` | «Menús disponibles» (hug) | 600 | 40 | 240×28 | sí |
| `8206:212` | Subtítulo (hug) | 513.5 | 76 | 413×20 | sí |
| `8206:213` | Rejilla (horizontal **wrap**, centrada) | 188 | 120 | 1064×542 | sí |
| `8206:235` | CTAs (horizontal, gap 8, centrados) | 188 | 704 | 1064×40 | sí |
| `8206:242` | Cuenta atrás | 188 | 786 | 1064×130 | **OCULTO** |
| — | padding-bottom | — | 744 | 40 | — |

Si la cuenta atrás se muestra: +42 (gap) +130 → bloque **956**.

### 1b. Cuenta atrás (`8206:242` → `8206:243`, vertical, gap 12, centrada)

| Nodo | Qué | Medidas |
|---|---|---|
| `8206:244` | «Quedan» | 24 / 28, 700, hug 87×28 |
| `8206:245` | Caja | hug 524×90, fondo `#eff1f3`, r4, padding 16, gap 24, horizontal centrada |
| `8206:246…249` | 4 celdas «9 días» / «10 horas» / «25 minutos» / «27 segundos» | ancho **fijo 105**, h58; 28 / 28, 700, center; número y unidad en 2 líneas (salto forzado ` `) |

524 = 16 + 4×105 + 3×24 + 16. Cuenta del brief: «Quedan 9 días 10 horas 25 minutos 27 segundos» = este nodo.

## 2. Medidas

### Tipografía (Comic Sans MS = wireframe)

| Nodo | Texto | size / line-height | weight | align |
|---|---|---|---|---|
| `8206:211` | título | 28 / 28 | 700 | left en caja hug → **centrado** por el padre |
| `8206:212` | subtítulo | 16 / 20 (125 %) | 400 | center |
| `8206:216…234` | «Menú Rosking» | 14 / 19.5 (≈1.393), caja h20 | 700 | center |
| `8206:239` | «Ver menús» | 16 / 24 | 700 | — (#fff) |

### Rejilla (`8206:213`)

| Medida | Valor |
|---|---|
| Ítem `8206:214…232` | 227×255: imagen 227×227 r4 + gap 8 + label h20 |
| Gap horizontal | **52** (4×227 + 3×52 = 1064 exacto) |
| Gap vertical | **32** (`counterAxisSpacing`) |
| Nº ítems | 7 → fila 1: 4 (x 188/467/746/1025, y 120) · fila 2: 3 centrados (x 327.5/606.5/885.5, y 407) |
| Alineación | `justify-content: center` (la fila incompleta se centra) |

### CTA (`8206:236`)
«Ver menús»: **235×40 fijo**, píldora (r 800), fondo #000; padding 0 8; label en contenedor 0 8; icono `launch` 16×16 blanco (`8206:241`) pegado tras el label (8 de separación). Contenido 113 centrado en el botón. Iconos ocultos: `shopping_bag`, `arrow_forward_ios`.

### Mapeo Bootstrap 4.1.3 + SCSS propio

| Parte | Bootstrap | SCSS propio (BEM) |
|---|---|---|
| Sección | `<section>` `text-center` | `.menu-grid` padding 40 0; fondo #fff |
| Contenedor | — | mixin `wrap` (1064) |
| Cabecera | `mb-0` | `.menu-grid__header` gap 8; cabecera→rejilla 24 |
| Rejilla | `list-unstyled d-flex flex-wrap justify-content-center mb-0` | `.menu-grid__list` `gap: 32px 52px` (4.1.3 no tiene `gap` ni gutters de 52) · `.menu-grid__item` flex 0 0 227 · `__image` 227×227 r4 `object-fit: cover` · `__name` margin-top 8 |
| CTA | `btn` | píldora 235×40, `border-radius: 50rem`; rejilla→CTA 42 |
| Cuenta atrás | `d-flex justify-content-center` | `.menu-grid__countdown` (gap 12; margin-top 42) · `__countdown-box` fondo `#eff1f3`, r4, padding 16, gap 24 · `__countdown-unit` width 105 |

## 3. Hooks
No aplica (HTML estático).

## 4. Contenido · `datos-menu-grid.js`

```json
{
  "oleada1": {
    "title": "Menús disponibles",
    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    "items": [
      { "image": "placeholder.png", "alt": "", "name": "Menú Rosking", "href": null },
      { "image": "placeholder.png", "alt": "", "name": "Menú Rosking", "href": null },
      { "image": "placeholder.png", "alt": "", "name": "Menú Rosking", "href": null },
      { "image": "placeholder.png", "alt": "", "name": "Menú Rosking", "href": null },
      { "image": "placeholder.png", "alt": "", "name": "Menú Rosking", "href": null },
      { "image": "placeholder.png", "alt": "", "name": "Menú Rosking", "href": null },
      { "image": "placeholder.png", "alt": "", "name": "Menú Rosking", "href": null }
    ],
    "cta": { "label": "Ver menús", "href": null, "icon": "launch", "external": true },
    "countdown": {
      "visible": false,
      "label": "Quedan",
      "end": null,
      "units": [
        { "value": "9", "unit": "días" },
        { "value": "10", "unit": "horas" },
        { "value": "25", "unit": "minutos" },
        { "value": "27", "unit": "segundos" }
      ]
    },
    "filler": ["subtitle", "items[].name (7 iguales)", "items[].image", "countdown.units[].value"]
  }
}
```

**oleada2**: idéntica (`export const oleada2 = { ...oleada1 }`), cuenta atrás también oculta. Copies nuevos pendientes (nota `8206:846`).

No están en el nodo: nombres reales de los 7 menús, `href` de ítems y CTA, fecha fin de la cuenta atrás.

## 5. Assets

| Asset | Nodo | Formato | Notas |
|---|---|---|---|
| Imagen de menú | `8206:215` (fill IMAGE `123b652f`, FILL) | PNG 800×800 → `../campaign-hero/assets/placeholder.png` | Placeholder de wireframe; cover a 227×227 |
| Icono `launch` | `8206:241` (comp `8006:19578`) | SVG 16×16 → `assets/icon-launch.svg` | fill white; `aria-hidden` |

## 6. Interacción y JS

| Tema | Diseño (medido) | Decisión nuestra (propuesta) |
|---|---|---|
| Rejilla | Estática, 7 ítems | Sin JS; n ítems desde datos, wrap + centrado |
| CTA | Icono `launch` → enlace externo | `target="_blank" rel="noopener"` |
| Cuenta atrás | Oculta; valores estáticos 9/10/25/27 | Si se activa: `menu-grid.js` vanilla, `data-countdown-end="<ISO 8601 con zona>"`, `setInterval` 1 s, valores con `textContent`; HTML estático con los valores de Figma como fallback sin JS; al llegar a 0, qué pasa → pregunta 3 |

## 7. Responsive · 390 px — **decisión nuestra, no hay móvil**

| Parte | < md (390, contenido 360) | ≥ md |
|---|---|---|
| Padding sección | 40 0 | 40 0 |
| Rejilla | 2 por fila: ítem (360 − 16) / 2 = 172, gap 24 / 16; el 7.º centrado | 227 fijo, gap 32 / 52 (a 768–1093 salen 2–3 por fila por el wrap natural) |
| CTA | 235×40 centrado | igual |
| Cuenta atrás | 524 > 360 → celdas a 25 % (≈ 70), gap 8, 20 / 1.2 | 524 |

## 8. Accesibilidad

| Elemento | Marcado |
|---|---|
| Sección | `<section aria-labelledby="menu-grid-title">`; título `<h2 id="menu-grid-title">` |
| Rejilla | `<ul>` / `<li>`; nombre `<h3>` o `<p>` (si el ítem enlaza, el `<a>` envuelve imagen + nombre) |
| Imagen | `alt=""` si el nombre ya va debajo (evita repetirlo); `alt` propio si aporta |
| CTA externo | texto oculto «(se abre en una pestaña nueva)»; icono `aria-hidden="true"` |
| Cuenta atrás | `role="timer"` con `aria-live="off"` (no anunciar cada segundo) y `aria-label` con el texto completo; «Quedan» como etiqueta visible |

## 9. Preguntas a diseño

1. **La cuenta atrás está oculta** (O1 y O2). ¿Entra en alguna oleada? ¿Aquí, tras «Ver menús», o en otra posición? ¿Fecha y hora de fin (zona horaria)?
2. Los 7 ítems dicen «Menú Rosking» igual. ¿Nombres, fotos y nº reales por oleada? ¿Cada ítem enlaza a algo? ¿Lleva precio?
3. Cuenta atrás al llegar a 0: ¿se oculta, muestra un texto o cambia de oleada? ¿Singular («1 día», «1 hora»)?
4. URL de «Ver menús» (externa por el icono `launch`).
5. Botón «Ver menús» a 235 fijo aquí y hug en `qr-access`: ¿intencionado?
6. Tipografía y colores de wireframe (caja `#eff1f3`): ¿finales?
7. Sin versión móvil: ¿validáis 2 por fila a 390 (§7)?
