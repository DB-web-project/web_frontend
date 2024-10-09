<template>
  <v-container
    fluid
  >
    <v-tabs
      vertical
    >
      <v-tab>
        <v-icon left color="success">
          mdi-progress-check
        </v-icon>
        正常用户
      </v-tab>
      <v-tab>
        <v-icon left color="error">
          mdi-progress-close
        </v-icon>
        封禁用户
      </v-tab>
      <v-tab-item>

        <v-list
          subheader
          two-line
        >
          <v-list-item
            v-for="user in normalUsers"
            :key="user.userId"
          >
            <v-list-item-avatar>
              <img :src="user.avatar" alt="暂无头像" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="user.username"></v-list-item-title>

              <v-list-item-subtitle v-text="user.userId"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                outlined
                color="red lighten-1"
                @click="banUser(user.userId)"
              >
                <v-icon>
                  mdi-progress-close
                </v-icon>
                封禁
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>


      </v-tab-item>


      <v-tab-item>
        <v-list
          subheader
          two-line
        >
          <v-list-item
            v-for="user in bannedUsers"
            :key="user.userId"
          >
            <v-list-item-avatar>
              <img :src="user.avatar" alt="暂无头像" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="user.username"></v-list-item-title>

              <v-list-item-subtitle v-text="user.userId"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                outlined
                color="blue lighten-1"
                @click="unbanUser(user.userId)"
              >
                <v-icon>
                  mdi-progress-check
                </v-icon>
                解封
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-tab-item>

    </v-tabs>
  </v-container>
</template>

<script>
import {userBanReq, userListReq} from "@/api/user";
import {actionFailed, actionPostFailed, actionSuccess} from "@/components/ActionState";

export default {
  name: "BanListView",
  data() {
    return {
      normalUsers: [],
      bannedUsers: [],
    }
  },
  methods: {
    loadUsers() {
      let vm = this;
      userListReq('get', {

      }).then(res => {
        if (res.data.success) {
          vm.normalUsers = res.data.data.normalUsers;
          vm.bannedUsers = res.data.data.bannedUsers;
        }
      }).catch(err => {
        vm.normalUsers = [
          {
            avatar: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            username: "嘉然",
            userId: "20231204",
          },
          {
            avatar: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            username: "嘉然",
            userId: "20231205",
          },
          {
            avatar: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            username: "嘉然",
            userId: "20231206",
          },
          {
            avatar: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            username: "嘉然",
            userId: "20231207",
          },
          {
            avatar: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            username: "嘉然",
            userId: "20231208",
          },
        ];
        vm.bannedUsers = [
          {
            avatar: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            username: "嘉然",
            userId: "20231209",
          },
          {
            avatar: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            username: "嘉然",
            userId: "20231210",
          },
          {
            avatar: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            username: "嘉然",
            userId: "20231224",
          },
          {
            avatar: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            username: "嘉然",
            userId: "20231234",
          },
          {
            avatar: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            username: "嘉然",
            userId: "20231244",
          },
        ];
      })
    },
    banUser(userId) {
      userBanReq('post', {
        'opType': 1,
        'userId': userId
      }).then(res => {
        if (res.data.success) {
          this.$router.go(0);
          actionSuccess(res);
        } else {
          actionPostFailed(res);
        }
      }).catch(err => {
        actionFailed();
      })
    },
    unbanUser(userId) {
      userBanReq('post', {
        'opType': 2,
        'userId': userId
      }).then(res => {
        if (res.data.success) {
          this.$router.go(0);
          actionSuccess(res);
        } else {
          actionPostFailed(res);
        }
      }).catch(err => {
        actionFailed();
      })
    }
  },
  mounted() {
    this.loadUsers();
  }
}
</script>

<style scoped>

</style>
