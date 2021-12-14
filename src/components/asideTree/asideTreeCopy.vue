<template>
    <div class="asideTree" :style="asideTreeStyle">
        <div v-if="isCreate" class="create-menu">
            <div ref="test" class="left-create">
                <el-tooltip class="item" effect="dark" content="添加子目录" placement="bottom-end">
                    <img @click="append(currentNodeItemInfo)" class="create-page"
                         src="~/assets/newMarkDoc/left_nav_icon_addpage@2x.png" alt="">
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="添加同级目录" placement="bottom-end">
                    <img @click="appendGradeTitle(bidDocId)" class="create-folder"
                         src="~/assets/newMarkDoc/left_nav_icon_addfile@2x.png" alt="">
                </el-tooltip>
            </div>
            <el-tooltip v-if="treeExpandAllFlag" class="item" effect="dark" content="收起所有目录" placement="bottom-end">
                <img @click="changeTreeExpandAllFlag(content,false)" class="expand-packup"
                     src="~/assets/template/_retract@2x.png" alt="">
            </el-tooltip>
            <el-tooltip v-else class="item" effect="dark" content="展开所有目录" placement="bottom-end">
                <img @click="changeTreeExpandAllFlag(content,true)" class="expand-packup"
                     src="~/assets/template/open@2x.png" alt="">
            </el-tooltip>
            <!--<img @click="changeTreeExpandAllFlag(content,false)" v-if="treeExpandAllFlag" class="expand-packup"
                 src="~/assets/template/_retract@2x.png" alt="">
            <img @click="changeTreeExpandAllFlag(content,true)" v-else class="expand-packup"
                 src="~/assets/template/open@2x.png" alt="">-->
        </div>
        <div ref="asideTree" id="asideTree" :style="{'height':isCreate?'calc(100% - 51px)':'100%'}" class="file-tree">
            <div class="doc-name">{{title}}</div>
            <el-tree
                    ref="contentTree"
                    class="file-info-tree"
                    :data="tempContent"
                    :props="treeOptions"
                    node-key="bidDocCatalogId"
                    :default-expanded-keys="expandNodeList"
                    :draggable="canDragFlag"
                    @node-expand="nodeExpand"
                    @node-collapse="nodeCollapse"
                    :default-expand-all="false"
                    @node-drag-start="contentNodeDragStart"
                    @node-drag-enter="contentNodeDragEnter"
                    @node-drag-leave="contentNodeDragLeave"
                    @node-drag-over="contentNodeDragOver"
                    @node-drag-end="contentNodeDragEnd"
                    @node-drop="contentNodeDragDrop"
                    :expand-on-click-node="false">
                <div :id="'nodeItem'+data[treeOptions.value]"
                     :class="{'custom-tree-node':true,'nodeActive':currentCheckedNode===data[treeOptions.value] || (currentNodeItemInfo&&(currentNodeItemInfo[treeOptions.value]===data[treeOptions.value]||currentEditItemId===data[treeOptions.value]))}"
                     slot-scope="{ node, data }" @click="showData(node,data)">
                    <div class="content-item-left">
                        <img class="fold-icon" v-if="data.sonCatalog&&data.sonCatalog.length>0||node.level===1"
                             src="~/assets/template/menu1.png" alt="">
                        <img class="fold-icon" v-else
                             src="~/assets/template/menu2.png" alt="">
                        <img class="fold-icon-hover" v-if="data.sonCatalog&&data.sonCatalog.length>0||node.level===1"
                             src="~/assets/template/menu1_select.png" alt="">
                        <img class="fold-icon-hover" v-else
                             src="~/assets/template/menu2_select.png" alt="">
                        <!-- <img class="fold-icon" v-if="data.sonCatalog&&data.sonCatalog.length>0"
                              src="~/assets/template/icon_file_open@2x.png" alt="">
                         <img class="fold-icon-hover" v-if="data.sonCatalog&&data.sonCatalog.length>0"
                              src="~/assets/template/icon_file_selected@2x.png" alt="">
                         <img class="file-icon" v-if="data.sonCatalog&&data.sonCatalog.length===0"
                              src="~/assets/template/icon_sub_normal@2x.png" alt="">
                         <img class="file-icon-hover" v-if="data.sonCatalog&&data.sonCatalog.length===0"
                              src="~/assets/template/icon_sub_selected@2x.png" alt="">-->
                        <div v-if="currentEditItemId!==data[treeOptions.value]" class="file-name"
                             @dblclick="contentBeEdit(node,data)">
                            {{ data.catalogName }}
                        </div>
                        <el-input v-else :id="'dbNodeInput'+data[treeOptions.value]" class="file-name filename-input"
                                  v-model="currentEditItemLabel" @blur="blurFileName(node,data,'blur')"
                                  @keydown.enter.native="blurFileName(node,data,'enter')"></el-input>
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
                            <div class="popper-item" @click="append(data,node)">添加目录文档</div>
                            <div class="popper-item" @click="addFileDoc(data)">添加一个菜单</div>
                            <div class="popper-item" @click="openSetFodderDialog(data)">设为素材</div>
                            <div class="popper-item">
                                <el-popconfirm
                                        :title="'确定删除  '+data.catalogName+'  该条信息吗？'"
                                        @confirm="removeNode(data)"
                                >
                                    <span slot="reference">删除目录对应文档</span>
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

        <commonSetDialog
                :is-bid-doc="true"
                router-type="sysFodder"
                :type.sync="currentType"
                :key-id="setFodderForm.bidDocCatalogId"
                :setting-flag.sync="setFoldToFodderFlag"
                :current-name.sync="setFodderForm.cusMaterialName"></commonSetDialog>

    </div>
