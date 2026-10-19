# Spec · `footer-bk` — Pie de burgerking.es (solo referencia)

| Campo | Valor |
|---|---|
| Archivo | `HBpZap8ASqhsHPCTpe7OMN` |
| Nodo | O1 `8206:300` · O2 `8206:837` · Entre `8206:888` · Final `8206:577`: los 4 son RECTANGLE 1440×722 con fill IMAGE **del mismo `imageRef` (`e329aef4…`)** |
| Naturaleza | **Imagen rasterizada en escala de grises** (croma máxima 0 en todo el PNG). Todo se ha medido sobre el PNG |
| Propiedad | **No es nuestro**: lo pone Burger King. En el entregable va como `<footer-bk></footer-bk>` |
| Nivel Storybook | `Layouts/Footer Bk`, aproximación HTML + Bootstrap |
| `figma.png` | export REST 1440×722 · `figma@2x.png` 2880×1444 (para leer textos) |
| Medición | PNG 1x decodificado, cajas de tinta con umbral 40 sobre el fondo `#141414` |

## 1. Reparto vertical (y relativa a la imagen; cajas de tinta)

| Zona | y | Nota |
|---|---|---|
| Borde superior «rasgado» (papel roto) | 0–15 | blanco `#ffffff` por encima del corte (en x=3, blanco hasta y=14 y `#131313` desde y=16). Ojo: la franja de encima (`legal-links`) es `#f8f8f8`, no blanca |
| Fondo | 16–722 | `#141414` |
| Titulares de columna | 127–151 | tinta de mayúscula 128–146 (19 px) |
| Enlaces | 164 → 451 | un enlace cada **23 px** (164, 187, 210, 232, 255…) |
| Separador 1 | 515 | 1 px `#838383`, x 114 → 1325 |
| Fila inferior | 540–582 | textos legales a la izquierda · logo · idioma + redes |
| Separador 2 | 646 | 1 px, igual |
| «Configuración de cookies» | 670–685 | — |
| Fondo inferior | 685–722 | 37 px. Las esquinas inferiores tienen un **artefacto de la captura** (redondeo con gris `#49`–`#72` por fuera): no se reproduce |

## 2. Medidas horizontales y mapeo

Contenido: x **114 → 1325** (1212 de ancho, centrado). **4 columnas** con paso de **303** (= 1212 / 4) en x = 114 · 417 · 720 · 1023.

| Elemento | Medida / estimación | Bootstrap 4.1.3 / SCSS |
|---|---|---|
| Pie | 1440 × 722, `#141414` | `footer.footer-bk` · `padding: 112px 0 37px` (aprox.: tinta del titular en 128 menos el sangrado del interlineado) |
| Borde rasgado | 16 px | `.footer-bk::before` con SVG de onda o `clip-path` (aproximación; P1) |
| Contenedor | 1212 | `.footer-bk__inner` · `max-width: 1212px; margin: 0 auto` |
| Columnas | 4 × 303 | `.row` + `.col-md-3` (o una rejilla propia de 4 × 303 sin gutter) |
| Titular | `#ededed` · ≈ **26 px** (mayúscula 19 px) · Flame negrita (**estimación visual**) | `h2.footer-bk__heading` |
| Titular → 1.er enlace | 36 px de mayúscula a mayúscula | `margin-bottom` ≈ 12 |
| Enlace | `#a7a7a7` · ≈ **16 px** (mayúscula 12–13 px) · interlineado **23 px** · Flame Sans regular (estimación) | `ul.list-unstyled` · `a.footer-bk__link` |
| Separadores | 1 px `#838383` | `hr.footer-bk__rule` (`border-top-color: #838383; margin: 0`) |
| Texto legal pequeño | `#8a8a8a` · ≈ 12 px · 2 líneas, tinta en 540 y 572 (paso 32) | `.footer-bk__small` |
| Logotipo «BURGER KING» | blanco `#ededed`, 159 × 19 en x=723, y=551 | `img`/SVG. **Arranca en la columna 3 (x 720), no centrado en la página** (el centro de la página es 720 y el del logo, 802) |
| Idioma | globo 16 × 15 (x 1144) + «ES» (x 1166) | `.footer-bk__lang` |
| Redes | Instagram x1196 23×23 · Facebook x1231 25×25 · YouTube x1266 25×18 · TikTok x1302 24×25 · alineadas a la derecha en 1325 · centradas en y ≈ 559 | `.footer-bk__social.d-flex` · gap ≈ 10–12 |
| «Configuración de cookies» | `#ededed` · ≈ 16 px negrita · x 114 | `button`/`a.footer-bk__cookies` |

