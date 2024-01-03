import { createApp } from 'vue'
import Animester from './Animester.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(Animester)
    .use(vuetify)
    .mount('#app')
