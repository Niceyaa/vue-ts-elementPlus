<template>
    <div class="templateAsideTree">
        <div style="height:100%}" class="file-tree">
            <el-tree
                    ref="templateOrFodderTree"
                    class="file-info-tree"
                    :props="defaultProps"
                    :data="templateOrFodderData"
                    node-key="relatedId"
                    lazy
                    :load="loadMore"
                    draggable
                    :allow-drag="allowDrag"
                    @node-drag-start="handleDragstart"
                    @node-drag-end="handleDragend"
                    :allow-drop="returnFalse"
                    :expand-on-click-node="false">
                <div :class="{'custom-tree-node':true,'nodeActive':currentNodeItemId===node.id||currentEditItemId===node.id}"
                     slot-scope="{ node, data }" @click="showData(node,data)">
                    <div class="content-item-left">
                        <!--<img class="fold-icon"
                             src="../../assets/template/icon_file_open@2x.png" alt="">
                        <img class="fold-icon-hover" v-if="data.type===1"
                             src="../../assets/template/icon_file_selected@2x.png" alt="">
                        <img class="file-icon" v-if="data.type===2"
                             src="../../assets/template/icon_sub_normal@2x.png" alt="">
                        <img class="file-icon-hover" v-if="data.type===2"
                             src="../../assets/template/icon_sub_selected@2x.png" alt="">-->
                        <img v-if="data.type==='industry'" class="fold-icon"
                             src="@/assets/template/file11.png" alt="">
                        <img v-else-if="!data.isDoc&&data.type!=='company_material_perform'&&data.type!=='company_material_personnel_qualification'" class="fold-icon"
                             src="@/assets/template/file222.png" alt="">
                        <img v-else class="fold-icon"
                             src="@/assets/template/file33.png" alt="">
                        <div class="file-name">
                            {{ node.label }}
                        </div>
                    </div>
                    <!--<img @click="getFileId(data)" v-if="data.fileId" class="preview-doc-icon"
                         src="../../assets/template/preview.png" alt="">-->
                </div>
            </el-tree>
        </div>
    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: 'templateAsideTree',
        data() {
            return {
                currentNodeItemId: null,
                currentEditItemId: null,
                currentEditItemLabel: null,
                defaultProps: {
                    label: 'catalogName',
                    value: 'relatedId',
                    isLeaf: 'leafFlag'
                },
                leftRef: null
            }
        },
        props: {
            templateOrFodderData: {
                type: Array
            },
            currentPage: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 50
            },
            resourceType: {
                type: Number
            },
            previewInfo: {
                type: Object
            },
            endEvent: {},
            startEvent: {},
            startNode: {},
        },
        mounted() {
            this.leftRef = this.$store.state.refComment
            // console.log('右边组件', this.leftRef)
        },
        methods: {
            getFileId(info) {
                this.$emit('update:previewInfo', info)
            },
            loadMore(node, resolve) {
                if (node.level === 0) {
                    return resolve(this.$props.templateOrFodderData)
                }
                const prm = {
                    "pageParam": {
                        "pageNum": this.$props.currentPage,
                        "pageSize": this.$props.pageSize
                    },
                    type: node.data.type,
                    "relatedId": node.data.relatedId,
                    "resourceType": this.$props.resourceType,
                    callScenario: 1
                }
                this.$axios[this.$apiURL.markDocApi.getTemplateFodderData.method](this.$apiURL.markDocApi.getTemplateFodderData.url, prm).then(res => {
                    resolve(res.data.result.list)
                })
            },
            showData(node, data) {
                this.currentNodeItemId = node.id
                if (data.fileId) {
                    this.getFileId(data)
                }
                console.log(node, data)
            },
            //左侧节点触发拖拽
            handleDragstart(node, event) {
                console.log('event', event)
                this.$emit('update:startNode', node)
                this.$emit('update:startEvent', event)
                /*this.$store.commit('SET_START_NODE',node)
                this.$store.commit('SET_START_EVENT',event)*/
                // console.log('目录树',this.$refs.fileTree)
                // let newNode = JSON.parse(JSON.stringify(node))
                // console.log('start', node, event)
                /*newNode.data = {
                    catalogName: '1',
                    bidDocCatalogId: '1',
                    sonCatalog: [],
                }*/
                //在左侧节点触发拖拽的时候触发右侧节点的拖拽事件
                // this.leftRef = this.$store.state.refComment
                // this.leftRef.$emit('tree-node-drag-start', event, {node: node});
            },
            //拖拽结束，但是确定是否成功
            handleDragend(draggingNode, endNode, position, event) {
                console.log('end', draggingNode, endNode, position, event)
                // 新的空节点
                let newData = draggingNode;
                //在左tree插入拖拽的节点
                this.$refs['templateOrFodderTree'].insertBefore(newData.data, draggingNode);
                //右tree触发结束拖拽事件
                this.$emit('update:endEvent', event)
                // this.$store.commit('SET_END_EVENT',event)
                // this.leftRef.$emit('tree-node-drag-end', event);
                this.$nextTick(() => {
                    // 如果是移动到了自身---
                    console.log(this.$refs.templateOrFodderTree.getNode(draggingNode.data))
                    if (this.$refs.templateOrFodderTree.getNode(draggingNode.data.relatedId)) {
                        this.$refs.templateOrFodderTree.remove(draggingNode.data.relatedId);
                        console.log('移动到自身')
                    } else {
                        // 如果移动到了右tree上----
                        /*let data = JSON.parse(JSON.stringify(draggingNode.data));
                        this.$refs.treeIn.insertAfter(data, this.$refs.treeIn.getNode(newData));
                        this.$refs.treeIn.remove(newData);*/
                        console.log('移动到别的tree')
                    }
                })
            },
            allowDrag(node) {
                console.log('node1', node)
                return node.data.canDragFlag
            },
            returnFalse() {
                return
            }
        }
    }
</script>
<style lang="less" scoped>
    .templateAsideTree {
        width: 310px;
        height: 100%;
        border-radius: 4px;
        color: #515151;
        position: relative;
        -webkit-transition: all .5s;
        -moz-transition: all .5s;
        -ms-transition: all .5s;
        -o-transition: all .5s;
        transition: all .5s;

        .file-tree {
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 10px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;

            &::-webkit-scrollbar {
                /*滚动条整体样式*/
                width: 6px;
                height: 1px;
            }

            &::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
                border-radius: 10px;
                -box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: #E3E5E6;
            }

            .doc-name {
                font-size: 13px;
                font-weight: 400;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                padding-bottom: 10px;
            }

            .el-tree-node__content {
                position: relative;

                .action-content {
                    display: block;
                    z-index: 99999;
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


                /deep/.el-tree-node__expand-icon{
                    /*color: #FFA000!important;*/
                    color: @activeColor!important;
                    &.is-leaf{
                        color: transparent!important;
                    }
                }

                /deep/.el-tree-node__content {
                    height: 30px;

                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;


                    &:hover {
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
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;

                    &:hover {
                        .preview-doc-icon {
                            display: block;
                        }
                    }

                    .preview-doc-icon {
                        display: block;
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                        position: absolute;
                        top: 3px;
                        right: 0;
                    }

                    &.nodeActive {
                        background: #FBF4F2;

                        .file-name {
                            font-weight: bold;
                            color: @activeColor;
                        }

                        /*.fold-icon {
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
                        }*/
                    }

                    .content-item-left {
                        max-width: 223px;
                        display: flex;
                        align-items: center;

                        img {
                            margin: 0 4px 0 0;
                        }

                        .fold-icon {
                            width: 26px;
                            height: 26px;
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
                        top: 3px;
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
