
interface industryItem {
    industryId: number,
    industryName: string,
    [prop: string]: any
}
export interface State {
    smdToken: null | string,
    userInfo: {
        [prop: string]: any
    },
    userVipInfo: {
        memberFlag: boolean,
        [prop: string]: any
    },
    globalLoading: boolean,
    // 登录弹窗控制标识
    loginFlag: boolean,
    // 登录弹窗模块
    loginModule: string,
    // vip标识
    vipFlag: boolean,
    // 开始制作标识
    makeDocFlag: boolean,
    // 热门标签
    hotTags: Array,
    // 行业标签
    industryData: Array<industryItem>,
    // 底部公共信息
    btmNavInfo: {
        [prop: string]: any
    },
    // 特色模板、素材
    specialInfo: {
        [prop: string]: any
    },

    wpsPage1Url: null | string,
    wpsPage1Token: null | string,
    [props: string]: any
}
