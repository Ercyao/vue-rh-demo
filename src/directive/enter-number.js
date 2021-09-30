/*
 * @Description: 指令 - 控制只能输入纯数字or有小数点or正负整数or正负数有小数
 * @Autor: fy
 * @Date: 2021-09-10 10:55:15
 * @LastEditors: fy
 * @LastEditTime: 2021-09-18 15:54:10
 */

// 示例： v-enter-number or  v-enter-number.point or v-enter-number="{ args: 'point', dotCount: 2, max: 10, min: 1 }"

import Vue from 'vue'

let type = 'number' // 类型 { number: 纯数字  point：有小数点  neg：正负整数   pointNeg:正负数有小数 }
let params = {} // 传入参数
let lastValue = null // 上一次输入的值（用于记录中文输入法下的）

// 获取传入的数据
function getTypeAndParmas(binding) {
  // 获取类型和值
  type = binding.arg || binding.value.args
  if (!binding.arg && !binding.value.args && binding.rawName) {
    let rawNames = binding.rawName.split('.')
    rawNames.length > 1 && type == rawNames[1]
  }
  params = binding.value
  // console.log('binding.arg', type, binding, params)
}

// 按键事件
function onKeypress(e) {
  e = e || window.event
  let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode
  let re = /\d/
  switch (type) {
    case 'point':
      re = /\d|\./
      break
    case 'pointNeg':
      re = /\d|\.|-/
      break
    case 'neg':
      re = /\d|-/
      break
    default:
      re = /\d/
      break
  }

  if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
    if (e.preventDefault) {
      // console.log('preventDefault', e)
      e.preventDefault()
    } else {
      // console.log('returnValue', e)
      e.returnValue = false
    }
  }
}

// 输入事件
function onInput(e, LOCK) {
  // console.log('l输入事件-----------', lastValue, e.target.value)
  if (!LOCK) {
    if (type == 'point') {
      let dotCount = params.dotCount || 2
      let reg = new RegExp('^\\d*(\\.?\\d{0,' + dotCount + '})', 'g')
      e.target.value = e.target.value.match(reg)[0] || null
      //  e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]
    } else if (type == 'pointNeg') {
      let dotCount = params.dotCount || 2
      let reg = new RegExp('^\\-?\\d*(\\.?\\d{0,' + dotCount + '})', 'g')
      e.target.value = e.target.value.match(reg)[0] || null
    } else if (type == 'neg') {
      e.target.value = e.target.value.replace(/[^\-?\d]/g, '') || null
    } else {
      e.target.value = e.target.value.replace(/\D/, '') || null
    }
    lastValue = e.target.value
    // console.log('no-LOCK------------', e.target.value, lastValue)
  } else {
    let re = null
    if (type == 'point' || type == 'pointNeg') {
      re = /\d|\./
    } else {
      re = /\d/
    }

    if (re.test(e.target.value)) {
      let len = e.data ? e.data.length : 1

      // 如果是中文输入法下的输入中文处理
      if (/.*[\u4e00-\u9fa5]+.*$/.test(e.target.value)) {
        e.target.value = e.target.value.slice(0, e.target.value.length - len)
        // console.log('中文输入法-中文处理--------', e.target.value, lastValue)
      } else {
        // 中文输入法下输入拼音却按下回车变成英文字符串
        if (e.target.value == lastValue) {
          e.target.value = e.target.value.slice(0, e.target.value.length - len)
        }
        // console.log(' 中文输入法-英文字符串--------', e.target.value, lastValue)
      }

      lastValue = e.target.value
      // console.log('lastValue------------', lastValue, e.target.value)
    } else {
      e.target.value = lastValue
      // console.log('LOCK---不是数字--------', lastValue, e.target.value)
    }
  }

  // 处理限制最大和最小值
  if (params.maxNumber && e.target.value > params.maxNumber) {
    // console.log('大于最大值------------', params.maxNumber)
    e.target.value = params.maxNumber

    return
  }
  if (params.minNumber && e.target.value < params.minNumber) {
    // console.log('小于最小值------------', params.minNumber)
    e.target.value = params.minNumber
    return
  }
}

// 使用方法： v-enter-number
Vue.directive('enterNumber', {
  bind: function(el, binding) {
    getTypeAndParmas(binding)
  },
  inserted: function(el) {
    let LOCK = false //是否开启中文输入法
    el.addEventListener(
      'compositionstart',
      (e) => {
        lastValue = null
        LOCK = true //加上锁
        // console.log('compositionstart', e.target.value)
      },
      false
    )

    el.addEventListener(
      'compositionend',
      (e) => {
        LOCK = false // 解锁
        // console.log('compositionend', e.target.value)
      },
      false
    )

    //失去焦点=>保留指定位小数
    // el.addEventListener(
    //   'keyup',
    //   (e) => {
    //     console.log('keyup', e.target.value)
    //   },.native
    //   false
    // )

    el.addEventListener('keypress', function(e) {
      LOCK = false
      // console.log('keypress--------', e.target.value)
      onKeypress(e)
    })

    el.addEventListener(
      'input',
      (e) => {
        // console.log('-----input--------', e.target.value)
        onInput(e, LOCK)
      },
      false
    )
  },
  update: function(el) {
    el.addEventListener(
      'paste',
      (e) => {
        e.preventDefault()
      },
      false
    )
  },
})
