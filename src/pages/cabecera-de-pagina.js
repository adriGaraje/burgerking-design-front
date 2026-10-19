// Cabecera de página: la monta toda página, fuera del `<main>`. Es la de burgerking.es
// (`src/layouts/header-bk/`), que pone Burger King: aquí se pinta como referencia y en
// el código publicado queda como `<header-bk></header-bk>`.
//
// La API (`{ seccion, sub }`) se conserva para el estándar de páginas, pero la cabecera
// de BK no tiene submenú ni sección marcada: los dos argumentos se ignoran.
import { expect } from 'storybook/test'
import { headerBk } from '../layouts/header-bk/datos-header-bk.js'

export const cabeceraDePagina = ({ seccion = '', sub = '' } = {}) => headerBk()

// Una sola cabecera (`data-module="site-header"`) y fuera del `<main>`. Sin
// comprobaciones de submenú: la de BK no lo tiene.
export const compruebaCabecera = async (canvasElement, { seccion = '', sub = '' } = {}) => {
  const cabeceras = canvasElement.querySelectorAll('[data-module="site-header"]')
  await expect(cabeceras).toHaveLength(1)
  await expect(cabeceras[0].closest('main')).toBeNull()
}
