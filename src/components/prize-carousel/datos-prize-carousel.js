// Contenido y marcado de `prize-carousel` (Basics): el carrusel «¿Qué puedes ganar?»
// del hero de la Oleada 1 (Figma 8206:134). Transcrito LITERAL de
// reports/campaign-hero/spec.md §4 (`prizes`). Las fotos y los nombres de premio son
// relleno del wireframe: la imagen es el placeholder gris y «Premio n» el texto.
//
// `renderPrizeCarousel(args)` devuelve el HTML que se pega en el CMS. El `.html` de la
// carpeta es exactamente `renderPrizeCarousel(VARIANTES.oleada1)` (lo vigila el `play`).

const IMG = '/images/roscon-king'

// Escapa lo que va dentro de un atributo: un `"` en un alt no puede cerrar la comilla.
const attr = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')

// `alt` propio: el nodo no lo trae (spec §4, a `null`). Describe la imagen y no repite el
// nombre del premio, que ya se lee justo debajo.
const premio = (n) => ({
  image: `${IMG}/placeholder.png`,
  alt: `Imagen provisional del premio ${n}`,
  label: `Premio ${n}`,
})

export const VARIANTES = {
  oleada1: {
    id: 'prize-carousel',
    title: '¿Qué puedes ganar?',
    // Propuesta nuestra (spec §4: el nodo no los trae).
    prevLabel: 'Premio anterior',
    nextLabel: 'Premio siguiente',
    // El wireframe trae 6; los premios 7 a 10 se añaden (mismo relleno) para que el
    // carrusel tenga recorrido a 1440 y se vea cómo se mueve.
    items: Array.from({ length: 10 }, (_, i) => premio(i + 1)),
  },
}

const D = VARIANTES.oleada1

// Chevron propio en vez del glifo «<» «>» en Afacad del wireframe (spec §5, pregunta 6).
const chevron = (puntos) =>
  `<svg class="prize-carousel__chevron" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="${puntos}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>`

const item = ({ image = '', alt = '', label = '' } = {}) => `
      <li class="prize-carousel__item">
        <figure class="prize-carousel__prize mb-0">
          <img class="prize-carousel__image" src="${attr(image)}" alt="${attr(alt)}" width="227" height="227" loading="lazy" />
          ${label ? `<figcaption class="prize-carousel__label mt-2">${label}</figcaption>` : ''}
        </figure>
      </li>`

// Desestructurar campo a campo: Storybook llama al render con `{}` (L-020).
// `className` deja que un snippet que lo compone le añada su clase de espaciado.
export function renderPrizeCarousel({
  id = D.id,
  title = D.title,
  prevLabel = D.prevLabel,
  nextLabel = D.nextLabel,
  items = D.items,
  className = '',
} = {}) {
  const lista = Array.isArray(items) ? items : []
  const clases = ['prize-carousel', className].filter(Boolean).join(' ')
  // Sin título, la región se nombra con la etiqueta por defecto.
  const nombre = title ? `aria-labelledby="${id}-title"` : `aria-label="${attr(D.title)}"`
  const titulo = title ? `<h2 class="prize-carousel__title" id="${id}-title">${title}</h2>` : ''

  return `<div class="${clases}" id="${id}" role="region" aria-roledescription="carousel" ${nombre} data-prize-carousel>
  ${titulo}
  <div class="prize-carousel__stage">
    <div class="prize-carousel__viewport" id="${id}-track" tabindex="0" data-prize-carousel-viewport>
      <ul class="prize-carousel__track list-unstyled mb-0">${lista.map(item).join('')}
      </ul>
    </div>
    <button class="prize-carousel__arrow prize-carousel__arrow--prev d-none d-md-flex" type="button" aria-controls="${id}-track" aria-label="${attr(prevLabel)}" data-prize-carousel-prev>
      ${chevron('M10 3 5 8l5 5')}
    </button>
    <button class="prize-carousel__arrow prize-carousel__arrow--next d-none d-md-flex" type="button" aria-controls="${id}-track" aria-label="${attr(nextLabel)}" data-prize-carousel-next>
      ${chevron('m6 3 5 5-5 5')}
    </button>
  </div>
</div>
`
}
