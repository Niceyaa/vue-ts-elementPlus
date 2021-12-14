<template>
    <div>
        <el-dialog @close="closeHandle" class="setFodderDialog1" width="770px" title="设置自定义素材/模板"
                   :visible.sync="newSettingFlag">
            <div class="input-item">
                <div class="input-label">素材/模板名称：</div>
                <el-input v-model="typeName" type="text" placeholder="请输入素材/模板名称"></el-input>
            </div>
            <!-- <el-row class="type-wrapper">
                 <div @click="changeType(1)" :class="{'type-item':true,'activeType':type===1}">{{routerType==='sysTemplate'?'公司模板':'公司素材'}}</div>
                 <div @click="changeType(2)" :class="{'type-item':true,'activeType':type===2}">{{routerType==='sysTemplate'?'个人模板':'个人素材'}}</div>
             </el-row>-->
            <div class="new-type-wrapper">
                <div @click="changeType(1)" :class="{'type-item':true,'activeType':selfType===1}">
                    <img class="default-icon" src="../assets/template/icon_company_default@2x.png" alt="">
                    <img class="hover-icon" src="../assets/template/icon_company_select@2x.png" alt="">
                    <div>{{routerType==='sysTemplate'?'公司模板':'公司素材'}}</div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div @click="changeType(2)" :class="{'type-item':true,'activeType':selfType===2}">
                    <img class="default-icon" src="../assets/template/icon_personal_default@2x.png" alt="">
                    <img class="hover-icon" src="../assets/template/icon_personal_select@2x.png" alt="">
                    <div>{{routerType==='sysTemplate'?'个人模板':'个人素材'}}</div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div @click="changeFlag" :class="{'type-item':true,'activeType':addFlag}">
                    <img class="default-icon" src="../assets/template/icon_addfolders_default@2x.png" alt="">
                    <img class="hover-icon" src="../assets/template/icon_addfolders_select@2x.png" alt="">
                    <div>新建文件夹</div>
                </div>
            </div>
            <div v-if="!addFlag" class="inner-set-fodder">
                <el-tree
                        ref="fodderTree"
                        class="inner-file-info-tree"
                        :data="settingData"
                        show-checkbox
                        :props="settingProps"
                        node-key="cusResTypeId"
                        :default-checked-keys="defaultCheckKey"
                        @check="checkNodeChange"
                        :expand-on-click-node="true">
                    <div slot-scope="{ node, data }"
                         :class="{'custom-tree-node':true,'innerNodeActive':selectedId===data.cusResTypeId}">
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
                                {{ data.cusResTypeName }}
                            </div>
                        </div>
                    </div>
                </el-tree>
            </div>
            <div v-else class="inner-set-fodder">
                <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                    <el-form-item label="是否一级文件夹:">
                        <el-radio-group v-model="form.rootFlag">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="所属类型:">
                        <el-select @change="typeChange" v-model="form.cusType" placeholder="请选择所属类型">
                            <el-option v-for="item in typeList" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文件夹名称:" prop="cusResTypeName">
                        <el-input style="width: 217px;" v-model="form.cusResTypeName"></el-input>
                    </el-form-item>
                    <el-form-item label="上级文件夹:">
                        <el-cascader
                                @change="lastFoldChange"
                                :disabled="form.rootFlag"
                                placeholder="请选择上级文件夹"
                                v-model="form.pid"
                                :options="settingData"
                                :props="defaultProps"
                                clearable>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addHandle('form')">立即新增</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newSettingFlag = false">取 消</el-button>
                <el-button v-if="!isBidDoc" type="primary" @click="saveFodderHandle">保 存</el-button>
                <el-button v-else type="primary" @click="saveBidToHandle">保 存</el-button>
            </div>
        </el-dialog>
        <successShow :show-flag.sync="successFlag">
            <div style="text-align: center">保存成功，可前往<nuxt-link target="_blank" :to="dropUrl" style="color: #156BFE;text-decoration: none">个人中心</nuxt-link>查看</div>
        </successShow>
    </div>

</template>

