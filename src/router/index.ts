import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { createRoutes } from '@/utils/createRoutes'
import Index from '@/views/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  ...await createRoutes()
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
