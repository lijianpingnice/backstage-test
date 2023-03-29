import { ElMessage } from 'element-plus';
// store中储存的user信息
import { useUserStore } from '@/store/modules/user'
// 获取用户的路由权限
import usePermissionStore from '@/store/modules/permission'
// 跳转到404
import { NOT_FOUND_ROUTE } from '@/router/routes'
// 获取token方法 删除token方法
import { getToken, removeToken } from '@/utils/auth'
// 回到登录页方法
import { toLogin } from '@/utils/auth'

// 路由白名单
const WHITE_LIST = ['/login']
let registerRouteFresh = true
// 创建路由权限守卫方法
export function createPermissionGuard(router) {
    //取store的user信息
    const userStore = useUserStore()
    //路由跳转前判断权限
    router.beforeEach(async (to, from, next) => {
        console.log(router.getRoutes())
        console.log('to')
        //获取token
        const token = getToken()
        //判断有没有token
        if (token) {
            //判断是否是去登录页面
            if (to.path === '/login') {
                // 如果是去登录页面,不做处理直接跳转
                next()
            } else {
                //如果不是去登录页面,尝试获取用户信息
                if (userStore.userId) {
                    next()
                } else {
                    // 如果在store拿不到用户信息,重新调用store里的获取用户信息方法
                    await userStore.getUserInfo().then().catch((error) => {
                        // 如果获取失败删除token
                        removeToken()
                        // 跳转到登录页
                        toLogin()
                        //显示报错信息
                        ElMessage.error(error.message || '获取用户信息失败！')
                        //结束
                        return
                    })
                    // 获取路由表
                    if (userStore) {
                        if (registerRouteFresh) {
                            await initRouter(router)
                            registerRouteFresh = false
                            next({ ...to, replace: true })
                        } else {
                            next()
                        }

                    }
                }
            }
        } else {
            //如果没有token,判断是否是跳转到白名单地址
            if (WHITE_LIST.includes(to.path)) {
                //跳转
                next()
            } else {
                //回到登录页
                next({ path: '/login' })
            }
        }
    })
}

export const initRouter = async (router) => {
    //取store的user信息
    const userStore = useUserStore()
    //获取用户路由权限
    const permissionStore = usePermissionStore()
    const accessRoutes = await permissionStore.generateRoutes(userStore.role)
    accessRoutes.forEach((route) => {
        // 判断有没有这个路由地址如果没有就添加
        !router.hasRoute(route.name) && router.addRoute(route)
    })
    router.addRoute(NOT_FOUND_ROUTE)
}