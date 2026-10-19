// Snippet `campaign-video`: el `.html` es el snippet que se copia; `renderCampaignVideo()`
// lo pinta con los Controls. Sin URL de vídeo enseña el póster; con ella, el iframe.
import { expect, within } from 'storybook/test'
import html from './campaign-video.html?raw'
import { sinComentarios } from '../../stories/lib/hooks.js'
import { VARIANTES, renderCampaignVideo, urlDeEmbed } from './datos-campaign-video.js'

const normaliza = (s) =>
  sinComentarios(s)
    .replace(/\s+/g, ' ')
    .replace(/\s*([<>])\s*/g, '$1')
    .trim()

export default {
  title: 'Snippets/Campaign Video',
  tags: ['WIP'],
  render: (args) => renderCampaignVideo(args),
  args: { ...VARIANTES.oleada1 },
  argTypes: {
    title: {
      name: 'Video title',
      control: 'text',
      description:
        'Título accesible del vídeo: lo lee el lector de pantalla (`title` del iframe y nombre de la sección). No se ve.',
    },
    embedUrl: {
      name: 'Embed URL',
      control: 'text',
      description:
        'URL del vídeo de YouTube. Vale la de embed (`https://www.youtube-nocookie.com/embed/<id>`) o el enlace normal (`watch?v=`, `youtu.be/`), que se convierte a embed sin cookies. Vacía, se ve el póster.',
    },
    poster: {
      name: 'Poster image',
      control: 'text',
      description:
        'Imagen del póster mientras no hay vídeo (16:9, 1440 × 810). Vacía, el póster es un fondo de marca con el play.',
    },
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-250',
    },
    docs: {
      description: {
        component:
          'Vídeo de campaña a 16:9, centrado (720 de ancho en escritorio), con el `embed-responsive` de Bootstrap. ' +
          'Por Controls se cambian el título accesible, la URL del vídeo de YouTube (se embebe desde `youtube-nocookie.com`, sin JS) ' +
          'y un póster opcional.\n\n' +
          '**Oculto en el wireframe:** el bloque existe en las oleadas 1 y 2 pero está escondido, y no aparece entre oleadas ni en el final. ' +
          'Si entra, va entre los pasos y las preguntas frecuentes.\n\n' +
          '**Falta el ID del vídeo:** mientras no llegue, se enseña un póster con el play dibujado (no es un botón: no hay nada que reproducir). ' +
          'Al rellenar la URL, se pinta el iframe. Tampoco hay título ni miniatura en el diseño.\n\n' +
          '**Provisional:** el rótulo «Vídeo campaña» es una anotación del wireframe y no se pinta; el fondo gris pasa a crema de marca. ' +
          'Móvil sin diseño: ancho completo y radio 16.',
      },
      source: { language: 'html', transform: (_c, ctx) => renderCampaignVideo(ctx.args) },
    },
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    await expect(normaliza(html)).toBe(normaliza(renderCampaignVideo(VARIANTES.oleada1)))

    const lienzo = within(canvasElement)
    await expect(lienzo.getByRole('img', { name: /Vídeo de la campaña/ })).toBeInTheDocument()
    await expect(canvasElement.querySelector('iframe')).toBeNull()

    // Con URL, el iframe (sin montarlo: no hay vídeo real al que apuntar).
    const conVideo = renderCampaignVideo({ embedUrl: 'https://youtu.be/abcdefghijk' })
    await expect(conVideo).toContain('src="https://www.youtube-nocookie.com/embed/abcdefghijk"')
    await expect(conVideo).toContain('title="Vídeo de la campaña"')
    await expect(urlDeEmbed('https://www.youtube.com/watch?v=abcdefghijk&t=3')).toBe(
      'https://www.youtube-nocookie.com/embed/abcdefghijk'
    )
  },
}
