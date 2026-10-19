// Config web de Firebase para la puerta de acceso al Storybook.
// La apiKey web NO es secreta: identifica el proyecto en público y se puede versionar.
// El acceso lo controla Firebase Auth (solo existen las cuentas que damos de alta).
// Proyecto `burgerking-design-front`, en la cuenta de Garaje de Ideas.
export const firebaseConfig = {
  apiKey: 'AIzaSyDeiw1qeU6a3ni4kfJ9AxmhzMTIMkMFoiE',
  authDomain: 'burgerking-design-front.firebaseapp.com',
  projectId: 'burgerking-design-front',
  storageBucket: 'burgerking-design-front.firebasestorage.app',
  messagingSenderId: '750124763508',
  appId: '1:750124763508:web:fff47377e6ca8647558421',
}
