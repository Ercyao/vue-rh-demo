<!--
 * @Description: 控件 - 提交人和所属部门
 * @Autor: fy
 * @Date: 2021-09-08 16:49:59
 * @LastEditors: fy
 * @LastEditTime: 2021-09-18 17:37:09
-->
<template>
    <el-form class="c-submitter" label-width="100px" label-suffix=":" label-position="left">
        <el-form-item :label="obj.text" :required="obj.required">
            <el-select
                v-model="obj.value.userId"
                :placeholder="obj.placeholder"
                :size="size"
                :disabled="disabled || obj.disabled"
                :clearable="clearable"
                @change="onChange"
                v-if="!isDetail"
            >
                <el-option v-for="item in submitterList" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>

            <span v-else>{{obj.value.name}}</span>
        </el-form-item>

        <el-form-item :label="obj.departmentText" :required="obj.required">
            <el-select
                v-model="obj.value.departmentId"
                :placeholder="obj.placeholder"
                :size="size"
                :disabled="disabled || obj.disabled"
                :clearable="clearable"
                @change="onChange"
                v-if="!isDetail"
            >
                <el-option v-for="item in departmentList" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>

            <span v-else>{{obj.value.departmentName}}</span>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'c-submitter',
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
        return {
            submitterList: [{ id: '428967346779066368', value: '13823308546' }],
            departmentList: [{ id: '0', value: '北京锦益网络科技有限公司' }] // 选项有关联的数组
        }
    },
    computed: {
        customData() {
            return this.$store.state.customData
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
.c-submitter {
    .el-select {
        width: 220px;
        margin-top: 5px;
    }
}
</style>