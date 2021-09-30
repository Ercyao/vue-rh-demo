import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/index.scss' // 全局css
import '@/directive' // 引入自定义指令
import '@/plugin' // 引入插件
import * as api from '@/api/apis' // 引入插件
import * as utils from '@/utils/utils.js' // 引入公共方法

Vue.prototype.$api = api
Vue.prototype.$utils = utils
Vue.config.productionTip = false
// Vue.forceUpdate()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
