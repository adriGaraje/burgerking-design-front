// Story de «¿Cómo jugar?». Los Controls son planos; `aPieza` los vuelve a la forma de
// VARIANTES, que es la que pinta `renderHowToPlay`.
import { expect, within } from 'storybook/test'
import html from './how-to-play.html?raw'
import { sinComentarios } from '../../stories/lib/hooks.js'
import { VARIANTES, renderHowToPlay } from './datos-how-to-play.js'

const V = VARIANTES.oleada1
const [IOS, ANDROID] = V.stores

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
  steps = V.steps,
  footnote = V.footnote,
  showStores = true,
  appStoreHref = '',
  googlePlayHref = '',
} = {}) => ({
  id: V.id,
  title,
  subtitle,
  steps: Array.isArray(steps) ? steps : V.steps,
  footnote,
  stores: showStores
    ? [
        { ...IOS, href: appStoreHref || IOS.href },
        { ...ANDROID, href: googlePlayHref || ANDROID.href },
      ]
    : [],
})

export default {
  title: 'Snippets/How To Play',
  tags: ['WIP'],
  render: (args) => renderHowToPlay(aPieza(args)),
  args: {
    title: V.title,
    subtitle: V.subtitle,
    steps: V.steps,
    footnote: V.footnote,
    showStores: true,
    appStoreHref: '#',
    googlePlayHref: '#',
  },
  argTypes: {
    title: { name: 'Title', control: 'text', description: 'Titular de la sección.' },
    subtitle: {
      name: 'Subtitle',
      control: 'text',
      description: 'Entradilla bajo el titular. Vacía, no se pinta.',
    },
    steps: {
      name: 'Steps',
      control: 'object',
      description:
        'Pasos, en orden: `{ image, alt, title, text }`. Se pueden quitar o añadir; a partir de 4, bajan a otra fila. `image`: un nombre de fichero de `/images/roscon-king/` o una ruta.',
    },
    footnote: {
      name: 'Footnote',
      control: 'text',
      description: 'Texto sobre los badges de tienda. Vacío, no se pinta.',
    },
    showStores: {
      name: 'Show store badges',
      control: 'boolean',
      description: 'Badges de App Store y Google Play.',
    },
    appStoreHref: {
      name: 'App Store URL',
      control: 'text',
      description: 'Enlace del badge de App Store (se abre en otra pestaña).',
    },
    googlePlayHref: {
      name: 'Google Play URL',
      control: 'text',
      description: 'Enlace del badge de Google Play (se abre en otra pestaña).',
    },
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-159',
    },
    docs: {
      description: {
        component:
          'Sección «¿Cómo jugar?»: titular, entradilla, los pasos del juego en tarjetas (lista variable de imagen, título y texto), una nota y los badges de App Store y Google Play. Todo el texto, los pasos y las URL de tienda se cambian por Controls; el `id="how-to-play"` es el ancla del CTA «¿Cómo jugar?» del hero. **Pendiente de diseño:** subtítulo, textos de los pasos, imágenes y nota son lorem/placeholder del wireframe; badges dibujados (no los oficiales), sin URL de tienda. **Decisiones nuestras:** padding real de 40 en vez del alto fijo de 500 (no cabía); colores de marca provisionales (fondo blanco, borde de tarjeta de Bootstrap); en móvil los pasos se apilan y los badges pasan a otra fila si no caben.',
      },
      source: { language: 'html', transform: (_c, ctx) => renderHowToPlay(aPieza(ctx.args)) },
    },
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    await expect(normaliza(html)).toBe(normaliza(renderHowToPlay(V)))
    const lienzo = within(canvasElement)
    await expect(lienzo.getByRole('heading', { level: 2, name: V.title })).toBeInTheDocument()
    await expect(lienzo.getAllByRole('heading', { level: 3 })).toHaveLength(V.steps.length)
    await expect(lienzo.getByRole('link', { name: /App Store/ })).toBeInTheDocument()
  },
}
