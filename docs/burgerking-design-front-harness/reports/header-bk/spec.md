# Spec · `header-bk` — Cabecera de burgerking.es (solo referencia)

| Campo | Valor |
|---|---|
| Archivo | `HBpZap8ASqhsHPCTpe7OMN` |
| Nodo | O1 `8206:98` · O2 `8206:635` · Entre `8206:851` · Final `8206:540`: los 4 son RECTANGLE 1440×74 con fill IMAGE **del mismo `imageRef` (`1e5edb3a…`)** |
| Naturaleza | **Imagen rasterizada** (captura en **escala de grises** de la cabecera real). Sin nodos, textos ni estilos: todo lo de abajo se ha **medido sobre el PNG** |
| Propiedad | **No es nuestra**: la pone Burger King. En el entregable va como `<header-bk></header-bk>` |
| Nivel Storybook | `Layouts/Header Bk`: aproximación HTML + Bootstrap solo como contexto visual de las páginas |
| `figma.png` | export REST 1440×74 · `figma@2x.png` 2880×148 (para leer textos) |
| Medición | decodificación del PNG 1x, segmentos de columnas con color ≠ fondo (umbral 40), cajas de tinta |

## 1. Reparto (cajas de tinta en el PNG 1x; y relativa a la imagen)

Fondo blanco `#ffffff`, 1440×74. Sin borde inferior (filas 60–73 blancas en x=600) ni sombra en el PNG.

| Elemento | x | y | w × h (tinta) | Color medido |
|---|---|---|---|---|
| Icono hamburguesa (3 rayas) | 36 | 31 | 18 × 12 | `#303030` |
| «Pide ahora» | 76 | 29 | 80 × 14 | `#303030`, negrita |
| «Cupones y ofertas» | 176 | 29 | 135 × 17 | `#303030`, negrita |
| «Restaurantes» | 331 | 30 | 99 × 13 | `#303030`, negrita |
| «Descubre» | 451 | 30 | 72 × 13 | `#303030`, negrita |
| Logo BK (pan) | 694 | 9 | 51 × 56 | grises `#a5a5a5` / `#6a6a6a` (centro x ≈ 719.5: centrado) |
| Icono ubicación (pin) | 951 | 29 | 12 × 16 | `#303030` |
| «A domicilio o recoger» | 974 | 29 | 158 × 17 | `#303030`, negrita |
| «Selecciona» | 1139 | 31 | 75 × 14 | `#646464`, regular, **subrayado** |
| Píldora de coronas (borde) | 1228 | 22 | 53 × 31 | borde `#cbcbcb`, fondo blanco · icono corona `#bababa` + «0» `#303030` |
| Píldora de carrito (rellena) | 1295 | 22 | 112 × 30 | fondo `#303030` · icono bolsa + «0,00 €» blancos, negrita |

Márgenes laterales: 36 a la izquierda y 34 a la derecha (1440 − 1406). Separación entre ítems del menú ≈ 20–22 px de tinta a tinta.

## 2. Medidas aproximadas y mapeo

| Elemento | Estimación | Bootstrap 4.1.3 / SCSS |
|---|---|---|
| Barra | alto 74, `padding: 0 36px` | `header.header-bk` · `.d-flex.align-items-center.justify-content-between` · `height: 74px` |
| Izquierda | hamburguesa + 4 enlaces | `.header-bk__nav.d-flex.align-items-center` · enlaces `.header-bk__link` ≈ **18 px negrita** (mayúscula 13–14 px), sin subrayado, gap ≈ 20 |
| Centro | logo 51 × 56 | `.header-bk__logo` en `position: absolute; left: 50%; transform: translateX(-50%)` |
| Derecha | pin + «A domicilio o recoger» + «Selecciona» + 2 píldoras | `.header-bk__actions.d-flex.align-items-center` · píldoras `border-radius: 50rem`, alto 30–31 |
| Tipografía | Flame (bold) en la imagen: **estimación visual, sin comprobar** | `font-family: Flame, <fallback>` (ver `brand-tokens`) |

Precisión: ±1 px en cajas. Los tamaños de fuente son estimaciones (no se leen de una imagen).

## 3. Hooks

No aplica. En el entregable, la etiqueta `<header-bk></header-bk>`; la aproximación vive solo en Storybook.

## 4. Contenido → `datos-header-bk.js` (transcrito de la imagen)

```json
{
  "menuLabel": "Menú",
  "_menuLabelNote": "sin texto en la imagen: solo el icono; etiqueta accesible nuestra",
  "nav": [
    { "label": "Pide ahora", "href": null },
    { "label": "Cupones y ofertas", "href": null },
    { "label": "Restaurantes", "href": null },
    { "label": "Descubre", "href": null }
  ],
  "logo": { "alt": "Burger King", "href": null },
  "delivery": { "label": "A domicilio o recoger", "action": "Selecciona" },
  "crowns": { "value": "0" },
  "cart": { "value": "0,00 €" }
}
```

## 5. Assets

| Asset | Nodo | Formato | Nota |
|---|---|---|---|
| Imagen de cabecera | `8206:98` (`imageRef 1e5edb3a…`) | PNG 1440×74 / 2880×148 | `reports/header-bk/figma(@2x).png`. Plan B para Storybook: usar la propia imagen como `<img>` |
| Logo BK | dentro de la imagen | — | **No extraíble como vector.** Para la aproximación: recorte del PNG @2x o SVG oficial de BK (P1) |
| Iconos (hamburguesa, pin, corona, bolsa) | dentro de la imagen | — | aproximar con SVG simples o recortes (P1) |

## 6. Interacción / JS

Ninguna en la referencia. Es estática: no se maqueta el menú desplegable ni el selector de entrega.

## 7. Responsive 390 px · **decisión nuestra**

No hay cabecera móvil en el diseño. Propuesta para Storybook: a < md, ocultar los 4 enlaces y «A domicilio…»
(`d-none d-md-flex`); quedan hamburguesa, logo centrado y la píldora del carrito. **Es una aproximación nuestra,
no la cabecera real de BK.**

## 8. Accesibilidad

`header` con `nav aria-label="Principal"`; botón de hamburguesa con `aria-label="Menú"`; logo como `<img alt="Burger King">`.
Como no es entregable, el nivel exigible es el de una referencia visual.

## 9. Preguntas

1. ¿Podemos usar el logo y los iconos oficiales de BK (SVG) para la aproximación, o basta con la imagen tal cual en Storybook?
2. La imagen está en **grises** (la cabecera real es a color). ¿Reproducimos los grises del wireframe o los colores reales?
3. ¿La cabecera real es fija (sticky) o tapa el hero? Si es fija, el hero tendría que dejarle 74 px (no aparece en el wireframe).
4. ¿Cómo es el contrato de `<header-bk></header-bk>`? ¿Etiqueta literal que sustituye el CMS, o la pone BK por su cuenta?
