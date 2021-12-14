export default {
    //将目录设置为素材
    setFoldToFodder: {
        url: '/smartbiddoc-material/api/cusMaterial/turnCatalogIntoMaterial',
        method: 'post',
    },

//获取自定义素材分类树
    getFodderClassify: {
        url: '/smartbiddoc-material/api/cusMaterialType/apiQueryCusMaterialTypeTree',
        method: 'post',
    },

//删除用户自定义素材或者模板分类
    deleteClassify: {
        url: '/smartbiddoc-material/api/cusMaterialType/delCusMaterialType',
        method: 'post',
    },

//编辑用户自定义素材或者模板分类
    editClassify: {
        url: '/smartbiddoc-material/api/cusMaterialType/editCusMaterialType',
        method: 'post',
    },

//新建用户自定义素材或者模板分类
    addClassify: {
        url: '/smartbiddoc-material/api/cusMaterialType/addCusMaterialType',
        method: 'post',
    },

//将系统素材设置为自定义素材
    setSysFodderToSelfFodder: {
        url: '/smartbiddoc-material/api/cusMaterial/turnSysMaterialIntoCusMaterial',
        method: 'post',
    },

//新建自定义素材
    addSelfDefineFodder: {
        url: '/smartbiddoc-material/api/cusMaterial/addCusMaterial',
        method: 'post',
    },

//删除自定义素材
    deleteSelfDefineFodder: {
        url: '/smartbiddoc-material/api/cusMaterial/delCusMaterial',
        method: 'post',
    },

//修改自定义素材
    updateSelfDefineFodder: {
        url: '/smartbiddoc-material/api/cusMaterial/editCusMaterial',
        method: 'post',
    },

//查询自定义素材模板节点树
    getFodderOrTemplateTree: {
        url: '/smartbiddoc-material/api/commonResource/queryCusMaterialAndTemplateTree',
        method: 'post',
    },

//素材节点

//素材节点 -- 删除节点
    deleteFodderNode: {
        url: '/smartbiddoc-material/api/commonResource/apiDelCusMaterialNode',
        method: 'post',
    },

//素材节点 -- 添加节点
    addFodderNode: {
        url: '/smartbiddoc-material/api/commonResource/apiAddCusMaterialNode',
        method: 'post',
    },

//素材节点 -- 编辑节点
    updateFodderNode: {
        url: '/smartbiddoc-material/api/commonResource/apiEditCusMaterialNode',
        method: 'post',
    },

//素材节点 -- 添加空白文档
    addEmptyWord: {
        url: '/smartbiddoc-material/api/commonResource/apiCusMatTemImportBlankWord',
        method: 'post',
    },

//素材节点 -- 文档导入
    importNodeFile: {
        url: '/smartbiddoc-material/api/commonResource/apiCusMatTemImportWord',
        method: 'post',
    },

//我的素材 -- 分页列表
    myFodderList: {
        url: '/smartbiddoc-material/api/cusMaterial/apiQueryCusMaterialPage',
        method: 'post',
    },

//模板标书查询
    templateDocList: {
        url: '/smartbiddoc-material/api/commonResource/apiQueryTemplateAndCusTemplateList',
        method: 'post',
    },


//系统素材查询
    getSysFodder: {
        url: '/smartbiddoc-material/api/material/apiQueryMaterialPage',
        method: 'post',
    },


//标签查询
    getTagList: {
        url: '/smartbiddoc-material/api/label/apiQueryLabelPage',
        method: 'post',
    },


//相似推荐素材
    getRelateFodder: {
        url: '/smartbiddoc-material/api/material/apiQuerySimilarMaterialPage',
        method: 'post',
    },


//首页banner
    getHomeHotTemplate: {
        url: '/smartbiddoc-material/api/commonResource/apiQueryHomePageHotTemplate',
        method: 'post',
    },


/*//模板素材通用批量删除接口
    multipleDeleteNode: {
        url: '/smartbiddoc-material/api/commonResource/apiBatchDelCusMaterialNode',
        method: 'post',
    },*/


//模板素材通用批量删除接口
    multipleDeleteNode: {
        url: '/smartbiddoc-material/api/commonResource/apiBatchDelCusMatAndTemAndType',
        method: 'post',
    },


//将个人素材设置为公司素材
    setPersonalFodderToCompany: {
        url: '/smartbiddoc-material/api/cusMaterial/editCusMaterialType',
        method: 'post',
    },

}
