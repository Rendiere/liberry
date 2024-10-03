import { createApp } from 'vue'
import App from './App.vue'
import {
  create,
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider
} from 'naive-ui'

// Create Naive UI instance
const naive = create()

const app = createApp(App)
app.use(naive)
app.mount('#app')
