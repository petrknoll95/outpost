import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(createMetaManager())
app.mount('#app')
