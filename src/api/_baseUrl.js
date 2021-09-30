/*
 * @Description: 地址管理
 * @Autor: fy
 * @Date: 2021-09-08 17:25:08
 * @LastEditors: fy
 * @LastEditTime: 2021-09-16 17:05:31
 */
let apiURL = '',
  baseURL = '',
  fileUrl = ''

apiURL = process.env.VUE_APP_BASE_API
baseURL = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_BASE_API
fileUrl = 'http://renhua-invoice-oss.oss-cn-shenzhen.aliyuncs.com/'

export default {
  apiURL,
  baseURL,
  fileUrl,
}
