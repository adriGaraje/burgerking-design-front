// Story de `campaign-notice`: el marcado sale de `renderCampaignNotice(args)`. Dos
// variantes con contenido real del wireframe. El `play` de la primera vigila que el
// `.html` publicado y el render por defecto no se separen.
import { expect, within } from 'storybook/test'
import html from './campaign-notice.html?raw'
import { sinComentarios } from '../../stories/lib/hooks.js'
import { VARIANTES, renderCampaignNotice } from './datos-campaign-notice.js'

const ENTRE = VARIANTES.entreOleadas
const FINAL = VARIANTES.final

// Espacios fuera: Prettier reparte atributos y texto por líneas en el `.html`.
const normaliza = (s) =>
  s
    .replace(/\s+/g, ' ')
    .replace(/\s*([<>])\s*/g, '$1')
    .trim()

export default {
  title: 'Snippets/Campaign Notice',
  tags: ['WIP'],
  render: (args) => renderCampaignNotice(args),
  args: { ...ENTRE },
  argTypes: {
    logoSrc: {
      name: 'Logo source',
      control: 'text',
      description: 'Ruta del logo de la campaña (SVG). Cambia con cada etapa.',
      table: { category: 'Logo' },
    },
    logoAlt: {
      name: 'Logo alt',
      control: 'text',
      description: 'Texto alternativo del logo: el nombre de la campaña.',
      table: { category: 'Logo' },
    },
    title: {
      name: 'Title',
      control: 'text',
      description: 'Titular del aviso.',
      table: { category: 'Text' },
    },
    headingLevel: {
      name: 'Heading level',
      control: 'inline-radio',
      options: ['h1', 'h2'],
      description: 'h1 cuando abre la página (Entre oleadas, Final); h2 si va debajo de otro hero.',
      table: { category: 'Text' },
    },
    text: {
      name: 'Text',
      control: 'text',
      description: 'Copy del aviso. Vacío, no se pinta.',
      table: { category: 'Text' },
    },
    ctaLabel: {
      name: 'CTA label',
      control: 'text',
      description: 'Texto del botón (abre en pestaña nueva). Vacío, no se pinta.',
      table: { category: 'CTA' },
    },
    ctaHref: {
      name: 'CTA href',
      control: 'text',
      description: 'Enlace del botón.',
      table: { category: 'CTA' },
    },
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-852',
    },
    docs: {
      description: {
        component:
          'Hero corto de aviso: titular, copy y botón a la izquierda, logo de la campaña a la derecha. Abre las páginas de Entre oleadas y de Final de campaña; su aire de arriba suma `--burgerking-design-front-header-space` para dejar sitio a la barra del sitio.\n\n' +
          'Por Controls se cambian logo y alt, titular (y su nivel), copy y texto y enlace del botón. Las dos variantes del diseño solo cambian titular y copy: `Between Waves` y `Campaign End`.\n\n' +
          '**Pendiente de diseño:** los dos copys son descripciones de relleno (con una «X» sin cifra); el enlace del botón y por qué lleva el icono de pestaña nueva; si el logo cambia por etapa. Colores y tipografía, provisionales de marca: el gris del fondo pasa a crema (`$brand-surface-alt`) y el negro del botón, al rojo primario. Móvil, decisión nuestra: logo arriba centrado y texto a la izquierda.',
      },
      source: { language: 'html', transform: (_c, ctx) => renderCampaignNotice(ctx.args) },
    },
  },
}

export const BetweenWaves = {
  play: async ({ canvasElement }) => {
    await expect(normaliza(sinComentarios(html))).toBe(normaliza(renderCampaignNotice(ENTRE)))
    const lienzo = within(canvasElement)
    await expect(lienzo.getByRole('heading', { level: 1, name: ENTRE.title })).toBeInTheDocument()
    await expect(lienzo.getByRole('link', { name: /Ir a la Homepage/ })).toBeInTheDocument()
  },
}

export const CampaignEnd = {
  args: { ...FINAL },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-541',
    },
  },
  play: async ({ canvasElement }) => {
    const lienzo = within(canvasElement)
    await expect(lienzo.getByRole('heading', { level: 1, name: FINAL.title })).toBeInTheDocument()
  },
}
