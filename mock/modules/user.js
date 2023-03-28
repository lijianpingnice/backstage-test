import { resolveToken } from '../utils'
const users = {
    admin: {
        id: 1,
        name: 'admin',
        avatar: 'https://assets.qszone.com/images/avatar.jpg',
        email: 'Ronnie@123.com',
        role: ['admin'],
    },
    editor: {
        id: 2,
        name: 'editor',
        avatar: 'https://assets.qszone.com/images/avatar.jpg',
        email: 'Ronnie@123.com',
        role: ['editor'],
    },
    guest: {
        id: 3,
        name: 'guest',
        avatar: 'https://assets.qszone.com/images/avatar.jpg',
        role: [],
    },
}
const userRouters = JSON.stringify([
    {
        path: '',
        component: 'Layout',
        redirect: 'page1',
        meta: {
            role: ['admin'],
        },
        name: 'test-view1',
        isHidden: false,
        children: [
            {
                name: 'page1',
                path: '/page1',
                component: 'test-view/page1/index.vue',
                meta: {
                    title: '动态路由1',
                    role: ['admin'],
                },
                children: [
                    {
                        name: 'user1',
                        path: '/user1',
                        component: 'test-view/page1/user1/index.vue',
                        meta: {
                            title: 'user1',
                            role: ['admin'],
                        },
                    }
                ]
            }
        ]
    },
    {
        path: '',
        component: 'Layout',
        redirect: 'page3',
        meta: {
            role: ['admin'],
        },
        isHidden: false,
        name: 'test-view3',
        children: [
            {
                name: 'Page3',
                path: '/page3',
                component: 'test-view/page3/index.vue',
                meta: {
                    title: '动态路由3',
                    role: ['admin'],
                },
                children: [
                    {
                        name: 'user3',
                        path: '/user3',
                        component: 'test-view/page3/user3/index.vue',
                        meta: {
                            title: 'user3',
                            role: ['admin'],
                        },
                    }
                ]
            }
        ]
    },
    {
        path: '',
        component: 'Layout',
        redirect: 'page2',
        meta: {
            role: ['editor'],
        },
        isHidden: false,
        name: 'test-view2',
        children: [
            {
                name: 'Page2',
                path: '/page2',
                component: 'test-view/page2/index.vue',
                meta: {
                    title: '动态路由2',
                    role: ['editor'],
                },
                children: [
                    {
                        name: 'user2',
                        path: '/user2',
                        component: 'test-view/page2/user2/index.vue',
                        meta: {
                            title: 'user2',
                            role: ['admin'],
                        },
                    }
                ]
            }
        ]
    },
])
export default [
    {
        url: '/api/user/userIfo',
        method: 'get',
        response: ({ headers }) => {
            const token = resolveToken(headers?.authorization)
            return {
                code: 0,
                data: {
                    ...(users[token] || users.guest),
                },
            }
        },
    },
    {
        url: '/api/user/getRouterList',
        method: 'get',
        response: ({ headers }) => {
            const token = resolveToken(headers?.authorization)
            return {
                code: 0,
                data: userRouters,
            }
        },
    },

]