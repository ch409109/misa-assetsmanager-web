import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AssetsManagement',
      component: () => import('../views/asset/AssetsManagement.vue'),
    },
  ],
})

export default router
