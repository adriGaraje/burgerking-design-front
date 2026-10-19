# Spec · `brand-tokens` — Tokens de marca **PROVISIONALES**

> **Todo lo de este documento es PROVISIONAL.** Sale de dos landings **anteriores** de BK guardadas como
> referencia, no del diseño del Roscón (que hoy es un wireframe gris en Comic Sans). Sirve para no maquetar en
> Comic Sans mientras llega el diseño visual. Cuando llegue, se sustituye entero.

| Campo | Valor |
|---|---|
| Archivo | `HBpZap8ASqhsHPCTpe7OMN` · página References, SECTION `8096:19611` «Referencias» |
| Mystery King | `8096:19612`: GROUP de **10 capturas de pantalla rasterizadas** (`8096:19613…19622`). **Sin styles ni variables**: los colores se han **muestreado de los píxeles** (export REST a 0,5x) |
| Grand King | `8096:19623`: frame «Desktop» 1920×4433, **vectorial**, con styles de una librería remota de BK. Fuente principal de los tokens |
| Herramientas | REST `/nodes` (styles con nombre, recorrido solo de nodos visibles) + MCP `get_variable_defs` sobre `8096:19623` y `8206:97` |
| Wireframe del Roscón | `get_variable_defs(8206:97)` = solo `Functional/Utility/Black #000000` y `Functional/Utility/White #FFFFFF` |
| Capturas | `ref-grand-king@0.25x.png`, `ref-mystery-king-hero@0.5x.png` (en esta carpeta) |

## 1. Colores con nombre (styles de Figma usados en Grand King `8096:19623`)

| Style de Figma (nombre exacto) | Valor | Usos visibles | Dónde |
|---|---|---|---|
| `Burger King/Primary/BBQ Brown` | `#502314` | 29 | textos de cuerpo y titulares, logo |
| `www.burgerking.es/Brown Derby` | `#502314` | 6 | titulares (**duplicado** de BBQ Brown) |
| `Brand Extended/Burger King/Darken/BBQ Brown Darken` | `#421A0B` | 4 | nombres de influencer |
| `Burger King/Primary/Fiery Red` | `#D62300` | 7 | CTA de texto, flechas, contador |
| `www.burgerking.es/Grenadier` | `#D62300` | 8 | fondo de los botones «Pide ya» (**duplicado** de Fiery Red) |
| `Brand Extended/Burger King/Darken/Fiery Red Darken` | `#8A1600` | 108 | solo en ilustraciones de hamburguesas (vectores) |
| `Burger King/Secondary/Mayo Egg White` | `#F5EBDC` | 8 | texto claro sobre rojo |
| `Burger King/Secondary/Melty Yellow` | `#FFAA00` | 34 | números de pasos, ilustraciones; sección «¿Cómo participar?» (fill sin style) |
| `Functional/Utility/White` | `#FFFFFF` | 22 | fondos |
| `www.burgerking.es/White` | `#FFFFFF` | 4 | texto de botón |
| `Functional/Opacity/White Opacity 10%` | `#FFFFFF` al 10 % | 2 | borde del carrusel |
| `Functional/Opacity/White Opacity 30%` | — | 0 visibles | declarado en el nodo y **sin uso visible**: valor sin comprobar |
| `Functional/Utility/Black` | `#000000` | (wireframe) | todo el wireframe del Roscón |

**Variables** (`get_variable_defs`, no son styles): `Colors/Fiery Red #d62300` · `Colors/Crunchy Green #198737` ·
`Colors/Flaming Orange #ff8732` · `Colors/Utility/Burger King/Mayo Egg White #f5ebdc` · `color/red/42 #d62300` ·
`color/orange/20 #502314` · `Color/Icon/Icon-default #502314` · `Influencer 1–4` (`#d62300`, `#2c343b`, `#ff8732`,
`#2f4697`, colores de campaña de Grand King, **no de marca**).

**Fills sin style relevantes:** fondo de la sección carrusel `#B91E00` (`8096:19706`); el resto de fills sin
style (`#ff8860`, `#198737`, `#e77049`…) son de ilustraciones.

**Mystery King (muestreado; ±2 por canal, captura comprimida):**

