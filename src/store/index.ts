import {createStore} from 'vuex'
import qs from 'qs'

import {setToken, removeToken, getToken} from "@/utils/auth";

import {loginPwd, getUserInfo, loginOut, getUserVipInfo} from '@/api/user'

const store =  createStore({
    state: {
        smdToken: null,
        userInfo: {},
        userVipInfo: {},
        globalLoading: false,
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
    },
    mutations: {
        SET_TOKEN: (state, smdToken) => {
            state.smdToken = smdToken
        },
        SET_INFO: (state, userInfo) => {
            state.userInfo = userInfo
        },
        SET_VIP_INFO: (state, userInfo) => {
            state.userVipInfo = userInfo
        },
        SET_LOADING: (state, flag) => {
            state.globalLoading = flag
        },
        SET_LOGIN: (state, flag) => {
            state.loginFlag = flag
        },
        SET_LOGIN_MODULE: (state, module) => {
            state.loginModule = module
        },
        SET_VIP_FLAG: (state, flag) => {
            state.vipFlag = flag
        },
        SET_MAKE_DOC_FLAG: (state, flag) => {
            state.makeDocFlag = flag
        },
        SET_HOT_TAGS: (state, tags) => {
            state.hotTags = tags
        },
        SET_INDUSTRY_DATA: (state, ins) => {
            state.industryData = ins
        },
        SET_BTM_INFO: (state, ins) => {
            state.btmNavInfo = ins
        },
        SET_WPS_PAGE1_URL: (state, ins) => {
            state.wpsPage1Url = ins
        },
        SET_WPS_PAGE1_TOKEN: (state, ins) => {
            state.wpsPage1Token = ins
        },
        SET_SPECIAL_INFO: (state, ins) => {
            state.specialInfo = ins
        },
    },
    actions: {
        /*async getHotTagList({commit}) {
          let content = await this.$axios.post('/smartbiddoc-material/api/popularRecommend/apiQueryPopularLabel')
          commit('SET_HOT_TAGS', content.data.result)
        },
        async getIndustryList({commit}) {
          const content = await this.$axios.post('/smartbiddoc-material/api/industry/apiQueryIndustryList')
          commit('SET_INDUSTRY_DATA', content.data.result)
        },
        async getBtmNavInfo({commit}) {
          const content = await this.$axios.post('/smartbiddoc-pubResource/api/article/apiQueryBottomList')
          commit('SET_BTM_INFO', content.data.result)
        },
        async getSpecialTempFodder({commit}) {
          const content = await this.$axios.post('/smartbiddoc-material/api/popularRecommend/apiQueryPopularTemMat')
          commit('SET_SPECIAL_INFO', content.data.result)
        },*/
        login({commit}, userInfo) {
            const {username, password, userType} = userInfo
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
        /*async getUserInfo({commit}) {
          let userInfo = await this.$axios.post('/smartbiddoc-docUser/api/userBase/queryUserBaseInfo')
          const userInfoData = userInfo.data
          if (userInfoData.code === 200) {
            commit("SET_INFO", userInfoData.result.userBaseVO)
          }
        },
        async getUserVipInfo({commit}) {
          let userVipInfo = await this.$axios.post('/smartbiddoc-docUser/api/companyAccount/queryCompanyAccount')
          const userVipInfoData = userVipInfo.data
          if (userVipInfoData.code === 200) {
            commit("SET_VIP_INFO", userVipInfoData.result)
          }
        },*/
        resetToken({commit}) {
            return new Promise<void>(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },
        setToken({commit}, token) {
            console.log(1111)
            commit('SET_TOKEN', token)
            setToken(token)
        },
        loginOut({commit}) {
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
        setWpsPage1Info({commit}, info) {
            console.log('----------------', info)
            commit('SET_WPS_PAGE1_TOKEN', info.token)
            commit('SET_WPS_PAGE1_URL', info.url)
        }
    }
})

export default store







