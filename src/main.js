import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { setupFonts } from './assets/fontLoader'

// Initialize fonts
setupFonts()

const app = createApp(App)
app.use(router)
app.mount('#app')
