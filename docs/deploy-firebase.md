# Despliegue en Firebase Hosting + login de acceso

Publicamos el Storybook en Firebase Hosting, protegido por un **login** (Firebase Auth) para que solo
entren los correos que damos de alta.

**Dos sitios, la misma build. La rama decide a cuál va:**

|                      | Pre                                           | Pro                                        |
| -------------------- | --------------------------------------------- | ------------------------------------------ |
| **URL**              | <https://burgerking-design-front-pre.web.app> | <https://burgerking-design-front.web.app>  |
| **Para qué**         | verificar la entrega antes de darla           | la entrega                                 |
| **Se publica desde** | `develop`                                     | `main`                                     |
| **Target**           | `pre` (site `burgerking-design-front-pre`)    | `entrega` (site `burgerking-design-front`) |
| **Comando**          | `npm run deploy`                              | `npm run deploy`                           |

Proyecto Firebase en ambos casos: **`burgerking-design-front`**, en la cuenta de Garaje de Ideas. La única diferencia entre las dos builds es
el rótulo «EN CURSO» del WIP, que se ve en pre y no en pro.

> **El despliegue es MANUAL.** No hay GitHub Actions: un push a `develop` no publica nada.

## Un solo comando: la rama decide

`npm run deploy` no pregunta a dónde. Lee la rama en la que estás y de ahí sale el destino:

| Rama           | Destino                                                 |
| -------------- | ------------------------------------------------------- |
| `develop`      | **pre** → <https://burgerking-design-front-pre.web.app> |
| `main`         | **pro** → <https://burgerking-design-front.web.app>     |
| cualquier otra | aborta y te dice por qué                                |

Antes de construir nada, `scripts/deploy.mjs` comprueba dos cosas y aborta si fallan:

- **el árbol está limpio**: si no, publicarías tu carpeta, no la rama;
- **la rama coincide con `origin`**: ni commits sin pushear ni commits sin traer.

Para ver una rama concreta en pre antes de mergearla (a pre, nunca a pro):

```
npm run deploy:pre     # publica la rama actual en pre. Avisa: pre deja de ser develop.
```

Sitios y URLs salen de `docs/burgerking-design-front-harness/config.json → deploy.targets`;
`scripts/deploy.mjs` no lleva ninguno escrito.

**Requisitos (una vez):** `npm i -g firebase-tools` y `firebase login` con una cuenta que tenga
acceso al proyecto. Si tienes varias cuentas, fija la de este repo con
`firebase login:use <correo>` dentro de la carpeta (se guarda por directorio).

## El ciclo de entrega

```
# 1. PR de tarea mergeado a develop
git checkout develop && git pull
npm run deploy                      # → pre. A verificar aquí.

# 2. Visto bueno → PR develop → main, mergeado
git checkout main && git pull
npm run deploy                      # → pro. Esto es lo que ve el cliente.
```

Al publicar desde `main` se crea el tag `entrega/AAAA-MM-DD` (no se empuja solo).

**Git y deploy van por separado a propósito**: primero `git push`, luego `deploy` si toca.

## Login (acceso al Storybook)

- Puerta **client-side** (`auth/guard.js`): sin sesión Firebase → redirige a `/login/`. **En
  `localhost` NO pide login.**
- Pre y pro comparten la puerta y los usuarios: el guard usa rutas relativas al host y el
  `authDomain` es del proyecto, no del site.
- `.storybook/main.js` la inyecta en `managerHead` / `previewHead` en cuanto existe `auth/guard.js`.
- Login: `auth/login/index.html` (email + contraseña). Config pública en `auth/firebase-config.js`
  (la `apiKey` web no es secreta).
- **Alta de usuarios:** Firebase Console → Authentication → **Add user**. Requiere el proveedor
  **Email/Password** activado en Authentication → Sign-in method.
- Si el login falla con `auth/unauthorized-domain`, añade el dominio del sitio en Authentication →
  Settings → **Authorized domains**.

> ⚠️ La puerta es de UI: un asset es técnicamente descargable por URL directa. Suficiente para el
> handoff de diseños.

## Historia

El 19-10-2026, durante unas horas, el Storybook vivió en un proyecto provisional de una cuenta personal
(`storybook-bk`), mientras IT daba permisos. Ese proyecto se ha borrado: los enlaces a
`storybook-bk*.web.app` ya no funcionan.
