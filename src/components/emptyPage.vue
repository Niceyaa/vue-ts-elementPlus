<template>
    <div :style="{marginTop:marginTop}" class="empty-page">
        <div class="inner-empty">
            <img :style="{width:imgW,height:imgH}" :src="imgUrl" alt="">
            <div v-if="description.length>0" class="empty-desc">{{description}}</div>
            <el-button size="large" v-if="showBtn" @click="goToUrl" type="primary" round>去查看</el-button>
        </div>

    </div>
</template>

<script>
    import defaultUrl from '~/assets/personal2/personal_empty@2x.png'
    export default {
        name: 'empty-page',
        data() {
            return {}
        },
        props: {
            description: {
                type: String,
                default: ''
            },
            imgUrl: {
                type: String,
                default: defaultUrl
            },
            imgW: {
                type: String,
                default: '249px'
            },
            imgH: {
                type: String,
                default: '124px'
            },
            showBtn: {
                type: Boolean,
                default: false
            },
            toUrl: {
                type: String,
            },
            marginTop: {
                type: String,
                default: '31px'
            }
        },
        methods: {
            goToUrl() {
                this.$router.push({
                    path: this.$props.toUrl
                })
            },

        }
    }
</script>
<style lang="less" scoped>
    .empty-page {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;

        .inner-empty {
            width: 250px;
            text-align: center;

            img {
                margin-bottom: 18px;
            }

            .empty-desc {
                width: 100%;
                text-align: center;
                margin-bottom: 18px;
                font-size: 12px;
                font-family: inherit;
                color: #596177;
            }
            .el-button{
                width: 122px;
                height: 36px;
            }
        }
    }
</style>
