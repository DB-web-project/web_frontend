<template>
  <v-card
  style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
    <v-form ref="form">
      <v-card-title style="justify-content: center">
        请修改你的用户名
      </v-card-title>
      <v-card-subtitle style="padding-top: 5px; text-align: center;">
        新旧用户名必须均填写，且新旧用户名不能一致
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-row justify="center" style="padding-top: 30px;">
        <v-col cols="12" md="6">
          <v-card-text class="input-area">
            <v-text-field
              append-icon="mdi-account"
              outlined
              ref="oldUserName"
              v-model="oldUserName"
              :rules="[() => !!oldUserName || '这是必填项']"
              :error-messages="errorMessages"
              label="你的旧用户名"
              placeholder="请输入你的旧用户名"
              required
            ></v-text-field>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row justify="center" style="padding-top: 30px;">
        <v-col cols="12" md="6">
          <v-card-text class="input-area">
            <v-text-field
              append-icon="mdi-account"
              outlined
              ref="newUserName"
              v-model="newUserName"
              :rules="[
            () => !!newUserName || '这是必填项',
            () =>
              (!!newUserName && oldUserName !== newUserName) ||
              '新旧用户名一致',
          ]"
              label="你的新用户名"
              placeholder="请输入你的新用户名"
              required
            ></v-text-field>
          </v-card-text>
        </v-col>
      </v-row>
<!--      <v-row justify="center" style="padding-top: 30px;">-->
<!--        <v-col cols="12" md="6">-->
<!--          <v-card-text class="input-area">-->

<!--          </v-card-text>-->
<!--        </v-col>-->
<!--      </v-row>-->

      <v-snackbar top v-model="snackbar" color="red">
        {{ submitFailMessages }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar top v-model="successSnackbar" color="green">
        更改用户名成功
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
          <v-tooltip v-if="formHasErrors" left>
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
          class="mr-4"
          @click="submit"
          min-width="300">
          提交
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-dialog v-model="dialog" max-width="350" persistent>
        <v-card>
          <v-card-title class="text-h5 lighten-2">
            您确定更改当前的用户名吗?
          </v-card-title>
          <v-card-text>
            用户名是他人了解您的渠道之一，请确保您了解更改用户名后
            会对您账号交易产生的影响，如果确定修改，请点击再次确定
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="failSubmit()">
              取消更改
            </v-btn>
            <v-btn color="green darken-1" text @click="successSubmit()">
              确认更改
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-card>
</template>

<script>
import store from "@/store";
import { changeUsernameReq } from "@/api/user";

export default {
  name: "ChangeEmail",
  data: () => ({
    errorMessages: "",
    newUserName: null,
    oldUserName: null,
    formHasErrors: false,
    snackbar: false,
    dialog: false,
    successSnackbar: false,
    submitFailMessages: "",
  }),

  computed: {
    form() {
      return {
        newUserName: this.newUserName,
        oldUserName: this.oldUserName,
      };
    },
  },

  watch: {
    oldUserName() {
      this.errorMessages = "";
    },
  },

  methods: {
    resetForm() {
      this.errorMessages = "";
      this.formHasErrors = false;
      this.snackbar = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    submit() {
      this.formHasErrors = false;
      this.snackbar = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) {
          this.formHasErrors = true;
          this.snackbar = true;
          this.submitFailMessages = "输入的用户名不符合规范";
        }
      });
      if (
        this.newUserName == null ||
        this.oldUserName == null ||
        this.oldUserName === this.newUserName ||
        this.oldUserName !== store.getters["user/name"]
      ) {
        this.formHasErrors = true;
        this.snackbar = true;
        this.submitFailMessages = "输入的用户名不符合规范";
        return;
      } else {
        this.dialog = true;
        return;
      }
    },

    successSubmit() {
      this.dialog = false;
      console.log(this.form.newUserName, this.form.oldUserName);
      let id = store.getters["user/id"];
      const vm = this;
      changeUsernameReq(
        "post",
        {
          username: vm.newUserName,
        },
        id
      )
        .then((res) => {
          console.log(res.data.success);
          if (res.data.success) {
            vm.successSnackbar = true;
            store.commit("user/setName", vm.newUserName); //修改成功
            vm.$refs.form.reset();
          } else {
            vm.submitFailMessages =
              res.data.message === null ? "网络异常，请重试" : res.data.message;
            vm.snackbar = true;
            vm.$refs.form.reset();
          } //提交给后端，但是没有修改成功，后端返回success为false
        })
        .catch(function (error) {
          vm.submitFailMessages = "网络异常，请重试";
          vm.snackbar = true;
          vm.$refs.form.reset();
        }); //提交失败
        this.form.newUserName = "";
        this.form.oldUserName = "";
    },

    failSubmit() {
      this.dialog = false;
      this.form.oldUserName = "";
      this.form.newUserName = "";
      //刷新页面
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.input-area {
  padding-bottom: 0;
}
</style>
