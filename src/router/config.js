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
          path: 'Home',
          name: '商品推荐',
          meta: {
            icon: 'home',
            page: {
              closable: false
            }
          },
          component: () => import('@/pages/Home'),
        },

        {
          path: 'Market',
          name: '商品集市',
          meta: {
            icon: 'home',
            page: {
              closable: false
            }
          },
          component: () => import('@/pages/Market'),
        },

        {
          path: 'workplace',
          name: '帖子广场',
          meta: {
            icon: 'home',
            page: {
              closable: false
            }
          },
          component: () => import('@/pages/workplace'),
        },
        {
          path: 'MyLog',
          name: '我的帖子',
          meta: {
            icon: 'home',
            page: {
              closable: false
            }
          },
          component: () => import('@/pages/MyLog'),
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
