<!--
 * @Description: 控件 - 单选框
 * @Autor: fy
 * @Date: 2021-09-08 16:49:59
 * @LastEditors: fy
 * @LastEditTime: 2021-09-22 09:22:18
-->
<template>
    <div class="c-select-radio">
        <el-select
            v-model="obj.value"
            :placeholder="obj.placeholder"
            :size="size"
            :disabled="disabled || obj.disabled"
            :clearable="clearable"
            @change="onChange"
            v-if="!isDetail"
        >
            <el-option v-for="item in obj.items" :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>

        <span v-else>{{obj.value | fiterItem(obj.items)}}</span>
    </div>
</template>

<script>
export default {
    name: 'c-select-radio',
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
            linkList: [] // 选项有关联的数组
        }
    },
    computed: {
        customData() {
            return this.$store.state.customData
        }
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
            this.setLinkHideStatus(e)
            this.$emit('change', e, this.obj.type)
        },

        // 处理选中的数据所关联的数据，是否显示或隐藏
        setLinkHideStatus(e) {
            if (this.obj.items[e * 1 - 1].select && this.obj.items[e * 1 - 1].select.length > 0) {
                let index = null
                for (let item of this.obj.items[e * 1 - 1].select) {
                    index = this.customData.findIndex(ele => ele.id == item)
                    if (index > -1) {
                        this.linkList.push(index)
                        this.customData[index].hide = false
                    }
                }
            } else {
                for (let item of this.linkList) {
                    this.customData[item].hide = true
                }
            }
        }
    }
}
</script>



<style lang="scss" scoped>
.c-select-radio {
    line-height: 40px;
    .el-select {
        width: 220px;
    }
}
</style>