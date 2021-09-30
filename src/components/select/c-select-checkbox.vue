<!--
 * @Description: 控件 - 多选框
 * @Autor: fy
 * @Date: 2021-09-08 16:49:59
 * @LastEditors: fy
 * @LastEditTime: 2021-09-22 09:22:28
-->
<template>
    <div class="c-select-checkbox">
        <el-select
            v-model="obj.value"
            :placeholder="obj.placeholder"
            :size="size"
            :disabled="disabled || obj.disabled"
            :clearable="clearable"
            multiple
            @change="onChange"
            v-if="!isDetail"
        >
            <el-option v-for="item in  obj.items" :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>

        <span v-else>{{obj.value | fiterItem(obj.items)}}</span>
    </div>
</template>

<script>
export default {
    name: 'c-select-checkbox',
    props: {
        obj: {
            type: Object,
            default: () => {}
        },
        size: {
            type: String,
            default: 'small'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
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
    filters: {
        fiterItem: (value, arr) => {
            if (arr.length < 1 || !value || value.length < 1) return '--'
            let list = arr.filter(item => value.indexOf(item.id) > -1)
            let labels = list.map(item => item.value)
            return labels.toString()
        }
    },
    methods: {
        onChange(e) {
            this.$emit('change', e, this.obj.type)
        }
    }
}
</script>


<style lang="scss" scoped>
.c-select-checkbox {
    line-height: 40px;
    .el-select {
        width: 220px;
    }
}
</style>
