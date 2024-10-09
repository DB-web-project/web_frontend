<template>
  <v-container fluid>
    <v-card ref="form">
      <v-card-title>
        {{username}}的信息
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <v-row>
              <!-- 这是用户名 -->
              <v-card-title style="padding-bottom: 0px;">
                用户名
              </v-card-title>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="8"
              >
                <v-text-field
                  :value="username"
                  outlined
                  readonly
                  prepend-icon="mdi-account"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 这是用户名 -->

            <!-- 这是学号 -->
            <v-row>
              <v-card-title style="padding-bottom: 0px;">
                学号
              </v-card-title>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="8"
              >
                <v-text-field
                  :value="userStudentId"
                  outlined
                  readonly
                  prepend-icon="mdi-account"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 这是学号 -->


            <!-- 这是电子邮箱 -->
            <v-row>
              <v-card-title style="padding-bottom: 0px;">
                电子邮箱
              </v-card-title>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="8"
              >
                <v-text-field
                  :value="userEmail"
                  outlined
                  readonly
                  prepend-icon="mdi-account"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 这是电子邮箱 -->
          </v-col>
          <v-col cols="12" md="6" sm="12" style="text-align: center">
            <v-avatar height="368px" width="368px">
              <img
                class="my-avatar"
                :src="avatar"
                alt="暂无头像"

              >
            </v-avatar>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="mt-6"></v-divider>
    </v-card>
  </v-container>
</template>

<script>

import {userIdReq} from "@/api/user";
import {actionFailed, actionPostFailed} from "@/components/ActionState";

export default {
  name: "OtherInfoView",
  data() {
    return {
      username: "",
      userEmail: "",
      userStudentId: this.$route.params.userId,
      avatar: "",
    }
  },
  methods: {
    loadInfo() {
      let vm = this;
      userIdReq('get', {

      }, this.userStudentId).then(res => {
        if (res.data.success) {
          vm.username = res.data.data.username;
          vm.userEmail = res.data.data.email;
          vm.avatar = res.data.data.avatar;
          vm.userStudentId = res.data.data.studentId;
        } else {
          actionPostFailed(res);
        }
      }).catch(err => {
        actionFailed();
      })
    },
  },
  computed: {

  },
  mounted() {
    this.loadInfo();
  }
}
</script>

<style scoped>
.my-avatar {
  cursor: pointer;
}

.my-avatar:hover {
  transition: all 2s;
  transform: rotate(360deg);
}
</style>
