import { createApp } from 'vue' //引入vue
import "./styles/index.less" //引入全局样式
import App from './App.vue' //引入路口组件
import store from './store' //引入状态管理
import setupRouter from './router' //引入路由

import ElementPlus from 'element-plus' //引入element-plus
import 'element-plus/dist/index.css' //引入element-plus样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //引入element-plus图标

//创建vue实例
const app = createApp(App)

// 注册状态管理
app.use(store)

// 注册路由
setupRouter(app)

// 注册element-plus
app.use(ElementPlus)

// 注册element-plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
