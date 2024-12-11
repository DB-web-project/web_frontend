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
          @search-input="handleSearch"
      />
    </div>
    <div class="jiggly-wrapper" v-if="loading">
      <JigglyComponent />
    </div>

    <!-- 瀑布流布局容器 -->
    <div class="card-container" v-if="!loading">
      <!-- 使用v-for循环生成卡片 -->
      <card-component
          v-for="(image, index) in filteredCards"
          :key="index"
          :imageUrl="image.url"
          :title="image.name"
          :description="image.score"
          :offset="1"
          :index="index"
          @card-clicked="showDialog"
      />
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
import SearchBar from "@/pages/workplace/SearchBar.vue";
import CardDialog from "@/pages/Market/CardDialog.vue"; // 引入弹窗组件
import CardComponent from "./Card.vue"; // 引入新的卡片组件
import axios from "axios";
import JigglyComponent from "@/pages/Home/Fat.vue";

export default {
  components: { SearchBar, CardDialog, CardComponent,JigglyComponent },
  data() {
    return {
      loading: false,
      currentPage: 1,
      cardsPerPage: 9,
      searchQuery: "",
      images: Array.from({ length: 9 }, () => ({
        id: null,
        name: "test",
        price: 2,
        score: 3,
        introduction: "it is a test",
        business_id: 1,
        url: require('@/assets/img/blank.png'),
      })),
      currentIndex: 4, // 默认中间图片作为展开的图片，索引从0开始
      isDialogVisible: false, // 控制弹窗显示状态
      selectedCard: null, // 当前选中的卡片数据
    };
  },
  mounted() {
    this.loadCards();
    setTimeout(() => {
      this.loading = false; // 结束加载
    }, 1000); // 延迟500ms，确保加载动画有足够时间显示
  },
  beforeRouteUpdate(to, from, next) {
    this.loadCards();  // 每次路由更新时调用 loadCards
    next();
  },
  computed: {
    filteredCards() {
      return this.searchQuery
          ? this.images.filter((image) =>
              image.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
          : this.paginatedCards;
    },
    paginatedCards() {
      const start = (this.currentPage - 1) * this.cardsPerPage;
      const end = start + this.cardsPerPage;
      return this.images.slice(start, end);
    },
  },
  methods: {
    loadCards() {
      this.loading = true;
      if (this.searchQuery) {
        console.log(this.searchQuery);
        // 根据搜索查询发起请求
        axios.get(`http://47.93.172.156:8081/commodity/search`, {
          keyword: this.searchQuery,
        })
            .then((response) => {
              const data = response.data;
              if (data && Array.isArray(data.ids)) {
                const ids = data.ids;
                console.log(ids);
                const fetchCardDetailsPromises = ids.map((id) =>
                    fetch(` http://47.93.172.156:8081/commodity/find/${id}`)
                        .then((response) => response.json())
                );
                console.log(fetchCardDetailsPromises)

                // 3. 等待所有帖子信息都加载完成
                Promise.all(fetchCardDetailsPromises)
                    .then((cardsData) => {
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
                      this.currentPage = 1;
                    })
                    .catch((error) => {
                      console.error("Error fetching commodity details:", error);
                    });
              } else {
                console.error("Invalid response format from commodity/num API");
              }
            })
            .catch((error) => {
              console.error("Error fetching post IDs:", error);
            });
      } else {
        const num = 9;  // 获取9个商品
        // 1. 获取帖子的 ID 数组
        fetch(`http://47.93.172.156:8081/commodity/num/${num}`)
            .then((response) => response.json())
            .then((data) => {
              if (data && Array.isArray(data.ids)) {
                const ids = data.ids;
                console.log(ids);
                const fetchCardDetailsPromises = ids.map((id) =>
                    fetch(` http://47.93.172.156:8081/commodity/find/${id}`)
                        .then((response) => response.json())
                );

                // 3. 等待所有帖子信息都加载完成
                Promise.all(fetchCardDetailsPromises)
                    .then((cardsData) => {
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
                      this.currentPage = 1;
                    })
                    .catch((error) => {
                      console.error("Error fetching commodity details:", error);
                    });
              } else {
                console.error("Invalid response format from commodity/num API");
              }
            })
            .catch((error) => {
              console.error("Error fetching post IDs:", error);
            });
      }
    },
    setActive(index) {
      this.currentIndex = index;
    },
    refreshCards() {
      this.searchQuery = "";
      const searchInput = this.$el.querySelector('input[type="text"]');
      if (searchInput) searchInput.value = "";
      this.loadCards();
      setTimeout(() => {
        this.loading = false; // 结束加载
      }, 800); // 延迟500ms，确保加载动画有足够时间显示
    },
    handleSearch(value) {
      this.searchQuery = value;
      console.log("Search executed:", this.searchQuery);
      if (this.searchQuery) {
        this.loadCards();
        setTimeout(() => {
          this.loading = false; // 结束加载
        }, 800); // 延迟500ms，确保加载动画有足够时间显示
      }
    },
    showDialog(data) {
      this.selectedCard = this.images[data.index]; // 设置当前选中的图片数据
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
  overflow: hidden;
}

.card-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px; /* 减少左右间距 */
  margin-top: 100px; /* 向下移动容器 */
  width: 100%;
}

.jiggly-wrapper {
  position: fixed; /* 固定在页面中间 */
  top: 90%; /* 距离顶部50% */
  left: 55%; /* 距离左边50% */
  transform: translate(-50%, -50%); /* 使用 transform 将元素完全居中 */
  width: 50vw; /* 占满视口宽度 */
  height: 5vh; /* 占满视口高度 */
  z-index: 100; /* 确保在其他元素之上 */
  display: flex; /* 可用于居中子元素 */
  justify-content: center; /* 子元素水平居中 */
  align-items: center; /* 子元素垂直居中 */
  background: rgba(0, 0, 0, 0.5); /* 可选：半透明背景 */
}

.el-col {
  padding: 0 5px; /* 给卡片列加点内边距，减小左右空隙 */
}

.card-container .el-card {
  width: 100%; /* 确保卡片宽度占满父容器 */
}

.func {
  position: relative;
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

.dialog-animation {
  animation: fadeInUp 0.5s ease-in-out; /* 添加平滑的弹窗动画 */
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px); /* 初始位置稍微下移 */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* 最终位置恢复 */
  }
}

</style>
