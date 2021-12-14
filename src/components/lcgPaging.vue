<template>
    <div class="lcg-paging">
        <div class="inner-paging">
            <nuxt-link v-if="showHead" class="fixed-item last" to="/login">首页</nuxt-link>
            <el-button @click="changePage(-1)" icon="el-icon-arrow-left" :disabled="currentPage===1||pages===1" class="fixed-item"></el-button>

            <div class="pager">
                <nuxt-link v-for="item in pages" :key="item" :class="{'pager-item':true,'pageActive':item===currentPage}" :to="path+'/'+item">
                    {{item}}
                </nuxt-link>
            </div>
            <el-button @click="changePage(1)" icon="el-icon-arrow-right" :disabled="currentPage===pages||pages===1" class="fixed-item"></el-button>
            <nuxt-link v-if="showRail" class="fixed-item last" to="/login">尾页</nuxt-link>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {

            };
        },
        props: {
            pages: {
                type: Number,
            },
            pageSize: {
                type: Number,
                default: 10
            },
            currentPage: {
                type: Number,
                default: 1
            },
            showRail: {
                type: Boolean,
                default: false
            },
            showHead: {
                type: Boolean,
                default: false
            },
            total: {
                type: Number,
            },
            path: {
                type: String
            }
        },
        methods: {
            changePage(flag){
                let cPage = this.$props.currentPage
                cPage = flag<0?cPage-1:cPage+1
                flag<0?this.$emit("update:currentPage",cPage):this.$emit("update:currentPage",cPage)
                // if (flag < 0) {
                    this.$router.push({
                        path: `${this.$props.path}/${cPage}`
                    })
                // }
            }
        }
    }
</script>

<style lang="less">
.lcg-paging{
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    .inner-paging{
        display: flex;
        align-items: center;
        a{
            text-decoration: none;
        }
        .fixed-item{
            padding: 0;
            height: 28px;
            line-height: 28px;
            vertical-align: top;
            font-size: 13px;
            min-width: 30px;
            display: block;
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            border-radius: 2px;
            text-align: center;
            font-weight: bold;
            &.last{
                width: 50px;
            }
        }
        .pager{
            max-width: 400px;
            overflow: hidden;
            display: flex;
            align-items: center;
            .pager-item{
                color: #606266;
                height: 28px;
                line-height: 28px;
                vertical-align: top;
                font-size: 13px;
                min-width: 30px;
                display: block;
                margin: 0 5px;
                background-color: #f4f4f5;
                border-radius: 2px;
                text-align: center;
                font-weight: bold;
                &:hover{
                    color: #409EFF;
                }
                &.pageActive{
                    background: #409EFF;
                    color: #fff;
                }
            }
        }
    }
}
</style>

