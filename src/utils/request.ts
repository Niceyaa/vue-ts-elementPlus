import Axios, {Method, ResponseType, AxiosResponse} from 'axios'
import {ElMessageBox, ElMessage} from 'element-plus/lib/components'
import store1,{useStore} from "vuex";
import {getToken} from "./auth";
import qs from 'qs'

interface axiosData {
    url: string,
    method: Method,
    header?: any,
    json?: boolean,
    contentType?: string,
    data?: any,
    params?: any,
    timeout?: number,
    responseType?: ResponseType
}

const service = Axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 15000
})

const store = useStore()
console.log('request store1',store1)
console.log('request store',store)

service.interceptors.request.use(
    (config: any) => {
        if (getToken()) {
            config.headers['token'] = getToken()
        }
        try {
            const prmData = qs.parse(config.data)
            if (!prmData.noLoading) {
                store.commit('SET_LOADING', true)
            }
        }catch (e) {
            console.log(e)
        }
        return config
    }, error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => response,
    error => {
        // store().commit('SET_LOADING',false)
        // global?selfMsg.close():()=>{}
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') > -1) {
            ElMessage({
                message: '当前请求时间较长，网络运行超时，请刷新页面',
                type: 'error',
                duration: 5 * 1000
            })
        } else {
            ElMessage({
                message: error.message,
                type: 'error',
                duration: 5 * 1000
            })
        }
        return Promise.reject(error)
    }
)

export default function request(arr: axiosData) {
    return new Promise<any>((resolve) => {
        service({
            url: arr.url,
            method: arr.method || 'post',
            timeout: arr.timeout || 15000,
            headers: {
                'content-type': arr.contentType ? arr.contentType : arr.json ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            params: arr.params || '',
            data: arr.data || '',
            responseType: arr.responseType || 'json'
        }).then((res: AxiosResponse) => {
            /**
             * response格式
             *
             * {
                  data:{},
                  status:200,
                  statusText:'OK',//从服务器返回的http状态文本
                  headers: {},//响应头信息
                  config: {} //`config`是在请求的时候的一些配置信息
                }
             */
            const responseStatus = `${res.status}`
            store.commit('SET_LOADING', false)
            try {
                if (!res.data.code) return res
            } catch {
                console.log('错错了')
            }
            const response = res.data
            if (response.code !== 200) {
                ElMessage({
                    message: response.msg || 'error',
                    type: 'error',
                    duration: 5 * 1000
                })
                if (response.data.code === 402 || response.data.code === 401) {
                    // to re-login
                    ElMessageBox.confirm('登录身份已过期，请重新登录', '登录过期', {
                        confirmButtonText: '确定',
                        cancelButtonText: '停留',
                        type: 'warning'
                    }).then(() => {
                        // this.$router.push({
                        //     path: '/login'
                        // })
                    }).catch(err => {
                        console.log(333333333)
                    })
                }
                // return Promise.reject(new Error(res.message || 'error'))
                return Promise.reject(new Error(response.message || 'error'))
            } else {
                return resolve(response)
            }
        })
    })
}
