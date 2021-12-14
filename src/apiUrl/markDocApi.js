export default {
    //添加空白标书
    markDocAdd: {
        url: '/smartbiddoc-doc/api/bidDoc/addBidDoc',
        method: 'post',
    },

//查询我的标书列表
    getMyMarkDocList: {
        url: '/smartbiddoc-doc/api/bidDoc/apiQueryBidDocPage',
        method: 'post',
    },

//查询标书目录
    checkMarkDocContent: {
        url: '/smartbiddoc-doc/api/bidDocCatalog/queryCatalog',
        method: 'post',
    },

//添加标书目录
    addMarkDocContent: {
        url: '/smartbiddoc-doc/api/bidDocCatalog/addCatalog',
        method: 'post',
    },

//编辑标书目录
    editMarkDocContent: {
        url: '/smartbiddoc-doc/api/bidDocCatalog/editCatalog',
        method: 'post',
    },

//排序标书目录
    sortMarkDocContent: {
        url: '/smartbiddoc-doc/api/bidDocCatalog/sortCatalog',
        method: 'post',
    },

//删除标书目录
    deleteMarkDocContent: {
        url: '/smartbiddoc-doc/api/bidDocCatalog/deleteCatalog',
        method: 'post',
    },

//标书合成
    generateMarkDoc: {
        url: '/smartbiddoc-doc/api/bidDoc/generateBidDoc',
        method: 'post',
    },

//新建空白文档
    addEmptyContentDoc: {
        url: '/smartbiddoc-doc/api/bidDocCatalogEnc/addBlankCatalogEnc',
        method: 'post',
    },

//导入标书
    importBidDocFile: {
        url: '/smartbiddoc-doc/api/bidDoc/importBidDoc',
        method: 'post',
    },

//素材模板通用接口
    getTemplateFodderData: {
        url: '/smartbiddoc-material/api/commonResource/queryMaterialAndTemplateList',
        method: 'post',
    },

//将 素材/模板 设置成为目录
    getDataToFolder: {
        url: '/smartbiddoc-doc/api/bidDocCatalog/turnMaterialTemplateIntoCatalog',
        method: 'post',
    },

//用户重本地导入素材成为某个目录下的节点
    importNodeDoc: {
        url: '/smartbiddoc-doc/api/bidDocCatalog/importBidDoc2Catalog',
        method: 'post',
    },


//页边距数据查询
    getMarginData: {
        url: '/smartbiddoc-doc/api/bidDocStyleSetting/querySysPageMargin',
        method: 'post',
    },

//编辑标书格式
    editMarkDocFormat: {
        url: '/smartbiddoc-doc/api/bidDocStyleSetting/editDocFormat',
        method: 'post',
    },


//获取页眉页脚格式
    getPageFormatInfo: {
        url: '/smartbiddoc-doc/api/bidDocHfFormat/bidDocId',
        method: 'post',
    },


//添加页眉页脚格式
    addPageFormat: {
        url: '/smartbiddoc-doc/api/bidDocHfFormat/addBidDocHfFormat',
        method: 'post',
    },


//导出当前章节
    exportDataById: {
        url: '/smartbiddoc-doc/api/bidDocCatalog/exportBidDocCatalog',
        method: 'post',
    },


//查询标书导出记录
    getExportData: {
        url: '/smartbiddoc-doc/api/bidDoc/apiQueryBidDocExportRecords',
        method: 'post',
    },


//标书删除
    markDocDelete: {
        url: '/smartbiddoc-doc/api/bidDoc/delBidDoc',
        method: 'post',
    },


//标书编辑
    markDocUpdate: {
        url: '/smartbiddoc-doc/api/bidDoc/createBidDoc',
        method: 'post',
    },


//标书详情
    markDocDetail: {
        url: '/smartbiddoc-doc/api/bidDoc/apiQueryBidDocInfo',
        method: 'post',
    },


//导入word创建标书
    importMarkDocAndCreate: {
        url: '/smartbiddoc-doc/api/bidDoc/importBidDocAndCreate',
        method: 'post',
    },


//查询标书的状态
    getMarkDocStatus: {
        url: '/smartbiddoc-doc/api/bidDoc/queryBidDocState',
        method: 'post',
    },


//依模板创建标书
    createDocByTemplateId: {
        url: '/smartbiddoc-doc/api/bidDoc/createBidDocByTemplate',
        method: 'post',
    },


//删除页眉页脚图片
    deletePageHeaderAndFooterPic: {
        url: '/smartbiddoc-doc/api/bidDocHfFormat/delBidDocHfFormatPic',
        method: 'post',
    },


//导出记录--批量删除
    multiDelExpRecord: {
        url: '/smartbiddoc-doc/api/bidDoc/apiBatchDelBidDocExport',
        method: 'post',
    },


//导出章节--导出状态查询
    getSectionExportStatus: {
        url: '/smartbiddoc-doc/api/bidDocCatalog/exportBidDocCatalogState',
        method: 'post',
    },


//根据招标文件创建标书
    createDocByLocalDoc: {
        url: '/smartbiddoc-doc/api/bidDoc/createBidDocByBidFile',
        method: 'post',
    },


//查询标书合成状态
    getBidDocGenerateStatus: {
        url: '/smartbiddoc-doc/api/bidDoc/queryBidDocExportState',
        method: 'post',
    },


//查询公司信息和人员信息层级
    getEnterpriseAndPersonalInfo: {
        url: '/smartbiddoc-material/api/commonResource/queryEditBidCompanyAndPersonList',
        method: 'post',
    },


//公司信息,制作标书
    makeDocByEnterpriseInfo: {
        url: '/smartbiddoc-qualify/api/makingBids/apiMakingBidsCompanyInfo',
        method: 'post',
    },


}

