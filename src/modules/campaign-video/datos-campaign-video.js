// Contenido de `campaign-video` y el pintor del snippet. El `.html` de la carpeta es
// `renderCampaignVideo(VARIANTES.oleada1)`.
//
// El bloque está OCULTO en el wireframe (Oleada 1 `8206:250`, Oleada 2 `8206:787`) y
// no hay vídeo todavía: sin URL, pinta un póster con el botón de play dibujado en
// vez de un iframe a un vídeo inventado. Con URL, el iframe de YouTube, sin JS.
// «Vídeo campaña» es una anotación del wireframe, no un titular: no se pinta.

const attr = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')

export const VARIANTES = {
  oleada1: {
    // Título accesible del vídeo (el `title` del iframe). El diseño no lo trae.
    title: 'Vídeo de la campaña',
    // Sin ID de YouTube todavía.
    embedUrl: '',
    // Miniatura propia, opcional. Sin ella, el póster es un fondo de marca.
    poster: '',
  },
}

// Admite la URL de embed tal cual o un enlace de YouTube (`watch?v=`, `youtu.be/`,
// `shorts/`), que pasa a `youtube-nocookie.com/embed/<id>`.
export const urlDeEmbed = (url) => {
  const limpia = String(url ?? '').trim()
  if (!limpia) return ''
  const id = limpia.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/
  )?.[1]
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : limpia
}

const PLAY = `<span class="campaign-video__play" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor" /></svg></span>`

// Desestructurar campo a campo: Storybook llama al render con `{}` (L-020).
export const renderCampaignVideo = ({
  title = VARIANTES.oleada1.title,
  embedUrl = VARIANTES.oleada1.embedUrl,
  poster = VARIANTES.oleada1.poster,
} = {}) => {
  const src = urlDeEmbed(embedUrl)

  const dentro = src
    ? `<iframe class="embed-responsive-item" src="${attr(src)}" title="${attr(title)}" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    : `<div class="embed-responsive-item campaign-video__placeholder" role="img" aria-label="${attr(title)} (próximamente)">${
        poster
          ? `
        <img class="campaign-video__poster" src="${attr(poster)}" alt="" width="1440" height="810" loading="lazy" />`
          : ''
      }
        ${PLAY}
      </div>`

  return `<section class="campaign-video" aria-label="${attr(title)}">
  <div class="campaign-video__inner">
    <div class="campaign-video__frame embed-responsive embed-responsive-16by9">
      ${dentro}
    </div>
  </div>
</section>`
}
