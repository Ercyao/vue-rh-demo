import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const _import = (file) => (resolve) =>
  require([`@/views${file}`], resolve)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      name: 'home',
      component: _import('/Home'),
      meta: { title: 'home' },
    },
    {
      path: '/list',
      name: 'list',
      component: _import('/List'),
      meta: { title: '单据列表' },
    },
    {
      path: '/add',
      name: 'add',
      component: _import('/AddOrUpdate'),
      meta: { title: '添加单据' },
    },
    {
      path: '/edit',
      name: 'edit',
      component: _import('/AddOrUpdate'),
      meta: { title: '编辑单据' },
    },
    {
      path: '/detail',
      name: 'detail',
      component: _import('/Details'),
      meta: { title: '详情单据' },
    },
    { path: '*', component: _import('/404') },
  ],
})
