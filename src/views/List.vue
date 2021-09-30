<template>
    <div class="main-container">
        <div class="header-btn">
            <el-button size="small" type="primary" @click="jumpAdd">新增</el-button>
        </div>

        <el-table :data="tableData" border size="small" v-loading="loading">
            <el-table-column prop="orderNo" label="申请单哈"></el-table-column>
            <el-table-column prop="billTypeName" label="申请类型"></el-table-column>
            <el-table-column prop="reason" label="事由"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-edit"
                        style="margin-right: 20px"
                        @click="jumpEdit(scope.row)"
                        v-if="scope.row.status != 'ADOPT'"
                    ></el-button>
                    <el-button
                        type="text"
                        icon="el-icon-tickets"
                        style="margin-right: 20px"
                        @click="jumpDetail(scope.row)"
                        v-if="scope.row.status == 'ADOPT'"
                    ></el-button>
                    <el-popconfirm
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        title="确定删除吗？"
                        icon="el-icon-info"
                        @confirm="onDelete(scope.row)"
                        v-if="scope.row.status != 'ADOPT'"
                    >
                        <el-button slot="reference" type="text" size="small" icon="el-icon-delete"></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div class="footer-btn">
            <el-pagination
                :page-sizes="[10, 20, 30, 40]"
                layout="sizes, prev, pager, next, total"
                :current-page="pageOptions.page+1"
                :page-size="pageOptions.size"
                :total="total"
                @size-change="e=>pageOptions.size=e"
                @current-change="e=>pageOptions.page=e"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            loading: false,
            templateParams: {
                id: '428968449482559488',
                billType: 'CUSTOM',
                originalId: '428967346779066368',
                originalDeptId: 0,
                entryType: ''
            },
            editQuery: {
                id: '432164120494739456',
                billType: 'CUSTOM',
                templateId: '428968449482559488',
                originalId: '428967346779066368',
                originalDeptId: 0
            },
            tableData: [],
            pageOptions: {
                page: 0,
                size: 15,
                moduleCode: 'mineBill'
            },
            total: 0
        }
    },
    created() {
        this.init()
        this.$store.commit('set/customData', [])
    },
    methods: {
        init() {
            this.pageOptions.page = 0
            this.getPageWithUserList()
        },

        // 获取单据详情
        async getPageWithUserList() {
            this.loading = true
            try {
                let { data } = await this.$api.getPageWithUserList(this.pageOptions)
                this.tableData = data.content
                this.total = data.totalElements * 1
                this.loading = false
            } catch (e) {
                this.loading = false
                this.$message.error(e.msg)
            }
        },

        jumpAdd() {
            this.$router.push({ path: '/add', query: this.templateParams })
        },

        jumpDetail(row) {
            this.$router.push({
                path: '/detail',
                query: {
                    id: row.id,
                    billType: row.billType,
                    templateId: row.templateId,
                    originalId: row.originalId,
                    originalDeptId: row.originalDeptId
                }
            })
        },

        jumpEdit(row) {
            this.$router.push({
                path: '/edit',
                query: {
                    id: row.id,
                    billType: row.billType,
                    templateId: row.templateId,
                    originalId: row.originalId,
                    originalDeptId: row.originalDeptId
                }
            })
        },

        // 删除请求
        async delBill(id) {
            this.loading = true
            try {
                await this.$api.delBill({ billId: id })
                this.loading = false
                this.$message.success('删除成功')
                this.init()
            } catch (e) {
                this.loading = false
                this.$message.error(e.msg)
            }
        },

        onDelete(row) {
            this.delBill(row.id)
        }
    }
}
</script>


<style lang="scss" scoped>
.main-container {
    padding: 20px 40px 80px;
    .header-btn {
        margin-bottom: 20px;
        display: flex;
        justify-content: end;
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
    }
}
</style>
