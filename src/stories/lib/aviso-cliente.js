// Franja encima de las piezas que pone el cliente (cabecera y pie de burgerking.es).
// Es un decorador: rodea la story en el canvas y no viaja al código publicado. El
// envoltorio lleva `data-burgerking-design-front-preview`, que limpia-fuente.js desenvuelve,
// y la franja `data-burgerking-design-front-client-note`, que se quita entera.
export const avisoCliente = (etiqueta) => (story) => `
<div data-burgerking-design-front-preview>
  <p data-burgerking-design-front-client-note style="margin:0;padding:10px 16px;background:#fbf4d0;color:#5c4d00;font:600 13px/1.4 'Segoe UI',system-ui,sans-serif;border-bottom:1px solid #eadf9f">
    Pieza del cliente: la pone Burger King en burgerking.es. Aquí solo se enseña para ver la
    página completa; no forma parte de la entrega. En el código va su etiqueta,
    <code style="font-weight:700">&lt;${etiqueta}&gt;&lt;/${etiqueta}&gt;</code>.
  </p>
  ${story()}
</div>`
