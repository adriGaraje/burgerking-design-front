# Spec · `campaign-notice` — Hero corto de aviso (entre oleadas / final)

| Campo | Valor |
|---|---|
| Archivo | `HBpZap8ASqhsHPCTpe7OMN` |
| Nodos | Entre oleadas `8206:852` (en `8206:850`) · Final de campaña `8206:541` (en `8206:539`) |
| Estado | Wireframe (Comic Sans MS, grises, copy descriptivo). Sin móvil |
| Nivel Storybook | `Snippets/Campaign Notice` (una pieza, 2 variantes) |
| `figma.png` | Entre `8206:852` (1440×730) · `figma-final.png` = Final `8206:541` (1440×730) |
| Diferencias entre variantes | **solo** el título y el copy (y por tanto el alto del bloque de texto). Frame, logo, CTA y medidas idénticos |
| Slug | Correcto: una pieza. Se distingue del `campaign-hero` de O1 (`8206:99`, logo arriba y carrusel) por la composición en 2 columnas, texto + logo |

## 1. Reparto (y relativa al frame, que en la página empieza en y=74, bajo la cabecera)

Frame: 1440×730, fondo `#e0e3e4`, AL **horizontal**, gap **168**, pad **100 / 188 / 140 / 188**, centrado en los
dos ejes. El pad inferior es 40 más que el superior, así que el contenido queda 20 px por encima del centro.

| Nodo (Entre / Final) | Qué | x | y Entre | y Final | Tamaño |
|---|---|---|---|---|---|
| `8206:853` / `8206:542` | Columna de texto (AL vertical, gap 24, hug) | 190.5 | 206 | 225.5 | 559 × 278 / 239 |
| `8206:854` / `8206:543` | Título | 190.5 | 206 | 225.5 | 559 × 134 (2 líneas) / 67 (1 línea) |
| `8206:855` / `8206:544` | Copy | 190.5 | 364 | 316.5 | 559 × 56 (2 líneas) / 84 (3 líneas) |
| `8206:856` / `8206:545` | Botón «Ir a la Homepage» | 190.5 | 444 | 424.5 | 235 × 40 |
| `8206:862` / `8206:551` | Logo «Roscón del King» (GROUP de vectores) | 917.5 | 227.7 | 227.7 | 332 × 234.5 |

Cuadre horizontal: 559 + 168 + 332 = 1059 dentro de 1064, centrado → +2.5 → x = 190.5 ✓.
Cuadre vertical: zona útil 730 − 240 = 490; Entre (490 − 278) / 2 + 100 = 206 ✓; logo (490 − 234.5) / 2 + 100 = 227.75 ✓.

## 2. Medidas, tipografía y mapeo

| Elemento | Figma | Bootstrap 4.1.3 / SCSS (BEM) |
|---|---|---|
| Sección | `#e0e3e4`, alto 730 (no fijo: sale del pad + el contenido + `centrado`) | `section.campaign-notice` · `min-height: 730px; padding: 100px 0 140px` · `d-flex align-items-center` |
| Interior | fila centrada, gap 168 | `.campaign-notice__inner` (`wrap`) `.d-md-flex.align-items-center.justify-content-center` |
| Texto | ancho **fijo 559** (`textAutoResize: HEIGHT`) | `.campaign-notice__body { flex: 0 1 559px }` |
| Título | Comic Sans MS 700 · **48 / 66.89** (interlineado automático de Comic Sans) · `#000` · izquierda | `h1.campaign-notice__title.mb-0` |
| Título → copy | 24 | `margin-top: 24px` |
| Copy | 400 · **20 / 27.87** (auto) · `#000` | `p.campaign-notice__text` |
| Copy → botón | 24 | `margin-top: 24px` |
| Botón | **235 × 40 de ancho fijo**, `r 800` (píldora), fondo `#000` (style `Functional/Utility/Black`), pad 0 8, contenido centrado: `shopping_bag` (oculto) · contenedor de label (pad 0 8) con texto 700 · 16 / 24 **blanco** (`Functional/Utility/White`) · `arrow_forward_ios` (oculto) · **`launch` 16×16 blanco, visible** | `a.btn.campaign-notice__cta` · `min-width: 235px; height: 40px; border-radius: 50rem` (4.1.3 no trae `rounded-pill`) · `d-inline-flex align-items-center justify-content-center` · label con `padding: 0 8px` · icono 16 a la derecha. **Mismo botón primario que `campaign-hero` (`8206:124`)**: compartirlo como pieza Basics, no duplicarlo |
| Columna → logo | 168 | `.campaign-notice__logo { margin-left: 168px }` (≥ md) |
| Logo | 332 × 234.5, gris `#687787` | `img.campaign-notice__logo.img-fluid` width 332 |

