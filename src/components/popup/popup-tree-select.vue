<!--
 * @Description: 弹窗-树形选择 (目前有部门和员工在调用)
 * @Autor: fy
 * @Date: 2021-09-10 09:19:57
 * @LastEditors: fy
 * @LastEditTime: 2021-09-18 17:11:59
-->
<template>
    <el-dialog :title="title" :visible.sync="isShow" :width="width">
        <div class="popup-content" v-loading="loading">
            <div class="popup-content-left">
                <div class="search-input">
                    <el-input v-model="keyword" placeholder="请输入内容" prefix-icon="el-icon-search" size="small" @input="onSearch"></el-input>
                </div>
                <el-tree
                    ref="treeSelect"
                    :filter-node-method="filterNode"
                    :data="list"
                    :node-key="nodeKey"
                    default-expand-all
                    :expand-on-click-node="false"
                    :props="defaultProps"
                    class="list-tree"
                    highlight-current
                >
                    <span class="list-tree-node" slot-scope="{ node, data }" @click.stop="() => onCheck(node, data)">
                        <span class="list-tree-node-name">{{ node.label }}</span>
                        <template v-if="isCheckShow">
                            <el-checkbox v-model="data.checked" @click.native.prevent v-if="!data[childrenKey] || data[childrenKey].length < 1"></el-checkbox>
                        </template>
                    </span>
                </el-tree>
            </div>

            <div class="popup-content-right">
                <p class="popup-content-right-header">
                    <span>已选</span>
                    <el-button type="text" @click="onClearAll">清空</el-button>
                </p>
                <ul class="select-list-ul">
                    <li v-for="(item, index) in checkList" :key="item.id" class="select-list-ul-li">
                        <span class="select-list-ul-li-name">{{ item[labelKey] || item.realname}}</span>
                        <span class="select-list-ul-li-delete el-icon-error" @click="onDelete(item, index)"></span>
                    </li>
                </ul>
            </div>
        </div>

        <div slot="footer" class="dialog-footer">
            <el-button @click="close" :size="size">取 消</el-button>
            <el-button type="primary" @click="onConfirm" :size="size">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'popup-tree-select',
    props: {
        obj: {
            type: Object,
            default: () => {}
        },
        width: {
            type: String,
            default: '700px'
        },
        title: {
            type: String,
            default: '选择'
        },
        size: {
            type: String,
            default: 'small'
        },
        nodeKey: {
            type: String,
            default: 'id'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        defaultProps: {
            type: Object,
            default: () => {}
        },
        callback: Function,
        isDetail: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isShow: false,
            loading: false,
            keyword: null,
            checkedKeys: [],
            list: [],
            checkList: [],
            isCheckShow: true
        }
    },
    computed: {
        labelKey() {
            return this.defaultProps && this.defaultProps.label ? this.defaultProps.label : 'label'
        },
        childrenKey() {
            return this.defaultProps && this.defaultProps.children ? this.defaultProps.children : 'children'
        }
    },
    methods: {
        open(checkList) {
            this.isShow = true
            this.init(checkList)
        },

        close() {
            this.isShow = false
        },

        // 初始化选中的数据的处理和显示列表数据展示
        init(checkList) {
            this.loading = true
            if (checkList && checkList.length > 0) {
                this.checkList = JSON.parse(JSON.stringify(checkList))
            } else {
                this.checkList = []
            }

            this.callback(val => {
                this.loading = false
                val && (this.list = this.initTree(val, this.checkList))
            })
        },

        // 初始化树形数据
        initTree(data, list) {
            if (!data) return
            data.map(item => {
                item.checked = list.some(ele => ele[this.nodeKey] == item[this.nodeKey])
                if (item[this.childrenKey] && item[this.childrenKey].length > 0) {
                    this.initTree(item[this.childrenKey], list)
                }
            })
            return data
        },

        // 搜索数据
        onSearch() {
            this.$refs.treeSelect.filter(this.keyword)
        },

        //过滤树形数据
        filterNode(value, data) {
            if (!value) return true
            return data[this.labelKey].indexOf(value) !== -1
        },

        // 更新选中状态视图
        updateCheckStatus() {
            this.isCheckShow = false
            this.$nextTick(() => {
                this.isCheckShow = true
            })
        },

        // 选择数据
        onCheck(item, data) {
            data.disabled = true
            if (!data.checked) {
                data.checked = true
                this.checkList.push(data)
            }

            this.updateCheckStatus()
        },

        // 清空
        onClearAll() {
            this.checkList = []
            this.$forceUpdate()
            this.list = this.clearTree(this.list)

            this.updateCheckStatus()
        },

        // 处理清空树形选择数据
        clearTree(data) {
            if (!data) return
            data.map(item => {
                item.checked = false
                if (item[this.childrenKey] && item[this.childrenKey].length > 0) {
                    this.recursion(item[this.childrenKey])
                }
            })
            return data
        },

        // 删除选中某个数据
        onDelete(item, index) {
            this.checkList.splice(index, 1)
            let i = this.list.findIndex(ele => ele.id == item.id)
            this.list[i].checked = false

            this.updateCheckStatus()
        },

        // 确定选择事件
        onConfirm() {
            this.close()
            this.$emit('confirm', this.checkList)
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
    padding-top: 0;
}
.popup-content {
    line-height: normal;
    min-height: 500px;
    display: flex;
    border: 1px solid rgb(227, 227, 227);
    &-left {
        flex: 1;
        overflow-x: hidden;
        border-right: 1px solid rgb(227, 227, 227);
        .search-input {
            padding: 9px 20px;
            border-bottom: 1px solid #e3e3e3;
        }
        .list-tree {
            width: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            box-sizing: border-box;
            /deep/ .el-tree-node__content {
                width: 100%;
                height: 40px;
                border-bottom: 1px solid #ccc;
            }
            .list-tree-node {
                width: 94%;
                padding: 10px 20px 10px 0;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .list-tree-node-name {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding-right: 10px;
                }
            }
        }
    }
    &-right {
        width: 262px;
        overflow-x: hidden;
        box-sizing: border-box;
        .popup-content-right-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 15px;
            margin: 0;
            font-size: 16px;
            color: #030303;
            border-bottom: 1px solid #e3e3e3;
        }
        .select-list-ul {
            font-size: 14px;
            overflow-x: hidden;
            overflow-y: auto;
            &-li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 10px 10px 15px;
                border-bottom: 1px solid #e3e3e3;
                .select-list-ul-li-delete {
                    cursor: pointer;
                    font-size: 18px;
                    color: #ec4e4e;
                    margin-left: 10px;
                }
            }
        }
    }
}

/deep/ .el-dialog__footer {
    padding: 10px 20px;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.1);
}
</style>
