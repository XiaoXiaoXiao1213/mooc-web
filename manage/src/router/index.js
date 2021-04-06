import Vue from 'vue';
import Router from 'vue-router';
import { resolve } from 'q';
import { request } from 'http';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/course',
          component: resolve => require(['../components/page/course/course.vue'], resolve),
          meta: { title: '课程管理' }
        },
        {
          path: '/user',
          component: resolve => require(['../components/page/user/user.vue'], resolve),
          meta: { title: '用户管理' }
        },
        {
          path: '/loginSet',
          component: resolve => require(['../components/page/LoginSet.vue'], resolve),
          meta: { title: '登录设置' }
        },
        {
          // 权限页面
          path: '/permission',
          component: resolve => require(['../components/page/Permission.vue'], resolve),
          meta: { title: '权限测试', permission: true }
        },
        {
          // 权限页面
          path: '/icon',
          component: resolve => require(['../components/page/Icon.vue'], resolve),
          meta: { title: '图标' }
        },
        {
          path: '/404',
          component: resolve => require(['../components/page/404.vue'], resolve),
          meta: { title: '404' }
        },
        {
          path: '/403',
          component: resolve => require(['../components/page/403.vue'], resolve),
          meta: { title: '403' }
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})