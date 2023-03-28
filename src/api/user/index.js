import request from '@/utils/axios'

//登录方法
export function login(query) {
    return request({
        url: `/auth/login`,
        method: 'POST',
        data: query
    })
}
// 获取用户信息
export function getUser(query) {
    return request({
        url: `/user/userIfo`,
        method: 'GET',
        data: query
    })
}

// 获取用户路由表
export function getRouters(query) {
    return request({
        url: `/user/getRouterList`,
        method: 'GET',
        data: query
    })
}