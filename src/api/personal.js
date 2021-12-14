import request from '@/utils/request'

//查询vip用户成员
export function getVipMember(data){
    return request({
        url: '/smartbiddoc-docUser/api/companyUser/apiQueryCompanyUserList',
        method: 'post',
        data
    })
}

//删除vip成员
export function deleteVipMember(data){
    return request({
        url: '/smartbiddoc-docUser/api/companyUser/apiDelCompanyUser',
        method: 'post',
        data
    })
}

//根据手机号获取用户信息
export function getInfoByPhone(data){
    return request({
        url: '/smartbiddoc-docUser/api/userBase/apiQueryUserBaseByUserPhone',
        method: 'post',
        data
    })
}

//添加vip成员
export function addVipMember(data){
    return request({
        url: '/smartbiddoc-docUser/api/companyUser/apiAddCompanyUser',
        method: 'post',
        data
    })
}

//发票列表
export function getInvoiceList(data){
    return request({
        url: '/smartbiddoc-docUser/api/invoice/apiQueryInvoicePage',
        method: 'post',
        data
    })
}

//新增发票
export function addInvoice(data){
    return request({
        url: '/smartbiddoc-docUser/api/invoice/apiAddInvoice',
        method: 'post',
        data
    })
}


