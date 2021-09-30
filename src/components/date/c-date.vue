<!--
 * @Description: 控件-日期时间选择
 * @Autor: fy
 * @Date: 2021-09-08 16:49:05
 * @LastEditors: fy
 * @LastEditTime: 2021-09-22 09:05:18
-->
<template>
    <div class="c-date">
        <el-date-picker
            v-model="date"
            :type="dateType > 1 ? 'datetime' : 'date'"
            :placeholder="placeholder || obj.placeholder"
            :picker-options="datePickerOptions"
            :format="dateFormate "
            :value-format="dateValueFormate"
            :size="size"
            :disabled="disabled || obj.disabled"
            :clearable="clearable"
            @change="onChange"
            v-if="!isDetail"
        ></el-date-picker>

        <span v-else>{{date || '--'}}</span>
    </div>
</template>

<script>
export default {
    name: 'c-date',
    filters: {
        dateFormate(value) {
            const obj = { 'Y-M-D': 'yyyy-MM-dd', 'Y-M-D h:m': 'yyyy-MM-dd hh:mm', 'Y-M-D h:m:s': 'yyyy-MM-dd hh:mm:ss' }
            return obj[value]
        }
    },
    props: {
        obj: {
            type: Object,
            default: () => {}
        },
        value: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'small'
        },
        placeholder: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: true
        },
        showWeek: {
            type: Boolean,
            default: true
        },
        pickerOptions: {
            type: Object,
            default: () => {}
        },
        type: {
            type: String,
            default: 'date'
        },
        isRange: {
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
            date: '',
            formate: 'Y-M-D h:m'
        }
    },
    computed: {
        dateWeek() {
            if (!this.date) return ''
            let weekArray = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            let week = weekArray[new Date(this.date).getDay()]
            return week
        },
        dateType() {
            if (!this.obj.formate) return 1
            const obj = { 'Y-M-D': 1, 'Y-M-D h:m': 2, 'Y-M-D h:m:s': 3 }
            return obj[this.obj.formate]
        },
        dateFormate() {
            if (!this.obj.formate) return 'yyyy-MM-dd'
            const obj = { 'Y-M-D': 'yyyy-MM-dd', 'Y-M-D h:m': 'yyyy-MM-dd hh:mm', 'Y-M-D h:m:s': 'yyyy-MM-dd hh:mm:ss' }
            if (this.showWeek) {
                return obj[this.obj.formate] + ' (' + this.dateWeek + ')'
            }
            return obj[this.obj.formate]
        },
        dateValueFormate() {
            if (!this.obj.formate) return 'yyyy-MM-dd'
            const obj = { 'Y-M-D': 'yyyy-MM-dd', 'Y-M-D h:m': 'yyyy-MM-dd hh:mm', 'Y-M-D h:m:s': 'yyyy-MM-dd hh:mm:ss' }
            return obj[this.obj.formate]
        },

        datePickerOptions() {
            if (this.pickerOptions) return this.pickerOptions
            if (this.obj.overToday) {
                return {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7 //如果没有后面的-8.64e7就是不可以选择今天的
                    }
                }
            } else {
                return {}
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.isRange && this.obj.valueStr) {
                this.date = this.obj.valueStr
            } else {
                this.date = this.value
            }
        })
    },
    methods: {
        onChange(e) {
            if (!this.isRange) {
                this.obj.valueStr = this.date
                this.obj.value = Date.parse(new Date(this.date))
            }

            this.$emit('change', e, this.obj.type)
        }
    }
}
</script>


<style scoped>
.c-date {
    width: 220px;
    line-height: 40px;
}
</style>
