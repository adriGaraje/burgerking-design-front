// Contenido de la cuenta atrás (Figma 8206:242, sub-bloque oculto de menu-grid).
// Transcrito de reports/menu-grid/spec.md §4 (`countdown`). Los números 9 / 10 / 25 / 27
// son los del wireframe: el HTML estático los trae para que se lea sin JS, y
// `countdown.js` los recalcula cada segundo a partir de `data-countdown-target`.
//
// La fecha objetivo NO está en Figma (spec de menu-grid, pregunta 1): la de aquí es
// provisional. Igual el texto de fin (pregunta 3): vacío = se queda en ceros.

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export const VARIANTES = {
  oleada1: {
    label: 'Quedan',
    target: '2026-12-20T23:59:59+01:00',
    doneText: '',
    units: [
      { value: '9', unit: 'días' },
      { value: '10', unit: 'horas' },
      { value: '25', unit: 'minutos' },
      { value: '27', unit: 'segundos' },
    ],
  },
}

// El orden de `units` es fijo: días, horas, minutos, segundos. La clave es la que lee el JS.
const CLAVES = ['days', 'hours', 'minutes', 'seconds']

const V = VARIANTES.oleada1

// Texto para lectores de pantalla: sin segundos, para no anunciar cada segundo.
const textoVivo = (label, units) => {
  const [d, h, m] = units
  return `${label} ${d.value} ${d.unit}, ${h.value} ${h.unit} y ${m.value} ${m.unit}`.trim()
}

export function renderCountdown({
  label = V.label,
  target = V.target,
  doneText = V.doneText,
  units = V.units,
} = {}) {
  const celdas = CLAVES.map((clave, i) => {
    const u = units[i] ?? { value: '0', unit: '' }
    return `    <span class="countdown__unit">
      <span class="countdown__value" data-countdown-value="${clave}">${esc(u.value)}</span>
      <span class="countdown__name" data-countdown-name="${clave}">${esc(u.unit)}</span>
    </span>`
  }).join('\n')

  const fin = doneText ? ` data-countdown-done-text="${esc(doneText)}"` : ''

  return `<div class="countdown" data-countdown-target="${esc(target)}"${fin}>
  <p class="countdown__label mb-0" aria-hidden="true" data-countdown-label>${esc(label)}</p>
  <time class="countdown__box" datetime="${esc(target)}" aria-hidden="true" data-countdown-box>
${celdas}
  </time>
  <p class="sr-only" aria-live="polite" aria-atomic="true" data-countdown-live>${esc(textoVivo(label, units))}</p>
</div>`
}

// Fecha ISO 8601 con la zona del navegador (`2026-12-20T23:59:59+01:00`).
export const isoConZona = (fecha) => {
  const dos = (n) => String(Math.abs(Math.trunc(n))).padStart(2, '0')
  const desfase = -fecha.getTimezoneOffset()
  const signo = desfase >= 0 ? '+' : '-'
  return (
    `${fecha.getFullYear()}-${dos(fecha.getMonth() + 1)}-${dos(fecha.getDate())}` +
    `T${dos(fecha.getHours())}:${dos(fecha.getMinutes())}:${dos(fecha.getSeconds())}` +
    `${signo}${dos(desfase / 60)}:${dos(desfase % 60)}`
  )
}

// Solo para Storybook: «ahora» + 9 d 10 h 25 min 27 s, para que la story arranque con los
// números del wireframe y no caduque nunca.
// Redondeado al segundo por arriba: si no, el primer pintado ya enseña 26.
export const objetivoRelativo = () => {
  const desfase = ((9 * 24 + 10) * 3600 + 25 * 60 + 27) * 1000
  return isoConZona(new Date(Math.ceil((Date.now() + desfase) / 1000) * 1000))
}
