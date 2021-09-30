<!--
 * @Description: 控件-部门选择
 * @Autor: fy
 * @Date: 2021-09-09 10:44:00
 * @LastEditors: fy
 * @LastEditTime: 2021-09-22 09:18:14
-->
<template>
    <div class="c-department">
        <ul class="department-list-ul">
            <li v-for="(item,index) in checkList" :key="item.id" class="department-list-ul-li">
                <span class="department-list-ul-li-icon el-icon-user-solid"></span>
                <span class="department-list-ul-li-name">{{item.name}}</span>
                <span class="department-list-ul-li-delete el-icon-error" @click="onDelete(index)" v-if="!disabled && !obj.disabled && !isDetail"></span>
            </li>
        </ul>
        <el-button class="department-btn" icon="el-icon-plus" :size="size" :disabled="disabled || obj.disabled" @click="onAdd" v-if="!isDetail">添加</el-button>

        <span class="department-text" v-if="checkList.length <1 && isDetail">--</span>

        <popup-tree-select
            ref="PopupTreeSelect"
            title="添加部门"
            :size="size"
            :disabled="disabled"
            :defaultProps="defaultProps"
            :callback="getUserAllDepartments"
            @confirm="onConfirm"
        />
    </div>
</template>

<script>
import PopupTreeSelect from '@/components/popup/popup-tree-select.vue'
export default {
    name: 'c-department',
    components: { PopupTreeSelect },
    props: {
        obj: {
            type: Object,
            default: () => {}
        },
        index: {
            type: Number,
            default: null
        },
        fIndex: {
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
            defaultProps: { children: 'children', label: 'name' },
            params: { needCompanyUser: 1, userId: '428967346779066368' },
            list: [], // 部门列表
            checkList: [], // 部门选中列表
            customList: this.$store.state.customData
        }
    },
    computed: {
        customData() {
            return this.$store.state.customData
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.obj.list && (this.checkList = this.obj.list)
        })
    },
    methods: {
        // 添加部门
        onAdd() {
            this.$refs.PopupTreeSelect.open(this.checkList)
        },

        // 获取部门数据
        async getUserAllDepartments(callback) {
            try {
                let { data } = await this.$api.getUserAllDepartments(this.params)
                this.list = data
                callback(this.list)
            } catch (e) {
                callback([])
                console.error('获取部门数据失败：', e.msg)
            }
        },

        // 删除选中事件
        onDelete(index) {
            this.checkList.splice(index, 1)

            this.onChange()
        },

        // 点击确定选中的触发事件
        onConfirm(checkList) {
            this.checkList = checkList

            this.onChange()
        },

        onChange() {
            this.$emit('change', this.checkList, this.obj.type)
            this.customList[this.index].list = []
            this.customList[this.index].value = []
            this.customList[this.index].list = this.checkList
            this.customList[this.index].value = this.checkList.map(item => item.id)
            this.$store.commit('set/customData', this.customList)
        }
    }
}
</script>


<style lang="scss" scoped>
.c-department {
    line-height: normal;

    .department-list-ul {
        display: inline-block;
        &-li {
            position: relative;
            display: inline-block;
            padding: 7px 10px;
            border: 1px solid #d5d5d5;
            margin-right: 16px;
            margin-top: 8px;
            margin-bottom: 8px;
            border-radius: 3px;
            .department-list-ul-li-icon {
                margin-right: 6px;
                color: #00c2b3;
            }
            .department-list-ul-li-delete {
                position: absolute;
                right: -8px;
                top: -9px;
                font-size: 18px;
                color: #ec4e4e;
                cursor: pointer;
            }
        }
    }
    .department-btn {
        margin-top: 8px;
        margin-bottom: 8px;
    }

    .department-text {
        line-height: 40px;
    }
}
</style>
