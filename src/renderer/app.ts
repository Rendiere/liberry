import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import {
  create,
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider
} from 'naive-ui'

// Create Naive UI instance
const naive = create()
const pinia = createPinia()
const app = createApp(App)
app.use(naive)
app.use(pinia)
app.mount('#app')
