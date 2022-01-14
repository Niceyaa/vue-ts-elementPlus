import {
    ref,
    computed,
} from "vue";
import store from '@/store'
import { LocationQueryValueRaw, useRouter } from 'vue-router'
import { importMarkDocAndCreate, createDocByLocalDoc } from '@/api/markDocApi'
import { ElMessage } from "element-plus/lib/components";

export default function(params?:any){
    const router = useRouter()

    let newCreateModel = ref(false);
    let newSettingFlag = computed({
      get: () => {
          return store.state.makeDocFlag
      },
      set: (value) => {
          store.commit("SET_MAKE_DOC_FLAG",value)
      },
    });
 // 弹窗关闭事件
 function closeHandle() {
    store.commit("SET_MAKE_DOC_FLAG", false);
  }

  function goToURL() {
    store.commit("SET_MAKE_DOC_FLAG", false);
    router.push({
      path: "/sysTemplate/1",
    });
  }

  function openEmptyDialog() {
    newCreateModel.value = true;
    store.commit("SET_MAKE_DOC_FLAG", false);
  }

  //本地上传标书
  function changeFile(file) {
    store.commit("SET_MAKE_DOC_FLAG", false);
    const prm = new FormData();
    prm.append("file", file.raw);
    importMarkDocAndCreate(prm).then((res) => {
      ElMessage.success(res.data.msg);
      router.push({
        path: "/markDocManagement/markDocEdit",
        query: {
          bidDocId: res.data.result.bidDocId,
          title: res.data.result.bidDocTitle,
          formWord: 'true',
        },
      });
    });
  }

  //根据招标文件创建标书
  function changeLocalDocFile(file) {
    store.commit("SET_MAKE_DOC_FLAG", false);
    const prm = new FormData();
    prm.append("file", file.raw);
    createDocByLocalDoc(prm).then((res) => {
      ElMessage.success(res.data.msg);
      router.push({
        path: "/markDocManagement/markDocEdit",
        query: {
          bidDocId: res.data.result.bidDocId,
          title: res.data.result.bidDocTitle,
          formWord: 'true',
        },
      });
    });
  }

  return {
    newCreateModel,
    newSettingFlag,

    // 方法
    closeHandle,
    openEmptyDialog,
    goToURL,
    changeFile,
    changeLocalDocFile
  };
}