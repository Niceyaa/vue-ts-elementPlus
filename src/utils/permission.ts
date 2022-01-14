// 每次路由跳转的时候，控制页面显示
import router from '../router/index'
import { getToken } from '../utils/auth'
import store from '../store/index'



router.beforeEach(async (to, from) => {
    const token: string = getToken()
    // const store = useStore()
    // 表示存在 token
    if (token) {
        console.log("路由守卫中的store---------", store)
        let { userInfo, userVipInfo } = store.state
        store.commit('SET_TOKEN',token)

        if (!userInfo.userNick) {
            await store.dispatch('getUserInfo')
            await store.dispatch('getUserVipInfo')
        }

        if (store.state.industryData.length <= 0) {
            store.dispatch('getIndustryList')
        }
        if(store.state.hotTags.length<=0){
            store.dispatch("getHotTagList")
        }


        console.log("userInfo,userVipInfo", userInfo, userVipInfo)
    } else {
        console.log("不存在token,即未登录")
    }

    console.log('全局路由守卫', to, from)
})
