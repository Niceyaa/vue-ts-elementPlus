// 公共组件
import commonNavHeader from '@/components/commonNavHeader.vue'
import commonFooter from '@/components/commonFooter.vue'
import successShow from '@/components/successShow.vue'

type commonItem = {
        name: string,
        component?: any
}

const commonComponents:Array<commonItem> = [
    {
        name: 'common-nav-header',
        component: commonNavHeader
    },
    {
        name:'common-footer',
        component: commonFooter
    },
    {
        name:'success-show',
        component: successShow
    }
]

export default commonComponents
