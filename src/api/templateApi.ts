import request from '@/utils/request'

//添加自定义模板
export function addSelfDefineTemplate(data){
    return request({
        url: '/smartbiddoc-material/api/cusTemplate/addCusTemplate',
        method: 'post',
        data
    })
}

//将系统模板设置为自定义模板
export function setSysToSelfTemplate(data){
    return request({
        url: '/smartbiddoc-material/api/cusTemplate/turnSysTemplateIntoCusTemplate',
        method: 'post',
        data
    })
}

//删除自定义模板
export function deleteSelfTemplate(data){
    return request({
        url: '/smartbiddoc-material/api/cusTemplate/delCusTemplate',
        method: 'post',
        data
    })
}

//修改自定义模板
export function updateSelfTemplate(data){
    return request({
        url: '/smartbiddoc-material/api/cusTemplate/editCusTemplate',
        method: 'post',
        data
    })
}

//我的模板
export function myTemplateList(data){
    return request({
        url: '/smartbiddoc-material/api/cusTemplate/apiQueryCusTemplatePage',
        method: 'post',
        data
    })
}

//将标书存为模板
export function setDocToTemplate(data){
    return request({
        url: '/smartbiddoc-material/api/cusTemplate/turnDocIntoTemplate',
        method: 'post',
        data
    })
}

//将标书存为模板
export function sortApi(data){
    return request({
        url: '/smartbiddoc-material/api/cusMaterialType/sortCusMaterialType',
        method: 'post',
        data
    })
}

//热门模板
export function getHotTemplateDate(data){
    return request({
        url: '/smartbiddoc-material/api/commonResource/apiQueryHomePageHotTemplate',
        method: 'get',
        params:data
    })
}

//首页模板
export function getTemplateList(data){
    return request({
        url: '/smartbiddoc-material/api/template/apiQueryTemplatePage',
        method: 'post',
        data
    })
}


