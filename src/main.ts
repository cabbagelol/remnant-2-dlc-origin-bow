import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './vuetify'

createApp(App)
    .use(vuetify)
    .directive('lazy', {
        inserted: (el) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        observer.disconnect();
                    }
                });
            });
            observer.observe(el);
        },
    })
    .mount('#app')
