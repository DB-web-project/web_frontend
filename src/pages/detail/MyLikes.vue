<template>
  <div class="my-likes">
    <h2>我的喜欢</h2>
    <div class="card-container">
      <div class="card" v-for="(item, index) in likes" :key="index">
        <img :src="item.image" alt="卡片图片" />
        <div class="card-content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <button @click="toggleLike(index)">
            {{ item.liked ? '已喜欢' : '喜欢' }}
          </button>
          <button @click="removeLike(index)">删除</button>
        </div>
      </div>
    </div>
    <input
        v-model="newTitle"
        placeholder="标题"
    />
    <input
        v-model="newDescription"
        placeholder="描述"
    />
    <input
        v-model="newImage"
        placeholder="图片链接"
    />
    <button @click="addLike">添加</button>
  </div>
</template>

<script>
export default {
  name: 'MyLikes',
  data() {
    return {
      newTitle: '',
      newDescription: '',
      newImage: '',
      likes: [],
    };
  },
  methods: {
    addLike() {
      if (this.newTitle.trim() && this.newDescription.trim() && this.newImage.trim()) {
        this.likes.push({
          title: this.newTitle.trim(),
          description: this.newDescription.trim(),
          image: this.newImage.trim(),
          liked: false,
        });
        this.newTitle = '';
        this.newDescription = '';
        this.newImage = '';
      }
    },
    toggleLike(index) {
      this.likes[index].liked = !this.likes[index].liked;
    },
    removeLike(index) {
      this.likes.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.my-likes {
  padding: 20px;
  text-align: center;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  width: 200px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content {
  padding: 10px;
}

input {
  margin: 5px;
  padding: 10px;
  width: calc(100% - 22px);
}

button {
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  margin: 5px;
}

button:hover {
  background-color: #2980b9;
}
</style>