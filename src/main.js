import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from "./router";

loadFonts()

const app =createApp(App);
app.use(router);
app.use(vuetify,{ theme: {
    custom_blue: '#14213D',
    custom_yellow: '#FCA311',
    custom_grey: '#E5E5E5'
}});
app.mount('#app')
