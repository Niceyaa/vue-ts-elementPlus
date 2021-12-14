<template>
    <div class="asideTree" :style="asideTreeStyle">
        <div v-if="[101,201].indexOf(resourceType)===-1" class="create-menu">
            <div class="left-create">
                <el-tooltip class="item" effect="dark" content="添加子标题" placement="bottom-end">
                    <img @click="append(currentNodeItemInfo)" class="create-page"
                         src="../../assets/template/icon_add_normal@2x.png" alt="">
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="添加一级标题" placement="bottom-end">
                    <img @click="appendGradeTitle(relatedId)" class="create-folder"
                         src="../../assets/template/icon_file_small_normal@2x.png" alt="">
                </el-tooltip>
            </div>
            <img @click="changeTreeExpandAllFlag(templateOrFodderData,false)" v-if="treeExpandAllFlag" class="expand-packup"
                 src="../../assets/template/_retract@2x.png" alt="">
            <img @click="changeTreeExpandAllFlag(templateOrFodderData,true)" v-else class="expand-packup"
                 src="../../assets/template/open@2x.png" alt="">
        </div>
        <div :style="{'height':[101,201].indexOf(resourceType)===-1?'calc(100% - 51px)':'100%'}" class="file-tree">
            <el-tree
                    ref="fileTree"
                    class="file-info-tree"
                    :data="templateOrFodderData"
                    :props="defaultProps"
                    node-key="nodeId"
                    :default-expand-all="true"
                    :expand-on-click-node="false">
                <div :id="'nodeItem'+data.nodeId"
                     :class="{'custom-tree-node':true,'nodeActive':currentCheckedNode===data.nodeId || (currentNodeItemInfo&&(currentNodeItemInfo.nodeId===data.nodeId||currentEditItemId===data.nodeId))}"
                     slot-scope="{ node, data }" @click="showData(node,data)">
                    <div class="content-item-left">
                        <!-- <img class="fold-icon" v-if="data.catalogGrade===1"
                              src="../../assets/template/icon_file_open@2x.png" alt="">
                         <img class="fold-icon-hover" v-if="data.catalogGrade===1"
                              src="../../assets/template/icon_file_selected@2x.png" alt="">
                         <img class="file-icon" v-if="data.catalogGrade===2"
                              src="../../assets/template/icon_sub_normal@2x.png" alt="">
                         <img class="file-icon-hover" v-if="data.catalogGrade===2"
                              src="../../assets/template/icon_sub_selected@2x.png" alt="">-->
                        <div v-if="currentEditItemId!==data.nodeId" class="file-name"
                             @dblclick="contentBeEdit(node,data)">
                            {{ data.nodeName }}
                        </div>
                        <el-input v-else :id="'dbNodeInput'+data.nodeId" class="file-name filename-input"
                                  v-model="currentEditItemLabel" @blur="blurFileName(node,data)"></el-input>
                    </div>
                    <div
                            class="function-menus">
                        <el-popover
                                ref=""
                                @show="showContent(node,data)"
                                @hide="hideContent(node,data)"
                                width="100px"
                                trigger="hover"
                                popper-class="function-popover"
                                placement="right-start">
                            <div v-if="resourceType===101" class="popper-item" @click="append(data,node)">设为公司素材</div>
                            <div v-if="resourceType===101" class="popper-item" @click="openSetFodderDialog(data)">设为自定义素材</div>
                            <div v-if="resourceType===201" class="popper-item" @click="append(data,node)">设为公司模板</div>
                            <div v-if="resourceType===201" class="popper-item" @click="openSetFodderDialog(data)">设为自定义模板</div>

                            <div v-if="resourceType!==101&&resourceType!==201" class="popper-item" @click="append(data,node)">添加子标题</div>
                            <div v-if="resourceType!==101&&resourceType!==201" class="popper-item" @click="addFileDoc(data)">添加子文档</div>
                            <!--<div v-if="resourceType!==101&&resourceType!==201" class="popper-item" @click="openSetFodderDialog(data)">设为素材</div>-->
                            <!--<div v-if="resourceType!==101&&resourceType!==201" class="popper-item" @click="openSetFodderDialog(data)">设为素材</div>-->
                            <div v-if="resourceType!==101&&resourceType!==201" class="popper-item">
                                <el-popconfirm
                                        :title="'确定删除  '+data.nodeName+'  该条信息吗？'"
                                        @confirm="removeNode(data)"
                                >
                                    <span slot="reference">删除</span>
                                </el-popconfirm>
                            </div>
                            <div class="trigger-menu" slot="reference">
                                <div class="target-point"></div>
                                <div class="target-point"></div>
                                <div class="target-point"></div>
                            </div>
                        </el-popover>
                    </div>
                </div>
            </el-tree>
        </div>
        <div :style="floatIconPlacement==='right'?{'right':'-22px'}:{'left':'-22px'}" @click="expandPackTree()"
             v-if="currentTreeStatus===2" class="tree-expand">
            <img src="@/assets/template/icon_open@2x.png" alt="">
        </div>
        <div :style="floatIconPlacement==='right'?{'right':'-22px','border-radius':'0px 22px 22px 0px'}:{'left':'-22px','border-radius':'22px 0px 0px 22px'}"
             @click="expandPackTree()" v-if="currentTreeStatus===1" class="tree-expand">
            <img src="@/assets/template/icon_close@2x.png" alt="">
        </div>
        <commonSetDialog :current-name.sync="setFodderForm.cusMaterialName" :settingData="fodderClassifyData" :setting-props="fodderClassifyProps" :setting-flag.sync="setFoldToFodderFlag" :current-select-id.sync="setFodderForm.cusResTypeId" @handleFn="saveFodderHandle"></commonSetDialog>
    </div>
