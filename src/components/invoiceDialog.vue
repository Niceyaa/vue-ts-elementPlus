<template>
    <el-dialog center class="invoiceDialog" width="730px" :title="'申请发票('+orderIdList.length+')'" :visible.sync="modalFlag">
        <el-form ref="form" :model="form" label-width="180px" :rules="rules">
            <el-form-item label="机构类型：" prop="institutionType">
                <el-radio v-for="item in institutionTypes" :key="item.id" v-model="form.institutionType" :label="item.id">{{item.name}}</el-radio>
            </el-form-item>
            <el-form-item label="发票类型：" prop="invoiceType">
                <el-select v-model="form.invoiceType" placeholder="请选择发票类型">
                    <el-option v-for="item in invoiceTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收件人：" prop="receiver">
                <el-input v-model="form.receiver" placeholder="请填写收件人"></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="receiverTel">
                <el-input v-model="form.receiverTel" placeholder="请填写电话"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-input v-model="form.email" placeholder="请填写邮箱"></el-input>
            </el-form-item>
            <el-form-item label="总金额：">
                <el-input disabled v-model="totalAmount"></el-input>
            </el-form-item>
            <el-form-item label="收件人地址：" prop="receiverAddress">
                <el-input type="textarea" v-model="form.receiverAddress" placeholder="请填写收件人地址"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveHandle('form')">申请发票</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'commonNav',
        data(){
            return {
                invoiceTypes: [
                    {name:'电子发票',id:2},
                    {name:'普通发票',id:1},
                ],
                institutionTypes: [
                    {name:'单位',id:1},
                    {name:'个人',id:2},
                ],
                form: {
                    "cityId": null,
                    "email": null,
                    "institutionType": 1,
                    "invoiceType": 2,
                    "orderIdList": [],
                    "receiver": null,
                    "totalAmount": null,
                    "receiverAddress": null,
                    "receiverTel": null
                },
                rules:{
                    email:[{required: true, message:'请填写邮箱', trigger: 'blur'}],
                    institutionType:[{required: true, message:'请选择机构类型', trigger: 'change'}],
                    invoiceType:[{required: true, message:'请填写发票类型', trigger: 'blur'}],
                    receiver:[{required: true, message:'请填写收件人', trigger: 'blur'}],
                    receiverAddress:[{required: true, message:'请填写收件人地址', trigger: 'blur'}],
                    receiverTel:[{required: true, message:'请填写电话', trigger: 'blur'}],
                }

            }
        },
        props:{
            invoiceFlag: {
                type: Boolean,
                default: false
            },
            orderIdList: {
                type: Array
            },
            totalAmount: {
                type: Number
            },
        },
        computed:{
          modalFlag: {
              get(){
                  return this.$props.invoiceFlag
              },
              set(val){
                  this.$emit("update:invoiceFlag",val)
              }
          }
        },
        methods:{
            saveHandle(formName){
               this.$refs[formName].validate(valid=>{
                   if (valid){
                       const prm = {
                           "cityId": this.form.cityId,
                           "email": this.form.email,
                           "institutionType": this.form.institutionType,
                           "invoiceType": this.form.invoiceType,
                           "orderIdList": this.$props.orderIdList,
                           "receiver": this.form.receiver,
                           "receiverAddress": this.form.receiverAddress,
                           "receiverTel": this.form.receiverTel
                       }
                       this.$axios[this.$apiURL.personal.addInvoice.method](this.$apiURL.personal.addInvoice.url, prm).then(res => {
                           this.$message.success(res.data.msg)
                           this.$emit('update:invoiceFlag',false)
                           this.$emit('success')
                       })
                   }
               })
            },
        }
    }
</script>
<style lang="less" scoped>
    .invoiceDialog {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        .el-input{
            width: 340px;
        }
        .el-select{
            width: 340px;
        }

        /deep/.el-dialog__footer {
            display: flex;
            align-items: center;
            justify-content: center;

            .el-button {
                width: 130px;
            }
        }
    }
</style>