Los valores de 66.89 y 27.87 son el interlineado automático de Comic Sans (≈ 1,394). Con la fuente de marca no
sirven: provisional Hero 48/48 y Flame Sans 20/28 (`reports/brand-tokens/spec.md`). Los altos de línea, por
tanto, **cambiarán**.

## 3. Hooks

No aplica (HTML estático).

## 4. Contenido → `datos-campaign-notice.js`

```json
{
  "entreOleadas": {
    "title": "Próximamente vuelve el Roscón del King",
    "text": "Copy dando información de que el primer premio ya se ha dado.",
    "_textIsPlaceholder": true,
    "cta": { "label": "Ir a la Homepage", "href": null, "variant": "primary", "icon": "launch", "external": true },
    "logo": { "src": "logo-roscon-del-king.svg", "alt": "Roscón del King", "width": 332, "height": 235 }
  },
  "final": {
    "title": "¡Ya tenemos ganadores!",
    "text": "Copy dando información que ya tenemos 2 ganadores de 50.000€ y hemos dado X premios. ¡Nos vemos el año que viene!",
    "_textIsPlaceholder": true,
    "cta": { "label": "Ir a la Homepage", "href": null, "variant": "primary", "icon": "launch", "external": true },
    "logo": { "src": "logo-roscon-del-king.svg", "alt": "Roscón del King", "width": 332, "height": 235 }
  }
}
```

- Los títulos son literales y tienen pinta de definitivos. Los dos `text` son **descripciones de relleno**
  («Copy dando información…»), con una «X» sin rellenar.
- La forma de `cta` y `logo` es la misma que en `reports/campaign-hero/spec.md`.

## 5. Assets

| Asset | Nodo | Formato | Ruta / nota |
|---|---|---|---|
| Logo «Roscón del King» | `8206:862` / `8206:551` | SVG 332×235 | **Reutilizar** `reports/campaign-hero/assets/logo-roscon-del-king.svg` (de `8206:100`): el export REST PNG de `8206:100`, `8206:862` y `8206:551` sale **byte a byte idéntico** (`cmp`) |
| Icono `launch` | `8206:861` / `8206:550` (comp. `8006:19578`) | SVG 16×16 blanco | `reports/menu-grid/assets/icon-launch.svg` (mismo componente) · inline, `fill="currentColor"` |

## 6. Interacción / JS

Sin JS. El icono `launch` sugiere enlace externo o pestaña nueva, pero «Homepage» es burgerking.es, el mismo
sitio (P2). Hover/foco del botón sin diseñar.

## 7. Responsive 390 px · **decisión nuestra**

| Propiedad | 390 | 1440 |
|---|---|---|
| Disposición | columna: **logo arriba**, centrado; texto debajo, alineado a la izquierda | fila: texto + logo |
| Pad | 48 / 56 | 100 / 140 |
| Alto | auto (sin `min-height`) | 730 |
| Logo | width 240 (h ≈ 170), `mb-4` (24) | 332, `ml` 168 |
| Título | 32 / 36 | 48 |
| Copy | 18 / 26 | 20 |
| Botón | 235 × 40 (no a ancho completo) | igual |

El logo a 240 es el mismo valor móvil que propone `campaign-hero`, para que las dos piezas sean coherentes.

## 8. Accesibilidad

- En estas dos páginas, el título es el principal → `h1`. Si la pieza se reutiliza debajo de otro hero, nivel
  parametrizable (`h2`).
- Logo: `<img alt="Roscón del King">`. Es la marca de la campaña, no un adorno.
- Botón: un `<a>` (navega). Si abre pestaña nueva, `target="_blank" rel="noopener"` + texto oculto «(se abre en
  una pestaña nueva)». El icono `launch`, `aria-hidden`.
- Contraste: negro sobre `#e0e3e4` ≈ 16,3:1 y blanco sobre negro 21:1.

## 9. Preguntas a diseño

1. Copys reales de las dos variantes (hoy son descripciones), con la «X premios» y la cifra del premio confirmadas.
2. URL de «Ir a la Homepage» y por qué lleva el icono `launch`: ¿abre en pestaña nueva?
3. ¿El logo cambia por etapa (Roscón King / Roscón King 2 / De vuelta)? En el wireframe, O1, Entre y Final usan el mismo.
4. ¿Pad 100 / 140 asimétrico intencionado (contenido 20 px por encima del centro)?
5. Móvil: ¿logo arriba o abajo? ¿Texto centrado o a la izquierda?
6. ¿Fondo de la versión final: color plano, ilustración, imagen?