</template>

<script>
    import commonSetDialog from '../../components/commonSetDialog'
    import {
        getDataToFolder,
        addMarkDocContent,
        editMarkDocContent,
        sortMarkDocContent,
        addEmptyContentDoc,
        deleteMarkDocContent,
        getTemplateFodderData
    } from "../../api/markDocApi";
    import { getFileIdByRelatedId } from "../../api/commonApi";
    import { setSysToSelfTemplate } from "../../api/templateApi";
    import {setFoldToFodder, getFodderClassify, setSysFodderToSelfFodder, getFodderOrTemplateTree,deleteFodderNode,addFodderNode,updateFodderNode,addEmptyWord} from "../../api/fodderApi";
    import qs from 'qs'

    export default {
        name: 'asideTree',
        components:{commonSetDialog},
        data() {
            return {
                currentCheckedNode: null,
                defaultProps: {
                    label: 'nodeName',
                    value: 'nodeId',
                    children: 'sonNode'
                },
                formLabelWidth: '100px',
                currentNodeItemInfo: null,
                currentEditItemId: null,
                currentEditItemLabel: null,
                currentDocId: null,
                currentTreeStatus: 1,//1 表示展开，2 表示收起
                treeExpandAllFlag: true,//目录是否全部展开
                asideTreeStyle: '',
                tempClassList: '',
                newContentData: null,
                optType: 'edit', //绑定input 失焦事件类型，默认是从直接编辑时失焦

                fodderClassifyData: [],
                fodderClassifyProps:{
                    value:'cusResTypeId',
                    label:'cusResTypeName',
                    children:'treeList',
                    emitPath: false,
                    checkStrictly: true
                },
                currentSelectFodderId: null,
                setFoldToFodderFlag: false, // 设置自定义素材Flag
                setFodderForm: {
                    cusMaterialName: null,
                    cusResTypeId: null,
                    materialId: null,
                },
                setFodderFRules: {
                    cusMaterialName: [
                        {required: true, message: '请填写自定义素材名称', trigger: 'blur'}
                    ],
                    cusResTypeId: [
                        {required: true, message: '请选择自定义素材类型', trigger: 'change'}
                    ],
                },

                templateOrFodderData: [],
                currentPage: 1,
                pageSize: 10

            }
        },
        props: {
            isCreate: {
                type: Boolean,
                default: false
            },
            floatIconOption: {
                type: Object,
                default: () => {
                    return {placement: 'right', isShow: true}
                }
            },
            isDeleteFlag: {
                type: Boolean
            },
            resourceType: {
                type: Number,
                default: 101 // 101系统素材 102公司素材 103个人素材 201系统模板 202公司模板 203个人模板
            },
            relatedId: {
                type: String,
            },
            type: {
                type: String,
            },
            fileId: {
                type: String
            },
            currentCheckedNode:{},
            currentNodeItemInfo:{},
            openSetFodderFlag: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            floatIconPlacement() {
                return this.$props['floatIconOption'].placement
            }
        },
        watch:{
          '$props.openSetFodderFlag':{
              handler(val){
                  if (val) {
                      this.openSetFodderDialog()
                  }
              },
              deep: true
          }
        },
        created() {
            this.getTemplateFodderData()
            this.getFodderClassifyData()
        },
        methods: {
            //获取自定义素材分类
            getFodderClassifyData() {
                getFodderClassify().then(res => {
                    this.fodderClassifyData = res.data.result
                })
            },
            //设置自定义素材
            saveFodderHandle(){
                if (!this.setFodderForm.cusResTypeId) {
                    this.$message.warning('请选择存放素材/模板的自定义分类')
                    return
                }
                const prm = {
                    "cusName": this.setFodderForm.cusMaterialName,
                    "cusResTypeId": this.setFodderForm.cusResTypeId,
                    "keyId": this.setFodderForm.materialId
                }
                const fn = this.$props.resourceType===101?setSysFodderToSelfFodder:setSysToSelfTemplate
                fn(prm).then(res=>{
                    this.$message.success(res.data.msg)
                    this.setFoldToFodderFlag = false
                    this.emit('update:openSetFodderFlag',false)
                })
            },
            //打开设置自定义素材弹窗
            openSetFodderDialog(data){
                data = data?data:this.$props.currentNodeItemInfo
                this.setFodderForm.cusResTypeId = null
                this.setFodderForm.cusMaterialName = data.nodeName
                this.setFodderForm.materialId = data.nodeId
                this.setFoldToFodderFlag = true
            },
            getTemplateFodderData(){
                const prm = qs.stringify({
                    type: this.$props.type,
                    "relatedId": this.$props.relatedId,
                })
                getFodderOrTemplateTree(prm).then(res => {
                    this.templateOrFodderData = res.data.result
                })
            },

            //数项点击事件
            showData(node, data) {
                console.log(12121212,data)
                this.currentNodeItemInfo = data
                // this.currentNodeItemId = data[this.$props.treeOptions.value]
                // if (data.type === 'res_node') {
                    const prm = qs.stringify({
                        relatedId:data.nodeId
                    })
                    getFileIdByRelatedId(prm).then(res=>{
                        if (res.data.result.length > 0) {
                            this.$emit('update:fileId', res.data.result[0])
                            this.$emit("update:currentCheckedNode", data.nodeId)
                            this.$emit("update:currentNodeItemInfo", data)
                        }else{
                            this.$emit('update:fileId','')
                            this.$emit("update:currentNodeItemInfo", data)
                        }
                    })
                // }else{
                //     this.$emit('update:fileId','')
                // }
            },
            //双击事件
            contentBeEdit(node, data) {
                this.optType = 'edit'
                this.currentEditItemId = data.nodeId
                this.currentEditItemLabel = data.nodeName
            },
            //input 失焦事件
            blurFileName(node, data) {
                const ev = window.event
                this.currentEditItemId = null
                const newValue = ev.srcElement.value
                if (this.optType === 'edit') {
                    const prm = {
                        nodeName: newValue,
                        nodeId: data.nodeId,
                    }
                    updateFodderNode(prm).then(res => {
                        this.$message.success(res.data.msg)

                    this.getTemplateFodderData()
                        this.$emit("update:currentCheckedNode", data.nodeId)
                        this.$emit("update:currentNodeItemInfo", data)
                    })
                } else {
                    const prm = {
                        isMaterial: this.$props.resourceType<200,
                        isSameLevel: !!this.newContentData.isFirstGrade,
                        nodeName: newValue,
                        nodeId: this.newContentData.pid?this.newContentData.pid:null,
                        relatedId:this.$props.relatedId,
                    }
                    addFodderNode(prm).then(res => {
                        const {result} = res.data
                        this.$message.success('新建成功')

                    this.getTemplateFodderData()
                        this.$emit("update:currentCheckedNode", result)
                        this.$emit("update:fileId", '')
                    })
                }

                console.log('我失焦了', newValue)
            },
            //添加子文档
            addFileDoc(data) {
                data = data || this.$props.content[0]
                const prm = qs.stringify({
                    nodeId: data.nodeId
                })
                addEmptyWord(prm).then(res => {
                    this.$message.success(res.data.msg)

                    this.getTemplateFodderData()
                    this.$emit("update:currentCheckedNode", data.nodeId)
                    this.$emit("update:currentCheckedNode", data)
                    const prm = qs.stringify({
                        relatedId:data.nodeId
                    })
                    getFileIdByRelatedId(prm).then(res=>{
                        if (res.data.result.length > 0) {
                            this.$emit('update:fileId', res.data.result[0])
                        }
                    })
                })
            },
            //添加子标题
            append(data, node) {
                this.optType = 'add'
                data = data || this.$props.content[0]
                const newId = 2
                const newCName = '新增标题'
                let newData = {
                    nodeId: newId,
                    nodeName: newCName,
                    sonNode: []
                }
                this.$refs['fileTree'].append(newData, data)
                this.currentEditItemId = newId
                this.currentEditItemLabel = newCName
                this.$nextTick(() => {
                    document.querySelector(`#dbNodeInput${newId}`).focus()
                    this.newContentData = {
                        materialId: data.materialId,
                        nodeName: newCName,
                        pid: data.nodeId,
                    }
                })
            },
            //添加一级标题
            appendGradeTitle(id) {
                this.optType = 'add'
                const newId = 3
                const newCName = '新增一级标题'
                let newData = {
                    nodeId: newId,
                    nodeName: newCName,
                    sonNode: []
                }
                this.templateOrFodderData.length===0?this.templateOrFodderData.push(newData):this.$refs['fileTree'].insertAfter(newData, this.templateOrFodderData[this.templateOrFodderData.length - 1])
                this.currentEditItemId = newId
                this.currentEditItemLabel = newCName
                this.$nextTick(() => {
                    document.querySelector(`#dbNodeInput${newId}`).focus()
                    this.newContentData = {
                        nodeName: newCName,
                        pid: null,
                        isFirstGrade: true
                    }
                })
            },
            //删除节点
            removeNode(data) {
                const prm = qs.stringify({
                    nodeId: data.nodeId
                })
                deleteFodderNode(prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.$refs['fileTree'].remove(data.nodeId)
                    this.$emit("update:isDeleteFlag", false)
                })
            },
            //将目录设置为素材
            setFoldToFodder(data) {
                const prm = {
                    "bidDocCatalogId": 0,
                    "cusMaterialName": "",
                    "cusResTypeId": 0
                }
            },
            //控制侧边栏文件目录展开还是收起
            expandPackTree() {
                if (this.floatIconPlacement === 'right') {
                    this.currentTreeStatus = this.currentTreeStatus === 1 ? 2 : 1
                    this.asideTreeStyle = this.currentTreeStatus === 1 ? 'left:0px;width:310px' : 'left:-310px;width:0px'
                    document.querySelector('.tree-expand').style.right = this.currentTreeStatus === 1 ? '-22px' : "-332px"
                } else {
                    this.currentTreeStatus = this.currentTreeStatus === 1 ? 2 : 1
                    this.asideTreeStyle = this.currentTreeStatus === 1 ? 'right:0px' : 'right:-310px'
                }

            },
            //控制文件展开还是收起
            changeTreeExpandAllFlag(data, flag) {
                this.treeExpandAllFlag = flag
                const id = 'nodeId'
                const children = 'sonNode'
                data.forEach(item => {
                    let temp = item[id]
                    this.$refs['fileTree'].store.nodesMap[temp].expanded = flag
                    item[children] && item[children].length > 0 ? this.changeTreeExpandAllFlag(item[children], flag) : ''
                })
            },
            //由于position absolute和overflow会有冲突，产生bug，会将内部元素撑开，产生横向滚动条，故不采用
            //菜单弹出
            showContent(node, data) {
                let currentNode = document.querySelector('#nodeItem' + data.nodeId)
                currentNode.parentNode.classList.add('hoverClass')
            },
            //菜单隐藏
            hideContent(node, data) {
                let currentNode = document.querySelector('#nodeItem' + data.nodeId)
                currentNode.parentNode.classList.remove('hoverClass')
            }
        }
    }
