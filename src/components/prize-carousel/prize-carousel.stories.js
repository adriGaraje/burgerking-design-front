// Story de `prize-carousel`: el marcado sale de `renderPrizeCarousel(args)` y el JS se
// inicia sobre la caja de la story. El `play` vigila que el `.html` publicado y el
// render por defecto no se separen.
import { expect, within, waitFor } from 'storybook/test'
import html from './prize-carousel.html?raw'
import { sinComentarios } from '../../stories/lib/hooks.js'
import { VARIANTES, renderPrizeCarousel } from './datos-prize-carousel.js'
import { initPrizeCarousel } from './prize-carousel.js'

const D = VARIANTES.oleada1

// Espacios fuera: Prettier reparte atributos y texto por líneas en el `.html`.
const normaliza = (s) =>
  s
    .replace(/\s+/g, ' ')
    .replace(/\s*([<>])\s*/g, '$1')
    .trim()

export default {
  title: 'Basics/Prize Carousel',
  tags: ['WIP'],
  render: (args) => {
    const caja = document.createElement('div')
    caja.innerHTML = renderPrizeCarousel(args)
    initPrizeCarousel(caja)
    return caja
  },
  args: {
    title: D.title,
    items: D.items,
    prevLabel: D.prevLabel,
    nextLabel: D.nextLabel,
    id: D.id,
  },
  argTypes: {
    title: {
      name: 'Title',
      control: 'text',
      description: 'Título del bloque (h2). Vacío, no se pinta y la región se nombra sola.',
    },
    items: {
      name: 'Prizes',
      control: 'object',
      description:
        'Lista de premios: `{ image, alt, label }`. Admite cualquier número; si caben todos, las flechas se ocultan.',
    },
    prevLabel: {
      name: 'Previous label',
      control: 'text',
      description: 'Texto accesible de la flecha anterior.',
    },
    nextLabel: {
      name: 'Next label',
      control: 'text',
      description: 'Texto accesible de la flecha siguiente.',
    },
    id: {
      name: 'ID',
      control: 'text',
      description: 'Id del carrusel; de él salen los del título y la pista. Único en la página.',
    },
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-134',
    },
    docs: {
      description: {
        component:
          'Carrusel de premios «¿Qué puedes ganar?». Pieza reutilizable a sangre: el título va en la columna del sitio y la pista ocupa todo el ancho. Por Controls se cambian el título, la lista de premios (imagen, alt y nombre; cualquier número) y los textos de las flechas.\n\n' +
          'Comportamiento: scroll horizontal nativo; arranca centrado (a 1440, con 6 premios, asoman cortados el primero y el último, como en el diseño); el premio que no se ve entero se atenúa a 0,4; las flechas avanzan un premio y se apagan en los extremos; con la pista enfocada, ← → e Inicio / Fin. JS en `prize-carousel.js` (`initPrizeCarousel`).\n\n' +
          '**Pendiente de diseño:** las fotos y los nombres de los premios (hoy, imagen gris y «Premio n»), el icono de las flechas (el wireframe usa «<» «>» en texto) y la versión móvil, que es decisión nuestra: premios de 160, sin flechas y con snap que centra un premio. Colores y tipografía, provisionales de marca.',
      },
      source: { language: 'html', transform: (_c, ctx) => renderPrizeCarousel(ctx.args) },
    },
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    await expect(normaliza(sinComentarios(html))).toBe(normaliza(renderPrizeCarousel(D)))
    const lienzo = within(canvasElement)
    await expect(lienzo.getByRole('heading', { level: 2, name: D.title })).toBeInTheDocument()
    await expect(lienzo.getAllByRole('listitem')).toHaveLength(D.items.length)
    await waitFor(() =>
      expect(canvasElement.querySelector('[data-prize-carousel-ready]')).not.toBeNull()
    )
  },
}

// Pocos premios (los tres primeros de los reales): caben todos, se centran y las flechas
// desaparecen. Solo se comprueba desde md: en móvil la pista lleva aire para centrar.
export const FewPrizes = {
  args: { items: D.items.slice(0, 3) },
  play: async ({ canvasElement }) => {
    if (window.innerWidth < 768) return
    await waitFor(() =>
      expect(canvasElement.querySelector('[data-prize-carousel-next]').hidden).toBe(true)
    )
  },
}
