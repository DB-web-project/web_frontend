<template>
  <div class="wrapper">
    <vue-canvas-nest :config="config" class="canvas-nest"></vue-canvas-nest>
    <div class="body">
      <div class="login-container">
        <transition name="slide-fade" mode="out-in">
          <div class="login" key="login">
            <div class="field">
              <input type="text" v-model="newUserName" @focus="animatePlaceholder;showRoleHint = true" @blur="animatePlaceholder;showRoleHint = false" placeholder=""/>
              <div class="placeholder" :class="{ 'focused': newUserName }">新用户名</div>
            </div>
            <div class="loginbtn" @mouseover="animateButton(true)" @mouseleave="animateButton(false)" @click="submitChange">提交修改</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import VueCanvasNest from 'vue-canvas-nest';
import axios from 'axios';
// import { setAuthorization } from "@/utils/request";

export default {
  components: {
    VueCanvasNest
  },
  data() {
    return {
      newUserName: '',
      showRoleHint: false,
      config: {
        color: '255,0,0',
        pointColor: '0,0,255',
        opacity: 0.7,
        count: 99,
        zIndex: -1
      },
    };
  },
  methods: {
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
    async submitChange() {
      axios.put(`http://127.0.0.1:3000/user/update/${this.id}`, {
        name: this.newUserName,
        password: sessionStorage.getItem('password'),
        email: sessionStorage.getItem('email'),
      })
          .then((res) => {
            if (res.status == 200) {
              alert('修改成功');
            } else {
              alert('修改失败');
            }
          })
          .catch(err => {
            console.log(err)
            alert('修改失败');
          });
    },
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
  height: 50vh;
  width: 100%;
  color: #333;
  overflow: hidden;
  display: grid;
  place-content: center; /* Center the content vertically and horizontally */
  background: transparent;
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





.login {
  background: white;
  height: 12rem;
  width: 30rem;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: grid;
  gap: 0.5rem;
  margin: 0 auto; /* 使元素水平居中 */
  /* 如果需要垂直居中，也可以设置父元素为 flex 布局 */
}

.login-container {
  display: flex;
  align-items: center;
  gap: 1rem;
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


.cta:hover svg {
  transform: translateX(0);
}

.cta:active {
  transform: scale(0.95);
}
</style>

