<template>
  <!--创建空白标书对话框-->
  <el-dialog
    :close-on-click-modal="false"
    width="640px"
    :title="optTitle"
    v-model="newMarkDocFlag"
  >
    <el-form
      :model="markDocForm"
      ref="markDocFormRef"
      :rules="markDocFormRules"
    >
      <el-form-item
        label="项目名称"
        :label-width="formLabelWidth"
        prop="projectName"
      >
        <el-input
          v-model="markDocForm.projectName"
          autocomplete="off"
          placeholder="请填写项目名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="标书标题"
        :label-width="formLabelWidth"
        prop="bidDocTitle"
      >
        <el-input
          v-model="markDocForm.bidDocTitle"
          autocomplete="off"
          placeholder="请填写标书标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目编号" :label-width="formLabelWidth">
        <el-input
          v-model="markDocForm.projectCode"
          autocomplete="off"
          placeholder="请填写项目编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="投标人" :label-width="formLabelWidth">
        <el-input
          v-model="markDocForm.bidder"
          autocomplete="off"
          placeholder="请填写投标人"
        ></el-input>
      </el-form-item>
      <el-form-item label="代理机构" :label-width="formLabelWidth">
        <el-input
          v-model="markDocForm.agency"
          autocomplete="off"
          placeholder="请填写代理机构"
        ></el-input>
      </el-form-item>
      <el-form-item label="业主单位" :label-width="formLabelWidth">
        <el-input
          v-model="markDocForm.proprietorUnit"
          autocomplete="off"
          placeholder="请填写业主单位"
        ></el-input>
      </el-form-item>
      <el-form-item label="行业类型" :label-width="formLabelWidth">
        <el-select
          style="margin-left: 0 !important"
          v-model="markDocForm.industryId"
          placeholder="请选择行业类型"
        >
          <el-option
            v-for="item in industryList"
            :key="item.industryId"
            :label="item.industryName"
            :value="item.industryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投标日期" :label-width="formLabelWidth">
        <el-date-picker
          style="margin-left: 0 !important"
          v-model="markDocForm.tenderDate"
          type="date"
          placeholder="选择投标日期"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <template
      style="display: flex; justify-content: center"
      #footer
      class="dialog-footer"
    >
      <el-button @click="newMarkDocFlag = false">取 消</el-button>
      <el-button
        :loading="saveLoading"
        type="primary"
        @click="markDocAddHandle('markDocForm')"
        >保 存</el-button
      >
    </template>
  </el-dialog>
</template>

<script lang='ts'>
import qs from "qs";
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed,
  watch,
  nextTick,
} from "vue";
import store from "@/store";
import { markDocDetail,markDocAdd,markDocUpdate } from "@/api/markDocApi";
import { ElMessage } from "element-plus/lib/components";
import {useRouter} from 'vue-router'
import {lcgFormatDate} from '@/utils/commonFn'

