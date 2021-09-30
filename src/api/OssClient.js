/*
 * @Description: oss - 文件上传
 * @Autor: fy
 * @Date: 2021-09-17 16:07:33
 * @LastEditors: fy
 * @LastEditTime: 2021-09-29 17:17:55
 */
import OSS from 'ali-oss'
import * as storage from '@/utils/storage'

// OSS配置
const getOSSClient = (ossConfig) => {
  console.log('ossConfig----', ossConfig)
  return new OSS({
    region: 'oss-cn-shenzhen',
    bucket: 'renhua-invoice-oss',
    accessKeyId: ossConfig.accessKeyId,
    accessKeySecret: ossConfig.accessKeySecret,
    stsToken: ossConfig.stsToken,
    Expiration: ossConfig.Expiration,
  })
}

// 获取配置参数
let ossConfig = storage.sessionGet('ossConfig') || null
let client = null
if (!ossConfig) {
  setTimeout(() => {
    ossConfig = storage.sessionGet('ossConfig')
    client = getOSSClient(ossConfig)
  }, 200)
} else {
  client = getOSSClient(ossConfig)
}

// 分片上传
export const fileOssMultipartUpload = (fileName, file, e) => {
  return new Promise((resolve, reject) => {
    let obj = e
      ? {
          progress: function(p) {
            e.onProgress({ percent: Math.floor(p * 100) }) // 触发el-upload组件的onProgress方法
          },
        }
      : {}
      
    client
      .multipartUpload(fileName, file, obj)
      .then((res) => {
        if (res && res.res.status == 200) {
          resolve(res.res.requestUrls)
        } else {
          // console.log('文件上传错误', res)
          reject({ msg: '文件上传错误' })
        }
      })
      .catch((e) => {
        // console.log('文件上传失败', e)
        reject({ msg: '文件上传失败' })
        // console.error('oss上传失败', e)
      })
  })
}
