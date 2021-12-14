<template>
    <!--导出记录-->
    <el-dialog class="setPrintDialog outField" width="770px" title="导出记录" :visible.sync="newMarkDocFlag">
        <div class="export-record">
            <el-table
                    class="markDocTable"
                    :header-cell-style="setHeaderGray"
                    :data="exportRecordData"
                    style="width: 100%">
                <el-table-column
                        prop="exportTitle"
                        label="标书名称"
                        width="240px">
                </el-table-column>
                <el-table-column
                        width="100px"
                        label="导出状态">
                    <template v-slot="{row}">
                        <el-tag v-if="row.exportState===200" type="info">{{row.exportStateName}}</el-tag>
                        <el-tag v-if="row.exportState===201" type="primary">{{row.exportStateName}}</el-tag>
                        <el-tag v-if="row.exportState===202" type="success">{{row.exportStateName}}</el-tag>
                        <el-tag v-if="row.exportState===203" type="danger">{{row.exportStateName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        width="100px"
                        prop="exportTypeName"
                        label="导出类型">
                </el-table-column>
                <el-table-column
                        width="160px"
                        prop="exportSuccessTime"
                        label="导出时间">
                </el-table-column>
                <el-table-column
                        min-width="130px"
                        label="下载">
                    <template v-slot="{row}">
                        <a style="color: red;text-decoration: none" v-if="row.exportFileUrl"
                           :href="row.exportFileUrl">下载</a>
                        <span style="color: #bbb;" v-else>当前不能下载</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-wrapper">
            <el-pagination
                    :hide-on-single-page="true"
                    @current-change="handleExportChange"
                    :current-page.sync="exportCurrentPage"
                    :page-size="exportPageSize"
                    layout="total, prev, pager, next"
                    :total="exportTotal">
            </el-pagination>
        </div>

    </el-dialog>
</template>

<script>
    import {getExportData} from "../api/markDocApi";

    export default {
        name: 'commonNav',
        data() {
            return {
                //导出记录
                exportRecordData: [],
                exportRecordFlag: false,
                exportCurrentPage: 1,
                exportTotal: 0,
                exportPageSize: 10,
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
            }
        },
        props: {
            modalFlag: {
                type: Boolean,
                default: false
            },
            bidDocId: {
                type: String
            },
            exportType: {
                default: null
            }
        },
        watch: {
            "$props.modalFlag": {
                handler(val) {
                    if (val) {
                        this.getExportData()
                    }
                },
                deep: true
            }
        },
        methods: {
            //导出记录分页
            handleExportChange(val) {
                this.exportCurrentPage = val
                this.getExportData()
            },
            //查询导出记录
            getExportData() {
                this.exportRecordFlag = true
                const prm = {
                    "bidDocId": this.$props.bidDocId,
                    "bidDocTitle": null,
                    "endTime": null,
                    "exportState": null,
                    "exportType": this.$props.exportType, //1 标书  2 标书目录
                    "industryId": null,
                    "pageNum": this.exportCurrentPage,
                    "pageSize": this.exportPageSize,
                    "startTime": null
                }
                this.$axios[this.$apiURL.markDocApi.getExportData.method](this.$apiURL.markDocApi.getExportData.url,prm).then(res => {
                    this.exportRecordData = res.data.result.list
                    this.exportTotal = res.data.result.total
                })
            },
            //设置表头
            setHeaderGray(rowInfo) {
                return 'background: #F8F9FC;color:#202020'
            }
        }
    }
</script>
<style lang="less" scoped>
</style>