| Zona | Color medido | Lo más cercano con nombre |
|---|---|---|
| Fondo de página (textura de papel) | `#F1E6D6` (media) | Mayo Egg White `#F5EBDC` |
| Banda roja / titulares | `#D62201` | Fiery Red `#D62300` |
| Sección oscura | `#242220` | ninguno (sin style) |
| Texto de cuerpo | ≈ `#502010` (cuantizado de 8 en 8) | BBQ Brown `#502314` |
| Cabecera del sitio | `#FFFFFF` | White |

La cabecera y el pie de burgerking.es del wireframe (`8206:98`, `8206:300`) son capturas **en grises**
(croma 0): sus `#303030` y `#141414` **no son colores de marca**.

## 2. Propuesta de tokens (capa RAW → alias)

Formato de `src/styles/settings/_tokens.scss` (un `$color-*` por style, con `// Figma: <nombre>` para el drift).
Los duplicados `www.burgerking.es/*` no se declaran: apuntan al mismo valor.

```scss
// PROVISIONAL — referencias Grand King / Mystery King, no diseño del Roscón.
$color-bk-bbq-brown: #502314; // Figma: Burger King/Primary/BBQ Brown
$color-bk-bbq-brown-darken: #421a0b; // Figma: Brand Extended/Burger King/Darken/BBQ Brown Darken
$color-bk-fiery-red: #d62300; // Figma: Burger King/Primary/Fiery Red
$color-bk-fiery-red-darken: #8a1600; // Figma: Brand Extended/Burger King/Darken/Fiery Red Darken
$color-bk-mayo-egg-white: #f5ebdc; // Figma: Burger King/Secondary/Mayo Egg White
$color-bk-melty-yellow: #ffaa00; // Figma: Burger King/Secondary/Melty Yellow
$color-neutral-white: #fff; // Figma: Functional/Utility/White
$color-neutral-black: #000; // Figma: Functional/Utility/Black
```

| Alias (`_colors.scss`) | → token | Motivo |
|---|---|---|
| `$brand-ink` | `$color-bk-bbq-brown` | texto por defecto en las dos referencias |
| `$brand-ink-strong` | `$color-bk-bbq-brown-darken` | énfasis |
| `$brand-primary` | `$color-bk-fiery-red` | botones y CTA |
| `$brand-primary-dark` | `$color-bk-fiery-red-darken` | hover del primario (**decisión nuestra**: en la referencia solo sale en ilustración) |
| `$brand-surface` | `$color-neutral-white` | fondo base |
| `$brand-surface-alt` | `$color-bk-mayo-egg-white` | fondo crema (Mystery King) / texto sobre rojo |
| `$brand-accent` | `$color-bk-melty-yellow` | sección destacada, numeración |
| `$brand-on-primary` | `$color-neutral-white` | texto de botón |

Bootstrap: `$primary: $brand-primary` y `$body-color: $brand-ink` (hoy `_bootstrap.scss` ya enlaza `$primary`).

## 3. Tipografía

**Familias:** `Flame` (Regular 400, Bold 700) para titulares y botones; `Flame Sans` (Regular 400) para el cuerpo.
**Son tipografías propietarias de Burger King**: no están en Google Fonts y **no se han descargado**.
Secundarias en la referencia: `Archivo` (Google Fonts, solo en los dígitos del contador) y `Roboto` (solo en la
maqueta del reproductor de YouTube). No se proponen.

En Mystery King (capturas), la letra es visualmente Flame / Flame Sans: **estimación a ojo, sin comprobar**.

**Fallback propuesto** (decisión nuestra, a validar):

```scss
$font-family-display: 'Flame', 'Arial Rounded MT Bold', 'Helvetica Neue', arial, sans-serif;
$font-family-brand: 'Flame Sans', 'Helvetica Neue', arial, sans-serif;
```

Hipótesis sin comprobar: la landing se pega en el CMS de burgerking.es y el sitio **ya sirve Flame como webfont**.
Si es así, basta con nombrar la familia, sin `@font-face` propio (P1).

### Estilos de texto con nombre (Grand King)

| Style de Figma | Familia · peso | Size / line-height | Usos |
|---|---|---|---|
| `Burger King/Hero/Desktop Latin` | Flame 400 | 48 / 48 | titulares de sección |
| `Burger King/Header One/Desktop Latin` | Flame 400 | 30 / 32 | subtitulares |
| `Burger King/Header Two/Desktop Latin` | Flame 400 | 24 / 28 | entradillas y destacados |
| `www.burgerking.es/Flame/Regular` | Flame 400 | 18 / 24 | numeración de pasos |
| `www.burgerking.es/Semantic/Link` | Flame 400 | 16 / 24 | texto de botón / CTA |

