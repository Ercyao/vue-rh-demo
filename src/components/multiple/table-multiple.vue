<!--
 * @Description: 控件-明细表格列表
 * @Autor: fy
 * @Date: 2021-09-09 10:43:52
 * @LastEditors: fy
 * @LastEditTime: 2021-09-18 17:59:55
-->
<template>
    <el-table :data="tableData" border highlight-current-row class="table-multiple" :size="size" v-if="tableData.length > 0">
        <el-table-column label="序号" type="index" width="80"></el-table-column>

        <el-table-column v-for="(item, i) in tableColumn" :key="i" :label="item">
            <template slot-scope="scope">
                ￥
                {{scope.row[i].value}}
            </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="80" v-if="!disabled && !obj.disabled && !isDetail">
            <template slot-scope="scope">
                <el-button type="text" :size="size" icon="el-icon-edit" style="margin-right: 10px" @click="onEdit(scope.row, scope.$index)"></el-button>
                <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" title="确定删除吗？" icon="el-icon-info" @confirm="onDelete(scope.$index)">
                    <el-button slot="reference" type="text" :size="size" icon="el-icon-delete"></el-button>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'table-multiple',
    props: {
        obj: {
            type: Object,
            default: () => {}
        },
        index: {
            type: Number,
            default: null
        },
        size: {
            type: String,
            default: 'small'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isDetail: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tableData: [],
            tableColumn: []
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.tableData = this.obj.data || []
            this.tableColumn = this.setTableColumn()
        })
    },
    methods: {
        // 删除
        onDelete(index) {
            this.tableData.splice(index, 1)
            this.$emit('delete', index)
        },

        // 编辑
        onEdit(item, index) {
            this.$emit('edit', item, index)
        },

        setData(list) {
            this.tableData = list
            if (this.tableColumn.length < 1 && list && list.length > 0) {
                this.tableColumn = this.setTableColumn()
            }
        },

        // 获取表头名字
        setTableColumn() {
            if (!this.tableData || !this.tableData[0]) return []
            return this.tableData[0].map(item => item.text)
        }
    }
}
</script>


<style lang="scss" scoped>
.table-multiple {
    margin-top: 12px;
    margin-bottom: 10px;
}
</style>
