import request from '@/utils/request'

//获取行业类型
export function getIndustryList(data){
    return request({
        url: '/smartbiddoc-material/api/industry/apiQueryIndustryList',
        method: 'post',
        data
    })
}

//根据fileId获取文件地址
export function getFileUrlByFileId(data){
    return request({
        url: '/smartbiddoc-material/api/file/getViewUrlDbPath',
        method: 'get',
        params: data
    })
}

//根据relatedId获取fileId
export function getFileIdByRelatedId(data){
    return request({
        url: '/smartbiddoc-material/api/commonResource/queryFileIdByRelatedId',
        method: 'post',
        data
    })
}

//获取文件上传参数---oss
export function getUploadParams(data){
    return request({
        url: '/smartbiddoc-file/api/fileMange/aliPolicy',
        method: 'post',
        data
    })
}

//图片删除
export function deletePicByFileId(data){
    return request({
        url: '/smartbiddoc-qualify/api/common/delFileByFileId',
        method: 'post',
        data
    })
}

