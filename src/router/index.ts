import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'demo',
    component: () => import('@/views/demo.vue'),
    meta: {
      title: 'Three3dTemplate',
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router