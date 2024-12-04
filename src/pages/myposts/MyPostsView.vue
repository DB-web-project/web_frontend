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
          v-for="card in cards"
          :key="card.id"
          :title="card.title"
          :description="card.description"
          linkText="Enter"
          :image="publishCardImage"
          type="view"
          @open-dialog="openDialog(card)"
      />
    </div>

    <!-- 查看详情弹窗 -->
    <CardDialog
        v-if="showDialog"
        :card="selectedCard"
        @close-dialog="closeDialog"
        class="card-dialog-old"
    />

    <!-- 发布帖子弹窗 -->
    <div v-if="showPostDialog" class="post-dialog card-dialog">
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
import axios from "axios";

export default {
  name: "MyLog",
  components: {
    CardItem,
    CardDialog,
  },
  data() {
    return {
      cards: [], // 存储从数据库获取的卡片数据
      showDialog: false, // 控制查看详情弹窗显示
      selectedCard: null, // 当前选择的卡片
      showPostDialog: false, // 控制发布帖子弹窗显示
      postTitle: "", // 帖子标题
      postContent: "", // 帖子内容
      postImage: null, // 上传的图片数据
      publishCardImage: "https://img1.baidu.com/it/u=44127744,2047701546&fm=253&fmt=auto&app=120&f=JPEG?w=803&h=800", // 默认图片
    };
  },
  computed: {
  },
  methods: {
    // 从后端加载卡片数据
    loadCards() {
      const id  = sessionStorage.getItem('id')
      axios.get(`http://127.0.0.1:3000/post/publisher/${id}`)  // 替换为你的API接口
          .then((response) => {
            response.data.ids.forEach((id) => {
              this.fetchpost(id);
            });
          })
          .catch((error) => {
            console.error("获取帖子数据失败:", error);
          });
    },
    // 打开查看详情的对话框
    openDialog(card) {
      this.selectedCard = card;
      this.showDialog = true;
    },
    // 打开发布帖子弹窗
    openPostDialog() {
      this.showPostDialog = true;
    },
    // 关闭所有弹窗
    closeDialog() {
      this.showDialog = false;
      this.showPostDialog = false;
      this.selectedCard = null;
      this.postTitle = "";
      this.postContent = "";
      this.postImage = null;
    },
    // 处理图片上传
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.postImage = e.target.result; // 设置图片预览
        };
        reader.readAsDataURL(file); // 转换为Data URL
      }
    },
    // 发布帖子
    publishPost() {
      if (!this.postTitle.trim() || !this.postContent.trim()) {
        alert("请填写标题和内容");
        return;
      }

      // 新卡片数据
      const newCard = {
        id: this.cards.length + 1,
        title: this.postTitle,
        description: this.postContent,
        //linkText: "Enter",
        image: this.postImage || this.publishCardImage,  // 如果没有上传图片，使用默认图片
        date: Date.now(),
        likes: 0
      };

      // 将新卡片添加到卡片列表
      this.cards.unshift(newCard); // 新发布的卡片插到前面

      // 清空发布的内容
      this.closeDialog();

      // 发布帖子到后端
      if (sessionStorage.getItem('role') === '用户') {
        this.type = 'User'
      } else if (sessionStorage.getItem('role') == '管理员') {
        this.type = 'Admin'
      } else if (sessionStorage.getItem('role') === '商家') {
        this.type = 'Business'
      }

      // 发布帖子
      axios.post('http://127.0.0.1:3000/post/post', {
        publisher: sessionStorage.getItem('id'),
        publisher_type: this.type,
        date: Date.now().toString(),
        content: this.postContent.trim(),
        title: this.postTitle.trim()
      })
          .then((res) => {
            if (res.status === 201) {
              this.$message.success('发布帖子成功');
            } else {
              this.$message.error('发布帖子失败');
            }
          })
          .catch(err => {
            if (err.response && err.response.status === 404) {
              this.$message.error('发布帖子失败');
            } else {
              console.error(err);
              this.$message.error('发布帖子过程中发生错误');
            }
          });
    },
    fetchpost(id) {
      axios.get(`http://127.0.0.1:3000/post/find/${id}`, id)
          .then((response) => {
            const post = response.data;

            /// 将日期字符串转换为 Date 对象
            if (typeof post.date === 'string') {
              post.date = new Date(post.date);
            }

            // 将公告对象添加到 cards 数组
            this.cards.push({
              id: post.id,
              title: post.title, // 假设返回的数据可能没有 title 字段
              description: post.content,
              date: post.date,
              likes: post.likes,
            });
          })
          .catch((error) => {
            console.error('Error fetching posts:', error);
            this.$message.error('无法获取帖子信息，请检查网络连接或联系管理员。');
          });

    }
  },
  created() {
    this.loadCards(); // 页面加载时获取卡片数据
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

/* 帖子弹窗样式 */
.card-dialog-old {
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



/* 弹窗样式 */
.card-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9); /* 让弹窗略微缩小，避免过大 */
  opacity: 0; /* 初始透明度 */
  animation: zoomIn 0.5s ease forwards;
  background: #fff;
  border-radius: 8px;
  padding: 35px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 101; /* 保证弹窗位于遮罩层上方 */
  max-width: 95%; /* 弹窗宽度最大占据屏幕的95% */
  width: 800px; /* 增大弹窗宽度 */
}

/* 发布帖子弹窗样式 */
.post-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.8));
  border-radius: 20px;
  width: 90%; /* 弹窗宽度设为90% */
  max-width: 900px; /* 增加最大宽度 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  padding: 40px; /* 增加内边距 */
  box-sizing: border-box;
}

/* 其他内容区域样式 */
.post-content {
  display: flex;
  padding: 20px;
  justify-content: space-between;
}

.image-preview {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 250px;
}

.image-preview img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.input-section {
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

textarea {
  padding: 18px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid #e1e1e1;
  min-height: 150px;
  resize: vertical;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

textarea:focus {
  border-color: #0078d4;
  box-shadow: 0 0 5px rgba(0, 120, 212, 0.5);
  outline: none;
}

.post-title-input {
  padding: 16px 20px;
  font-size: 20px;
  border-radius: 12px;
  border: 1px solid #e1e1e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: #333;
}

.post-title-input:focus {
  border-color: #0078d4;
  box-shadow: 0 0 5px rgba(0, 120, 212, 0.5);
  outline: none;
}

.upload-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.upload-section input {
  font-size: 18px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s ease;
}

.upload-section input:focus {
  border-color: #0078d4;
  box-shadow: 0 0 5px rgba(0, 120, 212, 0.5);
}

.post-button {
  margin-top: 30px;
  padding: 14px 28px;
  background-color: #0078d4;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-button:hover {
  background-color: #005fa3;
  transform: translateY(-2px);
}

.post-button:active {
  transform: translateY(1px);
}

/* 卡片动画 */
@keyframes zoomIn {
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>




