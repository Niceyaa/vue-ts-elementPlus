

import request from '@/utils/request'

export function loginPwd(data){
    return request({
        url: '/smartbiddoc-docUser/api/userBase/userBaseLoginToPwd',
        method: 'post',
        data
    })
}

export function loginCode(data){
    return request({
        url: '/smartbiddoc-docUser/api/userBase/userBaseLoginToAuthCode',
        method: 'post',
        data
    })
}

export function register(data){
    return request({
        url: '/smartbiddoc-docUser/api/userBase/userBaseRegister',
        method: 'post',
        data
    })
}

export function sendCode(data){
    return request({
        url: '/smartbiddoc-docUser/api/authCode/sendAuthCode',
        method: 'post',
        data
    })
}


export function getUserInfo(data){
    return request({
        url: '/smartbiddoc-docUser/api/userBase/queryUserBaseInfo',
        method: 'post',
        data
    })
}

export function loginOut(data){
    return request({
        url: '/smartbiddoc-docUser/api/userBase/loginOut',
        method: 'post',
        data
    })
}

//获取用户会员信息
export function getUserVipInfo(data){
    return request({
        url: '/smartbiddoc-docUser/api/companyAccount/queryCompanyAccount',
        method: 'post',
        data
    })
}

//忘记密码
export function forgetPwd(data){
    return request({
        url: '/smartbiddoc-docUser/api/userBase/resetPassword',
        method: 'post',
        data
    })
}

//我的订单
export function getMyOrder(data){
    return request({
        url: '/smartbiddoc-docUser/api/companyOrder/apiQueryOrderPage',
        method: 'post',
        data
    })
}
