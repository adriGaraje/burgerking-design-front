// Snippet `faqs`: el `.html` es el snippet que se copia; `renderFaqs()` lo pinta con
// los Controls. El acordeón lo mueve el data-api de Bootstrap 4 (jQuery + bootstrap.js,
// que en Storybook carga `preview.js` y en el sitio pone la página).
import { expect, userEvent, waitFor, within } from 'storybook/test'
import html from './faqs.html?raw'
import { sinComentarios } from '../../stories/lib/hooks.js'
import { VARIANTES, renderFaqs } from './datos-faqs.js'

const normaliza = (s) =>
  sinComentarios(s)
    .replace(/\s+/g, ' ')
    .replace(/\s*([<>])\s*/g, '$1')
    .trim()

export default {
  title: 'Snippets/Faqs',
  tags: ['WIP'],
  render: (args) => renderFaqs(args),
  args: { ...VARIANTES.oleada1 },
  argTypes: {
    id: {
      name: 'Id prefix',
      control: 'text',
      description:
        'Prefijo de los ids del acordeón (`<prefijo>-accordion`, `<prefijo>-panel-N`…). Cámbialo solo si una página monta dos FAQ.',
    },
    title: { name: 'Title', control: 'text', description: 'Titular de la sección (`h2`).' },
    subtitle: {
      name: 'Intro',
      control: 'text',
      description: 'Entradilla bajo el titular. Vacía, no se pinta.',
    },
    items: {
      name: 'Questions',
      control: 'object',
      description:
        'Preguntas, en orden: `{ question, answer }`. Admite cualquier número. La respuesta admite HTML en línea.',
    },
    singleOpen: {
      name: 'Single open',
      control: 'boolean',
      description:
        'Si está activo, al abrir una pregunta se cierra la que estuviera abierta (`data-parent` de Bootstrap).',
    },
    firstOpen: {
      name: 'First open',
      control: 'boolean',
      description: 'Si la primera pregunta arranca abierta, como en el wireframe.',
    },
    showCta: {
      name: 'Show CTA',
      control: 'boolean',
      description: 'Botón bajo la lista. Oculto en el wireframe: apagado por defecto.',
    },
    ctaLabel: {
      name: 'CTA label',
      control: 'text',
      description: 'Texto del botón.',
      if: { arg: 'showCta' },
    },
    ctaHref: {
      name: 'CTA link',
      control: 'text',
      description: 'URL del botón. No está en el diseño.',
      if: { arg: 'showCta' },
    },
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-253',
    },
    docs: {
      description: {
        component:
          'Preguntas frecuentes en acordeón: el `collapse` de Bootstrap 4 por data-api, sin JS propio ' +
          '(necesita que la página cargue jQuery y el JS de Bootstrap). Patrón accesible de la APG: cada pregunta es un botón ' +
          'dentro de un `h3` con `aria-expanded` y `aria-controls`, y la respuesta es una región etiquetada por su pregunta.\n\n' +
          'Por Controls se cambian el titular, la entradilla, la lista de preguntas (cualquier número), si solo puede haber ' +
          'una abierta a la vez, si la primera arranca abierta y el botón final.\n\n' +
          '**Pendiente de diseño:** las preguntas, las respuestas y la entradilla son lorem del wireframe; solo el titular es real. ' +
          'El botón «Ir a preguntas frecuentes» está oculto en el wireframe (aquí, apagado por defecto) y no tiene URL. ' +
          'El diseño no dice si se abre una sola pregunta a la vez: por defecto, sí (decisión nuestra).\n\n' +
          '**Provisional:** el fondo gris del wireframe pasa a crema de marca y el botón negro, al primario de la marca. ' +
          'Móvil sin diseño: menos aire arriba y la pregunta en varias líneas con el chevron arriba.\n\n' +
          'Los ids (`faqs-accordion`, `faqs-panel-N`…) salen del prefijo `faqs`: si una página montara dos FAQ, cada una necesita el suyo.',
      },
      source: { language: 'html', transform: (_c, ctx) => renderFaqs(ctx.args) },
    },
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    await expect(normaliza(html)).toBe(normaliza(renderFaqs(VARIANTES.oleada1)))

    const lienzo = within(canvasElement)
    const botones = lienzo.getAllByRole('button')
    await expect(botones).toHaveLength(VARIANTES.oleada1.items.length)
    await expect(botones[0]).toHaveAttribute('aria-expanded', 'true')
    await expect(botones[1]).toHaveAttribute('aria-expanded', 'false')

    // Abrir la segunda cierra la primera (`data-parent`).
    await userEvent.click(botones[1])
    await waitFor(() => expect(botones[1]).toHaveAttribute('aria-expanded', 'true'))
    await waitFor(() =>
      expect(canvasElement.querySelector('#faqs-panel-1')).not.toHaveClass('show')
    )
  },
}

// El botón final, oculto en el wireframe, encendido.
// Prefijo propio: en la página de Docs conviven las dos stories y sus ids no pueden chocar.
export const WithCta = {
  args: { showCta: true, id: 'faqs-cta' },
  play: async ({ canvasElement }) => {
    const lienzo = within(canvasElement)
    await expect(
      lienzo.getByRole('link', { name: 'Ir a preguntas frecuentes' })
    ).toBeInTheDocument()
  },
}
