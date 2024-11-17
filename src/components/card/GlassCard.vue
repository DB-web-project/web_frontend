<template>
  <div class="card-container" @mouseover="hovered = true" @mouseleave="hovered = false">
    <!-- 背景图片 -->
    <div class="background-image" :style="{ backgroundImage: `url(${image})` }"></div>

    <!-- 内容（聚焦显示） -->
    <div class="content" v-if="hovered">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <button @click="showModal">Read More</button>
    </div>

    <!-- 弹窗 -->
    <div class="modal" v-if="modalVisible" @click.self="closeModal">
      <div class="modal-content">
        <!-- 左侧内容 -->
        <div class="left">
          <img :src="image" alt="Card Image" />
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </div>

        <!-- 右侧评论 -->
        <div class="right">
          <h4>Posted by: {{ user.name }}</h4>
          <ul>
            <li v-for="(comment, index) in comments" :key="index">{{ comment }}</li>
          </ul>
          <!-- 发布评论 -->
          <textarea v-model="newComment" placeholder="Add a comment..."></textarea>
          <button @click="addComment">Post Comment</button>
        </div>

        <!-- 关闭按钮 -->
        <button class="close-button" @click="closeModal">×</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GlassCard",
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      hovered: false,
      modalVisible: false,
      newComment: "", // 新的评论
    };
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    addComment() {
      if (this.newComment.trim()) {
        this.comments.push(this.newComment.trim());
        this.newComment = "";
      }
    },
  },
};
</script>

<style scoped>
/* 卡片容器样式 */
.card-container {
  position: relative;
  width: 280px;
  height: 400px;
  margin: 20px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.1);
}

.card-container:hover {
  transform: translateY(-10px);
}

.background-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(4px);
  transition: filter 0.3s ease-in-out;
}

.card-container:hover .background-image {
  filter: blur(2px);
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.content h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.content p {
  font-size: 16px;
  margin-bottom: 20px;
}

.content button {
  padding: 10px 20px;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.content button:hover {
  background: #ddd;
}

/* 弹窗样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  display: flex;
  width: 80%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.left {
  flex: 2;
  padding: 20px;
  background: rgba(255, 255, 255, 0.6);
}

.left img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}

.right {
  flex: 1;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.right h4 {
  margin-bottom: 10px;
  font-weight: bold;
}

.right ul {
  list-style: none;
  padding: 0;
}

.right ul li {
  margin-bottom: 10px;
  font-size: 14px;
}

.right textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.right button {
  padding: 8px 16px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.right button:hover {
  background: #0056b3;
}

/* 关闭按钮样式 */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff5e5e;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}

.close-button:hover {
  background: #ff3b3b;
}
</style>
