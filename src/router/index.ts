import { createWebHistory, createRouter } from 'vue-router'

const routes: any[] = [
    {path: '', name: 'main'}
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
