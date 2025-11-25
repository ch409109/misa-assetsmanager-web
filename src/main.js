import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'
import '@fontsource/inter'
import '@fontsource/inter/400.css'
import '@fontsource/inter/400-italic.css'
import 'devextreme/dist/css/dx.light.css'
import { locale, loadMessages } from 'devextreme/localization'
import viMessages from 'devextreme/localization/messages/vi.json'

const app = createApp(App)

loadMessages(viMessages)
locale('vi')

app.use(router)

app.mount('#app')
