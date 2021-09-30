<!--
 * @Description: 控件-单行文本框
 * @Autor: fy
 * @Date: 2021-09-08 17:14:34
 * @LastEditors: fy
 * @LastEditTime: 2021-09-18 17:37:47
-->
<template>
    <div class="c-input-text">
        <el-input
            v-model="obj.value"
            :placeholder="obj.placeholder"
            :size="size"
            :disabled="disabled || obj.disabled"
            :maxlength="obj.max"
            :clearable="clearable"
            @change="onChange"
            v-if="!isDetail"
        ></el-input>

        <span v-else>{{obj.value}}</span>
    </div>
</template>

<script>
export default {
    name: 'c-input-text',
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
    methods: {
        onChange(e) {
            this.$emit('change', e, this.obj.type)
        }
    }
}
</script>


<style scoped>
.c-input-text {
    width: 450px;
    line-height: 40px;
}
</style>
