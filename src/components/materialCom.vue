<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">{{resourceTypeName}}</div>
            <div class="com-opt-wrapper">
                <el-button v-if="deleteList.length>0" type="danger" icon="el-icon-delete" @click="multipleDeleteHandle">
                    删除
                </el-button>
                <el-button type="primary" plain @click="createFold">新建文件夹</el-button>
                <el-button type="primary" v-show="currentRelated" plain icon="el-icon-upload" @click="uploadFile">上传
                </el-button>
            </div>
        </div>
        <el-tabs class="temp-material-tab" v-model="resourceType">
            <el-tab-pane label="公司素材" :name="102">
                <div class="temp-material-content">
                    <div class="router-nav-wrapper" v-if="alreadyExistClassify.length>1">
                        <!--<div class="back-wrapper">
                            <img src="~/assets/personal2/lastGrade.png" alt="">
                            <div class="back-text">返回上一级</div>
                        </div>
                        <div class="separator-line"></div>-->
                        <div class="nav-wrapper">
                            <div @click="goToInnerClassifyData(item)" v-for="(item,idx) in alreadyExistClassify"
                                 :key="idx" class="nav-item">
                                <span>{{item.catalogName}}</span>
                                <span class="right-arrow" v-if="idx!==alreadyExistClassify.length-1">></span>
                            </div>
                        </div>
                    </div>
                    <el-table
                            ref="multipleTable"
                            class="file-table"
                            :data="templateData"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                :selectable="canSelectFn"
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                label="名称"
                                min-width="200px">
                            <template v-slot="{row}">
                                <div v-if="!row.isMatTem" class="type-wrapper" @click="getInnerClassifyData(row)">
                                    <img src="~/assets/personal2/personal_icon_file@2x.png" alt="">
                                    <div class="file-name">{{row.catalogName}}</div>
                                </div>
                                <nuxt-link target="_blank"
                                           :to="'/markDocManagement/selfTemplateAndMaterialEdit?id='+row.relatedId+'&type=cus_material&title='+row.catalogName"
                                           v-else-if="row.state==='解析成功'&&row.type==='company_material_doc'" class="type-wrapper tag">
                                    <img src="~/assets/personal2/personal_icon_word@2x.png" alt="">
                                    <div class="file-name">{{row.catalogName}}</div>
                                </nuxt-link>
                                <div v-else-if="row.type==='company_material_pic'" @click="openPre(row)" class="type-wrapper">
                                    <img src="~/assets/personal2/personal_icon_png@2x.png" alt="">
                                    <div class="file-name">{{row.catalogName}}</div>
                                </div>
                                <div v-else @click="onlyTip" class="type-wrapper">
                                    <img src="~/assets/personal2/personal_icon_word@2x.png" alt="">
                                    <div class="file-name">{{row.catalogName}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="180px"
                                label="状态">
                            <template v-slot="{row}">
                                <div style="display: flex;align-items: center;">
                                    <div>{{row.state}}</div>
                                    <el-tag @click="getData" style="margin-left: 5px;cursor: pointer;" type="primary" size="mini" v-if="row.isMatTem&&row.state!=='解析成功'">刷新
                                    </el-tag>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                width="350px"
                                label="修改时间">
                        </el-table-column>
                        <el-table-column
                                width="200px"
                                label="操作">
                            <template v-slot="{row}">
                                <div style="display: flex;align-items: center;">
                                    <common-button v-if="row.isMatTem" @click.native="renameDocOpen(row)"
                                                   :icon="'el-icon-edit-outline'" :btn-name="'重命名'"></common-button>
                                    <common-button v-else @click.native="renameOpen(row)" :icon="'el-icon-edit-outline'"
                                                   :btn-name="'重命名'"></common-button>
                                    <el-divider
                                            v-if="row.type!=='company_material_personnel_qualification'&&row.type!=='company_material_perform'"
                                            direction="vertical"></el-divider>
                                    <common-button
                                            v-if="row.type!=='company_material_personnel_qualification'&&row.type!=='company_material_perform'"
                                            @click.native="multipleDeleteHandle([{keyId: row.relatedId,
                            typeName: row.type}])" :icon="'el-icon-delete'" :btn-name="'删除'"></common-button>
                                </div>
                                <!--  <el-dropdown class="opt-dropdown" @command="handleCommand($event,row)">
                                      <img class="normal-icon" src="~/assets/personal2/personal_more_normal@2x.png"
                                           alt="">
                                      <img class="hover-icon" src="~/assets/personal2/personal_more_hover@2x.png" alt="">
                                      <el-dropdown-menu slot="dropdown">
                                          <el-dropdown-item command="rename">重命名</el-dropdown-item>
                                          <el-dropdown-item
                                                  v-if="row.type!=='company_material_personnel_qualification'&&row.type!=='company_material_perform'"
                                                  command="delete">删除
                                          </el-dropdown-item>
                                      </el-dropdown-menu>
                                  </el-dropdown>-->

                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page-wrapper">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="个人素材" :name="103">
                <div class="temp-material-content">
                    <div class="router-nav-wrapper" v-if="alreadyExistClassify.length>1">
                        <div class="nav-wrapper">
                            <div @click="goToInnerClassifyData(item)" v-for="(item,idx) in alreadyExistClassify"
                                 :key="idx" class="nav-item">
                                <span>{{item.catalogName}}</span>
                                <span class="right-arrow" v-if="idx!==alreadyExistClassify.length-1">></span>
                            </div>
                        </div>
                    </div>
                    <el-table
                            ref="multipleTable"
                            class="file-table"
                            :data="templateData"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                label="名称"
                                min-width="200px">
                            <template v-slot="{row}">
                                <div v-if="!row.isMatTem" class="type-wrapper" @click="getInnerClassifyData(row)">
                                    <img src="~/assets/personal2/personal_icon_file@2x.png" alt="">
                                    <div class="file-name">{{row.catalogName}}</div>
                                </div>
                                <nuxt-link target="_blank"
                                           :to="'/markDocManagement/selfTemplateAndMaterialEdit?id='+row.relatedId+'&type=cus_material&title='+row.catalogName"
                                           v-else-if="row.state==='解析成功'" class="type-wrapper tag">
                                    <img src="~/assets/personal2/personal_icon_word@2x.png" alt="">
                                    <div class="file-name">{{row.catalogName}}</div>
                                </nuxt-link>
                                <div v-else @click="onlyTip" class="type-wrapper">
                                    <img src="~/assets/personal2/personal_icon_word@2x.png" alt="">
                                    <div class="file-name">{{row.catalogName}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="180px"
                                label="状态">
                            <template v-slot="{row}">
                                <div style="display: flex;align-items: center;">
                                    <div>{{row.state}}</div>
                                    <el-tag @click="getData" style="margin-left: 5px;cursor: pointer;" type="primary" size="mini" v-if="row.isMatTem&&row.state!=='解析成功'">刷新
                                    </el-tag>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                width="350px"
                                label="修改时间">
                        </el-table-column>
                        <el-table-column
                                width="400px"
                                label="操作">
                            <template v-slot="{row}">
                                <div style="display: flex;align-items: center;">
                                    <common-button v-if="row.isMatTem" @click.native="renameDocOpen(row)"
                                                   :icon="'el-icon-edit-outline'" :btn-name="'重命名'"></common-button>
                                    <common-button v-else @click.native="renameOpen(row)" :icon="'el-icon-edit-outline'"
                                                   :btn-name="'重命名'"></common-button>
                                    <el-divider v-if="row.isMatTem" direction="vertical"></el-divider>
                                    <common-button v-if="row.isMatTem" @click.native="turnOpen(row)"
                                                   :icon="'el-icon-copy-document'" :btn-name="'设为公司素材'"></common-button>
                                    <el-divider direction="vertical"></el-divider>
                                    <common-button @click.native="multipleDeleteHandle([{keyId: row.relatedId,
                            typeName: row.type}])" :icon="'el-icon-delete'" :btn-name="'删除'"></common-button>
                                </div>
                                <!--<el-dropdown class="opt-dropdown" @command="handleCommand($event,row)">
                                    <img class="normal-icon" src="~/assets/personal2/personal_more_normal@2x.png"
                                         alt="">
                                    <img class="hover-icon" src="~/assets/personal2/personal_more_hover@2x.png" alt="">
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="rename">重命名</el-dropdown-item>
                                        <el-dropdown-item v-if="row.isMatTem" command="setToCompany">设为公司素材
                                        </el-dropdown-item>
                                        <el-dropdown-item command="delete">删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
