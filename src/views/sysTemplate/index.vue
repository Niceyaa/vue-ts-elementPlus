<template>
  <div class="sys-template-container">
    <common-nav-header></common-nav-header>
    <div class="search-wrapper">
      <div class="inner-search-wrapper">
        <div class="search-title">在10万+模板中快速搜索</div>
        <el-input
          class="search-input"
          v-model="searchKeyword"
          placeholder="请输入模板关键词"
        >
          <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
          <template #append>
            <div @click="getSysTemplate" class="search-btn">搜索模板</div>
          </template>
        </el-input>
        <div v-if="hotTags.length !== 0" class="hot-wrapper">
          <div class="hot-title">
            <img src="../../assets/newIndex/home_hot@2x.png" alt="" />
            <span>热门推荐：</span>
          </div>
          <div
            @click="changeLabel(item)"
            class="hot-search-item"
            v-for="item in hotTags"
            :key="item.id"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="industry-select-wrapper">
      <div class="level-industry">
        <div
          @click="changeFirstLevel(item)"
          :class="{
            'first-level-item': true,
            firstLevelActive: firstIndustryId === item.industryId,
          }"
          v-for="item in industryData"
          :key="item.industryId"
        >
          {{ item.industryName }}
        </div>
      </div>
      <div class="level-industry">
        <div
          @click="changeSecondLevel(secondItem)"
          :class="{
            'second-level-item': true,
            secondLevelActive: secondIndustryId === secondItem.industryId,
          }"
          v-for="secondItem in secondIndustryData"
          :key="secondItem.industryId"
        >
          {{ secondItem.industryName }}
        </div>
      </div>
      <div class="level-industry">
        <div
          @click="changeThirdLevel(thirdItem)"
          :class="{
            'third-level-item': true,
            thirdLevelActive: thirdIndustryId === thirdItem.industryId,
          }"
          v-for="thirdItem in thirdIndustryData"
          :key="thirdItem.industryId"
        >
          {{ thirdItem.industryName }}
        </div>
      </div>
    </div>
    <div v-if="totalTemplateData.length > 0">
      <div class="template-lib-show">
        <div class="template-content">
          <div
            :to="'/sysTemplate/detail/' + item.templateId"
            v-for="item in totalTemplateData"
            :key="item.templateId"
            class="template-item"
          >
            <div class="show-inner">
              <div class="inner-title">
                <img src="@/assets/newIndex/word.png" alt="" />
                <div class="title-text">{{ item.templateTitle }}</div>
              </div>
              <div class="inner-desc">word格式/A4打印/内容随意修改</div>

              <el-image
                class="file-cover"
                :src="item.fileCoverUrl"
                alt="封面加载失败"
              >
                <template #error class="image-slot">
                  <img src="@/assets/newIndex/defaultShowIcon.png" alt="" />
                </template>
              </el-image>
              <div class="opt-wrapper">
                <router-link
                  target="_blank"
                  :to="'/sysTemplate/detail/' + item.templateId"
                  class="preview-btn"
                  >预览
                </router-link>
                <div
                  @click="createDocByTemplateIdFn(item)"
                  class="create-by-id"
                >
                  依模板创建标书
                </div>
              </div>
            </div>
            <div class="template-title-wrapper">
              <img v-if="true" src="@/assets/newIndex/home_hot@2x.png" alt="" />
              <img v-else src="@/assets/newIndex/rotation_vip@2x.png" alt="" />
              <div class="template-title">{{ item.templateTitle }}</div>
            </div>
            <img
              class="template-rb-icon"
              src="@/assets/newIndex/template_bj.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div
        class="page-wrapper"
      >
        <el-pagination
          @current-change="pageChange"
          background
          layout="prev, pager, next"
          :page-size="sysTempPageSize"
          v-model:currentPage="currentPage"
          :total="total"
          :hide-on-single-page='true'
        >
        </el-pagination>
      </div>
    </div>
    <emptyDataPage v-else></emptyDataPage>
    <successShow v-model:show-flag="showFlag">
      <template style="text-align: center">
        创建成功，可前往
        <router-link :to="editUrl" style="color: #156bfe; text-decoration: none"
          >编辑</router-link
        >
        或
        <router-link
          to="/personalCenter/personalCenter/myBidDoc"
          style="color: #156bfe; text-decoration: none"
          >工作区
        </router-link>
        查看
      </template>
    </successShow>
    <el-backtop></el-backtop>
    <common-footer></common-footer>
  </div>
</template>
<script lang='ts' setup>
import { ref, watch,onMounted } from "vue";
// import emptyDataPage from "@/components/emptyDataPage.vue";
import qs from "qs";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { returnCompStateFn } from "@/hooks/commonHooks";
import { getTemplateList } from "@/api/templateApi";
import { industryItem } from "@/type/store.d";
import { ElMessage } from "element-plus";
import { createDocByTemplateId } from "@/api/markDocApi";

let showFlag = ref(false);
let editUrl = ref("");

/* interface reactiveDataInter {
  labelIdList: any[];
  industryData: industryItem[];
  totalTemplateData: any[];
  secondIndustryData: industryItem[];
  thirdIndustryData: industryItem[];
  [prop: string]: any;
}

let reactiveData: reactiveDataInter = reactive({
  labelIdList: [],
  industryData: [],
  totalTemplateData: [],
  secondIndustryData: [],
  thirdIndustryData: [],
}); */
let totalTemplateData = ref([]);
let secondIndustryData = ref([]);
let thirdIndustryData = ref([]);
const store = useStore();

