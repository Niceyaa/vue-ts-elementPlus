<template>
    <div ref="detailContainer" class="detail-container">
        <common-nav-header style="position: fixed;z-index: 999"></common-nav-header>
        <div class="detail-content-container">
            <div class="detail-content">
                <div class="detail-base-info">
                    <div class="base-info">
                        <div class="tag-wrapper">
                            <span class="tag-item" v-for="item in detailContent.labelIdList" :key="item.id">
                                {{item.name}}
                            </span>
                        </div>
                        <div class="title-info">{{detailContent.name}}</div>
                        <div class="desc-info">
                            <div>{{detailContent.readingNumber}}阅读</div>
                            <el-divider direction="vertical"></el-divider>
                            <div>{{detailContent.usedTimes}}已用次数</div>
                            <el-divider direction="vertical"></el-divider>
                            <div>{{$lcgFormatDate(detailContent.updateTime)}}上传</div>
                            <el-divider direction="vertical"></el-divider>
                            <div>{{detailContent.pages}}页</div>
                            <el-divider direction="vertical"></el-divider>
                            <div>{{detailContent.fileSize}}</div>
                        </div>
                        <div class="opt-wrapper">
                            <div class="opt-item" @click="collectDoc">
                                <img v-if="!detailContent.collectFlag" src="~/assets/detail/head_icon_collection@2x.png"
                                     alt="">
                                <img v-else src="~/assets/detail/collected.png" alt="">
                                <div>{{detailContent.collectFlag?'已收藏':'收藏'}}</div>
                            </div>
                            <div class="opt-item" @click="shareHandle">
                                <img src="~/assets/detail/head_icon_share@2x.png" alt="">
                                <div>分享</div>
                            </div>
                            <div @click="openSetDialog(1)" class="opt-item">
                                <img src="~/assets/detail/head_icon_company@2x.png" alt="">
                                <div>设为公司素材</div>
                            </div>
                            <div @click="openSetDialog(2)" class="opt-item">
                                <img src="~/assets/detail/head_icon_personal@2x.png" alt="">
                                <div>设为个人素材</div>
                            </div>
                        </div>
                    </div>
                    <!--<div @click="createDocByTemplateId" v-if="$store.state.userVipInfo.memberFlag"
                         class="right-opt-btn">
                        <img src="~/assets/detail/head_template@2x.png" alt="">
                        <div>依模板创建标书</div>
                    </div>-->
                    <!--<div @click="openVipModel" v-if="!$store.state.userVipInfo.memberFlag" class="right-opt-btn notVip">
                        <img src="~/assets/detail/hesd_vip@2x.png" alt="">
                        <div>会员免费使用</div>
                    </div>-->
                </div>
                <div class="detail-main-content">
                    <div :class="{'read-page':true,'fixClass':isFix}">
                        <div class="inner-page">
                            <div class="file-title">
                                <img src="~/assets/detail/sus_word@2x.png" alt="">
                                <span>{{detailContent.name}}</span>
                            </div>
                            <div class="page-show">{{currentReadPage}}/{{detailContent.urlList.length}}</div>
                        </div>


                    </div>
                    <div :ref="'pic'+idx" class="page-content" v-for="(item,idx) in detailContent.urlList">
                        <el-image
                                lazy
                                :src="item">
                            <!--:preview-src-list="detailContent.urlList">-->
                        </el-image>
                    </div>
                    <div class="vip-content" v-if="!$store.state.userVipInfo.memberFlag&&detailContent.needVipFlag">
                        <div class="not-vip-show">
                            <div class="vip-header">
                                <img src="~/assets/detail/open_vip@2x.png" alt="">
                                <div>开通VIP 立即享用</div>
                            </div>
                            <div class="vip-privilege">
                                <div class="privilege-item">
                                    <img src="~/assets/detail/open_icon_material.png" alt="">
                                    <div>10万+标书、素材模版</div>
                                </div>
                                <div class="privilege-item">
                                    <img src="~/assets/detail/open_icon_edit.png" alt="">
                                    <div>风靡全球的标书编辑工具</div>
                                </div>
                                <div class="privilege-item">
                                    <img src="~/assets/detail/open_icon_generate.png" alt="">
                                    <div>1小时快速生成标书</div>
                                </div>
                                <div class="privilege-item">
                                    <img src="~/assets/detail/open_icon_coordination.png" alt="">
                                    <div>多人协作，高效工作</div>
                                </div>
                            </div>
                            <div @click="openVipModel" class="vip-btn">开通VIP</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relate-suggest">
                <!-- <div class="relate-wrapper">
                     <div class="relate-title">
                         <div class="title">看过该文档的人还看了</div>
                     </div>
                     <div class="relate-doc-wrapper">
                         <nuxt-link :key="item" class="relate-doc" to="/login" v-for="item in 4">
                             <div class="doc-title">物业管理公司</div>
                             <div class="desc">相关文档约100篇</div>
                         </nuxt-link>
                     </div>
                 </div>-->
                <div class="relate-wrapper">
                    <div class="relate-title">
                        <div class="title">推荐素材</div>
                        <div @click="changeRelateData" class="opt-btn">换一换</div>
                    </div>
                    <div class="relate-info-wrapper">
                        <nuxt-link :key="item.id" class="relate-item" :to="'/sysFodder/detail/'+item.id"
                                   v-for="item in relateData">
                            <img :src="item.fileCoverUrl" alt="加载出错">
                            <div class="item-title-info">
                                <div class="item-title">{{item.name}}</div>
                                <div class="item-btm">
                                    <div class="preview-wrapper">
                                        <i class="el-icon-view"></i>
                                        <span>{{item.readingNumber}}</span>
                                    </div>
                                    <div>{{item.pages}}页</div>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
                <div class="relate-wrapper">
                    <div class="relate-title">
                        <div class="title">推荐标书</div>
                        <div @click="changeRelateTemplateData" class="opt-btn">换一换</div>
                    </div>
                    <div class="relate-info-wrapper">
                        <nuxt-link :key="item.id" class="relate-item" :to="'/sysTemplate/detail/'+item.id"
                                   v-for="item in relateTemplateContent">
                            <img :src="item.fileCoverUrl" alt="加载出错">
                            <div class="item-title-info">
                                <div class="item-title">{{item.name}}</div>
                                <div class="item-btm">
                                    <div class="preview-wrapper">
                                        <i class="el-icon-view"></i>
                                        <span>{{item.readingNumber}}</span>
                                    </div>
                                    <div>{{item.pages}}页</div>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
        <el-backtop target=".detail-container"></el-backtop>

        <!--设为自定义素材或模板-->
        <commonSetDialog router-type="sysFodder" :type.sync="currentType" :key-id="detailId"
                         :current-name.sync="detailContent.name" :setting-flag.sync="setFoldToFodderFlag"/>

        <!--<successShow :show-flag.sync="showFlag">
            <div style="text-align: center">创建成功，可前往<nuxt-link :to="editUrl" style="color: #156BFE;text-decoration: none">编辑</nuxt-link>或<nuxt-link to="/personalCenter/personalCenter/myBidDoc" style="color: #156BFE;text-decoration: none">工作区</nuxt-link>查看</div>
        </successShow>-->

    </div>
