<template>
    <!--页眉页脚设置对话框-->
    <el-dialog class="setPageDialog" width="770px" title="页眉页脚设置" :visible.sync="newModalFlag">
        <div class="set-print-main">
            <div class="set-print-menu">
                <div @click="changeType('header')"
                     :class="{'set-print-menu-item':true,'setPrintActive':type==='header'}">页眉
                </div>
                <div @click="changeType('footer')"
                     :class="{'set-print-menu-item':true,'setPrintActive':type==='footer'}">页脚
                </div>
            </div>
            <div class="set-print-content">
                <div v-if="type==='header'" class="page-header-part">
                    <div class="add-page-code hasBorder">
                        <el-checkbox v-model="headerForm.pageNumFlag">添加页码</el-checkbox>
                        <div class="input-wrapper">
                            <div class="input-item">
                                <div class="input-item-label">页码字体：</div>
                                <el-input v-model="headerForm.pageNumFontName" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="input-item">
                                <div class="input-item-label">字体大小：</div>
                                <el-input v-model="headerForm.pageNumFontSize" placeholder="请输入内容"></el-input>
                            </div>
                        </div>
                        <div class="input-wrapper">
                            <div class="input-item">
                                <div class="input-item-label">对齐方式：</div>
                                <el-select v-model="headerForm.pageNumHorizontalAlignment" placeholder="请选择">
                                    <el-option
                                            v-for="item in alignmentData"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="add-page-code hasBorder">
                        <div class="input-wrapper">
                            <div class="input-item">
                                <div class="input-item-label">页眉内容：</div>
                                <el-input class="content-input" v-model="headerForm.content"
                                          placeholder="请输入内容"></el-input>
                            </div>
                        </div>
                        <div class="input-wrapper">
                            <div class="input-item">
                                <div class="input-item-label">字体：</div>
                                <el-input v-model="headerForm.fontName" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="input-item">
                                <div class="input-item-label">字体大小：</div>
                                <el-input v-model="headerForm.fontSize" placeholder="请输入内容"></el-input>
                            </div>
                        </div>
                        <div class="input-wrapper">
                            <div class="input-item">
                                <div class="input-item-label">对齐方式：</div>
                                <el-select v-model="headerForm.horizontalAlignment" placeholder="请选择">
                                    <el-option
                                            v-for="item in alignmentData"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="input-item">
                                <div class="input-item-label">页眉高度：</div>
                                <el-input v-model="headerForm.distance" placeholder="请输入内容"></el-input>
                            </div>
                        </div>

                    </div>
                    <div class="add-page-code">
                        <el-checkbox v-model="addHeaderPic">添加图片</el-checkbox>
                        <uploadImg :limit="limit" :file-list.sync="pageHeaderFileList"></uploadImg>
                    </div>
                    <div class="save-wrapper">
                        <el-button :loading="headerLoading" type="primary" @click="savePage">保存页眉</el-button>
                    </div>
                </div>
                <div v-else class="page-header-part">
                    <div class="add-page-code hasBorder">
                        <el-checkbox v-model="footerForm.pageNumFlag">添加页码</el-checkbox>
                        <div class="input-wrapper">
                            <div class="input-item">
                                <div class="input-item-label">页码字体：</div>
                                <el-input v-model="footerForm.pageNumFontName" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="input-item">
                                <div class="input-item-label">字体大小：</div>
                                <el-input v-model="footerForm.pageNumFontSize" placeholder="请输入内容"></el-input>
                            </div>
                        </div>
                        <div class="input-wrapper">
                            <div class="input-item">
                                <div class="input-item-label">对齐方式：</div>
                                <el-select v-model="footerForm.pageNumHorizontalAlignment" placeholder="请选择">
                                    <el-option
                                            v-for="item in alignmentData"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="add-page-code hasBorder">
                        <div class="input-wrapper">
                            <div class="input-item">
                                <div class="input-item-label">页脚内容：</div>
                                <el-input class="content-input" v-model="footerForm.content"
                                          placeholder="请输入内容"></el-input>
                            </div>
                        </div>
                        <div class="input-wrapper">
                            <div class="input-item">
                                <div class="input-item-label">字体：</div>
                                <el-input v-model="footerForm.fontName" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="input-item">
                                <div class="input-item-label">字体大小：</div>
                                <el-input v-model="footerForm.fontSize" placeholder="请输入内容"></el-input>
                            </div>
                        </div>
                        <div class="input-wrapper">
                            <div class="input-item">
                                <div class="input-item-label">对齐方式：</div>
                                <el-select v-model="footerForm.horizontalAlignment" placeholder="请选择">
                                    <el-option
                                            v-for="item in alignmentData"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="input-item">
                                <div class="input-item-label">页脚高度：</div>
                                <el-input v-model="footerForm.distance" placeholder="请输入内容"></el-input>
                            </div>
                        </div>

                    </div>
                    <div class="add-page-code">
                        <el-checkbox v-model="addFooterPic">添加图片</el-checkbox>
                        <uploadImg :limit="limit" :file-list.sync="pageFooterFileList"></uploadImg>
                    </div>
                    <div class="save-wrapper">
                        <el-button :loading="footerLoading" type="primary" @click="savePage">保存页脚</el-button>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    import uploadImg from './uploadImg'
    import qs from 'qs'
    import axios from 'axios'
    import { getUploadParams } from "../api/commonApi";
    import {getPageFormatInfo, addPageFormat} from "../api/markDocApi";

    export default {
        name: 'commonNav',
        components: {uploadImg},
        data() {
            return {
                limit: 1,
                headerLoading: false,
                footerLoading: false,
                type: 'header',
                addHeaderPic: false,
                addFooterPic: false,
                alignmentData: [
                    {id: 1, name: '左对齐'},
                    {id: 2, name: '居中对齐'},
                    {id: 3, name: '右对齐'},
                ],
                pageHeaderFileList: [],
                pageFooterFileList: [],
                headerForm: {
                    "borderType": null,
                    "content": null,
                    "distance": null,
                    "fontName": null,
                    "fontSize": null,
                    "hfFormatId": null,
                    "hfImgFileId": null,
                    "horizontalAlignment": null,
                    "pageNumFlag": true,
                    "pageNumFontName": null,
                    "pageNumFontSize": null,
                    "pageNumHorizontalAlignment": null,
                    "type": null
                },
                footerForm: {
                    "borderType": null,
                    "content": null,
                    "distance": null,
                    "fontName": null,
                    "fontSize": null,
                    "hfFormatId": null,
                    "hfImgFileId": null,
                    "horizontalAlignment": null,
                    "pageNumFlag": true,
                    "pageNumFontName": null,
                    "pageNumFontSize": null,
                    "pageNumHorizontalAlignment": null,
                    "type": null
                }
            }
        },
        props: {
            modalFlag: {
                type: Boolean,
                default: false
            },
            pageSetLoading: {
                type: Boolean,
                default: false
            },
            bidDocId: {
                required: true
            }
        },
        watch: {
            '$props.modalFlag': {
                handler(val) {
                    if (val) {
                        this.getPageFormatInfo()
                    }
                },
                deep: true
            }
        },
        computed: {
            newModalFlag: {
                get() {
                    return this.$props.modalFlag
                },
                set(val) {
                    this.$emit('update:modalFlag', val)
                }
            }
        },
        methods: {
            getPageFormatInfo() {
                this.pageFooterFileList = []
                this.pageHeaderFileList = []
                const prm = qs.stringify({
                    bidDocId: this.$props.bidDocId
                })
                this.$axios[this.$apiURL.markDocApi.getPageFormatInfo.method](this.$apiURL.markDocApi.getPageFormatInfo.url,prm).then(res => {
                    const {footer} = res.data.result
                    const {header} = res.data.result
                    if (header) {
                        if (header.hfImgFileUrl) {
                            this.pageHeaderFileList.push({
                                url:header.hfImgFileUrl,
                                hfFormatId:header.hfFormatId,
                            })
                        }
                        this.headerForm = header
                        this.headerForm.hfImgFileId = null
                    }else{
                        this.headerForm.borderType = null
                        this.headerForm.content = null
                        this.headerForm.distance = null
                        this.headerForm.fontName = null
                        this.headerForm.fontSize = null
                        this.headerForm.hfFormatId = null
                        this.headerForm.hfImgFileId = null
                        this.headerForm.horizontalAlignment = null
                        this.headerForm.pageNumFlag = null
                        this.headerForm.pageNumFontName = null
                        this.headerForm.pageNumFontSize = null
                        this.headerForm.pageNumHorizontalAlignment = null
                        this.headerForm.type = null
                    }
                    if (footer) {
                        this.footerForm = footer
                        this.footerForm.hfImgFileId = null
                        if (footer.hfImgFileUrl) {
                            this.pageFooterFileList.push({
                                url:footer.hfImgFileUrl,
                                hfFormatId:header.hfFormatId,
                            })
                        }
                    }else{
                        this.footerForm.borderType = null
                        this.footerForm.content = null
                        this.footerForm.distance = null
                        this.footerForm.fontName = null
                        this.footerForm.fontSize = null
                        this.footerForm.hfFormatId = null
                        this.footerForm.hfImgFileId = null
                        this.footerForm.horizontalAlignment = null
                        this.footerForm.pageNumFlag = null
                        this.footerForm.pageNumFontName = null
                        this.footerForm.pageNumFontSize = null
                        this.footerForm.pageNumHorizontalAlignment = null
                        this.footerForm.type = null
                    }
                })
            },
            changeType(type) {
                this.type = type
            },
            savePage(){
                console.log(1111,this.pageFooterFileList)
                if (this.type === 'header') {
                    if (this.pageHeaderFileList.length > 0 && this.pageHeaderFileList[0].raw) {
                        let prm = qs.stringify({
                            fileNum: 1,
                            uploadType:100
                        })
                        this.$axios[this.$apiURL.commonApi.getUploadParams.method](this.$apiURL.commonApi.getUploadParams.url,prm).then(res => {
                            const {result} = res.data
                            const requestData = this.$returnUploadPrm(result.fileIds[0],result,this.pageHeaderFileList[0].raw)
                            /*const idxSite = this.pageHeaderFileList[0].raw.name.indexOf('.')
                            const nameSite = this.pageHeaderFileList[0].raw.name.substring(idxSite)
                            const requestData = new FormData()
                            const fileIdSite = result.fileIds[0]
                            const fileKeySite = result.dir + fileIdSite + nameSite
                            requestData.append('policy', result.policy)
                            requestData.append('signature', result.signature)
                            requestData.append('ossaccessKeyId', result.accessid)
                            requestData.append('callback', result.callback)
                            requestData.append('key', fileKeySite)
                            requestData.append('dir', result.dir)
                            requestData.append('host', result.host)
                            requestData.append('file', this.pageHeaderFileList[0].raw)*/
                            axios({
                                url: result.host,
                                method: 'post',
                                data: requestData
                            }).then((res) => {
                                if (res.data.code === 200) {
                                    this.headerForm.hfImgFileId = result.fileIds[0]
                                    this.handleSubmit()
                                }
                            })
                        })
                    }else{
                        this.handleSubmit()
                    }
                }else{
                    if (this.pageFooterFileList.length > 0 && this.pageFooterFileList[0].raw) {
                        let prm = qs.stringify({
                            fileNum: 1,
                            uploadType:100
                        })
                        this.$axios[this.$apiURL.commonApi.getUploadParams.method](this.$apiURL.commonApi.getUploadParams.url,prm).then(res => {
                            const {result} = res.data
                            const requestData = this.$returnUploadPrm(result.fileIds[0],result,this.pageFooterFileList[0].raw)

                            /*const idxSite = this.pageFooterFileList[0].raw.name.indexOf('.')
                            const nameSite = this.pageFooterFileList[0].raw.name.substring(idxSite)
                            const requestData = new FormData()
                            const fileIdSite = result.fileIds[0]
                            const fileKeySite = result.dir + fileIdSite + nameSite
                            requestData.append('policy', result.policy)
                            requestData.append('signature', result.signature)
                            requestData.append('ossaccessKeyId', result.accessid)
                            requestData.append('callback', result.callback)
                            requestData.append('key', fileKeySite)
                            requestData.append('dir', result.dir)
                            requestData.append('host', result.host)
                            requestData.append('file', this.pageFooterFileList[0].raw)*/
                            axios({
                                url: result.host,
                                method: 'post',
                                data: requestData
                            }).then((res) => {
                                if (res.data.code === 200) {
                                    this.footerForm.hfImgFileId = result.fileIds[0]
                                    this.handleSubmit()
                                }
                            })
                        })
                    }else{
                        this.handleSubmit()
                    }
                }
            },
            handleSubmit(){
                const prm = this.type==='header'? {
                    "bidDocId": this.$props.bidDocId,
                    "borderType": this.headerForm.borderType,
                    "content": this.headerForm.content,
                    "distance": this.headerForm.distance,
                    "fontName": this.headerForm.fontName,
                    "fontSize": this.headerForm.fontSize,
                    "hfFormatId": this.headerForm.hfFormatId,
                    "hfImgFileId": this.headerForm.hfImgFileId,
                    "horizontalAlignment": this.headerForm.horizontalAlignment,
                    "pageNumFlag": this.headerForm.pageNumFlag,
                    "pageNumFontName": this.headerForm.pageNumFontName,
                    "pageNumFontSize": this.headerForm.pageNumFontSize,
                    "pageNumHorizontalAlignment": this.headerForm.pageNumHorizontalAlignment,
                    "type": 1
                }:{
                    "bidDocId": this.$props.bidDocId,
                    "borderType": this.footerForm.borderType,
                    "content": this.footerForm.content,
                    "distance": this.footerForm.distance,
                    "fontName": this.footerForm.fontName,
                    "fontSize": this.footerForm.fontSize,
                    "hfFormatId": this.footerForm.hfFormatId,
                    "hfImgFileId": this.footerForm.hfImgFileId,
                    "horizontalAlignment": this.footerForm.horizontalAlignment,
                    "pageNumFlag": this.footerForm.pageNumFlag,
                    "pageNumFontName": this.footerForm.pageNumFontName,
                    "pageNumFontSize": this.footerForm.pageNumFontSize,
                    "pageNumHorizontalAlignment": this.footerForm.pageNumHorizontalAlignment,
                    "type": 2
                }
                this.$axios[this.$apiURL.markDocApi.addPageFormat.method](this.$apiURL.markDocApi.addPageFormat.url,prm).then(res => {
                    this.$message.success(res.data.msg)
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .setPageDialog {

        /deep/ .el-dialog__header {
            background: #FAFDFF;

            .el-dialog__title {
                font-size: 15px;
                color: #333333;
            }
        }

        /deep/ .el-dialog__body {
            padding: 0;
            /*打印设置*/

            .set-print-main {
                padding: 30px 20px;
                display: flex;

                .set-print-menu {
                    min-width: 120px;
                    flex: 0 120px;
                    -border: 1px solid #eee;
                    min-height: 300px;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    padding: 6px 15px 15px 15px;
                    font-weight: bold;
                    color: #333;
                    margin-right: 15px;

                    .set-print-menu-item {
                        cursor: pointer;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        border-radius: 4px;
                        border: 1px solid @activeColor;
                        margin: 10px 0 15px 0;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        color: @activeColor;

                        &.setPrintActive {
                            color: #fff;
                            background: @activeColor;
                        }
                    }
                }

                .set-print-content {
                    border: 1px solid #eee;
                    width: 100%;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    padding: 6px 15px 15px 15px;

                    .page-header-part {
                        .add-page-code {
                            &.hasBorder {
                                border-bottom: 1px solid #eee;
                            }

                            .el-checkbox {
                                font-size: 16px;
                                padding: 8px 0;
                            }

                            .input-wrapper {
                                display: flex;
                                align-items: center;

                                .input-item {
                                    display: flex;
                                    align-items: center;
                                    margin: 10px 50px 10px 0;

                                    .input-item-label {
                                        width: 80px;
                                    }

                                    .el-input {
                                        width: 150px;

                                        &.content-input {
                                            width: 430px;
                                        }
                                    }
                                }
                            }
                        }

                        .save-wrapper {
                            padding: 15px 0;
                            display: flex;
                            justify-content: center;
                        }
                    }
                }
            }
        }

        .el-dialog__footer {
            .dialog-footer {
                display: flex;
                align-items: center;
                justify-content: center;

                .el-button {
                    width: 130px;
                }
            }

        }
    }
</style>