<script>
    import qs from 'qs'
    import successShow from '@/components/successShow'

    export default {
        name: 'commonNav',
        components: {successShow},
        data() {
            return {
                successFlag: false,

                defaultCheckKey: [],

                selfType: 0,
                dropUrl: null,

                form: {
                    "cusResTypeName": null,
                    "cusType": null,
                    "pid": null,
                    "type": null,
                    rootFlag: true,
                },
                rules: {
                    cusResTypeName: [
                        {required: true, message: '文件夹名称不能为空', trigger: 'blur'}
                    ],
                },
                typeList: [
                    {id: 1, name: '公司'},
                    {id: 2, name: '个人'},
                ],
                defaultProps: {
                    multiple: false,
                    emitPath: false,
                    checkStrictly: true,
                    value: 'cusResTypeId',
                    label: 'cusResTypeName',
                    children: 'treeList'
                },

                addFlag: false,
                settingData: [],
                totalData: {},
                typeName: null,
                selectedId: null,
                settingProps: {
                    value: 'cusResTypeId',
                    label: 'cusResTypeName',
                    children: 'treeList',
                    emitPath: false,
                    checkStrictly: true
                },
            }
        },
        props: {
            isBidDoc: {
                type: Boolean,
                default: false,
            },

            settingFlag: {
                type: Boolean,
                default: false
            },
            currentName: {
                type: String,
            },
            keyId: {},
            type: {
                type: Number,
                default: 1 //1公司 2个人
            },
            routerType: {
                type: String,
                default: 'sysFodder'
            }
        },
        computed: {
            newSettingFlag: {
                get() {
                    return this.$props.settingFlag
                },
                set(val) {
                    this.$emit('update:settingFlag', val)
                }
            }
        },
        watch: {
            '$props.settingFlag': {
                handler(val) {
                    if (val) {
                        this.defaultCheckKey = []
                        this.selfType = this.$props.type
                        this.addFlag = false
                        this.typeName = this.$props.currentName
                        this.getTypeData()
                    }
                },
                deep: true
            }
        },
        methods: {
            async getTypeData() {
                let prm = qs.stringify({
                    cusMatTemType: this.$props.routerType === 'sysFodder' ? 1 : 2
                })
                console.log('prm', prm)
                let content = await this.$axios[this.$apiURL.fodderApi.getFodderClassify.method](this.$apiURL.fodderApi.getFodderClassify.url, prm)
                this.settingData = this.$props.type === 1 ? content.data.result.companyTree : content.data.result.personTree
                this.totalData = content.data.result
            },
            saveFodderHandle() {
                const prm = {
                    keyId: this.$props.keyId,
                    cusName: this.typeName,
                    cusType: this.selfType,
                    cusResTypeId: this.selectedId,
                }
                const fn = this.$props.routerType === 'sysFodder' ? this.$apiURL.fodderApi.setSysFodderToSelfFodder : this.$apiURL.templateApi.setSysToSelfTemplate
                console.log('fn', fn)
                this.$axios[fn.method](fn.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.selectedId = null
                    this.$emit('update:settingFlag', false)

                    this.$refs.fodderTree.setCheckedKeys([])
                    this.successFlag = true
                    switch(this.$props.routerType){
                        case 'sysTemplate':
                            this.dropUrl = this.selfType===1?'/personalCenter/personalCenter/enterpriseTemplate':'/personalCenter/personalCenter/myTemplate'
                            break
                        case 'sysFodder':
                            this.dropUrl = this.selfType===1?'/personalCenter/personalCenter/enterpriseFodder':'/personalCenter/personalCenter/myFodder'
                            break
                    }
                })
            },
            saveBidToHandle() {
                const prm = this.$props.routerType==='sysFodder'?{
                    bidDocCatalogId: this.$props.keyId,
                    cusMaterialName: this.typeName,
                    cusType: this.selfType,
                    cusResTypeId: this.selectedId,
                }:{
                    "bidDocId": this.$props.keyId,
                    "cusResTypeId": this.selectedId,
                    "name": this.typeName,
                    cusType: this.selfType
                }
                const fn = this.$props.routerType === 'sysFodder' ? this.$apiURL.fodderApi.setFoldToFodder : this.$apiURL.templateApi.setDocToTemplate
                this.$axios[fn.method](fn.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.selectedId = null
                    this.$emit('update:settingFlag', false)

                    this.$refs.fodderTree.setCheckedKeys([])
                    this.successFlag = true
                    switch(this.$props.routerType){
                        case 'sysTemplate':
                            this.dropUrl = this.selfType===1?'/personalCenter/personalCenter/enterpriseTemplate':'/personalCenter/personalCenter/myTemplate'
                            break
                        case 'sysFodder':
                            this.dropUrl = this.selfType===1?'/personalCenter/personalCenter/enterpriseFodder':'/personalCenter/personalCenter/myFodder'
                            break
                    }
                })
            },
            checkNodeChange(data) {
                this.$refs.fodderTree.setCheckedKeys([])
                this.$refs.fodderTree.setCheckedKeys([data.cusResTypeId])
                this.selectedId = data.cusResTypeId
            },
            //切换个人和公司类型
            changeType(type) {
                this.addFlag = false
                this.selfType = type
                this.settingData = type === 1 ? this.totalData.companyTree : this.totalData.personTree
            },
            closeHandle() {
                this.settingData = []
            },
            changeFlag() {
                this.addFlag = true
                this.settingData = []
            },
            //修改新增文件夹的时候，type change事件
            typeChange(val) {
                this.settingData = val === 1 ? this.totalData.companyTree : this.totalData.personTree
            },
            lastFoldChange(val) {
                console.log(val)
            },
            //新增事件
            addHandle(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (!this.form.rootFlag && !this.form.pid) {
                            this.$message.warning('请选择上级文件夹')
                            return
                        }
                        let prm = {
                            "cusMatTemType": this.$props.routerType === 'sysTemplate' ? 2 : 1,
                            "cusResImgFileId": "",
                            "cusResTypeName": this.form.cusResTypeName,
                            "cusType": this.form.cusType,
                            "pid": this.form.rootFlag ? null : this.form.pid,
                        }
                        this.$axios[this.$apiURL.fodderApi.addClassify.method](this.$apiURL.fodderApi.addClassify.url, prm).then(async res => {
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                            let tempType = parseInt(this.form.cusType)
                            this.form.pid = null
                            this.form.cusType = null
                            this.form.cusResTypeName = null
                            this.$refs[formName].resetFields()
                            await this.getTypeData()
                            this.changeType(tempType)
                            this.defaultCheckKey = [res.data.result]
                        })
                    }
                })
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

            .type-wrapper {
                display: flex;
                align-items: center;
                margin-bottom: 15px;

                .type-item {
                    margin-right: 15px;
                    width: 100px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    border: 1px solid #eeee;
                    font-size: 12px;
                    cursor: pointer;
                    border-radius: 5px;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;

                    &:hover {
                        color: #fff;
                        background-color: #409eff;
                        border-color: #409eff;
                    }

                    &.activeType {
                        color: #fff;
                        background-color: #409eff;
                        border-color: #409eff;
                    }
                }
            }

            /*修改*/

            .new-type-wrapper {
                width: fit-content;
                display: flex;
                height: 32px;
                background: #F5F8FC;
                border-radius: 16px;
                align-items: center;
                padding: 0 16px;
                margin-bottom: 20px;

                .el-divider {
                    background: #156BFE;
                    margin: 0 20px;
                }

                .type-item {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    font-weight: 400;
                    color: #333333;

                    &.activeType {
                        color: #156BFE;

                        img {
                            &.default-icon {
                                display: none;
                            }

                            &.hover-icon {
                                display: block;
                            }
                        }
                    }

                    &:hover {
                        color: #156BFE;

                        img {
                            &.default-icon {
                                display: none;
                            }

                            &.hover-icon {
                                display: block;
                            }
                        }
                    }

                    img {
                        width: 18px;
                        height: 18px;
                        margin-right: 4px;

                        &.default-icon {
                            display: block;
                        }

                        &.hover-icon {
                            display: none;
                        }
                    }
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
