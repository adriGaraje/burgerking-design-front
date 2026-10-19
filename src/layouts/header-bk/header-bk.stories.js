// Layout `header-bk`: la cabecera de burgerking.es, que pone Burger King. Se pinta como
// referencia aproximada; en el código publicado va su etiqueta, `<header-bk></header-bk>`.
import { expect, within } from 'storybook/test'
import html from './header-bk.html?raw'
import { sinComentarios } from '../../stories/lib/hooks.js'
import { avisoCliente } from '../../stories/lib/aviso-cliente.js'
import { DATOS, renderHeaderBk } from './datos-header-bk.js'

const ETIQUETA = '<header-bk></header-bk>'

const normaliza = (s) =>
  sinComentarios(s)
    .replace(/\s+/g, ' ')
    .replace(/\s*([<>])\s*/g, '$1')
    .trim()

export default {
  title: 'Layouts/Header Bk',
  // `client-owned`: la barra lateral le pone la etiqueta «DE BK» (manager.jsx).
  tags: ['WIP', 'client-owned'],
  decorators: [avisoCliente('header-bk')],
  render: () => renderHeaderBk(DATOS),
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-98',
    },
    docs: {
      description: {
        component:
          'Cabecera de burgerking.es. **No es nuestra: la pone Burger King en su CMS.** Aquí se pinta solo para ver ' +
          'la landing completa, como referencia aproximada (Bootstrap, sin perseguir el píxel) con los textos ' +
          'transcritos de la captura del wireframe. En el código va su etiqueta, `<header-bk></header-bk>`.\n\n' +
          '**Aproximación nuestra:** colores de marca en vez de los grises de la captura, iconos genéricos (no los de BK) ' +
          'y, en móvil (sin diseño), solo la hamburguesa, el logo y las píldoras.',
      },
      source: { language: 'html', transform: () => ETIQUETA },
    },
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    await expect(normaliza(html)).toBe(normaliza(renderHeaderBk(DATOS)))

    const lienzo = within(canvasElement)
    await expect(canvasElement.querySelectorAll('[data-module="site-header"]')).toHaveLength(1)
    await expect(lienzo.getByRole('img', { name: 'Burger King' })).toBeInTheDocument()
    await expect(lienzo.getByRole('button', { name: 'Menú' })).toBeInTheDocument()
  },
}
