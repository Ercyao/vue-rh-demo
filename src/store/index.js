import Vue from 'vue'
import Vuex from 'vuex'
import * as storage from '@/utils/storage'
import { getFileParams, getFileOssUrl } from '@/api/apis'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    fileToken: '',
    customData: [], // 模板数据
    ossConfig: storage.sessionGet('ossConfig') || {},
    ossFilePath: '',
  },
  mutations: {
    'set/fileToken': (state, payload) => {
      state.fileToken = payload
    },
    'set/customData': (state, payload) => {
      state.customData = payload ? JSON.parse(JSON.stringify(payload)) : payload
    },
    'set/ossConfig': (state, payload) => {
      state.ossConfig = storage.sessionSet('ossConfig', payload)
    },
    'set/ossFilePath': (state, payload) => {
      state.ossFilePath = payload
    },
  },
  actions: {
    async setFileParams({ commit }) {
      try {
        let { data } = await getFileParams()
        let obj = {
          region: 'oss-cn-shenzhen',
          bucket: data.bucket,
          accessKeyId: data.AccessKeyId,
          accessKeySecret: data.AccessKeySecret,
          stsToken: data.SecurityToken,
          Expiration: data.Expiration,
        }
        commit('set/ossConfig', obj)
        commit('set/ossFilePath', data.filePath)
      } catch (e) {
        console.error('获取参数失败', e.msg)
      }
    },

    // async getFileOssUrl({ commit }) {
    //   try {
    //     let { data } = await this.$api.getFileOssUrl()
    //     // this.fileBaseUrl = data.host
    //   } catch (e) {
    //     console.error('获取上传签名失败', e.msg)
    //   }
    // },
  },
})

export default store
