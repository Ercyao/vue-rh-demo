<!--
 * @Description: 控件-日期时间范围选择
 * @Autor: fy
 * @Date: 2021-09-08 16:49:05
 * @LastEditors: fy
 * @LastEditTime: 2021-09-18 17:39:53
-->
<template>
    <el-form class="c-date-range" label-width="100px" label-suffix=":" label-position="left">
        <el-form-item :label="obj.startText" :required="obj.required">
            <c-date
                type="range"
                :obj="obj"
                :value="start"
                :placeholder="startPlaceholder || (obj.placeholder + obj.startText)"
                :picker-options="startPickerOptions"
                :disabled="disabled || obj.disabled"
                :clearable="clearable"
                isRange
                :isDetail="isDetail"
                @change="onStartChange"
            />
        </el-form-item>
        <el-form-item :label="obj.endText" :required="obj.required">
            <c-date
                type="range"
                :obj="obj"
                :value="end"
                :placeholder="endPlaceholder || (obj.placeholder + obj.endText)"
                :picker-options="endPickerOptions"
                :disabled="disabled || obj.disabled"
                :clearable="clearable"
                isRange
                :isDetail="isDetail"
                @change="onEndChange"
            />
        </el-form-item>
    </el-form>
</template>

<script>
import CDate from '@/components/date/c-date.vue'
export default {
    name: 'c-date-range',
    components: { CDate },
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
        },
        startPlaceholder: {
            type: String,
            default: ''
        },
        endPlaceholder: {
            type: String,
            default: ''
        },
        showWeek: {
            type: Boolean,
            default: true
        },
        isDetail: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            start: '',
            end: '',
            formate: 'Y-M-D h:m'
        }
    },
    computed: {
        // 开始时间可选择范围控制
        startPickerOptions() {
            let end = this.end ? new Date(this.end).getTime() : null
            if (this.obj.overToday && !end) {
                return {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                }
            } else if (!this.obj.overToday && end) {
                return {
                    disabledDate(time) {
                        return time.getTime() > end
                    }
                }
            } else if (this.obj.overToday && end) {
                return {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7 || time.getTime() > end
                    }
                }
            } else {
                return {}
            }
        },
        // 结束时间可选择范围控制
        endPickerOptions() {
            let start = this.start ? new Date(this.start).getTime() : null
            if (this.obj.overToday && !start) {
                return {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                }
            } else if (start) {
                return {
                    disabledDate(time) {
                        return time.getTime() < start
                    }
                }
            } else {
                return {}
            }
        }
    },
    mounted() {
        if (this.obj.value && this.obj.value.startAt) {
            this.start = this.$utils.formatDate(this.obj.value.startAt, this.obj.formate)
            this.end = this.$utils.formatDate(this.obj.value.endAt, this.obj.formate)
        }
    },
    methods: {
        onStartChange(e, type) {
            this.start = e
            this.onChange(e, type)
        },

        onEndChange(e, type) {
            this.end = e
            this.onChange(e, type)
        },

        onChange(e, type) {
            this.setValue()
            this.$emit('change', e, this.obj.type)
        },

        setValue() {
            console.log(1111, this.start)
            if (!this.start || !this.end) return
            let count = this.count(this.start, this.end)
            this.obj.value = {
                count: count + '天',
                endAt: Date.parse(new Date(this.start)),
                endType: '',
                number: count + '天',
                startAt: Date.parse(new Date(this.start)),
                startType: ''
            }
            console.log(33, this.obj.value)
        },

        count(start, end) {
            let date1 = new Date(start)
            let date2 = new Date(end)
            return (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
        }
    }
}
</script>


<style scoped>
.c-date-range {
    width: 220px;
    line-height: 40px;
}
</style>
