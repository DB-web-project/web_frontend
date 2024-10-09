<template>
  <v-card style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
    <v-list-item two-line>
      <v-list-item-avatar>
        <img :src="avatar">
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ username }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

      <v-divider></v-divider>

      <!-- <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="changeLink(item.link)" class="nav-title">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->
      <v-list shaped style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="changeLink(item.link)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="nav-title">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import store from '@/store'
import router from '@/router'
  export default {
    name: "AccountSideBar",
    data () {
      return {
        items: [
          { title: '个人信息', icon: 'mdi-account', link: 'accountInfo'},
          { title: '修改邮箱', icon: 'mdi-home-city', link:'changeEmail'},
          { title: '修改密码', icon: 'mdi-account', link:'changePassword'},
          { title: '修改用户名', icon: 'mdi-account', link: 'changeUserName'},
        ],
      }
    },
    computed: {
      selectedItem: {
        get: function() {
          return this.items.findIndex(item => item.link === router.history.current.name);
        },
        set: function(v) {

        }
      },
      username() {
        return store.getters['user/name']
      },
      avatar() {
        return store.getters['user/avatar']
      }
    },
    methods: {
      changeLink(link) {
        this.$emit("childChangeLink", link);
      }
    },
  }
</script>

<style scoped>
.nav-title:hover {
  text-decoration:underline;
  cursor: pointer;
  transform: scale(1.05);
  transition: all .2s ease-in-out;
}
.nav-title {
  padding-left: 3px;
}
</style>
