// import TabsView from '@/layouts/tabs/TabsView'
import BlankView from "@/layouts/BlankView.vue";
// import EditEmail from "@/pages/detail/PeopleInfo/EditEmail.vue";

// import { createRouter, createWebHistory } from 'vue-router';

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '/',
      name: '首页',
      component: BlankView,
      redirect: '/login',
      children: [
        {
          path: 'workplace',
          name: '主页',
          meta: {
            page: {
              closable: false
            }
          },
          component: () => import('@/pages/workplace'),
        },
        {
          path: 'announcement',
          name: '公告',
          meta: {
            icon: 'check-circle-o',
          },
          component: () => import('@/pages/announcement'),
        },
        {
          path: 'account',
          name: '个人页面',
          meta: {
            icon: 'address-card',
          },
          component: () => import('@/pages/peopleinfo/AccountView.vue'),
        }
      ]
    },
  ]
}


export default options



