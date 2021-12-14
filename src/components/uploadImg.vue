<template>
    <div>
        <el-upload
                action="1"
                list-type="picture-card"
                :limit="limit"
                :on-exceed="exceed"
                :on-preview="handlePictureCardPreview"
                :show-file-list="true"
                :auto-upload="false"
                :file-list="fileList"
                :on-change="changeFile"
                :before-remove="handleBeforeRemove"
                :on-remove="handleRemove">
            <i class="el-icon-picture"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
                dialogImageUrl: '',
                dialogVisible: false
            };
        },
        props: {
            btnName: {
                type: String,
                default: '点击上传'
            },
            fileList: {
                type: Array
            },
            limit: {
                type: Number,
                default: 10
            }
        },
        methods: {
            changeFile(file, fileList) {
                console.log("changeFIle", file, fileList)
                if (fileList.length > 0) {
                    this.$emit('update:btnName', '重新上传')
                    this.$emit('update:fileList', fileList)
                    // this.$emit('update:fileList', [file])
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleBeforeRemove(file,fileList){
                console.log(file)
                if (file.raw) {
                    console.log("raw")
                    this.$emit('update:fileList',fileList)
                }else{
                    return new Promise((resolve,reject)=>{
                        this.$confirm('图片删除之后无法撤回, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            //删除页眉页脚图片
                            if (file.hfFormatId) {
                                let prm = qs.stringify({
                                    hfFormatId: file.hfFormatId,
                                })
                                deletePageHeaderAndFooterPic(prm).then(res=>{
                                    this.$message.success(res.data.msg)
                                    resolve(true)
                                })
                            }


                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消删除'
                            })
                            reject(false)
                        })
                    })

                }
            },
            exceed(){
                this.$message.warning(`只能上传${this.$props.limit}张图片`)
            },
        }
    }
</script>

<style lang="less">
    .btn-name{
        color: @activeColor;
    }
</style>

