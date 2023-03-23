const routes = [
    {
        path: '/404',
        name: '404',
        component: () => import('@/page/error/404.vue'),
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
        redirect: '/index',
        component: () => import('@/layout/Layout.vue'),
        meta: {
            title: '首页',
        },
    }
]

export default routes