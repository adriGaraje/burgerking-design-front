// Story de `campaign-hero`: el marcado sale de `renderCampaignHero(args)` y el JS del
// carrusel se inicia sobre la caja de la story. El `play` vigila que el `.html`
// publicado y el render por defecto no se separen.
import { expect, within } from 'storybook/test'
import html from './campaign-hero.html?raw'
import { sinComentarios } from '../../stories/lib/hooks.js'
import { VARIANTES, renderCampaignHero } from './datos-campaign-hero.js'
import { initPrizeCarousel } from '../../components/prize-carousel/prize-carousel.js'

const D = VARIANTES.oleada1

// Espacios fuera: Prettier reparte atributos y texto por líneas en el `.html`.
const normaliza = (s) =>
  s
    .replace(/\s+/g, ' ')
    .replace(/\s*([<>])\s*/g, '$1')
    .trim()

export default {
  title: 'Snippets/Campaign Hero',
  tags: ['WIP'],
  render: (args) => {
    const caja = document.createElement('div')
    caja.innerHTML = renderCampaignHero(args)
    initPrizeCarousel(caja)
    return caja
  },
  args: { ...D },
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
      description: 'Titular (h1). Un salto de línea fuerza el corte, solo desde tablet.',
      table: { category: 'Text' },
    },
    text: {
      name: 'Text',
      control: 'text',
      description: 'Entradilla. Vacía, no se pinta.',
      table: { category: 'Text' },
    },
    showCtas: {
      name: 'Show CTAs',
      control: 'boolean',
      description: 'Fila de dos botones, oculta en el wireframe (8206:123).',
      table: { category: 'CTAs' },
    },
    primaryCtaLabel: {
      name: 'Primary CTA label',
      control: 'text',
      description: 'Texto del botón principal (abre en pestaña nueva).',
      if: { arg: 'showCtas' },
      table: { category: 'CTAs' },
    },
    primaryCtaHref: {
      name: 'Primary CTA href',
      control: 'text',
      description: 'Enlace del botón principal. Pendiente: el diseño no lo trae.',
      if: { arg: 'showCtas' },
      table: { category: 'CTAs' },
    },
    secondaryCtaLabel: {
      name: 'Secondary CTA label',
      control: 'text',
      description: 'Texto del botón secundario.',
      if: { arg: 'showCtas' },
      table: { category: 'CTAs' },
    },
    secondaryCtaHref: {
      name: 'Secondary CTA href',
      control: 'text',
      description: 'Enlace del botón secundario: el ancla de «Cómo jugar».',
      if: { arg: 'showCtas' },
      table: { category: 'CTAs' },
    },
    showPrizes: {
      name: 'Show prizes',
      control: 'boolean',
      description: 'Bloque de premios (carrusel).',
      table: { category: 'Prizes' },
    },
    prizesTitle: {
      name: 'Prizes title',
      control: 'text',
      description: 'Título del bloque de premios (h2).',
      if: { arg: 'showPrizes' },
      table: { category: 'Prizes' },
    },
    prizes: {
      name: 'Prizes',
      control: 'object',
      description: 'Lista de premios: `{ image, alt, label }`. Admite cualquier número.',
      if: { arg: 'showPrizes' },
      table: { category: 'Prizes' },
    },
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-99',
    },
    docs: {
      description: {
        component:
          'Hero de la campaña: logo, titular (h1), entradilla y, dentro, el carrusel de premios (`Basics/Prize Carousel`). Abre la landing de cada oleada; su aire de arriba suma `--burgerking-design-front-header-space` para dejar sitio a la barra del sitio.\n\n' +
          'Por Controls se cambia todo lo que varía entre etapas (Roscón del King, «2», «De vuelta»…): logo y su alt, titular, entradilla, el bloque de premios (mostrar u ocultar, título y lista) y la fila de dos CTAs, oculta en el wireframe y apagada por defecto (story `With Ctas`).\n\n' +
          '**Pendiente de diseño:** la entradilla es lorem; las fotos y nombres de premio, relleno; el enlace de «Ver menús»; el logo final y en color (hoy, el gris del wireframe). Colores y tipografía son los provisionales de marca: el gris del fondo pasa a crema (`$brand-surface-alt`) y el negro de los botones, al rojo primario. Móvil, decisión nuestra.',
      },
      source: { language: 'html', transform: (_c, ctx) => renderCampaignHero(ctx.args) },
    },
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    await expect(normaliza(sinComentarios(html))).toBe(normaliza(renderCampaignHero(D)))
    const lienzo = within(canvasElement)
    await expect(lienzo.getByRole('heading', { level: 1 })).toBeInTheDocument()
    await expect(lienzo.getByRole('heading', { level: 2, name: D.prizesTitle })).toBeInTheDocument()
    await expect(lienzo.getByRole('img', { name: D.logoAlt })).toBeInTheDocument()
    await expect(lienzo.queryByRole('link', { name: /Ver menús/ })).toBeNull()
  },
}

// La fila de CTAs del wireframe (8206:123), oculta en el diseño.
export const WithCtas = {
  args: { showCtas: true },
  play: async ({ canvasElement }) => {
    const lienzo = within(canvasElement)
    await expect(lienzo.getByRole('link', { name: /Ver menús/ })).toBeInTheDocument()
    await expect(lienzo.getByRole('link', { name: D.secondaryCtaLabel })).toBeInTheDocument()
  },
}