</template>

<script>
    import commonSetDialog from '@/components/commonSetDialog'
    // import successShow from '@/components/successShow'

    import qs from 'qs'

    export default {
        name: "_detail",
        head() {
            return {
                title: this.detailContent.name + '-云标书'
            }
        },
        components: {commonSetDialog},
        data() {
            return {
                showFlag: false,
                editUrl: null,

                isFix: false,
                currentReadPage: 1,

                relateData: [],
                relateCurrentPage: 1,
                relateTemplateContent: [],
                relateTemplateCurrentPage: 1,
                relatePageSize: 10,
                detailId: null,
                type: 1, //type类型 1系统素材 2系统模板 3用户自定义素材 4用户自定义模板
                detailContent: {},

                currentSelectFodderId: null,
                setFoldToFodderFlag: false,
                currentType: 1

            }
        },
        async asyncData(context) {
            // console.log('context', context)
            try {
                const prm = {
                    "id": context.route.params.detail,
                    "type": 1,
                    showStatusCode: true
                }
                let content = await context.$axios.post('/smartbiddoc-material/api/commonResource/apiQueryTemAndMatDetail', prm)
                let {result} = content.data
                let temp = []

                if (result.labelIdList && result.labelIdList.length > 0) {
                    temp = result.labelIdList.map(item => {
                        return item.id
                    })
                }
                let ind = []
                if (result.industryId && result.industryId.length > 0) {
                    ind = result.industryId.map(item => {
                        return item.id
                    })
                }

                const relateTemplatePrm = {
                    "industryIdList": [result.industryId],
                    "labelIdList": temp,
                    "pageNum": 1,
                    "pageSize": 10
                }
                let relateTemplateContent = await context.$axios.post('/smartbiddoc-material/api/template/apiQuerySimilarTemplatePage', relateTemplatePrm)


                const relatePrm = {
                    "industryIdList": ind,
                    "labelIdList": temp,
                    "pageNum": 1,
                    "pageSize": 10
                }
                let relateContent = await context.$axios.post('/smartbiddoc-material/api/material/apiQuerySimilarMaterialPage', relatePrm)
                return {
                    detailContent: result,
                    relatePageSize: 10,
                    relateCurrentPage: 1,
                    relateTemplateCurrentPage: 1,
                    type: 1,
                    relateData: relateContent.data.result.list,
                    relateTemplateContent: relateTemplateContent.data.result.list
                }
            } catch (error) {
                console.log('========================error=====', error, error.message, error.respond)
                context.error({
                    statusCode: 500
                })
            }

        },
        async mounted() {
            this.detailId = this.$route.params.detail
            this.$refs.detailContainer.addEventListener('scroll', (ev) => {
                let sTop = this.$refs.detailContainer.scrollTop
                this.isFix = sTop >= 258
                let pageIdx = 1
                let pageSum = 0
                this.detailContent.urlList.some((item, idx) => {
                    pageSum += this.$refs['pic' + idx][0].offsetHeight
                    pageIdx = idx + 1
                    return pageSum >= sTop - 339
                })
                this.currentReadPage = pageIdx
            })
        },
        methods: {
            async getDetail() {
                const prm = {
                    "id": this.detailId,
                    "type": this.type
                }
                let content = await this.$axios[this.$apiURL.templateApi.getDetailById.method](this.$apiURL.templateApi.getDetailById.url, prm)
                this.detailContent = content.data.result
            },
            async getRelateData() {
                let temp = []
                if (this.detailContent.labelIdList && this.detailContent.labelIdList.length > 0) {
                    temp = this.detailContent.labelIdList.map(item => {
                        return item.id
                    })
                }
                const prm = {
                    "industryIdList": [this.detailContent.industryId],
                    "labelIdList": temp,
                    "pageNum": this.relateCurrentPage,
                    "pageSize": this.relatePageSize
                }
                let content = await this.$axios[this.$apiURL.fodderApi.getRelateFodder.method](this.$apiURL.fodderApi.getRelateFodder.url, prm)
                this.relateData = content.data.result.list
            },
            async getRelateTemplateData() {
                let temp = []
                if (this.detailContent.labelIdList && this.detailContent.labelIdList.length > 0) {
                    temp = this.detailContent.labelIdList.map(item => {
                        return item.id
                    })
                }
                const prm = {
                    "industryIdList": [this.detailContent.industryId],
                    "labelIdList": temp,
                    "pageNum": this.relateTemplateCurrentPage,
                    "pageSize": this.relatePageSize
                }
                let content = await this.$axios[this.$apiURL.templateApi.getRelateTemplate.method](this.$apiURL.templateApi.getRelateTemplate.url, prm)
                this.relateTemplateContent = content.data.result.list
            },
            //分享
            shareHandle() {
                if (!this.$store.state.userInfo.userName) {
                    this.$store.commit('SET_LOGIN', true)
                    return
                }
                this.$clipContent(location.href)
                this.$message.success('网页地址复制成功，可以分享')
            },
            //换一换
            changeRelateData() {
                this.relateCurrentPage++
                this.getRelateData()
            },
            //换一换
            changeRelateTemplateData() {
                this.relateTemplateCurrentPage++
                this.getRelateTemplateData()
            },
            //收藏
            collectDoc() {
                if (!this.$store.state.userInfo.userName) {
                    this.$store.commit('SET_LOGIN', true)
                    return
                }
                const prm = qs.stringify({
                    collectionType: this.type,
                    relationId: this.detailContent.id,
                    titleName: this.detailContent.name,
                })
                const fn = this.$apiURL.user.collectHandle
                this.$axios[fn.method](fn.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.getDetail()
                })
            },
            //设为素材
            openSetDialog(type) {
                if (!this.$store.state.userInfo.userName) {
                    this.$store.commit('SET_LOGIN', true)
                    return
                }
                this.currentType = type
                this.setFoldToFodderFlag = true
            },
            //会员弹窗
            openVipModel() {
                if (!this.$store.state.userInfo.userName) {
                    this.$store.commit('SET_LOGIN', true)
                    return
                }
                this.$store.commit('SET_VIP_FLAG', true)
            },
            //依模板创建标书
            async createDocByTemplateId() {
                if (!this.$store.state.userInfo.userName) {
                    this.$store.commit('SET_LOGIN', true)
                    return
                }
                const prm = qs.stringify({
                    templateId: this.detailContent.id,
                    type: this.type
                })
                let content = await this.$axios[this.$apiURL.markDocApi.createDocByTemplateId.method](this.$apiURL.markDocApi.createDocByTemplateId.url, prm)
                this.$message.success(content.data.msg)
                this.editUrl = `/markDocManagement/markDocEdit?bidDocId=${content.data.result.bidDocId}&title=${content.data.result.bidDocTitle}`
                this.showFlag = true
            },
        }
    }
