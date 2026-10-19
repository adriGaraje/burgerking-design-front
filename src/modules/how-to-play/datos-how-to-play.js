// Contenido de «¿Cómo jugar?» (Figma 8206:159 · O2 8206:696), transcrito LITERAL de
// reports/how-to-play/spec.md §4, lorem incluido. `filler` marca lo que es relleno.
// Las URL de tienda no están en Figma: `null` se pinta como `#`.

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
  id: 'how-to-play',
  title: '¿Cómo jugar?',
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  steps: [
    {
      image: 'placeholder.png',
      alt: '',
      title: '1- Compra tu menú',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam urna purus, cursus eu felis non, rhoncus dictum lacus.',
    },
    {
      image: 'placeholder.png',
      alt: '',
      title: '2- Escanea tu QR',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam urna purus, cursus eu felis non, rhoncus dictum lacus.',
    },
    {
      image: 'placeholder.png',
      alt: '',
      title: '3- ¡Gira la ruleta!',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam urna purus, cursus eu felis non, rhoncus dictum lacus.',
    },
  ],
  footnote: 'Lorem ipsum amet id sapien erat lectus tristique nec tellus vitae sit in ultrices.',
  stores: [
    {
      platform: 'ios',
      icon: 'icon-apple.svg',
      kicker: 'Consíguelo en el',
      label: 'App Store',
      href: null,
    },
    {
      platform: 'android',
      icon: 'icon-android.svg',
      kicker: 'Disponible en',
      label: 'Google Play',
      href: null,
    },
  ],
  filler: ['subtitle', 'steps[].text', 'steps[].image', 'footnote'],
}

// Oleada 2 idéntica al píxel (pendiente de copies nuevos, nota 8206:846).
export const VARIANTES = { oleada1, oleada2: { ...oleada1 } }

const V = VARIANTES.oleada1

const paso = (s) => `      <li class="how-to-play__step border rounded p-3">
        <img class="how-to-play__step-image d-block mx-auto mb-2 rounded" src="${esc(src(s.image))}" alt="${esc(s.alt)}" width="211" height="127" loading="lazy">
        <h3 class="how-to-play__step-title mb-2">${esc(s.title)}</h3>
        <p class="how-to-play__step-text mb-0">${esc(s.text)}</p>
      </li>`

const tienda = (
  t
) => `        <a class="how-to-play__store" href="${esc(t.href || '#')}" target="_blank" rel="noopener">
          <img class="how-to-play__store-icon" src="${esc(src(t.icon))}" alt="" width="24" height="24">
          <span class="how-to-play__store-text">
            <span class="how-to-play__store-kicker small d-block">${esc(t.kicker)}</span>
            <span class="how-to-play__store-label d-block">${esc(t.label)}</span>
          </span>
          <span class="sr-only">(se abre en una pestaña nueva)</span>
        </a>`

export function renderHowToPlay({
  id = V.id,
  title = V.title,
  subtitle = V.subtitle,
  steps = V.steps,
  footnote = V.footnote,
  stores = V.stores,
} = {}) {
  const ancla = id ? ` id="${esc(id)}"` : ''
  const entradilla = (subtitle || '').trim()
    ? `\n      <p class="how-to-play__subtitle mb-0">${esc(subtitle.trim())}</p>`
    : ''
  const nota = (footnote || '').trim()
    ? `\n      <p class="how-to-play__footnote mb-3">${esc(footnote.trim())}</p>`
    : ''
  const tiendas = stores.length
    ? `\n      <div class="how-to-play__stores d-flex flex-wrap justify-content-center">
${stores.map(tienda).join('\n')}
      </div>`
    : ''
  const pie =
    nota || tiendas
      ? `\n    <div class="how-to-play__footer d-flex flex-column align-items-center mt-4">${nota}${tiendas}
    </div>`
      : ''

  return `<section class="how-to-play"${ancla} aria-labelledby="how-to-play-title">
  <div class="how-to-play__inner text-center">
    <div class="how-to-play__header mb-4">
      <h2 id="how-to-play-title" class="how-to-play__title mb-2">${esc(title)}</h2>${entradilla}
    </div>
    <ol class="how-to-play__steps list-unstyled d-flex flex-column flex-md-row flex-md-wrap justify-content-center mb-0">
${steps.map(paso).join('\n')}
    </ol>${pie}
  </div>
</section>`
}
