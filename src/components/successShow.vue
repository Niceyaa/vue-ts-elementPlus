<template>
  <div>
    <el-dialog custom-class="success-show" width="380px" v-model="newShowFlag">
      <div class="show-main">
        <img class="success-img" src="@/assets/template/success.png" alt="" />
        <slot></slot>
        <div class="sure-btn" @click="closeHandle(false)">确定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import { computed } from "vue";
const props = defineProps({
  showFlag: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits({});
let newShowFlag = computed({
  get: () => {
    return props.showFlag;
  },
  set: (flag) => {
    closeHandle(flag);
  },
});
function closeHandle(flag: boolean = false): void {
  emit("update:showFlag", flag);
}
</script>
<style lang="less">
.success-show {
  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__body {
    border-radius: 8px;
    padding: 0 0 40px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    .show-main {
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: #333333;

      .success-img {
        margin: 50px 0 35px 0;
        width: 48px;
        height: 48px;
      }

      .sure-btn {
        width: 128px;
        height: 40px;
        -background: #f5f8fc;
        border-radius: 4px;
        cursor: pointer;
        margin: 30px auto 0 auto;
        text-align: center;
        line-height: 40px;
        -color: #156bfe;
        background: #156bfe;
        color: #fff;
      }
    }
  }
}
</style>
