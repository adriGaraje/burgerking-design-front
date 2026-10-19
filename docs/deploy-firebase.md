# Despliegue en Firebase Hosting + login de acceso

Publicamos el Storybook en Firebase Hosting, protegido por un **login** (Firebase Auth) para que solo
entren los correos que damos de alta.

**Dos sitios, la misma build. La rama decide a cuál va:**

|                      | Pre                                 | Pro                             |
| -------------------- | ----------------------------------- | ------------------------------- |
| **URL**              | <https://storybook-bk-pre.web.app>  | <https://storybook-bk.web.app>  |
| **Para qué**         | verificar la entrega antes de darla | la entrega                      |
| **Se publica desde** | `develop`                           | `main`                          |
| **Target**           | `pre` (site `storybook-bk-pre`)     | `entrega` (site `storybook-bk`) |
| **Comando**          | `npm run deploy`                    | `npm run deploy`                |

Proyecto Firebase en ambos casos: **`storybook-bk`**. La única diferencia entre las dos builds es
el rótulo «EN CURSO» del WIP, que se ve en pre y no en pro.

> ⚠️ **PROVISIONAL.** El proyecto está creado en una **cuenta personal** (`comu.pagos@gmail.com`)
> porque aún no hay permisos para crear proyectos en la de la empresa. Ver
> [Migrar a la cuenta de empresa](#migrar-a-la-cuenta-de-empresa).

> **El despliegue es MANUAL.** No hay GitHub Actions: un push a `develop` no publica nada.

## Un solo comando: la rama decide

`npm run deploy` no pregunta a dónde. Lee la rama en la que estás y de ahí sale el destino:

| Rama           | Destino                                      |
| -------------- | -------------------------------------------- |
| `develop`      | **pre** → <https://storybook-bk-pre.web.app> |
| `main`         | **pro** → <https://storybook-bk.web.app>     |
| cualquier otra | aborta y te dice por qué                     |

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

## Migrar a la cuenta de empresa

Cuando haya permisos:

1. Crear el proyecto nuevo y sus dos sitios (`firebase projects:create`,
   `firebase hosting:sites:create`). Los IDs de sitio son únicos en todo Firebase: si se quieren
   conservar `storybook-bk` / `storybook-bk-pre`, primero hay que borrarlos del proyecto personal.
2. `firebase apps:create WEB` + `firebase apps:sdkconfig WEB <appId>` → pegar en
   `auth/firebase-config.js`.
3. `.firebaserc`: proyecto por defecto y `firebase target:apply hosting entrega|pre <site>`.
4. `config.json → deploy`: proyecto, sitios y URLs.
5. Activar Email/Password y volver a dar de alta los usuarios (no se migran solos).
6. `firebase login:use <cuenta de empresa>` en la carpeta del repo y desplegar las dos ramas.
