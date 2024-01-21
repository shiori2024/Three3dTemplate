import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入路由
import router from '@/router'


createApp(App).use(router).mount('#app')
