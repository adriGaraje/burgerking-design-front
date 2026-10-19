# Burgerking-design-front · Maqueta

> New Landing design burgerking project

Plantilla de maquetación: **Storybook + Vite + SCSS ITCSS sobre Bootstrap 4.1.3**, con el
harness de trabajo con Claude Code (skill `burgerking-design-front-flow`, agente Ojo `burgerking-design-front-analyst`, hooks,
gates y docs). Sin piezas, páginas, capturas ni datos: empieza vacía.

Generada con maqueta-starter el 2026-10-19. Bootstrap es la base del esqueleto ITCSS y se puede sustituir (settings, tools y el
import de `main.scss`).

## Primeros pasos

1. **`docs/burgerking-design-front-harness/config.json`**: sustituye cada `"TODO"` y `null` (Jira, Figma,
   Confluence, repo, deploy, `team`). Añade tu ficha a `team` con tu `git config user.email`.
2. **`.env`**: `cp .env.example .env` y rellena `FIGMA_TOKEN` / `FIGMA_FILE_KEY` (y Jira si usas
   el espejo por REST).
3. **Plugins**: instala en tu máquina los que declara `.claude/settings.json` (Atlassian, Figma) y
   autentícate. La instalación es por máquina, no por repo; reinicia Claude Code después.

Luego `npm install`, `npm run storybook` y copia `src/components/_template/` para la primera pieza.

## Cómo arranca el ritual

Al abrir Claude Code en el repo, el hook `SessionStart` carga el contexto (estado, cola de
módulos, quién eres). Si tu alias no está en `state.json → onboarding.hechoPor`, el primer
saludo dispara el onboarding (`docs/burgerking-design-front-harness/onboarding.md`). Después, un saludo
(«buenos días») lanza el arranque de la skill, y una despedida («cerramos») el cierre.

## Presupuesto de tokens (regla)

Tokens de agentes por tarea, sin contar la sesión principal:

| Tarea                                             | Tope   |
| ------------------------------------------------- | ------ |
| Página nueva, de punta a punta                    | ≤ 550k |
| Página por diferencia con una plantilla existente | ≤ 250k |
| Retoque (ciclo corto, sin Ojo)                    | ≤ 100k |

Si una tarea va a pasarse, se para y se dice antes de seguir. Para medir tres números no se
levanta un agente: `npm run medir:story`.

## Gates

`npm run build`, `npm run lint:css`, `npm run format:check` antes de cada PR; `check:stories`
si tocas una story suspendida; `check:plays` para los `play` en rojo.
`npm run check:conexiones` prueba Figma, Jira, GitHub y Firebase con `config.json` y `.env`.
Más gente: añade filas en `config.team` de `docs/burgerking-design-front-harness/config.json`.

## Grupos

Lo que lleva este repo además de la base (Storybook, ITCSS, skill, Ojo, hooks, gates, lecciones):

- `figma` — `tokens:diff`, `figma:ready` y `sitemap:sync`: Figma como fuente de verdad (`FIGMA_TOKEN` en `.env`).
