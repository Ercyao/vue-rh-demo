<!--
 * @Description: 明细的自定义表单的显示
 * @Autor: fy
 * @Date: 2021-09-09 11:48:24
 * @LastEditors: fy
 * @LastEditTime: 2021-09-18 17:20:04
-->
<template>
    <div class="c-form">
        <component
            :is="componentName"
            :obj="obj"
            :index="Number(index)"
            :fIndex="Number(fIndex)"
            :value="value"
            :isDetail="isDetail"
            isMultiple
            @change="onChange"
        />
    </div>
</template>

<script>
import CInputText from '@/components/input/c-input-text.vue'
import CTextarea from '@/components/input/c-textarea.vue'
import CInputNumber from '@/components/input/c-input-number.vue'
import CInputMoney from '@/components/input/c-input-money.vue'
import CSelectRadio from '@/components/select/c-select-radio.vue'
import CSelectCheckbox from '@/components/select/c-select-checkbox.vue'
import CDate from '@/components/date/c-date.vue'
import CDateRange from '@/components/date/c-date-range.vue'
import CUploadFile from '@/components/upload/c-upload-file.vue'
import CDepartment from '@/components/department/c-department.vue'
import CPartner from '@/components/partner/c-partner.vue'
import CCascaderCity from '@/components/city/c-cascader-city.vue'
import CMultiple from '@/components/multiple/c-multiple.vue'
const types = {
    text: 'c-input-text',
    textarea: 'c-textarea',
    number: 'c-input-number',
    money: 'c-input-money',
    radio: 'c-select-radio',
    checkbox: 'c-select-checkbox',
    date: 'c-date',
    dateArea: 'c-date-range',
    file: 'c-upload-file',
    department: 'c-department',
    partner: 'c-partner',
    city: 'c-cascader-city',
    multiple: 'c-multiple'
}

export default {
    name: 'c-form-multiple',
    components: {
        CTextarea,
        CInputText,
        CInputNumber,
        CInputMoney,
        CSelectRadio,
        CSelectCheckbox,
        CDate,
        CDateRange,
        CUploadFile,
        CDepartment,
        CPartner,
        CCascaderCity,
        CMultiple
    },
    props: {
        obj: {
            type: Object,
            default: () => {}
        },
        value: {
            type: String || Number || Array,
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
        isDetail: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    computed: {
        componentName() {
            return types[this.obj.type]
        }
    },
    methods: {
        onChange(e, type) {
            this.$emit('change', e, type)
        }
    }
}
</script>


<style scoped>
.c-form {
    line-height: normal;
}
</style>
