// Contenido de `faqs` por variante, transcrito LITERAL del wireframe (spec §4, lorem
// incluido) y el pintor del snippet. El `.html` de la carpeta es `renderFaqs(VARIANTES.oleada1)`.
//
// El acordeón es el `collapse` de Bootstrap 4.1.3 por data-api: sin JS propio. El
// patrón es el de la APG: cada pregunta es un `<button>` dentro de un `<h3>`, con
// `aria-expanded` y `aria-controls`; la respuesta es una `region` etiquetada por su
// pregunta. `aria-expanded` lo mantiene al día el propio Bootstrap.

const attr = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed sapien orci. Praesent ac est ut magna lobortis posuere sodales vitae risus. Maecenas luctus dui magna, quis hendrerit tortor vulputate eu. Nunc eu ornare dui, non cursus mi. Aenean condimentum lorem id nibh lacinia congue. Donec ac pharetra risus. Sed risus odio, posuere vitae gravida a, feugiat eu eros. Donec lectus libero, imperdiet vitae porta sed, rutrum quis velit. Nulla aliquam aliquam dui non accumsan. Donec tincidunt cursus massa quis feugiat.'

export const VARIANTES = {
  // Oleada 1 (`8206:253`) = Oleada 2 (`8206:790`). No existe en Entre oleadas ni en el Final.
  oleada1: {
    id: 'faqs',
    title: '¿Tienes alguna duda?',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    items: [
      { question: 'Lorem ipsum dolor sit amet?', answer: LOREM },
      { question: 'Lorem ipsum dolor sit amet?', answer: LOREM },
      { question: 'Lorem ipsum dolor sit amet?', answer: LOREM },
      { question: 'Lorem ipsum dolor sit amet?', answer: LOREM },
      { question: 'Lorem ipsum dolor sit amet?', answer: LOREM },
    ],
    singleOpen: true,
    firstOpen: true,
    // CTA `8206:288`: oculto en el wireframe. El `href` no está en el diseño.
    showCta: false,
    ctaLabel: 'Ir a preguntas frecuentes',
    ctaHref: '#',
  },
}

// El chevron `expand_more` (Material Symbols, spec §5). Uno solo: abierto es el
// mismo glifo girado 180°, y lo gira el SCSS según `aria-expanded`.
const CHEVRON = `<svg class="faqs__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M11.06 5.53 8 8.58 4.94 5.53 4 6.47l4 4 4-4-.94-.94Z" fill="currentColor" /></svg>`

const pregunta = ({ question, answer }, i, { id, singleOpen, firstOpen }) => {
  const abierta = firstOpen && i === 0
  return `      <div class="faqs__item">
        <h3 class="faqs__heading">
          <button class="faqs__question${abierta ? '' : ' collapsed'}" id="${id}-question-${i + 1}" type="button" data-toggle="collapse" data-target="#${id}-panel-${i + 1}" aria-expanded="${abierta}" aria-controls="${id}-panel-${i + 1}">
            <span class="faqs__question-text">${question}</span>
            ${CHEVRON}
          </button>
        </h3>
        <div class="collapse${abierta ? ' show' : ''} faqs__panel" id="${id}-panel-${i + 1}" role="region" aria-labelledby="${id}-question-${i + 1}"${singleOpen ? ` data-parent="#${id}-accordion"` : ''}>
          <div class="faqs__answer">${answer}</div>
        </div>
      </div>`
}

// Desestructurar campo a campo: Storybook llama al render con `{}` (L-020).
export const renderFaqs = ({
  id = VARIANTES.oleada1.id,
  title = VARIANTES.oleada1.title,
  subtitle = VARIANTES.oleada1.subtitle,
  items = VARIANTES.oleada1.items,
  singleOpen = VARIANTES.oleada1.singleOpen,
  firstOpen = VARIANTES.oleada1.firstOpen,
  showCta = VARIANTES.oleada1.showCta,
  ctaLabel = VARIANTES.oleada1.ctaLabel,
  ctaHref = VARIANTES.oleada1.ctaHref,
} = {}) => {
  const lista = (items ?? [])
    .filter((it) => it && it.question)
    .map((it, i) => pregunta(it, i, { id, singleOpen, firstOpen }))
    .join('\n')

  const cta =
    showCta && ctaLabel
      ? `
    <div class="faqs__ctas d-flex justify-content-center">
      <a class="btn btn-primary faqs__cta" href="${attr(ctaHref || '#')}">${ctaLabel}</a>
    </div>`
      : ''

  return `<section class="faqs" aria-labelledby="${id}-title">
  <div class="faqs__inner">
    <div class="faqs__header text-center">
      <h2 class="faqs__title" id="${id}-title">${title}</h2>${
        subtitle
          ? `
      <p class="faqs__subtitle">${subtitle}</p>`
          : ''
      }
    </div>
    <div class="faqs__list" id="${id}-accordion">
${lista}
    </div>${cta}
  </div>
</section>`
}
