import { resolveToken } from '../utils'

const token = {
    admin: 'admin',
    editor: 'editor',
}

export default [
    {
        url: '/api/auth/login',
        method: 'post',
        response: ({ body }) => {
            console.log(body)
            if (['admin', 'editor'].includes(body?.name)) {
                if (body?.password === '123456') {
                    return {
                        code: 0,
                        data: {
                            token: token[body.name],
                        },
                    }
                } else {
                    return {
                        code: -1,
                        message: `密码错误${body?.password === '123456'}`,
                    }
                }
            } else {
                return {
                    code: -1,
                    message: '没有此用户',
                }
            }
        },
    },
    {
        url: '/api/auth/refreshToken',
        method: 'post',
        response: ({ headers }) => {
            return {
                code: 0,
                data: {
                    token: resolveToken(headers?.authorization),
                },
            }
        },
    },
]