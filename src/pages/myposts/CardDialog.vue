<template>
  <div class="dialog-backdrop">
    <div class="dialog">
      <!-- 左侧图片 -->
      <div class="dialog-left">
        <img :src="card.image" alt="Card Image" />
      </div>

      <!-- 右侧内容 -->
      <div class="dialog-right">
        <!-- 文案部分 -->
        <div class="dialog-text">
          <h2>{{ card.title }}</h2>
          <p>{{ card.description }}</p>
        </div>
        <hr class="divider" />

        <!-- 评论标题 -->
        <div class="comments-header">
          <h4>Comments</h4>
        </div>

        <!-- 评论区域 -->
        <div class="comments-section">
          <ul>
            <li v-for="(comment, index) in comments" :key="index">
              <!-- 用户头像和评论 -->
              <div class="comment-content">
                <div class="user-info">
                  <img :src="comment.avatar" alt="User Avatar" class="avatar" />
                  <span class="username">{{ comment.username }}</span>
                </div>
                <!-- 评论内容和操作 -->
                <div class="comment-details">
                  <span class="comment-text">{{ comment.text }}</span>
                  <div class="actions">
                    <div class="like" @click="toggleLike(index)">
                      <span :class="{ liked: comment.liked }">♥</span>
                      <span>{{ comment.likes }}</span>
                    </div>
                    <button
                        class="delete-button"
                        v-if="canDelete"
                        @click="deleteComment(index)"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- 评论输入框 -->
        <div class="comment-input">
          <input v-model="newComment" placeholder="Add a comment" />
          <button @click="addComment">Post</button>
        </div>
      </div>

      <!-- 关闭按钮 -->
      <button class="close-button" @click="$emit('close-dialog')">×</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardDialog",
  props: {
    card: Object, // 接收卡片数据
  },
  data() {
    return {
      comments: [
        { text: "很好", likes: 5, liked: false, username: "Alice", avatar: "https://img0.baidu.com/it/u=1613066704,908751205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500" },
        { text: "Nice card!", likes: 3, liked: false, username: "Bob", avatar: "https://img0.baidu.com/it/u=1613066704,908751205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500" },
        { text: "Amazing!", likes: 10, liked: false, username: "Charlie", avatar: "https://img0.baidu.com/it/u=1613066704,908751205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500" },
        { text: "Love it!", likes: 8, liked: false, username: "Diana", avatar: "https://img0.baidu.com/it/u=1613066704,908751205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500" },
        { text: "Great post!", likes: 5, liked: false, username: "Alice", avatar: "https://img0.baidu.com/it/u=1613066704,908751205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500" },
        { text: "Nice card!", likes: 3, liked: false, username: "Bob", avatar: "https://img0.baidu.com/it/u=1613066704,908751205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500" },
        { text: "Amazing!", likes: 10, liked: false, username: "Charlie", avatar: "https://img0.baidu.com/it/u=1613066704,908751205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500" },
        { text: "Love it!", likes: 8, liked: false, username: "Diana", avatar: "https://img0.baidu.com/it/u=1613066704,908751205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500" },
      ],
      newComment: "",
      canDelete: true,
    };
  },

  methods: {
    addComment() {
      if (this.newComment.trim()) {
        const randomUsername = `User${Math.floor(Math.random() * 1000)}`;
        const randomAvatar = "https://img0.baidu.com/it/u=1613066704,908751205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500";
        this.comments.push({
          text: this.newComment,
          likes: 0,
          liked: false,
          username: randomUsername,
          avatar: randomAvatar,
        });
        this.newComment = "";
      }
    },

    deleteComment(index) {
      this.comments.splice(index, 1);
    },
    toggleLike(index) {
      const comment = this.comments[index];
      comment.liked = !comment.liked;
      comment.liked ? comment.likes++ : comment.likes--;
    },
  },
};
</script>

<style scoped>

* {
  font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
/* 背景遮罩 */
.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 弹窗主体 */
.dialog {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  width: 1000px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  font-family: "Arial", "Helvetica", sans-serif;
  color: #333;
}

/* 左侧图片 */
.dialog-left {
  flex: 3;
}

.dialog-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

/* 右侧内容 */
.dialog-right {
  flex: 2;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

/* 文案部分 */
.dialog-text {
  margin-bottom: 15px;
}

.dialog-text h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #222;
}

.dialog-text p {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
}

/* 分割线 */
.divider {
  border: 0;
  height: 1px;
  background: #e0e0e0;
  margin: 10px 0;
}

/* 评论标题固定 */
.comments-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  padding: 5px 0;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #444;
}

/* 评论区域 */
.comments-section {
  flex: 1;
  overflow-y: auto;
  max-height: 600px;
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
}

.comments-section::-webkit-scrollbar {
  display: none; /* Webkit 浏览器隐藏滚动条 */
}

.comments-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comments-section li {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

/* 用户信息容器 */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

/* 用户头像 */
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
}

/* 用户名 */
.username {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

/* 评论内容和操作 */
.comment-content {
  display: flex;
  flex-direction: column;
}

/* 评论详情部分 */
.comment-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.comment-text {
  font-size: 15px;
  line-height: 1.5;
  color: #555;
  flex: 1;
}

/* 点赞和删除按钮 */
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.like {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #999;
}

.like span {
  margin-left: 5px;
}

.like span.liked {
  color: red;
}

.delete-button {
  background: none;
  border: none;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  padding: 0;
}

.delete-button:hover {
  color: #ff0000;
}

/* 评论输入框和按钮 */
.comment-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
}

.comment-input input {
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.comment-input button {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.comment-input button:hover {
  background: #0056b3;
}

/* 关闭按钮 */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.close-button:hover {
  color: #000;
}
</style>
