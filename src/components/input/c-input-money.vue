<!--
 * @Description: 控件-金额文本框
 * @Autor: fy
 * @Date: 2021-09-08 16:49:33
 * @LastEditors: fy
 * @LastEditTime: 2021-09-22 09:09:57
-->
<template>
    <div class="c-input-money">
        <!-- v-model="obj.value" -->
        <!-- @input="onChange" -->
        <template v-if="!isDetail">
            <el-input
                :key="index"
                v-model="money"
                :placeholder="obj.placeholder"
                :size="size"
                :disabled="disabled || obj.disabled"
                :clearable="clearable"
                v-enter-number="format"
                @input.native="onChange"
                v-if="(obj.isInput || obj.editMode > 0) && !isDetail"
            ></el-input>
            <span class="c-input-money-text" :class="[money ? '' : 'placeholder']" v-else>{{money || obj.value || obj.placeholder }}</span>
        </template>
        
        <span class="c-input-money-text" v-else>{{money || obj.value || '--' }}</span>
    </div>
</template>

<script>
import { setLinkedValue } from '@/utils/linkedMoney.js'
export default {
    name: 'c-input-money',
    props: {
        obj: {
            type: Object,
            default: () => {}
        },
        value: {
            type: Number,
            default: null
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
        clearable: {
            type: Boolean,
            default: false
        },
        // 是否是明细
        isMultiple: {
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
            money: '',
            customList: this.$store.state.customData,
            re: /^[\-\.\d]*$/
        }
    },
    computed: {
        format() {
            let args = this.obj.dotCount > 0 ? 'point' : 'number'
            return { args: args, dotCount: this.obj.dotCount, maxNumber: this.obj.maxNumber, minNumber: this.obj.minNumber }
        },
        customData() {
            return this.$store.state.customData
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.money = this.obj.value || ''
        })
    },
    methods: {
        onChange(ev) {
            this.nativeInput(ev)
        },

        // 解决element本身封装的input事件问题，直接使用原生方法（问题原因是中文输入法下输入英文，会被截断掉，导致没有按下回车事件，因此没有结束中文输入法，所以输入数字不触发input的事件）
        nativeInput(ev) {
            // 延迟加载，先让指令绑定的input事件先执行
            setTimeout(() => {
                let e = ev.target.value
                if (e > this.obj.maxNumber) {
                    e = this.obj.maxNumber
                }
                if (!this.re.test(e)) return
                this.setValue(e)
                console.log('金额的改变：', e)
                this.$emit('change', e, this.obj.type)
            }, 0)
        },

        // old(e) {
        //     if (e > this.obj.maxNumber) {
        //         e = this.obj.maxNumber
        //     }
        //     this.setValue(e)
        //     this.$emit('change', e, this.obj.type)
        // },

        // 给当前输入的框赋值、设置customData数据
        setValue(e) {
            this.money = e
            if (this.isMultiple) {
                this.customList[this.index].conf[this.fIndex].value = e
            } else {
                this.customList[this.index].value = e
            }

            this.customList = setLinkedValue(this.customList, this.obj, this.isMultiple, 2)
            this.$store.commit('set/customData', this.customList)
        }
    },
    watch: {
        // 监听数据变化，计算结果赋值
        customData: {
            handler() {
                if (this.isMultiple) {
                    this.money = this.customList[this.index].conf[this.fIndex].value
                } else {
                    this.money = this.customList[this.index].value
                }

                this.obj.value = this.money
            },
            deep: true
        }
    }
}
</script>


<style lang="scss" scoped>
.c-input-money {
    width: 220px;
    line-height: normal;
    .c-input-money-text {
        line-height: 40px;
        font-size: 14px;
    }
    .placeholder {
        color: #999;
    }
}
</style>
