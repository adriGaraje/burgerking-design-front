// COMPONENT · prize-carousel — flechas, teclado, encuadre inicial y atenuado.
// ---------------------------------------------------------------------------
// La pista es un scroll horizontal nativo (swipe y trackpad funcionan sin JS). Esto
// solo añade lo que el CSS no puede:
//   · Encuadre inicial centrado: reproduce el diseño (a 1440, con 6 premios, el
//     primero asoma en x −61 y el último igual por la derecha).
//   · Flechas: avanzan un premio; en los extremos quedan `aria-disabled` (no
//     `disabled`, para que el foco no se pierda) y, si todo cabe, se ocultan.
//   · Teclado sobre la pista enfocada: ← → un premio, Inicio / Fin a los extremos.
//   · Atenuado: el premio que no se ve entero va a opacity .4 (diseño: los extremos
//     cortados), y se recalcula al desplazar.
// Idempotente: marca cada carrusel con `data-prize-carousel-ready`.

const DIMMED = 'prize-carousel__item--dimmed'
const RATIO_ENTERO = 0.95

const reduceMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function setup(carousel) {
  const viewport = carousel.querySelector('[data-prize-carousel-viewport]')
  if (!viewport) return
  const prev = carousel.querySelector('[data-prize-carousel-prev]')
  const next = carousel.querySelector('[data-prize-carousel-next]')
  const items = [...viewport.querySelectorAll('.prize-carousel__item')]
  let centrado = false

  // Un paso = un premio + su hueco, medido en el DOM (cambia con el breakpoint).
  const paso = () =>
    items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : viewport.clientWidth * 0.8

  const max = () => viewport.scrollWidth - viewport.clientWidth

  const ir = (left) => viewport.scrollTo({ left, behavior: reduceMotion() ? 'auto' : 'smooth' })

  const marcaFlecha = (boton, apagada) => {
    if (!boton) return
    boton.setAttribute('aria-disabled', apagada ? 'true' : 'false')
  }

  const actualiza = () => {
    const tope = max()
    const desborda = tope > 1
    ;[prev, next].forEach((b) => b && (b.hidden = !desborda))
    marcaFlecha(prev, viewport.scrollLeft <= 1)
    marcaFlecha(next, viewport.scrollLeft >= tope - 1)
  }

  // El primer encuadre necesita medidas reales: se hace cuando la pista ya tiene
  // ancho (la story monta la caja antes de colgarla del documento).
  const encuadra = () => {
    if (!centrado && viewport.clientWidth > 0) {
      centrado = true
      viewport.scrollLeft = max() / 2
    }
    actualiza()
  }

  const mueve = (dir) => ir(viewport.scrollLeft + dir * paso())

  prev?.addEventListener('click', () => prev.getAttribute('aria-disabled') !== 'true' && mueve(-1))
  next?.addEventListener('click', () => next.getAttribute('aria-disabled') !== 'true' && mueve(1))

  viewport.addEventListener('keydown', (e) => {
    const acciones = {
      ArrowLeft: () => mueve(-1),
      ArrowRight: () => mueve(1),
      Home: () => ir(0),
      End: () => ir(max()),
    }
    if (!acciones[e.key]) return
    e.preventDefault()
    acciones[e.key]()
  })

  viewport.addEventListener('scroll', actualiza, { passive: true })

  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(encuadra).observe(viewport)
  } else {
    window.addEventListener('resize', encuadra)
    window.requestAnimationFrame(encuadra)
  }

  if (typeof IntersectionObserver === 'function') {
    const io = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((en) =>
          en.target.classList.toggle(DIMMED, en.intersectionRatio < RATIO_ENTERO)
        ),
      { root: viewport, threshold: [0, RATIO_ENTERO, 1] }
    )
    items.forEach((li) => io.observe(li))
  }
}

export function initPrizeCarousel(root = document) {
  const lista = [
    ...(root.matches?.('[data-prize-carousel]') ? [root] : []),
    ...root.querySelectorAll('[data-prize-carousel]'),
  ]
  lista
    .filter((c) => !c.hasAttribute('data-prize-carousel-ready'))
    .forEach((c) => {
      c.setAttribute('data-prize-carousel-ready', '')
      setup(c)
    })
}

// Autoinicio para el CMS: el snippet se pega con su <script> y arranca solo.
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initPrizeCarousel())
  } else {
    initPrizeCarousel()
  }
}
