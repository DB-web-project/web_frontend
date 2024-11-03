<template>
  <v-card
      style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
    <v-form ref="form">


      <v-card-title style="justify-content: center">
        请修改你的密码
      </v-card-title>
      <v-card-subtitle style="padding-top: 5px; text-align: center;">
        新旧密码必须均填写，且新旧密码不能一致，两次输入的新密码需要一致
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-row justify="center" style="padding-top: 30px;">
        <v-col cols="12" md="6">
          <v-card-text class="input-area">
            <v-text-field
                outlined
                ref="oldPassword"
                v-model="oldPassword"
                :rules="[() => !!oldPassword || '这是必填项']"
                :error-messages="errorMessages"
                label="你的旧密码"
                placeholder="请输入你的旧密码"
                required
                :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showOldPassword ? 'text' : 'password'"
                name="input-10-2"
                class="input-group--focused"
                @click:append="showOldPassword = !showOldPassword"
            ></v-text-field>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card-text class="input-area">
            <v-text-field
                outlined
                ref="newPasswordFirst"
                v-model="newPasswordFirst"
                :rules="[
                () => !!newPasswordFirst || '这是必填项',
                () => !!newPasswordFirst && oldPassword !== newPasswordFirst || '新旧密码一致',
                () => !!newPasswordFirst && newPasswordFirst === newPasswordSecond || '两次旧密码不一致'
              ]"
                label="第一次输入新密码"
                placeholder="请输入你的新密码"
                required
                :append-icon="showNewPasswordFirst ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showNewPasswordFirst ? 'text' : 'password'"
                name="input-10-2"
                class="input-group--focused"
                @click:append="showNewPasswordFirst = !showNewPasswordFirst"
            ></v-text-field>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card-text class="input-area">
            <v-text-field
                outlined
                ref="newPasswordSecond"
                v-model="newPasswordSecond"
                :rules="[
                  () => !!newPasswordSecond || '这是必填项',
                  () => !!newPasswordSecond && oldPassword !== newPasswordSecond || '新旧密码一致',
                  () => !!newPasswordSecond && newPasswordFirst === newPasswordSecond || '两次旧密码不一致'
                ]"
                label="第二次输入新密码"
                placeholder="请重新输入你的新密码"
                required
                :append-icon="showNewPasswordSecond ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showNewPasswordSecond ? 'text' : 'password'"
                name="input-10-2"
                class="input-group--focused"
                @click:append="showNewPasswordSecond = !showNewPasswordSecond"
            ></v-text-field>
          </v-card-text>
        </v-col>
      </v-row>

      <v-snackbar
          top
          v-model="snackbar"
          color="red">
        {{submitFailMessages}}
        <template v-slot:action="{ attrs }">
          <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar
          top
          v-model="successSnackbar"
          color="green">
        更改密码成功
        <template v-slot:action="{ attrs }">
          <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="successSnackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-divider class="mt-6"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-slide-x-reverse-transition>
          <v-tooltip
              v-if="formHasErrors"
              left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>重置输入</span>
          </v-tooltip>
        </v-slide-x-reverse-transition>
        <v-btn
            color="primary"
            class="ma-md-2"
            @click="submit"
            min-width="300"
        >
          提交
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-dialog
          v-model="dialog"
          max-width="350"
          persistent>
        <v-card>
          <v-card-title class="text-h5 lighten-2">
            您确定更改当前的密码吗?
          </v-card-title>
          <v-card-text>
            密码是您登录账号的唯一途径，
            请确保您记住了修改后的新密码，谨防他人盗取您的密码，
            造成不必要的影响，如果您确认更改，请点击确定更爱
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red darken-1"
                text
                @click="failSubmit()"
            >
              取消更改
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="successSubmit()"
            >
              确认更改
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>




    </v-form>
  </v-card>
</template>

<script>
import {changePasswordReq} from '@/api/user'
import store from '@/store'

export default {
  name: "ChangeEmail",
  data: () => ({
    errorMessages: '',
    newPasswordFirst: null,
    newPasswordSecond: null,
    oldPassword: null,
    formHasErrors: false,
    snackbar: false,
    dialog: false,
    successSnackbar: false,
    showNewPasswordFirst: false,
    showNewPasswordSecond: false,
    showOldPassword: false,
    submitFailMessages: "",
  }),

  computed: {
    form () {
      return {
        newPasswordFirst: this.newPasswordFirst,
        newPasswordSecond: this.newPasswordSecond,
        oldPassword: this.oldPassword
      }
    },
  },

  watch: {
    oldPassword () {
      this.errorMessages = ''
    },
  },

  methods: {
    resetForm () {
      this.errorMessages = []
      this.formHasErrors = false
      this.snackbar = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    submit () {
      this.formHasErrors = false
      this.snackbar = false
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          this.formHasErrors = true;
          this.snackbar = true;
          this.submitFailMessages = "输入的旧密码或者新密码不符合要求";
        }
        this.$refs[f].validate(true)
      })

      if (this.oldPassword == null || this.oldPassword ==="" ||
          this.newPasswordFirst == null || this.newPasswordFirst == "" ||
          this.newPasswordSecond == null || this.newPasswordSecond === "" ||
          this.oldPassword === this.newPasswordFirst ||
          this.newPasswordFirst !== this.newPasswordSecond) {
        this.formHasErrors = true;
        this.snackbar = true;
        this.submitFailMessages = "输入的旧密码或者新密码不符合要求";
      } else {
        this.dialog = true;
      }
      return;
    },
    successSubmit () {
      this.dialog = false;
      //提交
      let id = store.getters['user/id'];
      const vm = this;
      changePasswordReq('post', {
        oldPassword: vm.oldPassword,
        newPassword: vm.newPasswordFirst,
      }, id).then(res => {
        if (res.data.success) {
          vm.successSnackbar = true;
          vm.$refs.form.reset();//修改成功
        } else {
          vm.submitFailMessages = res.data.message === null ? "网络异常，请重试" :
              res.data.message;
          vm.snackbar = true;
          vm.$refs.form.reset();
        } //提交给后端，但是没有修改成功，后端返回success为false
      }).catch(function (error) {
        vm.submitFailMessages = "网络异常，请重试";
        vm.snackbar = true;
        vm.$refs.form.reset();
      })  //提交失败
      this.form.oldPassword = "";
      this.form.newPasswordFirst = "";
      this.form.newPasswordSecond = "";
    },

    failSubmit() {
      this.dialog = false;
      this.form.oldPassword = "";
      this.form.newPasswordFirst = "";
      this.form.newPasswordSecond = "";
      //刷新页面
      this.$refs.form.reset();
    },
  },
}
</script>

<style scoped>
.input-area {
  padding-bottom: 0;
}
</style>