export default defineComponent({
  name: "newMarkDocDialog",
  setup(props, context) {
    console.log("新建标书进入了-------------", props, context);
    let markDocFormRef = ref();
    const router = useRouter()
    let reactiveData = reactive({
      //标书创建form
      markDocForm: {
        agency: null,
        bidDocId: null,
        bidDocTitle: null,
        bidder: null,
        companyId: null,
        deptId: null,
        industryId: null,
        projectCode: null,
        projectName: null,
        proprietorUnit: null,
        tenderDate: '',
      },
    });
    //标书创建rule
    let markDocFormRules = {
      projectName: [
        { required: true, message: "请填写项目名称", trigger: "blur" },
      ],
      projectCode: [
        { required: true, message: "请填写项目编号", trigger: "blur" },
      ],
      bidDocTitle: [
        { required: true, message: "请填写标书标题", trigger: "blur" },
      ],
      bidder: [{ required: true, message: "请填写投标人", trigger: "blur" }],
      proprietorUnit: [
        { required: true, message: "请填写业主单位", trigger: "blur" },
      ],
      tenderDate: [
        { required: true, message: "请填写投标日期", trigger: "blur" },
      ],
      agency: [{ required: true, message: "请填写代理机构", trigger: "blur" }],
      industryId: [
        { required: true, message: "请选择行业类型", trigger: "blur" },
      ],
    };
    let formLabelWidth = "120px";
    let optTitle = ref("新建标书");
    let saveLoading = ref(false);

    let newMarkDocFlag = computed({
      get: () => {
          console.log('modalFlag改变了吗',props.modalFlag)
        return props.modalFlag;
      },
      set: (val) => {
        context.emit("update:modalFlag", val);
      },
    });
    let industryList = computed(() => store.state.industryData);

    // 监听标书以 add 还是 edit 的模式打开，进行不同的处理
    watch(
      () => props.modalFlag,
      (val) => {
        if (val) {
          optTitle.value =
            props.optType === "add" ? "新建标书" : "修改基本信息";
          if (props.optType === "add") {
            nextTick(() => {
              reactiveData.markDocForm.agency = null;
              reactiveData.markDocForm.bidDocId = null;
              reactiveData.markDocForm.bidDocTitle = null;
              reactiveData.markDocForm.bidder = null;
              reactiveData.markDocForm.companyId = null;
              reactiveData.markDocForm.deptId = null;
              reactiveData.markDocForm.industryId = null;
              reactiveData.markDocForm.projectCode = null;
              reactiveData.markDocForm.projectName = null;
              reactiveData.markDocForm.proprietorUnit = null;
              reactiveData.markDocForm.tenderDate = '';
              markDocFormRef.value.resetFields();
            });
          } else {
            console.log("id", props.bidDocId);
            const prm = qs.stringify({
              bidDocId: props.bidDocId,
            });
            markDocDetail(prm).then((res) => {
              reactiveData.markDocForm = res.data.result;
              reactiveData.markDocForm.industryId =
                res.data.result.industryId === 0
                  ? null
                  : res.data.result.industryId;
            });
          }
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
   
    //新建标书
    function markDocAddHandle() {
      markDocFormRef.value.validate((valid) => {
        if (valid) {
          const prm = {
            agency: reactiveData.markDocForm.agency,
            bidDocTitle: reactiveData.markDocForm.bidDocTitle,
            bidder: reactiveData.markDocForm.bidder,
            companyId: reactiveData.markDocForm.companyId,
            deptId: reactiveData.markDocForm.deptId,
            bidDocId: reactiveData.markDocForm.bidDocId,
            industryId: reactiveData.markDocForm.industryId,
            projectCode: reactiveData.markDocForm.projectCode,
            projectName: reactiveData.markDocForm.projectName,
            proprietorUnit: reactiveData.markDocForm.proprietorUnit,
            tenderDate: lcgFormatDate(reactiveData.markDocForm.tenderDate, true),
          };
          saveLoading.value = true;
          const fn = props.optType === "add"
              ? markDocAdd
              : markDocUpdate;
         fn(prm)
            .then((res) => {
              if (res.data.code === 200) {
                ElMessage.success(res.data.msg);
                saveLoading.value = false;
               context.emit("update:modalFlag", false);
                if (props.optType === "edit") {
                  context.emit("reTriggerList");
                } else {
                 router.push({
                    path: "/markDocManagement/markDocEdit",
                    query: {
                      bidDocId: res.data.result.bidDocId,
                      title: res.data.result.bidDocTitle,
                    },
                  });
                }
              }
            })
            .catch((err) => {
              saveLoading.value = false;
            });
        }
      });
    }
   return {
      ...toRefs(reactiveData),
      markDocFormRules,
      formLabelWidth,
      optTitle,
      saveLoading,
      newMarkDocFlag,
      industryList,
      markDocFormRef,

      markDocAddHandle,
    };
  },
  props: {
    modalFlag: {
      type: Boolean,
      default: false,
    },
    optType: {
      type: String,
      default: "add",
    },
    bidDocId: {
      type: String,
    },
    docIsUpdate: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
   
  },
});
</script>
<style lang="less" scoped>
</style>
