import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入路由守卫
import './utils/permission'

// import 'element-plus/theme-chalk/el-message.css'

// 全局引入element-plus
import ElementPlus from 'element-plus'
import {ElMessage} from 'element-plus'
import "element-plus/dist/index.css"

const app = createApp(App)

import commonComponents from './components/common'
commonComponents.forEach(item=>{
    app.component(item.name,item.component)
})


app.use(ElementPlus)

app.use(store).use(router).mount('#app')
