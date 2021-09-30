<!--
 * @Description: 控件-多行文本框
 * @Autor: fy
 * @Date: 2021-09-08 17:04:41
 * @LastEditors: fy
 * @LastEditTime: 2021-09-18 17:37:54
-->
<template>
    <div class="c-textarea">
        <el-input
            v-model="obj.value"
            type="textarea"
            :placeholder="obj.placeholder"
            :size="size"
            :disabled="disabled || obj.disabled"
            :maxlength="obj.max"
            :autosize="{ minRows: 3}"
            show-word-limit
            :clearable="clearable"
            @change="onChange"
            v-if="!isDetail"
        ></el-input>

        <span v-else>{{obj.value}}</span>
    </div>
</template>

<script>
export default {
    name: 'c-textarea',
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
.c-textarea {
    width: 450px;
    margin-bottom: 8px;
    line-height: 40px;
}
</style>
