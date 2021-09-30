/*
 * @Description: 关联金额计算
 * @Autor: fy
 * @Date: 2021-09-16 10:37:11
 * @LastEditors: fy
 * @LastEditTime: 2021-09-17 15:08:12
 */
import * as utils from '@/utils/utils.js' // 引入公共方法

//======================== 金额控件更改联动数据处理  start ======================================//
/**
 *  1. 先判断传入对象是否存在
 *  2. 在判断当前的是否有关联的数据，有就表示自己改变，会影响关联的数据变化
 *  3. 遍历关联的数据，判断关联的数据是否关联的是明细里面的数据
 *  4. 是关联明细里面的数据，就找到明细里面的关联数据它本身的应该得出结果的计算公式，获取到计算公式，便进行计算
 *  5. 不是关联明细的数据，判断是否本身属于明细里面的控件，如果不是的话，就表示是第一层的控件关联第一层的数据，可以实时改变，如果是的话，需要等明细数据新增或者编辑完了，才好计算
 *  6. 最后给相关联数据赋值
 * */
/**
 * @Description: 设置联动的数据值
 * @Author: fy
 * @Param: customList-遍历的数组   obj-当前控件访问的对象   isMultiple-是否是明细里面的控件
 * @Return: 返回一个处理好联动数据的新的数组
 */
export const setLinkedValue = (customList, obj, isMultiple, fixed) => {
  if (
    !customList ||
    !customList.length ||
    !obj ||
    !obj.linked ||
    !obj.linked.length
  )
    return customList
  // console.log('----setLinkedValue---', customList, obj.text, isMultiple)

  for (let item of obj.linked) {
    // 相关联的是明细
    if (item.fIndex > -1) {
      customList[item.index].conf[item.fIndex].value = getCountValue(
        customList,
        customList[item.index].conf[item.fIndex],
        'multiple',
        fixed
      )
    } else {
      !isMultiple &&
        (customList[item.index].value = getCountValue(
          customList,
          customList[item.index],
          'normal',
          fixed
        ))
    }
  }

  return customList
}

/**
 *  1. 先判断传入对象是否存在
 *  2. 在判断当前的是否有运算公式数组
 *  3. 遍历运算公式的数据，判断关联的数据是否是操作符号
 *  4. 是操作符号就直接保存
 *  5. 是数字的话，就判断是否类型是否是明细数据，不是明细数据，就直接拿到对应下标数据的值value，是明细数据的话，就找到对应明细下的值value
 *  6. 最后返回计算公式, 获取运算公式结果
 * */
/**
 * @Description: 根据计算公式运算结果值
 * @Author: fy
 * @Param: customList-遍历的数组   obj-当前控件访问的对象   type-是否明细控件里面明细的计算公式（ multiple:是）  fixed-要保留的小数点位数
 * @Return: 获取运算后的值
 */
export const getCountValue = (customList, obj, type, fixed) => {
  if (
    !customList ||
    !customList.length ||
    !obj ||
    !obj.count ||
    !obj.count.length
  )
    return 0
  // console.log('----getCountValue---', obj.text)

  let arr = []
  for (let item of obj.count) {
    if (item.type == 'operator') {
      item.value && arr.push(item.value)
    } else {
      if (customList[item.index]) {
        // 要取的值是明细里面的
        if (item.fIndex > -1) {
          // 当前控件也是明细里面的
          if (type == 'multiple') {
            if (
              customList[item.index].conf &&
              customList[item.index].conf[item.fIndex].value
            ) {
              arr.push(customList[item.index].conf[item.fIndex].value)
            }
          } else {
            //  当前控件不是明细里面的，但要取的值是明细里面的（表示是在第一层处理变化，而不是在明细）
            if (
              customList[item.index].data &&
              customList[item.index].data.length
            ) {
              arr.push(
                getMultipleCount(customList, item.index, item.fIndex, fixed)
              )
            }
          }
        } else {
          customList[item.index].value && arr.push(customList[item.index].value)
        }
      }
    }
  }

  return getCountSum(arr, fixed)
}

/**
 * @Description: 在明细表单新建或者编辑完后，将明细列表的列先进行相加，获取最终的同列值
 * @Author: fy
 * @Param:  customList-遍历的数组   index-第一层的下标   fIndex-明细对应的下标   fixed-要保留的小数点位数
 * @Return: 返回明细表每列的总值
 */
const getMultipleCount = (customList, index, fIndex, fixed) => {
  let sum = 0
  for (let item of customList[index].data) {
    sum = utils.count.add(sum, item[fIndex].value, fixed)
  }
  return sum
}

/**
 * @Description: 在明细表单新建或者编辑完后 或 相关联的数据更新完了后，遍历明细的控件数组，找到除明细以外相关联的其他数据，保存下来下标
 * @Author: fy
 * @Param:  arr-控件数组
 * @Return: 返回不是明细的关联下标数组
 */
