//import TabsView from '@/layouts/tabs/TabsView'
 import BlankView from "@/layouts/BlankView.vue";
// import BlankView from "@/layouts/BlankView.vue";
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
        },
        // {
        //   path: 'myposts',
        //   name: '我的发帖',
        //   meta: {
        //     icon: 'file-alt', // 或 'pen'
        //   },
        //   component: () => import('@/pages/myposts/MyPostsView.vue'),
        // },
        {
          path: 'MyLog',
          name: '我的帖子',
          meta: {
            icon: 'home',
            page: {
              closable: false
            }
          },
          component: () => import('@/pages/myposts/MyPostsView.vue'),
        },
        {
          path: 'postgood',
          name: '添加商品',
          meta: {
            icon: 'pen',
          },
          component: () => import('@/pages/good/PostGood.vue'),
        },
        // {
        //   path: 'postdetail/:id',
        //   name: '帖子详情',
        //   meta: {
        //     icon: 'file-alt', // 或 'pen'
        //   },
        //   component: () => import('@/pages/myposts/PostDetail.vue'),
        // }
      ]
    },
  ]
}


export default options



// Admin.create(name: '杜启嵘', email: 'dqr@buaa.edu.cn', password: 'dqr123456')
// User.create(name: '石通', email: 'st@qq.com', password: 'st123456')
// Business.create(name: '高悠然', email: 'gyq@buaa.edu.cn', password: 'gyr123456')