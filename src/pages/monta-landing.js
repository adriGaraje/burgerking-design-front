// Lo común a las landings del Roscón. El montaje (cabecera, `<main>`, marcas de snippet) va
// en cada página a la vista, porque es lo que exige el gate de páginas; aquí solo el JS de
// las piezas y la comprobación del orden.
import { expect } from 'storybook/test'
import { initPrizeCarousel } from '../components/prize-carousel/prize-carousel.js'
import { initCountdown } from '../components/countdown/countdown.js'

export const iniciaLanding = (raiz) => {
  initPrizeCarousel(raiz)
  initCountdown(raiz)
  return raiz
}

// El orden de los snippets dentro del `<main>` y que la cabecera y el footer de BK
// estén marcados como suyos (en el código salen como `<header-bk>` / `<footer-bk>`).
export const compruebaPiezas = async (canvasElement, piezas) => {
  const main = canvasElement.querySelector('main')
  await expect([...main.children].map((el) => el.classList[0])).toEqual(piezas)
  const ajenas = canvasElement.querySelectorAll('[data-burgerking-design-front-client-owned]')
  await expect([...ajenas].map((el) => el.dataset.burgerkingDesignFrontClientOwned)).toEqual([
    'header-bk',
    'footer-bk',
  ])
}
