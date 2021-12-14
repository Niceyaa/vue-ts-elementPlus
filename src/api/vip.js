import request from '@/utils/request'

//会员价格
export function getVipPrice(data){
    return request({
        url: '/smartbiddoc-docUser/api/memberPrice/apiQueryTotalMemberPrice',
        method: 'post',
        data
    })
}

//生成订单号
export function getOrderId(data){
    return request({
        url: '/smartbiddoc-docUser/api/companyAccount/addCompanyAccountRecharge',
        method: 'post',
        data
    })
}

//生成付款码
export function generatePayCode(data){
    return request({
        url: '/smartbiddoc-docUser/api/companyAccount/generateQRCode4Product',
        method: 'post',
        data,
        responseType: 'blob'
    })
}

//计算企业会员价格
export function getEnterpriseVipPrice(data){
    return request({
        url: '/smartbiddoc-docUser/api/memberPrice/calculateCompanyMemberPrice',
        method: 'post',
        data,
    })
}
