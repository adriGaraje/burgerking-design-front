# Pixel-check · páginas del Roscón del King · 2026-10-19

Modo **ligero**: la referencia son wireframes grises y la piel es provisional (marca BK), así que se
compara **estructura, orden y alturas de bloque**, no color ni tipografía. Capturas del Ojo en
`shots/`; medidas en `shots/medidas.json` y remedición del orquestador con `medir:story`.

## Denominador

4 páginas × (orden de bloques · alturas a 1440 · lectura y desborde a 390) = **12 comprobaciones**.

| Comprobación | Wave 1 | Wave 2 | Coming Soon | Winners |
|---|---|---|---|---|
| Orden de bloques = wireframe | ✔ | ✔ | ✔ | ✔ |
| Alturas a 1440 (±10 % por bloque) | ✔ salvo how-to-play | ✔ salvo how-to-play | ✔ | ✔ |
| 390: sin scroll horizontal, se lee | ✔ | ✔ | ✔ | ✔ |

**Score: 10 / 12.** Las dos que no cuadran son el mismo bloque, y la diferencia es una decisión
(abajo). Consola limpia (solo un 404 de `favicon.ico`); 24/24 `play` en verde.

## Alturas a 1440 (Figma → Storybook)

| Bloque | Figma | SB 1.ª pasada | SB 2.ª pasada | Clase |
|---|---|---|---|---|
| header-bk | 74 | 74 | — | — |
| campaign-hero | 1023 | 994 | — | ✔ |
| how-to-play | 500 | 586 | 582 | **decisión**: el wireframe fija 500 y su contenido (445) no cabe con su padding de 40; aquí padding real (spec, §medidas) |
| qr-access | 307 | 312 | — | ✔ |
| menu-grid | 784 | 808 | 800 | ✔ |
| faqs | 628 | 661 | — | ✔ (tipografía provisional) |
| legal-links | 100 | 104 | — | ✔ |
| footer-bk | 722 | 803 | — | **heredado**: es de BK; la columna «Legal y promociones» parte líneas con el fallback de Flame Sans |

## Segunda pasada · tras `b6e3661`

- `how-to-play__step-title` y `menu-grid__name`: de `h3` a `button` en negrita (el wireframe los pinta a 16 bold). Nuestro.
- `legal-links`: filete superior. En las landings cortas se fundía con el crema del aviso (en el wireframe tiene su propio gris). Nuestro.
- Winners: «¡Nos vemos el año que viene!» en otra línea en Figma → es el ancho de la caja de texto con Comic Sans, no un salto en el copy. Sin cambio.

## Fuera de alcance (diseño)

El vídeo de campaña, la cuenta atrás y los CTAs del hero están ocultos en el wireframe: no salen en las
páginas y cada snippet los tiene como opción. Oleada 2 = Oleada 1 byte a byte en Figma.
