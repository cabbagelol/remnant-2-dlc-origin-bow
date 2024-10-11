import {createWebHistory, createRouter} from 'vue-router'

import MainPage from "../views/MainCalc.vue"
import ShowAllCalcPage from "../views/ShowAllCalc.vue"

const routes: any[] = [
    {path: '', name: 'main', component: MainPage},
    {path: '/showAllCalc', name: 'showAllCalc', component: ShowAllCalcPage}
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
