// Story de «¿Ya tienes tu QR?». Los Controls son planos; `aPieza` los vuelve a la forma
// de VARIANTES, que es la que pinta `renderQrAccess`.
import { expect, within } from 'storybook/test'
import html from './qr-access.html?raw'
import { sinComentarios } from '../../stories/lib/hooks.js'
import { VARIANTES, renderQrAccess } from './datos-qr-access.js'

const V = VARIANTES.oleada1
const [PRIMARIO, SECUNDARIO] = V.ctas

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
  text = V.text.join('\n'),
  primaryLabel = PRIMARIO.label,
  primaryHref = '',
  secondaryLabel = SECUNDARIO.label,
  secondaryHref = '',
  imageSrc = V.image.src,
  imageAlt = V.image.alt,
} = {}) => ({
  title,
  text,
  ctas: [
    { ...PRIMARIO, label: primaryLabel, href: primaryHref || PRIMARIO.href },
    { ...SECUNDARIO, label: secondaryLabel, href: secondaryHref || SECUNDARIO.href },
  ],
  image: { src: imageSrc, alt: imageAlt },
})

export default {
  title: 'Snippets/QR Access',
  tags: ['WIP'],
  render: (args) => renderQrAccess(aPieza(args)),
  args: {
    title: V.title,
    text: V.text.join('\n'),
    primaryLabel: PRIMARIO.label,
    primaryHref: '#',
    secondaryLabel: SECUNDARIO.label,
    secondaryHref: '#',
    imageSrc: V.image.src,
    imageAlt: V.image.alt,
  },
  argTypes: {
    title: { name: 'Title', control: 'text', description: 'Titular de la sección.' },
    text: {
      name: 'Text',
      control: 'text',
      description: 'Texto. Cada salto de línea se pinta como un salto forzado (`<br>`).',
    },
    primaryLabel: {
      name: 'Primary CTA label',
      control: 'text',
      description: 'Texto del botón relleno. Vacío, no se pinta.',
    },
    primaryHref: {
      name: 'Primary CTA URL',
      control: 'text',
      description: 'Enlace del botón relleno.',
    },
    secondaryLabel: {
      name: 'Secondary CTA label',
      control: 'text',
      description: 'Texto del botón con borde. Vacío, no se pinta.',
    },
    secondaryHref: {
      name: 'Secondary CTA URL',
      control: 'text',
      description: 'Enlace del botón con borde.',
    },
    imageSrc: {
      name: 'Image',
      control: 'text',
      description:
        'Imagen: un nombre de fichero de `/images/roscon-king/` o una ruta. Vacía, no se pinta.',
    },
    imageAlt: {
      name: 'Image alt',
      control: 'text',
      description: 'Texto alternativo. Vacío si la imagen es decorativa.',
    },
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-193',
    },
    docs: {
      description: {
        component:
          'Sección «¿Ya tienes tu QR?»: titular, texto y dos CTA (escanear el QR y acceso al juego) a un lado, imagen al otro. Se cambian por Controls el texto, los dos CTA (texto y URL) y la imagen. **Pendiente de diseño:** la fecha de «X día», el destino de los dos CTA y la imagen (placeholder del wireframe); «digitos» va sin tilde como en Figma. **Decisiones nuestras:** el fondo gris del wireframe va en crema de marca y los botones en los colores de marca (provisional); en móvil la imagen baja bajo el texto a todo el ancho.',
      },
      source: { language: 'html', transform: (_c, ctx) => renderQrAccess(aPieza(ctx.args)) },
    },
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    await expect(normaliza(html)).toBe(normaliza(renderQrAccess(V)))
    const lienzo = within(canvasElement)
    await expect(lienzo.getByRole('heading', { level: 2, name: V.title })).toBeInTheDocument()
    await expect(lienzo.getByRole('link', { name: PRIMARIO.label })).toBeInTheDocument()
    await expect(lienzo.getByRole('link', { name: SECUNDARIO.label })).toBeInTheDocument()
  },
}
