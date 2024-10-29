import { createRouter, createWebHistory } from 'vue-router';
import ListComponent from './components/ListComponent.vue';
import BoardComponent from './components/BoardComponent.vue';

const routes = [
  {
    path: '/',
    name: 'Compteur',
    component: BoardComponent,
  },
  {
    path: '/list',
    name: 'List',
    component: ListComponent,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/', // Redirige vers la page d'accueil ou une autre route
  },
  // Vous pouvez ajouter d'autres routes ici
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;