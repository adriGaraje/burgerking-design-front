// Cabecera de burgerking.es: NO es nuestra, la pone Burger King. Esto es una
// referencia visual aproximada para ver la página completa; en el código publicado
// sale como `<header-bk></header-bk>` (`data-burgerking-design-front-client-owned`,
// ver `.storybook/limpia-fuente.js`).
//
// Textos transcritos de la captura del wireframe (`8206:98`, una imagen en grises).
// Los `href` no se leen en una imagen: van a `#`.

export const DATOS = {
  menuLabel: 'Menú',
  nav: ['Pide ahora', 'Cupones y ofertas', 'Restaurantes', 'Descubre'],
  logo: { src: '/images/roscon-king/logo-bk.svg', alt: 'Burger King' },
  delivery: { label: 'A domicilio o recoger', action: 'Selecciona' },
  crowns: '0',
  cart: '0,00 €',
}

// Iconos aproximados (no son los de BK): hamburguesa, pin, corona y bolsa.
const svg = (cls, path, vb = '0 0 24 24') =>
  `<svg class="${cls}" viewBox="${vb}" aria-hidden="true" focusable="false"><path d="${path}" fill="currentColor" /></svg>`

const ICONO = {
  menu: svg('header-bk__icon', 'M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z'),
  pin: svg(
    'header-bk__icon',
    'M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z'
  ),
  crown: svg('header-bk__icon', 'M3 7l4.5 4L12 5l4.5 6L21 7l-2 11H5L3 7Z'),
  bag: svg('header-bk__icon', 'M7 8V7a5 5 0 0 1 10 0v1h3v13H4V8h3Zm2 0h6V7a3 3 0 0 0-6 0v1Z'),
}

export const renderHeaderBk = ({
  menuLabel = DATOS.menuLabel,
  nav = DATOS.nav,
  logo = DATOS.logo,
  delivery = DATOS.delivery,
  crowns = DATOS.crowns,
  cart = DATOS.cart,
} = {}) => `<header class="header-bk" data-module="site-header" data-burgerking-design-front-client-owned="header-bk">
  <div class="header-bk__bar d-flex align-items-center justify-content-between">
    <nav class="header-bk__nav d-flex align-items-center" aria-label="Principal">
      <button class="header-bk__burger" type="button" aria-label="${menuLabel}">
        ${ICONO.menu}
      </button>
      <ul class="header-bk__links list-unstyled d-none d-xl-flex align-items-center mb-0">
${nav.map((label) => `        <li><a class="header-bk__link" href="#">${label}</a></li>`).join('\n')}
      </ul>
    </nav>
    <a class="header-bk__logo" href="#">
      <img src="${logo.src}" alt="${logo.alt}" width="55" height="56" />
    </a>
    <div class="header-bk__actions d-flex align-items-center">
      <div class="header-bk__delivery d-none d-xl-flex align-items-center">
        ${ICONO.pin}
        <span class="header-bk__delivery-label">${delivery.label}</span>
        <a class="header-bk__delivery-action" href="#">${delivery.action}</a>
      </div>
      <a class="header-bk__pill header-bk__pill--outline d-none d-sm-inline-flex" href="#">
        ${ICONO.crown}
        <span>${crowns}</span>
      </a>
      <a class="header-bk__pill header-bk__pill--solid" href="#">
        ${ICONO.bag}
        <span>${cart}</span>
      </a>
    </div>
  </div>
</header>`

// La cabecera tal cual, para las páginas (`src/pages/cabecera-de-pagina.js`).
export const headerBk = () => renderHeaderBk(DATOS)
