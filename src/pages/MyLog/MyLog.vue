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
        <!-- 左侧图片预览 -->
        <div class="image-preview" v-if="postImage">
          <img :src="postImage" alt="图片预览" />
        </div>

        <!-- 右侧内容输入 -->
        <div class="input-section">
          <!-- 图片上传 -->
          <div class="upload-section">
            <input type="file" id="upload" @change="handleImageUpload" />
            <label for="upload">上传图片</label>
          </div>

          <!-- 标题输入 -->
          <input
              type="text"
              v-model="postTitle"
              placeholder="请输入帖子标题"
              class="post-title-input"
          />

          <!-- 文案输入 -->
          <textarea
              v-model="postContent"
              placeholder="请输入帖子内容..."
          ></textarea>
        </div>
      </div>

      <!-- 发布按钮 -->
      <button class="post-button" @click="publishPost">
        发布
      </button>
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
      postImage: null, // 上传的图片数据
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
        const reader = new FileReader();
        reader.onload = (e) => {
          this.postImage = e.target.result; // 将图片数据保存为预览用的 URL
        };
        reader.readAsDataURL(file);
      }
    },
    publishPost() {
      if (!this.postImage || !this.postContent.trim() || !this.postTitle.trim()) {
        alert("请填写标题、内容并上传图片！");
        return;
      }
      const newCard = {
        index: this.cards.length + 1,
        title: this.postTitle,
        description: this.postContent,
        linkText: "Enter",
        image: this.postImage,
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
  transform: translate(-50%, -50%) scale(0.5); /* 初始缩放比例 */
  opacity: 0; /* 初始透明度 */
  animation: zoomIn 0.5s ease forwards;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 101; /* 保证弹窗位于遮罩层上方 */
}

/* 发布帖子弹窗样式 */
.post-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 600px;
  min-height: 300px;
  padding: 20px;
}

.post-content {
  display: flex;
  gap: 20px;
  width: 100%;
}

.image-preview {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 200px;
}

.image-preview img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
}

.input-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  resize: none;
}

.post-title-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

.upload-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.post-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
}

.post-button:hover {
  background-color: #0056b3;
}

/* 卡片动画 */
@keyframes zoomIn {
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
