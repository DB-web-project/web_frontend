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
          @click="showDetails(post)"
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

    <div v-if="selectedPost" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2 class="modal-title">{{ selectedPost.title }}</h2>
        <img :src="selectedPost.image" alt="Post Image" class="modal-image" />
        <p class="modal-description">{{ selectedPost.description }}</p>
        <button class="delete-button" @click="deletePost(selectedPost.id)">删除该贴</button>

        <div class="comments-section">
          <h3>评论区</h3>
          <div class="comments-list">
            <div
                v-for="comment in selectedPost.comments"
                :key="comment.id"
                class="comment-item"
            >
              <strong>{{ comment.user }}:</strong> {{ comment.text }}
            </div>
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
    </div>
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
          comments: [
            { id: 1, user: '小明', text: '太美了！' },
            { id: 2, user: '小红', text: '我也想去看看！' }
          ]
        },
        {
          id: 2,
          title: '奇妙旅程',
          description: '每一次出发都是新的探险。',
          image: require('@/assets/img/logo.png'),
          comments: []
        },
        {
          id: 3,
          title: '自然奇观',
          description: '大自然的馈赠，美不胜收。',
          image: require('@/assets/img/logo.png'),
          comments: []
        },
      ],
      postLimit: 6,
      selectedPost: null,
      newCommentText: '',
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post =>
          post.title.includes(this.searchQuery) ||
          post.description.includes(this.searchQuery)
      ).slice(0, this.postLimit);
    },
  },
  methods: {
    showDetails(post) {
      this.selectedPost = post;
    },
    closeModal() {
      this.selectedPost = null;
      this.newCommentText = '';
    },
    deletePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId);
      this.closeModal();
    },
    loadMorePosts() {
      this.postLimit += 3;
    },
    addComment() {
      if (this.newCommentText.trim() === '') return;
      const commentId = this.selectedPost.comments.length + 1;
      this.selectedPost.comments.push({
        id: commentId,
        user: '匿名用户',
        text: this.newCommentText,
      });
      this.newCommentText = '';
    },
  },
};
</script>

<style scoped>
.comments-section {
  margin-top: 20px;
}

.comment-input-section {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.comment-input {
  flex-grow: 1;
  margin-right: 10px;
}

.comment-submit {
  padding: 8px 15px;
  background-color: #7a8a95;
  color: #e8f1f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.comment-submit:hover {
  background-color: #5c4b51;
}

.myposts-container {
  font-family: 'Georgia', serif;
  max-width: 1200px;
  margin: 60px auto;
  padding: 40px;
  background-color: #e8f1f5; /* 冷色调背景色 */
  border: 2px solid #7a8a95;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.username {
  font-size: 2.5rem;
  color: #5c4b51;
  text-shadow: 2px 2px 4px #d8d2cb;
}

.bio {
  font-size: 1.5rem;
  color: #8b7e69;
}

.filter-section {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.search-input {
  padding: 15px;
  width: 350px;
  border: 2px solid #7a8a95;
  border-radius: 8px;
  background-color: #cfd8e0;
  color: #5c4b51;
  margin-right: 20px;
}

.filter-button {
  padding: 15px 20px;
  background-color: #7a8a95;
  color: #e8f1f5;
  border: 2px solid #7a8a95;
  border-radius: 8px;
  cursor: pointer;
  text-shadow: 2px 2px 4px #cfd8e0;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 30px;
}

.post-card {
  background: #cfd8e0;
  border: 2px solid #7a8a95;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transition: transform 0.3s;
  cursor: pointer;
}

.post-card:hover {
  transform: scale(1.05);
}

.post-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.post-content {
  padding: 20px;
}

.post-title {
  font-size: 1.8rem;
  color: #5c4b51;
  margin: 0;
}

.post-description {
  color: #8b7e69;
  font-size: 1.2rem;
}

.footer {
  text-align: center;
  margin-top: 30px;
}

.load-more {
  padding: 15px 30px;
  background-color: #7a8a95;
  color: #e8f1f5;
  border: 2px solid #7a8a95;
  border-radius: 8px;
  cursor: pointer;
  text-shadow: 2px 2px 4px #cfd8e0;
  display: block;
  margin: 20px auto;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #cfd8e0;
  padding: 25px;
  border: 2px solid #7a8a95;
  border-radius: 15px;
  position: relative;
  max-width: 900px;
  width: 90%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  max-height: 60vh;
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
  color: #5c4b51;
}

.modal-title {
  font-size: 2rem;
  margin: 0;
  color: #5c4b51;
}

.modal-image {
  width: 100%;
  height: auto;
  margin: 15px 0;
}

.modal-description {
  color: #8b7e69;
  font-size: 1.2rem;
  overflow-y: auto;
  max-height: 40vh;
}

.modal-content::-webkit-scrollbar,
.modal-description::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-thumb,
.modal-description::-webkit-scrollbar-thumb {
  background-color: #7a8a95;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-track,
.modal-description::-webkit-scrollbar-track {
  background-color: #cfd8e0;
}

.delete-button {
  background-color: #7a8a95;
  color: #e8f1f5;
  border: 2px solid #7a8a95;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  text-shadow: 2px 2px 4px #cfd8e0;
  margin-top: 20px;
}

.comments-section {
  margin-top: 20px;
}

.comments-list {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 15px;
  border: 2px solid #7a8a95;
  border-radius: 8px;
  padding: 15px;
  background-color: #cfd8e0;
  color: #5c4b51;
}

.comment-item {
  padding: 10px;
  border-bottom: 2px solid #7a8a95;
}

.comment-input {
  width: 100%;
  padding: 15px;
  border: 2px solid #7a8a95;
  border-radius: 8px;
  background-color: #cfd8e0;
  color: #5c4b51;
  margin-top: 15px;
}
</style>
