<template>
  <div class="wrapper">
    <vue-canvas-nest :config="config" class="canvas-nest"></vue-canvas-nest>
    <div class="body">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="@/assets/img/logo.png" />
          <span class="title">航评万象</span>
        </div>
      </div>
      <div class="login-container">
        <transition name="slide-fade" mode="out-in">
          <div class="login" key="login" v-if="isLogin">
            <div class="field">
              <input type="text" v-model="role" @focus="animatePlaceholder;showRoleHint = true" @blur="animatePlaceholder;showRoleHint = false" :placeholder="showRoleHint ? '填写用户/管理员/商家' : ''"  />
              <div class="placeholder" :class="{ 'focused': role }">身份</div>
            </div>
            <div class="field">
              <input type="text" v-model="username" @focus="animatePlaceholder" @blur="animatePlaceholder" placeholder="" />
              <div class="placeholder" :class="{ 'focused': username }">用户名</div>
            </div>
            <div class="field">
              <input type="password" v-model="password" @focus="animatePlaceholder" @blur="animatePlaceholder" placeholder="" />
              <div class="placeholder" :class="{ 'focused': password }">密码</div>
            </div>
            <div class="loginbtn" @mouseover="animateButton(true)" @mouseleave="animateButton(false)" @click="submitForm">登录</div>
          </div>
          <div class="login" key="register" v-else>
            <div class="field">
              <input type="text" v-model="role_register" @focus="animatePlaceholder;showRoleHint = true" @blur="animatePlaceholder;showRoleHint = false" :placeholder="showRoleHint ? '填写用户/管理员/商家' : ''"  />
              <div class="placeholder" :class="{ 'focused': role_register }">身份</div>
            </div>
            <div class="field">
              <input type="text" v-model="username_register" @focus="animatePlaceholder" @blur="animatePlaceholder" placeholder="" />
              <div class="placeholder" :class="{ 'focused': username_register }">用户名</div>
            </div>
            <div class="field">
              <input type="email" v-model="email_register" @focus="animatePlaceholder" @blur="animatePlaceholder" placeholder="" />
              <div class="placeholder" :class="{ 'focused': email_register }">邮箱</div>
            </div>
            <div class="field">
              <input type="password" v-model="password_register" @focus="animatePlaceholder" @blur="animatePlaceholder" placeholder="" />
              <div class="placeholder" :class="{ 'focused': password_register }">密码</div>
            </div>
            <div class="field">
              <input type="password" v-model="assure_register" @focus="animatePlaceholder" @blur="animatePlaceholder" placeholder="" />
              <div class="placeholder" :class="{ 'focused': assure_register }">确认密码</div>
            </div>
            <div class="loginbtn" @mouseover="animateButton(true)" @mouseleave="animateButton(false)" @click="register">注册</div>
          </div>
        </transition>
        <button class="cta" @click="toggleForm">
          <span v-if="isLogin">注册</span>
          <span v-else>登录</span>
          <svg viewBox="0 0 13 10" height="10px" width="15px">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import VueCanvasNest from 'vue-canvas-nest';
import axios from 'axios';
import { setAuthorization } from "@/utils/request";

