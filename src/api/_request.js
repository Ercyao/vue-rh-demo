/*
 * @Description: 请求封装
 * @Autor: fy
 * @Date: 2021-09-08 17:23:38
 * @LastEditors: fy
 * @LastEditTime: 2021-09-17 09:20:00
 */
import axios from 'axios'
import urls from '@/api/_baseUrl'
import {
  clearRepeatRequest,
  getErrorMsg,
  getRequestParams,
} from './_requestTools'

console.log('baseURL-', urls.baseURL)

/* 设置请求超时时间 */
const service = axios.create({
  timeout: 10000,
})

/* 请求拦截器 处理 start */
service.interceptors.request.use(
  (config) => {
    // config.headers['token'] = token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    // console.log('response', response)
    if (response.data && response.data.code > 0) {
      return Promise.reject(response.data)
    } else if (!response.data) {
      return Promise.reject({ msg: '请求出现问题！' })
    } else {
      return Promise.resolve(response.data)
    }
  },
  (error) => {
    // console.log('error', error)
    return Promise.reject({ msg: getErrorMsg(error) })
  }
)
/* 请求拦截器 处理 end */

/* 封装请求 start */
const request = (method, url, params, baseURL) => {
  // let isRequest = isRepeatRequest(url)
  // if (isRequest) return console.warn('重复请求阻止 -', url)

  const { methods, data, headers } = getRequestParams(method, params)

  return new Promise((resolve, reject) => {
    if (method == 'get') {
      return service({
        method: methods,
        url: baseURL ? baseURL + url : urls.baseURL + url,
        params: data,
        headers: headers,
      })
        .then((res) => {
          clearRepeatRequest()
          resolve(res)
        })
        .catch((err) => {
          clearRepeatRequest()
          reject(err)
        })
    } else {
      return service({
        method: methods,
        url: baseURL ? baseURL + url : urls.baseURL + url,
        data: data,
        headers: headers,
      })
        .then((res) => {
          clearRepeatRequest()
          resolve(res)
        })
        .catch((err) => {
          clearRepeatRequest()
          reject(err)
        })
    }
  })
}
/* 封装请求 end */

export default {
  get: (url, data, baseURL) => request('get', url, data, baseURL),
  post: (url, data, baseURL) => request('post', url, data, baseURL),
  postForm: (url, data, baseURL) => request('postForm', url, data, baseURL),
  upload: (url, data, baseURL) => request('upload', url, data, baseURL),
  put: (url, data, baseURL) => request('put', url, data, baseURL),
  putJson: (url, data, baseURL) => request('putJson', url, data, baseURL),
  del: (url, data, baseURL) => request('del', url, data, baseURL),
}
