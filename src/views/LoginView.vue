<template>
  <v-carousel
    hide-delimiter-background
    show-arrows-on-hover
    hide-delimiters
    :continuous="false"
    height="100%"
  >
    <template v-slot:prev="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        icon
        min-height="60"
        min-width="60"
      >
        <v-icon size="50">
          mdi-arrow-left-bold-circle-outline
        </v-icon>
      </v-btn>
    </template>
    <template v-slot:next="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        icon
        min-height="60"
        min-width="60"
      >
        <v-icon size="50">
          mdi-arrow-right-bold-circle-outline
        </v-icon>
      </v-btn>
    </template>
    <v-carousel-item
      class="background-img"
      style="background-size: contain"
      :src=loginPic1
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-container fluid>
        <p class="text-h2 font-weight-bold text-center first-title typing flyText1">
          啊&nbsp;哈&nbsp;跳&nbsp;蚤&nbsp;市&nbsp;场
        </p>
        <p class="text-h4 font-weight-bold text-center first-subtitle typing flyText1">
          一个平台 不助每一位北航人售购闲置物品
        </p>
      </v-container>
    </v-carousel-item>
    <v-carousel-item
      class="background-img"
      style="background-size: contain"
      :src=loginPic2
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-container fluid>
        <v-row align-content="center" >
          <v-col cols="12" md="6" lg="6" sm="12" offset-lg="6" offset-md="6">
            <p class="text-h2 font-weight-bold text-center first-title typing flyText1">
              在&nbsp;那&nbsp;里
            </p>
            <p class="text-h4 font-weight-bold text-center first-subtitle typing flyText1">
              你可以发布帖子寻找你需要的物品
            </p>
          </v-col>
        </v-row>
          <v-col cols="12" md="6" lg="6" sm="12">
            <p class="text-h2 font-weight-bold text-center first-title typing flyText4">
              在&nbsp;这&nbsp;里
            </p>
            <p class="text-h4 font-weight-bold text-center first-subtitle typing flyText4">
              你可以发的物品
            </p>
          </v-col>
        <v-col cols="12" md="6" lg="6" sm="12" offset-lg="6" offset-md="6">
          <p class="text-h2 font-weight-bold text-center first-title typing flyText5">
            好&nbsp;评&nbsp;万&nbsp;象&nbsp;系&nbsp;统
          </p>
          <p class="text-h4 font-weight-bold text-center first-subtitle typing flyText5">
            欢迎您的到来!
          </p>
        </v-col>
      </v-container>
    </v-carousel-item>
    <v-carousel-item
      class="background-img"
      style="background-size: contain"
      :src=loginPic3
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
        <v-container
          fluid
          style="margin-left:3%;width:96%;"
        >
          <div class="text-h2 font-weight-bold text-center flyText"
               style="color: white; margin-top: 2%;text-shadow: 0 0 8px hsl(0deg 0% 100% / 55%); margin-bottom: 6%"
                id="title">
            不&nbsp;&nbsp;胡&nbsp;&nbsp;来&nbsp;&nbsp;到&nbsp;&nbsp;北&nbsp;&nbsp;航&nbsp;&nbsp;跳&nbsp;&nbsp;蚤&nbsp;&nbsp;市&nbsp;&nbsp;场
          </div>
          <v-alert
            :type="alertSettings.type"
            app
            :value="alertSettings.show && !registerModal"
            @click="alertSettings.show = false"
          >
            {{ alertSettings.text }}
          </v-alert>
          <v-row>
            <v-col cols="12" sm="12" md="4" lg="4" offset-md="8" offset-lg="8">
              <v-card
                flat
                style="opacity: 0.95;"
              >
                <v-card-title style="justify-content: center">
                  航评万象
                </v-card-title>

                <v-card-subtitle>
                  如要访问,请登录。
                </v-card-subtitle>
                <v-card-text class="pb-0">
                  <v-form
                    ref="loginForm"
                  >
                    <v-text-field
                      append-icon="mdi-account"
                      name="login"
                      label="输入 email 或者 id"
                      type="text"
                      v-model="loginInfo.userId"
                      :error="error_login"
                      required
                      :rules="idRules"
                      outlined
                      max
                    />
                    <v-text-field
                      :type="hidePassword ? 'password' : 'text'"
                      :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                      name="password"
                      label="密码"
                      @keyup.enter="login"
                      id="password"
                      :rules="passwordRules"
                      required
                      v-model="loginInfo.password"
                      :error="error_login"
                      @click:append="hidePassword = !hidePassword"
                      outlined
                    />
                    <v-spacer/>
                    <v-checkbox
                      label="记住我"
                      style="margin-left:80%; margin-top: 0;"
                      v-model="remember"
                    >
                    </v-checkbox>
                  </v-form>
                </v-card-text>
                <v-card-actions class="pb-4">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="deep-purple accent-4"
                    width="45%"
                    @click="login"
                  >
                    <h3 style="color:white;align-content:center;justify-content:center">登录</h3>
                  </v-btn>
                  <v-btn
                    width="45%"
                    color="primary"
                    @click="registerModal = true"
                  >
                    <h3 style="color:white;align-content:center;justify-content:center">注册</h3>
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-dialog
            v-model="registerModal"
            persistent
            max-width="1000px"
            style="z-index: 1501;"
          >
            <v-alert
              :type="alertSettings.type"
              app
              :value="alertSettings.show && registerModal"
              @click="alertSettings.show = false"
            >
              {{ alertSettings.text }}
            </v-alert>
            <v-card>
              <v-card-subtitle>
                <v-container>
                  <p class="headline" style="margin-top: 30px;">欢迎注册北航跳蚤市场</p>
                </v-container>
              </v-card-subtitle>
              <v-card-text>
                <v-container>
                  <v-form
                    ref="registerForm"
                  >
                    <v-text-field
                      v-model="registerInfo.username"
                      maxlength="10"
                      counter="10"
                      :rules="registerRule.usernameRule"
                      label="用户名"
                      append-icon="mdi-face-recognition"
                      outlined
                    ></v-text-field>

                    <v-text-field
                      v-model="registerInfo.email"
                      :rules="registerRule.emailRule"
                      append-icon="mdi-email-outline"
                      label="E-mail"
                      outlined
                    ></v-text-field>

                    <v-text-field
                      v-model="registerInfo.userId"
                      :rules="registerRule.userIdRule"
                      append-icon="mdi-account"
                      label="学号"
                      outlined
                    ></v-text-field>

                    <v-text-field
                      v-model="registerInfo.password"
                      :rules="registerRule.passwordRule"
                      label="密码"
                      @click:append="hidePassword = !hidePassword"
                      :type="hidePassword ? 'password' : 'text'"
                      :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                      outlined
                    ></v-text-field>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn color="indigo lighten-1"
                       text
                       @click="registerModal = false">
                  关闭
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="indigo lighten-1"
                  text
                  @click="register">
                  提交
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { loginReq,registerReq} from "@/api/user"
import {actionFailed, actionPostFailed, actionSuccessOwnDefinedText} from "@/components/ActionState";
export default {
  name:"LoginView",
  data:() => ({
    loginPic1: require("@/assets/static/img/login_1.png"),
    loginPic2: require("@/assets/static/img/login_2.jpg"),
    loginPic3: require("@/assets/static/img/login_3.png"),
    alertSettings:{
      show:false,
      type:"error",
      text:null
    },
    hidePassword:true,
    loginInfo:{
      userId:null,
      password:null
    },
    remember:true,
    registerInfo: {
      username:null,
      userId:null,
      email:null,
      password:null
    },
    passwordRules: [v => !!v || '密码不能为空'],
    idRules: [v => !!v || '邮箱或者学号不能为空'],
    error_login: false,
    registerModal: false,
    registerRule: {
      usernameRule: [v => !!v || '用户名不能为空'],
      emailRule: [
        v => !!v || '邮箱不能为空',
        v => /.+@.+\..+/.test(v) || '邮箱不合法',
        ],
      passwordRule: [
        v => !!v || '密码不能为空',
      ],
      userIdRule: [v => !!v || '学号不能为空'],
    }
  }),
  methods: {
    login() {
      const vm = this
      const valid = this.$refs.loginForm.validate()
      if (!valid) {
        return
      }
      loginReq("post", {...this.loginInfo, remember: vm.remember}).then(res => {
        if (res.data.success) {
          vm.$store.dispatch("user/login", {
            info: res.data.data,
            remember: vm.remember
          })
          vm.$router.push({name: "mainPage"})
          this.registerModal = false
          actionSuccessOwnDefinedText("登录成功")
        } else {
          actionPostFailed(res)
        }
      }).catch(err => {
        actionPostFailed({data: err})
      })
    },
    register() {
      const vm = this;
      const valid = this.$refs.registerForm.validate()
      if (!valid) {
        return
      }
      registerReq("post", this.registerInfo).then(res => {
        if (res.data.success) {
          actionSuccessOwnDefinedText("注册成功")
          vm.registerModal = false;
        } else {
          actionPostFailed(res)
        }
      }).catch(err => {
        actionPostFailed({data: err})
      })
    },
    changeAlert(type, text) {
      this.alertSettings.type = type
      this.alertSettings.show = true
      this.alertSettings.text = text
    }
  },
  mounted() {
    setInterval(() => {
      if (document.getElementById('title') != null) {
        document.getElementById("title").addEventListener('animationend', function () {
          this.classList.remove('flyText');
          document.getElementById("title").classList.add('neon');
        });
      }
    }, 3000);
  }

}
</script>

