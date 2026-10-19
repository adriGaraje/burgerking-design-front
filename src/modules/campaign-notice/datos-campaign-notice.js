// Contenido y marcado de `campaign-notice` (Snippet): el hero corto de aviso, texto +
// logo. Dos variantes con contenido real del wireframe: Entre oleadas (8206:852) y
// Final de campaña (8206:541). Transcrito LITERAL de reports/campaign-notice/spec.md §4:
// los dos `text` son descripciones de relleno («Copy dando información…»).
//
// `renderCampaignNotice(args)` devuelve el HTML que se pega en el CMS. El `.html` de la
// carpeta es exactamente `renderCampaignNotice(VARIANTES.entreOleadas)` (lo vigila el `play`).

const IMG = '/images/roscon-king'

const attr = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')

// Lo común a las dos variantes: logo y botón son idénticos en el wireframe.
// `ctaHref`: el nodo no lo trae (spec §4, a `null`); «Homepage» es burgerking.es (spec §6).
const COMUN = {
  logoSrc: `${IMG}/logo-roscon-del-king.svg`,
  logoAlt: 'Roscón del King',
  ctaLabel: 'Ir a la Homepage',
  ctaHref: 'https://www.burgerking.es/',
  headingLevel: 'h1',
}

export const VARIANTES = {
  entreOleadas: {
    ...COMUN,
    title: 'Próximamente vuelve el Roscón del King',
    text: 'Copy dando información de que el primer premio ya se ha dado.',
  },
  final: {
    ...COMUN,
    title: '¡Ya tenemos ganadores!',
    text: 'Copy dando información que ya tenemos 2 ganadores de 50.000€ y hemos dado X premios. ¡Nos vemos el año que viene!',
  },
}

const D = VARIANTES.entreOleadas

// Icono `launch` (8206:861), en línea para que tome el color del texto.
const LAUNCH = `<svg class="campaign-notice__cta-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M12.6667 12.6667H3.33333V3.33333H8V2H3.33333C2.59333 2 2 2.6 2 3.33333V12.6667C2 13.4 2.59333 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V8H12.6667V12.6667ZM9.33333 2V3.33333H11.7267L5.17333 9.88667L6.11333 10.8267L12.6667 4.27333V6.66667H14V2H9.33333Z" fill="currentColor" /></svg>`

// Desestructurar campo a campo: Storybook llama al render con `{}` (L-020).
export function renderCampaignNotice({
  logoSrc = D.logoSrc,
  logoAlt = D.logoAlt,
  title = D.title,
  text = D.text,
  ctaLabel = D.ctaLabel,
  ctaHref = D.ctaHref,
  headingLevel = D.headingLevel,
} = {}) {
  const h = headingLevel === 'h2' ? 'h2' : 'h1'
  const boton = ctaLabel
    ? `
      <a class="btn btn-primary campaign-notice__cta" href="${attr(ctaHref)}" target="_blank" rel="noopener">
        <span class="campaign-notice__cta-label">${ctaLabel}</span>
        <span class="sr-only">(se abre en una pestaña nueva)</span>
        ${LAUNCH}
      </a>`
    : ''

  return `<section class="campaign-notice" aria-labelledby="campaign-notice-title">
  <div class="campaign-notice__inner d-flex flex-column flex-md-row align-items-md-center justify-content-md-center">
    <div class="campaign-notice__body">
      <${h} class="campaign-notice__title mb-0" id="campaign-notice-title">${title}</${h}>
      ${text ? `<p class="campaign-notice__text mb-0">${text}</p>` : ''}${boton}
    </div>
    <img class="campaign-notice__logo img-fluid order-first order-md-last" src="${attr(logoSrc)}" alt="${attr(logoAlt)}" width="332" height="235" />
  </div>
</section>
`
}