export default {
  components: {
    VueCanvasNest
  },
  data() {
    return {
      username: "",
      password: "",
      role: "",
      username_register: "",
      password_register: "",
      assure_register: "",
      role_register: "",
      email_register:"",
      showRoleHint: false,
      isLogin: true,
      config: {
        color: '255,0,0',
        pointColor: '0,0,255',
        opacity: 0.7,
        count: 99,
        zIndex: -1
      },
      url_switch_login: '',
    };
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
      if (this.isLogin) {
        this.username_register = "";
        this.password_register = "";
        this.assure_register = "";
        this.role_register = "";
        this.email_register = "";
      } else {
        this.username = "";
        this.password = "";
        this.role = "";
      }
    },
    validateRole(role) {
      const validRoles = ["用户", "管理员", "商家"];
      return validRoles.includes(role);
    },
    animatePlaceholder(event) {
      const input = event.target;
      const placeholder = input.nextElementSibling;

      if (event.type === "focus") {
        gsap.to(placeholder, { y: -20, scale: 0.85, duration: 0.3, ease: "power2.out" });
        input.parentElement.style.setProperty('--anim', 1);
      } else if (event.type === "blur") {
        if (!input.value) {
          gsap.to(placeholder, { y: 0, scale: 1, duration: 0.3, ease: "power2.in" });
          input.parentElement.style.setProperty('--anim', 0);
        }
      }
    },
    animateButton(hover) {
      const btn = document.querySelector(".loginbtn");
      if (hover) {
        gsap.to(btn, { scale: 1.05, backgroundColor: "#4a90e2", duration: 0.3 });
      } else {
        gsap.to(btn, { scale: 1, backgroundColor: "#6779f5", duration: 0.3 });
      }
    },
    async submitForm() {
      if (!this.validateRole(this.role)) {
        alert("请输入有效的身份：用户、管理员或商家");
        return;
      }

      if (!this.username) {
        alert("请填写用户名");
        return;
      }

      if (!this.password) {
        alert("请填写密码");
        return;
      }


      console.log("登录 - 用户名:", this.username);
      console.log("登录 - 密码:", this.password);
      if (this.role === "用户") { //用户登录url
        this.url_switch_login = 'http://47.93.172.156:8081/user/login'
      }
      else if (this.role === "管理员") { //管理员登录url
        this.url_switch_login = 'http://47.93.172.156:8081/admin/login'
      }
      else {
        this.url_switch_login = 'http://47.93.172.156:8081/business/login'
      }

      try {
        const response = await axios.post(this.url_switch_login, {
          name: this.username,
          password: this.password
        });
        console.log(response.data.id);

        if (response.data.id) {
          setAuthorization({ token: response.data.id + Math.random(), expireAt: new Date(new Date().getTime() + 30 * 60 * 1000) });
          sessionStorage.setItem('id', JSON.stringify(response.data.id));
          sessionStorage.setItem('email', JSON.stringify(response.data.email));
          sessionStorage.setItem('preference', JSON.stringify(response.data.preference));
          sessionStorage.setItem('avator', JSON.stringify(response.data.avator));
          sessionStorage.setItem('name', this.username);
          sessionStorage.setItem('role', this.role);
          this.$router.push('/workplace');
        } else {
          alert('登录失败，请检查您的信息。');
        }
      } catch (error) {
        console.error('登录失败:', error);
        alert('登录出错，请稍后重试。');
      }
    },
    async register() {
      console.log("注册 - 用户名:", this.username_register);
      console.log("注册 - 邮箱:", this.email_register);
      console.log("注册 - 密码:", this.password_register);
      console.log("注册 - 确认密码:", this.assure_register);
      console.log("注册 - 身份:", this.role_register);

      if (!this.validateRole(this.role_register)) {
        alert("请输入有效的身份：用户、管理员或商家");
        return;
      }

      if (!this.username_register) {
        alert("请填写用户名");
        return;
      }

      if (!this.password_register) {
        alert("请填写密码");
        return;
      }

      if (!this.assure_register) {
        alert("请确认密码");
        return;
      }

      if (!this.email_register) {
        alert("请填写邮箱");
        return;
      }


      if (this.password_register !== this.assure_register) {
        alert("密码和确认密码不一致");
        return;
      }

      // 根据身份设置注册的 URL
      if (this.role_register === "用户") {
        this.url_switch_login = 'http://47.93.172.156:8081/user/register';
      } else if (this.role_register === "管理员") {
        this.url_switch_login = 'http://47.93.172.156:8081/admin/register';
      } else {
        this.url_switch_login = 'http://47.93.172.156:8081/business/register';
      }

      try {
        const response = await axios.post(this.url_switch_login, {
          name: this.username_register,
          email: this.email_register,
          password: this.password_register
        });

        if (response.data.id) {
          alert('注册成功');
          this.toggleForm();  // 切换回登录表单
        } else {
          alert('注册失败，请检查您的信息。');
        }
      } catch (error) {
        console.error('注册错误:', error);
        alert('注册错误，请稍后重试。');
      }
    }
  },
};
</script>

<style lang = 'css' scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}


.body {
  margin: 0;
  height: 100vh;
  width: 100%;
  color: #333;
  overflow: hidden;
  display: grid;
  place-content: center; /* Center the content vertically and horizontally */
  background: transparent;
}


.top {
  display: flex; /* 使用 flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-bottom: 20px; /* 与 .login 保持间距 */
  margin-top: -130px; /* 向上移动 .top */
}

/* 文字和图片水平排列 */
.header {
  display: flex;
  align-items: center; /* 图片和文字垂直对齐 */
}

