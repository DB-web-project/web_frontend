<template>
  <div class="container">
    <!-- 模糊背景 -->
    <div
        v-if="showDialog || showPostDialog"
        class="overlay"
        @click="closeDialog"
    ></div>

    <!-- 卡片内容 -->
    <div class="cards-container">
      <!-- 发布帖子卡片 -->
      <CardItem
          key="0"
          :index="0"
          title="发布帖子"
          description="航评万象，记录你的生活，让别人看到你的生活"
          linkText="Start"
          :image="publishCardImage"
          type="func"
          @open-dialog="openPostDialog"
      />

      <!-- 动态加载的卡片 -->
      <CardItem
          v-for="(card, index) in paginatedCards"
          :key="index"
          :index="card.index"
          :title="card.title"
          :description="card.description"
          :linkText="card.linkText"
          :image="card.image"
          type="view"
          @open-dialog="openDialog(card)"
      />
    </div>

    <!-- 查看详情弹窗 -->
    <CardDialog
        v-if="showDialog"
        :card="selectedCard"
        @close-dialog="closeDialog"
        class="card-dialog"
    />

    <!-- 发布帖子弹窗 -->
    <div
        v-if="showPostDialog"
        class="post-dialog card-dialog"
    >
      <div class="post-content">
        <!-- 左侧图片上传与预览 -->
        <div class="image-preview">
          <div
              v-if="postImage"
              class="preview-container"
          >
            <img :src="postImage" alt="预览图片" />
          </div>
          <div v-else class="placeholder">
            预览图片区域
          </div>
          <input
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="upload-input"
          />
        </div>

        <!-- 右侧标题和内容输入 -->
        <div class="input-section">
          <!-- 标题输入 -->
          <input
              type="text"
              v-model="postTitle"
              placeholder="请输入帖子标题"
              class="post-title-input"
          />
          <!-- 内容输入 -->
          <textarea
              v-model="postContent"
              placeholder="请输入帖子内容..."
          ></textarea>
          <!-- 发布按钮 -->
          <button class="post-button" @click="publishPost">
            发布
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from "./CardItem.vue";
import CardDialog from "./CardDialog.vue";

export default {
  name: "MyLog",
  components: {
    CardItem,
    CardDialog,
  },
  data() {
    return {
      cards: [], // 存储动态加载的卡片
      currentPage: 1, // 当前页
      cardsPerPage: 1000000000, // 每页卡片数
      showDialog: false, // 控制查看详情弹窗显示
      selectedCard: null, // 当前选择的卡片
      showPostDialog: false, // 控制发布帖子弹窗显示
      postTitle: "", // 帖子标题
      postContent: "", // 帖子内容
      postImage: null, // 用户上传的图片 URL
      publishCardImage: "https://img1.baidu.com/it/u=44127744,2047701546&fm=253&fmt=auto&app=120&f=JPEG?w=803&h=800", // 替换为实际的图片 URL
    };
  },
  computed: {
    paginatedCards() {
      const start = (this.currentPage - 1) * this.cardsPerPage;
      const end = start + this.cardsPerPage;
      return this.cards.slice(start, end);
    },
  },
  methods: {
    loadCards() {
      this.cards = Array.from({ length: 49 }, (_, index) => ({
        index: index + 1,
        title: `Card ${Math.floor(Math.random() * 100)}`,
        description: "This is a dynamically loaded card description.",
        linkText: "Enter",
        image: `https://picsum.photos/400/600?random=${index}`,
      }));
      this.currentPage = 1;
    },
    openDialog(card) {
      this.selectedCard = card;
      this.showDialog = true;
    },
    openPostDialog() {
      this.showPostDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.selectedCard = null;
      this.showPostDialog = false;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.postImage = URL.createObjectURL(file); // 将图片生成临时 URL
      }
    },
    publishPost() {
      if (!this.postTitle.trim() || !this.postContent.trim()) {
        alert("标题和内容为必填项！");
        return;
      }
      const newCard = {
        index: this.cards.length + 1,
        title: this.postTitle,
        description: this.postContent,
        linkText: "Enter",
        image: this.postImage || `https://picsum.photos/400/600?random=${Math.floor(Math.random() * 1000)}`, // 如果没有图片则生成随机图片
      };
      this.cards.unshift(newCard); // 新发布的帖子插入到最前面
      this.closeDialog();
      this.postTitle = "";
      this.postContent = "";
      this.postImage = null;
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
  min-height: 100vh;
  width: 100%;
}

/* 背景模糊遮罩 */
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

/* 卡片容器 */
.cards-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 60px;
  width: 100%;
}

/* 弹窗样式 */
.card-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 101;
  display: flex;
  gap: 20px;
  width: 700px;
}

/* 发布帖子弹窗样式 */
.post-dialog {
  min-height: 400px;
}

.post-content {
  display: flex;
  width: 100%;
}

.image-preview {
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.preview-container img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.placeholder {
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  border: 1px dashed #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.upload-input {
  margin-top: 10px;
}

.input-section {
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea,
.post-title-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
}

textarea {
  min-height: 200px;
}

.post-button {
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.post-button:hover {
  background-color: #0056b3;
}
</style>
