// Layout `footer-bk`: el pie de burgerking.es, que pone Burger King. Se pinta como
// referencia aproximada; en el código publicado va su etiqueta, `<footer-bk></footer-bk>`.
import { expect, within } from 'storybook/test'
import html from './footer-bk.html?raw'
import { sinComentarios } from '../../stories/lib/hooks.js'
import { avisoCliente } from '../../stories/lib/aviso-cliente.js'
import { DATOS, renderFooterBk } from './datos-footer-bk.js'

const ETIQUETA = '<footer-bk></footer-bk>'

const normaliza = (s) =>
  sinComentarios(s)
    .replace(/\s+/g, ' ')
    .replace(/\s*([<>])\s*/g, '$1')
    .trim()

export default {
  title: 'Layouts/Footer Bk',
  // `client-owned`: pieza del cliente; la barra lateral le pone «CLIENTE» (manager.jsx).
  tags: ['WIP', 'client-owned'],
  decorators: [avisoCliente('footer-bk')],
  render: () => renderFooterBk(DATOS),
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-300',
    },
    docs: {
      description: {
        component:
          'Pie de burgerking.es. **No es nuestro: lo pone Burger King en su CMS.** Aquí se pinta solo para ver ' +
          'la landing completa, como referencia aproximada (Bootstrap, sin perseguir el píxel) con los textos ' +
          'transcritos de la captura del wireframe, tal cual (incluidos los enlaces de otras campañas). ' +
          'En el código va su etiqueta, `<footer-bk></footer-bk>`.\n\n' +
          '**Aproximación nuestra:** colores de marca en vez de los grises de la captura, iconos genéricos, el logo de BK ' +
          'en vez del logotipo «BURGER KING» y un borde rasgado dibujado a mano. En móvil (sin diseño), columnas apiladas.',
      },
      source: { language: 'html', transform: () => ETIQUETA },
    },
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    await expect(normaliza(html)).toBe(normaliza(renderFooterBk(DATOS)))

    const lienzo = within(canvasElement)
    await expect(lienzo.getAllByRole('heading', { level: 2 })).toHaveLength(DATOS.columns.length)
    await expect(lienzo.getByRole('link', { name: 'Instagram de Burger King' })).toBeInTheDocument()
  },
}
