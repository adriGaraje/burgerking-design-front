// Página · Landing de final de campaña del Roscón del King (wireframe `8206:539`).
import { cabeceraDePagina, compruebaCabecera } from '../cabecera-de-pagina.js'
import { compruebaSnippets, marcaSnippets } from '../marca-snippets.js'
import { compruebaPiezas, iniciaLanding } from '../monta-landing.js'
import { footerBk } from '../../layouts/footer-bk/datos-footer-bk.js'
import {
  VARIANTES as AVISO,
  renderCampaignNotice,
} from '../../modules/campaign-notice/datos-campaign-notice.js'
import {
  VARIANTES as LEGALES,
  renderLegalLinks,
} from '../../modules/legal-links/datos-legal-links.js'

const secciones = (args) => [
  renderCampaignNotice({ ...AVISO.final, ...args }),
  renderLegalLinks(LEGALES.entreOleadas),
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
  title: 'Pages/Roscon King Winners',
  tags: ['WIP'],
  render: monta,
  args: {
    title: AVISO.final.title,
    text: AVISO.final.text,
  },
  argTypes: {
    title: {
      name: 'Title',
      control: 'text',
      description: 'Titular del aviso (el `h1` de la página).',
    },
    text: { name: 'Text', control: 'text', description: 'Texto del aviso.' },
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-539',
    },
    docs: {
      description: {
        component: [
          'La landing de **final de campaña**: «¡Ya tenemos ganadores!». A partir del 6 de enero, para que quien tenga códigos sepa que ya no puede canjearlos. Falta fecha de despublicación.',
          'Es la landing corta: aviso con el logo y enlaces legales. La cabecera y el footer son de',
          'Burger King y en el código salen como `<header-bk>` y `<footer-bk>`.',
          '',
          '⚠️ **Wireframe, no diseño:** colores y tipografía provisionales de la marca BK.',
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
    await compruebaPiezas(canvasElement, ['campaign-notice', 'legal-links'])
  },
}
