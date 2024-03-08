import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

let installPromptEvent;

const app = createApp(App);

window.addEventListener('beforeinstallprompt', (event) => {
  // Empêche l'événement par défaut pour éviter qu'il ne soit automatiquement affiché
  event.preventDefault();
  // Stocke l'événement pour l'utiliser ultérieurement
  installPromptEvent = event;
});


app.mount('#app');