.header .logo {
  height: 25vh;
  margin-right: 16px; /* 图片与文字间距 */
  margin-left: -50px;
}

.header .title {
  font-size: 80px;
  font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;

  /* 黑色为主，轻微过渡到白色 */
  background: linear-gradient(to right, #000000 60%, #272323 90%, #585353 100%);
  -webkit-background-clip: text; /* 让背景色填充文字 */
  color: transparent; /* 文字颜色透明，显示渐变色 */

  /* 添加轻微文字阴影来提升立体感 */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); /* 黑色阴影，增强立体感 */
}


.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%) scale(0.9);
  opacity: 0;
}


.login {
  background: white;
  height: 22rem;
  width: 30rem;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: grid;
  gap: 0.5rem;
  margin-left: 120px;
}

.login-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}


.logintext {
  font-family: "Inter";
  color: #3b3b3b; /* 调整为深灰色 */
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

@property --anim {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

.field {
  background: #e0e7ff; /* 淡蓝色背景 */
  border-radius: 0.75rem;
  position: relative;
  height: 2.5rem;
  --anim: 0;
  transition: --anim 500ms ease;

  background:
      linear-gradient(to right,
      #0b0c0b calc(clamp(0, (var(--anim) - 0.75) / 0.25, 1) * 40%),
      transparent calc(clamp(0, (var(--anim) - 0.75) / 0.25, 1) * 40%),
      transparent calc(100% - clamp(0, (var(--anim) - 0.75) / 0.25, 1) * 40%),
      #0b0c0b calc(100% - clamp(0, (var(--anim) - 0.75) / 0.25, 1) * 40%)),

      linear-gradient(to top,
      transparent calc(15% + clamp(0, (var(--anim) - 0.65) / 0.1, 1) * 70%),
      #ffffff calc(15% + clamp(0, (var(--anim) - 0.65) / 0.1, 1) * 70%)),

      linear-gradient(to right,
      transparent calc(50% - clamp(0, var(--anim) / 0.65, 1) * 50%),
      #0b0c0b calc(50% - clamp(0, var(--anim) / 0.65, 1) * 50%),
      #0b0c0b calc(50% + clamp(0, var(--anim) / 0.65, 1) * 50%),
      transparent calc(50% + clamp(0, var(--anim) / 0.65, 1) * 50%));

}

.field:has(input:focus) {
  --anim: 1;
}


.field>.placeholder {
  pointer-events: none;
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  color: #0b0c0b; /* 调整提示文字颜色为深灰色 */
  font-family: "Inter";
  transition: transform 500ms ease;
}

.field:has(input:focus)>.placeholder,
.field:has(input:not(:placeholder-shown))>.placeholder {
  transform: translateY(-50%) scale(0.85)
}

.field>input {
  display: flex;
  align-items: center;
  padding-left: 1rem;
  color: #333; /* 输入框文本颜色 */
  position: absolute;
  inset: 0.125rem;
  border-radius: 0.625rem;
  border: none;
  outline: none;
  background: white;
}

.loginbtn {
  margin-top: 0.5rem;
  background: radial-gradient(circle at center, #ffffff calc(-50% + var(--anim) * 150%), #202122 calc(var(--anim) * 100%));
  border-radius: 0.75rem;
  position: relative;
  height: 2.5rem;
  display: grid;
  place-content: center;
  color: white; /* 按钮文字颜色为白色 */
  font-family: "Inter";
  --anim: 0;
  transition: --anim 500ms ease, color 500ms ease;
}

.loginbtn:hover {
  --anim: 1;
  color: #0b0c0b;
  cursor: pointer;
}

.cta {
      position: relative;
      margin: auto;
      padding: 12px 18px;
      transition: all 0.2s ease;
      border: none;
      background: none;
      margin-top: 20px;
}

.cta:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      border-radius: 50px;
      background: #b1dae7;
      width: 45px;
      height: 45px;
      transition: all 0.3s ease;
}

.cta span {
      position: relative;
      font-family: "Ubuntu", sans-serif;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #234567;
}

.cta svg {
      position: relative;
      top: 0;
      margin-left: 10px;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke: #234567;
      stroke-width: 2;
      transform: translateX(-5px);
      transition: all 0.3s ease;
}

.cta:hover:before {
      width: 100%;
      background: #b1dae7;
}

.cta:hover svg {
      transform: translateX(0);
}

.cta:active {
      transform: scale(0.95);
}
</style>

