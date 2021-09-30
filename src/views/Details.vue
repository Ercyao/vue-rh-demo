<!--
 * @Description: 页面-详情
 * @Autor: fy
 * @Date: 2021-09-08 16:30:41
 * @LastEditors: fy
 * @LastEditTime: 2021-09-22 09:16:49
-->
<template>
    <div class="main-container" v-loading="loading">
        <h1 class="header-title">单据详情</h1>

        <el-form ref="AddOrUpdateForm" label-width="100px" label-suffix=":" label-position="left" class="demo-ruleForm">
            <template v-for="(item,index) in customData">
                <el-form-item
                    :key="item.id + index"
                    :label="item.type != 'dateArea' && item.type != 'submitter'  ? item.text :''"
                    :label-width="item.type != 'dateArea' && item.type != 'submitter'  ? '100px':'0px'"
                    :required="item.required"
                    :show-message="false"
                    v-if="!item.hide"
                >
                    <c-form :obj="item" :index="Number(index)" isDetail />
                </el-form-item>
            </template>
        </el-form>

        <div class="footer-btn">
            <el-button class="footer-btn-item" @click="onCancel">返回</el-button>
        </div>
    </div>
</template>

<script>
import { customJson } from './data'
import CForm from '@/components/form/c-form.vue'

export default {
    name: 'Details',
    components: { CForm },
    data() {
        return {
            loading: false,
            templateData: {} // 模板数据
        }
    },
    computed: {
        customData() {
            return this.$store.state.customData
        }
    },
    created() {
        this.getBillDetail()
    },
    methods: {
        // 获取单据详情
        async getBillDetail() {
            this.loading = true
            try {
                let { data } = await this.$api.getBillDetail({ id: this.$route.query.id })
                this.templateData = data
                this.loading = false
                this.$store.commit('set/customData', data.customDataJson)
            } catch (e) {
                this.loading = false
                this.$store.commit('set/customData', customJson)
                this.$message.error(e.msg)
            }
        },

        onCancel() {
            this.$router.replace('/list')
        }
    }
}
</script>


<style lang="scss" scoped>
.main-container {
    padding: 20px 50px 60px;
    .header-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 30px;
    }
    .el-form-item {
        margin-bottom: 0px;
    }

    .footer-btn {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        min-height: 40px;
        padding: 10px 20px;
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
