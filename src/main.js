import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Animester from './Animester.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { atPolyfill } from "../utils/polyfills";

atPolyfill();

const pinia = createPinia()

const vuetify = createVuetify({
    components,
    directives,
})

createApp(Animester)
    .use(pinia)
    .use(vuetify)
    .mount('#app')
