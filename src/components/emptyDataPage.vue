<template>
  <div class="noDataPage">
    <div class="inner-empty">
      <img src="@/assets/newIndex/noData.png" alt="" />
      <div class="empty-desc">搜索为空</div>
      <div class="description">
        您可以尝试<span @click="refreshPage">刷新页面</span>或 重新<span
          >输入关键词</span
        >
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "emptyDataPage",
  setup() {
    function refreshPage() {
      location.reload();
    }
    return {
      refreshPage,
    };
  },
});
</script>
<style lang="less" scoped>
.noDataPage {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 20px;

  .inner-empty {
    text-align: center;

    img {
      width: 507px;
      height: 363px;
    }

    .empty-desc {
      text-align: center;
      margin-top: -45px;
      font-size: 24px;
      font-weight: 500;
      color: #333333;
    }
    .description {
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      color: #333333;
      margin: 25px 0 110px 0;
      span {
        color: #156bfe;
        &:first-child {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
