export default {
//会员价格
    getVipPrice: {
        url: '/smartbiddoc-docUser/api/memberPrice/apiQueryTotalMemberPrice',
        method: 'post',
    },

//生成订单号
    getOrderId: {
        url: '/smartbiddoc-docUser/api/companyAccount/addCompanyAccountRecharge',
        method: 'post',
    },

//生成付款码
    generatePayCode: {
        url: '/smartbiddoc-docUser/api/polymerPay/generatePolymerQRCode4Product',
        method: 'post',
        responseType: 'blob'
    },

//计算企业会员价格
    getEnterpriseVipPrice: {
        url: '/smartbiddoc-docUser/api/memberPrice/calculateCompanyMemberPrice',
        method: 'post',
    },

//单独获取会员价格信息
    getVipPriceInfoAlone: {
        url: '/smartbiddoc-docUser/api/memberPrice/getMemberPriceInfo',
        method: 'post',
    },

//查询订单信息
    getOrderInfoById: {
        url: '/smartbiddoc-docUser/api/companyOrder/queryOrderById',
        method: 'post',
    }

}
