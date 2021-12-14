<template>
    <el-dialog @close="closeHandle" class="vip-modal" width="1100px" :visible.sync="modalFlag">
        <div class="vip-modal-content">
            <div class="vip-modal-aside">
                <div class="top-user-info">
                    <div class="user-info">
                        <img src="../assets/newIndex/headPortrait.png" alt="">
                        <div class="user-vip-info">
                            <div class="user-name">{{userInfo.userName}}</div>
                            <div v-if="!userVipInfo.memberFlag">非会员</div>
                            <div v-else-if="userVipInfo.memberFlag&&userVipInfo.purchaseNums===1">个人版会员</div>
                            <div v-else="userVipInfo.memberFlag&&userVipInfo.purchaseNums>1">企业版会员</div>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">主账号</div>
                        <div class="info-desc">{{userVipInfo.adminUserCode}}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">套餐类型</div>
                        <div v-if="userVipInfo.memberFlag&&userVipInfo.purchaseNums>1" class="info-desc">企业版会员</div>
                    </div>
                    <!--  <div class="info-item">
                          <div class="info-label">开通时长</div>
                          <div class="info-desc">136·1·23232</div>
                      </div>-->
                    <div class="info-item">
                        <div class="info-label">到期时间</div>
                        <div class="info-desc">{{userVipInfo.termOfValidity?userVipInfo.termOfValidity:'-'}}</div>
                    </div>
                </div>
                <div class="info-separator-line"></div>
                <div class="vip-privilege">
                    <div class="privilege-text">会员特权</div>
                    <div class="privilege-item">尊享10万+标书、素材模块</div>
                    <div class="privilege-item">尊享风靡全球的标书编辑工具</div>
                    <div class="privilege-item">尊享1小时快速生成标书</div>
                    <div class="privilege-item">尊享多人协作，工作更高效</div>
                    <div class="privilege-item">尊享公司资质、人员资质管理和导入</div>
                    <div class="privilege-item">尊享历史业绩管理和导入</div>
                    <div class="privilege-item">尊享格式统一设置，满足打印需求</div>
                </div>
            </div>
            <div class="vip-modal-main">
                <div class="vip-main-header">
                    <div @click="changeOrderType('personal')"
                         :class="{'vip-type-item':true,'typeActive':currentOrderType==='personal'}">
                        <img class="item-icon" src="../assets/newVip/vip_individualmember@2x.png" alt="">
                        <div class="item-title">个人版会员</div>
                        <div class="item-desc">高端商务人士都在用</div>
                        <img class="active-icon" src="../assets/newVip/vip_switch@2x.png" alt="">
                    </div>
                    <div @click="changeOrderType('enterprise')"
                         :class="{'vip-type-item':true,'typeActive':currentOrderType==='enterprise'}">
                        <img class="item-icon" src="../assets/newVip/vip_multimember@2x.png" alt="">
                        <div class="item-title">企业版版会员</div>
                        <div class="item-desc">主账号可以管理子账号，多人协作更高效</div>
                        <img class="active-icon" src="../assets/newVip/vip_switch@2x.png" alt="">
                    </div>
                </div>
                <div class="vip-main-info">
                    <div v-if="currentOrderType==='personal'" class="vip-info-wrapper">
                        <div class="vip-tips">选择您要开通的时长：</div>
                        <div class="vip-info">
                            <div @click="changeOrderInfo(item,'personal')"
                                 :class="{'vip-info-item':true,'vipActive':personOrderInfo.memberPriceId===item.memberPriceId,'vipSuggest':idx===0}"
                                 v-for="(item,idx) in personPriceList.memberPriceInfoList">
                                <div class="vip-item-title">{{item.description}}</div>
                                <div class="vip-item-price">
                                    ¥<span>{{item.finalPrice}}</span>
                                </div>
                                <div class="vip-item-desc">{{item.unitMessage}}</div>
                                <div class="vip-item-suggest">推荐</div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="vip-info-wrapper enterprise-vip">
                        <div class="vip-info">
                            <div @click="changeOrderInfo(item,'enterprise')"
                                 :class="{'vip-info-item':true,'vipActive':enterpriseOrderInfo.memberPriceId===item.memberPriceId,'vipSuggest':idx===0}"
                                 v-for="(item,idx) in enterprisePriceList.memberPriceInfoList">
                                <div class="vip-item-title">{{item.description}}</div>
                                <div class="vip-item-price">
                                    ¥<span>{{item.finalPrice}}</span>
                                </div>
                                <div class="vip-item-desc">{{item.unitMessage}}</div>
                                <div class="vip-item-suggest">推荐</div>
                            </div>
                        </div>
                        <div class="vip-choose-num">
                            <div class="pay-info-item">
                                <div>购买人数</div>
                                <el-input-number v-model="currentNum" @change="userNumChange"
                                                 :min="minNum"></el-input-number>
                            </div>
                            <div class="pay-info-item">
                                <div>价格</div>
                                <div class="coupon-info">
                                    <div class="coupon-desc">已优惠{{favorablePrice}}元</div>
                                    <div>¥{{finalPrice}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="vip-pay-wrapper">
                        <div class="pay-header">
                            <div>快捷支付</div>
                            <div class="red-line"></div>
                        </div>
                        <div v-if="orderStatus!=='success'" class="pay-info">
                            <div class="pay-code">
                                <img :src="payQRCode" alt="">
                            </div>
                            <div class="pay-desc">
                                <div class="pay-price">
                                    应付金额：<span>¥</span><span class="price">{{finalPrice}}</span>
                                </div>
                                <div class="pay-type-tips">
                                    <img src="../assets/newVip/vip_wechat@2x.png" alt="">
                                    <img src="../assets/newVip/vip_alipay@2x.png" alt="">
                                    <div>使用微信、支付宝扫码支付</div>
                                </div>
                            </div>
                            <!--<div class="pay-success" v-else>
                                <img src="../assets/newVip/popup_pay_complete.png@2x.png" alt="">
                                <div>{{payTypeName}} 扫码成功</div>
                            </div>-->
                        </div>
                        <div v-else class="pay-success-wrapper">
                            <img src="~assets/newVip/paySuccess.png" alt="">
                            <div>{{payTypeName}} 扫码成功</div>
                        </div>
                    </div>
                    <div @click="payFn" class="refresh-pay-code">
                        <img class="default-icon" src="../assets/newVip/pay_icon_refresh_default.png" alt="">
                        <img class="hover-icon" src="../assets/newVip/pay_icon_refresh_select.png" alt="">
                        <div>支付失败？刷新二维码</div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    import qs from 'qs'
    import {getOrderId, generatePayCode} from "../api/vip";

    export default {
        name: 'vipModal',
        data() {
            return {
                payInfo: {},
                payQRCode: '',
                minNum: 3,
                currentNum: 0,
                currentVipInfo: {},
                personPriceList: {},
                enterprisePriceList: {},
                currentOrderType: null,

                currentOrderInfo: {},
                personOrderInfo: null,
                enterpriseOrderInfo: null,

                finalPrice: 0,
                favorablePrice: 0,

                orderTimer: null,
                orderStatus: 'init',
                payTypeName: null
            }
        },
        props: {
            orderType: {
                type: String,
                default: 'personal'
            },
            orderInfo: {
                type: Object,
                required: false
            },
            vipModalFlag: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            modalFlag: {
                get() {
                    return this.$props.vipModalFlag
                },
                set() {
                    this.$emit('update:vipModalFlag', false)
                }
            },
            userVipInfo() {
                return this.$store.state.userVipInfo
            },
            userInfo() {
                return this.$store.state.userInfo
            },
        },
        watch: {
            "$props.vipModalFlag": {
                async handler(val) {
                    // val ? this.payFn() : ''
                    if (val) {
                        this.initModal()
                    }
                },
                deep: true
            },
            currentOrderInfo: {
                handler(val) {
                    if (val.memberPriceId) {
                        this.payFn()
                    }
                },
                deep: true
            }
        },
        methods: {
            //弹出初始化
            async initModal() {
                this.currentOrderType = this.$props.orderType
                await this.getUserVipInfo()
                await this.getVipList()
            },
            //获取vip列表信息
            async getVipList() {
                let prm = {
                    "memberPriceId": this.orderInfo.memberPriceId,
                    "type": this.currentOrderType === 'personal' ? 1 : 2,
                    "userNum": this.currentOrderType === 'personal' ? 1 : this.currentNum
                }
                let vipList = await this.$axios[this.$apiURL.vip.getVipPriceInfoAlone.method](this.$apiURL.vip.getVipPriceInfoAlone.url, prm)
                if (this.currentOrderType === 'personal') {
                    this.personPriceList = vipList.data.result
                    if (!this.personOrderInfo) {
                        let arr = vipList.data.result.memberPriceInfoList.filter(item => {
                            return item.memberPriceId === this.$props.orderInfo.memberPriceId
                        })
                        if (arr.length > 0) {
                            this.personOrderInfo = arr[0]
                        } else {
                            this.personOrderInfo = vipList.data.result.memberPriceInfoList[0]
                        }
                    }
                    this.changeShowInfo(this.personOrderInfo)

                } else {
                    this.enterprisePriceList = vipList.data.result
                    if (!this.enterpriseOrderInfo) {
                        let arr = vipList.data.result.memberPriceInfoList.filter(item => {
                            return item.memberPriceId === this.$props.orderInfo.memberPriceId
                        })
                        if (arr.length > 0) {
                            this.enterpriseOrderInfo = arr[0]
                        } else {
                            this.enterpriseOrderInfo = vipList.data.result.memberPriceInfoList[0]
                        }
                    }
                    this.changeShowInfo(this.enterpriseOrderInfo)
                }
            },
            async getUserVipInfo() {
                let userVipInfo = await this.$axios[this.$apiURL.user.getUserVipInfo.method](this.$apiURL.user.getUserVipInfo.url)
                const userVipInfoData = userVipInfo.data
                this.$store.commit("SET_VIP_INFO", userVipInfoData.result)
                this.currentVipInfo = userVipInfoData.result
                this.currentNum = userVipInfoData.result.purchaseNums === 0 || userVipInfoData.result.purchaseNums === 1 ? 3 : userVipInfoData.result.purchaseNums
            },
            //切换vip类型
            changeOrderType(type) {
                this.currentOrderType = type
                if (type === 'personal') {
                    if (this.personPriceList.memberPriceInfoList) {
                        this.changeShowInfo(this.personOrderInfo)
                    } else {
                        this.getVipList()
                    }
                } else {
                    if (this.enterprisePriceList.memberPriceInfoList) {
                        this.changeShowInfo(this.enterpriseOrderInfo)
                    } else {
                        this.getVipList()
                    }
                }
            },
            //vip项点击事件
            changeOrderInfo(info, type) {
                type === 'personal' ? this.personOrderInfo = info : this.enterpriseOrderInfo = info
                this.changeShowInfo(info)
            },
            //购买人数发生变化
            async userNumChange() {
                let prm = {
                    "memberPriceId": this.orderInfo.memberPriceId,
                    "type": this.currentOrderType === 'personal' ? 1 : 2,
                    "userNum": this.currentNum
                }
                let vipList = await this.$axios[this.$apiURL.vip.getVipPriceInfoAlone.method](this.$apiURL.vip.getVipPriceInfoAlone.url, prm)

                this.enterprisePriceList = vipList.data.result

                this.enterpriseOrderInfo = vipList.data.result.memberPriceInfoList[0]

                this.changeShowInfo(vipList.data.result.memberPriceInfoList[0])
            },
            async payFn() {
                this.orderStatus = 'fail'
                if (this.orderTimer) {
                    clearInterval(this.orderTimer)
                    this.orderTimer = null
                }
                const prm = qs.stringify({
                    memberPriceId: this.currentOrderInfo.memberPriceId,
                    paymentChannel: 1,//网页
                    userNum: this.currentOrderType === 'personal' ? 1 : this.currentNum,
                })
                const payInfo = await this.$axios[this.$apiURL.vip.getOrderId.method](this.$apiURL.vip.getOrderId.url, prm)
                this.finalPrice = payInfo.data.result.orderAmount
                const params = qs.stringify({
                    orderId: payInfo.data.result.orderId,
                })
                const payRes = await this.$axios[this.$apiURL.vip.generatePayCode.method](this.$apiURL.vip.generatePayCode.url, params, {responseType: "blob"})

                console.log('payRes', payRes)
                this.payQRCode = URL.createObjectURL(payRes.data)

                this.orderTimer = setInterval(async () => {
                    let orderPrm = qs.stringify({
                        orderId: payInfo.data.result.orderId,
                        noLoading: true
                    })
                    const orderDetail = await this.$axios[this.$apiURL.vip.getOrderInfoById.method](this.$apiURL.vip.getOrderInfoById.url, orderPrm)
                    if (orderDetail.data.result.orderState === 101) {
                        //orderState 订单状态 100订单初始化 101支付完成 102关闭交易
                        this.$message.success("支付成功")
                        clearInterval(this.orderTimer)
                        this.orderTimer = null
                        this.orderStatus = 'success'
                        this.payTypeName = orderDetail.data.result.paymentTypeName
                        this.$store.dispatch("getUserVipInfo")
                    }
                }, 1200)
            },
            //改变orderInfo和价格显示
            changeShowInfo(info) {
                this.currentOrderInfo = info
                this.finalPrice = info.preOrderPrice
                this.favorablePrice = info.preOrderFavorablePrice
            },
            closeHandle() {
                this.currentOrderInfo = {}
                this.enterpriseOrderInfo = null
                this.personOrderInfo = null
                this.personPriceList = {}
                this.enterprisePriceList = {}
                if (this.orderTimer) {
                    clearInterval(this.orderTimer)
                    this.orderTimer = null
                }
                //通过全局控制
                this.$store.commit('SET_VIP_FLAG', false)
            }
        }
    }
</script>
<style lang="less" scoped>
    .vip-modal {
        /deep/ .el-dialog {
            background: none !important;
        }

        /deep/ .el-dialog__header {
            padding: 0;

            .el-dialog__headerbtn {
                font-size: 20px;

                .el-dialog__close {
                    color: #fff;
                }
            }
        }

        /deep/ .el-dialog__body {
            padding: 0;

            .vip-modal-content {
                height: 710px;
                display: flex;
                background-color: #fff;
                border-radius: 20px;

                .vip-modal-aside {
                    width: 298px;
                    min-width: 298px;
                    background: url("../assets/newVip/vip_sidebar@2x.png");
                    background-size: 100% 100%;

                    .top-user-info {
                        padding: 64px 0 0 37px;

                        .user-info {
                            display: flex;
                            align-items: center;
                            padding-bottom: 7px;

                            img {
                                width: 72px;
                                height: 72px;
                                margin-right: 8px;
                            }

                            .user-vip-info {
                                font-size: 15px;
                                font-weight: 400;
                                color: #583C04;

                                .user-name {
                                    font-size: 18px;
                                    font-weight: 500;
                                    color: #221503;
                                }
                            }
                        }

                        .info-item {
                            display: flex;
                            margin-top: 12px;
                            font-size: 14px;
                            color: #4C3204;

                            .info-label {
                                width: 58px;
                                text-align: justify;
                                text-align-last: justify;
                                margin-right: 15px;
                            }
                        }
                    }

                    .info-separator-line {
                        width: 241px;
                        height: 1px;
                        background: #E5BF72;
                        margin: 40px 0 0 26px;
                    }

                    .vip-privilege {
                        padding: 0 0 0 37px;

                        .privilege-text {
                            margin: 40px 0 25px 74px;
                            font-size: 18px;
                            font-weight: 500;
                            color: #221503;
                        }

                        .privilege-item {
                            font-size: 14px;
                            font-weight: 400;
                            color: #402A04;
                            margin-bottom: 16px;
                        }
                    }
                }

                .vip-modal-main {
                    flex: 1;
                    padding: 48px 36px 0 36px;

                    .vip-main-header {
                        border-bottom: 1px solid #E9E9E9;
                        display: flex;

                        .vip-type-item {
                            flex: .5;
                            padding-bottom: 14px;
                            position: relative;
                            text-align: center;
                            cursor: pointer;

                            &.typeActive {
                                .item-title {
                                    font-weight: bold;
                                    color: #AC5000;
                                }

                                .item-desc {
                                    color: #694206;
                                }

                                .active-icon {
                                    display: block;
                                }
                            }

                            .item-icon {
                                width: 34px;
                                height: 34px;
                            }

                            .item-title {
                                font-size: 24px;
                                color: #2A2A2A;
                            }

                            .item-desc {
                                font-size: 16px;
                                color: #828282;
                                margin-top: 6px;
                            }

                            .active-icon {
                                display: none;
                                width: 80px;
                                height: 6px;
                                position: absolute;
                                bottom: 0;
                                left: 50%;
                                -webkit-transform: translateX(-40px);
                                -moz-transform: translateX(-40px);
                                -ms-transform: translateX(-40px);
                                -o-transform: translateX(-40px);
                                transform: translateX(-40px);
                            }
                        }
                    }

                    .vip-main-info {
                        padding: 21px 0 0 0;

                        .vip-info-wrapper {
                            margin-bottom: 45px;

                            &.enterprise-vip {
                                margin-bottom: 0;
                                padding: 0 72px;

                                .vip-info {
                                    .vip-info-item {
                                        width: 167px;
                                        height: 167px;
                                        background: #FFFFFF;
                                        border: 1px solid #E6E7E8;
                                        border-radius: 8px;
                                        cursor: pointer;

                                        &.vipActive {
                                            background: url("../assets/newVip/vip_select@2x.png");
                                            background-size: 100% 100%;

                                            .vip-item-price {
                                                color: #FF0000;
                                            }
                                        }

                                        &.vipSuggest {
                                            .vip-item-suggest {
                                                display: block;
                                            }
                                        }

                                        .vip-item-title {
                                            padding: 30px 0 12px 0;
                                        }

                                        .vip-item-desc {
                                            margin-top: 14px;
                                        }

                                        .vip-item-suggest {
                                            display: none;
                                            position: absolute;
                                            left: -1px;
                                            top: -1px;
                                            width: 82px;
                                            height: 26px;
                                            line-height: 26px;
                                            text-align: center;
                                            font-size: 14px;
                                            color: #FFFFFF;
                                            background: url("../assets/newVip/vip-person-label.png");
                                            background-size: 100% 100%;
                                        }
                                    }
                                }
                            }

                            .vip-tips {
                                font-size: 16px;
                                color: #333333;
                                margin-bottom: 10px;
                            }

                            .vip-info {
                                display: flex;
                                justify-content: space-between;

                                .vip-info-item {
                                    text-align: center;
                                    position: relative;
                                    width: 194px;
                                    height: 194px;
                                    background: #FFFFFF;
                                    border: 1px solid #E6E7E8;
                                    border-radius: 8px;
                                    cursor: pointer;

                                    &.vipActive {
                                        background: url("../assets/newVip/vip_select@2x.png");
                                        background-size: 100% 100%;

                                        .vip-item-price {
                                            color: #FF0000;
                                        }
                                    }

                                    &.vipSuggest {
                                        .vip-item-suggest {
                                            display: block;
                                        }
                                    }

                                    .vip-item-title {
                                        padding: 40px 0 20px 0;
                                        font-size: 16px;
                                        color: #333333;
                                    }

                                    .vip-item-price {
                                        font-size: 18px;
                                        font-family: DIN;
                                        color: #333333;

                                        span {
                                            font-size: 32px;
                                            font-weight: bold;
                                        }
                                    }

                                    .vip-item-desc {
                                        font-size: 14px;
                                        color: #828282;
                                        margin-top: 14px;
                                    }

                                    .vip-item-suggest {
                                        display: none;
                                        position: absolute;
                                        left: -1px;
                                        top: -1px;
                                        width: 82px;
                                        height: 26px;
                                        line-height: 26px;
                                        text-align: center;
                                        font-size: 14px;
                                        color: #FFFFFF;
                                        background: url("../assets/newVip/vip-person-label.png");
                                        background-size: 100% 100%;
                                    }
                                }
                            }

                            .vip-choose-num {
                                margin-top: 12px;
                                height: 88px;
                                background: #F9F9F9;
                                border-radius: 8px;
                                padding: 0 24px;

                                .pay-info-item {
                                    display: flex;
                                    justify-content: space-between;
                                    padding: 16px 0 0 0;
                                    font-size: 15px;
                                    color: #333333;

                                    .el-input-number {
                                        width: 121px;
                                        height: 25px;

                                        line-height: 23px;

                                        .el-input__inner {
                                            height: 25px;
                                            line-height: 25px;
                                        }
                                    }

                                    .coupon-info {
                                        display: flex;
                                        align-items: center;
                                        font-size: 15px;
                                        color: #FF0000;

                                        .coupon-desc {
                                            height: 20px;
                                            line-height: 20px;
                                            background: #FF0000;
                                            border-radius: 10px;
                                            padding: 0 13px;
                                            font-size: 12px;
                                            color: #FFFFFF;
                                            margin-right: 10px;
                                        }
                                    }
                                }
                            }
                        }

                        .vip-pay-wrapper {
                            .pay-header {
                                border-bottom: 1px solid #E9E9E9;
                                padding-bottom: 12px;
                                position: relative;
                                font-size: 16px;
                                color: #333333;
                                margin-bottom: 33px;

                                .red-line {
                                    position: absolute;
                                    bottom: 0;
                                    left: 0;
                                    width: 62px;
                                    height: 2px;
                                    background: #FF0000;
                                }
                            }

                            .pay-info {
                                display: flex;
                                align-items: center;

                                .pay-code {
                                    width: 142px;
                                    height: 142px;
                                    background: #FFFFFF;
                                    border: 1px solid #EDEFF3;
                                    border-radius: 0px;
                                    padding: 9px;
                                    margin-right: 62px;

                                    img {
                                        width: 124px;
                                        height: 124px;
                                    }
                                }

                                .pay-desc {
                                    .pay-price {
                                        font-size: 16px;
                                        color: #333333;
                                        margin-bottom: 14px;

                                        span {
                                            font-size: 18px;
                                            color: #FF5352;

                                            &.price {
                                                font-weight: bold;
                                                font-size: 30px;
                                            }
                                        }
                                    }

                                    .pay-type-tips {
                                        display: flex;
                                        align-items: center;
                                        font-size: 14px;
                                        color: #828282;

                                        img {
                                            width: 20px;
                                            height: 20px;
                                            margin: 0 10px 0 0;
                                        }
                                    }
                                }

                                .pay-success {
                                    font-size: 18px;
                                    font-weight: 400;
                                    color: #515151;
                                    text-align: center;
                                    display: flex;

                                    img {
                                        width: 27px;
                                        height: auto;
                                        margin-right: 15px;
                                    }
                                }
                            }

                            .pay-success-wrapper{
                                width: 100%;
                                text-align: center;
                                height: 142px;
                                background: #F7F7F7;
                                font-size: 16px;
                                font-weight: bold;
                                color: #CFB184;
                                img{
                                    width: 50px;
                                    height: auto;
                                    margin: 24px 0 15px 0;
                                }
                            }
                        }

                        .refresh-pay-code {
                            display: flex;
                            align-items: center;
                            font-size: 16px;
                            color: #333333;
                            padding-top: 12px;
                            cursor: pointer;

                            &:hover {
                                color: @activeColor;

                                img {
                                    &.default-icon {
                                        display: none;
                                    }

                                    &.hover-icon {
                                        display: block;
                                    }
                                }
                            }

                            img {
                                margin-right: 6px;

                                &.default-icon {
                                    display: block;
                                }

                                &.hover-icon {
                                    display: none;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
