// Pie de burgerking.es: NO es nuestro, lo pone Burger King. Esto es una referencia
// visual aproximada para ver la página completa; en el código publicado sale como
// `<footer-bk></footer-bk>` (`data-burgerking-design-front-client-owned`, ver
// `.storybook/limpia-fuente.js`).
//
// Textos transcritos de la captura del wireframe (`8206:300`, una imagen en grises),
// tal cual: «Politica Privacidad Chatbot» va sin tilde en el original. Los `href` no
// se leen en una imagen: van a `#`.

export const DATOS = {
  columns: [
    { title: 'Descubre', links: ['MyBK', 'King Jr', 'Cumpleaños y eventos'] },
    {
      title: 'Información y soporte',
      links: [
        'Valores Nutricionales',
        'Listado de Alérgenos',
        'Sin Gluten',
        'Contacto',
        'Preguntas frecuentes',
      ],
    },
    {
      title: 'Sobre nosotros',
      links: ['Trabaja con nosotros', 'Encuentra tu restaurante', 'Sostenibilidad'],
    },
    {
      title: 'Legal y promociones',
      links: [
        'Aviso Legal',
        'Términos y Condiciones Generales',
        'Términos y Condiciones MyBurgerKing',
        'Política de Cookies',
        'Política de Privacidad',
        'Politica Privacidad Chatbot',
        'Bases legales y términos de promociones',
        'Bases Promocionales Licencias',
        'Bases Promocionales Grand King',
        'Adenda Grand King',
        'Bases Promocionales Sorteo Tailandia',
        'Promoción Pringles Vigilantes del Bigote',
        'Bases Promocionales Burger x Pringles',
      ],
    },
  ],
  phone: 'También puedes pedir por teléfono: 911 933 933',
  copyright: 'TM & 2026 Burger King Corporation. Todos los derechos reservados.',
  logo: { src: '/images/roscon-king/logo-bk.svg', alt: 'Burger King' },
  language: 'ES',
  social: ['Instagram', 'Facebook', 'YouTube', 'TikTok'],
  cookies: 'Configuración de cookies',
}

// Iconos aproximados (no son los de BK).
const svg = (path) =>
  `<svg class="footer-bk__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${path}" fill="currentColor" fill-rule="evenodd" /></svg>`

const ICONO = {
  globe: svg(
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 2.07A8 8 0 0 0 4.07 11H8c.1-2.6.9-5 2-6.93ZM14 4.07c1.1 1.93 1.9 4.33 2 6.93h3.93A8 8 0 0 0 14 4.07ZM14 11c-.1-2.4-.9-4.6-2-6.3-1.1 1.7-1.9 3.9-2 6.3h4Zm-4 2c.1 2.4.9 4.6 2 6.3 1.1-1.7 1.9-3.9 2-6.3h-4Zm-5.93 0A8 8 0 0 0 10 19.93C8.9 18 8.1 15.6 8 13H4.07ZM16 13c-.1 2.6-.9 5-2 6.93A8 8 0 0 0 19.93 13H16Z'
  ),
  Instagram: svg(
    'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z'
  ),
  Facebook: svg(
    'M3 2h18a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1h-5v-7.5h2.5l.5-3h-3V9.5c0-.9.4-1.5 1.6-1.5H19V5.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4 1.5-4 4.2v2.1H10v3h2.5V22H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z'
  ),
  YouTube: svg(
    'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z'
  ),
  TikTok: svg(
    'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm1.5 4v7.6a2 2 0 1 1-2-2V9.5a4 4 0 1 0 4 4V9.7a5 5 0 0 0 2.5.8V8.4A2.6 2.6 0 0 1 15.6 6h-2.1Z'
  ),
}

const columna = ({
  title,
  links,
}) => `      <div class="col-12 col-sm-6 col-lg-3 footer-bk__column">
        <h2 class="footer-bk__heading">${title}</h2>
        <ul class="list-unstyled mb-0">
${links.map((l) => `          <li><a class="footer-bk__link" href="#">${l}</a></li>`).join('\n')}
        </ul>
      </div>`

export const renderFooterBk = ({
  columns = DATOS.columns,
  phone = DATOS.phone,
  copyright = DATOS.copyright,
  logo = DATOS.logo,
  language = DATOS.language,
  social = DATOS.social,
  cookies = DATOS.cookies,
} = {}) => `<footer class="footer-bk" data-burgerking-design-front-client-owned="footer-bk">
  <div class="footer-bk__inner">
    <nav class="row footer-bk__columns" aria-label="Pie">
${columns.map(columna).join('\n')}
    </nav>
    <hr class="footer-bk__rule" />
    <div class="row align-items-center footer-bk__bottom">
      <div class="col-12 col-lg-6 footer-bk__small">
        <p>${phone}</p>
        <p class="mb-0">${copyright}</p>
      </div>
      <div class="col-12 col-sm-6 col-lg-3 footer-bk__brand">
        <img src="${logo.src}" alt="${logo.alt}" width="39" height="40" />
      </div>
      <div class="col-12 col-sm-6 col-lg-3 d-flex align-items-center justify-content-sm-end footer-bk__social">
        <span class="footer-bk__lang">${ICONO.globe}${language}</span>
${social.map((red) => `        <a class="footer-bk__social-link" href="#" aria-label="${red} de Burger King">${ICONO[red] ?? ''}</a>`).join('\n')}
      </div>
    </div>
    <hr class="footer-bk__rule" />
    <button class="footer-bk__cookies" type="button">${cookies}</button>
  </div>
</footer>`

// El pie tal cual, para las páginas.
export const footerBk = () => renderFooterBk(DATOS)
