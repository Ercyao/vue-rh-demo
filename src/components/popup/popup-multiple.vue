<!--
 * @Description: 弹窗-明细新增或编辑
 * @Autor: fy
 * @Date: 2021-09-09 10:36:35
 * @LastEditors: fy
 * @LastEditTime: 2021-09-18 18:05:25
-->
<template>
    <el-dialog :title="(isAddPage ? '添加' : '编辑') + title" :visible.sync="dialogFormVisible" class="popup-multiple" width="600px">
        <el-form label-width="100px" label-suffix=":" label-position="left" class="popup-multiple-form" v-if="dialogFormVisible">
            <template v-for="(item, fIndex) in obj.conf">
                <el-form-item :key="item.id" :label="item.text" :required="item.required" v-if="!item.hide">
                    <c-form-multiple :obj="item" :index="index" :fIndex="fIndex" @change="onChange" />
                </el-form-item>
            </template>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button :size="size" @click="close">取消</el-button>
            <el-button type="primary" :size="size" @click="onSave">保存</el-button>
            <el-button :size="size" @click="onConfirm">保存并新增</el-button>
        </div>
    </el-dialog>
</template>

<script>
import CFormMultiple from '@/components/form/c-form-multiple.vue'
import { getCountValue, getNotMultipleLinkedList } from '@/utils/linkedMoney.js'

export default {
    name: 'popup-multiple',
    components: { CFormMultiple },
    props: {
        obj: {
            type: Object,
            default: () => {}
        },
        index: {
            type: Number,
            default: null
        },
        title: {
            type: String,
            default: '明细'
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
            dialogFormVisible: false,
            isAddPage: true, // 是否是新增操作
            currentIndex: null, // 当前点击的是第几条数据，用于编辑操作
            customList: this.$store.state.customData
        }
    },
    methods: {
        open(item, i) {
            this.dialogFormVisible = true
            this.initValue(item, i)
            console.log('编辑-click-open', item)
        },

        // 初始化数据
        initValue(item, i) {
            if (!item) {
                this.clearData()
            } else {
                this.isAddPage = false
                this.currentIndex = i
                this.customList[this.index].conf = item
                this.$store.commit('set/customData', this.customList)
            }
        },

        close() {
            this.dialogFormVisible = false
            this.isAddPage = true
            this.clearData()
        },

        clearData() {
            this.customList[this.index].conf.map(item => (item.value = null))
            this.$store.commit('set/customData', this.customList)
        },

        // 触发更改
        onChange(e, type) {
            // console.log('明细框监听', e)
            this.$emit('change', e, type)
        },

        // 设置保存后的数据
        setData() {
            if (!this.customList[this.index].data) {
                this.customList[this.index].data = []
            }
            let obj = this.$utils.deepCopy(this.obj.conf)
            if (this.isAddPage) {
                this.customList[this.index].data.push(obj)
            } else {
                this.customList[this.index].data[this.currentIndex] = obj
            }

            this.setNotMultipleValue(this.obj.conf)

            this.$emit('confirm', this.customList[this.index].data)
        },

        // 处理跟明细相关的不属于明细的金额计算，分别给其赋值
        setNotMultipleValue(conf) {
            let linkedList = getNotMultipleLinkedList(conf)

            if (!linkedList || linkedList.length < 1) return
            let arr = []
            for (let item of linkedList) {
                arr.push(this.customList[item])
                this.setCustomListValue(item)
            }

            this.setDgNotMultipleValue(arr)
        },

        // 找到相关联的数组下面相关联的计算值
        setDgNotMultipleValue(arr) {
            let linkedList = getNotMultipleLinkedList(arr)

            if (!linkedList || linkedList.length < 1) return
            for (let item of linkedList) {
                this.setCustomListValue(item)
            }
        },

        // 设置值
        setCustomListValue(item) {
            let fixed = this.customList[item].type == ' money' ? 2 : this.customList[item].dotCount
            this.customList[item].value = getCountValue(this.customList, this.customList[item], 'normal', fixed)
            if (this.customList[item].editMode == 2) {
                this.customList[item].maxNumber = this.customList[item].value
            }
        },

        // 验证表单
        validateForm(callback) {
            for (let item of this.obj.conf) {
                if (item.required && !item.hide && !item.value) {
                    return callback(item.text + '不能为空')
                }
            }
            return callback()
        },

        // 保存
        onSave() {
            this.validateForm(msg => {
                if (msg) {
                    this.$message.warning(msg)
                } else {
                    this.setData()
                    this.close()
                }
            })
        },

        // 保存并新增(待处理)
        onConfirm() {
            this.validateForm(msg => {
                if (msg) {
                    this.$message.warning(msg)
                } else {
                    this.setData()
                    this.clearData()
                }
            })
        }
    }
}
</script>


<style lang="scss" scoped>
.popup-multiple {
    /deep/ .el-dialog__body {
        padding: 20px 40px 40px;
    }

    /deep/ .el-form-item__content {
        line-height: 40px;
        margin-bottom: 8px;
    }
    /deep/ .el-dialog__footer {
        padding: 10px 20px;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.1);
        box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.1);
    }
}
</style>
