<template>
    <div class="sys-template-container">
        <common-nav-header></common-nav-header>
        <div class="search-wrapper">
            <div class="inner-search-wrapper">

                <div class="search-title">在10万+素材中快速搜索</div>
                <el-input class="search-input" v-model="searchKeyword" placeholder="请输入素材关键词">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    <template slot="append">
                        <div @click="getSysFodder" class="search-btn">搜索素材</div>
                    </template>
                </el-input>
                <div v-if="hotTags.length!==0" class="hot-wrapper">
                    <div class="hot-title">
                        <img src="../../assets/newIndex/home_hot@2x.png" alt="">
                        <span>热门推荐：</span>
                    </div>
                    <div @click="changeLabel(item)" class="hot-search-item" v-for="item in hotTags" :key="item.id">
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>
        <div class="industry-select-wrapper">
            <div class="level-industry">
                <div @click="changeFirstLevel(item)"
                     :class="{'first-level-item':true,'firstLevelActive':firstIndustryId===item.industryId}"
                     v-for="item in industryData" :key="item.industryId">
                    {{item.industryName}}
                </div>
            </div>
            <div class="select-wrapper-item" v-if="secondIndustryData.length>0">
                <div class="select-label">行业分类：</div>
                <div class="select-info-wrapper">
                    <div class="level-industry">
                        <div @click="changeSecondLevel(secondItem)"
                             :class="{'second-level-item':true,'secondLevelActive':secondIndustryId===secondItem.industryId}"
                             v-for="secondItem in secondIndustryData">
                            {{secondItem.industryName}}
                        </div>
                    </div>
                    <div class="level-industry">
                        <div @click="changeThirdLevel(thirdItem)"
                             :class="{'third-level-item':true,'thirdLevelActive':thirdIndustryId===thirdItem.industryId}"
                             v-for="thirdItem in thirdIndustryData">
                            {{thirdItem.industryName}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="select-wrapper-item" v-if="tagData.length>0">
                <div class="select-label">标签：</div>
                <div class="tag-wrapper">
                    <!--<div class="tag-item" v-for="item in tagData" :key="item.id">{{item.name}}</div>-->
                    <el-checkbox-group v-model="selectTags" @change="handleTagChange">
                        <el-checkbox :label="0" @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox v-for="item in tagData" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="select-wrapper-item">
                <div class="select-label">排序：</div>
                <div class="sort-wrapper">
                    <div @click="changeSort(item.id)" v-for="item in sorts" :key="item.id"
                         :class="{'sort-item':true,'sortActive':item.id===sortType}">{{item.name}}
                    </div>
                </div>
            </div>

        </div>
        <div v-if="fodderData.length!==0">
            <div class="template-lib-show">
                <div class="template-content">
                    <!--  <nuxt-link target="_blank" :to="'/sysFodder/detail/'+item.materialId" v-for="item in fodderData" :key="item.materialId"
                                 class="template-item">
                          <div class="thumbnail-wrapper">
                              <el-image :src="item.fileCoverUrl" alt="封面加载失败">
                                  <div slot="error" class="image-slot">
                                      <img src="~/assets/newIndex/defaultShowIcon.png" alt="">
                                  </div>
                              </el-image>
                          </div>
                          <div class="template-title-wrapper">
                              <img v-if="true" src="../../assets/newIndex/home_hot@2x.png" alt="">
                              <img v-else src="../../assets/newIndex/rotation_vip@2x.png" alt="">
                              <div class="template-title">{{item.materialName}}</div>
                          </div>
                          <img class="template-rb-icon" src="../../assets/newIndex/template_bj.png" alt="">
                      </nuxt-link>-->
                    <div :to="'/sysFodder/detail/'+item.materialId" v-for="item in fodderData" :key="item.materialId"
                         class="template-item">
                        <div class="show-inner">
                            <div class="inner-title">
                                <img src="~/assets/newIndex/word.png" alt="">
                                <div class="title-text">{{item.materialName}}</div>
                            </div>
                            <div class="inner-desc">word格式/A4打印/内容随意修改</div>

                            <el-image class="file-cover" :src="item.fileCoverUrl" alt="封面加载失败">
                                <div slot="error" class="image-slot">
                                    <img src="~/assets/newIndex/defaultShowIcon.png" alt="">
                                </div>
                            </el-image>
                            <div class="opt-wrapper">
                                <nuxt-link target="_blank" :to="'/sysFodder/detail/'+item.materialId"
                                           class="preview-btn">预览
                                </nuxt-link>
                                <div @click="createDocByTemplateId(item)" class="create-by-id">依模板创建标书</div>
                            </div>
                        </div>
                        <div class="template-title-wrapper">
                            <img v-if="true" src="~/assets/newIndex/home_hot@2x.png" alt="">
                            <img v-else src="~/assets/newIndex/rotation_vip@2x.png" alt="">
                            <div class="template-title">{{item.materialName}}</div>
                        </div>
                        <img class="template-rb-icon" src="~/assets/newIndex/template_bj.png" alt="">
                    </div>
                </div>
            </div>
            <div v-if="searchKeyword||currentIndustryId||selectTags.length>0" class="page-wrapper">
                <el-pagination
                        @current-change="pageChange"
                        background
                        layout="prev, pager, next"
                        :page-size="sysTempPageSize"
                        :current-page.sync="currentPage"
                        :total="total">
                </el-pagination>
            </div>
            <lcg-paging v-else :current-page.sync="currentPage" :page-size.sync="sysTempPageSize" :pages="totalPage"
                        path="/sysFodder"></lcg-paging>

        </div>

        <emptyDataPage v-else></emptyDataPage>
        <successShow :show-flag.sync="showFlag">
            <div style="text-align: center">创建成功，可前往
                <nuxt-link :to="editUrl" style="color: #156BFE;text-decoration: none">编辑</nuxt-link>
                或
                <nuxt-link to="/personalCenter/personalCenter/myBidDoc" style="color: #156BFE;text-decoration: none">
                    工作区
                </nuxt-link>
                查看
            </div>
        </successShow>
        <common-footer></common-footer>

        <el-backtop></el-backtop>
    </div>
</template>
<script>
    import lcgPaging from '@/components/lcgPaging'
    import emptyDataPage from '@/components/emptyDataPage'
    import successShow from '@/components/successShow'
    import {mapState} from 'vuex'

    export default {
        head(){
            return{
                title:'素材库-云标书'
            }
        },
        components: {lcgPaging, emptyDataPage, successShow},
        data() {
            return {
                showFlag: false,
                editUrl: null,

                sortType: null,
                sorts: [
                    {id: 1, name: '热门'},
                    {id: 2, name: '最新'}
                ],
                tagAllFlag: false,
                selectTags: [],
                searchKeyword: null,
                hotSearchData: [
                    {name: '施工方案1', id: 1},
                    {name: '施工方案2', id: 2},
                    {name: '施工方案3', id: 3},
                    {name: '施工方案4', id: 4},
                ],
                tagData: [],
                industryData: [],
                fodderData: [],
                currentIndustryId: null,
                firstIndustryId: null,
                secondIndustryId: null,
                thirdIndustryId: null,
                secondIndustryData: [],
                thirdIndustryData: [],
                sysTempPageSize: 20,
                currentPage: 1,
                totalPage: 1,
                total: 0
            }
        },
        computed: mapState({
            hotTags: state => state.hotTags
        }),
        async asyncData(context) {
            try {
                const currentPage = parseInt(context.route.params.index)
                console.log('pageNum',)
                let keyword = context.route.query.keyword ? this.$route.query.keyword : null
                const sysTempPageSize = 20
                /* const data = await context.$axios.post('/smartbiddoc-material/api/industry/apiQueryIndustryList')
                 let industryData = data.data.result*/
                let industryData = JSON.parse(JSON.stringify(context.store.state.industryData))
                industryData.unshift({
                    industryId: 0,
                    industryName: '全部分类',
                    subIndustry: []
                })
                let currentIndustryId = industryData[0].industryId
                const prm = {
                    pageSize: sysTempPageSize,
                    pageNum: currentPage,
                    industryId: currentIndustryId === 0 ? null : currentIndustryId
                }

                console.log('pageNum---------------------------',prm)
                let temp = await context.$axios.post('/smartbiddoc-material/api/material/apiQueryMaterialPage', prm)

                return {
                    industryData,
                    currentIndustryId,
                    fodderData: temp.data.result.list,
                    firstIndustryId: currentIndustryId,
                    total: temp.data.result.total,
                    totalPage: temp.data.result.pages,
                    currentPage,
                    sysTempPageSize,
                    searchKeyword: keyword
                }
            } catch (err) {
                 context.error({
                     statusCode: 500
                 })
            }

        },
        watch: {
            'currentIndustryId': function () {
                this.selectTags = []
                this.getSysFodder()
                this.getTagList()
            }
        },
        mounted() {
            // this.getHotTags()
        },
        methods: {
            changeLabel(item) {
                this.selectTags = [item.id]
                this.getSysFodder()
                this.searchKeyword = item.name
            },
            async getHotTags() {
                let content = await this.$axios[this.$apiURL.commonApi.getHotTagList.method](this.$apiURL.commonApi.getHotTagList.url)
                this.hotTags = content.data.result
            },
            initData() {
                this.getIndustryList()
            },
            async getTagList() {
                this.tagData = []
                let prm = {
                    industryId: this.currentIndustryId
                }
                let content = await this.$axios[this.$apiURL.commonApi.getTagList.method](this.$apiURL.commonApi.getTagList.url, prm)
                this.tagData = content.data.result
            },
            getIndustryList() {
                this.$axios[this.$apiURL.commonApi.getIndustryList.method](this.$apiURL.commonApi.getIndustryList.url).then(res => {
                    this.industryData = res.data.result
                    this.industryData.unshift({
                        industryId: 0,
                        industryName: '全部分类',
                        subIndustry: []
                    })
                    this.currentIndustryId = 0
                    this.firstIndustryId = 0
                    this.getSysTemplate()
                })
            },
            getSysFodder() {
                const prm = {
                    pageSize: this.sysTempPageSize,
                    pageNum: this.currentPage,
                    keyWord: this.searchKeyword,
                    labelIdList: this.selectTags,
                    sortType: this.sortType,
                    industryId: this.currentIndustryId === 0 ? null : this.currentIndustryId
                }
                this.$axios[this.$apiURL.fodderApi.getSysFodder.method](this.$apiURL.fodderApi.getSysFodder.url, prm).then(res => {
                    this.fodderData = res.data.result.list
                })
            },
            changeFirstLevel(info) {
                this.firstIndustryId = info.industryId
                this.secondIndustryId = info.industryId
                this.currentIndustryId = info.industryId
                let temp = []

                if (info.subIndustry && info.subIndustry.length > 0) {
                    if (info.subIndustry[0].industryName === '全部') {
                        this.secondIndustryData = info.subIndustry
                        return
                    }
                    temp = info.subIndustry
                    temp.unshift({
                        industryId: info.industryId,
                        industryName: "全部",
                        subIndustry: []
                    })
                }
                this.secondIndustryData = temp
            },
            changeSecondLevel(info) {
                this.secondIndustryId = info.industryId
                this.thirdIndustryId = info.industryId
                this.currentIndustryId = info.industryId
                let temp = []
                if (info.subIndustry && info.subIndustry.length > 0) {
                    if (info.subIndustry[0].industryName === '全部') {
                        this.thirdIndustryData = info.subIndustry
                        return
                    }
                    temp = info.subIndustry
                    temp.unshift({
                        industryId: info.industryId,
                        industryName: "全部",
                        subIndustry: []
                    })
                }
                this.thirdIndustryData = temp
            },
            changeThirdLevel(info) {
                this.thirdIndustryId = info.industryId
                this.currentIndustryId = info.industryId
            },
            //标签选择
            handleTagChange(val) {
                if (val.length === this.tagData.length) {
                    let arr = val.filter(item => {
                        return item === 0
                    })
                    if (arr.length > 0) {
                        this.selectTags = val.filter(item => {
                            return item > 0
                        })
                    } else {
                        this.selectTags = [0].concat(this.tagData.map(item => {
                            return item.id
                        }))
                    }
                }
                this.getSysFodder()
            },
            //全选
            handleCheckAllChange(val) {
                this.selectTags = val ? [0].concat(this.tagData.map(item => {
                    return item.id
                })) : []
            },
            pageChange(val) {
                this.currentPage = val
                this.getSysFodder()
            },
            changeSort(id) {
                this.sortType = id
                this.getSysFodder()
            },
            //依模板创建标书
            async createDocByTemplateId(info) {
                if (!this.$store.state.userInfo.userName) {
                    this.$store.commit('SET_LOGIN', true)
                    return
                }
                const prm = qs.stringify({
                    templateId: info.templateId,
                    type: 2 //2 系统模板  4 自定义模板
                })
                let content = await this.$axios[this.$apiURL.markDocApi.createDocByTemplateId.method](this.$apiURL.markDocApi.createDocByTemplateId.url, prm)
                this.$message.success(content.data.msg)
                this.editUrl = `/markDocManagement/markDocEdit?bidDocId=${content.data.result.bidDocId}&title=${content.data.result.bidDocTitle}`
                this.showFlag = true
            },
        }
    };
</script>

<style scoped lang="less">
    .sys-template-container {
        font-family: @fontMc;
        width: 100%;
        min-height: 100%;
        overflow: auto;
        padding: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        .search-wrapper {
            width: 100%;
            height: 400px;
            background: url("../../assets/newIndex/sysTemplateBgc.png");
            background-size: 100% 100%;

            .inner-search-wrapper {
                width: 1440px;
                min-width: 1440px;
                margin: 0 auto;
                text-align: center;
                color: #fff;
                padding: 110px 0 0 0;
            }

            .search-title {
                margin: 0 0 42px 0;
                font-size: 36px;
                font-weight: bold;
            }

            .search-input {
                width: 775px;
                -height: 60px;

                /deep/ .el-input__inner {
                    height: 60px;
                    line-height: 60px;
                }

                /deep/ .el-input-group__append {
                    width: 138px;
                    height: 60px;
                    background: #2C7DFA;
                    border-radius: 0px 6px 6px 0px;
                    font-size: 15px;
                    font-weight: 400;
                    color: #FFFFFF;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    padding: 0;

                    .search-btn {
                        width: 138px;
                        height: 58px;
                        line-height: 58px;
                        cursor: pointer;
                    }
                }
            }

            .hot-wrapper {
                display: flex;
                align-items: center;
                margin: 12px 0 0 346px;
                color: #fff;

                .hot-title {
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    margin-right: 4px;

                    img {
                        width: 20px;
                        height: 20px;
                    }
                }

                .hot-search-item {
                    text-decoration: none;
                    font-size: 16px;
                    margin-right: 15px;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }

        .industry-select-wrapper {
            width: 1440px;
            min-width: 1440px;
            margin: 0 auto;
            padding: 65px 0 0 0;
            margin-bottom: 16px;

            .level-industry {
                display: flex;
                flex-wrap: wrap;

                .first-level-item {
                    width: 140px;
                    height: 44px;
                    background: #F6F6F6;
                    border-radius: 22px;
                    line-height: 44px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 400;
                    color: #000000;
                    margin: 0 40px 33px 0;
                    cursor: pointer;

                    &.firstLevelActive {
                        background: #156BFE;
                        color: #fff !important;
                    }

                    &:hover {
                        color: @activeColor;
                    }
                }

                .second-level-item {
                    padding: 0 16px;
                    height: 30px;
                    border-radius: 15px;
                    line-height: 30px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 400;
                    margin: 0 24px 30px 0;
                    color: #333333;
                    cursor: pointer;

                    &.secondLevelActive {
                        background: #156BFE;
                        color: #fff !important;
                    }

                    &:first-child {
                        font-weight: 500;
                        color: #333333;
                    }

                    &:hover {
                        color: @activeColor;
                    }
                }

                .third-level-item {
                    padding: 0 16px;
                    height: 30px;
                    border-radius: 22px;
                    line-height: 30px;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 400;
                    margin: 0 24px 32px 0;
                    color: #6C6C6C;
                    cursor: pointer;

                    &.thirdLevelActive {
                        background: #156BFE;
                        color: #fff !important;
                    }

                    &:first-child {
                        font-weight: 500;
                        color: #333333;
                    }

                    &:hover {
                        color: @activeColor;
                    }
                }
            }

            .select-wrapper-item {
                display: flex;

                .select-label {
                    width: 92px;
                    min-width: 92px;
                    font-size: 16px;
                    font-weight: 500;
                    color: #333333;
                    line-height: 30px;
                }

                .tag-wrapper {
                    display: flex;
                    font-size: 16px;
                    font-weight: 400;
                    color: #333333;
                    flex-wrap: wrap;

                    .el-checkbox {
                        cursor: pointer;
                        line-height: 35px;
                        margin: 0 24px 0 0;
                    }

                    .tag-item {
                        height: 30px;
                        border-radius: 14px;
                        cursor: pointer;
                        line-height: 30px;
                        margin: 0 24px 31px 0;

                        &:first-child {
                            font-weight: 500;
                            color: #333333;
                        }

                        &.tagActive {
                            background: #156BFE;
                        }
                    }

                }

                .sort-wrapper {
                    display: flex;
                    font-size: 16px;
                    font-weight: 500;
                    color: #333333;

                    .sort-item {
                        cursor: pointer;
                        height: 30px;
                        line-height: 30px;
                        margin: 0 24px 31px 0;

                        &.sortActive {
                            color: @activeColor;
                        }
                    }
                }
            }
        }

        .template-lib-show {
            min-width: 1440px;
            width: 1440px;
            margin: 0 auto;

            .show-title {
                font-size: 36px;
                font-weight: bold;
                color: #222222;
                margin: 70px 0 50px 0;
                text-align: center;
            }

            .big-classify {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 55px;

                .big-classify-item {
                    width: 140px;
                    height: 44px;
                    background: #F6F6F6;
                    border-radius: 22px;
                    text-align: center;
                    line-height: 44px;
                    font-size: 16px;
                    font-weight: 400;
                    color: #000000;
                    cursor: pointer;
                    margin-right: 40px;

                    &:hover {
                        background: #F4F8FF;
                        color: #2C7DFA;
                    }

                    &:last-child {
                        margin-right: 0;
                    }

                    &.classifyActive {
                        background: #F4F8FF;
                        color: #2C7DFA;
                    }
                }
            }

            .template-content {
                display: flex;
                flex-wrap: wrap;

                /* .template-item {
                     text-decoration: none;
                     width: 273px;
                     height: 402px;
                     background: #FFFFFF;
                     position: relative;
                     padding: 10px 10px 0 10px;
                     -webkit-box-sizing: border-box;
                     -moz-box-sizing: border-box;
                     box-sizing: border-box;
                     margin: 0 18px 20px 0;
                     box-shadow: 0px 7px 10px 0px rgba(198, 203, 214, 0.35);

                     &:nth-child(5n) {
                         margin-right: 0;
                     }

                     &:hover {
                         .thumbnail-wrapper {
                             img {
                                 transform: scale(1.05);
                             }
                         }

                         .template-title-wrapper {
                             color: #156BFE;
                         }
                     }

                     .thumbnail-wrapper {
                         width: 253px;
                         height: 339px;
                         background: #F7F9FA;
                         border-radius: 4px 4px 4px 4px;
                         padding: 14px;

                         img {
                             width: 225px;
                             height: 311px;
                             border-radius: 4px;
                         }
                     }

                     .template-title-wrapper {
                         display: flex;
                         align-items: center;
                         padding-top: 14px;
                         font-size: 14px;
                         font-weight: 400;
                         color: #232323;

                         img {
                             width: 20px;
                             height: 20px;
                             margin-right: 4px;
                         }

                         .template-title {
                             text-overflow: ellipsis;
                             overflow: hidden;
                             white-space: nowrap;
                         }
                     }

                     .template-rb-icon {
                         width: 52px;
                         height: 23px;
                         position: absolute;
                         bottom: 0;
                         right: 0;
                     }
                 }*/

                .template-item {
                    text-decoration: none;
                    width: 273px;
                    height: 402px;
                    background: #FFFFFF;
                    position: relative;
                    padding: 10px 10px 0 10px;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    margin: 0 18px 20px 0;
                    box-shadow: 0px 7px 10px 0px rgba(198, 203, 214, 0.35);

                    &:nth-child(5n) {
                        margin-right: 0;
                    }

                    &:hover {
                        .show-inner {
                            background: rgba(0, 0, 0, .3) !important;

                            .opt-wrapper {
                                -display: block;
                                bottom: 71px;
                            }
                        }

                        .template-title-wrapper {
                            color: #156BFE;
                        }
                    }

                    .show-inner {
                        padding: 18px 15px 0 15px;
                        width: 100%;
                        height: 345px;
                        background: linear-gradient(0deg, #c7c7c7 0%, #f1f1f1 100%), linear-gradient(#9ec0ff, #9ec0ff);
                        overflow: hidden;
                        text-align: center;
                        position: relative;
                        transition: all 800ms linear;

                        .inner-title {
                            display: flex;
                            align-items: center;
                            margin-bottom: 6px;

                            img {
                                width: 34px;
                                min-width: 34px;
                                height: 35px;
                                margin: 0 6px;
                            }

                            .title-text {
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                                font-size: 22px;
                                -font-weight: bold;
                                color: #000000;
                            }
                        }

                        .inner-desc {
                            font-size: 12px;
                            font-weight: normal;
                            color: #000000;
                            margin-bottom: 35px;
                        }

                        .file-cover {
                            width: 147px;
                            height: 205px;
                            background-color: #ffffff;
                            box-shadow: -3px 4px 5px 0px rgba(170, 170, 170, 0.75);
                            border: solid 1px #d3d3d3;

                            img {
                                width: 147px;
                                height: 205px;
                            }
                        }

                        .opt-wrapper {
                            position: absolute;
                            bottom: -92px;
                            left: 21px;
                            z-index: 99;
                            -display: none;
                            clear: both;
                            -webkit-transition: all 300ms linear;
                            -moz-transition: all 300ms linear;
                            -ms-transition: all 300ms linear;
                            -o-transition: all 300ms linear;
                            transition: all 300ms linear;

                            .preview-btn {
                                float: left;
                                width: 81px;
                                height: 35px;
                                background-color: #156bfe;
                                font-size: 12px;
                                color: #ffffff;
                                line-height: 35px;
                                text-align: center;
                                border-radius: 17px;
                                text-decoration: none;
                                margin-right: 10px;
                            }

                            .create-by-id {
                                float: left;
                                width: 124px;
                                height: 35px;
                                background-color: #ff6600;
                                border-radius: 17px;
                                text-align: center;
                                line-height: 34px;
                                font-size: 12px;
                                color: #ffffff;
                                cursor: pointer;
                            }
                        }
                    }

                    .template-title-wrapper {
                        display: flex;
                        align-items: center;
                        padding-top: 14px;
                        font-size: 14px;
                        font-weight: 400;
                        color: #232323;
                        position: relative;
                        z-index: 999;

                        img {
                            width: 20px;
                            height: 20px;
                            margin-right: 4px;
                        }

                        .template-title {
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                    }

                    .template-rb-icon {
                        width: 52px;
                        height: 23px;
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    }
                }
            }

            .show-more-template {
                margin: 49px auto 111px auto;
                width: 220px;
                height: 64px;
                background: #2C85FF;
                border-radius: 8px;
                display: block;
                text-align: center;
                line-height: 64px;
                font-size: 16px;
                font-weight: 500;
                color: #FFFFFF;
                text-decoration: none;

                &:hover {
                    opacity: .8;
                }
            }

        }

        .page-wrapper {
            display: flex;
            justify-content: center;
            padding: 20px 0 50px 0;
        }
    }
</style>
