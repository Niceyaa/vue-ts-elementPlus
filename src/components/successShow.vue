<template>
    <div>
        <el-dialog class="success-show" width="380px" :visible.sync="newShowFlag">
            <div class="show-main">
                <img class="success-img" src="~/assets/template/success.png" alt="">
                <slot></slot>
                <div class="sure-btn" @click="closeHandle">确定</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'successShow',
        props: {
            showFlag: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            newShowFlag: {
                get() {
                    return this.$props.showFlag
                },
                set(val) {
                    this.$emit('update:showFlag', val)
                }
            }
        },
        methods: {
            closeHandle() {
                this.$emit('update:showFlag', false)
            }
        }
    }
</script>
<style lang="less" scoped>
    .success-show {
        /deep/ .el-dialog__header {
            padding: 0;
        }

        /deep/ .el-dialog__body {
            border-radius: 8px;
            padding: 0 0 40px 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;

            .show-main {
                text-align: center;
                font-size: 14px;
                font-weight: 400;
                color: #333333;

                .success-img {
                    margin: 50px 0 35px 0;
                    width: 48px;
                    height: 48px;
                }

                .sure-btn {
                    width: 128px;
                    height: 40px;
                    -background: #F5F8FC;
                    border-radius: 4px;
                    cursor: pointer;
                    margin: 30px auto 0 auto;
                    text-align: center;
                    line-height: 40px;
                    -color: #156BFE;
                    background: #156bfe;
                    color: #fff;
                }
            }
        }


    }
</style>
