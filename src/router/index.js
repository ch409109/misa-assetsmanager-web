import { createRouter, createWebHistory } from 'vue-router'
import UnderConstruction from '../views/UnderConstruction.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/assets',
    },
    {
      path: '/assets',
      name: 'AssetsManagement',
      component: () => import('../views/asset/AssetsManagement.vue'),
    },
    { path: '/overview', component: UnderConstruction },
    { path: '/infrastructure', component: UnderConstruction },
    { path: '/tools', component: UnderConstruction },
    { path: '/category', component: UnderConstruction },
    { path: '/search', component: UnderConstruction },
    { path: '/report', component: UnderConstruction },

    {
      path: '/:pathMatch(.*)*',
      component: UnderConstruction,
    },
  ],
})

export default router
