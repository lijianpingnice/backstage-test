import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import errorCode from '@/utils/errorCode'
import { toLogin } from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const instance = axios.create({    //创建axios实例，在这里可以设置请求的默认配置
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: BASE_INFO.VUE_APP_BASE_API,
    // 超时
    timeout: 30000
})

//request拦截器
instance.interceptors.request.use(
    config => {
        // 是否需要设置 token
        const isToken = (config.headers || {}).isToken === false
        if (getToken() && !isToken) {
            config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config
    },
    error => {
        console.error(error)
        Promise.reject(error)
    }
)

//响应拦截器
instance.interceptors.response.use(
    res => {
        let msg = ''
        let data = res.data
        const code = data.code
        if (code != undefined && code != null && code != '') {
            msg = data.msg
        } else {
            msg = errorCode['default']
        }
        if (code === 401) {
            ElMessageBox.confirm(
                '登录状态已过期，您可以继续留在该页面，或者重新登录',
                '系统提示',
                {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            )
                .then(() => {
                    store.dispatch('LogOut').then(() => {
                        toLogin()
                        // OLD location.href = '/index'
                        // 异常返回统一登录页面，需要带当前系统的APPID + 当前path
                        //location.href = `${BASE_INFO.VUE_APP_LOGIN_PAGE}?appId=${store.getters.appId}&path=${store.getters.path}`
                    })
                })
                .catch(() => { })
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else {
            return res.data
        }
    }, error => {
        console.log('err' + error)
        let { message } = error
        if (message == 'Network Error') {
            message = '后端接口连接异常'
        } else if (message.includes('timeout')) {
            message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
            message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        ElMessage({
            message: message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)