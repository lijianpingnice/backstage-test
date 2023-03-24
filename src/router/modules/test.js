export default [
    {
        path: 'text-page1',
        component: () => import('@/layout/layoutMain.vue'),
        name: 'text-page1',
        meta: { title: 'text-page1' }
    },
    {
        path: 'text-page2',
        component: () => import('@/layout/layoutMain.vue'),
        name: 'text-page2',
        meta: { title: 'text-page2' }
    },
    {
        path: 'text-page3',
        component: () => import('@/layout/layoutMain.vue'),
        name: 'text-page3',
        meta: { title: 'text-page3' }
    },
]