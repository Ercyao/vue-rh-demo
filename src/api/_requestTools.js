/*
 * @Description: 请求封装调用的方法
 * @Autor: fy
 * @Date: 2021-09-08 17:24:22
 * @LastEditors: fy
 * @LastEditTime: 2021-09-18 09:13:23
 */
import qs from 'qs'
import * as storage from '@/utils/storage'

let token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzgyMzMwODU0NiIsInVpZCI6IjQyODk2NzM0Njc3OTA2NjM2OCIsImF1dGgiOiJBRE1JTiIsInJvbGVJZCI6Ijk0MDY3ODk4NjUzNTAwMzMyIiwiYWNjb3VudGluZ0lkIjoiNDI4OTY4MTY5NzY0NDI1NzI4Iiwib3JnYW5pemF0aW9uTW9kZSI6IiIsImV4cCI6MzAxNjMxMDgyMjkyfQ.tNm9nN-sfwrwPdF5C_WUVRMuqZQ9KQ-rXiJSI-UTKcWOWnyQ7mK1CZEtk5VTIRJqbKqB5zLgKPrWkFuTYK3w0w'

/* 是否是重复请求 （在上一个还没请求完成的时候） */
export const isRepeatRequest = (url) => {
  // console.log('是否是重复请求', url, storage.sessionGet('requestUrl'))
  if (url === storage.sessionGet('requestUrl')) {
    return true
  } else {
    storage.sessionSet('requestUrl', url)
    return false
  }
}

/* 清除请求 */
export const clearRepeatRequest = () => {
  storage.sessionRemove('requestUrl')
}

export const getErrorMsg = (error) => {
  let errorMsg = '请求出错'
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        errorMsg = '请求出错'
        break
      case 400:
        errorMsg = '请求出错'
        break
      case 401:
        errorMsg = '请求出错'
        break
      case 403:
        errorMsg = '请求出错'
        break
      case 404:
        errorMsg = '请求出错'
        break
      case 408:
        errorMsg = '请求出错'
        break
      case 500:
        errorMsg = '请求出错'
        break
      case 502:
        errorMsg = '请求出错'
        break
      case 503:
        errorMsg = '请求出错'
        break
      case 504:
        errorMsg = '请求出错'
        break
      default:
        errorMsg = '请求出错' + error.response.status
    }
  }
  return errorMsg
}

/* 请求的参数 处理 （方法名，传参，头部参数） start */
export const getRequestParams = (method, data) => {
  let methods = ''
  let headers = {}

  switch (method) {
    case 'get':
      methods = 'GET'
      headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
      break
    case 'post':
      methods = 'post'
      headers = { 'Content-Type': 'application/json; charset=UTF-8' }
      break
    case 'postForm':
      methods = 'post'
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
      data = qs.stringify(data)
      break
    case 'upload':
      methods = 'post'
      headers = { 'Content-Type': 'multipart/form-data; charset=UTF-8' }
      break
    case 'put':
      methods = 'put'
      headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
      data = qs.stringify(data)
      break
    case 'putJson':
      methods = 'put'
      headers = { 'Content-Type': 'application/json; charset=UTF-8' }
      data = qs.stringify(data)
      break
    case 'del':
      methods = 'delete'
      headers = { 'Content-Type': 'application/json; charset=UTF-8' }
      break
  }
  headers['token'] = token

  // if (ossSecurityToken) {
  //   headers['x-oss-security-token'] = ossSecurityToken
  //   let date = new Date()
  //   headers['x-oss-date'] = encodeURIComponent(date)
  // } else {
  //   headers['token'] = token
  // }
  return { methods, data, headers }
}
/* 请求的参数 处理 （方法名，传参，头部参数） end */
