import Cookies from 'js-cookie'
import { router } from "@/router";
import router from '../router/index';

const TokenKey = 'Admin-Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function toLogin() {
    router.replace({ path: '/login' })
}