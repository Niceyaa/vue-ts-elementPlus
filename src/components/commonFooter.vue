<template>
    <div class="common-footer">
        <div class="common-footer-inner">
            <div class="footer-content">
                <div class="footer-content-item">
                    <div class="item-title">特色功能</div>
                    <nuxt-link v-for="(item,idx) in totalData.specialFeatureList" :key="idx" to="/specialFunction"
                               class="item-desc">{{item.title}}
                    </nuxt-link>
                </div>
                <div class="footer-content-item">
                    <div class="item-title">特色模板</div>
                    <nuxt-link v-for="item in specialData.featuredTemplates" :key="item.id"
                               :to="'/sysTemplate/detail/'+item.id" class="item-desc">{{item.name}}
                    </nuxt-link>

                </div>
                <div class="footer-content-item">
                    <div class="item-title">特色素材</div>
                    <nuxt-link v-for="item in specialData.featuredMaterials" :key="item.id"
                               :to="'/sysFodder/detail/'+item.id" class="item-desc">{{item.name}}
                    </nuxt-link>
                </div>
                <div class="footer-content-item">
                    <div class="item-title">关于我们</div>
                    <nuxt-link v-for="item in totalData.aboutUsList" :key="item.articleId"
                               :to="'/declarationPage/'+item.articleId+'?title='+item.title" class="item-desc">
                        {{item.title}}
                    </nuxt-link>
                </div>

                <div class="footer-content-item">
                    <div class="item-title">联系信息</div>
                    <!--<a :href="'http://wpa.qq.com/msgrd?v=3&uin='+serviceQQ+'&site=qq&menu=yes&from=message&isappinstalled=0'" target="_blank" class="item-desc">客服QQ：{{serviceQQ}}</a>-->
                    <!--<a :href="'http://wpa.qq.com/msgrd?v=3&uin=4000707165&site=qq&menu=yes&from=message&isappinstalled=0'" target="_blank" class="item-desc">客服QQ：{{serviceQQ}}</a>-->
                    <a href="tencent://message/?uin=4000707165&Site=在线QQ&Menu=yes" target="_blank" class="item-desc">客服QQ：{{serviceQQ}}</a>
                    <div class="item-desc">客服电话：{{serviceTel}}</div>
                    <div class="item-desc">在线反馈</div>
                    <div class="item-desc">非法有害信息举报</div>
                </div>
            </div>
            <div class="cooperation-info">
                <div>友情链接合作请联系：bsns@server.cn</div>
                <div class="separator-line"></div>
            </div>
            <div class="relation-web">
                <a href="#">招标网</a>
                <a href="#">政策快报</a>
                <a href="#">黔科技</a>
            </div>
            <div class="archival-info-wrapper">
                <div class="archival-info">
                    <span>@2021 贵阳高新数通信息有限公司 黔ICP备15001343号-10</span>
                    <a href="#">操作手册</a>
                </div>
                <div class="archival-tips">若发现您的权益受害，请立即联系客服，我们会尽快为您处理</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {serviceTel,serviceQQ} from "../setting";

    export default {
        name: "commonFooter",
        data() {
            return {
                serviceTel:serviceTel,
                serviceQQ:serviceQQ,
                // totalData: {},
                // specialData: {},
            }
        },
        computed: mapState({
            totalData: state => state.btmNavInfo,
            specialData: state => state.specialInfo
        }),
        mounted() {
            // this.getData()
        },
        methods: {
            getData() {
                this.$axios[this.$apiURL.commonApi.getBtmNavInfo.method](this.$apiURL.commonApi.getBtmNavInfo.url).then(res => {
                    this.totalData = res.data.result
                })
                this.$axios[this.$apiURL.commonApi.getSpecialTempFodder.method](this.$apiURL.commonApi.getSpecialTempFodder.url).then(res => {
                    this.specialData = res.data.result
                })
            },
            goToQQ(){
                location.href = `http://wpa.qq.com/msgrd?v=3&uin=${serviceQQ}&site=qq&menu=yes&from=message&isappinstalled=0`
            }
        }
    }
</script>

<style scoped lang="less">
    .common-footer {
        width: 100%;
        background: #0E1012;
        color: #928F90;

        .common-footer-inner {
            width: 1440px;
            margin: 0 auto;
            padding: 99px 0 0 99px;

            .footer-content {
                display: flex;
                margin-bottom: 60px;

                .footer-content-item {
                    width: 230px;

                    .item-title {
                        font-size: 16px;
                        font-weight: 400;
                        color: #545557;
                        margin-bottom: 26px;
                    }

                    .item-desc {
                        cursor: pointer;
                        font-size: 13px;
                        font-weight: 400;
                        color: #928F90;
                        margin-bottom: 17px;
                        text-decoration: none;
                        display: block;
                    }
                }
            }

            .cooperation-info {
                display: flex;
                align-items: center;
                font-size: 15px;
                font-weight: 400;
                color: #545557;
                margin-bottom: 15px;

                .separator-line {
                    flex: 1;
                    margin-left: 16px;
                    min-width: 930px;
                    background: #545557;
                    height: 1px;
                }
            }

            .relation-web {
                display: flex;
                align-items: center;
                font-size: 13px;
                font-weight: 400;

                a {
                    text-decoration: none;
                    color: #928F90;
                    margin-right: 55px;

                }
            }

            .archival-info-wrapper {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 66px 0 45px 0;

                .archival-info {
                    font-size: 12px;
                    font-weight: 400;
                    color: #C6C4C4;

                    a {
                        text-decoration: none;
                        color: #C6C4C4;
                        margin-left: 15px;
                    }
                }

                .archival-tips {
                    font-size: 10px;
                    font-weight: 400;
                    color: #4D5058;
                }
            }
        }
    }
</style>
