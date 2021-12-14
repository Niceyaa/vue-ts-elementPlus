<template>
  <div class="home-container">
    <div class="home-header">
      <!--<common-nav-header></common-nav-header>-->
    </div>
    <div class="intro-content" ref="introContent">
      <div class="inner-intro-wrapper">
        <div class="left-intro-wrapper">
          <div class="intro-title">快速生成标书神器</div>
          <div class="intro-desc">在线标书快速生成，1小时快速完成</div>
          <div @click="openMakeDialog" :class="{'begin-make-btn':true}">开始制作</div>
        </div>
        <img src="@/assets/newIndex/nav_display.png" alt="">
      </div>
    </div>
    <div class="banner-wrapper">
      <el-carousel :autoplay="auto" :interval="4000" class="suggest-banner" arrow="always"
                   indicator-position="none">
        <el-carousel-item v-for="(item,idx) in hotTemplateData" :key="idx">
          <div class="banner-inner">
            <!--<router-link target="_blank" :to="'/sysTemplate/detail/'+innerItem.templateId" class="show-item" v-for="(innerItem,innerIdx) in item" :key="innerItem.templateId" v-if="innerIdx<4">-->
            <div :to="'/sysTemplate/detail/'+innerItem.templateId" class="show-item"
                 v-for="(innerItem,innerIdx) in item" :key="innerItem.templateId" v-if="innerIdx<4">
              <div class="show-inner">
                <div class="inner-title">
                  <img src="@/assets/newIndex/word.png" alt="">
                  <div class="title-text">{{innerItem.templateTitle}}</div>
                </div>
                <div class="inner-desc">word格式/A4打印/内容随意修改</div>

                <el-image class="file-cover" :src="innerItem.fileCoverUrl" alt="封面加载失败">
                  <template #error>
                    <div class="image-slot">
                      <img src="@/assets/newIndex/defaultShowIcon.png" alt="">
                    </div>
                  </template>

                </el-image>
                <div class="opt-wrapper">
                  <nuxt-link target="_blank" :to="'/sysTemplate/detail/'+innerItem.templateId"
                             class="preview-btn">预览
                  </nuxt-link>
                  <div @click="createDocByTemplateId(innerItem)" class="create-by-id">依模板创建标书</div>
                </div>
              </div>
              <div class="item-title-wrapper">
                <img src="@/assets/newIndex/rotation_vip@2x.png" alt="">
                <span class="title">{{innerItem.templateTitle}}</span>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="search-wrapper">
      <div class="search-title">在10万+模板中快速搜索</div>
      <el-input class="search-input" v-model.trim="searchKeyword" placeholder="请输入模板关键词">
        <!--<i #prefix class="el-input__icon el-icon-search"></i>-->
        <template #append>
          <div @click="goToURL" class="search-btn">搜索模板</div>
        </template>
      </el-input>
      <div v-if="hotTags.length!==0" class="hot-wrapper">
        <div class="hot-title">
          <img src="@/assets/newIndex/home_hot@2x.png" alt="">
          <span>热门推荐：</span>
        </div>
        <nuxt-link class="hot-search-item" v-for="item in hotTags" :key="item.id"
                   :to="'/sysTemplate/1?label='+item.id">{{item.name}}
        </nuxt-link>
      </div>
    </div>
    <div class="template-lib-show">
      <div class="show-title">大家都在用</div>
      <div class="big-classify">
        <div @click="changeIndustryId(item.industryId)"
             :class="{'big-classify-item':true,'classifyActive':item.industryId===currentIndustryId}"
             v-for="item in industryData" :key="item.industryId">{{item.industryName}}
        </div>
      </div>
      <!--<div v-if="totalTemplateData.length>0">-->
      <div class="template-content" v-for="item in totalTemplateData" :key="item.industryId"
           v-if="item.industryId===currentIndustryId">
        <!--<div class="template-content">-->
        <!--<nuxt-link target="_blank" :to="'/sysTemplate/detail/'+innerItem.templateId" v-for="innerItem in item.industryData" :key="innerItem.templateId" class="template-item">-->
        <div :to="'/sysTemplate/detail/'+innerItem.templateId" v-for="innerItem in item.industryData"
             :key="innerItem.templateId" class="template-item">
          <div class="show-inner">
            <div class="inner-title">
              <img src="@/assets/newIndex/word.png" alt="">
              <div class="title-text">{{innerItem.templateTitle}}</div>
            </div>
            <div class="inner-desc">word格式/A4打印/内容随意修改</div>

            <el-image class="file-cover" :src="innerItem.fileCoverUrl" alt="封面加载失败">
              <template #error>
                <div class="image-slot">
                  <img src="@/assets/newIndex/defaultShowIcon.png" alt="">
                </div>
              </template>

            </el-image>
            <div class="opt-wrapper">
              <nuxt-link target="_blank" :to="'/sysTemplate/detail/'+innerItem.templateId"
                         class="preview-btn">预览
              </nuxt-link>
              <div @click="createDocByTemplateId(innerItem)" class="create-by-id">依模板创建标书</div>
            </div>
          </div>
          <div class="template-title-wrapper">
            <img v-if="true" src="@/assets/newIndex/home_hot@2x.png" alt="">
            <img v-else src="@/assets/newIndex/rotation_vip@2x.png" alt="">
            <div class="template-title">{{innerItem.templateTitle}}</div>
          </div>
          <img class="template-rb-icon" src="@/assets/newIndex/template_bj.png" alt="">
        </div>
      </div>
      <!--</div>

      <empty-data-page v-else></empty-data-page>-->
      <nuxt-link class="show-more-template" to="/sysTemplate/1">查看更多模板</nuxt-link>
    </div>
    <div class="special-function">
      <div class="spec-func-inner">
        <div class="spec-func-title">更多特色功能，助力高效工作</div>
        <div class="spec-func-item">
          <img v-if="functionId===1" src="@/assets/newIndex/richLib.png" alt="">
          <img v-if="functionId===2" src="@/assets/newIndex/templateIntro.png" alt="">
          <img v-if="functionId===3" src="@/assets/newIndex/enterpriseInfo.png" alt="">
          <img v-if="functionId===4" src="@/assets/newIndex/clubTogether.png" alt="">
          <img v-if="functionId===5" src="@/assets/newIndex/convenientOpt.png" alt="">
          <div class="func-item-content">
            <div @click="changeFunction(item.id)"
                 :class="{'func-item-info':true,'funcActive':functionId===item.id}"
                 v-for="item in functionData" :key="item.id">
              <div class="info-title">
                <img class="notActive" src="@/assets/newIndex/function_default@2x.png" alt="">
                <img class="isActive" src="@/assets/newIndex/function_select@2x.png" alt="">
                <div>{{item.title}}</div>
              </div>
              <div class="info-desc">{{item.content}}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="comment-content">
      <div class="comment-title">他们这样评价云标书</div>
      <el-carousel :autoplay="true" :interval="4000" class="comment-banner" indicator-position="none"
                   arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="banner-inner">
            <div class="comment-item" v-for="innerItem in commentData" :key="innerItem.id">
              <div class="comment-user-info">
                <img :src="innerItem.icon" alt="">
                <div>{{innerItem.name}}</div>
              </div>
              <div class="user-position">{{innerItem.position}}</div>
              <div class="comment-desc">
                {{innerItem.content}}
              </div>
              <img class="comment-rb-icon" src="@/assets/newIndex/comment_bg.png" alt="">
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="cooperation-partner">
      <div class="cooperation-title">拥抱合作，持续创新</div>
      <div class="cooperation-content">
        <div class="img-box" v-for="(item,idx) in partnerSrc" :key="idx">
          <img :src="item"
               alt="">
        </div>

      </div>
    </div>
    <!--<successShow :show-flag.sync="showFlag">
      <div style="text-align: center">创建成功，可前往
        <nuxt-link :to="editUrl" style="color: #156BFE;text-decoration: none">编辑</nuxt-link>
        或
        <nuxt-link to="/personalCenter/personalCenter/myBidDoc" style="color: #156BFE;text-decoration: none">
          工作区
        </nuxt-link>
        查看
      </div>
    </successShow>-->
    <!--<common-footer></common-footer>-->
    <!--<el-backtop></el-backtop>-->
  </div>
