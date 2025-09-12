import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'RechargePersonal', component: () => import('@/pages/RechargePersonal.vue') }, // 懒加载
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