-->
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page-wrapper">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>

        </el-tabs>

        <!--新建自定义素材-->
        <el-dialog class="setFodderDialog" width="440px" title="新建自定义素材" :visible.sync="newFodderFlag">
            <el-form :model="setFodderForm" ref="setFodderForm">
                <el-form-item label="文件：">
                    <upload-doc :file-name.sync="setFodderForm.cusMaterialName" :file-list.sync="fileList"></upload-doc>
                </el-form-item>
                <el-form-item label="名称：">
                    <el-input style="width: 300px;" v-model="setFodderForm.cusMaterialName"
                              autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newFodderFlag = false">取 消</el-button>
                <el-button type="primary" @click="addSelfFodderHandle">保 存</el-button>
            </div>
        </el-dialog>
        <personalToCompanyDialog router-type="fodder" :current-name.sync="turnTemplateData.catalogName"
                                 :key-id="turnTemplateData.relatedId"
                                 :setting-flag.sync="turnFlag"></personalToCompanyDialog>
        <el-dialog  width="440px" :visible.sync="previewFlag">
            <img :src="previewImgUrl" alt="" style="width: 400px;">
        </el-dialog>

    </div>
</template>

<script>
    import qs from 'qs'
    import uploadDoc from '~/components/uploadDoc'
    import personalToCompanyDialog from '@/components/personalToCompanyDialog'


    export default {
        name: 'empty-page',
        components: {uploadDoc, personalToCompanyDialog},
        data() {
            return {
                previewFlag: false,
                previewImgUrl: null,

                turnTemplateData: {},
                turnFlag: false,

                deleteList: [],

                currentRelated: null,
                currentFileType: null,
                templateData: [],
                isDocData: [],
                notDocData: [],
                alreadyExistClassify: [],

                setFodderForm: {
                    cusMaterialName: '',
                    cusResTypeId: null,
                    file: null
                },
                fileList: [],

                newFodderFlag: false,

                isDelete: false,

                currentPage: 1,
                pageSize: 12,
                total: 0,
            }
        },
        props: {
            resourceType: {
                type: Number,
            }
        },
        watch: {
            '$props.resourceType': {
                handler() {
                    this.currentRelated = null
                    this.initData()
                },
                deep: true
            }
        },
        computed: {
            //标题名字
            resourceTypeName() {
                switch (this.$props.resourceType) {
                    case 102:
                        return '公司素材'
                    case 103:
                        return '我的素材'
                }
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            openPre(info){
                this.previewFlag = true
                this.previewImgUrl = info.fileId
            },
            onlyTip() {
                this.$message.warning('文档正在解析中，请稍后刷新重试')
            },
            initData() {
                this.deleteList = []
                this.currentPage = 1
                this.getData()
                this.alreadyExistClassify = [
                    {
                        relatedId: null,
                        catalogName: this.$props.resourceType === 102 ? '公司素材' : '个人素材',
                        type: null
                    }
                ]
            },
            //业绩和人员资质不让删除
            canSelectFn(data) {
                return data.type !== "company_material_perform" && data.type !== "company_material_personnel_qualification"
            },
            //获取分类数据
            getData() {
                this.isDocData = []
                this.notDocData = []
                const prm = {
                    "pageParam": {
                        "pageNum": this.currentPage,
                        "pageSize": this.pageSize
                    },
                    "relatedId": this.currentRelated,
                    "resourceType": this.resourceType,
                    "type": this.currentFileType,
                    callScenario: 2
                }
                this.$axios[this.$apiURL.markDocApi.getTemplateFodderData.method](this.$apiURL.markDocApi.getTemplateFodderData.url, prm).then(res => {
                    const {result} = res.data
                    const {list} = result
                    this.templateData = list
                    this.total = result.total
                })
            },
            //新建自定义素材
            addSelfFodderHandle() {
                if (this.fileList.length === 0) {
                    this.$message.warning('必须上传附件')
                    return
                }
                const prm = new FormData()
                prm.append('file', this.fileList[0].raw)
                prm.append('cusMaterialName', this.setFodderForm.cusMaterialName)
                prm.append('cusResTypeId', this.currentRelated)
                prm.append('materialType', this.resourceType === 102 ? 1 : 2)
                this.$axios[this.$apiURL.fodderApi.addSelfDefineFodder.method](this.$apiURL.fodderApi.addSelfDefineFodder.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.getData()
                    this.newFodderFlag = false
                })

            },
            //上传
            uploadFile() {
                this.newFodderFlag = true
                this.fileList = []
                this.setFodderForm.cusMaterialName = ''
            },
            //新建文件夹
            createFold() {
                this.$prompt('请输入文件夹名字', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: '',
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({value}) => {
                    const prm = {
                        cusResImgFileId: '',
                        cusMatTemType: 1,
                        cusResTypeName: value,
                        // cusResTypeId: this.currentRelated
                        pid: this.currentRelated ? this.currentRelated : 0,
                        cusType: parseInt(this.resourceType) === 102 ? 1 : 2
                    }
                    this.$axios[this.$apiURL.fodderApi.addClassify.method](this.$apiURL.fodderApi.addClassify.url, prm).then(res => {
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        this.getData()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    });
                });
            },
            //批量删除
            async multipleDeleteHandle(prm) {
                prm = prm instanceof Array ? prm : this.deleteList

                this.$axios[this.$apiURL.templateApi.searchFileUnderFold.method](this.$apiURL.templateApi.searchFileUnderFold.url, prm).then(searchContent => {
                    console.log('searchContent', searchContent)
                    if (searchContent.data.result) {
                        this.$message.error(`请先删除文件夹${searchContent.data.result}下面的文件`)
                    } else {
                        this.$confirm('此操作将永久删除该文件夹和文件夹下面的数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$axios[this.$apiURL.fodderApi.multipleDeleteNode.method](this.$apiURL.fodderApi.multipleDeleteNode.url, prm).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getData()
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                    }
                })
            },
            //获取小分类下面的数据
            getInnerClassifyData(info) {
                //前往业绩管理
                if (info.type === 'company_material_perform') {
                    this.$router.push({
                        path: '/personalCenter/personalCenter/performanceList'
                    })
                }
                //前往公司资质管理
                else if (info.type === 'company_material_personnel_qualification') {
                    this.$router.push({
                        path: '/personalCenter/personalCenter/members'
                    })
                }
                this.currentRelated = info.relatedId
                this.currentFileType = info.type
                this.alreadyExistClassify.push(info)
                this.currentPage = 1
                this.getData()
            },
            //点击面包屑获取数据
            goToInnerClassifyData(info) {
                if (info.relatedId === this.currentRelated) return
                let idx1 = 0
                this.alreadyExistClassify.forEach((item, idx) => {
                    if (item.relatedId === info.relatedId) {
                        idx1 = idx
                    }
                })
                this.alreadyExistClassify.splice(idx1 + 1)
                this.currentRelated = info.relatedId
                this.currentFileType = info.type
                this.currentPage = 1
                this.getData()
            },
            //操作目录
            handleCommand(command, info) {
                switch (command) {
                    case 'delete':
                        this.multipleDeleteHandle([{
                            keyId: info.relatedId,
                            typeName: info.type
                        }])
                        break
                    case 'rename':
                        if (info.isMatTem) {
                            this.renameDocOpen(info)
                        } else {
                            this.renameOpen(info)
                        }
                        break
                    case 'setToCompany':
                        this.turnOpen(info)
                        break
                }
            },
            //将个人素材设置为公司模板
            turnOpen(info) {
                this.turnTemplateData = info
                this.turnFlag = true
            },
            //删除小分类
            deleteHandle(info) {
                this.$confirm('此操作将永久删除该文件夹和文件夹下面的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = [info.relatedId]
                    this.$axios[this.$apiURL.fodderApi.deleteClassify.method](this.$apiURL.fodderApi.deleteClassify.url, prm).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getData()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //删除文档
            deleteDocHandle(info) {
                this.$confirm('此操作将永久删除该文件夹和文件夹下面的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        cusMaterialId: info.relatedId
                    })
                    this.$axios[this.$apiURL.fodderApi.deleteSelfDefineFodder.method](this.$apiURL.fodderApi.deleteSelfDefineFodder.url, prm).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getData()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //重命名
            renameOpen(info) {
                console.log('11', info);
                this.$prompt('请输入文件夹名字', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: '',
                    inputValue: info.catalogName,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({value}) => {
                    const prm = {
                        cusResImgFileId: '',
                        cusMatTemType: 1,
                        cusResTypeName: value,
                        cusResTypeId: info.relatedId,
                        type: info.type
                    }
                    this.$axios[this.$apiURL.fodderApi.editClassify.method](this.$apiURL.fodderApi.editClassify.url, prm).then(res => {
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        this.getData()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    });
                });
            },
            //重命名文档
            renameDocOpen(info) {
                console.log('11', info);
                this.$prompt('请输入文件名字', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: '',
                    inputValue: info.catalogName,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({value}) => {
                    const prm = {
                        "cusMaterialId": info.cusMaterialId,
                        "cusMaterialName": value,
                        "cusResTypeId": info.cusResTypeId
                    }
                    this.$axios[this.$apiURL.fodderApi.updateSelfDefineFodder.method](this.$apiURL.fodderApi.updateSelfDefineFodder.url, prm).then(res => {
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        this.getData()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    });
                });
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.getData()
            },
            handleCurrentChange(cur) {
                this.currentPage = cur
                this.getData()
            },
            handleSelectionChange(sel) {
                console.log(sel)
                this.deleteList = []
                if (sel.length > 0) {
                    sel.forEach(item => {
                        this.deleteList.push({
                            keyId: item.relatedId,
                            typeName: item.type
                        })
                    })
                }

            }

        }
    }
</script>
<style lang="less" scoped>
    .template-or-material {
        width: 100%;
        min-height: 100%;
        background: #fff;
        padding: 30px;
        margin-top: -20px;

        .temp-material-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 24px;
            font-family: @fontBoldMc;
            font-weight: bold;
            color: #1E2738;
            margin-bottom: 24px;

            .el-button {
                width: 120px;
                height: 40px;
            }
        }

        .temp-material-tab {
            padding: 0 0 0 27px;

            .temp-material-content {
                .router-nav-wrapper {
                    display: flex;
                    margin-top: 15px;
                    align-items: center;

                    .back-wrapper {
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        font-size: 14px;
                        font-family: @fontMc;
                        color: #3272FF;

                        img {
                            width: 12px;
                            height: 11px;
                            margin-right: 6px;
                        }
                    }

                    .separator-line {
                        width: 1px;
                        height: 13px;
                        background: @activeColor;
                        margin: 0 13px;
                    }

                    .nav-wrapper {
                        font-size: 14px;
                        font-family: @fontMc;
                        color: #596177;
                        display: flex;

                        .nav-item {
                            cursor: pointer;

                            &:hover {
                                color: @activeColor;
                            }

                            .right-arrow {
                                margin: 0 4px;
                            }
                        }
                    }
                }

                .file-table {
                    margin-top: 25px;

                    .type-wrapper {
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        font-family: @fontMc;
                        color: #313748;
                        cursor: pointer;
                        text-decoration: none;

                        &.tag {
                            color: @activeColor;
                        }

                        img {
                            width: 25px;
                            height: 24px;
                            margin-right: 20px;
                        }
                    }

                    .opt-dropdown {
                        /* &:hover{
                             img{
                                 &.hover-icon{
                                     display: block;
                                 }
                                 &.normal-icon{
                                     display: none;
                                 }
                             }
                         }*/

                        img {
                            width: 23px;
                            height: 23px;
                            cursor: pointer;

                            &.hover-icon {
                                display: none;
                            }

                            &.normal-icon {
                                display: block;
                            }
                        }
                    }
                }

                .page-wrapper {
                    margin: 15px 0;
                }
            }
        }
    }
</style>
