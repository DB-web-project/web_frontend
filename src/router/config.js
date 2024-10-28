import TabsView from '@/layouts/tabs/TabsView'
// import EditEmail from "@/pages/detail/PeopleInfo/EditEmail.vue";

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
      component: TabsView,
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
        }
      ]
    },
  ]
}

export default options