Precisión de ±1 px en cajas. Los tamaños de fuente son estimaciones.

## 3. Hooks

No aplica. Entregable: `<footer-bk></footer-bk>`.

## 4. Contenido → `datos-footer-bk.js` (transcrito de la imagen @2x)

```json
{
  "columns": [
    { "title": "Descubre", "links": ["MyBK", "King Jr", "Cumpleaños y eventos"] },
    { "title": "Información y soporte", "links": ["Valores Nutricionales", "Listado de Alérgenos", "Sin Gluten", "Contacto", "Preguntas frecuentes"] },
    { "title": "Sobre nosotros", "links": ["Trabaja con nosotros", "Encuentra tu restaurante", "Sostenibilidad"] },
    { "title": "Legal y promociones", "links": [
      "Aviso Legal",
      "Términos y Condiciones Generales",
      "Términos y Condiciones MyBurgerKing",
      "Política de Cookies",
      "Política de Privacidad",
      "Politica Privacidad Chatbot",
      "Bases legales y términos de promociones",
      "Bases Promocionales Licencias",
      "Bases Promocionales Grand King",
      "Adenda Grand King",
      "Bases Promocionales Sorteo Tailandia",
      "Promoción Pringles Vigilantes del Bigote",
      "Bases Promocionales Burger x Pringles"
    ] }
  ],
  "phone": "También puedes pedir por teléfono: 911 933 933",
  "copyright": "TM & 2026 Burger King Corporation. Todos los derechos reservados.",
  "logoAlt": "Burger King",
  "language": "ES",
  "social": ["Instagram", "Facebook", "YouTube", "TikTok"],
  "cookies": "Configuración de cookies"
}
```

- «Politica Privacidad Chatbot» va **sin tilde** en la imagen. Se transcribe tal cual.
- Los `href` no se leen en una imagen y no se inventan: en Storybook, `#`.
- Los nombres de las redes salen de los iconos (Instagram, Facebook, YouTube, TikTok).

## 5. Assets

| Asset | Fuente | Nota |
|---|---|---|
| Imagen del pie | `8206:300` (`imageRef e329aef4…`) | `reports/footer-bk/figma(@2x).png`. Plan B: la propia imagen como `<img>` en Storybook |
| Logotipo BURGER KING, iconos de redes y globo | dentro de la imagen | no extraíbles como vector: SVG oficial o recorte @2x (P1) |
| Borde rasgado | dentro de la imagen | SVG de onda aproximado (P1) |

## 6. Interacción / JS

Ninguna (referencia estática).

## 7. Responsive 390 px · **decisión nuestra**

Sin diseño móvil. Propuesta para Storybook: columnas apiladas (`col-12`), fila inferior en columna (texto legal →
logo → redes) y separadores a ancho completo. Es una aproximación nuestra, no el pie real de BK.

## 8. Accesibilidad

`footer` con `nav aria-label="Pie"`, titulares `h2` y listas `ul`. Redes con `aria-label` («Instagram de Burger King»…).
Contraste calculado: `#a7a7a7` sobre `#141414` ≈ 7,7:1 y `#8a8a8a` ≈ 5,3:1. Los dos pasan AA.

## 9. Preguntas

1. ¿Podemos usar SVG oficiales (logotipo, iconos, borde rasgado) o reproducimos la imagen tal cual?
2. La captura está en grises. ¿Reproducimos los grises o los colores reales del pie de burgerking.es?
3. La imagen trae enlaces de otras campañas («Grand King», «Pringles», «Sorteo Tailandia»). ¿Se mantiene la lista tal cual (es del pie real de BK) o se pone al día con las bases del Roscón?
4. ¿Contrato de `<footer-bk></footer-bk>`? (igual que en `header-bk`)
