<template>
  <div class="body">
    <div class="func">
      <button class="cta" @click="refreshCards">
        <span>Update</span>
        <svg viewBox="0 0 13 10" height="10px" width="15px">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </button>
      <SearchBar
          v-model="searchQuery"
          @keydown.enter.native="handleSearch"
      />
    </div>
    <div class="jiggly-wrapper">
      <JigglyComponent />
    </div>
    <div class="box">
      <!-- 使用v-for循环生成9个图片盒子 -->
      <div
          v-for="(image, index) in images"
          :key="index"
          class="img-box"
          :class="{ active: index === currentIndex }"
          @click="setActive(index)">
        <img :src="image.url" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import JigglyComponent from "@/pages/Home/Fat.vue";
import SearchBar from "@/pages/workplace/SearchBar.vue";
export default {
  components: {SearchBar, JigglyComponent},
  data() {

    return {
      searchQuery: "",
      // 模拟9个随机生成的图片
      images: Array.from({length: 9}, (_, index) => ({
        url: `https://picsum.photos/800/600?random=${index + 1}`
      })),
      currentIndex: 4,  // 默认中间图片作为展开的图片，索引从0开始
    };
  },
  methods: {
    loadCards() {
      const timestamp = Date.now();
      this.images = Array.from({length: 9}, (_, index) => ({
        url: `https://picsum.photos/400/600?random=${index}&ts=${timestamp}`
      })),
      this.currentIndex = 4;
    },
    // 设置当前点击的图片为展开的图片
    setActive(index) {
      this.currentIndex = index;
    },
    refreshCards() {
      this.searchQuery = "";
      this.loadCards();
    },
    handleSearch() {
      this.searchQuery = "";
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.box {
  width: 1200px;
  height: 550px;
  display: flex;
  flex-direction: row;
  position: relative;
  -webkit-box-reflect: below 15px -webkit-linear-gradient(transparent 50%, rgba(255, 255, 255, 0.3));
}

.jiggly-wrapper {
  position: absolute;
  top: -380px;  /* 距离顶部10px */
  right: 10px; /* 距离右边10px */
  z-index: 0; /* 确保JigglyComponent在其他元素之上 */
}

.img-box {
  width: 100px;
  height: 550px;
  overflow: hidden;
  transition: 0.3s;
  cursor: pointer;
}

.img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
}

/* 默认缩小的图片 */
.img-box:not(.active) {
  width: 100px;
}

/* 当前展开的图片 */
.img-box.active {
  width: 800px;
}

/* hover 效果，确保鼠标移到图片时其他图片也会缩小 */
.img-box:hover {
  width: 800px;
}

/* 当图片展开时，后续图片变小 */
.img-box.active:hover ~ .img-box {
  width: 100px;
}

.func {
  position: absolute;
  top: 25px;  /* 距离顶部10px */
  left: 0px; /* 距离左边10px */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #ffffff;
  width: 100%;
  box-sizing: border-box;
}


.cta {
  position: relative;
  padding: 12px 18px;
  transition: all 0.2s ease;
  border: none;
  background: none;
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
  color: #234567;
}

.cta svg {
  position: relative;
  top: 0;
  margin-left: 10px;
  fill: none;
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 100;
}

.card-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5); /* 初始缩放比例 */
  opacity: 0; /* 初始透明 */
  animation: zoomIn 0.5s ease forwards;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 101;
}
</style>
