import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'
import '@fontsource/inter'
import '@fontsource/inter/400.css'
import '@fontsource/inter/400-italic.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
