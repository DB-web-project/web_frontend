<template>
  <div class="card" ref="card" @click="openDialog">
    <div class="background" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="content">
      <h2>{{ index }}</h2>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <a href="#">{{ linkText }}</a>
    </div>
  </div>
</template>

<script>
import VanillaTilt from "vanilla-tilt";

export default {
  name: "CardItem",
  props: {
    index: Number,
    title: String,
    description: String,
    linkText: String,
    image: String,
  },
  methods: {
    openDialog() {
      this.$emit("open-dialog", {
        index: this.index,
        title: this.title,
        description: this.description,
        image: this.image,
      });
    },
  },
  mounted() {
    VanillaTilt.init(this.$refs.card, { max: 25, speed: 400 });
  },
};
</script>


<template>
  <div class="card" ref="card" @click="openDialog">
    <div class="background" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="content">
      <h2>{{ index }}</h2>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <a href="#">{{ linkText }}</a>
    </div>
  </div>
</template>

<script>
import VanillaTilt from "vanilla-tilt";

export default {
  name: "CardItem",
  props: {
    index: Number,
    title: String,
    description: String,
    linkText: String,
    image: String,
  },
  methods: {
    openDialog() {
      this.$emit("open-dialog", {
        index: this.index,
        title: this.title,
        description: this.description,
        image: this.image,
      });
    },
  },
  mounted() {
    VanillaTilt.init(this.$refs.card, { max: 25, speed: 400 });
  },
};
</script>

<style scoped>
@import url("http://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins";
}

/* 卡片容器 */
.card {
  position: relative;
  width: 200px; /* 卡片宽度 */
  height: 300px; /* 卡片高度 */
  margin: 10px; /* 卡片之间的间距 */
  border-radius: 10px; /* 圆角半径 */
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3); /* 卡片阴影 */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
}

/* 背景图片层 */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: filter 0.3s; /* 平滑背景模糊过渡 */
  z-index: 1;
}

/* 悬停时背景模糊 */
.card:hover .background {
  filter: blur(3px); /* 背景模糊程度 */
}

/* 内容层 */
.content {
  position: relative;
  z-index: 2;
  padding: 10px; /* 内容的内边距 */
  text-align: center;
  background: rgba(255, 255, 255, 0.8); /* 半透明背景，增加文字可读性 */
  border-radius: 5px; /* 小圆角 */
  transform: translateY(50px); /* 初始偏移位置 */
  opacity: 0; /* 初始透明度 */
  transition: transform 0.3s, opacity 0.3s; /* 平滑过渡 */
}

/* 悬停时内容显示 */
.card:hover .content {
  transform: translateY(0);
  opacity: 1;
}

/* 内容样式 */
.content h2 {
  position: absolute;
  top: -50px; /* 数字的位置 */
  right: 15px; /* 数字的位置 */
  font-size: 64px; /* 数字字体大小 */
  color: rgba(255, 255, 255, 0.2); /* 数字透明度颜色 */
}

.content h3 {
  font-size: 16px; /* 标题大小 */
  color: #0b0c0b;
}

.content p {
  font-size: 12px; /* 描述文字大小 */
  color: #0b0c0b;
  font-weight: 300;
  margin: 5px 0 10px 0; /* 描述文字的间距 */
}

.content a {
  position: relative;
  display: inline-block;
  padding: 6px 15px; /* 按钮的内边距 */
  margin-top: 10px; /* 按钮与内容的间距 */
  background-color: #fff;
  color: #000;
  text-decoration: none;
  border-radius: 15px; /* 按钮圆角 */
  font-size: 12px; /* 按钮字体大小 */
  font-weight: 500;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2); /* 按钮阴影 */
}
</style>