</template>

<script>
    import commonSetDialog from '~/components/commonSetDialog'
    import qs from 'qs'

    export default {
        name: 'asideTree',
        data() {
            return {
                enterpriseInfoArray: ['company_material_account_permission', 'company_material_business_license', 'company_material_legal_person'],

                canDragFlag: true,

                isAgainFlag: false,

                currentType: 2,

                formLabelWidth: '100px',
                currentNodeItemInfo: null,
                currentEditItemId: null,
                currentEditItemLabel: null,
                currentDocId: null,
                currentTreeStatus: 1,//1 表示展开，2 表示收起
                treeExpandAllFlag: false,//目录是否全部展开
                asideTreeStyle: '',
                tempClassList: '',
                newContentData: null,
                optType: 'edit', //绑定input 失焦事件类型，默认是从直接编辑时失焦
                dragOption: {
                    'isNotMerge': false,
                    "isInsert": false,
                    "keyId": null,
                    "moveKeyId": null
                },
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

                expandNodeList: [],
                scrollHeightVal: 0,

                // tempContent: [],//目录树

            }
        },
        components: {commonSetDialog},
        props: {
            endEvent: {},
            startEvent: {},
            startNode: {},
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
            treeOptions: {
                type: Object,
                required: true
            },
            title: {
                type: String
            },
            content: {
                type: Array,
                required: true
            },
            aboutIdParam: {
                type: String,
                default: 'catalogEnc'
            },
            fileId: {
                type: String,
                required: true
            },
            isChangeContent: {
                type: Boolean,
                default: false
            },
            currentCheckedNode: {
                // type: String
            },
            bidDocId: {
                type: String
            },
            isDeleteFlag: {
                type: Boolean
            },
            resourceType: {
                type: Number
            }
        },
        computed: {
            floatIconPlacement() {
                return this.$props['floatIconOption'].placement
            },
            tempContent() {
                return this.$props.content
            }
        },
        watch: {
            '$props.content': {
                handler(val) {
                    if (val && val.length > 0 && !this.$props.currentCheckedNode) {
                        this.$emit("update:currentCheckedNode", val[0].bidDocCatalogId)
                        if (val[0].catalogEnc || val[0].catalogEnc.length > 0) {
                            this.$emit('update:fileId', val[0].catalogEnc[0].fileId)
                        }
                    }
                    this.initTreeContent()
                },
                deep: true
            },
            '$props.startNode': {
                handler(info) {
                    if (info) {
                        let event1 = this.$props.startEvent
                        let nodee = info
                        /*this.$store.commit('SET_START_NODE',info)
                        this.$store.commit('SET_START_EVENT',event1)*/
                        this.$refs.contentTree.$emit('tree-node-drag-start', event1, {node: nodee})
                    }
                },
                deep: true
            },
            '$props.endEvent': {
                handler(info) {
                    if (info) {
                        this.$refs.contentTree.$emit('tree-node-drag-end', info)
                    }
                },
                deep: true
            },
        },
        methods: {
            //获取目录树
            /* async getContentTreeData() {
                 const prm = qs.stringify({
                     bidDocId: this.$props.bidDocId
                 })
                 let content = await this.$axios[this.$apiURL.markDocApi.checkMarkDocContent.method](this.$apiURL.markDocApi.checkMarkDocContent.url, prm)
                 this.tempContent = content.data.result
             },*/
            initTreeContent() {
                this.$refs.asideTree.scrollTop = this.scrollHeightVal
                /*this.expandNodeList.forEach(item => {
                    console.log('节点', temp,this.$refs['contentTree'].store.nodesMap[item])
                    this.$refs['contentTree'].store.nodesMap[item].expanded = true
                })*/
            },
            getScrollTop() {
                this.scrollHeightVal = this.$refs.asideTree.scrollTop
            },
            //设置默认展开的节点
            nodeExpand(data, node, ref) {
                console.log('我执行了吗')
                this.expandNodeList.push(data.bidDocCatalogId)
            },
            nodeCollapse(data, node, ref) {
                for (let i = 0; i < this.expandNodeList.length; i++) {
                    if (this.expandNodeList[i] === data.bidDocCatalogId) {
                        this.expandNodeList.splice(i, 1)
                        return
                    }
                }
            },

            //打开素材对话框
            openSetFodderDialog(data) {
                this.setFoldToFodderFlag = true
                this.setFodderForm.cusMaterialName = data.catalogName
                this.setFodderForm.bidDocCatalogId = data.bidDocCatalogId
            },
            //数项点击事件
            showData(node, data) {
                console.log(node, data)
                this.currentNodeItemInfo = data
                // this.currentNodeItemId = data[this.$props.treeOptions.value]
                if (data.hasOwnProperty('catalogEnc')) {
                    if (data['catalogEnc'] && data['catalogEnc'].length > 0) {
                        const temp = data['catalogEnc'][0]
                        this.$emit('update:fileId', temp.fileId)

                    } else {
                        this.$emit('update:fileId', '')
                    }
                }
                this.$emit("update:currentCheckedNode", data.bidDocCatalogId)
            },
            //双击事件
            contentBeEdit(node, data) {
                this.optType = 'edit'
                this.canDragFlag = false
                this.currentEditItemId = data[this.$props.treeOptions.value]
                this.currentEditItemLabel = data[this.$props.treeOptions.label]
            },
            //input 失焦事件
            blurFileName(node, data, from) {
                this.canDragFlag = true
                if (this.isAgainFlag) {
                    this.isAgainFlag = false
                    return
                }
                const ev = window.event
                this.currentEditItemId = null
                const newValue = ev.srcElement.value
                this.isAgainFlag = from === 'enter'
                if (this.optType === 'edit') {
                    const prm = {
                        bidDocId: this.currentDocId,
                        catalogName: newValue,
                        bidDocCatalogId: data.bidDocCatalogId,
                    }
                    this.$axios[this.$apiURL.markDocApi.editMarkDocContent.method](this.$apiURL.markDocApi.editMarkDocContent.url, prm).then(res => {
                        this.$message.success(res.data.msg)
                        this.$emit("update:isChangeContent", true)
                        this.$emit("update:currentCheckedNode", data.bidDocCatalogId)
                        this.getScrollTop()
                    })
                } else {
                    const prm = {
                        bidDocId: this.newContentData.bidDocId,
                        catalogName: newValue,
                        pid: this.newContentData.pid,
                    }
                    this.$axios[this.$apiURL.markDocApi.addMarkDocContent.method](this.$apiURL.markDocApi.addMarkDocContent.url, prm).then(res => {
                        const {result} = res.data
                        this.$message.success(res.data.msg)
                        this.$emit("update:isChangeContent", true)
                        this.$emit("update:currentCheckedNode", result.bidDocCatalogId)
                        this.$emit("update:fileId", '')
                        this.getScrollTop()
                    })
                }

                console.log('我失焦了', newValue)
            },
            //添加子文档
            addFileDoc(data) {
                this.$store.commit('tree/SET_REF_COMMENT', this.$refs.contentTree)
                data = data || this.$props.content[0]
                const prm = qs.stringify({
                    bidDocCatalogId: data.bidDocCatalogId
                })
                this.$axios[this.$apiURL.markDocApi.addEmptyContentDoc.method](this.$apiURL.markDocApi.addEmptyContentDoc.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.$emit("update:isChangeContent", true)
                    this.$emit("update:currentCheckedNode", data.bidDocCatalogId)
                    this.$emit("update:fileId", res.data.result.catalogEnc[0].fileId)
                })
            },
            //添加子标题
            append(data, node) {
                this.optType = 'add'
                if (!data && this.$props.content.length === 0) {
                    this.$message.warning("请先添加一级标题！")
                    return
                }
                data = data || this.$props.content[0]
                this.nodeExpand(data)
                this.$refs['contentTree'].store.nodesMap[data.bidDocCatalogId].expanded = true
                const newId = 2
                const newCName = '新增标题'
                let newData = {
                    bidDocCatalogId: newId,
                    catalogName: newCName,
                    sonCatalog: []
                }
                this.$refs['contentTree'].append(newData, data)
                this.currentEditItemId = newId
                this.currentEditItemLabel = newCName
                this.$nextTick(() => {
                    document.querySelector(`#dbNodeInput${newId}`).focus()
                    this.newContentData = {
                        bidDocCatalogId: null,
                        bidDocId: data.bidDocId,
                        catalogName: newCName,
                        pid: data.bidDocCatalogId,
                    }
                })
            },
            //添加一级标题
            appendGradeTitle(id) {
                this.optType = 'add'
                const newId = 3
                const newCName = '新增一级标题'
                let newData = {
                    bidDocCatalogId: newId,
                    catalogName: newCName,
                    sonCatalog: []
                }
                this.tempContent.length === 0 ? this.tempContent.push(newData) : this.$refs['contentTree'].insertAfter(newData, this.$props.content[this.$props.content.length - 1])
                this.currentEditItemId = newId
                this.currentEditItemLabel = newCName
                this.$nextTick(() => {
                    document.querySelector(`#dbNodeInput${newId}`).focus()
                    this.newContentData = {
                        bidDocCatalogId: null,
                        bidDocId: id,
                        catalogName: newCName,
                        pid: '',
                    }
                })
            },
            //删除节点
            removeNode(data) {
                const prm = qs.stringify({
                    bidDocCatalogId: data.bidDocCatalogId
                })
                this.$axios[this.$apiURL.markDocApi.deleteMarkDocContent.method](this.$apiURL.markDocApi.deleteMarkDocContent.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.$refs['contentTree'].remove(data.bidDocCatalogId)
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
            //节点拖拽事件
            //节点开始拖拽事件
            contentNodeDragStart(node, event) {
                this.$emit("update:startEvent", null)
                this.$emit("update:startNode", null)
                console.log('开始拖拽=======================', node, event)
            },
            //节点拖拽进入其他节点触发事件
            contentNodeDragEnter(node, staticNode, event) {
                console.log('拖拽进入其他节点', node, staticNode, event)
            },
            //节点拖拽离开某个节点触发事件
            contentNodeDragLeave(node, staticNode, event) {
                console.log('节点离开某个节点', node, staticNode, event)
            },
            //节点拖拽到其他节点上触发事件
            contentNodeDragOver(node, staticNode, event) {
                // console.log('节点拖拽到其他节点',node,staticNode,event)
            },
            //节点拖拽结束时触发事件
            contentNodeDragEnd(node, staticNode, position, event) {
                console.log('节点拖拽结束', node, staticNode, position, event)
            },
            //节点拖拽成功完成时触发事件
            contentNodeDragDrop(node, staticNode, position, event) {
                this.$emit("update:endEvent", null)
                console.log('节点拖拽完成==============', node, staticNode, position, event)
                if (!staticNode) return false
                console.log('节点拖拽完成++++++++++++++++', node, staticNode, position, event)
                //公司素材
                if (node.data.type === 'company_material_personnel_qualification') {
                    this.$emit('memberCerFn', staticNode.data.bidDocCatalogId, position)
                    return false
                }
                //业绩
                if (node.data.type === 'company_material_perform') {
                    this.$emit('performFn', staticNode.data.bidDocCatalogId, position)
                    return false
                }
                //公司信息
                if (this.enterpriseInfoArray.indexOf(node.data.type) > -1) {
                    // this.$emit('performFn', staticNode.data.bidDocCatalogId, position)
                    const prm = {
                        "bidDocId": this.$props.bidDocId,
                        "isNotMerge": position === 'inner',
                        "moveKeyId": staticNode.data.relatedId,
                        "type": node.data.type
                    }
                    this.$axios[this.$apiURL.markDocApi.makeDocByEnterpriseInfo.method](this.$apiURL.markDocApi.makeDocByEnterpriseInfo.url, prm).then(res => {
                        this.$message.success(res.data.msg)
                        this.$emit('update:isChangeContent', true)
                    }).catch(err => {
                        return fasle
                    })

                    return false
                }
                if (node.data.type) {
                    const prm = {
                        "bidDocId": this.$props.bidDocId,
                        "isNotMerge": position === 'inner',
                        "keyId": node.data.relatedId,
                        "moveKeyId": staticNode.data.bidDocCatalogId,
                        "pid": position === 'inner' ? staticNode.data.bidDocCatalogId : staticNode.data.pid,
                        "type": node.data.type
                        // "type": temp
                    }
                    this.getScrollTop()
                    this.$axios[this.$apiURL.markDocApi.getDataToFolder.method](this.$apiURL.markDocApi.getDataToFolder.url, prm).then(res => {
                        this.$message.success(res.data.msg)
                        this.$emit('update:isChangeContent', true)
                    }).catch(err => {
                        return fasle
                    })

                } else {
                    const prm = {
                        isNotMerge: position === 'inner',
                        keyId: node.data.bidDocCatalogId,
                        moveKeyId: staticNode.data.bidDocCatalogId,
                        isInsert: false,
                    }
                    this.getScrollTop()
                    this.$axios[this.$apiURL.markDocApi.sortMarkDocContent.method](this.$apiURL.markDocApi.sortMarkDocContent.url, prm).then(res => {
                        this.$message.success(res.data.msg)
                        this.$emit('update:isChangeContent', true)
                    }).catch(err => {
                        return fasle
                    })
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
                const id = this.$props.treeOptions.value
                const children = this.$props.treeOptions.children
                data.forEach(item => {
                    let temp = item[id]
                    console.log(temp)
                    this.$refs['contentTree'].store.nodesMap[temp].expanded = flag
                    item[children] && item[children].length > 0 ? this.changeTreeExpandAllFlag(item[children], flag) : ''
                })
            },
            //由于position absolute和overflow会有冲突，产生bug，会将内部元素撑开，产生横向滚动条，故不采用
            //菜单弹出
            showContent(node, data) {
                let currentNode = document.querySelector('#nodeItem' + data[this.$props.treeOptions.value])
                currentNode.parentNode.classList.add('hoverClass')
            },
            //菜单隐藏
            hideContent(node, data) {
                let currentNode = document.querySelector('#nodeItem' + data[this.$props.treeOptions.value])
                currentNode.parentNode.classList.remove('hoverClass')
            }
        }
    }
</script>
<style lang="less">
    .asideTree {
        width: 310px;
        height: 100%;
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

        .setFodderDialog {
            .el-dialog__header {
                background: #FAFDFF;

                .el-dialog__title {
                    font-size: 15px;
                    color: #333333;
                }
            }

            .el-dialog__body {
                display: flex;
                justify-content: center;
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

            .el-dialog__footer {
                display: flex;
                align-items: center;
                justify-content: center;

                .el-button {
                    width: 130px;
                }
            }
        }

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
                font-size: 14px;
                font-weight: bold;
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

                    .el-tree-node__expand-icon {
                        -color: #4880FF;
                        color: #b4b5b5;

                        &.is-leaf {
                            color: transparent;
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

                        /*暂时注释*/

                        .fold-icon {
                            display: none !important;
                        }

                        .fold-icon-hover {
                            display: block !important;
                        }

                        /* .file-icon {
                             display: none !important;
                         }

                         .file-icon-hover {
                             display: block !important;
                         }*/
                    }

                    .content-item-left {
                        max-width: 223px;
                        display: flex;
                        align-items: center;

                        img {
                            margin: 0 12px 0 0;
                        }

                        .fold-icon {
                            /*width: 26px;
                            height: 26px;*/
                            /*width: 20px;
                            height: 19px;*/
                            display: block;
                        }

                        .fold-icon-hover {
                            /*width: 20px;
                            height: 19px;*/
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
            background: #fff;
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
