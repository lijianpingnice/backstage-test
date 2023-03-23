import request from '@/utils/axios'

// 获取用户信息
export function getUser(query) {
    return request({
        url: `/hzh/freightPrice/page/air`,
        method: 'POST',
        data: query
    })
}