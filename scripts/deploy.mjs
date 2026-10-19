#!/usr/bin/env node
// Despliegue por rama: la rama decide el destino, no quien teclea.
//   develop → pre  (verificación interna)   ·   main → pro (entrega al cliente)
// Cualquier otra rama solo puede ir a pre, y con --pre explícito.
//
// El árbol tiene que estar limpio y la rama al día con origin: publicar algo que no
// está pusheado es exactamente cómo se genera la deriva entre el sitio y el repo.
//
// Sitios y URLs salen de config.json → deploy.targets: al cambiar de proyecto Firebase
// se toca ahí, en .firebaserc y en auth/firebase-config.js. Este fichero no.

import { execFileSync, execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = fileURLToPath(new URL('..', import.meta.url))
const leer = (r) => JSON.parse(readFileSync(join(RAIZ, r), 'utf8'))

const { targets } = leer('docs/burgerking-design-front-harness/config.json').deploy

const DESTINOS = {
  [targets.pre.rama]: { target: targets.pre.hostingTarget, url: targets.pre.url, label: 'PRE' },
  [targets.entrega.rama]: {
    target: targets.entrega.hostingTarget,
    url: targets.entrega.url,
    label: 'PRO · ENTREGA',
  },
}

const PRE = DESTINOS[targets.pre.rama]

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()

const abortar = (mensaje) => {
  console.error(`\n  ✖ ${mensaje}\n`)
  process.exit(1)
}

const forzarPre = process.argv.includes('--pre')
const rama = git('rev-parse', '--abbrev-ref', 'HEAD')

// ── Qué destino toca ─────────────────────────────────────────────────────────
let destino = DESTINOS[rama]

if (forzarPre) destino = PRE

if (!destino) {
  abortar(
    `Estás en "${rama}", y solo "develop" (→ pre) y "main" (→ pro) publican solas.\n` +
      `    Si quieres ver ESTA rama en pre para verificarla: npm run deploy:pre`
  )
}

if (rama === targets.entrega.rama && forzarPre) {
  abortar('--pre desde main no tiene sentido: main es la entrega. Usa "npm run deploy".')
}

// ── Que lo que se publica sea lo que hay en origin ───────────────────────────
if (git('status', '--porcelain')) {
  abortar(
    'El árbol tiene cambios sin commitear. Se publicaría tu carpeta, no la rama:\n' +
      '    commitea o guarda en stash antes de desplegar.'
  )
}

let upstream
try {
  upstream = git('rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{upstream}')
} catch {
  abortar(`La rama "${rama}" no está en origin todavía. Pushéala antes de publicarla.`)
}

execFileSync('git', ['fetch', '--quiet', 'origin', rama], { stdio: 'inherit' })

const local = git('rev-parse', 'HEAD')
const remoto = git('rev-parse', upstream)

if (local !== remoto) {
  const [detras, delante] = git('rev-list', '--left-right', '--count', `${upstream}...HEAD`).split(
    /\s+/
  )
  abortar(
    `"${rama}" y ${upstream} no coinciden (${delante} commit(s) sin pushear, ${detras} sin traer).\n` +
      '    Haz push/pull hasta que coincidan: el sitio debe reflejar lo que ve el equipo.'
  )
}

// ── Revisión de lo construido, ANTES de subirlo ──────────────────────────────
// Mira el resultado, no el código: una build en verde puede venir vacía.
function revisaLaEntrega() {
  const indice = leer('storybook-static/index.json')
  const titulos = new Set(Object.values(indice.entries ?? {}).map((e) => e.title))
  console.log(`    revisión · ${titulos.size} títulos`)
  if (titulos.size === 0) abortar('La build no tiene ni una entrada. No se ha subido nada.')
}

// ── Construir y publicar ─────────────────────────────────────────────────────
console.log(`\n  ▸ ${destino.label}  ·  rama ${rama}  ·  ${local.slice(0, 7)}`)
console.log(`    ${destino.url}\n`)

// El destino viaja a la build (rótulo «EN CURSO» solo en pre). Es la única
// diferencia entre las dos builds y conviene que siga siéndolo.
execSync('npm run build-storybook', {
  stdio: 'inherit',
  env: { ...process.env, BURGERKING_DESIGN_FRONT_DESTINO: destino.target },
})

revisaLaEntrega()

execSync(`npx firebase-tools deploy --only hosting:${destino.target}`, { stdio: 'inherit' })

console.log(`\n  ✔ ${destino.label} publicado desde ${rama}@${local.slice(0, 7)}`)
console.log(`    ${destino.url}\n`)

// ── Marcar la entrega ────────────────────────────────────────────────────────
// Solo desde main. Se crea después de publicar (si el deploy falla, no queda
// marcada una entrega que nadie ha recibido) y no se empuja solo: eso es del humano.
if (rama === targets.entrega.rama) {
  const hoy = new Date().toISOString().slice(0, 10)
  const tag = `entrega/${hoy}`

  if (git('tag', '--list', tag)) {
    console.log(`  · Ya existe el tag ${tag}; no se toca.`)
    console.log('    Si esta es otra entrega del mismo día, ponle sufijo a mano.\n')
  } else {
    execSync(`git tag -a ${tag} -m "Entrega ${hoy} — publicada en ${destino.url}"`, {
      stdio: 'inherit',
    })
    console.log(`  ✔ Entrega marcada como ${tag}`)
    console.log(`    Empújalo para que lo tenga el equipo:  git push origin ${tag}\n`)
  }
}
