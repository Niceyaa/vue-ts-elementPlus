<template>
    <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
        <el-button class="upload-btn" size="small" type="primary">点击上传</el-button>
    </el-upload>
</template>

<script>
    export default {
        name: 'commonNav',
        data(){
            return {

            }
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }
</script>
<style lang="less" scoped>
    .upload-btn{
        width: 110px;
        height: 42px;
        background: #FF652D;
        border-radius: 4px;
        font-size: 16px;
        font-family: @fontFa;
        font-weight: 400;
        color: #FFFFFF;
        border: none;
    }
</style>
