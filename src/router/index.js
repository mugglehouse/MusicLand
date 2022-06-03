// 引入并使用插件
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 引入路由配置信息
import routes from './routes'

// 路由配置
let router = new Router({
    routes,
    // 路由滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})


// 暴露路由
export default router