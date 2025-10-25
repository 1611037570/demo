// 导入 Pinia 状态管理
import { createPinia } from 'pinia'
// 导入 Pinia 持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 导入 Vue 应用创建函数
import { createApp } from 'vue'

// 导入根组件
import App from './App.vue'
// 导入路由配置
import router from './routers'
// 导入全局样式
import './styles/index.css'

// 创建 Vue 应用实例
const app = createApp(App)
// 创建 Pinia 实例
const pinia = createPinia()

// 注册持久化插件
pinia.use(piniaPluginPersistedstate)

// 注册 Pinia 状态管理
app.use(pinia)
// 注册路由
app.use(router)

// 挂载应用到 DOM
app.mount('#app')
