// 在ts中使用时，需要  npm i @types/js-cookie 或者 tsconfig设置 noImplicitAny 为true（不推荐）
import Cookie from 'js-cookie'

const tokenKey = 'smdToken'

export function getToken() {
    return Cookie.get(tokenKey)
}

export function setToken(token:any){
    return Cookie.set(tokenKey,token,{'expires':30})
}

export function removeToken(){
    return Cookie.remove(tokenKey)
}
