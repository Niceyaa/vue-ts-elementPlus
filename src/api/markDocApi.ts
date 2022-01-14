import request from '@/utils/request'

//添加空白标书
export function markDocAdd(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDoc/addBidDoc',
        method: 'post',
        data
    })
}

//查询我的标书列表
export function getMyMarkDocList(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDoc/apiQueryBidDocPage',
        method: 'post',
        data
    })
}

//查询标书目录
export function checkMarkDocContent(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocCatalog/queryCatalog',
        method: 'post',
        data
    })
}

//添加标书目录
export function addMarkDocContent(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocCatalog/addCatalog',
        method: 'post',
        data
    })
}

//编辑标书目录
export function editMarkDocContent(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocCatalog/editCatalog',
        method: 'post',
        data
    })
}

//排序标书目录
export function sortMarkDocContent(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocCatalog/sortCatalog',
        method: 'post',
        data
    })
}

//删除标书目录
export function deleteMarkDocContent(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocCatalog/deleteCatalog',
        method: 'post',
        data
    })
}

//标书合成
export function generateMarkDoc(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDoc/generateBidDoc',
        method: 'post',
        data
    })
}

//新建空白文档
export function addEmptyContentDoc(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocCatalogEnc/addBlankCatalogEnc',
        method: 'post',
        data
    })
}

//导入标书
export function importBidDocFile(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDoc/importBidDoc',
        method: 'post',
        data
    })
}

//素材模板通用接口
export function getTemplateFodderData(data){
    return request({
        url: '/smartbiddoc-material/api/commonResource/queryMaterialAndTemplateList',
        method: 'post',
        data
    })
}

//将 素材/模板 设置成为目录
export function getDataToFolder(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocCatalog/turnMaterialTemplateIntoCatalog',
        method: 'post',
        data
    })
}

//用户重本地导入素材成为某个目录下的节点
export function importNodeDoc(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocCatalog/importBidDoc2Catalog',
        method: 'post',
        data
    })
}


//页边距数据查询
export function getMarginData(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocStyleSetting/querySysPageMargin',
        method: 'post',
        data
    })
}


//编辑标书格式
export function editMarkDocFormat(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocStyleSetting/editDocFormat',
        method: 'post',
        data
    })
}


//获取页眉页脚格式
export function getPageFormatInfo(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocHfFormat/bidDocId',
        method: 'post',
        data
    })
}


//添加页眉页脚格式
export function addPageFormat(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocHfFormat/addBidDocHfFormat',
        method: 'post',
        data
    })
}


//导出当前章节
export function exportDataById(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocCatalog/exportBidDocCatalog',
        method: 'post',
        data
    })
}


//查询标书导出记录
export function getExportData(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDoc/apiQueryBidDocExportRecords',
        method: 'post',
        data
    })
}


//标书删除
export function markDocDelete(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDoc/delBidDoc',
        method: 'post',
        data
    })
}


//标书编辑
export function markDocUpdate(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDoc/createBidDoc',
        method: 'post',
        data
    })
}


//标书详情
export function markDocDetail(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDoc/apiQueryBidDocInfo',
        method: 'post',
        data
    })
}


//导入word创建标书
export function importMarkDocAndCreate(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDoc/importBidDocAndCreate',
        method: 'post',
        data
    })
}


//查询标书的状态
export function getMarkDocStatus(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDoc/queryBidDocState',
        method: 'post',
        data
    })
}


//依模板创建标书
export function createDocByTemplateId(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDoc/createBidDocByTemplate',
        method: 'post',
        data
    })
}


//删除页眉页脚图片
export function deletePageHeaderAndFooterPic(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDocHfFormat/delBidDocHfFormatPic',
        method: 'post',
        data
    })
}


//根据招标文件创建标书
export function createDocByLocalDoc(data){
    return request({
        url: '/smartbiddoc-doc/api/bidDoc/createBidDocByBidFile',
        method: 'post',
        data
    })
}




