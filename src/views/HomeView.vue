<template>
  <div class="background-img">
    <v-navigation-drawer
      v-model="drawer"
      :expand-on-hover="!$vuetify.breakpoint.mobile"
      app
      style="background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);"
      v-show="$store.getters['user/loggedIn']"
    >
      <v-system-bar style="background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);"></v-system-bar>
      <v-list
        shaped
      >
        <v-list-item
          style="margin-left:-10px"
          @click="$router.push({name:'mainPage'});"
          :input-value="false"
        >
          <v-list-item-avatar>
            <v-img :src="$store.getters['user/avatar']"/>
          </v-list-item-avatar>
          <v-list-item-title>
            <v-list-item-title class="text-h6">
              {{ $store.getters['user/name'] }} ({{ userRole }})
            </v-list-item-title>
            <v-list-item-subtitle>{{ $store.getters['user/id'] }}</v-list-item-subtitle>
          </v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-group
          v-for="item in Duplicatelinks"
          :key="item.icon+item.text"
          :prepend-icon="item.icon"
          style="margin-top:10px"
        >

          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subItem in item.children"
            :key="subItem.icon+subItem.text"
            style="margin-top:10px;margin-left:10px"
            @click="changeLink(subItem.name)"
            :input-value="subItem.routerList.includes(selectLink)"
          >
            <v-list-item-icon>
              <v-icon> {{ subItem.icon }}</v-icon>

            </v-list-item-icon>
            <v-list-item-title>
              {{ subItem.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <template
          v-for="l in singleLink"
        >
          <v-list-item
            :key="l.icon"
            v-if="l.show"
            style="margin-top:10px"
            @click="changeLink(l.name)"
            color="indigo"
            :input-value="selectLink === l.name"
          >
            <v-list-item-icon>
              <v-icon> {{ l.icon }}</v-icon>

            </v-list-item-icon>
            <v-list-item-title>
              {{ l.text }}
            </v-list-item-title>
          </v-list-item>
        </template>

        <v-list-item
          @click='logoutAction'
        >
          <v-list-item-icon>
            <v-icon> mdi-exit-run</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            登出
          </v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="white"
      elevation="1"
      style="background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);"
      fixed

    >
      <v-app-bar-nav-icon @click="drawer = !drawer"
                          v-show="$store.getters['user/loggedIn']">
      </v-app-bar-nav-icon>

      <v-toolbar-title style="font-size: x-large;">{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        bottom
        :offset-y="true"
        transition="slide-y-transition"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            style="margin-right: 30px;"
            @click="hasEmails = false">
            <v-icon large color="#00C853" v-if="hasEmails" class="flash">mdi-email</v-icon>
            <v-icon large color="#00C853" v-else>mdi-email</v-icon>
          </v-btn>
        </template>
        <email-view class="my-email"></email-view>
      </v-menu>

      <v-btn icon @click="$router.go(-1)">
        <v-icon large color="#00B0FF">mdi-arrow-left-bold-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main style="padding: 64px 0px 0px 56px; margin: 0px">
        <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
// @ is an alias to /src

import {actionFailed, actionSuccessOwnDefinedText} from "@/components/ActionState";
import EmailView from "@/views/email/emailView";
import {hasEmailReq} from "@/api/message";

export default {
  name: 'HomeView',
  components: {EmailView},
  data() {
    return {
      hasEmails: false,
      Duplicatelinks: [
        {
          icon: "mdi-home",
          text: "个人中心",
          name: "account",
          children: [
            {
              icon: "mdi-account-circle",
              text: "主页",
              name: "mainPage",
              routerList: [
                "mainPage",
                "changePassword",
                "changeUserName",
                "changeEmail",
                "accountInfo"
              ],
            },
            {
              icon: "mdi-package-variant",
              text: "我的收藏",
              name: "myCollection",
              routerList: [
                "myCollection"
              ]
            },
            {
              icon: "mdi-cart",
              text: "我的购物车",
              name: "myCart",
              routerList: [
                "myCart"
              ]
            },
            {
              icon: "mdi-order-numeric-ascending",
              text: "我的订单",
              name: "myOrder",
              routerList: [
                "myOrder"
              ]
            }
          ]
        },
        {
          icon: "mdi-storefront",
          text: "广场",
          name: "ground",
          children: [
            {
              icon: "mdi-bag-checked",
              text: "求物",
              name: "buy",
              routerList: [
                "ground",
                "buy",
                "requirePost",
              ],
            },
            {
              icon: "mdi-storefront-edit-outline",
              text: "售物",
              name: "sell",
              routerList: [
                "ground",
                "sell",
                "requirePost",
              ]
            }
          ]
        },

      ],
      singleLink: [
        {
          icon: "mdi-bulletin-board",
          text: "公告",
          name: "bulletinBoard",
          routerList: [
            "bulletinBoard"
          ],
          show: true
        },
        {
          icon: "mdi-account-alert",
          text: "投诉",
          name: "report",
          routerList: [
            "report"
          ],
          show: this.$store.getters["user/role"] === "admin"
        },
        // {
        //   icon: "mdi-walk",
        //   text: "封禁",
        //   name: "banlist",
        //   routerList: [
        //     "banlist"
        //   ],
        //   show: this.$store.getters["user/role"] === "admin"
        // }
      ],
      drawer: true,
      selectLink: null,
      title: null
    }
  },
  methods: {
    changeLink(name) {
      this.selectLink = name;
      this.$router.push({name: name});
    },
    logoutAction() {
      this.$store.dispatch("user/logout");
      this.$router.push({name: "login"})
      actionSuccessOwnDefinedText("退出登录")
    },
    checkEmail() {
      let vm = this;
      hasEmailReq('get', {

      }).then(res => {
        if (res.data.success) {
          vm.hasEmails = res.data.data.hasEmails;
        }
      }).catch(err => {
        vm.hasEmails = true;
        actionFailed();
      })
    }
  },
  computed: {
    userRole() {
      return this.$store.getters['user/role'];
    },
  },
  watch: {
    mini(to, from) {
      this.drawer = !this.mini;
    },
    $route(to) {
      this.title = to.meta.title;
      this.selectLink = to.name;
    },
  },
  async mounted() {
    this.title = this.$router.history.current.meta.title;
    this.selectLink = this.$router.history.current.name;
    this.checkEmail();
  },
}
</script>

<style scoped>
.background-img {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
}

.flash {
  animation: twinkle 0.5s infinite alternate;
}

@keyframes twinkle {
  0%{
    opacity: 0.8;
  }
  100%{
    opacity:0;
  }
}
</style>
