import { defineStore } from "pinia";
import { asyncRoutes, basicRoutes } from '@/router/routes'

//判断路由是否有访问权限设置
function hasPermission(route, role) {
    const routeRole = route.meta?.role ? route.meta.role : []
    if (!role.length || !routeRole.length) return false
    return role.some((item) => routeRole.inclides(item))
}

// 获取所有有访问权限的路由的表
function filterAsyncRoutes(routes = [], role) {
    const ret = []
    routes.forEach(route => {
        if (hasPermission(route, role)) {
            const curRoute = {
                ...route,
                children: []
            }
            if (route.children && route.children.length) {
                curRoute.children = filterAsyncRoutes(route.children, role)
            } else {
                // 删除curRoute上的children属性
                Reflect.deleteProperty(curRoute, 'children')
            }
            ret.push(curRoute)
        }
    })
    return ret
}

export const usePermissionStore = defineStore({
    id: 'permission',
    state: () => {
        return {
            accessRoutes: []
        }
    },
    getters: {
        routes() {
            return [...basicRoutes, ...this.accessRoutes]
        },
        menus() {
            return this.routes.filter(route => route.name && !route.isHidden)
        }
    },
    actions: {
        // 生成用户路由表
        generateRoutes(role = []) {
            const accseeRoutes = filterAsyncRoutes(asyncRoutes, role)
            this.accseeRoutes = accseeRoutes
            return accseeRoutes
        }
    }
})