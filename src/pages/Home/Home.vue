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
          @click="setActive(index)"
          @dblclick="showDialog(index)"
      >
        <img :src="image.url" alt="" />
      </div>
    </div>
    <!-- 弹窗组件 -->
    <CardDialog
        v-if="isDialogVisible"
        :card="selectedCard"
        @close-dialog="closeDialog"
        class="dialog-animation"
    />
  </div>
</template>

<script>
import JigglyComponent from "@/pages/Home/Fat.vue";
import CardDialog from "@/pages/Home/CardDialog.vue"; // 引入弹窗组件

export default {
  components: {JigglyComponent, CardDialog},
  data() {
    return {
      searchQuery: "",
      images: Array.from({length: 9}, (_, index) => ({
        id: null,
        name: "test",
        price: 2,
        score: 3,
        introduction: "it is a test",
        business_id: 1,
        url: `https://picsum.photos/800/600?random=${index + 1}`,
      })),
      currentIndex: 4, // 默认中间图片作为展开的图片，索引从0开始
      isDialogVisible: false, // 控制弹窗显示状态
      selectedCard: null, // 当前选中的卡片数据
    };
  },
  mounted() {
    this.loadCards();
  },
  beforeRouteUpdate(to, from, next) {
    this.loadCards();  // 每次路由更新时调用 loadCards
    next();
  },
  methods: {
    loadCards() {
      const num = 9;  // 获取9个商品

      // 1. 获取帖子的 ID 数组
      fetch(`http://47.93.172.156:8081/commodity/num/${num}`)
          .then(response => response.json())
          .then(data => {
            if (data && Array.isArray(data.ids)) {
              const ids = data.ids;
              console.log(ids);
              const fetchCardDetailsPromises = ids.map(id =>
                  fetch(` http://47.93.172.156:8081/commodity/find/${id}`)
                      .then(response => response.json())
              );

              // 3. 等待所有帖子信息都加载完成
              Promise.all(fetchCardDetailsPromises)
                  .then(cardsData => {
                    console.log(cardsData)
                    // 4. 处理获取到的卡片数据，并更新到 this.cards 中
                    this.images = cardsData.map((cardData, index) => ({
                      id: cardData.id,
                      index: index + 1,
                      name: cardData.name || "test",
                      price: cardData.price || 3,
                      score: parseFloat(Number(cardData.score).toFixed(1)) || "未评分",
                      introduction: cardData.introduction || "it is a test",
                      business_id: cardData.business_id || 1,
                      url: cardData.homepage,
                    }));
                  })
                  .catch(error => {
                    console.error("Error fetching commodity details:", error);
                  });
            } else {
              console.error("Invalid response format from commodity/num API");
            }
          })
          .catch(error => {
            console.error("Error fetching post IDs:", error);
          });
    },
    setActive(index) {
      this.currentIndex = index;
    },
    refreshCards() {
      this.searchQuery = "";
      this.loadCards();
    },
    handleSearch() {
      this.searchQuery = "";
    },
    showDialog(index) {
      this.selectedCard = this.images[index]; // 设置当前选中的图片数据
      this.isDialogVisible = true; // 显示弹窗
    },
    closeDialog() {
      this.isDialogVisible = false; // 隐藏弹窗
      this.selectedCard = null; // 清空选中数据
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.body {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  z-index: 1;
  min-height: 100vh;
  width: 100%;
}

.box {
  width: 90%;
  height: 550px;
  display: flex;
  flex-direction: row;
  position: absolute; /* 设置绝对定位 */
  top: 18%; /* 距离页面顶部留出 20% 的空白 */
  -webkit-box-reflect: below 15px -webkit-linear-gradient(transparent 50%, rgba(255, 255, 255, 0.3));
  box-sizing: border-box; /* 确保内外边距不会影响宽高 */
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
  top: 10px;
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

.cta_left {
  position: relative;
  padding: 12px 18px;
  transition: all 0.2s ease;
  border: none;
  background: none;
}

.cta_left:before {
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

.cta_left span {
  position: relative;
  font-family: "Ubuntu", sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #234567;
}

.cta_left svg {
  position: relative;
  top: 0;
  margin-left: 10px;
  fill: none;
  stroke: #234567;
  stroke-width: 2;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.cta_left:hover:before {
  width: 100%;
  background: #b1dae7;
}

.cta_left:hover svg {
  transform: translateX(0);
}

.cta_left:active {
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
