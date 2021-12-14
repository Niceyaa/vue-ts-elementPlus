<template>
    <div class="personal-common-nav">
        <div class="personal-portrait">
                <img src="../assets/personal/personal_icon_portrait@2x.png" alt="">
                <div class="username-wrapper">
                    <div class="username">{{$store.state.userInfo.userName}}</div>
                    <div class="user-id">(id:12121)</div>
                </div>
        </div>
        <div class="common-nav-wrapper">
            <router-link to="/userCenter/myOrder" :class="{'personal-menu-item':true,'navActive':$route.name==='myOrder'}">
                <img class="personal-menu-item-icon" src="../assets/personal/personal_icon_order@2x.png" alt="">
                <div>我的订单</div>
            </router-link>
            <router-link to="/userCenter/myInvoice" :class="{'personal-menu-item':true,'navActive':$route.name==='myInvoice'}">
                <img class="personal-menu-item-icon" src="../assets/personal/personal_icon_invoice.png" alt="">
                <div>我的发票</div>
            </router-link>
            <router-link to="/userCenter/memberManagement" :class="{'personal-menu-item':true,'navActive':$route.name==='personCertification'}">
                <img class="personal-menu-item-icon" src="../assets/personal/personal_icon_member@2x.png" alt="">
                <div>成员管理</div>
            </router-link>
            <router-link to="/userCenter/exportRecord" :class="{'personal-menu-item':true,'navActive':$route.name==='exportRecord'}">
                <img class="personal-menu-item-icon" src="../assets/personal/personal_icon_member.png" alt="">
                <div>导出记录</div>
            </router-link>
        </div>
        <div class="login-out-wrapper">
            <img class="login-out-icon" src="../assets/personal/personal_icon_out@2x.png" alt="">
            <div @click="loginOut">退出登录</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "personalCommonNav",
        data() {
            return {

            };
        },
        mounted(){
            console.log('commonNav',this.$store.state)
        },
        methods:{
            loginOut(){
                this.$store.dispatch('loginOut').then(res=>{
                    this.$message.success(res.data.msg)
                    this.$router.push({
                        path:'/'
                    })
                })
            }
        }
    }
</script>

<style scoped lang="less">
.personal-common-nav{
    width: 100%;
    height: 100%;
    border: 1px solid #EEEEEE;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .personal-portrait{
        display: flex;
        padding: 40px 20px 40px 50px;
        img{
            width: 52px;
            height: 52px;
            margin-right: 16px;
        }
        .username-wrapper{
            .username{
                font-size: 16px;
                color: #333333;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                padding: 5px 0;
            }
            .user-id{
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #999999;
            }
        }
    }
    .common-nav-wrapper{
        border-bottom: 1px solid #EBEBEB;
        border-top: 1px solid #EBEBEB;
        padding: 20px 0;
        .personal-menu-item{
            display: flex;
            align-items: center;
            padding-left: 70px;
            height: 50px;
            font-size: 14px;
            color: #333333;
            text-decoration: none;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            &.navActive{
                background: #F6F7F9;
                border-left: 3px solid #FE3700;
                padding-left: 67px;
            }
            &:hover{
                background: #F6F7F9;
            }
            img{
                width: 24px;
                height: 24px;
                margin-right: 16px;
            }
        }
    }
    .login-out-wrapper{
        display: flex;
        cursor: pointer;
        align-items: center;
        padding-left: 70px;
        margin-top: 33px;
        font-size: 14px;
        color: #333333;
        img{
            width: 24px;
            height: 25px;
            margin-right: 16px;
        }
    }
}
</style>
