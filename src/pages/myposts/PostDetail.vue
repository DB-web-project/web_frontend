<template>
  <div class="post-detail-container">
    <div class="post-detail-header">
      <div class="post-header-content">
        <img class="post-header-image" :src="postImageUrl" alt="Post Image" />
        <div class="post-header-info">
          <h1 class="post-title">{{ post.title }}</h1>
          <p class="post-description">{{ post.description }}</p>
          <div class="post-meta">
            <span class="post-author">发布者: {{ post.author }}</span>
            <span class="post-date">{{ post.date }}</span>
          </div>
        </div>
      </div>
      <img src="@/assets/img/logo.png" alt="Logo" class="post-logo" />
    </div>

    <div class="comments-section">
      <h3 class="comments-title">评论区</h3>
      <div v-if="post.comments.length === 0" class="no-comments">暂无评论</div>
      <div v-else class="comments-list">
        <transition-group name="fade" tag="div">
          <div
              v-for="comment in post.comments"
              :key="comment.id"
              class="comment-item"
          >
            <div class="comment-header">
              <img class="comment-avatar" :src="comment.avatar" alt="Avatar" />
              <span class="comment-user">{{ comment.user }}</span>
              <span class="comment-time">{{ comment.time }}</span>
            </div>
            <p class="comment-text">{{ comment.text }}</p>
          </div>
        </transition-group>
      </div>

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
        title: `帖子 ${postId} 的标题`,
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

<style scoped>
.post-detail-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.post-detail-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

.post-header-content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.post-header-image {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
}

.post-header-info {
  flex-grow: 1;
}

.post-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
}

.post-description {
  font-size: 1.2rem;
  color: #666;
}

.post-meta {
  display: flex;
  gap: 15px;
  margin-top: 15px;
  font-size: 1rem;
  color: #999;
}

.post-logo {
  max-width: 60px;
  margin-top: 10px;
  align-self: center;
}

.comments-section {
  margin-top: 30px;
}

.comments-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.no-comments {
  color: #999;
  font-size: 1.2rem;
}

.comments-list {
  margin-top: 20px;
}

.comment-item {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.comment-user {
  font-weight: 600;
  color: #333;
}

.comment-time {
  font-size: 0.9rem;
  color: #999;
}

.comment-text {
  margin-top: 10px;
  font-size: 1rem;
  color: #444;
}

.comment-input-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.comment-input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
}

.comment-input:focus {
  border-color: #007bff;
}

.comment-submit {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.comment-submit:hover {
  background-color: #0056b3;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
