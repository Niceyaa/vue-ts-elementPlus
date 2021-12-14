<template>
    <div>
        <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :limit="limit"
                :file-list="fileList"
                :on-change="changeFile"
                :auto-upload="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>

</template>

<script>
    import { deletePicByFileId } from "@/api/commonApi";
    import { deletePageHeaderAndFooterPic } from "../api/markDocApi";
    import qs from 'qs'

    export default {
        data() {
            return {
                imageUrl: '',
                limit: 1
            };
        },
        props: {
            fileList: {
                type: Array
            },
        },
        mounted(){
            console.log('666666666666666666666666666666',this.$props.fileList)
          if(this.$props.fileList.length>0){
              this.imageUrl = this.$props.fileList[0].url
          }
        },
        methods: {
            changeFile(file, fileList) {
                this.imageUrl = URL.createObjectURL(file.raw)
                console.log("changeFIle", file, fileList)
                if (fileList.length > 0) {
                    this.$emit('update:fileList', fileList)
                }
            },
        }
    }
</script>

<style lang="less">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        background: #FAFDFF;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 151px;
        height: 151px;
        line-height: 151px;
        text-align: center;
    }
    .avatar {
        width: 151px;
        height: 151px;
        display: block;
    }
</style>

