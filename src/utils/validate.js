const pass = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*()_.]+)$)^[\w~!@#$%^&*()_.]{8,16}$/
const isChinese = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/
export function validatorPass(rule, value, callback) {
    if (value === undefined || value === null || value === '') {
        callback(new Error('请输入密码!'))
    } else if (pass.test(value) === false) {
        callback(new Error('密码应为字母，数字，特殊符号(~!@#$%^&*()_.)，两种及以上组合，8-16位字符串，如：xyl37@baa!'))
    } else {
        callback()
    }
}
export function validatorAccountNumber(rule, value, callback) {
    if (value === undefined || value === null || value === '') {
        callback(new Error('请用户账号!'))
    } else if (isChinese.test(value) === true) {
        callback(new Error('不允许输入中文与中文字符!'))
    } else {
        callback()
    }
}