<template>
    <div class="description-content">
        <div class="router-wrapper">
            <nuxt-link class="home-router" to="/home">首页</nuxt-link>
            <div>>{{articleName}}</div>
        </div>
        <div class="about-content">
            <div class="title-wrapper">
                <div class="title-text">{{articleName}}</div>
            </div>
            <div class="about-content-wrapper" v-html="articleContent">
            </div>
        </div>
    </div>
</template>
<script>
    import qs from 'qs'

    export default {
        data() {
            return {
                articleContent: null
            }
        },
        props: {
            articleId: {},
            articleName: {}
        },
        watch: {
            '$props.articleId': {
                handler(val) {
                    this.$axios[this.$apiURL.commonApi.getArticleDetail.method](this.$apiURL.commonApi.getArticleDetail.url, qs.stringify({
                        articleId: val
                    })).then(res => {
                        this.articleContent = res.data.msg
                    })
                },
                deep: true
            }
        },
        methods: {}
    };
</script>

<style scoped lang="less">
    .description-content {
        .router-wrapper {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #333333;

            a {
                color: #2172FF;
                text-decoration: none;
            }
        }

        .about-content {
            margin-top: 18px;
            background: #fff;
            padding: 0 40px 40px 40px;

            .title-wrapper {
                border-bottom: 2px solid #F4F4F4;

                .title-text {
                    padding: 22px 0;
                    font-size: 18px;
                    font-weight: bold;
                    color: #333333;
                    border-bottom: 2px solid #397CFE;
                    width: fit-content;
                }
            }
        }
    }
</style>
