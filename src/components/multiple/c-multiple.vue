<!--
 * @Description: 控件-明细展示
 * @Autor: fy
 * @Date: 2021-09-09 10:43:52
 * @LastEditors: fy
 * @LastEditTime: 2021-09-18 18:03:35
-->
<template>
    <div class="c-multiple">
        <el-button class="c-multiple-btn" icon="el-icon-plus" :size="size" :disabled="disabled || obj.disabled" @click="onAdd" v-if="!isDetail">新增</el-button>

        <table-multiple ref="TableMultiple" :obj="obj" :index="index" :isDetail="isDetail" @edit="onEdit" />

        <popup-multiple ref="PopupMultiple" :obj="obj" :index="index" @confirm="onConfirm" />
    </div>
</template>

<script>
import TableMultiple from '@/components/multiple/table-multiple.vue'
import PopupMultiple from '@/components/popup/popup-multiple.vue'

export default {
    name: 'c-multiple',
    components: { TableMultiple, PopupMultiple },
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
        return {}
    },

    methods: {
        // 新增
        onAdd() {
            this.$refs.PopupMultiple.open()
        },

        // 删除
        onDelete(index) {
            this.tableData.splice(index, 1)

            //  this.$emit('change', e, this.obj.type)
        },

        // 编辑
        onEdit(item, index) {
            this.$refs.PopupMultiple.open(item, index)
        },

        // 监听的确定
        onConfirm(list) {
            this.$refs.TableMultiple.setData(list)
        }
    }
}
</script>


<style lang="scss" scoped>
.c-multiple {
    .c-multiple-btn {
        width: 130px;
    }
    .table-multiple {
        margin-top: 12px;
        margin-bottom: 10px;
    }
}
</style>
