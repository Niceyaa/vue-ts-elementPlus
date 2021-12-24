// 公共组件
import commonNavHeader from '@/components/commonNavHeader.vue'

type comArr = [
    {
        name: string,
        component?: any
    }
    ]

const commonComponents:comArr = [
    {
        name: 'common-nav-header',
        component: commonNavHeader
    }
]

export default commonComponents