export const getNotMultipleLinkedList = (arr) => {
  if (!arr || !arr.length) return

  // console.log('返回不是明细的关联下标数组', arr)

  let linkedList = []
  for (let item of arr) {
    if (item.linked && item.linked.length > 0) {
      for (let ele of item.linked) {
        if (linkedList.indexOf(ele.index) == -1 && ele.fIndex == undefined) {
          linkedList.push(ele.index)
        }
      }
    }
  }

  return linkedList
}
//======================== 金额控件更改联动数据处理  end ======================================//

//======================== 运算公式 处理（ 有 加减乘除、括号 ）start ======================================//
/**
 * 1.先计算括号内的数据，消灭括号
 * 2.再计算乘除的数据，消灭乘除
 * 3.最后计算加减的数据，消灭加减
 * 4.得出总值
 **/
/**
 * @Description: 拿到总值后，转成字符串
 * @Author: fy
 * @Param:  arr-运算公式    fixed-要保留的小数点位数
 * @Return: 返回计算公式计算后的总值
 */
export const getCountSum = (arr, fixed) => {
  let list = removeBrackets(arr, fixed)
  list = getCountMDAR(list, fixed)

  console.log(
    '--计算公式: ',
    arr.join(''),
    ', --总值: ',
    list.length > 0 ? list.toString() : 0
  )
  return list.length > 0 ? list.toString() : 0
}

/**
 * @Description: 0.0 处理加减乘除计算
 * @Author: fy
 * @Param:  arr-运算公式    fixed-要保留的小数点位数
 * @Return: 返回去掉乘除和加减后的数组
 */
const getCountMDAR = (arr, fixed) => {
  let list = removeMultiplyAndDivide(arr, fixed)
  list = removeAddAndReduce(list, fixed)

  return list
}

/**
 * @Description: 1.0 递归循环计算提取括号内的值，并重组数组（消灭括号）
 * @Author: fy
 * @Param:  arr-运算公式    fixed-要保留的小数点位数
 * @Return: 返回去掉括号的数组
 */
const removeBrackets = (arr, fixed) => {
  let obj = { start: null, end: null }
  let sum = 0,
    a = [],
    b = [],
    list = []
  if (arr.indexOf('(') > -1 || arr.indexOf(')') > -1) {
    for (let index in arr) {
      if (arr[index] == '(') {
        obj.start = index * 1 + 1
      } else if (arr[index] == ')') {
        obj.end = index * 1 - 1
        list = arr.slice(start * 1, end * 1)
        sum = getCountMDAR(list, fixed)
        a = arr.slice(0, start * 1 - 1)
        b = arr.slice(end * 1 + 2, arr.length)
        return removeBrackets([...a, sum, ...b], fixed)
      }
    }
  }
  return arr
}

/**
 * @Description: 2.0 处理乘除计算，并重组数组（消灭乘除 ）
 * @Author: fy
 * @Param:  arr-运算公式    fixed-要保留的小数点位数
 * @Return: 返回去掉乘除的数组
 */
const removeMultiplyAndDivide = (arr, fixed) => {
  let sum = 0,
    a = [],
    b = []
  if (arr.indexOf('*') > -1 || arr.indexOf('/') > -1) {
    for (let index in arr) {
      if (['*', '/'].indexOf(arr[index]) > -1) {
        sum = setCountSum(
          arr[index * 1 - 1],
          arr[index * 1 + 1],
          0,
          arr[index],
          fixed
        )
        a = arr.slice(0, index * 1 - 1)
        b = arr.slice(index * 1 + 2, arr.length)
        return removeMultiplyAndDivide([...a, sum, ...b], fixed)
      }
    }
  }
  return arr
}

/**
 * @Description: 3.0 处理加减计算，计算总和（消灭加减 ）
 * @Author: fy
 * @Param:  arr-运算公式    fixed-要保留的小数点位数
 * @Return: 返回总和数组
 */
const removeAddAndReduce = (arr, fixed) => {
  let sum = 0,
    b = []
  if (arr.indexOf('+') > -1 || arr.indexOf('-') > -1) {
    for (let index in arr) {
      // 判断是否有乘除的计算
      if (['+', '-'].indexOf(arr[index]) > -1) {
        sum = setCountSum(
          arr[index * 1 - 1],
          arr[index * 1 + 1],
          0,
          arr[index],
          fixed
        )
        b = arr.slice(index * 1 + 2, arr.length)
        return removeAddAndReduce([sum, ...b], fixed)
      }
    }
  }
  return arr
}

/**
 * @Description: 加减乘除计算
 * @Author: fy
 * @Param:  arg1-第一个数字  arg2-第二个数字  sum-之前总值  type-是什么类型的计算  fixed-要保留的小数点位数
 * @Return: 返回 加 or 减 or 乘 or 除 计算后的值
 */
const setCountSum = (arg1, arg2, sum, type, fixed) => {
  //   console.log('加减乘除计算:', fixed)
  if (type == '*') {
    sum = utils.count.multiply(arg1, arg2, fixed)
  } else if (type == '/' || type == '÷') {
    sum = utils.count.divide(arg1, arg2, fixed)
  } else if (type == '+') {
    sum = utils.count.add(arg1, arg2, fixed)
  } else {
    sum = utils.count.reduce(arg1, arg2, fixed)
  }
  return sum
}
//======================== 运算公式 处理（ 有 加减乘除、括号 ）end  ======================================//
