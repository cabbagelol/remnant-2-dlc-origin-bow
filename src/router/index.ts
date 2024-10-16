import {createWebHistory, createRouter} from 'vue-router'

import MainPage from "../views/MainCalc.vue"
import ShowAllCalcPage from "../views/ShowAllCalc.vue"
import SettingPage from "../views/Setting.vue"
import About from "../views/About.vue";

const routes: any[] = [
    {path: '', name: 'main', component: MainPage},
    {path: '/all-calc', name: 'showAllCalc', component: ShowAllCalcPage},
    {path: '/setting', name: 'setting', component: SettingPage},
    {path: '/about', component: About}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior () {
        return { top: 0 }
    }
})

export default router;