<style scoped lang="css">

.flyText {
  white-space: nowrap;
  animation: textIn 2s both;
}

.flyText1 {
  white-space: nowrap;
  animation: textIn 3s both;
}

.flyText4 {
  white-space: nowrap;
  animation: textIn 4s both;
}

.flyText5 {
  white-space: nowrap;
  animation: textIn 5s both;
}

@keyframes textIn {
  0% {
    opacity: 0;
    letter-spacing: -200px;
  }
  60% {
    letter-spacing: 5px;
  }
  100% {
    opacity: 1;
    letter-spacing: 0;
  }
}

.neon {
  color: honeydew;
  font-size: 2.5rem;
  -webkit-animation: shining 1.5s alternate infinite;
  animation: shining 1.5s alternate infinite;
}

@-webkit-keyframes shining {
  from {
    text-shadow: 0 0 1px lightblue, 0 0 3px lightblue, 0 0 5px lightblue, 0 0 6px skyblue, 0 0 8px skyblue, 0 0 10px skyblue;
  }
  to {
    text-shadow: 0 0 1px lightblue, 0 0 1px lightblue, 0 0 2px lightblue, 0 0 3px skyblue, 0 0 4px skyblue, 0 0 5px skyblue;
  }
}

.background-img {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}

.first-title {
  color: white;
  margin-top: 22%;
  text-shadow: 0 0 8px hsl(0deg 0% 100% / 55%);
}

.first-subtitle {
  color: white;
  margin-top: 2%;
  background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}



</style>
