<template>
    <div :style="{'width': width,'margin':margin}" class="mark-doc-item">
        <div class="item-title">{{options.title}}</div>
        <img class="doc-type-img" v-if="options.docType===1" src="../assets/index/1@2x.png" alt="">
        <img class="doc-type-img" v-else-if="options.docType===2" src="../assets/index/2@2x.png" alt="">
        <img class="doc-type-img" v-else-if="options.docType===3" src="../assets/index/3@2x.png" alt="">
        <img class="doc-type-img" v-else-if="options.docType===4" src="../assets/index/4@2x.png" alt="">
        <img class="doc-type-img" v-else src="../assets/index/5@2x.png" alt="">
        <div class="doc-opt-wrapper">
            <div class="opt-item">
                <img src="../assets/index/preview@2x.png" alt="" @click="goToUrl">
                <div>预览</div>
            </div>
            <div v-if="routerType!=='sysTempLate'&&routerType!=='sysFodder'" class="opt-item" @click="goToUrl">
                <img src="../assets/index/edit@2x.png" alt="">
                <div>编辑</div>
            </div>
            <el-dropdown class="right-menu-item hover-effect" @command="clickHandCommand">
                <div class="opt-item">
                    <img src="../assets/index/more@2x.png" alt="">
                    <div>更多</div>
                </div>
                <el-dropdown-menu v-if="routerType==='markDoc'" class="portrait-dropdown-menu" slot="dropdown">
                    <!--  <el-dropdown-item>编辑</el-dropdown-item>
                      <el-dropdown-item>预览</el-dropdown-item>
                      <el-dropdown-item>设为星标</el-dropdown-item>
                      <el-dropdown-item>重命名</el-dropdown-item>-->
                    <el-dropdown-item command="download">下载</el-dropdown-item>
                    <el-dropdown-item command="docDelete">删除</el-dropdown-item>
                    <el-dropdown-item command="docUpdate">修改基本信息</el-dropdown-item>
                    <!--<el-dropdown-item>项目成员管理</el-dropdown-item>-->
                </el-dropdown-menu>
                <el-dropdown-menu v-if="routerType==='sysTemplate'" class="portrait-dropdown-menu" slot="dropdown">
                    <el-dropdown-item command="setDefine">设为自定义模板</el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu v-if="routerType==='selfTemplate'" class="portrait-dropdown-menu" slot="dropdown">
                    <el-dropdown-item command="rename" @click="renameHandle">重命名</el-dropdown-item>
                    <el-dropdown-item command="delete" @click="deleteHandle">删除</el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu v-if="routerType==='sysFodder'" class="portrait-dropdown-menu" slot="dropdown">
                    <el-dropdown-item command="setDefine">设为自定义素材</el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu v-if="routerType==='selfFodder'" class="portrait-dropdown-menu" slot="dropdown">
                    <el-dropdown-item command="rename" @click="renameHandle">重命名</el-dropdown-item>
                    <el-dropdown-item command="delete" @click="deleteHandle">删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="doc-detail">
            <div class="doc-size">{{options.size}}</div>
            <div class="doc-date">{{options.date}}</div>
        </div>

        <commonSetDialog :current-name.sync="setFodderForm.cusMaterialName" :settingData="fodderClassifyData"
                         :setting-props="fodderClassifyProps" :setting-flag="setFoldToFodderFlag"
                         :current-select-id.sync="setFodderForm.cusResTypeId"
                         @handleFn="saveFodderHandle"></commonSetDialog>

        <exportRecordDialog :modal-flag.sync="downloadFlag" :bid-doc-id="$props.options.id" :export-type="1"></exportRecordDialog>

    </div>
</template>

