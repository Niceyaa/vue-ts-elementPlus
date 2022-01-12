<template>
    <div :class="{'common-nav-header':true,'homeRouter': route.name==='home'}">
        <div class="nav-left">
            <router-link class="logo" to="/">
                <img v-if="route.name!=='home'" src="../assets/newIndex/nav_logo1.png" alt="">
                <img v-else src="../assets/newIndex/nav_logo.png" alt="">
            </router-link>
            <div class="main-nav">
                <div class="nav-item" @click="openMakeDialog">开始制作</div>
                <router-link
                        :class="{'nav-item':true,'currentNav':route.name==='sysTemplate'||route.name==='sysTemplate-detail-detail'}"
                        to="/sysTemplate/1">模板库
                </router-link>
                <router-link
                        :class="{'nav-item':true,'currentNav':route.name==='sysFodder'||route.name==='sysFodder-detail-detail'}"
                        to="/sysFodder/1">素材库
                </router-link>
                <router-link :class="{'nav-item':true,'currentNav':route.name==='specialFunction'}"
                           to="/specialFunction">特色功能
                </router-link>
                <!--<router-link :class="{'nav-item':true,'currentNav':true}" to="/">VIP特权</router-link>-->
                <router-link :class="{'nav-item':true,'currentNav':route.name==='vip'}" to="/vip">会员中心</router-link>
            </div>
        </div>

        <div class="nav-info">
            <router-link v-if="!store.state.userVipInfo||!store.state.userVipInfo.memberFlag" to="/vip" class="to-vip-icon">
                <img src="../assets/newIndex/nav_vip@2x.png" alt="">
            </router-link>
            <div v-if="store.state.userInfo.userNick" class="logged-wrapper">
                <router-link to="/personalCenter/personalCenter/personalInfo" class="to-work-icon">进入工作区</router-link>
                <el-popover
                        popper-class="user-popper-info"
                        placement="bottom-start"
                        width="340px"
                        trigger="hover">
                    <div class="down-content">
                        <div class="down-user-header">
                            <img class="down-user-icon" src="../assets/newIndex/headPortrait.png" alt="">
                            <div class="down-header-right">
                                <div class="username-wrapper">
                                    <div class="user-wrapper">
                                        <div class="username">{{store.state.userInfo.userNick}}</div>
                                        <img v-if="store.state.userVipInfo&&store.state.userVipInfo.memberFlag" class="isNotVip"
                                             src="../assets/personal2/personal_label_membered@2x.png" alt="开通会员">
                                        <img v-else class="isNotVip"
                                             src="../assets/personal2/personal_label_nonmember@2x.png" alt="未开通会员">
                                    </div>
                                    <div class="userID">ID:{{store.state.userInfo.userCode}}</div>
                                </div>
                                <div @click="loginOut" class="quit-btn">退出</div>
                            </div>
                        </div>
                        <div class="down-vip-card">
                            <img src="../assets/newIndex/vipCardIcon.png" alt="">
                            <!--判断是否是会员，显示 开通-->
                            <router-link to="/vip" class="vip-btn">{{store.state.userVipInfo&&store.state.userVipInfo.memberFlag?'续费会员':'开通会员'}}
                            </router-link>
                        </div>
                        <div class="info-top">
                            <router-link to="/personalCenter/personalCenter/myCollection" class="my-subscription">
                                <div class="subscription-left">
                                    <div class="subscription-label">我的收藏</div>
                                    <div class="subscription-txt">查看>></div>
                                </div>
                                <img class="subscription-icon" src="../assets/newIndex/head_icon_collections@2x.png"
                                     alt="我的收藏">
                            </router-link>
                            <router-link to="/personalCenter/personalCenter/exportRecord" class="my-subscription">
                                <div class="subscription-left">
                                    <div class="subscription-label">导出记录</div>
                                    <div class="subscription-txt">查看>></div>
                                </div>
                                <img class="subscription-icon" src="../assets/newIndex/head_icon_download@2x.png"
                                     alt="我的下载">
                            </router-link>
                        </div>
                        <div class="info-bottom">
                            <router-link to="/personalCenter/personalCenter/myOrder" class="info-item">
                                <img src="../assets/newIndex/myOrder.png" alt="">
                                <div class="item-text">我的订单</div>
                            </router-link>
                            <router-link to="/personalCenter/personalCenter/myInvoice" class="info-item">
                                <img src="../assets/newIndex/myBidDoc.png" alt="">
                                <div class="item-text">我的发票</div>
                            </router-link>
                        </div>
                    </div>
                    <template #reference>
                        <img class="portrait-icon" @click="goToURL"
                             src="../assets/personal2/headPortrait.png" alt="">
                    </template>

                </el-popover>
            </div>
            <div v-else class="login-register">
                <div class="login-btn" @click="openLoginModal('pwdLogin')">登录</div>
                <div class="separate-line">/</div>
                <div class="register-btn" @click="openLoginModal('register')">注册</div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {ref, reactive, defineComponent} from 'vue'
    import {useRoute,useRouter} from 'vue-router'
