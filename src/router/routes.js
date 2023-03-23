const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/page/login/index.vue'),
        meta: {
            title: '登陆',
            keepAlive: true,
            requireAuth: false
        }
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