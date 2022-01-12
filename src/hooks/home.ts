import { reactive, onMounted, toRefs, computed, watch, ref } from 'vue'
import { getHotTemplateDate, getTemplateList } from '../api/templateApi'
import { getIndustryList } from '@/api/commonApi'
import { mapState } from 'vuex'
import store from '@/store'
export default function (params?: any | undefined) {
    interface HomeList {
        [props: string]: Array<any>,
        showTemplateList:Array<any>,
        totalTemplate:Array<any>,
        hotTemplate:Array<any>,
    }
    let homeApiList: HomeList = reactive({
        hotTemplate: [],
        totalTemplate: [], // 全部分类的模板数据
        showTemplateList: [], // 当前显示的模板数据
    })
    let currentIndustryId = ref()
    let functionId = ref(1)

    const commonStateFn = mapState(['industryData', 'userInfo'])
    const commonState: { [prop: string]: any, industryData?: any } = {}
    Object.keys(commonStateFn).forEach(fnKey => {
        // 使用mapState直接返回的一个对象
        // 对象包含了选中的函数方法（return industryData userInfo loginFlag）
        // mapState 在解析state的数据时，是需要通过this.$store去解析，但是在setup里面是没有this的，所以我们给他的函数绑定ctx
        // this => {$store:store}
        const fn = commonStateFn[fnKey].bind({ $store: store })
        commonState[fnKey] = computed(fn)
    })

    watch(() => store.state.industryData, (value) => {
        if (value.length > 0) {
            currentIndustryId.value = value[0].industryId
            getTemplateListById(currentIndustryId.value)
        }
    }, {
        deep: true,
    })
    console.log('commonState----------------------------------', commonState)

    // 获取数据
    onMounted(() => {
        getHotTemplateList()
    })
    // 处理热门模板长度大于4
    let showTemplateData = computed({
        get: () => {
            if (homeApiList.hotTemplate.length > 0) {
                console.log("computed执行了吗", homeApiList.hotTemplate)
                return homeApiList.hotTemplate.map((item: any[]) => {
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
            homeApiList.hotTemplate = res.data.result
        })
    }
    // 获取模板列表
    function getTemplateListById(id: number): void {
        let prm = {
            pageSize: 20,
            pageNum: 1,
            industryId: id === 0 ? null : id
        }
        getTemplateList(prm).then(res => {
            homeApiList.showTemplateList = res.data.result.list
            homeApiList.totalTemplate.push({
                id,
                data: res.data.result.list
            })
        })
    }
    // 修改industryId
    function changeIndustryId(id: number): void {
        if (id === currentIndustryId.value) {

        } else {
            currentIndustryId.value = id
            let curItem = []
            let filtArr = homeApiList.totalTemplate.filter((item, idx) => {
                if (item.id === id) {
                    curItem = item.data
                }
                return item.id === id
            })
            if (filtArr.length>0){
                homeApiList.showTemplateList = curItem
            }else{
                getTemplateListById(id)
            }
        }

    }

    // 改变功能id
    function changeFunction(id:number) {
        functionId.value = id
    }

    return {
        ...toRefs(homeApiList),
        showTemplateData,
        currentIndustryId,
        ...commonState,
        functionId,

        // 方法
        changeIndustryId,
        changeFunction
    }
}