import { reactive, onMounted, toRefs, computed, watch, ref } from 'vue'
import { getHotTemplateDate, getTemplateList } from '../api/templateApi'
import { createDocByTemplateId } from '../api/markDocApi'
import { mapState } from 'vuex'
import store from '@/store'
import { useRouter } from 'vue-router'
import qs from 'qs'
import { ElMessage } from 'element-plus'
export default function (params?: any | undefined) {
    interface HomeList {
        [props: string]: Array<any>,
        showTemplateList: Array<any>,
        totalTemplate: Array<any>,
        hotTemplate: Array<any>,
    }
    let homeApiList: HomeList = reactive({
        hotTemplate: [],
        totalTemplate: [], // 全部分类的模板数据
        showTemplateList: [], // 当前显示的模板数据

    })
    let currentIndustryId = ref()
    let functionId = ref(1)
    let showFlag = ref(false)
    let editUrl = ref('')

    let searchKeyword = ref("");

    const router = useRouter()

    const commonStateFn = mapState(['industryData', 'hotTags'])
    const commonState: { [prop: string]: any, industryData?: any, hotTags?: any } = {}
    Object.keys(commonStateFn).forEach(fnKey => {
        // 使用mapState直接返回的一个对象
        // 对象包含了选中的函数方法（return industryData userInfo loginFlag）
        // mapState 在解析state的数据时，是需要通过this.$store去解析，但是在setup里面是没有this的，所以我们给他的函数绑定ctx
        // this => {$store:store}
        const fn = commonStateFn[fnKey].bind({ $store: store })
        commonState[fnKey] = computed(fn)
    })
    // let a = (keyof homeApiList)


    watch(() => store.state.industryData, (value) => {
        if (value.length > 0) {
            currentIndustryId.value = value[0].industryId
            getTemplateListById(currentIndustryId.value)
        }
    }, {
        deep: true,
        immediate: true
    })

    // 获取数据
    onMounted(() => {
        getHotTemplateList()
    })
    // 处理热门模板长度大于4
    let showTemplateData = []
    /*  let showTemplateData = computed({
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
     }) */


    // 获取热门模板
    function getHotTemplateList() {
        let prm = {
            size: 4
        }
        getHotTemplateDate(prm).then(res => {
            homeApiList.hotTemplate = res.data.result
            if (homeApiList.hotTemplate.length > 0) {
                let temp = homeApiList.hotTemplate.map((item: any[]) => {
                    if (item.length > 4) {
                        return item.slice(0, 4)
                    } else {
                        return item
                    }
                })
                homeApiList.hotTemplate = temp
            }
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
            if (filtArr.length > 0) {
                homeApiList.showTemplateList = curItem
            } else {
                getTemplateListById(id)
            }
        }

    }

    // 改变功能id
    function changeFunction(id: number) {
        functionId.value = id
    }

    // 依模板创建标书
    async function createDocByTemplateIdFn(info) {
        if (!store.state.userInfo.userName) {
            store.commit('SET_LOGIN', true)
            return
        }
        const prm = qs.stringify({
            templateId: info.templateId,
            type: 2 //2 系统模板  4 自定义模板
        })
        let content: any = await createDocByTemplateId(prm)
        ElMessage.success(content.data.msg)
        editUrl.value = `/markDocManagement/markDocEdit?bidDocId=${content.data.result.bidDocId}&title=${content.data.result.bidDocTitle}`
        showFlag.value = true
    }

    // 开始制作标书
    function openMakeDialog() {
        if (!store.state.userInfo.userName) {
            store.commit('SET_LOGIN', true)
            return
        }
        store.commit("SET_MAKE_DOC_FLAG", true)
    }

    // 搜索
    function goToURL() {
        let query = {}
        if (searchKeyword.value && searchKeyword.value.length > 0) {
            query = {
                keyword: searchKeyword
            }
        }
        router.push({
            path: '/sysTemplate',
            query
        })
    }

    return {
        ...toRefs(homeApiList),
        showTemplateData,
        currentIndustryId,
        ...commonState,
        functionId,
        editUrl,
        showFlag,
        searchKeyword,

        // 方法
        changeIndustryId,
        changeFunction,
        createDocByTemplateIdFn,
        openMakeDialog,
        goToURL
    }
}