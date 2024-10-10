import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './vuetify'
import route from "./router"

createApp(App)
    .use(vuetify)
    .use(route)
    .mount('#app')