</script>
<style lang="less">
    .asideTree {
        width: 310px;
        height: 100%;
        max-height: 100%;
        border: 1px solid #F0F2F9;
        border-radius: 4px;
        color: #515151;
        position: relative;
        -left: -310px;
        -webkit-transition: all .5s;
        -moz-transition: all .5s;
        -ms-transition: all .5s;
        -o-transition: all .5s;
        transition: all .5s;

       /* .setFodderDialog {
            .el-dialog__body {
                display: flex;
                justify-content: center;
            }

            .el-dialog__footer {
                display: flex;
                align-items: center;
                justify-content: center;

                .el-button {
                    width: 130px;
                }
            }
        }
*/
        .create-menu {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 10px 0 10px;
            border-bottom: 1px solid #F0F2F9;
            height: 51px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;

            img {
                cursor: pointer;
            }

            .left-create {
                display: flex;

                .create-page {
                    width: 16px;
                    height: 16px;
                    margin: 0 16px 0 0;
                }

                .create-folder {
                    width: 16px;
                    height: 16px;
                }
            }

            .expand-packup {
                width: 15px;
                height: 13px;
            }
        }

        .file-tree {
            width: 310px;
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 10px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;

            &::-webkit-scrollbar {
                /*滚动条整体样式*/
                width: 4px;
                height: 1px;
            }

            &::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
                border-radius: 10px;
                -box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: #E3E5E6;
            }

            /*&::-webkit-scrollbar-track {
                !*滚动条里面轨道*!
                box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                background   : #ededed;
            }*/

            .doc-name {
                font-size: 13px;
                font-weight: 400;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                padding-bottom: 10px;
            }

            .el-tree-node__content {
                -position: relative;

                .action-content {
                    -display: block;
                    z-index: 99999999;
                    position: absolute;
                    top: 0;
                    right: -110px;
                    width: 113px;
                    -height: 149px;
                    background: #FFFFFF;
                    box-shadow: 0px 0px 8px 0px rgba(167, 167, 167, 0.19);
                    border-radius: 2px;
                    padding: 10px 0;

                    .popper-item {
                        height: 29px;
                        line-height: 29px;
                        text-align: center;
                        cursor: pointer;
                        font-size: 12px;
                        font-family: @fontFa;

                        &:hover {
                            background: #FBF4F2;
                            color: @activeColor;
                        }
                    }
                }
            }

            .file-info-tree {
                width: 100%;
                font-size: 13px;

                .el-tree-node__content {
                    height: 30px;

                    &:hover {
                        background: #FBF4F2;
                        border-radius: 4px;

                        .custom-tree-node {
                            .function-menus {
                                display: block !important;
                            }
                        }
                    }

                    &.hoverClass {
                        background: #FBF4F2;
                        border-radius: 4px;

                        .custom-tree-node {
                            .function-menus {
                                display: block !important;
                            }
                        }
                    }
                }

                .el-tree-node__children {
                    overflow: visible;
                }

                .custom-tree-node {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;

                    &.nodeActive {
                        background: #FBF4F2;

                        .file-name {
                            font-weight: bold;
                            color: @activeColor;
                        }

                        .fold-icon {
                            display: none !important;
                        }

                        .fold-icon-hover {
                            display: block !important;
                        }

                        .file-icon {
                            display: none !important;
                        }

                        .file-icon-hover {
                            display: block !important;
                        }
                    }

                    .content-item-left {
                        max-width: 223px;
                        display: flex;
                        align-items: center;

                        img {
                            margin: 0 12px 0 0;
                        }

                        .fold-icon {
                            width: 20px;
                            height: 19px;
                            display: block;
                        }

                        .fold-icon-hover {
                            width: 20px;
                            height: 19px;
                            display: none;
                        }

                        .file-icon {
                            width: 15px;
                            height: 19px;
                            display: block;
                        }

                        .file-icon-hover {
                            width: 15px;
                            height: 19px;
                            display: none;
                        }

                        .file-name {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;

                            &.disBlock {
                                display: block;
                            }

                            &.filename-input {
                                .el-input__inner {
                                    padding: 0;
                                    -webkit-box-sizing: border-box;
                                    -moz-box-sizing: border-box;
                                    box-sizing: border-box;
                                    border: none;
                                    background: #FBF4F2;
                                    border-bottom: 2px solid #F73F37;
                                    border-radius: 0;
                                    display: block;
                                    height: auto;
                                    line-height: 0;
                                }

                            }
                        }
                    }

                    .function-menus {
                        position: absolute;
                        right: 0;
                        top: 9px;
                        display: none;
                        width: 30px;
                        flex: 3px;
                        margin: 0 6px 0 4px;

                        .trigger-menu {
                            display: flex;
                            flex-wrap: wrap;
                            align-items: center;
                            cursor: pointer;

                            .target-point {
                                width: 2px;
                                height: 2px;
                                background: #9A6D61;
                                border-radius: 50%;
                                margin: 0 14px 3px 14px;
                                -padding: 0 9px;

                                &:last-child {
                                    margin-bottom: 0;
                                }
                            }
                        }


                    }

                    .action-content {
                        display: none;
                        z-index: 99999;
                        position: absolute;
                        top: 0;
                        right: -100px;
                        width: 113px;
                        background: #FFFFFF;
                        box-shadow: 0px 0px 8px 0px rgba(167, 167, 167, 0.19);
                        border-radius: 2px;
                        padding: 10px 0;

                        .popper-item {
                            height: 29px;
                            line-height: 29px;
                            text-align: center;
                            cursor: pointer;
                            font-size: 12px;
                            font-family: @fontFa;

                            &:hover {
                                background: #FBF4F2;
                                color: @activeColor;
                            }
                        }
                    }
                }
            }
        }

        .tree-expand {
            position: absolute;
            -right: -22px;
            top: 50%;
            width: 22px;
            height: 117px;
            background: #eee;
            border-radius: 0px 22px 22px 0px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            -webkit-transform: translateY(-58px);
            -moz-transform: translateY(-58px);
            -ms-transform: translateY(-58px);
            -o-transform: translateY(-58px);
            transform: translateY(-58px);

            img {
                width: 7px;
                height: 14px;
            }
        }
    }
</style>