<script>
    import commonSetDialog from '../components/commonSetDialog'
    import exportRecordDialog from '../components/exportRecordDialog'
    import {
        setFoldToFodder,
        getFodderClassify,
        deleteSelfDefineFodder,
        updateSelfDefineFodder,
        setSysFodderToSelfFodder
    } from "../api/fodderApi";
    import {deleteSelfTemplate, updateSelfTemplate, setSysToSelfTemplate} from "../api/templateApi";
    import {markDocUpdate, markDocDelete} from "../api/markDocApi";
    import qs from 'qs'

    export default {
        name: "markDocItem",
        components: {commonSetDialog, exportRecordDialog},
        data() {
            return {
                downloadFlag: false,

                // docType:1
                //设置自定义素材
                fodderClassifyData: [],
                fodderClassifyProps: {
                    value: 'cusResTypeId',
                    label: 'cusResTypeName',
                    children: 'treeList',
                    emitPath: false,
                    checkStrictly: true
                },
                currentSelectFodderId: null,
                setFoldToFodderFlag: false, // 设置自定义素材Flag
                setFodderForm: {
                    cusResTypeId: null,
                    cusMaterialName: null,
                    bidDocCatalogId: null,
                },
                setFodderFRules: {
                    cusMaterialName: [
                        {required: true, message: '请填写自定义素材名称', trigger: 'blur'}
                    ],
                    cusResTypeId: [
                        {required: true, message: '请选择自定义素材类型', trigger: 'change'}
                    ],
                },
            }
        },
        props: {
            width: {
                type: String,
                default: '188px'
            },
            margin: {
                type: String,
                default: '0'
            },
            routerType: { //selfTemplate 自定义模板  sysTemplate 系统模板  selfFodder 自定义素材  sysFodder 系统素材
                type: String,
                default: 'markDoc'
            },
            options: {
                type: Object,
                default: () => {
                    return {
                        title: '',
                        date: '',
                        size: '',
                        docType: 1,
                        id: 1,
                    }
                }
            },
            isDelete: {
                type: Boolean,
                default: false
            },
            isOpenEditDocDialog: {
                type: Boolean,
                default: false
            },
            currentBidDocId: {
                type: String
            }
        },
        methods: {
            //设为素材事件
            saveFodderHandle() {
                console.log(1111)
                if (!this.setFodderForm.cusResTypeId) {
                    this.$message.warning('请选择素材分类')
                    return
                }
                if (this.$props.routerType === 'sysFodder') {
                    const prm = {
                        keyId: this.$props.options.id,
                        cusName: this.setFodderForm.cusMaterialName,
                        cusResTypeId: this.setFodderForm.cusResTypeId,
                    }
                    setSysFodderToSelfFodder(prm).then(res => {
                        this.$message.success(res.data.msg)
                        this.setFodderForm.cusResTypeId = null
                        this.setFoldToFodderFlag = false
                    })
                } else if (this.$props.routerType === 'sysTemplate') {
                    const prm = {
                        keyId: this.$props.options.id,
                        cusName: this.setFodderForm.cusMaterialName,
                        cusResTypeId: this.setFodderForm.cusResTypeId,
                    }
                    setSysToSelfTemplate(prm).then(res => {
                        this.$message.success(res.data.msg)
                        this.setFodderForm.cusResTypeId = null
                        this.setFoldToFodderFlag = false
                    })
                }

            },

            //打开素材对话框
            openSetFodderDialog(data) {
                this.setFoldToFodderFlag = true
                this.setFodderForm.cusMaterialName = this.$props.options.title
                this.getFodderClassifyData()
            },

            //获取自定义素材分类
            getFodderClassifyData() {
                getFodderClassify().then(res => {
                    this.fodderClassifyData = res.data.result
                })
            },

            //预览编辑
            goToUrl(path, query) {
                //'/markDoc/markDocEdit',{'bidDocId':options.id,'title':options.title}
                if (this.$props.routerType === 'markDoc') {
                    path = '/markDoc/markDocEdit'
                    query = {'bidDocId': this.$props.options.id, 'title': this.$props.options.title}
                } else if (this.$props.routerType.indexOf('Template') !== -1) {
                    path = '/modelClassify/modelManagement'
                    query = this.$props.options
                } else if (this.$props.routerType.indexOf('Fodder') !== -1) {
                    path = '/fodderClassify/fodder'
                    query = this.$props.options
                }
                this.$router.push({
                    path,
                    query
                })
            },
            clickHandCommand(command) {
                if (command === 'delete') {
                    this.deleteHandle()
                } else if (command === 'rename') {
                    this.renameHandle()
                } else if (command === 'setDefine') {
                    this.openSetFodderDialog()
                } else if (command === 'docDelete') {
                    this.docDeleteHandle()
                } else if (command === 'docUpdate') {
                    // this.bidDocFlag = true
                    // this.currentBidDocId = this.$props.options.id
                    this.$emit('update:isOpenEditDocDialog', true)
                    this.$emit('update:currentBidDocId', this.$props.options.id)
                }else if (command === 'download') {
                    this.downloadFlag = true
                }
            },
            //标书--编辑

            //标书--删除
            docDeleteHandle() {
                this.$confirm('此操作将永久删除该标书信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        bidDocId: this.$props.options.id,
                        loading: true
                    })
                    markDocDelete(prm).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.$emit('update:isDelete', true)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //删除
            deleteHandle() {
                this.$confirm('此操作将永久删除该文件信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.$props.routerType === 'selfTemplate') {
                        const prm = qs.stringify({
                            cusTemplateId: this.$props.options.id
                        })
                        deleteSelfTemplate(prm).then(res => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.$emit('update:isDelete', true)
                        })
                    } else if (this.$props.routerType === 'selfFodder') {
                        const prm = qs.stringify({
                            cusMaterialId: this.$props.options.id
                        })
                        deleteSelfDefineFodder(prm).then(res => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.$emit('update:isDelete', true)
                        })
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //重命名
            renameHandle() {
                this.$prompt('请输入名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue: this.$props.options.title,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({value}) => {
                    if (this.$props.routerType === 'selfTemplate') {
                        const prm = {
                            cusResTypeId: this.$props.options.docType,
                            cusTemplateId: this.$props.options.id,
                            cusTemplateTitle: value,
                        }
                        updateSelfTemplate(prm).then(res => {
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                            this.$emit('update:isDelete', true)
                        })
                    } else if (this.$props.routerType === 'selfFodder') {
                        const prm = {
                            cusResTypeId: this.$props.options.docType,
                            cusMaterialId: this.$props.options.id,
                            cusMaterialName: value,
                        }
                        updateSelfDefineFodder(prm).then(res => {
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                            this.$emit('update:isDelete', true)
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消修改'
                    });
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .mark-doc-item {
        background: #FFFFFF;
        box-shadow: 0px 2px 12px 1px rgba(206, 211, 228, 0.35);
        border-radius: 4px;
        overflow: hidden;
        padding: 22px 0 13px 0;
        box-sizing: border-box;
        text-align: center;

        .item-title {
            font-size: 14px;
            font-family: @fontFa;
            font-weight: 400;
            color: #272727;
            padding: 0 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .doc-type-img {
            width: 56px;
            height: 72px;
            margin: 13px 0 18px 0;
        }

        .doc-opt-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 33px;

            .opt-item {
                text-align: center;
                font-size: 12px;
                font-family: @fontFa;
                font-weight: 400;
                color: #728194;
                cursor: pointer;

                img {
                    width: 22px;
                    height: 22px;
                    margin-bottom: 6px;
                }
            }
        }

        .doc-detail {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 34px 10px 0 10px;

            .doc-size {
                font-size: 12px;
                font-family: @fontFa;
                font-weight: 500;
                color: #728194;
            }

            .doc-date {
                font-size: 12px;
                font-family: @fontFa;
                font-weight: 500;
                color: #728194;
            }

        }
    }
</style>
