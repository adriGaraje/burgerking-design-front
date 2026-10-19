// Contenido y marcado de `campaign-hero` (Snippet): el hero de la Oleada 1 (Figma
// 8206:99; la Oleada 2, 8206:636, es idéntica al píxel). Transcrito LITERAL de
// reports/campaign-hero/spec.md §4: la entradilla y los premios son relleno del
// wireframe (lorem, «Premio n», imagen gris).
//
// `renderCampaignHero(args)` devuelve el HTML que se pega en el CMS. El `.html` de la
// carpeta es exactamente `renderCampaignHero(VARIANTES.oleada1)` (lo vigila el `play`).
// Compone el carrusel llamando al render de `prize-carousel`: un solo marcado.

import {
  VARIANTES as CARRUSEL,
  renderPrizeCarousel,
} from '../../components/prize-carousel/datos-prize-carousel.js'

const IMG = '/images/roscon-king'

const attr = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')

export const VARIANTES = {
  oleada1: {
    logoSrc: `${IMG}/logo-roscon-del-king.svg`,
    logoAlt: 'Roscón del King',
    // Salto forzado tras «rey» (8206:121): un salto de línea en el control; en móvil no se aplica.
    title: 'Encuentra al rey\npara ganar hasta 50.000 €',
    text: 'Premio de hasta 50.000 €, copy mencionando premios. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam urna purus, cursus eu felis non.',
    // Fila de CTAs 8206:123: OCULTA en el wireframe.
    showCtas: false,
    // `href` no está en el nodo (spec §4, a `null`): «#» hasta que lo den.
    primaryCtaLabel: 'Ver menús',
    primaryCtaHref: '#',
    secondaryCtaLabel: '¿Cómo jugar?',
    secondaryCtaHref: '#how-to-play',
    showPrizes: true,
    prizesTitle: CARRUSEL.oleada1.title,
    prizes: CARRUSEL.oleada1.items,
  },
}

const D = VARIANTES.oleada1

// Icono `launch` (8206:129), en línea para que tome el color del texto.
const LAUNCH = `<svg class="campaign-hero__cta-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M12.6667 12.6667H3.33333V3.33333H8V2H3.33333C2.59333 2 2 2.6 2 3.33333V12.6667C2 13.4 2.59333 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V8H12.6667V12.6667ZM9.33333 2V3.33333H11.7267L5.17333 9.88667L6.11333 10.8267L12.6667 4.27333V6.66667H14V2H9.33333Z" fill="currentColor" /></svg>`

// El salto del titular solo desde md: en móvil el texto fluye.
const titular = (t) =>
  String(t ?? '')
    .split('\n')
    .join('<br class="d-none d-md-inline" /> ')

const ctas = ({ primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref }) => `
    <div class="campaign-hero__ctas d-flex flex-wrap justify-content-center">
      <a class="btn btn-primary campaign-hero__cta" href="${attr(primaryCtaHref)}" target="_blank" rel="noopener">
        <span class="campaign-hero__cta-label">${primaryCtaLabel}</span>
        <span class="sr-only">(se abre en una pestaña nueva)</span>
        ${LAUNCH}
      </a>
      <a class="btn btn-outline-secondary campaign-hero__cta" href="${attr(secondaryCtaHref)}">
        <span class="campaign-hero__cta-label">${secondaryCtaLabel}</span>
      </a>
    </div>`

// Desestructurar campo a campo: Storybook llama al render con `{}` (L-020).
export function renderCampaignHero({
  logoSrc = D.logoSrc,
  logoAlt = D.logoAlt,
  title = D.title,
  text = D.text,
  showCtas = D.showCtas,
  primaryCtaLabel = D.primaryCtaLabel,
  primaryCtaHref = D.primaryCtaHref,
  secondaryCtaLabel = D.secondaryCtaLabel,
  secondaryCtaHref = D.secondaryCtaHref,
  showPrizes = D.showPrizes,
  prizesTitle = D.prizesTitle,
  prizes = D.prizes,
} = {}) {
  const premios = showPrizes
    ? renderPrizeCarousel({
        id: 'campaign-hero-prizes',
        title: prizesTitle,
        items: prizes,
        className: 'campaign-hero__prizes',
      })
    : ''

  return `<section class="campaign-hero text-center" aria-labelledby="campaign-hero-title">
  <div class="campaign-hero__inner">
    <img class="campaign-hero__logo img-fluid d-block mx-auto" src="${attr(logoSrc)}" alt="${attr(logoAlt)}" width="332" height="235" />
    <div class="campaign-hero__body mx-auto">
      <h1 class="campaign-hero__title mb-0" id="campaign-hero-title">${titular(title)}</h1>
      ${text ? `<p class="campaign-hero__text mb-0">${text}</p>` : ''}
    </div>${showCtas ? ctas({ primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref }) : ''}
  </div>
  ${premios}
</section>
`
}
