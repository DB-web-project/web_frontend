<template>
  <div class="container">
    <!-- 模糊背景 -->
    <div
        v-if="showDialog"
        class="overlay"
        @click="closeDialog"
    ></div>

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

    <!-- 卡片内容 -->
    <div class="cards-container">
      <CardItem
          v-for="(card, index) in paginatedCards"
          :key="index"
          :index="card.index"
          :title="card.title"
          :description="card.description"
          :linkText="card.linkText"
          :image="card.image"
          @open-dialog="openDialog(card)"
      />
    </div>

    <!-- 弹窗组件 -->
    <CardDialog
        v-if="showDialog"
        :card="selectedCard"
        @close-dialog="closeDialog"
        class="card-dialog"
    />
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import CardItem from "./CardItem.vue";
import CardDialog from "./CardDialog.vue";

export default {
  name: "GlassCards",
  components: {
    SearchBar,
    CardItem,
    CardDialog,
  },
  data() {
    return {
      cards: [],
      searchQuery: "",
      currentPage: 1,
      cardsPerPage: 15,
      showDialog: false,
      selectedCard: null,
    };
  },
  computed: {
    filteredCards() {
      return this.searchQuery
          ? this.cards.filter((card) =>
              card.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
          : this.paginatedCards;
    },
    paginatedCards() {
      const start = (this.currentPage - 1) * this.cardsPerPage;
      const end = start + this.cardsPerPage;
      return this.cards.slice(start, end);
    },
  },
  methods: {
    loadCards() {
      const num = 15;  // 获取15个卡片

      // 1. 获取帖子的 ID 数组
      fetch(`http://47.93.172.156:8081/post/num/${num}`)
          .then(response => response.json())
          .then(data => {
            if (data && Array.isArray(data.ids)) {
              // 2. 根据 ID 获取每个帖子的详细信息
              const ids = data.ids;
              console.log(ids);
              const fetchCardDetailsPromises = ids.map(id =>
                  fetch(` http://47.93.172.156:8081/post/find/${id}`)
                      .then(response => response.json())
              );

              // 3. 等待所有帖子信息都加载完成
              Promise.all(fetchCardDetailsPromises)
                  .then(cardsData => {
                    // 4. 处理获取到的卡片数据，并更新到 this.cards 中
                    this.cards = cardsData.map((cardData, index) => ({
                      id:cardData.id,
                      index: index + 1,
                      title: cardData.title || `Card ${Math.floor(Math.random() * 1000)}`,
                      description: cardData.content || "This is a dynamically loaded card description.",
                      linkText: "Enter",
                      image: cardData.picture ,
                    }));
                    this.currentPage = 1;
                  })
                  .catch(error => {
                    console.error("Error fetching card details:", error);
                  });
            } else {
              console.error("Invalid response format from post/num API");
            }
          })
          .catch(error => {
            console.error("Error fetching post IDs:", error);
          });
    },
    refreshCards() {
      this.searchQuery = "";
      this.loadCards();
    },
    handleSearch() {
      console.log("Search executed:", this.searchQuery);
      this.loadCards();
    },
    openDialog(card) {
      this.selectedCard = card;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.selectedCard = null;
    },
  },
  mounted() {
    this.loadCards();
  },
};
</script>

<style scoped>
/* 容器样式 */
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  z-index: 1;
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  scrollbar-width: none;
}

.container::-webkit-scrollbar {
  display: none;
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

.cards-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 60px;
  width: 100%;
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

@keyframes zoomIn {
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
