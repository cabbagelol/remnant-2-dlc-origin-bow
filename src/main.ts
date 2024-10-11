import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './vuetify'
import route from "./router"
import VueDisqus from 'vue-disqus'

createApp(App)
    .use(vuetify)
    .use(route)
    .use(VueDisqus, { shortname: 'fremnant-2-dlc-origin-bow' })
    .mount('#app')
