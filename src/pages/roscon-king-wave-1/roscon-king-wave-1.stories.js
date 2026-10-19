// Página · Landing Oleada 1 del Roscón del King (wireframe `8206:97`).
import { cabeceraDePagina, compruebaCabecera } from '../cabecera-de-pagina.js'
import { compruebaSnippets, marcaSnippets } from '../marca-snippets.js'
import { compruebaPiezas, iniciaLanding } from '../monta-landing.js'
import { footerBk } from '../../layouts/footer-bk/datos-footer-bk.js'
import {
  VARIANTES as HERO,
  renderCampaignHero,
} from '../../modules/campaign-hero/datos-campaign-hero.js'
import { renderHowToPlay } from '../../modules/how-to-play/datos-how-to-play.js'
import { renderQrAccess } from '../../modules/qr-access/datos-qr-access.js'
import { renderMenuGrid } from '../../modules/menu-grid/datos-menu-grid.js'
import { renderFaqs } from '../../modules/faqs/datos-faqs.js'
import {
  VARIANTES as LEGALES,
  renderLegalLinks,
} from '../../modules/legal-links/datos-legal-links.js'

// El nombre de la campaña cambia de una etapa a otra (Roscón del King → «2» → «De vuelta»…):
// logo, titular y entradilla del hero se cambian desde los Controls de la página.
const secciones = (args) => [
  renderCampaignHero({ ...HERO.oleada1, ...args }),
  renderHowToPlay(),
  renderQrAccess(),
  renderMenuGrid(),
  renderFaqs(),
  renderLegalLinks(LEGALES.oleada1),
]

const monta = (args) => {
  const raiz = document.createElement('div')
  raiz.innerHTML = [cabeceraDePagina(), '<main>', ...secciones(args), '</main>', footerBk()].join(
    '\n'
  )
  marcaSnippets(raiz)
  return iniciaLanding(raiz)
}

export default {
  title: 'Pages/Roscon King Wave 1',
  tags: ['WIP'],
  render: monta,
  args: {
    logoSrc: HERO.oleada1.logoSrc,
    logoAlt: HERO.oleada1.logoAlt,
    title: HERO.oleada1.title,
    text: HERO.oleada1.text,
  },
  argTypes: {
    logoSrc: { name: 'Logo', control: 'text', description: 'Ruta del logo de la campaña.' },
    logoAlt: {
      name: 'Logo alt',
      control: 'text',
      description: 'Texto alternativo del logo: el nombre de la campaña.',
    },
    title: {
      name: 'Title',
      control: 'text',
      description: 'Titular del hero (el `h1` de la página).',
    },
    text: { name: 'Text', control: 'text', description: 'Entradilla del hero.' },
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-97',
    },
    docs: {
      description: {
        component: [
          'La landing de la **Oleada 1**, montada con los snippets tal cual se pegan en el CMS. La',
          'cabecera y el footer son de Burger King: se ven para entender la página, y en el código',
          'salen como `<header-bk>` y `<footer-bk>`.',
          '',
          'El logo, el titular y la entradilla se cambian desde los Controls, para las etapas en que',
          'BK relanza la landing con otro nombre. El resto de cada pieza se edita en su snippet.',
          '',
          'Del 8 al 20 de diciembre (según la anotación del wireframe).',
          '',
          '⚠️ **Wireframe, no diseño:** estructura y medidas del Figma; colores y tipografía',
          'provisionales de la marca BK. El vídeo de campaña, la cuenta atrás y los CTAs del hero están',
          '**ocultos en el wireframe** y por eso no salen; cada snippet los tiene como opción.',
        ].join(' '),
      },
      source: { language: 'html', transform: (_c, ctx) => monta(ctx.args).innerHTML },
    },
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    await compruebaCabecera(canvasElement)
    await compruebaSnippets(canvasElement)
    await compruebaPiezas(canvasElement, [
      'campaign-hero',
      'how-to-play',
      'qr-access',
      'menu-grid',
      'faqs',
      'legal-links',
    ])
  },
}
