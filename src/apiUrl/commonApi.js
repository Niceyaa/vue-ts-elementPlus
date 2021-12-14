export default {
    //获取行业类型
    getIndustryList: {
        url: '/smartbiddoc-material/api/industry/apiQueryIndustryList',
        method: 'post',
    },

//根据fileId获取文件地址
    getFileUrlByFileId: {
        url: '/smartbiddoc-material/api/file/getViewUrlDbPath',
        method: 'get',
    },

//根据relatedId获取fileId
    getFileIdByRelatedId: {
        url: '/smartbiddoc-material/api/commonResource/queryFileIdByRelatedId',
        method: 'post',
    },

//获取文件上传参数---oss
    getUploadParams: {
        url: '/smartbiddoc-file/api/fileMange/aliPolicy',
        method: 'post',
    },

//图片删除
    deletePicByFileId: {
        url: '/smartbiddoc-qualify/api/common/delFileByFileId',
        method: 'post',
    },


//标签列表
    getTagList: {
        url: '/smartbiddoc-material/api/label/apiQueryLabelList',
        method: 'post',
    },


//热门标签列表
    getHotTagList: {
        url: '/smartbiddoc-material/api/popularRecommend/apiQueryPopularLabel',
        method: 'post',
    },


//获取底部导航栏信息
    getBtmNavInfo: {
        url: '/smartbiddoc-pubResource/api/article/apiQueryBottomList',
        method: 'post',
    },


//查询特色模板素材
    getSpecialTempFodder: {
        url: '/smartbiddoc-material/api/popularRecommend/apiQueryPopularTemMat',
        method: 'post',
    },


//查询文章详情
    getArticleDetail: {
        url: '/smartbiddoc-pubResource/api/article/apiQueryContentTwo',
        method: 'post',
    },


//消息类型--查询
    getMessageType: {
        url: '/smartbiddoc-pubResource/api/message/apiQueryMessageType',
        method: 'post',
    },


//消息列表--查询
    getMessageList: {
        url: '/smartbiddoc-pubResource/api/message/apiQueryMessagePage',
        method: 'post',
    },


//消息详情--查询
    getMessageDetail: {
        url: '/smartbiddoc-pubResource/api/message/apiQueryMessageInfo',
        method: 'post',
    },


//消息批量标记已读
    setMessageReadStatus: {
        url: '/smartbiddoc-pubResource/api/message/apiMessageBatchMarkRead',
        method: 'post',
    },


//消息--删除
    delMessage: {
        url: '/smartbiddoc-pubResource/api/message/apiDelMessage',
        method: 'post',
    },


}

