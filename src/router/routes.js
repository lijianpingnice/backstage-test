import Layout from '@/layout/Layout.vue'

const routes = [
    {
        path: '/',
        redirect: '/index',
        component: Layout,
        meta: {
            title: '首页',
        },
        children: [
            {
                path: '/index',
                name: 'Index',
                component: () => import('@/page/index/index.vue'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/login',
                name: 'Login',
                component: () => import('@/page/login/index.vue'),
                meta: {
                    title: '登陆',
                    keepAlive: true,
                    requireAuth: false
                }
            }
        ]
    }
]

export default routes