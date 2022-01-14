import { mapState, useStore } from 'vuex'
import { computed } from 'vue'
// computed mapState 共同使用


/* 
    prm：参数
    可以为 ['userInfo','hotTags',...] 这样的 state 字符串数组
    可以为 
    {
        userInfo:state=>state.userInfo,
        hotTags:state=>state.hotTags
        ...
    }
*/
export function returnCompStateFn(prm: any): object {
    const store = useStore
    const commonStateFn = mapState(prm)
    const commonState: { [prop: string]: any } = {}
    Object.keys(commonStateFn).forEach(fnKey => {
        const fn = commonStateFn[fnKey].bind({ $store: store })
        commonState[fnKey] = computed(fn)
    })
    return commonState
}