let searchKeyword = ref("");
let labelIdList = ref([]);
let currentIndustryId = ref();
let firstIndustryId = ref();
let secondIndustryId = ref();
let thirdIndustryId = ref();
let sysTempPageSize = ref(20);
let currentPage = ref(1);
let total = ref(0);
let totalPage = ref(1);

const route = useRoute();

// <string>(route.query.keyword) 这种方式会报错(看文档的时候要仔细一点哇)
searchKeyword.value = route.query.keyword
  ?((route.query.keyword) as string)
  : "";
// reactiveData.labelIdList = route.query.label ?[route.query.label] : []

  let {industryData,hotTags} =  returnCompStateFn(["industryData", "hotTags"]);


watch(
  () => store.state.industryData,
  (value) => {
    if (value && value.length > 0) {
      currentIndustryId.value = value[0].industryId;
      getSysTemplate();
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
watch(currentIndustryId, () => {
  labelIdList.value = [];
  getSysTemplate();
});

// 获取模板列表
async function getSysTemplate() {
  const prm = {
    pageSize: sysTempPageSize.value,
    pageNum: currentPage.value,
    labelIdList: labelIdList.value,
    keyWord: searchKeyword.value,
    industryId: currentIndustryId.value === 0 ? null : currentIndustryId.value,
  };
  let temp = await getTemplateList(prm);
  totalTemplateData.value = temp.data.result.list;
  total.value = temp.data.result.total;
  totalPage.value = temp.data.result.pages;
}

// 改变标签
/* function  changeLabel(item:any) {
                reactiveData.labelIdList = [item.id]
                getSysTemplate()
                searchKeyword.value = item.name
            }
 */
// 改变一级行业
function changeFirstLevel(info: industryItem) {
  firstIndustryId.value = info.industryId;
  secondIndustryId.value = info.industryId;
  currentIndustryId.value = info.industryId;
  let temp: industryItem[] = [];

  if (info.subIndustry && info.subIndustry.length > 0) {
    if (info.subIndustry[0].industryName === "全部") {
      (secondIndustryData.value as industryItem[]) = info.subIndustry;
      return;
    }
    temp = info.subIndustry;
    temp.unshift({
      industryId: info.industryId,
      industryName: "全部",
      subIndustry: [],
    });
  }
  (secondIndustryData.value as industryItem[]) = temp;
}

// 二级行业改变事件
function changeSecondLevel(info: industryItem) {
  secondIndustryId.value = info.industryId;
  thirdIndustryId.value = info.industryId;
  currentIndustryId.value = info.industryId;
  let temp: industryItem[] = [];
  if (info.subIndustry && info.subIndustry.length > 0) {
    if (info.subIndustry[0].industryName === "全部") {
      (thirdIndustryData.value as industryItem[]) = info.subIndustry;
      return;
    }
    temp = info.subIndustry;
    temp.unshift({
      industryId: info.industryId,
      industryName: "全部",
      subIndustry: [],
    });
  }
  (thirdIndustryData.value as industryItem[]) = temp;
}
// 第三级行业改变事件
function changeThirdLevel(info: industryItem) {
  thirdIndustryId.value = info.industryId;
  currentIndustryId.value = info.industryId;
}
// 页码改变
function pageChange(val) {
  currentPage.value = val;
  getSysTemplate();
}

//依模板创建标书
async function createDocByTemplateIdFn(info) {
  if (!store.state.userInfo.userName) {
    store.commit("SET_LOGIN", true);
    return;
  }
  const prm = qs.stringify({
    templateId: info.templateId,
    type: 2, //2 系统模板  4 自定义模板
  });
  let content: any = await createDocByTemplateId(prm);
  ElMessage.success(content.data.msg);
  editUrl.value = `/markDocManagement/markDocEdit?bidDocId=${content.data.result.bidDocId}&title=${content.data.result.bidDocTitle}`;
  showFlag.value = true;
}

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
        background: #2c7dfa;
        border-radius: 0px 6px 6px 0px;
        font-size: 15px;
        font-weight: 400;
        color: #ffffff;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        .search-btn {
          line-height: 60px;
          width: 138px;
          height: 58px;
          cursor: pointer;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
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

        &:hover {
          color: red;
        }
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
        background: #f6f6f6;
        border-radius: 22px;
        line-height: 44px;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        color: #000000;
        margin: 0 40px 33px 0;
        cursor: pointer;

        &.firstLevelActive {
          background: #156bfe;
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
          background: #156bfe;
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
        color: #6c6c6c;
        cursor: pointer;

        &.thirdLevelActive {
          background: #156bfe;
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
        background: #f6f6f6;
        border-radius: 22px;
        text-align: center;
        line-height: 44px;
        font-size: 16px;
        font-weight: 400;
        color: #000000;
        cursor: pointer;
        margin-right: 40px;

        &:hover {
          background: #f4f8ff;
          color: #2c7dfa;
        }

        &:last-child {
          margin-right: 0;
        }

        &.classifyActive {
          background: #f4f8ff;
          color: #2c7dfa;
        }
      }
    }

    .template-content {
      display: flex;
      flex-wrap: wrap;

      /*.template-item {
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
        background: #ffffff;
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
            background: rgba(0, 0, 0, 0.3) !important;

            .opt-wrapper {
              -display: block;
              bottom: 71px;
            }
          }

          .template-title-wrapper {
            color: #156bfe;
          }
        }

        .show-inner {
          padding: 18px 15px 0 15px;
          width: 100%;
          height: 345px;
          background: linear-gradient(0deg, #c7c7c7 0%, #f1f1f1 100%),
            linear-gradient(#9ec0ff, #9ec0ff);
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
      background: #2c85ff;
      border-radius: 8px;
      display: block;
      text-align: center;
      line-height: 64px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      text-decoration: none;

      &:hover {
        opacity: 0.8;
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
