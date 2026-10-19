// Story de la cuenta atrás. La fecha objetivo por defecto es relativa a «ahora»
// (+9 d 10 h 25 min 27 s) para que arranque con los números del wireframe y no caduque.
import { expect, waitFor } from 'storybook/test'
import html from './countdown.html?raw'
import { sinComentarios } from '../../stories/lib/hooks.js'
import { VARIANTES, renderCountdown, objetivoRelativo } from './datos-countdown.js'
import { initCountdown } from './countdown.js'

const V = VARIANTES.oleada1

// Igualdad de marcado sin depender del formato de Prettier.
const normaliza = (s) =>
  sinComentarios(s)
    .replace(/\s*\/?>/g, '>')
    .replace(/\s+</g, '<')
    .replace(/>\s+/g, '>')
    .replace(/\s+/g, ' ')
    .trim()

const aPieza = ({ label = V.label, target = '', doneText = V.doneText } = {}) => ({
  label,
  target: target || objetivoRelativo(),
  doneText,
})

const render = (args) => {
  const caja = document.createElement('div')
  caja.innerHTML = renderCountdown(aPieza(args))
  initCountdown(caja)
  return caja
}

export default {
  title: 'Basics/Countdown',
  tags: ['WIP'],
  render,
  args: { label: V.label, target: '', doneText: V.doneText },
  argTypes: {
    label: {
      name: 'Label',
      control: 'text',
      description: 'Texto sobre la caja («Quedan»).',
    },
    target: {
      name: 'Target date',
      control: 'text',
      description:
        'Fecha objetivo en ISO 8601 con zona (`2026-12-20T23:59:59+01:00`). Vacío: «ahora» + 9 d 10 h 25 min 27 s (solo en Storybook).',
    },
    doneText: {
      name: 'Done text',
      control: 'text',
      description: 'Texto que sustituye a la cuenta al llegar a 0. Vacío: se queda en ceros.',
    },
  },
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HBpZap8ASqhsHPCTpe7OMN/?node-id=8206-242',
    },
    docs: {
      description: {
        component:
          'Cuenta atrás reutilizable: «Quedan X días X horas X minutos X segundos». La fecha va en `data-countdown-target` (ISO 8601 con zona) y `countdown.js` (`initCountdown`) recalcula los números cada segundo; el HTML trae los del wireframe (9 / 10 / 25 / 27) para que se lea sin JS. Se cambian la etiqueta, la fecha y el texto al terminar (`data-countdown-done-text`). Para lectores de pantalla se anuncia como mucho una vez por minuto. **Pendiente de diseño:** la fecha real y su zona horaria, qué pasa al llegar a 0 y los colores (la caja gris del wireframe va en crema de marca, provisional). En el wireframe está oculta dentro de `Snippets/Menu Grid`.',
      },
      source: { language: 'html', transform: (_c, ctx) => renderCountdown(aPieza(ctx.args)) },
    },
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    await expect(normaliza(html)).toBe(normaliza(renderCountdown(V)))
    await expect(canvasElement.querySelector('[data-countdown-ready]')).not.toBeNull()
    await expect(canvasElement.querySelector('[data-countdown-value="days"]').textContent).toBe('9')
  },
}

// Fecha ya pasada: enseña el texto de fin en lugar de la caja.
export const Ended = {
  args: { target: '2020-01-01T00:00:00+01:00', doneText: 'Lorem ipsum dolor sit amet' },
  play: async ({ canvasElement }) => {
    await waitFor(() =>
      expect(canvasElement.querySelector('[data-countdown-label]').textContent).toBe(
        'Lorem ipsum dolor sit amet'
      )
    )
    await expect(canvasElement.querySelector('[data-countdown-box]').hidden).toBe(true)
  },
}
