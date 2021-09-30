<!--
 * @Description: 页面-新增或者编辑
 * @Autor: fy
 * @Date: 2021-09-08 16:30:41
 * @LastEditors: fy
 * @LastEditTime: 2021-09-22 09:31:26
-->
<template>
    <div class="main-container" v-loading="loading">
        <h1 class="header-title">{{ templateData.billTypeName }} 单据</h1>
        <el-form ref="AddOrUpdateForm" :model="form" label-width="100px" label-suffix=":" label-position="left" class="demo-ruleForm">
            <template v-for="(item,index) in customData">
                <el-form-item
                    :key="item.id + index"
                    :label="item.type != 'dateArea' && item.type != 'submitter'  ? item.text :''"
                    :label-width="item.type != 'dateArea' && item.type != 'submitter'  ? '100px':'0px'"
                    :required="item.required"
                    :show-message="false"
                    v-if="!item.hide"
                >
                    <c-form :obj="item" :index="Number(index)" />
                </el-form-item>
            </template>
        </el-form>

        <div class="footer-btn">
            <el-button class="footer-btn-item" :disabled="loading" @click="onCancel">返回</el-button>
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="确定删除吗？"
                icon="el-icon-info"
                @confirm="onDelete"
                v-if="!isAddPage && templateData.status != 'ADOPT'"
            >
                <el-button slot="reference" class="footer-btn-item" type="danger" plain :disabled="loading" style="margin:0 10px">删除</el-button>
            </el-popconfirm>
            <el-button class="footer-btn-item" :disabled="loading" @click="onSave">保存</el-button>
            <el-button class="footer-btn-item" type="primary" :disabled="loading" @click="onConfirm">提交</el-button>
        </div>
    </div>
</template>

<script>
import CForm from '@/components/form/c-form.vue'
import { customJson, flowJson } from './data'
export default {
    name: 'AddOrUpdate',
    components: { CForm },
    data() {
        return {
            loading: false,
            isAddPage: true,
            templateParams: {},
            detailParams: {},
            templateData: {}, // 模板数据
            form: {}
        }
    },
    computed: {
        customData() {
            return this.$store.state.customData
        }
    },
    created() {
        this.isAddPage = this.$route.name == 'add' ? true : false
        if (!this.isAddPage) {
            this.detailParams = { id: this.$route.query.id, needRemoveBankInfo: true }
            this.getBillDetail()
        } else {
            this.setParams()
            this.getBillTemplate()
        }
    },
    methods: {
        // 拿到地址栏参数赋值
        setParams() {
            this.templateParams = this.$route.query
            this.form = {
                originalDeptId: this.$route.query.originalDeptId,
                originalId: this.$route.query.originalId,
                status: this.$route.query.status,
                billType: this.$route.query.billType,
                flowJson: flowJson,
                status: 'WAIT',
                templateId: '',
                customData: ''
            }
        },

        // 获取模板数据
        async getBillTemplate() {
            this.loading = true
            try {
                let { data } = await this.$api.getBillTemplate(this.templateParams)
                this.templateData = data
                this.form.templateId = data.id
                this.setBillTemplateData(data)
                this.loading = false
            } catch (e) {
                this.$store.commit('set/customData', customJson)
                this.loading = false
                this.$message.error(e.msg)
                // console.error('获取模板数据失败：', e)
            }
        },

        // 设置模板数据
        setBillTemplateData(data) {
            let formDataJson = data.formDataJson
            formDataJson[1].value = {
                departmentName: '北京锦益网络科技有限公司',
                departmentId: '0',
                name: '13823308546',
                userId: '428967346779066368'
            }
            this.$store.commit('set/customData', data.formDataJson)
        },

        // 获取单据详情
        async getBillDetail() {
            this.loading = true
            try {
                let { data } = await this.$api.getBillDetail(this.detailParams)
                this.templateData = data
                this.setBillFormData(data)
                this.loading = false
            } catch (e) {
                this.loading = false
                this.$message.error(e.msg)
            }
        },

        // 设置模板数据
        setBillFormData(data) {
            this.form = {
                originalDeptId: data.originalDeptId,
                originalId: data.originalId,
                status: data.status,
                billType: data.billType,
                flowJson: flowJson,
                status: 'WAIT',
                templateId: data.templateId,
                customData: ''
            }
            this.$store.commit('set/customData', data.customDataJson)
        },

        // 新增请求
        async postBillAdd() {
            this.loading = true
            this.form.customData = JSON.stringify(this.customData)
            // console.log('新增请求', this.customData)
            try {
                let { data } = await this.$api.postBillAdd(this.form)
                if (this.form.status == 'AUDIT') {
                    this.$router.replace('/list')
                } else {
                    this.$router.replace({
                        path: '/edit',
                        query: {
                            id: data.id,
                            billType: this.form.billType,
                            templateId: this.form.templateId,
                            originalId: this.form.originalId,
                            originalDeptId: this.form.originalDeptId
                        }
                    })
                    this.isAddPage = false
                }
                this.loading = false
                this.$message.success('请求成功')
            } catch (e) {
                this.loading = false
                this.$message.error(e.msg)
            }
        },

        // 删除请求
        async delBill(id) {
            this.loading = true
            try {
                await this.$api.delBill({ billId: id })
                this.loading = false
                this.$message.success('删除成功')
                this.$router.replace('/list')
            } catch (e) {
                this.loading = false
                this.$message.error(e.msg)
            }
        },

        validateForm(callback) {
            for (let item of this.customData) {
                if (item.data == undefined) {
                    if (item.required && !item.hide && !item.value) {
                        return callback(item.text + '不能为空')
                    }
                } else {
                    if (item.required && !item.hide && !item.data) {
                        return callback(item.text + '不能为空')
                    }
                }
            }
            return callback()
        },

        onCancel() {
            this.$router.replace('/list')
        },

        onDelete() {
            this.delBill(this.detailParams.id)
        },

        onSave() {
            this.validateForm(msg => {
                if (msg) {
                    this.$message.warning(msg)
                } else {
                    this.form.status = 'WAIT'
                    this.postBillAdd()
                }
            })
        },

        onConfirm() {
            this.validateForm(msg => {
                if (msg) {
                    this.$message.warning(msg)
                } else {
                    this.form.status = 'AUDIT'
                    this.postBillAdd()
                }
            })
        }
    },
    beforeDestroy() {
        this.$store.commit('set/customData', [])
    }
}
</script>


<style lang="scss" scoped>
.main-container {
    padding: 40px 50px 60px;
    .header-title {
        color: #414a60;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 24px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e0e5eb;
    }
    .el-form-item {
        margin-bottom: 5px;
    }

    .footer-btn {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        width: 100%;
        min-height: 40px;
        padding: 10px 20px;
        background: #fff;
        box-shadow: 0 5px 5px rgba($color: #000000, $alpha: 0.5);
        border-top: 1px solid #ccc;
        display: flex;
        justify-content: center;
        .footer-btn-item {
            min-width: 100px;
            height: 35px;
            padding: 10px 0;
        }
    }
}
</style>
