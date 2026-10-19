// Contenido de «¿Ya tienes tu QR?» (Figma 8206:193 · O2 8206:730), transcrito LITERAL de
// reports/qr-access/spec.md §4: «digitos» sin tilde y la «X día» de relleno son de Figma.
// Las dos líneas de `text` van separadas por un salto forzado (`<br>`), no son dos párrafos.
// Las URL de los CTA no están en Figma: `null` se pinta como `#`.

const IMG = '/images/roscon-king/'

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Un nombre suelto es un fichero de public/images/roscon-king/; una ruta, tal cual.
const src = (f = '') => (f.includes('/') ? f : IMG + f)

const oleada1 = {
  title: '¿Ya tienes tu QR? Escanea y participa',
  text: [
    'Si ya tienes la app descargada y sesión iniciada, escanea el QR y juega sin tener que introducir los 15 digitos.',
    'Tienes hasta X día para participar.',
  ],
  ctas: [
    { label: 'Escanear QR', href: null, variant: 'primary' },
    { label: 'Acceso al juego', href: null, variant: 'secondary' },
  ],
  image: { src: 'placeholder.png', alt: '' },
  filler: ['text[1] («X día»)', 'image'],
}

// Oleada 2 idéntica al píxel (pendiente de copies nuevos, nota 8206:846).
export const VARIANTES = { oleada1, oleada2: { ...oleada1 } }

const V = VARIANTES.oleada1

// primary → botón relleno; secondary → con borde.
const CLASE_CTA = { primary: 'btn-primary', secondary: 'btn-outline-secondary' }

const cta = (c) =>
  `        <a class="btn ${CLASE_CTA[c.variant] ?? CLASE_CTA.primary} qr-access__cta" href="${esc(c.href || '#')}">${esc(c.label)}</a>`

export function renderQrAccess({
  title = V.title,
  text = V.text,
  ctas = V.ctas,
  image = V.image,
} = {}) {
  const lineas = (Array.isArray(text) ? text : String(text ?? '').split('\n'))
    .map((l) => l.trim())
    .filter(Boolean)
  const parrafo = lineas.length
    ? `\n      <p class="qr-access__text mb-3">${lineas.map(esc).join('<br>')}</p>`
    : ''
  const botones = (ctas ?? []).filter((c) => c && c.label)
  const fila = botones.length
    ? `\n      <div class="qr-access__ctas d-flex flex-wrap">
${botones.map(cta).join('\n')}
      </div>`
    : ''
  const imagen = image?.src
    ? `\n    <img class="qr-access__image rounded" src="${esc(src(image.src))}" alt="${esc(image.alt)}" width="377" height="227" loading="lazy">`
    : ''

  return `<section class="qr-access" aria-labelledby="qr-access-title">
  <div class="qr-access__inner d-flex flex-wrap justify-content-center align-items-center">
    <div class="qr-access__content">
      <h2 id="qr-access-title" class="qr-access__title mb-3">${esc(title)}</h2>${parrafo}${fila}
    </div>${imagen}
  </div>
</section>`
}
