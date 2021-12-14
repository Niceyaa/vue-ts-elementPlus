export default {
//查询vip用户成员
    getVipMember: {
        url: '/smartbiddoc-docUser/api/companyUser/apiQueryCompanyUserList',
        method: 'post',
    },

//删除vip成员
    deleteVipMember: {
        url: '/smartbiddoc-docUser/api/companyUser/apiDelCompanyUser',
        method: 'post',
    },

//根据手机号获取用户信息
    getInfoByPhone: {
        url: '/smartbiddoc-docUser/api/userBase/apiQueryUserBaseByUserPhone',
        method: 'post',
    },

//添加vip成员
    addVipMember: {
        url: '/smartbiddoc-docUser/api/companyUser/apiAddCompanyUser',
        method: 'post',
    },

//发票列表
    getInvoiceList: {
        url: '/smartbiddoc-docUser/api/invoice/apiQueryInvoicePage',
        method: 'post',
    },

//新增发票
    addInvoice: {
        url: '/smartbiddoc-docUser/api/invoice/apiAddInvoice',
        method: 'post',
    },


}
