import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importez le routeur
import './registerServiceWorker';
import VueGtag from 'vue-gtag';

let installPromptEvent;

const app = createApp(App);

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPromptEvent = event;
});

app.use(VueGtag, {
  appName: 'Ma Cour',
  pageTrackerScreenviewEnabled: true,
  config: { id: 'G-JZ9N94LZYM' },
});

app.use(router); // Utilisez le routeur

app.mount('#app');