<template>
  <v-card ref="form"
          style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
    <v-card-title>
      个人信息
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
          <v-file-input
              :rules="rules"
              @change="uploadAvatar"
              v-model="avatarFiles"
              counter
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="修改头像"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider class="mt-6"></v-divider>
  </v-card>
</template>

<script>
import store from '@/store'
import {changeAvatar} from "@/api/user";
import {actionFailed, actionPostFailed, actionSuccess} from "@/components/ActionState";

export default {
  name: "AccountInfo",
  data: () => ({
    rules: [
      value => !value || value.size < 4000000 || '头像大小不能超过4MB!',
    ],
    avatarFiles: [],
  }),
  methods: {
    uploadAvatar() {
      const vm = this
      let formData = new FormData();
      formData.append("avatar", this.avatarFiles);
      console.log(formData);
      changeAvatar('post', formData, this.userStudentId).then(res => {
        if (res.data.success) {
          vm.$store.commit('user/setAvatar', res.data.data.newAvatar);
          actionSuccess(res);
          vm.$router.go(0)
        } else {
          actionPostFailed(res);
        }
      }).catch(err => {
        actionFailed();
      })
    }
  },
  computed: {
    username() {
      return store.getters['user/name'];
    },
    userEmail() {
      return store.getters['user/email'];
    },
    userStudentId() {
      return store.getters['user/id'];
    },
    avatar() {
      return store.getters['user/avatar'];
    }
  },
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