**Sin style, pero recurrentes:** párrafo `Flame Sans 400 20/28` (×3 + variantes 24/28 y 20/20) · `Flame 400 20/24` (pasos) ·
`Flame 700 48/48` (antetítulo) · `Flame 400 24/26.4` (nombre de producto).

No hay estilos móviles: los nombres dicen «**Desktop** Latin», así que la librería de BK tiene casi seguro
variantes móviles, pero **no aparecen** en estas referencias (sin comprobar). Los valores móviles de abajo son
nuestros.

### Escala propuesta para `$type-scale` (formato del repo: size, line-height, letter-spacing, weight)

| Clave | Style de origen | Desktop | Móvil (**decisión nuestra**) |
|---|---|---|---|
| `h1` | Hero/Desktop Latin | `(3rem, 1, 0, 400)` (48/48) | `(2rem, 1.125, 0, 400)` (32/36) |
| `h2` | Header One/Desktop Latin | `(1.875rem, 1.0667, 0, 400)` (30/32) | `(1.5rem, 1.1667, 0, 400)` (24/28) |
| `h3` | Header Two/Desktop Latin | `(1.5rem, 1.1667, 0, 400)` (24/28) | `(1.25rem, 1.2, 0, 400)` (20/24) |
| `lead` | Flame Sans 20/28 (sin style) | `(1.25rem, 1.4, 0, 400)` | `(1.125rem, 1.4444, 0, 400)` (18/26) |
| `body` | Flame/Regular 18/24 | `(1.125rem, 1.3333, 0, 400)` | `(1rem, 1.5, 0, 400)` (16/24) |
| `button` | Semantic/Link | `(1rem, 1.5, 0, 400)` (16/24) | igual |

`h1`–`h3` y `button` usan `$font-family-display` (Flame); `lead` y `body`, `$font-family-brand` (Flame Sans).

### Equivalencia wireframe → escala provisional (para las specs de bloque)

| Wireframe (Comic Sans) | → |
|---|---|
| 48 bold (título del aviso) | `h1` |
| 28 bold (título de FAQ) | `h2` |
| 24 bold | `h3` |
| 20 regular (copy) | `lead` |
| 16 bold, interlineado 28 (pregunta de FAQ) | `body` en Flame (P4) |
| 16 regular, interlineado 20 (respuesta, enlaces legales) | `body` |
| 16 bold, interlineado 24 (botón) | `button` |

## 4. Otros tokens observados

| Token | Valor | Origen |
|---|---|---|
| Botón primario | alto 40 · `r 100` (píldora) · pad 8 / 16 · fondo Fiery Red · texto Flame 16/24 blanco | Grand King `8096:19661` «CTA» |
| Reproductor de vídeo | YouTube embed 1136×639 (16:9), sin radio | Grand King `8004:59852` |
| Botón del wireframe | alto 40 · píldora · pad 0 8 + 0 8 en el label · fondo negro | Roscón `8206:856` |

## 5. Hooks · Assets · JS · Responsive

Hooks: no aplica. Assets: ninguno (no se descargan fuentes). JS: no aplica. Responsive: la columna móvil de §3,
**decisión nuestra**.

## 6. Preguntas

1. **Licencia y carga de Flame / Flame Sans**: ¿la página del CMS de burgerking.es ya las sirve (bastaría con
   `font-family`)? ¿Podemos alojar los `.woff2` en Storybook para la referencia visual? ¿Quién nos los pasa?
2. ¿La paleta del Roscón será la de marca BK (BBQ Brown, Fiery Red, Mayo Egg White, Melty Yellow) o una de campaña
   navideña propia (como «Influencer 1–4» en Grand King)?
3. ¿Existen los estilos «Mobile Latin» en la librería de BK? Sus valores sustituirían a nuestra columna móvil.
4. Pregunta de FAQ y botón: ¿Flame o Flame Sans?
5. ¿Hover de los botones? Ninguna referencia lo dibuja (proponemos Fiery Red Darken `#8A1600`).
