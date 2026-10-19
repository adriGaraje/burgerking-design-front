// Snippet `legal-links`: el `.html` es el snippet que se copia; `renderLegalLinks()` lo
// pinta con los Controls. El `play` de la story por defecto comprueba que no se separan.
import { expect, within } from 'storybook/test'
import html from './legal-links.html?raw'
import { sinComentarios } from '../../stories/lib/hooks.js'
import { ALINEACIONES, VARIANTES, renderLegalLinks } from './datos-legal-links.js'

const normaliza = (s) =>
  sinComentarios(s)
    .replace(/\s+/g, ' ')
    .replace(/\s*([<>])\s*/g, '$1')
    .trim()

export default {
  title: 'Snippets/Legal Links',
  tags: ['WIP'],
  render: (args) => renderLegalLinks(args),
  args: { ...VARIANTES.oleada1 },
  argTypes: {
    links: {
      name: 'Links',
      control: 'object',
      description:
        'Enlaces de la franja, en orden: `{ label, href }`. Admite cualquier número; sin `href` apunta a `#`.',
    },
    align: {
      name: 'Alignment',
      control: 'inline-radio',
      options: ALINEACIONES,
      description:
        'Alineación de la fila desde tablet: `start` (izquierda, oleadas) o `center` (entre oleadas y final). En móvil siempre va centrada.',
    },
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-295',
    },
    docs: {
      description: {
        component:
          'Franja de enlaces legales al pie de la landing, justo encima del pie de Burger King. ' +
          'Los enlaces (texto y URL), su número y la alineación se cambian por Controls.\n\n' +
          '**Pendiente de diseño:** las URLs no están en el wireframe (van a `#`) y no se sabe si abren en pestaña nueva. ' +
          'En las oleadas el wireframe esconde un tercer enlace, «Preguntas frecuentes», y alinea la fila a la izquierda; ' +
          'entre oleadas y en el final enseña los cuatro, centrados. ¿Es intencionado?\n\n' +
          '**Corregido respecto al wireframe:** «Pólitica» → «Política» (en privacidad y cookies).\n\n' +
          '**Provisional:** el fondo gris del wireframe pasa a crema de marca; la tipografía es la de enlace de la marca. ' +
          'En móvil (sin diseño) la fila se parte en varias líneas y se centra.',
      },
      source: { language: 'html', transform: (_c, ctx) => renderLegalLinks(ctx.args) },
    },
  },
}

// Oleadas 1 y 2: dos enlaces, a la izquierda.
export const Wave = {
  play: async ({ canvasElement }) => {
    await expect(normaliza(html)).toBe(normaliza(renderLegalLinks(VARIANTES.oleada1)))
    const lienzo = within(canvasElement)
    await expect(lienzo.getByRole('navigation', { name: 'Enlaces legales' })).toBeInTheDocument()
    await expect(lienzo.getAllByRole('link')).toHaveLength(2)
  },
}

// Entre oleadas y final: cuatro enlaces, centrada.
export const Notice = {
  args: { ...VARIANTES.entreOleadas },
  play: async ({ canvasElement }) => {
    const lienzo = within(canvasElement)
    await expect(lienzo.getAllByRole('link')).toHaveLength(4)
    await expect(lienzo.getByText('Política de cookies')).toBeInTheDocument()
  },
}
