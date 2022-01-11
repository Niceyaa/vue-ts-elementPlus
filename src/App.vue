<template>
    <router-view v-slot="{Component}">
        <component :is="Component"></component>
    </router-view>
    <login-com></login-com>
</template>
<script lang="ts">
    import loginCom from './components/loginCom.vue'
    import {defineComponent} from 'vue'
    export default defineComponent({
        components: {
            'login-com':loginCom
        }
    })
</script>

<style lang="less">
    .user-popper-info {
        padding: 27px 21px;

        .down-content {
            .down-user-header {
                display: flex;
                align-items: center;
                padding: 0 11px;

                .down-user-icon {
                    width: 40px;
                    height: 40px;
                    margin-right: 18px;
                }

                .down-header-right {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .username-wrapper {
                        font-size: 12px;
                        font-weight: 400;
                        color: #545454;

                        .user-wrapper {
                            display: flex;
                            align-items: center;

                            img {
                                width: 59px;
                                height: 18px;
                                margin-left: 10px;
                            }
                        }
                    }

                    .quit-btn {
                        font-size: 12px;
                        font-weight: 400;
                        color: #9D9D9D;
                        cursor: pointer;

                        &:hover {
                            color: @activeColor;
                        }
                    }
                }
            }

            .down-vip-card {
                position: relative;
                margin: 26px 0;

                img {
                    width: 100%;
                    height: auto;
                }

                .vip-btn {
                    text-decoration: none;
                    position: absolute;
                    right: 20px;
                    top: 13px;
                    width: 70px;
                    height: 24px;
                    background: linear-gradient(155deg, #F0D291, #E2BB78);
                    border-radius: 12px;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 400;
                    color: #333333;
                    line-height: 24px;
                    cursor: pointer;

                    &:hover {
                        opacity: .8;
                    }
                }
            }

            .info-top {
                display: flex;
                justify-content: space-between;
                margin-bottom: 18px;

                .my-subscription {
                    width: 140px;
                    height: 62px;
                    background: #FFFFFF;
                    box-shadow: 0px 2px 7px 0px rgba(203, 209, 214, 0.35);
                    border-radius: 4px;
                    padding: 10px 24px 10px 10px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;

                    img {
                        width: 28px;
                        height: 28px;
                    }

                    .subscription-left {
                        font-size: 13px;
                        font-weight: 500;
                        color: #333333;

                        .subscription-txt {
                            font-size: 12px;
                            font-weight: 400;
                            color: #9D9D9D;
                            margin-top: 5px;
                        }
                    }
                }
            }

            .info-bottom {
                display: flex;

                .info-item {
                    text-decoration: none;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 400;
                    color: #9D9D9D !important;
                    margin-right: 28px;

                    img {
                        width: 20px;
                        height: 22px;
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
</style>
