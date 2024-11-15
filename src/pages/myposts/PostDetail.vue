<template>
  <div class="post-detail-container">
    <!-- 文章头部 -->
    <div class="post-detail-header">
      <!-- 发布者信息块 -->
      <div class="author-info">
        <img class="author-avatar" :src="post.authorAvatar" alt="Author Avatar" />
        <div class="author-details">
          <h2 class="author-name">{{ post.author }}</h2>
          <p class="post-date">{{ post.date }}</p>
        </div>
      </div>

      <!-- 帖子内容 -->
      <div class="post-content">
        <h1 class="post-title">{{ post.title }}</h1>
        <p class="post-body">{{ post.content }}</p>
      </div>
    </div>

    <!-- 评论区 -->
    <div class="comments-section">
      <h3 class="comments-title">评论区</h3>
      <div v-if="post.comments.length === 0" class="no-comments">暂无评论</div>

      <!-- 评论列表 -->
      <div v-else class="comments-list">
        <transition-group name="fade" tag="div">
          <div
              v-for="comment in post.comments"
              :key="comment.id"
              class="comment-item"
          >
            <div class="comment-header">
              <img class="comment-avatar" :src="comment.avatar" alt="Commenter Avatar" />
              <div class="comment-author-details">
                <span class="comment-user">{{ comment.user }}</span>
                <span class="comment-time">{{ comment.time }}</span>
              </div>
            </div>
            <p class="comment-text">{{ comment.text }}</p>
          </div>
        </transition-group>
      </div>

      <!-- 评论输入框 -->
      <div class="comment-input-section">
        <input
            v-model="newCommentText"
            placeholder="添加评论..."
            class="comment-input"
            @keyup.enter="addComment"
        />
        <button class="comment-submit" @click="addComment">发布</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      post: {
        id: this.$route.params.id,
        title: '',
        description: '',
        author: '张三',
        date: '2024年11月8日',
        comments: [],
        authorAvatar: require('@/assets/img/logo.png'),
      },
      newCommentText: '',
      postImageUrl: require('@/assets/img/logo.png'),
    };
  },
  created() {
    const postId = this.$route.params.id;
    this.loadPostData(postId);
  },
  methods: {
    loadPostData(postId) {
      const post = {
        id: postId,
        title: `帖子 ${postId} 的标题sd`,
        description: `这是帖子 ${postId} 的详细描述内容...`,
        author: '李四',
        date: '2024年11月8日',
        comments: [
          {
            id: 1,
            user: '小明',
            text: '这篇帖子真不错！',
            avatar: require('@/assets/img/logo.png'),
            time: '2024年11月8日 10:00',
          },
          {
            id: 2,
            user: '小红',
            text: '我也觉得很有意思！',
            avatar: require('@/assets/img/logo.png'),
            time: '2024年11月8日 10:05',
          },
        ],
      };
      this.post = post;
    },
    addComment() {
      if (this.newCommentText.trim() === '') return;
      const newComment = {
        id: this.post.comments.length + 1,
        user: '匿名用户',
        text: this.newCommentText,
        avatar: require('@/assets/img/logo.png'),
        time: new Date().toLocaleString(),
      };
      this.post.comments.push(newComment);
      this.newCommentText = '';
    },
  },
};
</script>

<style>
/* 基本样式 */
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f7f7f7;
  color: #333;
  margin: 0;
  padding: 0;
}

/* 容器设置 */
.post-detail-container {
  max-width: 850px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

/* 文章头部 */
.post-detail-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

/* 发布者信息 */
.author-info {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
  border: 2px solid #007bff; /* 类似自由女神的象征色，蓝色 */
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 18px;
  font-weight: bold;
  color: #007bff; /* 蓝色对应自由女神色调 */
}

.post-date {
  font-size: 14px;
  color: #777;
  margin-top: 5px;
}

/* 帖子内容 */
.post-content {
  margin-bottom: 20px;
}

.post-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.post-body {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  word-wrap: break-word;
}

/* 评论区 */
.comments-section {
  margin-top: 30px;
}

.comments-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.no-comments {
  font-size: 16px;
  color: #888;
  text-align: center;
  margin-top: 20px;
}

/* 评论列表 */
.comments-list {
  margin-top: 20px;
}

.comment-item {
  display: flex;
  flex-direction: column;
  padding: 12px 18px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.comment-item:hover {
  background-color: #f1f1f1;
  transform: translateY(-2px);
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
  border: 2px solid #007bff;
}

.comment-author-details {
  display: flex;
  flex-direction: column;
}

.comment-user {
  font-size: 16px;
  font-weight: bold;
  color: #007bff; /* 用户名同样使用自由女神蓝色 */
}

.comment-time {
  font-size: 12px;
  color: #888;
}

.comment-text {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

/* 评论输入框 */
.comment-input-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.comment-input {
  width: 80%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  color: #555;
  transition: border-color 0.3s ease;
}

.comment-input:focus {
  border-color: #007bff;
  outline: none;
}

.comment-submit {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.comment-submit:hover {
  background-color: #0056b3;
}

.comment-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 自由女神色调的按钮、链接 */
button, a {
  color: #007bff;
}

button:hover, a:hover {
  color: #0056b3;
  text-decoration: underline;
}




</style>