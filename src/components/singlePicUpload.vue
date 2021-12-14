<template>
    <div class="pic-upload">
        <input accept="image/*" class="hidden-input" ref="picInput" type="file" @change="changeFile">
        <img v-if="fileUrl&&fileUrl.length>0" @click="trigFileClick" :src="fileUrl" alt="">
        <i v-else @click="trigFileClick" class="el-icon-plus plus-icon"></i>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                // imageUrl: '',
            };
        },
        props: {
            fileList: {},
            fileUrl: {}
        },
        computed:{
            imageUrl(){
                let file = this.$props.fileList
                console.log('file',file)
                if (file.url) {
                    return file.url
                }else if (file.type){
                    return URL.createObjectURL(file)
                } else{
                    return ''
                }
            }
        },
       /* watch: {
          "$props.fileList":{
              handler(val) {
                  console.log('hhhhhh',val)
                  if (val && val.url) {
                      this.imageUrl = val.url
                  }
              },
              deep: true
          }
        },*/
        methods: {
            trigFileClick(){
                this.$refs['picInput'].click()
            },
            changeFile() {
                let val = this.$refs.picInput.files
                console.log('file',val[0])
                // this.imageUrl = URL.createObjectURL(val[0])
                this.$emit('update:fileList', val[0])
                this.$emit('update:fileUrl', URL.createObjectURL(val[0]))
            },
        }
    }
</script>

<style lang="less">
    .pic-upload{
        .hidden-input{
            width: 1px;
            height: 1px;
            opacity: 0;
        }
        img{
            width: 151px;
            height: 151px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
        }
        .plus-icon {
            width: 151px;
            height: 151px;
            line-height: 151px;
            text-align: center;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            background: #FAFDFF;
            font-size: 28px;
            color: #8c939d;
            &:hover{
                border-color: #3977FF;
            }
        }
    }

</style>

