<template>
    <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>

<script>
    export default {
        data() {
            return {
                imageUrl: '',
                dialogImageUrl: '',
                dialogVisible: false
            };
        },
        props: {
            fileList: {
                type: Array
            }
        },
        methods: {
            changeFile(file, fileList) {
                console.log("changeFIle", file, fileList)
                if (fileList.length > 0) {
                    this.$emit('update:btnName', '重新上传')
                    this.$emit('update:fileList', [file])
                }
            },
        }
    }
</script>

<style lang="less">
    .btn-name{
        color: @activeColor;
    }
</style>

