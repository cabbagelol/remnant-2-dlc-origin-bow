import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './vuetify'
import route from "./router"
import VueDisqus from 'vue-disqus'
import pinia from "./state/pinia.ts";
import VueSocialSharing from "vue-social-sharing";

createApp(App)
    .use(vuetify)
    .use(route)
    .use(pinia)
    .use(VueSocialSharing)
    .use(VueDisqus, { shortname: 'fremnant-2-dlc-origin-bow' })
    .mount('#app')
