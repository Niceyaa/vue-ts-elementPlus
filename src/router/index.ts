import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'Home',
    component: Home
  },
  {
    path: '/sysTemplate',
    name:'sysTemplate',
    component: ()=>import('../views/sysTemplate/index.vue')
  },
  // {
  //   path: '/sysTemplate/detail/:id',
  //   name:'sysTemplateDetail',
  //   component: ()=>import('../views/sysTemplate/detail.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
