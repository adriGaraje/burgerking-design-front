// Story de «Menús disponibles». Los Controls son planos; `aPieza` los vuelve a la forma
// de VARIANTES, que es la que pinta `renderMenuGrid`. La cuenta atrás es la pieza
// `countdown`: su fecha por defecto es relativa a «ahora» para que no caduque.
import { expect, within } from 'storybook/test'
import html from './menu-grid.html?raw'
import { sinComentarios } from '../../stories/lib/hooks.js'
import { VARIANTES, renderMenuGrid } from './datos-menu-grid.js'
import { objetivoRelativo } from '../../components/countdown/datos-countdown.js'
import { initCountdown } from '../../components/countdown/countdown.js'

const V = VARIANTES.oleada1

// Igualdad de marcado sin depender del formato de Prettier.
const normaliza = (s) =>
  sinComentarios(s)
    .replace(/\s*\/?>/g, '>')
    .replace(/\s+</g, '<')
    .replace(/>\s+/g, '>')
    .replace(/\s+/g, ' ')
    .trim()

const aPieza = ({
  title = V.title,
  subtitle = V.subtitle,
  items = V.items,
  ctaLabel = V.cta.label,
  ctaHref = '',
  ctaExternal = V.cta.external,
  showCountdown = V.countdown.visible,
  countdownLabel = V.countdown.label,
  countdownTarget = '',
  countdownDoneText = '',
} = {}) => ({
  title,
  subtitle,
  items: Array.isArray(items) ? items : V.items,
  cta: { ...V.cta, label: ctaLabel, href: ctaHref || V.cta.href, external: ctaExternal },
  countdown: {
    ...V.countdown,
    visible: showCountdown,
    label: countdownLabel,
    end: countdownTarget || objetivoRelativo(),
    doneText: countdownDoneText,
  },
})

const render = (args) => {
  const caja = document.createElement('div')
  caja.innerHTML = renderMenuGrid(aPieza(args))
  initCountdown(caja)
  return caja
}

export default {
  title: 'Snippets/Menu Grid',
  tags: ['WIP'],
  render,
  args: {
    title: V.title,
    subtitle: V.subtitle,
    items: V.items,
    ctaLabel: V.cta.label,
    ctaHref: '#',
    ctaExternal: V.cta.external,
    showCountdown: false,
    countdownLabel: V.countdown.label,
    countdownTarget: '',
    countdownDoneText: '',
  },
  argTypes: {
    title: { name: 'Title', control: 'text', description: 'Titular de la sección.' },
    subtitle: {
      name: 'Subtitle',
      control: 'text',
      description: 'Entradilla bajo el titular. Vacía, no se pinta.',
    },
    items: {
      name: 'Menus',
      control: 'object',
      description:
        'Menús, en orden: `{ image, alt, name, href }`. Se pueden quitar o añadir; la última fila se centra. `image`: un nombre de fichero de `/images/roscon-king/` o una ruta. Con `href`, el ítem entero enlaza.',
    },
    ctaLabel: {
      name: 'CTA label',
      control: 'text',
      description: 'Texto del botón. Vacío, no se pinta.',
    },
    ctaHref: { name: 'CTA URL', control: 'text', description: 'Enlace del botón.' },
    ctaExternal: {
      name: 'CTA opens new tab',
      control: 'boolean',
      description: 'Abre en otra pestaña, con el icono de enlace externo.',
    },
    showCountdown: {
      name: 'Show countdown',
      control: 'boolean',
      description: 'Cuenta atrás bajo el botón. Oculta en el wireframe.',
      table: { category: 'Countdown' },
    },
    countdownLabel: {
      name: 'Countdown label',
      control: 'text',
      description: 'Texto sobre la cuenta atrás.',
      table: { category: 'Countdown' },
    },
    countdownTarget: {
      name: 'Countdown target date',
      control: 'text',
      description:
        'Fecha objetivo en ISO 8601 con zona (`2026-12-20T23:59:59+01:00`). Vacío: «ahora» + 9 d 10 h 25 min 27 s (solo en Storybook).',
      table: { category: 'Countdown' },
    },
    countdownDoneText: {
      name: 'Countdown done text',
      control: 'text',
      description: 'Texto al llegar a 0. Vacío: se queda en ceros.',
      table: { category: 'Countdown' },
    },
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-208',
    },
    docs: {
      description: {
        component:
          'Sección «Menús disponibles»: titular, entradilla, rejilla de menús (lista variable de imagen y nombre; la última fila se centra), botón «Ver menús» y, opcional, la cuenta atrás (`Basics/Countdown`), apagada por defecto como en el wireframe. Todo se cambia por Controls. **Pendiente de diseño:** los nombres, fotos y número reales de menús (los 7 «Menú Rosking» y las imágenes son del wireframe), la entradilla (lorem), la URL de «Ver menús», si la cuenta atrás entra en alguna oleada y su fecha. **Decisiones nuestras:** en móvil, 2 menús por fila; colores de marca provisionales. Con la cuenta atrás encendida, el snippet necesita además el CSS y el JS de `countdown`.',
      },
      source: { language: 'html', transform: (_c, ctx) => renderMenuGrid(aPieza(ctx.args)) },
    },
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    await expect(normaliza(html)).toBe(normaliza(renderMenuGrid(V)))
    const lienzo = within(canvasElement)
    await expect(lienzo.getByRole('heading', { level: 2, name: V.title })).toBeInTheDocument()
    await expect(lienzo.getAllByRole('listitem')).toHaveLength(V.items.length)
    await expect(canvasElement.querySelector('.countdown')).toBeNull()
  },
}

// La cuenta atrás que el wireframe dibuja oculta.
export const WithCountdown = {
  args: { showCountdown: true },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('[data-countdown-ready]')).not.toBeNull()
  },
}
