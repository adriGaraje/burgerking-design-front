// Config web de Firebase para la puerta de acceso al Storybook.
// La apiKey web NO es secreta: identifica el proyecto en público y se puede versionar.
// El acceso lo controla Firebase Auth (solo existen las cuentas que damos de alta).
//
// PROVISIONAL: proyecto `storybook-bk` en una cuenta personal mientras llegan los
// permisos de la empresa. Al migrar, se cambia esto, .firebaserc y config.json → deploy.
export const firebaseConfig = {
  apiKey: 'AIzaSyDEb0CFH_B9aGYBnCLynlEkK4MIsm1BnJY',
  authDomain: 'storybook-bk.firebaseapp.com',
  projectId: 'storybook-bk',
  storageBucket: 'storybook-bk.firebasestorage.app',
  messagingSenderId: '170722937005',
  appId: '1:170722937005:web:d2daaf862305a98f7ade24',
}
