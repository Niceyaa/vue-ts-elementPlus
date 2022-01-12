import { reactive, onMounted, toRefs, computed } from 'vue'
import { getHotTemplateDate } from '../api/templateApi'
import { getIndustryList } from '@/api/commonApi'
import { mapState } from 'vuex'
import store from '@/store'
export default function (params?: any | undefined) {
    let hotContent = reactive({
        hotTemplate: []
    })
    const commonStateFn = mapState(['industryData', 'userInfo'])
    const commonState: { [prop: string]: any, industryData?: any } = {}
    Object.keys(commonStateFn).forEach(fnKey => {
        // 使用mapState直接返回的一个对象
        // 对象包含了选中的函数方法（return industryData userInfo loginFlag）
        // mapState 在解析state的数据时，是需要通过this.$store去解析，但是在setup里面是没有this的，所以我们给他的函数绑定ctx
        // this => {$store:store}
        const fn = commonStateFn[fnKey].bind({ $store: store })
        commonState[fnKey] = computed(fn)
        fnKey === 'industryData' && commonState[fnKey].value.unshift({
            industryId: 0,
            industryName: "全部分类",
        });
    })
    console.log('commonState----------------------------------', commonState)

    // 获取数据
    onMounted(() => {
        getHotTemplateList()
    })
    // 处理热门模板长度大于4
    let showTemplateData = computed({
        get: () => {
            if (hotContent.hotTemplate.length > 0) {
                console.log("computed执行了吗", hotContent.hotTemplate)
                return hotContent.hotTemplate.map((item: any[]) => {
                    console.log('item', item.length)
                    if (item.length > 4) {
                        return item.slice(0, 4)
                    } else {
                        return item
                    }
                })
            }
        },
        set: (value) => {
            console.log('set------------------', value)
        }
    })

    // 获取热门模板
    function getHotTemplateList() {
        let prm = {
            size: 4
        }
        getHotTemplateDate(prm).then(res => {
            hotContent.hotTemplate = res.data.result
        })
    }

    return {
        ...toRefs(hotContent),
        showTemplateData,
        ...commonState
    }
}