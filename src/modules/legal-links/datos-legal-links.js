// Contenido de `legal-links` por variante, transcrito del wireframe (spec §4) y el
// pintor del snippet. El `.html` de la carpeta es `renderLegalLinks(VARIANTES.oleada1)`.
//
// Corrección sobre el wireframe: «Pólitica» → «Política» (errata en los cuatro frames).
// Los `href` no están en el diseño: van a `#` hasta que lleguen las URLs.

// Comillas y ángulos fuera de los atributos: un `"` en una URL cerraría el atributo.
const attr = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')

export const ALINEACIONES = ['start', 'center']

export const VARIANTES = {
  // Oleada 1 / Oleada 2 (`8206:295` / `8206:832`): dos enlaces, a la izquierda. El 3.º,
  // «Preguntas frecuentes» (`8206:299`), está oculto en el wireframe y no se pinta.
  oleada1: {
    align: 'start',
    links: [
      { label: 'Condiciones legales', href: '#' },
      { label: 'Política de privacidad', href: '#' },
    ],
  },
  // Entre oleadas / Final (`8206:882` / `8206:571`): cuatro enlaces, centrada.
  entreOleadas: {
    align: 'center',
    links: [
      { label: 'Condiciones legales', href: '#' },
      { label: 'Política de privacidad', href: '#' },
      { label: 'Política de cookies', href: '#' },
      { label: 'Preguntas frecuentes', href: '#' },
    ],
  },
}

// En móvil la fila se centra siempre (decisión nuestra); la alineación a la izquierda
// solo se aplica desde `md`.
const JUSTIFICA = {
  start: 'justify-content-center justify-content-md-start',
  center: 'justify-content-center',
}

// Desestructurar campo a campo: Storybook llama al render con `{}` (L-020).
export const renderLegalLinks = ({
  align = VARIANTES.oleada1.align,
  links = VARIANTES.oleada1.links,
} = {}) => {
  const items = (links ?? [])
    .filter((l) => l && l.label)
    .map(
      (l) => `      <li class="legal-links__item">
        <a class="legal-links__link" href="${attr(l.href || '#')}">${l.label}</a>
      </li>`
    )
    .join('\n')

  return `<nav class="legal-links" aria-label="Enlaces legales">
  <div class="legal-links__inner">
    <ul class="legal-links__list list-unstyled d-flex flex-wrap ${JUSTIFICA[align] ?? JUSTIFICA.center} mb-0">
${items}
    </ul>
  </div>
</nav>`
}
