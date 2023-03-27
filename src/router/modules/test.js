export default [
    {
        path: 'test-page/page1',
        component: () => import('@/page/test-page/page1/index.vue'),
        name: 'page1',
        meta: {
            title: '动态路由1',
            role: ['admin'],
        }
    },
    {
        path: 'test-page/page2',
        component: () => import('@/page/test-page/page2/index.vue'),
        name: 'page2',
        meta: {
            title: '动态路由2',
            role: ['admin'],
        }
    },
    {
        path: 'test-page/page3',
        component: () => import('@/page/test-page/page3/index.vue'),
        name: 'page3',
        meta: {
            title: '动态路由3',
            role: ['admin'],
        }
    },
]