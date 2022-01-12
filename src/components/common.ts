// 公共组件
import commonNavHeader from '@/components/commonNavHeader.vue'
import commonFooter from '@/components/commonFooter.vue'

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
    }
]

export default commonComponents
