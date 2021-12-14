import request from '@/utils/request'

//将目录设置为素材
export function setFoldToFodder(data){
    return request({
        url: '/smartbiddoc-material/api/cusMaterial/turnCatalogIntoMaterial',
        method: 'post',
        data
    })
}

//获取自定义素材分类树
export function getFodderClassify(data){
    return request({
        url: '/smartbiddoc-material/api/cusMaterialType/apiQueryCusMaterialTypeTree',
        method: 'post',
        data
    })
}

//删除用户自定义素材或者模板分类
export function deleteClassify(data){
    return request({
        url: '/smartbiddoc-material/api/cusMaterialType/delCusMaterialType',
        method: 'post',
        data
    })
}

//编辑用户自定义素材或者模板分类
export function editClassify(data){
    return request({
        url: '/smartbiddoc-material/api/cusMaterialType/editCusMaterialType',
        method: 'post',
        data
    })
}

//新建用户自定义素材或者模板分类
export function addClassify(data){
    return request({
        url: '/smartbiddoc-material/api/cusMaterialType/addCusMaterialType',
        method: 'post',
        data
    })
}

//将系统素材设置为自定义素材
export function setSysFodderToSelfFodder(data){
    return request({
        url: '/smartbiddoc-material/api/cusMaterial/turnSysMaterialIntoCusMaterial',
        method: 'post',
        data
    })
}

//新建自定义素材
export function addSelfDefineFodder(data){
    return request({
        url: '/smartbiddoc-material/api/cusMaterial/addCusMaterial',
        method: 'post',
        data
    })
}

//删除自定义素材
export function deleteSelfDefineFodder(data){
    return request({
        url: '/smartbiddoc-material/api/cusMaterial/delCusMaterial',
        method: 'post',
        data
    })
}

//修改自定义素材
export function updateSelfDefineFodder(data){
    return request({
        url: '/smartbiddoc-material/api/cusMaterial/editCusMaterial',
        method: 'post',
        data
    })
}

//查询自定义素材模板节点树
export function getFodderOrTemplateTree(data){
    return request({
        url: '/smartbiddoc-material/api/commonResource/queryCusMaterialAndTemplateTree',
        method: 'post',
        data
    })
}

//素材节点

//素材节点 -- 删除节点
export function deleteFodderNode(data){
    return request({
        url: '/smartbiddoc-material/api/commonResource/apiDelCusMaterialNode',
        method: 'post',
        data
    })
}

//素材节点 -- 添加节点
export function addFodderNode(data){
    return request({
        url: '/smartbiddoc-material/api/commonResource/apiAddCusMaterialNode',
        method: 'post',
        data
    })
}

//素材节点 -- 编辑节点
export function updateFodderNode(data){
    return request({
        url: '/smartbiddoc-material/api/commonResource/apiEditCusMaterialNode',
        method: 'post',
        data
    })
}

//素材节点 -- 添加空白文档
export function addEmptyWord(data){
    return request({
        url: '/smartbiddoc-material/api/commonResource/apiCusMatTemImportBlankWord',
        method: 'post',
        data
    })
}

//素材节点 -- 文档导入
export function importNodeFile(data){
    return request({
        url: '/smartbiddoc-material/api/commonResource/apiCusMatTemImportWord',
        method: 'post',
        data
    })
}

//我的素材 -- 分页列表
export function myFodderList(data){
    return request({
        url: '/smartbiddoc-material/api/cusMaterial/apiQueryCusMaterialPage',
        method: 'post',
        data
    })
}

//模板标书查询
export function templateDocList(data){
    return request({
        url: '/smartbiddoc-material/api/commonResource/apiQueryTemplateAndCusTemplateList',
        method: 'post',
        data
    })
}
