import { createStore,mapState } from 'vuex'
import qs from 'qs'

import { setToken, removeToken } from "@/utils/auth";

import { loginPwd, loginOut, getUserInfo, getUserVipInfo } from '@/api/user'
import { getIndustryList,getBtmInfo,getSpecialFodderAndTemplate,getHotTags } from '@/api/commonApi';

import type {State} from '../type/store.d'

let state:State = {
    smdToken: null,
    userInfo: {
    },
    userVipInfo: {
        memberFlag:false
    },
    globalLoading: false,
    // 标书制作弹窗控制
    makeDialogFlag: false,
    //登录弹窗控制标识
    loginFlag: false,
    //登录弹窗模块
    loginModule: 'pwdLogin',
    //vip标识
    vipFlag: false,
    //开始制作标识
    makeDocFlag: false,
    //热门标签
    hotTags: [],
    //行业标签
    industryData: [],
    //底部公共信息
    btmNavInfo: {},
    //特色模板、素材
    specialInfo: {},

    wpsPage1Url: null,
    wpsPage1Token: null,
}

const store = createStore({
    state,
    mutations: {
        SET_TOKEN: (state, smdToken:string) => {
            state.smdToken = smdToken
        },
        SET_INFO: (state, userInfo) => {
            state.userInfo = userInfo
        },
        SET_VIP_INFO: (state, userInfo) => {
            state.userVipInfo = userInfo
        },
        SET_LOADING: (state, flag:boolean) => {
            state.globalLoading = flag
        },
        SET_LOGIN: (state, flag:boolean) => {
            console.log('修改登录flag', state, flag)
            state.loginFlag = flag
        },
        SET_LOGIN_MODULE: (state, module:string) => {
            state.loginModule = module
        },
        SET_VIP_FLAG: (state, flag:boolean) => {
            state.vipFlag = flag
        },
        SET_MAKE_DOC_FLAG: (state, flag:boolean) => {
            state.makeDocFlag = flag
        },
        SET_HOT_TAGS: (state, tags:Array<object>) => {
            state.hotTags = tags
        },
        SET_INDUSTRY_DATA: (state, ins) => {
            state.industryData = ins
        },
        SET_BTM_INFO: (state, ins) => {
            state.btmNavInfo = ins
        },
        SET_WPS_PAGE1_URL: (state, ins:string) => {
            state.wpsPage1Url = ins
        },
        SET_WPS_PAGE1_TOKEN: (state, ins:string) => {
            state.wpsPage1Token = ins
        },
        SET_SPECIAL_INFO: (state, ins) => {
            state.specialInfo = ins
        },
    },
    actions: {
        async getHotTagList({commit}) {
          let content = await getHotTags({})
          commit('SET_HOT_TAGS', content.data.result)
        },
        async getBtmNavInfo({commit}) {
          const content = await getBtmInfo({})
          commit('SET_BTM_INFO', content.data.result)
        },
        async getSpecialTempFodder({commit}) {
          const content = await getSpecialFodderAndTemplate({})
          commit('SET_SPECIAL_INFO', content.data.result)
        },
        getIndustryList({commit}) {
            getIndustryList({}).then(res=>{
                if(res.data.code===200){
                    let ins = res.data.result
                    if(ins.length>0){
                        ins.unshift({
                            industryId:0,
                            industryName:'全部分类',
                            subIndustry: []
                        })
                    }
                    commit('SET_INDUSTRY_DATA', ins)
                }
            })
        },
        login({ commit }, userInfo) {
            const { username, password, userType } = userInfo
            return new Promise((resolve, reject) => {
                loginPwd(qs.stringify({
                    username,
                    password,
                    userType,
                })).then(response => {
                    // const {data} = response
                    commit("SET_TOKEN", response.header.token)
                    setToken(response.header.token)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getUserInfo({ commit }) {
            getUserInfo({}).then(res => {
                if (res.data.code === 200) {
                    const userInfoData = res.data
                    commit("SET_INFO", userInfoData.result.userBaseVO)
                }
            })
        },
        getUserVipInfo({ commit }) {
            getUserVipInfo({}).then(res => {
                if (res.data.code === 200) {
                    const userVipInfoData = res.data
                    commit("SET_VIP_INFO", userVipInfoData.result.userBaseVO)
                }
            })
        },
        resetToken({ commit }) {
            return new Promise<void>(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },
        setToken({ commit }, token) {
            console.log(1111)
            commit('SET_TOKEN', token)
            setToken(token)
        },
        loginOut({ commit }) {
            return new Promise((resolve, reject) => {
                loginOut().then(res => {
                    commit('SET_TOKEN', '')
                    removeToken()
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setWpsPage1Info({ commit }, info) {
            console.log('----------------', info)
            commit('SET_WPS_PAGE1_TOKEN', info.token)
            commit('SET_WPS_PAGE1_URL', info.url)
        }
    }
})


export default store







