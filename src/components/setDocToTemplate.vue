<template>
    <el-dialog class="setFodderDialog1" width="770px" title="将标书设置为模板" :visible.sync="settingFlag">
        <div class="input-item">
            <div class="input-label">模板名称：</div>
            <el-input v-model="name" type="text" placeholder="请输入模板名称"></el-input>
        </div>
        <div class="inner-set-fodder">
            <el-tree
                    ref="fodderTree"
                    class="inner-file-info-tree"
                    :data="settingData"
                    show-checkbox
                    :props="settingProps"
                    :node-key="settingProps.value"
                    @check="checkNodeChange"
                    :expand-on-click-node="true">
                <div
                        :class="{'custom-tree-node':true,'innerNodeActive':currentSelectId===data[settingProps.value]}"
                        slot-scope="{ node, data }">
                    <div class="content-item-left">
                        <!-- <img class="fold-icon" v-if="data.catalogGrade===1"
                              src="../../assets/template/icon_file_open@2x.png" alt="">
                         <img class="fold-icon-hover" v-if="data.catalogGrade===1"
                              src="../../assets/template/icon_file_selected@2x.png" alt="">
                         <img class="file-icon" v-if="data.catalogGrade===2"
                              src="../../assets/template/icon_sub_normal@2x.png" alt="">
                         <img class="file-icon-hover" v-if="data.catalogGrade===2"
                              src="../../assets/template/icon_sub_selected@2x.png" alt="">-->
                        <div class="file-name">
                            {{ data[settingProps.label] }}
                        </div>
                    </div>
                </div>
            </el-tree>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="settingFlag = false">取 消</el-button>
            <el-button :loading="isSave" type="primary" @click="saveFodderHandle">保 存</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import qs from 'qs'

    export default {
        name: 'commonNav',
        data() {
            return {
                settingData: [],
                settingProps: {
                    value: 'cusResTypeId',
                    label: 'cusResTypeName',
                    children: 'treeList',
                    emitPath: false,
                    checkStrictly: true
                },
                name: null,
                currentSelectId: null,
                isSave: false,
            }
        },
        props: {
            bidDocId: {
                type: String
            },
            settingFlag: {
                type: Boolean,
                default: false
            },
            currentName: {
                type: String,
            }
        },
        watch: {
            '$props.settingFlag': {
                handler(val) {
                    if (val) {
                        this.name = this.$props.currentName
                        this.currentSelectId = null
                        this.getData()
                    }
                },
                deep: true
            }
        },
        methods: {
            getData() {
                const prm = qs.stringify({
                    cusMatTemType: 2
                })
                this.$axios[this.$apiURL.fodderApi.getFodderClassify.method](this.$apiURL.fodderApi.getFodderClassify.url, prm).then(res => {
                    this.settingData = res.data.result.personTree
                })

            },
            saveFodderHandle() {
                if (!this.currentSelectId) {
                    this.$message.warning("请选择要存放的模板分类")
                    return
                }
                const prm = {
                    "bidDocId": this.$props.bidDocId,
                    "cusResTypeId": this.currentSelectId,
                    "name": this.name
                }
                this.isSave = true
                this.$axios[this.$apiURL.templateApi.setDocToTemplate.method](this.$apiURL.templateApi.setDocToTemplate.url, prm).then(res => {
                    this.isSave = false
                    this.$message.success(res.data.msg)
                    this.$emit("update:settingFlag", false)
                }).catch(err => {
                    this.isSave = false
                })

            },
            checkNodeChange(data) {
                this.$refs.fodderTree.setCheckedKeys([])
                this.$refs.fodderTree.setCheckedKeys([data[this.settingProps.value]])
                this.currentSelectId = data[this.settingProps.value]
            }
        }
    }
</script>
<style lang="less" scoped>
    .setFodderDialog1 {
        .el-dialog__header {
            background: #FAFDFF;

            .el-dialog__title {
                font-size: 15px;
                color: #333333;
            }
        }

        .el-dialog__body {
            /* display: flex;
             justify-content: center;
             flex-wrap: wrap;*/

            .input-item {
                display: flex;
                align-items: center;
                margin-bottom: 15px;

                .el-input {
                    width: 300px;
                }
            }

            /*新增*/

            .inner-set-fodder {
                width: 737px;
                height: 345px;
                border: 1px solid #E8E8E8;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                padding: 10px;
                overflow: auto;

                .custom-tree-node {
                    &.innerNodeActive {
                        background: #FBF4F2;

                        .file-name {
                            font-weight: bold;
                            color: @activeColor;
                        }
                    }
                }
            }
        }

        /deep/ .el-dialog__footer {
            display: flex;
            align-items: center;
            justify-content: center;

            .el-button {
                width: 130px;
            }
        }
    }
</style>
