<template>
  <v-card
      style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
    <v-form ref="form">

      <v-card-title style="justify-content: center">
        请修改你的电子邮箱
      </v-card-title>
      <v-card-subtitle style="padding-top: 5px; text-align: center;">
        新旧电子邮箱必须均填写，且新旧电子邮箱不能一致
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-row justify="center" style="padding-top: 30px;">
        <v-col cols="12" md="6">
          <v-card-text class="input-area">
            <v-text-field
                outlined
                append-icon="mdi-email"
                ref="oldEmail"
                v-model="oldEmail"
                :rules="[() => !!oldEmail || '这是必填项']"
                label="你的旧电子邮箱"
                placeholder="请输入你的旧邮箱"
                required
            ></v-text-field>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row justify="center" style="padding-top: 30px;">
        <v-col cols="12" md="6">
          <v-card-text class="input-area">
            <v-text-field
                append-icon="mdi-email"
                outlined
                ref="newEmail"
                v-model="newEmail"
                :rules="[
                () => !!newEmail || '这是必填项',
                () => !!newEmail && oldEmail !== newEmail || '新旧电子邮箱一致'
              ]"
                label="你的新电子邮箱"
                placeholder="请输入你的新邮箱"
                required
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
        更改邮箱成功
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
            class="mr-4"
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
            您确定更改当前的邮箱吗?
          </v-card-title>
          <v-card-text>
            您注册的电子邮箱是其他用户与您联系的方式之一，
            请您清楚确定更改邮箱后是否会影响其他用户与您联系，
            如果确定更改当前邮箱，请再次确认
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
import store from '@/store'
import {changeEmail} from '@/api/user'

export default {
  name: "ChangeEmail",
  data: () => ({
    errorMessages: '',
    newEmail: null,
    oldEmail: null,
    formHasErrors: false,
    snackbar: false,
    dialog: false,
    successSnackbar: false,
    submitFailMessages: "",
  }),

  computed: {
    form () {
      return {
        newEmail: this.newEmail,
        oldEmail: this.oldEmail
      }
    },
  },

  watch: {
    oldEmail () {
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
          this.submitFailMessages = "输入的电子邮箱不符合要求";
        }
      })
      //前端验证电子邮箱
      if (this.oldEmail == null || this.oldEmail === "" || this.newEmail == null
          || this.newEmail === "" || this.oldEmail === this.newEmail) {
        this.formHasErrors = true;
        this.snackbar = true;
        this.submitFailMessages = "输入的电子邮箱不符合要求";
      } else {
        this.dialog = true;
      }
      return;
    },


    successSubmit() {
      this.dialog = false;
      let id = store.getters['user/id'];
      const vm = this;
      changeEmail('post', {
        oldEmail: vm.oldEmail,
        newEmail: vm.newEmail,
      }, id).then(res => {
        if (res.data.success) {
          vm.successSnackbar = true;
          store.commit('user/setEmail', vm.newEmail);
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
      this.form.oldEmail = "";
      this.form.newEmail = "";

    },

    failSubmit() {
      this.dialog = false;
      this.form.oldEmail = "";
      this.form.newEmail = "";
      //刷新页面
      this.$refs.form.reset();
    }
  },
}
</script>

<style scoped>
.input-area {
  padding-bottom: 0;
}
</style>
