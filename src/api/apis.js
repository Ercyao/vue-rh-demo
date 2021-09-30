/*
 * @Description: 接口
 * @Autor: fy
 * @Date: 2021-09-08 17:22:43
 * @LastEditors: fy
 * @LastEditTime: 2021-09-17 09:20:08
 */
import http from '@/api/_request'

export const putFile = (params, baseUrl, ossSecurityToken) =>
  http.putJson('', params, baseUrl, ossSecurityToken)

// 获取上传地址
export const getFileOssUrl = (params) =>
  http.get('/web/api/v1/aliyun/oss/getSing', params)

// 获取上传参数
export const getFileParams = (params) =>
  http.get('/web/api/v1/aliyun/oss/getOSSUploadParams', params)

// 获取上传token
export const getFileStsAccessForWeb = (params) =>
  http.get('/web/api/v1/aliyun/oss/stsAccessForWeb', params)

export const postFileUpload = (params) =>
  http.post('/web/api/v1/aliyun/oss/uploadImages', params)
// http.put('/file/web', params,'http://renhua-invoice-oss.oss-cn-shenzhen.aliyuncs.com')

// 获取单据列表
export const getPageWithUserList = (params) =>
  http.get('/web/api/v1/bill/pageWithUserList', params)

// 获取城市数据
export const getCityList = (params) =>
  http.get('/web/api/v1/city/cityList', params)

// 获取模板数据
export const getBillTemplate = (params) =>
  http.get('/web/api/v1/bill/template/get', params)

// 获取部门
export const getUserAllDepartments = (params) =>
  http.get('/web/api/v1/department/getUserAllDepartments', params)

// 获取员工数据
export const findTreeForProgram = (params) =>
  http.get('/web/api/v1/department/findTreeForProgram', params)

// 单据详情
export const getBillDetail = (params) =>
  http.get('/web/api/v1/bill/detail', params)

// 新增单据
export const postBillAdd = (params) =>
  http.post('/web/api/v1/bill/create', params)

// 删除单据
export const delBill = (params) => http.get('/web/api/v1/bill/del', params)
