<!--
 * @Description: 控件-员工选择
 * @Autor: fy
 * @Date: 2021-09-09 10:44:06
 * @LastEditors: fy
 * @LastEditTime: 2021-09-22 09:20:15
-->
<template>
    <div class="c-partner">
        <ul class="partner-list-ul">
            <li v-for="item in checkList" :key="item.id" class="partner-list-ul-li">
                <span class="partner-list-ul-li-icon el-icon-user-solid"></span>
                <span class="partner-list-ul-li-name">{{item.realname}}</span>
            </li>
            <li class="partner-list-ul-li" :class="[disabled || obj.disabled ? 'disabled' :'']" @click="onAdd" v-if="!isDetail">
                <span class="partner-list-ul-li-icon el-icon-plus"></span>
                <span class="partner-list-ul-li-name">添加人员</span>
            </li>
        </ul>

        <span class="partner-text" v-if="checkList.length <1 && isDetail">--</span>

        <popup-tree-select
            ref="PopupTreeSelect"
            title="添加人员"
            :size="size"
            nodeKey="userId"
            :disabled="disabled"
            :defaultProps="defaultProps"
            :callback="findTreeForProgram"
            @confirm="onConfirm"
        />
    </div>
</template>

<script>
import PopupTreeSelect from '@/components/popup/popup-tree-select.vue'
export default {
    name: 'c-partner',
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
            defaultProps: { children: 'persons', label: 'name' },
            params: { needCompanyUser: 1, status: 0 },
            list: [], // 员工列表
            checkList: [], // 员工选择好的数据列表
            customList: this.$store.state.customData
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.obj.list && (this.checkList = this.obj.list)
        })
    },
    methods: {
        // 添加员工
        onAdd() {
            this.$refs.PopupTreeSelect.open(this.checkList)
        },

        // 获取员工数据
        async findTreeForProgram(callback) {
            try {
                let { data } = await this.$api.findTreeForProgram(this.params)
                this.list = data
                callback(this.list)
            } catch (e) {
                callback([])
                console.error('获取员工数据失败：', e.msg)
            }
        },

        // 删除选中事件
        onDelete(index) {
            this.checkList.splice(index, 1)

            this.onChange()
        },

        onConfirm(checkList) {
            this.checkList = checkList

            this.onChange()
        },

        onChange() {
            this.$emit('change', this.checkList, this.obj.type)
            this.customList[this.index].list = []
            this.customList[this.index].value = []
            this.customList[this.index].list = this.checkList // this.setList(this.checkList)
            this.customList[this.index].value = this.checkList.map(item => item.userId)
            console.log('员工-change', this.customList[this.index])
            this.$store.commit('set/customData', this.customList)
        },

        setList(checkList) {
            return checkList.map(item => {
                return {
                    activated: item.activated,
                    avatar: item.avatar,
                    createAt: item.createAt,
                    createBy: item.createBy,
                    departmentId: item.departmentId,
                    departmentName: item.departmentName,
                    gender: item.gender,
                    id: item.id,
                    nickname: item.nickname,
                    positionName: item.positionName,
                    realname: item.realname,
                    roleName: item.roleName,
                    updateAt: item.updateAt,
                    updateBy: item.updateBy
                }
            })
        }
    }
}
</script>


<style lang="scss" scoped>
.c-partner {
    line-height: normal;
    .partner-list-ul {
        &-li {
            position: relative;
            display: inline-block;
            text-align: center;
            width: 50px;
            margin-right: 10px;
            margin-top: 8px;
            margin-bottom: 8px;
            cursor: pointer;
            .partner-list-ul-li-icon {
                width: 30px;
                height: 30px;
                line-height: 30px;
                margin-bottom: 6px;
                border-radius: 50%;
                overflow: hidden;
                border: 1px solid #00c2b3;
                color: #00c2b3;
                font-weight: bold;
            }
            .partner-list-ul-li-name {
                max-width: 5em;
                height: 20px;
                line-height: 20px;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 12px;
            }
        }

        .disabled {
            color: #999;
            cursor: no-drop;
            .partner-list-ul-li-icon {
                border: 1px solid #999;
                color: #999;
            }
        }
    }

    .partner-text {
        line-height: 40px;
    }
}
</style>
