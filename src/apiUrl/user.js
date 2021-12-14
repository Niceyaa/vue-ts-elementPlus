export default{
    loginCode: {
        url: '/smartbiddoc-docUser/api/userBase/userBaseLoginToAuthCode',
        method: 'post',
    },
    loginPwd: {
        url: '/smartbiddoc-docUser/api/userBase/userBaseLoginToPwd',
        method: 'post',
    },
    register: {
        url: '/smartbiddoc-docUser/api/userBase/userBaseRegister',
        method: 'post',
    },
    sendCode: {
        url: '/smartbiddoc-docUser/api/authCode/sendAuthCode',
        method: 'post',
    },
    getUserInfo: {
        url: '/smartbiddoc-docUser/api/userBase/queryUserBaseInfo',
        method: 'post',
    },
    loginOut: {
        url: '/smartbiddoc-docUser/api/userBase/loginOut',
        method: 'post',
    },
    getUserVipInfo: {
        url: '/smartbiddoc-docUser/api/companyAccount/queryCompanyAccount',
        method: 'post',
    },
    forgetPwd: {
        url: '/smartbiddoc-docUser/api/userBase/resetPassword',
        method: 'post',
    },
    getMyOrder: {
        url: '/smartbiddoc-docUser/api/companyOrder/apiQueryOrderPage',
        method: 'post',
    },
    //我的收藏
    getCollectionData: {
        url: '/smartbiddoc-docUser/api/collection/apiQueryCollectionPage',
        method: 'post',
    },
    //部门管理--查询列表
    getDepartmentList: {
        url: '/smartbiddoc-qualify/api/dept/queryDeptList',
        method: 'post',
    },
    //收藏操作
    collectHandle: {
        url: '/smartbiddoc-docUser/api/collection/apiAddCollection',
        method: 'post',
    },
    //部门管理--添加
    addDepartment: {
        url: '/smartbiddoc-qualify/api/dept/addDept',
        method: 'post',
    },
    //部门管理--编辑
    updateDepartment: {
        url: '/smartbiddoc-qualify/api/dept/editDept',
        method: 'post',
    },
    //部门管理--删除
    deleteDepartment: {
        url: '/smartbiddoc-qualify/api/dept/delDept',
        method: 'post',
    },
    //账号信息--修改
    updateAccountInfo: {
        url: '/smartbiddoc-docUser/api/userBase/apiEditUserBaseInfo',
        method: 'post',
    },
    //批量删除收藏
    multipleCancelCollect: {
        url: '/smartbiddoc-docUser/api/collection/apiBathDelCollection',
        method: 'post',
    },
    //批量删除浏览记录
    multipleDelBrowRecord: {
        url: '/smartbiddoc-material/api/browseRecords/apiBatchDelBrowseRecords',
        method: 'post',
    },
    //修改用户手机号
    updateUserPhone: {
        url: '/smartbiddoc-docUser/api/userBase/apiEditUserBaseInfoPhone',
        method: 'post',
    },

}
