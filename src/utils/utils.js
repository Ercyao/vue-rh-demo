/*
 * @Description: 公共方法
 * @Autor: fy
 * @Date: 2021-09-14 11:05:33
 * @LastEditors: fy
 * @LastEditTime: 2021-09-17 14:34:50
 */

//  判断一个变量是否是空
export const isEmpty = (value) => {
  if (
    value === null ||
    value === '' ||
    value === 'undefined' ||
    value === undefined ||
    value === 'null'
  ) {
    return true
  } else {
    value =
      value !== 0
        ? JSON.parse(JSON.stringify(value).replace(/\s+/g, ''))
        : value
    if (value === '') {
      return true
    }
    return false
  }
}

const formatStr = (m) => {
  return m < 10 ? '0' + m : m
}
// 时间戳转成日期
export const formatDate = (value, type) => {
  value = parseInt(value)
  let time = new Date(value)
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  let h = time.getHours()
  let mm = time.getMinutes()
  let s = time.getSeconds()
  if (type == 'Y-m-d H:i:s') {
    return (
      y +
      '-' +
      formatStr(m) +
      '-' +
      formatStr(d) +
      ' ' +
      formatStr(h) +
      ':' +
      formatStr(mm) +
      ':' +
      formatStr(s)
    )
  } else if (type == 'Y-m-d H:i') {
    return (
      y +
      '-' +
      formatStr(m) +
      '-' +
      formatStr(d) +
      ' ' +
      formatStr(h) +
      ':' +
      formatStr(mm)
    )
  } else {
    return y + '-' + formatStr(m) + '-' + formatStr(d)
  }
}

// 深拷贝
export const deepCopy = (data) => {
  return data ? JSON.parse(JSON.stringify(data)) : data
}

// 计算处理 （加减乘除）
export const count = {
  //加
  add(arg1, arg2, fixed) {
    const { i, j } = getCountNumber(arg1, arg2)
    const num = getCountFixed(fixed)
    return ((parseInt(i * num) + parseInt(j * num)) / num).toFixed(fixed)
  },
  //减
  reduce(arg1, arg2, fixed) {
    const { i, j } = getCountNumber(arg1, arg2)
    const num = getCountFixed(fixed)
    return ((parseInt(i * num) - parseInt(j * num)) / num).toFixed(fixed)
  },
  //乘
  multiply(arg1, arg2, fixed) {
    const { i, j } = getCountNumber(arg1, arg2)
    const num = getCountFixed(fixed)
    return (parseInt(i * num * (j * num)) / num / num).toFixed(fixed)
  },
  //除
  divide(arg1, arg2, fixed) {
    const { i, j } = getCountNumber(arg1, arg2)
    return ((i * 1) / (j * 1)).toFixed(fixed)
  }
}

// 获取计算值
const getCountNumber = (i, j) => {
  if (i === 'NaN' || !i) i = 0
  if (j === 'NaN' || !j) j = 0
  return { i, j }
}

// 获取浮点对应的转换数值
const getCountFixed = (fixed) => {
  return !fixed || fixed < 3 ? 100 : Math.pow(10, fixed)
}
