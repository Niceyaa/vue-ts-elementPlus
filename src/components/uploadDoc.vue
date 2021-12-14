<template>
    <el-upload
            class="upload-demo"
            action="1"
            :on-remove="handleRemove"
            multiple
            :accept="acceptType"
            :auto-upload="false"
            :limit="limit"
            :show-file-list="true"
            :on-exceed="handleExceed"
            :on-change="changeFile"
            :file-list="fileList">
        <el-button size="small" type="primary">{{btnName}}</el-button>
        <div v-if="showTip" slot="tip" class="el-upload__tip">{{tipText}}</div>
    </el-upload>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props: {
            limit: {
                type: Number,
                default: 1
            },
            fileList: {
                type: Array
            },
            fileName: {
                type: String
            },
            showTip: {
                type: Boolean,
                default: true
            },
            btnName: {
                type: String,
                default: '点击上传'
            },
            acceptType: {
                type: String,
                default: '.doc,.docx,application/msword'
            },
            tipText:{
                type:String,
                default: '只能上传.doc和.docx文件'
            }
        },
        methods: {
            handleExceed(){
                this.$message.warning(`只能上传${this.props.limit}份文件`)
            },
            changeFile(file,fileList){
                console.log("changeFIle",file,fileList)
                this.$emit('update:fileList',fileList)
                if (this.$props.fileName && this.$props.fileName.length > 0) {
                    return
                }
                let name = file?file.name:''
                let idx = name.lastIndexOf('.')
                name = name.substring(0,idx)

                this.$emit('update:fileName',name)
            },
            handleRemove(file,fileList) {
                console.log(file,fileList);
                this.$emit('update:fileList',fileList)
            },
        }
    }
</script>
<style lang="less" scoped>
    /deep/.el-upload-list{
        padding-left: 55px;
    }
</style>
