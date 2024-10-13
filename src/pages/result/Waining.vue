<template>
  <div class="announcement-board">
    <h2>公告栏</h2>
    <div class="announcement-list">
      <transition-group name="fade" tag="div">
        <div
            class="announcement-item"
            v-for="(announcement) in announcements"
            :key="announcement.id"
        >
          <div class="announcement-header">
            <span class="announcement-title">{{ announcement.title }}</span>
            <span class="announcement-date">{{ formatDate(announcement.date) }}</span>
          </div>
          <p class="announcement-content">{{ announcement.content }}</p>
          <div class="buttons">
            <button @click="removeAnnouncement(announcement.id)" class="btn btn-danger">删除</button>
            <button @click="detailAnnouncement(announcement.id)" class="btn btn-info">详细信息</button>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="add-announcement">
      <input type="text" v-model="newTitle" placeholder="公告标题" class="input-title" />
      <textarea v-model="newContent" placeholder="公告内容" class="input-content"></textarea>
      <button @click="addAnnouncement" class="btn btn-primary">添加公告</button>
    </div>

    <!-- 模态框 -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ selectedAnnouncement.title }}</h3>
        <p><strong>内容:</strong> {{ selectedAnnouncement.content }}</p>
        <p><strong>日期:</strong> {{ formatDate(selectedAnnouncement.date) }}</p>
        <p><strong>发布者ID:</strong> {{ selectedAnnouncement.publisher }}</p>
        <button @click="showModal = false" class="btn btn-secondary">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'AnnouncementBoard',
  data() {
    return {
      newTitle: '',
      newContent: '',
      announcements: [
        { id: 1, title: '公告一', content: '这是第一个公告', date: new Date(), publisher: 1 },
        { id: 2, title: '公告二', content: '这是第二个公告', date: new Date(), publisher: 2 },
        { id: 3, title: '公告三', content: '这是第三个公告', date: new Date(), publisher: 3 },
      ],
      showModal: false,
      selectedAnnouncement: {}
    };
  },
  methods: {
    addAnnouncement() {
      if (this.newTitle.trim() && this.newContent.trim()) {
        this.announcements.push({
          id: Date.now(),
          title: this.newTitle.trim(),
          content: this.newContent.trim(),
          date: new Date(),
          publisher: Math.floor(Math.random() * 100) // 示例发布者ID
        });
        this.newTitle = '';
        this.newContent = '';
      }
    },
    removeAnnouncement(id) {
      this.announcements = this.announcements.filter(announcement => announcement.id !== id);
    },
    detailAnnouncement(id) {
      axios.get(`http://127.0.0.1:4523/m1/5223912-4890620-default/announcement/find/${id}`)
          .then((res) => {
            this.selectedAnnouncement = {
              ...res.data,
              date: new Date(res.data.date),
            };
            this.showModal = true;
          })
          .catch(err => {
            console.error(err);
          });
    },
    formatDate(date) {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    },
  },
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
}
.announcement-board {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.announcement-list {
  margin-bottom: 20px;
}

.announcement-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.announcement-title {
  font-weight: bold;
  font-size: 1.2em;
}

.announcement-date {
  font-size: 0.9em;
  color: #888;
}

.announcement-content {
  margin: 10px 0;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

.add-announcement {
  display: flex;
  flex-direction: column;
}

.input-title,
.input-content {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.input-title {
  font-size: 1em;
}

.input-content {
  height: 80px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}
</style>
