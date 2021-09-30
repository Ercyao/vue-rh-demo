/*
 * @Description: 方法封装-本地数据存储（localStorage，sessionStorage）
 * @Autor: fy
 * @Date: 2021-09-13 15:38:07
 * @LastEditors: fy
 * @LastEditTime: 2021-09-13 16:02:23
 * @example：
 * 取： localGet(key)   或 localGet(key,'day')   或 localGet(key,'6000')           存： localSet(key,'1')
 * 取： sessionGet(key) 或 sessionGet(key,'day') 或 sessionGet(key,'6000')         存： sessionSet(key,'1')
 */
const timeObj = {
  second: 1000 * 60, //过期时间为1分钟
  hour: 1000 * 60 * 60, //过期时间为1小时
  day: 1000 * 60 * 60 * 24, //过期时间为24小时
  week: 1000 * 60 * 60 * 24 * 7, //过期时间为1周
}

// 取
const get = (key, expireDate, type) => {
  if (!key) return

  // 固定几个默认给值 second hour day week
  if (expireDate && Object.keys(timeObj).includes(expireDate)) {
    expireDate = timeObj[expireDate]
  }
  // console.log('get', key, expireDate)

  let item =
    type === 'sessionStorage'
      ? sessionStorage.getItem(key)
      : localStorage.getItem(key)

  if (!item && item == 'undefined') {
    console.log('找不到getItem', type, item)
    return
  }

  // 这点要判断是字符串 false 还是对象 true  ({id:1} or "{id:1}" 都是true)
  let result = /^[{\\[].*[}\]]$/g.test(item)
  try {
    result && typeof item === 'string' && (item = JSON.parse(item))
    if (item && item.time) {
      if (expireDate && new Date().getTime() - item.time > expireDate) {
        remove(key, type)
        console.log('信息已过期')
        return
      } else {
        if (
          JSON.stringify(item.data) == '{}' ||
          JSON.stringify(item.data) == '[]'
        ) {
          return null
        } else {
          return item.data
        }
      }
    } else {
      return item
    }
  } catch (e) {
    console.warn('获取本地存储报错，内容：', item)
    console.warn('获取本地存储报错，错误：', e)
    return
  }
}

// 存
const set = (key, value, type) => {
  if (!key) return

  let curTime = new Date().getTime()
  // 这点要判断是字符串还是对象
  let item = value

  typeof value !== 'string' &&
    (item = JSON.stringify({
      data: value,
      time: curTime,
    }))

  if (JSON.stringify(item.data) == '{}' || JSON.stringify(item.data) == '[]') {
    return
  } else {
    type === 'sessionStorage'
      ? sessionStorage.setItem(key, item)
      : localStorage.setItem(key, item)
  }
}

// 删除
const remove = (key, type) => {
  if (!key) return
  type === 'sessionStorage'
    ? sessionStorage.removeItem(key)
    : localStorage.removeItem(key)
}

export const localGet = (key, expireDate) => {
  return get(key, expireDate, 'localStorage')
}

export const localSet = (key, value) => {
  return set(key, value, 'localStorage')
}

export const localRemove = (key) => {
  return remove(key, 'localStorage')
}

export const sessionGet = (key, expireDate) => {
  return get(key, expireDate, 'sessionStorage')
}

export const sessionSet = (key, value) => {
  return set(key, value, 'sessionStorage')
}

export const sessionRemove = (key) => {
  return remove(key, 'sessionStorage')
}
