import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainPageView from '../views/account/MainPageView'
import BuyView from '../views/ground/BuyView'
import LoginView from '../views/LoginView'
import store from "../store"
import AccountView from "../views/account/AccountView"
import GroundView from "../views/ground/GroundView"
import ChangeEmail from "@/components/account/ChangeEmail"
import ChangePassword from "@/components/account/ChangePassword"
import ChangeUserName from "@/components/account/ChangeUserName"
import AccountInfo from "@/components/account/AccountInfo"
import PostFullView from "@/views/ground/Post/PostFullView"
import MyCollectionView from "@/views/account/MyCollectionView";
import bulletinBoardView from "@/views/Bulletinboard/BulletinBoardView";
import reportView from "@/views/repport/reportView";
import otherInfoView from "@/views/OtherInfoView";
import banListView from "@/views/BanListView";
import SearchPostView from "@/views/ground/SearchPostView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta:{
      title: "登录"
    },
  },
  {
    path: '/',
    name: 'home',
    //redirect: '/account',
    component: HomeView,
    redirect:"/account/mainPage",
    children:[
      {
        path: '/account',
        name: 'account',
        meta:{
          title: "个人中心"
        },
        component:AccountView,
        children:[
          {
            path: '/account/mainPage',
            name: 'mainPage',
            component: MainPageView,
            meta:{
              title: "个人主页"
            },
            redirect: '/account/mainPage/accountInfo',
            children: [
              {
                path: '/account/mainPage/changeEmail',
                name: 'changeEmail',
                component: ChangeEmail,
                meta:{
                  title: "个人主页"
                },
              },
              {
                path: '/account/mainPage/changePassword',
                name: 'changePassword',
                component: ChangePassword,
                meta:{
                  title: "个人主页"
                },
              },
              {
                path: '/account/mainPage/changeUserName',
                name: 'changeUserName',
                component: ChangeUserName,
                meta:{
                  title: "个人主页"
                },
              },
              {
                path: '/account/mainPage/accountInfo',
                name: 'accountInfo',
                component: AccountInfo,
                meta:{
                  title: "个人主页"
                },
              },
            ]
          },
          {
            path: '/account/myCollection',
            name: 'myCollection',
            component: MyCollectionView,
            meta: {
              title: "我的收藏"
            }
          },
          {
            path: '/account/myCart',
            name: 'myCart',
            component: () => import('@/views/account/MyCartView.vue'),
            meta: {
              title: "我的购物车"
            }
          },
          {
            path: '/account/myOrder',
            name: 'myOrder',
            component: () => import('@/views/account/MyOrderView.vue'),
            meta: {
              title: "我的订单"
            }
          }
        ]
      },
      {
        path: '/ground',
        name: 'ground',
        component:GroundView,
        meta:{
          title: "广场"
        },
        children:[
          {
            path: '/ground/buy',
            name: 'buy',
            component: BuyView,
            meta:{
              title: "求物",
              type: "buy"
            },
          },
          {
            path: '/ground/buy/:postId(\\d+)',
            name: 'buyPost',
            component: PostFullView,
            props: true,
            meta:{
              title: "求物",
              type: "buy"
            },
          },
          {
            path: '/ground/sell',
            name: 'sell',
            component: BuyView,
            meta:{
              title: "售物",
              type: "sell"
            },
          },
          {
            path: '/ground/sell/:postId(\\d+)',
            name: 'sellPost',
            component: PostFullView,
            props: true,
            meta:{
              title: "售物",
              type: "sell"
            },
          },
          {
            path: '/ground/sell/search',
            name: 'sellSearchPost',
            component: SearchPostView,
            meta: {
              title: "搜索帖子",
              type: "sell",
            }
          },
          {
            path: '/ground/buy/search',
            name: 'buySearchPost',
            component: SearchPostView,
            meta: {
              title: "搜索帖子",
              type: "buy",
            }
          }
        ]
      },
      {
        path: '/board',
        name: 'bulletinBoard',
        component: bulletinBoardView,
        meta: {
          title: "公告板"
        },
      },
      {
        path: '/report',
        name: 'report',
        component: reportView,
        meta: {
          title: "投诉处理"
        }
      },
      {
        path: '/banlist',
        name: 'banlist',
        component: banListView,
        meta: {
          title: "封禁用户名单"
        }
      },
      {
        path: '/otherInfo/:userId(\\d+)',
        name: 'otherInfo',
        component: otherInfoView,
        meta: {
          title: "他人信息"
        }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['user/loggedIn']
  if(!isLoggedIn && to.name != 'login'){
      next({
          path: '/login',
      });
  } else if(isLoggedIn && to.name == 'login') {
    next({
      path: '/account/mainPage/accountInfo'
    })
  } else {
      next();
  }
});

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}


export default router
