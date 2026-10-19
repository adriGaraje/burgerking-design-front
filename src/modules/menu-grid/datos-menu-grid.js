// Contenido de «Menús disponibles» (Figma 8206:208 · O2 8206:745), transcrito LITERAL de
// reports/menu-grid/spec.md §4, lorem incluido. Los 7 «Menú Rosking» iguales son del
// wireframe. La cuenta atrás (8206:242) está OCULTA en Figma: `countdown.visible: false`.
// Las URL no están en Figma: `null` se pinta como `#` (o sin enlace, en los ítems).

import { VARIANTES as CUENTA, renderCountdown } from '../../components/countdown/datos-countdown.js'

const IMG = '/images/roscon-king/'

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Un nombre suelto es un fichero de public/images/roscon-king/; una ruta, tal cual.
const src = (f = '') => (f.includes('/') ? f : IMG + f)

const menu = { image: 'placeholder.png', alt: '', name: 'Menú Rosking', href: null }

const oleada1 = {
  title: 'Menús disponibles',
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  items: [
    { ...menu },
    { ...menu },
    { ...menu },
    { ...menu },
    { ...menu },
    { ...menu },
    { ...menu },
  ],
  cta: { label: 'Ver menús', href: null, icon: 'launch', external: true },
  countdown: {
    visible: false,
    label: 'Quedan',
    end: null,
    units: [
      { value: '9', unit: 'días' },
      { value: '10', unit: 'horas' },
      { value: '25', unit: 'minutos' },
      { value: '27', unit: 'segundos' },
    ],
  },
  filler: ['subtitle', 'items[].name (7 iguales)', 'items[].image', 'countdown.units[].value'],
}

// Oleada 2 idéntica al píxel, cuenta atrás también oculta (copies pendientes, nota 8206:846).
export const VARIANTES = { oleada1, oleada2: { ...oleada1 } }

const V = VARIANTES.oleada1

// `alt` vacío por defecto: el nombre del menú ya va debajo.
const item = (m) => {
  const cuerpo = `<img class="menu-grid__image rounded" src="${esc(src(m.image))}" alt="${esc(m.alt)}" width="227" height="227" loading="lazy">
        <h3 class="menu-grid__name mb-0">${esc(m.name)}</h3>`
  return m.href
    ? `      <li class="menu-grid__item">
        <a class="menu-grid__link" href="${esc(m.href)}">
        ${cuerpo}
        </a>
      </li>`
    : `      <li class="menu-grid__item">
        ${cuerpo}
      </li>`
}

const boton = (c) => {
  const fuera = c.external ? ` target="_blank" rel="noopener"` : ''
  const icono =
    c.icon === 'launch'
      ? `\n      <img class="menu-grid__cta-icon" src="${IMG}icon-launch.svg" alt="" width="16" height="16">`
      : ''
  const aviso = c.external
    ? `\n      <span class="sr-only">(se abre en una pestaña nueva)</span>`
    : ''
  return `\n    <a class="btn btn-primary menu-grid__cta" href="${esc(c.href || '#')}"${fuera}>
      ${esc(c.label)}${icono}${aviso}
    </a>`
}

const cuenta = (c) =>
  `\n    <div class="menu-grid__countdown">
${renderCountdown({
  label: c.label,
  target: c.end || CUENTA.oleada1.target,
  doneText: c.doneText || '',
  units: c.units || CUENTA.oleada1.units,
})
  .split('\n')
  .map((l) => `      ${l}`)
  .join('\n')}
    </div>`

export function renderMenuGrid({
  title = V.title,
  subtitle = V.subtitle,
  items = V.items,
  cta = V.cta,
  countdown = V.countdown,
} = {}) {
  const entradilla = (subtitle || '').trim()
    ? `\n      <p class="menu-grid__subtitle mb-0">${esc(subtitle.trim())}</p>`
    : ''

  return `<section class="menu-grid" aria-labelledby="menu-grid-title">
  <div class="menu-grid__inner text-center">
    <div class="menu-grid__header mb-4">
      <h2 id="menu-grid-title" class="menu-grid__title mb-2">${esc(title)}</h2>${entradilla}
    </div>
    <ul class="menu-grid__list list-unstyled d-flex flex-wrap justify-content-center mb-0">
${(items ?? []).map(item).join('\n')}
    </ul>${cta && cta.label ? boton(cta) : ''}${countdown && countdown.visible ? cuenta(countdown) : ''}
  </div>
</section>`
}
