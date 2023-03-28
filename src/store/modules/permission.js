import { defineStore } from "pinia";
import { asyncRoutes, basicRoutes } from '@/router/routes'
import { getRouters } from '@/api/user'
import Layout from '@/layout/index.vue'
import LayoutMain from '@/layout/layoutMain.vue';
import { sStorage } from '@/utils/cache';
// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../page/**/*.vue')

//判断路由是否有访问权限设置
function hasPermission(route, role) {
    const routeRole = route.meta?.role ? route.meta.role : []
    if (!role.length || !routeRole.length) return false
    return role.some((item) => routeRole.includes(item))
}

// 获取所有有访问权限的路由的表
function filterAsyncRoutes(routes = [], role) {
    const ret = []
    routes.forEach(route => {
        if (hasPermission(route, role)) {
            if (route.component) {
                if (route.component === 'Layout') {
                    route.component = Layout
                } else if (route.component === 'LayoutMain') {
                    route.component = LayoutMain
                } else {
                    route.component = loadView(route.component)
                }
            }
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

export function createNavMenus(allRoutes = []) {
    function mapItem(data = []) {
        return data.map((s) => {
            let children = []
            if (s.children && s.children.length > 0) {
                children = mapItem(s.children) || []
            }
            return {
                title: s.meta?.name,
                children: children.length === 0 ? undefined : children
            }
        })
    }
    function filterItem(data = []) {
        return data.filter((s) => {
            if (s.children && s.children.length > 0) {
                s.children = filterItem(s.children)
            }
            return true
        })
    }
    return filterItem(mapItem(allRoutes))
}

const usePermissionStore = defineStore({
    id: 'permission',
    state: () => {
        return {
            accessRoutes: [],
            authNavMenus: []
        }
    },
    getters: {
        routes() {
            return basicRoutes.concat(this.accessRoutes)
        },
        menus() {
            return this.routes.filter(route => route.name && !route.isHidden)
        }
    },
    actions: {
        // 生成用户路由表
        async generateRoutes(role = []) {
            const authAsyncRoutes = sStorage.get('UserRoutes')
            const authNavMenus = sStorage.get('UserMenus')
            if (authAsyncRoutes && authNavMenus) {
                this.authNavMenus = authNavMenus
                return authAsyncRoutes
            }



            if (role && Array.isArray(role) && role.length > 0) {
                const res = await getRouters()
                const accessRoutes = filterAsyncRoutes(JSON.parse(res.data), role)
                this.accessRoutes = accessRoutes
                this.authNavMenus = createNavMenus(basicRoutes.concat(this.accessRoutes))
                sStorage.set('UserRoutes', accessRoutes)
                sStorage.set('UserMenus', this.authNavMenus)
                return accessRoutes
            }

        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'my_routes',
                //storage: localStorage,
            }
        ]
    }
})

export default usePermissionStore
export const loadView = (view) => { // 路由懒加载
    let res;
    for (const path in modules) {
        const dir = path.split('page/')[1];
        if (dir === view) {
            res = () => modules[path]();
        }
    }
    return res;
}