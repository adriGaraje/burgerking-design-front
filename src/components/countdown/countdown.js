// COMPONENT · countdown — recalcula «Quedan X días X horas X minutos X segundos».
//
// Lee la fecha de `data-countdown-target` (ISO 8601 con zona) y repinta cada segundo
// los cuatro `[data-countdown-value]` y sus `[data-countdown-name]` (singular/plural).
// El HTML estático ya trae unos números para que se lea sin JS.
//
// Lectores de pantalla: la caja visible va `aria-hidden`; lo que se lee es
// `[data-countdown-live]` (`aria-live="polite"`), que solo cambia cuando cambia el
// minuto: anuncia como mucho una vez por minuto, nunca cada segundo.
//
// Al llegar a 0: si hay `data-countdown-done-text`, la etiqueta pasa a ese texto y la
// caja se oculta; si no, se queda en ceros.

const UNIDADES = [
  ['days', 86400, 'día', 'días'],
  ['hours', 3600, 'hora', 'horas'],
  ['minutes', 60, 'minuto', 'minutos'],
  ['seconds', 1, 'segundo', 'segundos'],
]

const partes = (ms) => {
  let resto = Math.max(0, Math.floor(ms / 1000))
  return UNIDADES.map(([, tam]) => {
    const n = Math.floor(resto / tam)
    resto -= n * tam
    return n
  })
}

const nombre = (n, i) => (n === 1 ? UNIDADES[i][2] : UNIDADES[i][3])

function arranca(el) {
  if (el.dataset.countdownReady) return
  el.dataset.countdownReady = 'true'

  const fin = Date.parse(el.dataset.countdownTarget)
  if (Number.isNaN(fin)) return

  const etiqueta = el.querySelector('[data-countdown-label]')
  const caja = el.querySelector('[data-countdown-box]')
  const vivo = el.querySelector('[data-countdown-live]')
  const valores = UNIDADES.map(([c]) => el.querySelector(`[data-countdown-value="${c}"]`))
  const nombres = UNIDADES.map(([c]) => el.querySelector(`[data-countdown-name="${c}"]`))
  const texto = etiqueta ? etiqueta.textContent.trim() : ''
  const hecho = el.dataset.countdownDoneText

  // La story monta antes de insertar en el documento: solo se para si ya estuvo dentro.
  let estuvo = false
  let reloj = null

  const pinta = () => {
    if (el.isConnected) estuvo = true
    else if (estuvo) return clearInterval(reloj)

    const restante = fin - Date.now()
    const n = partes(restante)

    n.forEach((v, i) => {
      if (valores[i]) valores[i].textContent = String(v)
      if (nombres[i]) nombres[i].textContent = nombre(v, i)
    })

    let frase = `${texto} ${n[0]} ${nombre(n[0], 0)}, ${n[1]} ${nombre(n[1], 1)} y ${n[2]} ${nombre(n[2], 2)}`

    if (restante <= 0) {
      clearInterval(reloj)
      if (hecho) {
        if (etiqueta) etiqueta.textContent = hecho
        if (caja) caja.hidden = true
        el.dataset.countdownDone = 'true'
        frase = hecho
      }
    }

    if (vivo && vivo.textContent !== frase.trim()) vivo.textContent = frase.trim()
  }

  pinta()
  if (fin > Date.now()) reloj = setInterval(pinta, 1000)
}

export function initCountdown(root = document) {
  const piezas = [...root.querySelectorAll('[data-countdown-target]')]
  if (root.matches && root.matches('[data-countdown-target]')) piezas.unshift(root)
  piezas.forEach(arranca)
}

// En el CMS: se arranca solo.
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initCountdown())
  } else {
    initCountdown()
  }
}
