import Layout from '@/layout/index.vue'
// 静态路由
export const basicRoutes = [
    {
        path: '/404',
        name: '404',
        component: () => import('@/page/error-page/404.vue'),
        isHidden: true,
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/page/login/index.vue'),
        meta: {
            title: '登陆',
            keepAlive: true,
            requireAuth: false
        },
        isHidden: true,
    },
    {
        path: '/',
        component: Layout,
        redirect: 'index',
        children: [
            {
                path: 'index',
                component: () => import('@/page/index/index.vue'),
                name: 'Index',
                meta: { title: '首页' }
            }
        ]
    }
]
//跳转到404
export const NOT_FOUND_ROUTE = {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    isHidden: true,
}

// modules文件夹下的路由都会作为动态路由
const modules = import.meta.globEager('./modules/*.js')
const asyncRoutes = []
Object.keys(modules).forEach((key) => {
    asyncRoutes.push(...modules[key].default)
})
// 动态路由
export { asyncRoutes }