<template>
  <div class="myposts-container">
    <header class="header">
      <h1 class="username">{{ username }}</h1>
      <p class="bio">{{ bio }}</p>
    </header>

    <div class="posts-grid">
      <div
          v-for="post in filteredPosts"
          :key="post.id"
          class="post-card"
          @click="goToPostDetail(post.id)"
      >
        <img :src="post.image" alt="Post Image" class="post-image" />
        <div class="post-content">
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-description">{{ post.description }}</p>
        </div>
      </div>
    </div>

    <footer class="footer">
      <button class="load-more" @click="loadMorePosts">加载更多</button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '航评万象',
      bio: '📍 评价世界的每一个角落',
      searchQuery: '',
      posts: [
        {
          id: 1,
          title: '梦幻之境',
          description: '在星空下漫步，心灵的洗礼。',
          image: require('@/assets/img/logo.png'),
        },
        {
          id: 2,
          title: '奇妙旅程',
          description: '每一次出发都是新的探险。',
          image: require('@/assets/img/logo.png'),
        },
        {
          id: 3,
          title: '自然奇观',
          description: '大自然的馈赠，美不胜收。',
          image: require('@/assets/img/logo.png'),
        },
        {
          id: 4,
          title: '美食论坛',
          description: '每一次出发都是新的探险。',
          image: require('@/assets/img/logo.png'),
        },
      ],
      postLimit: 6,
    };
  },
  computed: {
    filteredPosts() {
      return this.posts
          .filter(
              (post) =>
                  post.title.includes(this.searchQuery) ||
                  post.description.includes(this.searchQuery)
          )
          .slice(0, this.postLimit);
    },
  },
  methods: {
    // 跳转到帖子详情页
    goToPostDetail(postId) {
      this.$router.push({ name: '帖子详情', params: { id: postId } });
    },
    loadMorePosts() {
      this.postLimit += 3;
    },
  },
};
</script>

<style scoped>
.comments-section {
  margin-top: 30px;
}

.comment-input-section {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.comment-input {
  flex-grow: 1;
  margin-right: 15px;
}

.comment-submit {
  padding: 10px 20px;
  background-color: #4a4e69; /* 深色背景 */
  color: #f8f9fa; /* 浅色文字 */
  border: none;
  border-radius: 25px; /* 更圆的按钮 */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 增加阴影 */
}

.comment-submit:hover {
  background-color: #2e2d35; /* 更深的背景色 */
  transform: translateY(-2px); /* 按钮悬停时的浮动效果 */
}

.myposts-container {
  font-family: 'Georgia', serif;
  max-width: 1200px;
  margin: 60px auto;
  padding: 40px;
  background-color: #f5f5f5; /* 更清新的背景色 */
  border: 1px solid #4a4e69;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.username {
  font-size: 2.5rem;
  color: #22223b; /* 更深的颜色 */
  text-shadow: 1px 1px 3px #d3d3d3;
}

.bio {
  font-size: 1.5rem;
  color: #9a8c98;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 每行三个帖子 */
  gap: 15px; /* 适当减小间隔 */
}

.post-card {
  background: #ffffff; /* 纯白背景 */
  border: 1px solid #4a4e69;
  border-radius: 15px; /* 边角稍微圆润 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 稍微减小阴影 */
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.post-image {
  width: 100%;
  height: 180px; /* 缩小图像高度 */
  object-fit: cover;
}

.post-content {
  padding: 15px; /* 缩小内边距 */
}

.post-title {
  font-size: 1.6rem; /* 缩小标题字体 */
  color: #4a4e69;
  margin: 0;
}

.post-description {
  color: #9a8c98;
  font-size: 1rem; /* 缩小描述字体 */
}

.footer {
  text-align: center;
  margin-top: 40px;
}

.load-more {
  padding: 15px 30px;
  background-color: #4a4e69;
  color: #f8f9fa;
  border: 1px solid #4a4e69;
  border-radius: 25px;
  cursor: pointer;
  text-shadow: 1px 1px 3px #d3d3d3;
  display: block;
  margin: 20px auto;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #ffffff;
  padding: 30px;
  border: 1px solid #4a4e69;
  border-radius: 20px;
  position: relative;
  max-width: 900px;
  width: 90%;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  max-height: 70vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.close {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  font-size: 2rem;
  color: #4a4e69;
}

.modal-title {
  font-size: 2rem;
  margin: 0;
  color: #4a4e69;
}

.modal-image {
  width: 100%;
  height: auto;
  margin: 15px 0;
}

.modal-description {
  color: #9a8c98;
  font-size: 1.1rem;
  overflow-y: auto;
  max-height: 40vh;
}

.modal-content::-webkit-scrollbar,
.modal-description::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-thumb,
.modal-description::-webkit-scrollbar-thumb {
  background-color: #4a4e69;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-track,
.modal-description::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

.delete-button {
  background-color: #4a4e69;
  color: #f8f9fa;
  border: 1px solid #4a4e69;
  padding: 15px;
  border-radius: 25px;
  cursor: pointer;
  text-shadow: 1px 1px 3px #d3d3d3;
  margin-top: 20px;
}

.comments-section {
  margin-top: 30px;
}

.comments-list {
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 15px;
  border: 1px solid #4a4e69;
  border-radius: 10px;
  padding: 15px;
  background-color: #f5f5f5;
  color: #4a4e69;
}

.comment-item {
  padding: 10px;
  border-bottom: 1px solid #4a4e69;
}

.comment-input {
  width: 100%;
  padding: 15px;
  border: 1px solid #4a4e69;
  border-radius: 10px;
  background-color: #ffffff;
  color: #4a4e69;
  margin-top: 15px;
}

</style>