</script>

<style scoped lang="less">
    .detail-container {
        font-size: @fontMc;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #F4F4F4;

        .detail-content-container {
            margin: 0 auto;
            min-width: 1440px;
            width: 1440px;
            padding: 113px 0 110px 0;
            display: flex;
            justify-content: space-between;

            .detail-content {
                width: 1105px;

                .detail-base-info {
                    height: 206px;
                    background: #FFFFFF;
                    border-radius: 4px;
                    padding: 0 0 0 31px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .base-info {
                        .tag-wrapper {
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            max-width: 660px;
                            height: 70px;
                            overflow: hidden;
                            padding: 28px 0 6px 0;

                            .tag-item {

                                background: #F5F5F5;
                                border-radius: 13px;
                                padding: 4px 10px;
                                font-size: 13px;
                                color: #333333;
                                margin: 0 11px 11px 0;

                            }
                        }

                        .title-info {
                            font-size: 20px;
                            font-weight: 500;
                            color: #333333;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            margin-bottom: 16px;
                        }

                        .desc-info {
                            display: flex;
                            align-items: center;
                            font-size: 12px;
                            color: #333333;
                            margin-bottom: 16px;
                        }

                        .opt-wrapper {
                            display: flex;

                            .opt-item {
                                text-align: center;
                                cursor: pointer;
                                font-size: 12px;
                                font-weight: 500;
                                color: #6D6D6D;
                                margin-right: 20px;

                                &:hover {
                                    color: @activeColor;
                                }

                                img {
                                    width: 18px;
                                    height: 18px;
                                }
                            }
                        }
                    }

                    .right-opt-btn {
                        padding: 22px 0 0 26px;
                        width: 181px;
                        min-width: 181px;
                        height: 80px;
                        display: flex;
                        -align-items: center;
                        font-size: 15px;
                        color: #FFFFFF;
                        background: url("~/assets/detail/head_btn_template@2x.png");
                        background-size: 100% 100%;
                        cursor: pointer;
                        margin-right: 170px;

                        &:hover {
                            opacity: .8;
                        }

                        &.notVip {
                            background: url("~/assets/detail/head_btn_vip@2x.png");
                            background-size: 100% 100%;
                        }

                        img {
                            width: 22px;
                            height: 22px;
                            margin-right: 6px;
                        }
                    }
                }

                .detail-main-content {
                    margin-top: 20px;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    background: #FFFFFF;
                    border-radius: 4px;
                    padding: 0 0 93px 0;

                    .read-page {
                        width: 1440px;
                        padding: 0 375px 0 0;

                        &.fixClass {
                            position: fixed;
                            z-index: 1000;
                            top: 81px;
                            /*top: 0;
                            left: 50%;
                            transform: translateX(-728px);*/
                        }

                        .inner-page {
                            padding: 0 40px 0 32px;
                            width: 1105px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            height: 38px;
                            background: #F9FAFA;
                            border-radius: 4px 4px 0px 0px;

                            .file-title {
                                font-size: 16px;
                                font-weight: 400;
                                color: #999999;
                                display: flex;
                                align-items: center;

                                img {
                                    width: 20px;
                                    height: 20px;
                                    margin-right: 4px;
                                }
                            }

                            .page-show {
                                font-size: 13px;
                                font-weight: 400;
                                color: #999999;
                            }
                        }


                    }

                    .page-content {
                        width: 1040px;
                        background: #FFFFFF;
                        border: 1px solid #EDEFF3;
                        padding: 49px 120px;
                        margin: 0 20px 20px 32px;

                        .el-image {
                            width: 800px;
                            height: auto;
                            margin: 0 auto;
                        }
                    }

                    .vip-content {
                        width: 1040px;
                        -height: 292px;
                        background: #FFFFFF;
                        border: 1px solid #EDEFF3;
                        padding: 31px 0;
                        display: flex;
                        justify-content: center;

                        .not-vip-show {
                            width: 606px;
                            -height: 231px;
                            background: #0F192C;
                            border-radius: 10px;
                            padding: 38px 0 40px 0;

                            .vip-header {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 16px;
                                font-weight: 500;
                                color: #D0B886;
                                margin-bottom: 26px;

                                img {
                                    width: 20px;
                                    height: 20px;
                                    margin-right: 10px;
                                }
                            }

                            .vip-privilege {
                                display: flex;
                                justify-content: space-around;

                                .privilege-item {
                                    text-align: center;
                                    font-size: 12px;
                                    font-weight: 500;
                                    color: #D0B886;

                                    img {
                                        width: 25px;
                                        height: 25px;
                                        margin-bottom: 12px;
                                    }
                                }
                            }

                            .vip-btn {
                                width: 170px;
                                height: 37px;
                                text-align: center;
                                line-height: 37px;
                                background: url("~/assets/detail/open_btn_vip@2x.png");
                                background-size: 100% 100%;
                                font-size: 16px;
                                font-weight: bold;
                                color: #63471E;
                                cursor: pointer;
                                margin: 20px auto 0 auto;

                                &:hover {
                                    opacity: .8;
                                }
                            }

                        }
                    }
                }
            }

            .relate-suggest {
                width: 315px;

                .relate-wrapper {
                    background: #FFFFFF;
                    border-radius: 4px;
                    padding: 0 22px;
                    margin-bottom: 20px;

                    .relate-title {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 15px;
                        font-weight: bold;
                        color: #333333;
                        padding: 11px 0;
                        border-bottom: 1px solid #F4F4F4;

                        .opt-btn {
                            cursor: pointer;
                            font-size: 12px;
                            color: #333333;
                            font-weight: normal;
                        }
                    }

                    .relate-doc-wrapper {
                        padding: 0 0 25px 0;

                        .relate-doc {
                            text-decoration: none;
                            font-size: 14px;
                            font-weight: bold;
                            color: #156BFE;

                            .doc-title {
                                padding: 15px 0 8px 0;
                            }

                            .desc {
                                font-size: 13px;
                                font-weight: 400;
                                color: #9D9D9D;
                            }
                        }
                    }

                    .relate-info-wrapper {
                        padding: 17px 0 4px 0;

                        .relate-item {
                            display: flex;
                            text-decoration: none;
                            margin-bottom: 21px;

                            img {
                                width: 60px;
                                height: 82px;
                                border-radius: 6px;
                                margin-right: 12px;
                            }

                            .item-title-info {
                                .item-title {
                                    height: 64px;
                                    font-size: 14px;
                                    font-weight: bold;
                                    color: #333333;
                                }

                                .item-btm {
                                    display: flex;
                                    align-items: center;
                                    font-size: 13px;
                                    color: #9D9D9D;

                                    .preview-wrapper {
                                        margin-right: 28px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

</style>
