<template>
    <div>
        <el-upload
                class="avatar-uploader"
                action="1"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="changeFile">
            <div class="btn-name">{{btnName}}</div>
        </el-upload>
    </div>

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
            btnName: {
                type: String,
                default: '点击上传'
            },
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