</template>
<script>
  import qs from 'qs'
  // import emptyDataPage from '@/components/emptyDataPage'
  // import successShow from '@/components/successShow'

  import c1 from '@/assets/other/c1.png'
  import c2 from '@/assets/other/c2.png'
  import c3 from '@/assets/other/c3.png'
  import c01 from '@/assets/other/01.png'
  import c02 from '@/assets/other/02.png'
  import c03 from '@/assets/other/03.png'
  import c04 from '@/assets/other/04.png'
  import c05 from '@/assets/other/05.png'
  import c06 from '@/assets/other/06.png'
  import c07 from '@/assets/other/07.png'
  import c08 from '@/assets/other/08.png'
  import c09 from '@/assets/other/09.png'
  import c10 from '@/assets/other/10.png'
  import c11 from '@/assets/other/11.png'
  import c12 from '@/assets/other/12.png'
  import c13 from '@/assets/other/13.png'
  import c14 from '@/assets/other/14.png'
  import c15 from '@/assets/other/15.png'
  import {mapState} from 'vuex'

  export default {
    head() {
      return {
        title: "云标书",
        meta: [
          {hid: 'keywords', name: 'keywords', 'content': '丰富的标书模板库，常见标书一键生成'},
          {hid: 'description', name: 'description', 'content': '丰富的标书模板库，常见标书一键生成'},
        ]
      }
    },
    // components: {emptyDataPage, successShow},

    data() {
      return {
        showFlag: false,
        editUrl: null,

        partnerSrc: [c01, c02, c03, c04, c05, c06, c07, c08, c09, c10, c11, c12, c13, c14, c15],
        // hotTags: [],
        hotTemplateData: [],
        searchKeyword: null,
        industryData: [],
        totalTemplateData: [],
        functionData: [
          {
            id: 1,
            title: '丰富的标书模板库，常见标书一键生成',
            content: '团队精心梳理全套模板、素材，丰富更专业，涵盖交通、能源 、建筑、水利 、环保 、信息、农林、绿化 、医疗等各大行业。'
          },
          {id: 2, title: '模板、素材轻松选', content: '直接拖拽所需模板可素材至所要编制的标书，即可完成模板、素材的添加与选用。'},
          {id: 3, title: '公司信息、个人信息、业绩管理', content: '一键上传，随时使用，省心更省时。'},
          {id: 4, title: '多人在线协同编辑，工作更高效', content: '可多人在线编辑，'},
          {id: 5, title: '操作便捷，编制更高效', content: '可灵活设置不同标书格式，调整标题、段落格式、自动排版、自动生成目录，在线打印。'},
        ],
        commentData: [
          {
            id: 3,
            name: '李明亮',
            icon: c3,
            position: '中国水建集团项目经理',
            content: '云标书积累了大量的工程投标资料，旨在帮助工程技术人员准确、快速地编制出高水平标书，并可帮助企业在日趋激烈的市场竞争中尽占先机。'
          },
          {
            id: 1,
            name: '刘兵',
            icon: c1,
            position: '中建集团项目经理',
            content: '云标书系统是一款非常受欢迎的标书制作软件，该软件界面美观大方，功能强劲实用，拥有实际工程案例模板，各类素材模板，操作起来简单便捷，可以在短时间内制作出一份精美标准的标书。'
          },
          {
            id: 2,
            name: '吴宗富',
            icon: c2,
            position: '中国电信集团项目经理',
            content: '云标书丰富的模板及统一管理上传公司素材,一次上传可以多次重复使用，节约了很多时间，出错的概率也减少了。多人协同制作功能非常实用。'
          },
          // {id: 4, name: '杨超', icon: c4, position:'中国电建集团项目经理', content: '云标书是一款功能非常强大的标书制作软件，可用于制作工程招投标文件、施工组织设计、施工方案等，该软件集各类标书素材模板、能够快速、准确而且美观地制作出标书。'},
        ],
        functionId: 1,
        currentIndustryId: null,
        sysTempPageSize: 20
      }
    },
    computed: mapState({
      hotTags: state => state.hotTags
    }),
    async asyncData(context) {
      try {
        // console.log('context', context.store.state)
        const sizeNum = 4
        /*const data = await context.$axios.post('/smartbiddoc-material/api/industry/apiQueryIndustryList')
        let industryData = data.data.result*/
        let industryData = JSON.parse(JSON.stringify(context.store.state.industryData))
        industryData.unshift({
          industryId: 0,
          industryName: '全部分类'
        })
        let currentIndustryId = industryData[0].industryId
        let totalTemplate = []


        for (let i = 0; i < industryData.length; i++) {
          const prm = {
            pageSize: 20,
            pageNum: 1,
            industryId: industryData[i].industryId === 0 ? null : industryData[i].industryId
          }
          let temp = await context.$axios.post('/smartbiddoc-material/api/template/apiQueryTemplatePage', prm)
          // let temp = await context.$axios.post('/smartbiddoc-material/api/template/apiQueryTemplatePage')
          let total = temp.data.result.total
          if (total > 0) {
            totalTemplate.push({
              industryId: industryData[i].industryId,
              industryData: temp.data.result.list
            })
          }
        }

        let hotContent = await context.$axios.get('/smartbiddoc-material/api/commonResource/apiQueryHomePageHotTemplate?size=' + sizeNum)

        return {
          industryData,
          currentIndustryId,
          totalTemplateData: totalTemplate,
          // hotTemplateData: hotContent.data.result.concat(hotContent.data.result)
          hotTemplateData: hotContent.data.result
        }
      } catch (err) {
        context.error({
          statusCode: 500
        })
      }

    },
    mounted() {
      console.log('坐标--------------', this.$refs.introContent.getBoundingClientRect());
      // this.getHotTags()
    },
    methods: {
      openMakeDialog() {
        if (!this.$store.state.userInfo.userName) {
          this.$store.commit('SET_LOGIN', true)
          return
        }
        this.$store.commit("SET_MAKE_DOC_FLAG", true)
      },
      async getHotTags() {
        let content = await this.$axios[this.$apiURL.commonApi.getHotTagList.method](this.$apiURL.commonApi.getHotTagList.url)
        this.hotTags = content.data.result
      },
      initHomePage() {
        this.getIndustryList()
      },
      goToURL() {
        let query = {}
        if (this.searchKeyword && this.searchKeyword.length) {
          query = {
            keyword: this.searchKeyword
          }
        }
        this.$router.push({
          path: '/sysTemplate/1',
          query
        })
      },
      getIndustryList() {
        this.$axios[this.$apiURL.commonApi.getIndustryList.method](this.$apiURL.commonApi.getIndustryList.url).then(res => {
          this.industryData = res.data.result
          this.industryData.unshift({
            industryId: 0,
            industryName: '全部分类'
          })
          this.currentIndustryId = 0
          this.getSysTemplate()
        })
      },
      getSysTemplate() {
        const prm = {
          pageSize: this.sysTempPageSize,
          pageNum: 1,
          industryId: this.currentIndustryId === 0 ? null : this.currentIndustryId
        }
        this.$axios[this.$apiURL.templateApi.getSysTemplate.method](this.$apiURL.templateApi.getSysTemplate.url, prm).then(res => {
          this.totalTemplateData = res.data.result.list
        })
      },
      changeFunction(id) {
        this.functionId = id
      },
      changeIndustryId(id) {
        this.currentIndustryId = id
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
  .home-container {
    font-family: @fontMc;
    width: 100%;
    min-height: 100%;
    overflow: auto;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    .intro-content {
      height: 861px;
      background: url("../assets/newIndex/home_bj.png");
      background-size: 100% 100%;

      .inner-intro-wrapper {
        min-width: 1440px;
        width: 1440px;
        display: flex;
        margin: 0 auto;

        .left-intro-wrapper {
          padding: 170px 0 0 0;

          .intro-title {
            font-size: 50px;
            font-weight: bold;
            color: #FFFFFF;
          }

          .intro-desc {
            font-size: 18px;
            font-weight: 500;
            color: #FFFFFF;
            padding: 20px 0 54px 0;
          }

          .begin-make-btn {
            width: 278px;
            height: 74px;
            background: #FFFFFF;
            border-radius: 10px;
            text-align: center;
            line-height: 74px;
            font-size: 18px;
            font-weight: 500;
            color: #000000;
            cursor: pointer;
          }
        }

        img {
          width: 1030px;
          height: auto;
        }
      }
    }

    .banner-wrapper {
      width: 100%;
      margin: -200px 0 0 0;
      display: flex;
      -justify-content: center;
      -height: 460px;

      .suggest-banner {
        min-width: 1440px;
        width: 1440px;
        height: 490px;
        margin: 0 auto;

        /deep/ .el-carousel__container {
          height: 100% !important;

          .el-carousel__arrow {
            top: calc(50% - 15px);
            color: @activeColor;

            &.el-carousel__arrow--left {
              left: 25px;
            }

            &.el-carousel__arrow--right {
              right: 25px;
            }
          }

          .el-carousel__item {
            height: 100% !important;

            .banner-inner {
              padding: 0 20px;
              display: flex;
              height: 100%;
              justify-content: space-between;

              .show-item {
                box-shadow: 0px 9px 23px 1px rgba(211, 213, 221, 0.46);
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                text-decoration: none;
                display: block;
                height: 460px;
                width: 322px;
                background: #FFFFFF;
                border-radius: 12px 12px 12px 12px;
                padding: 8px 8px 0 8px;
                -margin-right: 37px;
                -cursor: pointer;

                &:last-child {
                  margin-right: 0;
                }

                &:hover {
                  .show-inner {
                    background: rgba(0, 0, 0, .3) !important;

                    .opt-wrapper {
                      -display: block;
                      bottom: 92px;
                    }
                  }

                  .item-title-wrapper {
                    color: #156BFE;
                  }
                }

                .show-inner {
                  padding: 22px 31px 0 31px;
                  width: 308px;
                  height: 404px;
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
                      height: 35px;
                      min-width: 34px;
                      margin: 0 10px;
                    }

                    .title-text {
                      text-overflow: ellipsis;
                      overflow: hidden;
                      white-space: nowrap;
                      font-size: 24px;
                      -font-weight: bold;
                      color: #000000;
                    }
                  }

                  .inner-desc {
                    font-size: 12px;
                    font-weight: normal;
                    color: #000000;
                    margin-bottom: 40px;
                  }

                  .file-cover {
                    width: 165px;
                    height: 233px;
                    background-color: #ffffff;
                    box-shadow: -3px 4px 5px 0px rgba(170, 170, 170, 0.75);
                    border: solid 1px #d3d3d3;

                    img {
                      width: 165px;
                      height: 233px;
                    }
                  }

                  .opt-wrapper {
                    position: absolute;
                    bottom: -92px;
                    left: 30px;
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
                      width: 91px;
                      height: 39px;
                      background-color: #156bfe;
                      font-size: 14px;
                      color: #ffffff;
                      line-height: 39px;
                      text-align: center;
                      border-radius: 20px;
                      text-decoration: none;
                      margin-right: 17px;
                    }

                    .create-by-id {
                      float: left;
                      width: 139px;
                      height: 39px;
                      background-color: #ff6600;
                      border-radius: 20px;
                      text-align: center;
                      line-height: 39px;
                      font-size: 14px;
                      color: #ffffff;
                      cursor: pointer;
                    }
                  }
                }

                .item-title-wrapper {
                  display: flex;
                  align-items: center;
                  font-size: 18px;
                  font-family: @fontFa;
                  font-weight: 400;
                  color: #222222;
                  padding: 5px 10px 10px 10px;

                  img {
                    margin: 0 8px 0 0;
                    width: 34px;
                    height: 34px;
                  }

                  .title {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                  }
                }
              }
            }
          }
        }
      }

    }

    .search-wrapper {
      width: 1440px;
      min-width: 1440px;
      margin: 0 auto;
      text-align: center;

      .search-title {
        margin: 89px 0 46px 0;
        font-size: 36px;
        font-family: @fontMc;
        font-weight: bold;
        color: #222222;
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

          .search-btn {
            cursor: pointer;
          }
        }
      }

      .hot-wrapper {
        display: flex;
        align-items: center;
        margin: 12px 0 0 346px;

        .hot-title {
          display: flex;
          align-items: center;
          font-size: 16px;
          color: #4F4F4F;
          margin-right: 4px;

          img {
            width: 20px;
            height: 20px;
          }
        }

        .hot-search-item {
          text-decoration: none;
          font-size: 16px;
          -font-weight: bold;
          color: #A9A9A9;
          margin-right: 15px;
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
                width: 100%;
                height: 100%;
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

    .special-function {
      width: 1440px;
      min-width: 1440px;
      margin: 0 auto 120px auto;
      display: flex;
      justify-content: center;

      .spec-func-inner {
        .spec-func-title {
          font-size: 36px;
          font-weight: bold;
          color: #222222;
          margin-bottom: 55px;
          text-align: center;
        }

        .spec-func-item {
          display: flex;

          img {
            width: 540px;
            height: 390px;
            margin-right: 120px;
          }

          .func-item-content {
            width: 450px;

            .func-item-info {
              margin-top: 30px;
              cursor: pointer;

              &.funcActive {
                .info-title {
                  color: @activeColor;

                  img {
                    &.notActive {
                      display: none;
                    }

                    &.isActive {
                      display: block;
                    }
                  }
                }

                .info-desc {
                  display: block;
                }
              }

              .info-title {
                font-size: 24px;
                font-weight: bold;
                color: #333333;
                display: flex;
                align-items: center;

                img {
                  width: 14px;
                  height: 14px;
                  margin-right: 9px;

                  &.notActive {
                    display: block;
                  }

                  &.isActive {
                    display: none;
                  }
                }
              }

              .info-desc {
                display: none;
                font-size: 16px;
                color: #474747;
                padding-left: 24px;
                line-height: 30px;
              }
            }
          }

        }
      }

    }

    .comment-content {
      width: 100%;
      background: url("../assets/newIndex/evaluate_bj.png");
      background-size: 100% 100%;
      height: 500px;
      padding: 70px 0 0 0;

      .comment-title {
        text-align: center;
        font-size: 36px;
        font-weight: bold;
        color: #FFFFFF;
        margin: 0 0 34px 0;
      }

      .comment-banner {
        width: 1440px;
        min-width: 1440px;
        margin: 0 auto;

        /deep/ .el-carousel__container {
          -height: 100% !important;

          .el-carousel__item {
            height: 100% !important;

            .banner-inner {
              padding: 0 76px;
              display: flex;
              justify-content: space-between;

              .comment-item {
                width: 420px;
                height: 280px;
                background: #FFFFFF;
                box-shadow: 0px 6px 20px 1px rgba(220, 222, 224, 0.35);
                border-radius: 10px 10px 10px 10px;
                position: relative;
                padding: 22px 38px 0 41px;

                .comment-user-info {
                  display: flex;
                  align-items: center;
                  font-size: 18px;
                  color: #9F9F9F;
                  font-weight: normal;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;

                  img {
                    width: 57px;
                    height: 58px;
                    margin-right: 15px;
                  }
                }

                .user-position {
                  font-size: 18px;
                  font-weight: bold;
                  color: #000000;
                  padding: 14px 0;
                }

                .comment-desc {
                  font-size: 16px;
                  color: #555555;
                  line-height: 28px;
                }

                .comment-rb-icon {
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  width: 91px;
                  height: 40px;
                }
              }
            }
          }
        }

      }
    }

    .cooperation-partner {
      width: 1440px;
      min-width: 1440px;
      margin: 0 auto 23px auto;

      .cooperation-title {
        font-size: 36px;
        font-weight: bold;
        text-align: center;
        color: #222222;
        margin: 80px 0 60px 0;
      }

      .cooperation-content {
        display: flex;
        flex-wrap: wrap;

        .img-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 250px;
          height: 100px;
          border: 1px solid #EDEFF3;
          margin: 0 37px 40px 0;
        }

        img {
          max-width: 100%;
          height: auto;

          &:nth-child(5n) {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
