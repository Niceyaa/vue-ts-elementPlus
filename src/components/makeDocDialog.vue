<template>
  <div>
    <el-dialog
      @close="closeHandle"
      custom-class="setFodderDialog1"
      width="1022px"
      v-model="newSettingFlag"
    >
      <div class="title">快速生成标书神器</div>
      <div class="title-desc">
        老板、商务、项目经理、投标人士都在用的标书生成神器
      </div>
      <div class="make-wrapper">
        <div class="make-item">
          <img src="@/assets/template/01.png" alt="" />
          <div class="item-title">依模板创建标书</div>
          <div class="item-desc">10万+模版、素材，1小时快速生成标书</div>
          <div @click="goToURL" class="create-btn">立即创建</div>
        </div>
        <div class="make-item">
          <img src="@/assets/template/02.png" alt="" />
          <div class="item-title">依招标文件创建标书</div>
          <div class="item-desc">
            根据招标文件自动生成标书目录，直接拖拽所需模板和素材
          </div>
          <el-upload
            action="1"
            accept=".doc,.docx,application/msword"
            :auto-upload="false"
            :limit="1"
            :show-file-list="false"
            :on-change="changeLocalDocFile"
          >
            <div class="create-btn">立即创建</div>
          </el-upload>
        </div>
        <div class="make-item">
          <img src="@/assets/template/03.png" alt="" />
          <div class="item-title">本地上传标书创建</div>
          <div class="item-desc">
            上传本地标书，快速修改成新标书全套模板、素材，丰富更专业
          </div>
          <el-upload
            action="1"
            accept=".doc,.docx,application/msword"
            :auto-upload="false"
            :limit="1"
            :show-file-list="false"
            :on-change="changeFile"
          >
            <div class="create-btn">立即创建</div>
          </el-upload>
        </div>
        <div class="make-item">
          <img src="@/assets/template/04.png" alt="" />
          <div class="item-title">新建空白标书</div>
          <div class="item-desc">创建空白标书</div>
          <div @click="openEmptyDialog" class="create-btn">立即创建</div>
        </div>
      </div>
    </el-dialog>
    <new-mark-doc-dialog
      v-model:modalFlag="newCreateModel"
      optType="add"
    ></new-mark-doc-dialog>
  </div>
</template>

<script lang='ts'>
import newMarkDocDialog from "@/components/newMarkDocDialog.vue";
import { defineComponent } from "vue";
import makeDocDialogHook from "@/hooks/components/makeDocDialog";
export default defineComponent({
  name: "makeDocDialog",
  components: {
    "new-mark-doc-dialog": newMarkDocDialog,
  },
  setup() {
    const hooksData = makeDocDialogHook();
    return {
      ...hooksData,
    };
  },
});
</script>
<style lang="less">
.setFodderDialog1 {
  .el-dialog__header {
    background: #fafdff;
    padding: 0;
  }

  .el-dialog__body {
    border-radius: 8px;
    padding: 0 40px 67px 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .title {
      font-size: 24px;
      font-weight: 500;
      color: #222222;
      text-align: center;
      padding: 30px 0 10px 0;
    }
    .title-desc {
      font-size: 12px;
      color: #2e2e2e;
      text-align: center;
      padding: 0 0 40px 0;
    }
    .make-wrapper {
      display: flex;
      justify-content: space-between;
      .make-item {
        width: 220px;
        height: 236px;
        background-color: #ffffff;
        box-shadow: 3px 4px 5px 0px rgba(237, 237, 237, 0.75);
        border-radius: 11px;
        border: solid 2px #ededed;
        text-align: center;
        padding: 11px 22px 0 22px;
        cursor: pointer;
        position: relative;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        &:hover {
          background-color: #e9e9ff;
          box-shadow: 3px 4px 5px 0px rgba(208, 208, 255, 0.75);
          border-radius: 11px;
          border: solid 2px #5b5bff;
        }

        .item-title {
          font-size: 16px;
          font-weight: bold;
          color: #000000;
          margin: 12px 0 15px 0;
        }
        .item-desc {
          font-size: 12px;
          color: #2e2e2e;
          text-align: center;
          line-height: 20px;
        }
        .el-upload {
          text-align: center;
        }
        .create-btn {
          position: absolute;
          width: 138px;
          height: 30px;
          background-color: #2b7ff2;
          bottom: 15px;
          left: 37px;
          text-align: center;
          line-height: 30px;
          font-size: 12px;
          color: #ffffff;
          border-radius: 15px;
        }
      }
      /*  .make-item{
                    width: 188px;
                    height: 135px;
                    background: #FFFFFF;
                    box-shadow: -1px 5px 12px 1px rgba(161, 183, 206, 0.35);
                    border-radius: 8px;
                    text-align: center;
                    padding: 11px 0 0 0;
                    cursor: pointer;
                    .item-title{
                        font-size: 15px;
                        color: #202020;
                        margin: -10px 0 5px 0;
                    }
                    .item-desc{
                        font-size: 12px;
                        font-weight: 400;
                        color: #9D9D9D;
                    }
                    .el-upload {
                        text-align: center;
                    }
                }*/
    }
  }
}
</style>
