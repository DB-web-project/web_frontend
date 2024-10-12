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
          <button @click="removeAnnouncement(announcement.id)">删除</button>
        </div>
      </transition-group>
    </div>
    <div class="add-announcement">
      <input type="text" v-model="newTitle" placeholder="公告标题" />
      <textarea v-model="newContent" placeholder="公告内容"></textarea>
      <button @click="addAnnouncement">添加公告</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnnouncementBoard',
  data() {
    return {
      newTitle: '',
      newContent: '',
      announcements: [
        { id: 1, title: '公告一', content: '这是第一个公告', date: new Date() },
        { id: 2, title: '公告二', content: '这是第二个公告', date: new Date() },
        { id: 3, title: '公告三', content: '这是第三个公告', date: new Date() },
      ],
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
        });
        this.newTitle = '';
        this.newContent = '';
      }
    },
    removeAnnouncement(id) {
      this.announcements = this.announcements.filter(announcement => announcement.id !== id);
    },
    formatDate(date) {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    },
  },
};
</script>

<style scoped>
.announcement-board {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.announcement-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
}

.announcement-item {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

.announcement-item:last-child {
  border-bottom: none;
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.announcement-title {
  font-size: 18px;
  font-weight: bold;
  color: #3498db;
}

.announcement-date {
  font-size: 12px;
  color: #999;
}

.announcement-content {
  margin: 5px 0;
  color: #555;
}

button {
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

.add-announcement {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

input,
textarea {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input:focus,
textarea:focus {
  border-color: #3498db;
}

textarea {
  resize: none;
  height: 80px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>