console.log('process env',process.env.NODE_ENV)

export default {
//添加自定义模板
    addSelfDefineTemplate: {
        url: '/smartbiddoc-material/api/cusTemplate/addCusTemplate',
        method: 'post',
    },

//将系统模板设置为自定义模板
    setSysToSelfTemplate: {
        url: '/smartbiddoc-material/api/cusTemplate/turnSysTemplateIntoCusTemplate',
        method: 'post',
    },

//删除自定义模板
    deleteSelfTemplate: {
        url: '/smartbiddoc-material/api/cusTemplate/delCusTemplate',
        method: 'post',
    },

//修改自定义模板
    updateSelfTemplate: {
        url: '/smartbiddoc-material/api/cusTemplate/editCusTemplate',
        method: 'post',
    },

//我的模板
    myTemplateList: {
        url: '/smartbiddoc-material/api/cusTemplate/apiQueryCusTemplatePage',
        method: 'post',
    },

//将标书存为模板
    setDocToTemplate: {
        url: '/smartbiddoc-material/api/cusTemplate/turnDocIntoTemplate',
        method: 'post',
    },

//将标书存为模板
    sortApi: {
        url: '/smartbiddoc-material/api/cusMaterialType/sortCusMaterialType',
        method: 'post',
    },

//浏览记录
    getBrowserRecord: {
        url: '/smartbiddoc-material/api/browseRecords/apiQueryBrowseRecordsPage',
        method: 'post',
    },

//系统模板
    getSysTemplate: {
        url: '/smartbiddoc-material/api/template/apiQueryTemplatePage',
        method: 'post',
    },

//模板素材详情
    getDetailById: {
        url: '/smartbiddoc-material/api/commonResource/apiQueryTemAndMatDetail',
        method: 'post',
    },

//相似模板列表
    getRelateTemplate: {
        url: '/smartbiddoc-material/api/template/apiQuerySimilarTemplatePage',
        method: 'post',
    },


//将个人模板设置为公司模板
    setPersonalTemplateToCompany: {
        url: '/smartbiddoc-material/api/cusTemplate/editCusTemplateType',
        method: 'post',
    },


//批量删除个人模板素材里面的节点
    multiDeleteSelfFileNode: {
        url: '/smartbiddoc-material/api/node/apiDelNodeByList',
        method: 'post',
    },


//个人模板素材里面的节点排序
    sortSelfFileNode: {
        url: '/smartbiddoc-material/api/node/apiSortNode',
        method: 'post',
    },


//查询文件夹下面时候存在文件
    searchFileUnderFold: {
        url: '/smartbiddoc-material/api/commonResource/apiQueryBatchDelTypeDoc',
        method: 'post',
    },


}