import store from '../store/index'

    export default defineComponent({
        name: 'commonNavHeader',
        setup(props, ctx) {
            console.log('props', props)
            console.log('ctx', ctx)
            const route = useRoute()
            const router = useRouter()

            function goToURL() {
                router.push({
                    path: '/personalCenter/personalCenter/personalInfo'
                })
            }

            // 开始制作点击事件
            function openMakeDialog() {
                console.log(1111)
                if (!store.state.userInfo.userNick) {
                    store.commit('SET_LOGIN', true)
                    return
                }
                store.commit("SET_MAKE_DOC_FLAG", true)
            }

            // 点击登录事件
            function openLoginModal(type:string|null=null):void {
                store.commit("SET_LOGIN_MODULE", type)
                store.commit("SET_LOGIN", true)
            }

            // 退出登录点击事件
         /*   function loginOut() {
                $axios[$apiURL.user.loginOut.method]($apiURL.user.loginOut.url).then(res => {
                    $message.success(res.data.msg)
                    store.commit('SET_LOGIN', false)
                    store.dispatch('resetToken')
                    $cookies.set('loginStatus', false)
                    store.commit('SET_INFO', {})
                    store.commit('SET_VIP_INFO', {})
                    router.push({
                        path: '/'
                    })
                })
            }*/

            return {
                route,
                router,
                store,

                //方法
                goToURL,
                openMakeDialog,
                openLoginModal,
                // loginOut
            }
        },

        methods: {


        }
    })
</script>
<style lang="less">
    .common-nav-header {
        display: flex;
        min-width: 1200px;
        justify-content: space-between;
        width: 100%;
        padding: 0 48px;
        font-size: 16px;
        font-family: @fontMc;
        color: #333333;
        height: 81px;
        align-items: center;
        background: #FFFFFF;
        box-shadow: 0px 2px 9px 0px rgba(91, 102, 173, 0.18);

        &.homeRouter {
            background: url("../assets/newIndex/home_navbar.png");
            background-size: 100% 100%;
            color: #fff;

            .nav-item {
                color: #fff !important;
            }
        }

        .nav-left {
            display: flex;
            align-items: center;

            .logo {
                text-decoration: none;
                margin-right: 70px;

                img {
                    -width: 120px;
                    -height: 38px;
                    width: 128px;
                    height: 40px;
                }
            }

            .main-nav {
                display: flex;

                .nav-item {
                    cursor: pointer;
                    text-decoration: none;
                    margin-right: 50px;
                    color: #333333;

                    &.currentNav {
                        color: #2172FF;
                    }
                }
            }
        }

        .nav-info {
            display: flex;
            align-items: center;

            .to-vip-icon {
                margin-right: 23px;

                img {
                    width: 140px;
                }
            }

            .login-register {
                display: flex;
                align-items: center;

                .login-btn {
                    cursor: pointer;
                }

                .separate-line {
                    margin: 0 8px;
                }

                .register-btn {
                    cursor: pointer;
                }
            }

            .logged-wrapper {
                display: flex;
                align-items: center;

                .to-work-icon {
                    text-decoration: none;
                    background: url("../assets/newIndex/head_icon_work@2x.png");
                    background-size: 100% 100%;
                    width: 78px;
                    height: 24px;
                    text-align: center;
                    line-height: 24px;
                    font-size: 12px;
                    color: #FFFFFF;
                    margin-right: 22px;
                }

                .portrait-icon {
                    width: 28px;
                    height: 28px;
                }
            }
        }
    }
</style>
