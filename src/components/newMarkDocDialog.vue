<template>
    <!--创建空白标书对话框-->
    <el-dialog :close-on-click-modal="false" width="640px" :title="optTitle" :visible.sync="newMarkDocFlag">
        <el-form :model="markDocForm" ref="markDocForm" :rules="markDocFormRules">
            <el-form-item label="项目名称" :label-width="formLabelWidth" prop="projectName">
                <el-input v-model="markDocForm.projectName" autocomplete="off" placeholder="请填写项目名称"></el-input>
            </el-form-item>
            <el-form-item label="标书标题" :label-width="formLabelWidth" prop="bidDocTitle">
                <el-input v-model="markDocForm.bidDocTitle" autocomplete="off" placeholder="请填写标书标题"></el-input>
            </el-form-item>
            <el-form-item label="项目编号" :label-width="formLabelWidth">
                <el-input v-model="markDocForm.projectCode" autocomplete="off" placeholder="请填写项目编号"></el-input>
            </el-form-item>
            <el-form-item label="投标人" :label-width="formLabelWidth">
                <el-input v-model="markDocForm.bidder" autocomplete="off" placeholder="请填写投标人"></el-input>
            </el-form-item>
            <el-form-item label="代理机构" :label-width="formLabelWidth">
                <el-input v-model="markDocForm.agency" autocomplete="off" placeholder="请填写代理机构"></el-input>
            </el-form-item>
            <el-form-item label="业主单位" :label-width="formLabelWidth">
                <el-input v-model="markDocForm.proprietorUnit" autocomplete="off" placeholder="请填写业主单位"></el-input>
            </el-form-item>
            <el-form-item label="行业类型" :label-width="formLabelWidth">
                <el-select style="margin-left: 0!important;" v-model="markDocForm.industryId" placeholder="请选择行业类型">
                    <el-option v-for="item in industryList" :key="item.industryId" :label="item.industryName"
                               :value="item.industryId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="投标日期" :label-width="formLabelWidth">
                <el-date-picker
                        style="margin-left: 0!important;"
                        v-model="markDocForm.tenderDate"
                        type="date"
                        placeholder="选择投标日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div style="display: flex;justify-content: center" slot="footer" class="dialog-footer">
            <el-button @click="newMarkDocFlag = false">取 消</el-button>
            <el-button :loading="saveLoading" type="primary" @click="markDocAddHandle('markDocForm')">保 存</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import qs from 'qs'
    import {mapState} from 'vuex'

    export default {
        name: 'commonNav',
        data() {
            return {
                markDocForm: {
                    "agency": null,
                    "bidDocId": null,
                    "bidDocTitle": null,
                    "bidder": null,
                    "companyId": null,
                    "deptId": null,
                    "industryId": null,
                    "projectCode": null,
                    "projectName": null,
                    "proprietorUnit": null,
                    "tenderDate": null
                },  //标书创建form
                markDocFormRules: {
                    projectName: [
                        {required: true, message: '请填写项目名称', trigger: 'blur'}
                    ],
                    projectCode: [
                        {required: true, message: '请填写项目编号', trigger: 'blur'}
                    ],
                    bidDocTitle: [
                        {required: true, message: '请填写标书标题', trigger: 'blur'}
                    ],
                    bidder: [
                        {required: true, message: '请填写投标人', trigger: 'blur'}
                    ],
                    proprietorUnit: [
                        {required: true, message: '请填写业主单位', trigger: 'blur'}
                    ],
                    tenderDate: [
                        {required: true, message: '请填写投标日期', trigger: 'blur'}
                    ],
                    agency: [
                        {required: true, message: '请填写代理机构', trigger: 'blur'}
                    ],
                    industryId: [
                        {required: true, message: '请选择行业类型', trigger: 'blur'}
                    ],
                },  //标书创建rule
                formLabelWidth: '120px',
                optTitle: null,
                saveLoading: false
            }
        },
        computed: {
            newMarkDocFlag: {
                get() {
                    return this.$props.modalFlag
                },
                set(val) {
                    this.$emit('update:modalFlag', val)
                }
            },
            ...mapState({
                industryList:state=>state.industryData
            })
        },
        props: {
            modalFlag: {
                type: Boolean,
                default: false
            },
            optType: {
                type: String,
                default: 'add'
            },
            bidDocId: {
                type: String
            },
            docIsUpdate: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            "$props.modalFlag": {
                handler(val) {
                    if (val) {
                        this.optTitle = this.$props.optType==='add'?'新建标书':'修改基本信息'
                        if (this.$props.optType === 'add') {
                            this.$nextTick(() => {
                                this.markDocForm.agency = null
                                this.markDocForm.bidDocId = null
                                this.markDocForm.bidDocTitle = null
                                this.markDocForm.bidder = null
                                this.markDocForm.companyId = null
                                this.markDocForm.deptId = null
                                this.markDocForm.industryId = null
                                this.markDocForm.projectCode = null
                                this.markDocForm.projectName = null
                                this.markDocForm.proprietorUnit = null
                                this.markDocForm.tenderDate = null
                                this.$refs['markDocForm'].resetFields()
                            })
                        } else {
                            console.log('id', this.$props.bidDocId)
                            const prm = qs.stringify({
                                bidDocId: this.$props.bidDocId
                            })
                            this.$axios[this.$apiURL.markDocApi.markDocDetail.method](this.$apiURL.markDocApi.markDocDetail.url,prm).then(res => {
                                this.markDocForm = res.data.result
                                this.markDocForm.industryId = res.data.result.industryId===0?null:res.data.result.industryId
                            })
                        }

                    }
                },
                deep: true
            }
        },
        methods: {
            //新建标书
            markDocAddHandle(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        const prm = {
                            "agency": this.markDocForm.agency,
                            "bidDocTitle": this.markDocForm.bidDocTitle,
                            "bidder": this.markDocForm.bidder,
                            "companyId": this.markDocForm.companyId,
                            "deptId": this.markDocForm.deptId,
                            "bidDocId": this.markDocForm.bidDocId,
                            "industryId": this.markDocForm.industryId,
                            "projectCode": this.markDocForm.projectCode,
                            "projectName": this.markDocForm.projectName,
                            "proprietorUnit": this.markDocForm.proprietorUnit,
                            "tenderDate": this.$lcgFormatDate(this.markDocForm.tenderDate, 1)
                        }
                        this.saveLoading = true
                        const fn = this.$props.optType === 'add' ? this.$apiURL.markDocApi.markDocAdd : this.$apiURL.markDocApi.markDocUpdate
                        this.$axios[fn.method](fn.url,prm).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success(res.data.msg)
                                this.saveLoading = false
                                this.$emit('update:modalFlag', false)
                                // this.$emit('reTriggerList')
                                if (this.$props.optType === 'edit') {
                                    this.$emit('reTriggerList')
                                }else{
                                     this.$router.push({
                                     path:'/markDocManagement/markDocEdit',
                                     query: {
                                         bidDocId:res.data.result.bidDocId,
                                         title:res.data.result.bidDocTitle,
                                     }
                                 })
                                }
                            }
                        }).catch(err => {
                            this.saveLoading = false
                        })
                    }
                })
            },
        }
    }
</script>
<style lang="less" scoped>
</style>
