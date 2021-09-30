<!--
 * @Description: 控件-城市选择-省市区三级联动
 * @Autor: fy
 * @Date: 2021-09-13 10:15:11
 * @LastEditors: fy
 * @LastEditTime: 2021-09-16 09:10:45
-->
<template>
    <div class="c-cascader-city">
        <el-cascader
            v-model="obj.value"
            :options="cityList"
            :props="{ value: 'id', label: 'name' }"
            :size="size"
            :disabled="disabled || obj.disabled"
            :clearable="clearable"
            @change="onChange"
        ></el-cascader>
    </div>
</template>
 
<script>
import { sessionSet, sessionGet } from '@/utils/storage'
export default {
    name: 'c-cascader-city',
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
            default: true
        }
    },
    data() {
        return {
            cityList: [],
            value: [],
            names: []
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.cityList = sessionGet('cityList') || []
            if (!this.cityList || !this.cityList.length) {
                this.getCtiyList()
            }
        },

        // 获取城市列表数据
        async getCtiyList() {
            try {
                let { data } = await this.$api.getCityList()
                this.cityList = this.getTreeData(data)
                sessionSet('cityList', this.cityList)
            } catch (e) {
                console.error('获取城市列表失败：', e.msg)
            }
        },

        // 递归处理子级长度为0的情况
        getTreeData(data) {
            for (let item of data) {
                if (!item.children.length) {
                    item.children = undefined
                } else {
                    this.getTreeData(item.children)
                }
            }
            return data
        },

        // 根据code获取name
        getCodeToName(data) {
            for (let item of data) {
                if (this.value.indexOf(item.id) > -1) {
                    this.names.push(item.name)
                    if (item.children && item.children.length > 0) {
                        this.getCodeToName(item.children)
                    }
                }
            }
            return this.names ? this.names.join('/') : ''
        },

        onChange() {
            this.$emit('change')
        }
    }
}
</script>
<style lang="scss" scoped>
.c-cascader-city {
    .el-cascader {
        width: 220px;
    }
}
</style>