<template>
  <a href="#" class="btn" @click="createRipple($event)">
    <span><slot></slot></span>
  </a>
</template>

<script>
export default {
  name: "RippleButton",
  methods: {
    createRipple(event) {
      const button = event.currentTarget; // 获取点击的按钮
      const rect = button.getBoundingClientRect();

      // 计算涟漪的点击位置
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // 设置自定义属性
      button.style.setProperty("--xPos", `${x}px`);
      button.style.setProperty("--yPos", `${y}px`);

    },
  },

};
</script>

<style scoped>
.btn {
    background-color: pink;
    padding: 20px 40px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    text-decoration: none;
    color: white;
    position: relative;
    overflow: hidden;
    font-weight: bold;
    font-size: 40px;
  --xPos: 0px;
  --yPos: 0px;
}

.btn span {
    position: relative;
    z-index: 1;
}

.btn::before {
    content: "";
    position: absolute;
    background-color: orangered;
    width: 0;
    height: 0;
    left: var(--xPos);
    top: var(--yPos);
    transform: translate(-50%, -50%);
    border-radius: 50%;
    transition: width 0.5s, height 0.5s;
}

.btn:hover::before {
    width: 300px;
    height: 300px;
}
</style>

