<template>
  <div class="announcement-board">
    <h2 class="board-title">公告栏</h2>
    <div class="announcement-list">
      <transition-group name="fade" tag="div">
        <div
            class="announcement-item"
            v-for="(announcement) in announcements"
            :key="announcement.id"
        >
          <div class="announcement-header">
            <span class="announcement-title">{{ announcement.title }}</span>
          </div>
          <p class="announcement-content">{{ announcement.content }}</p>
          <div class="buttons">
            <button @click="removeAnnouncement(announcement.id)" class="btn btn-danger">删除</button>
            <button @click="detailAnnouncement(announcement.id)" class="btn btn-info">详细信息</button>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- 只有当用户角色是 Admin 时才显示添加公告部分 -->
    <div v-if="isAdmin" class="add-announcement">
      <input type="text" v-model="newTitle" placeholder="公告标题" class="input-title" />
      <textarea v-model="newContent" placeholder="公告内容" class="input-content"></textarea>
      <button @click="addAnnouncement" class="btn btn-primary">添加公告（仅管理员）</button>
    </div>

    <!-- 模态框 -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">{{ selectedAnnouncement.title }}</h3>
        <p><strong>内容:</strong> {{ selectedAnnouncement.content }}</p>
        <p><strong>日期:</strong> {{ selectedAnnouncement.date }}</p>
        <button @click="showModal = false" class="btn btn-secondary">关闭</button>
      </div>
    </div>
  </div>
</template>

<script type="es6">
import axios from "axios";

export default {
  name: 'AnnouncementBoard',
  data() {
    return {
      newTitle: '',
      newContent: '',
      announcements: [],
      showModal: false,
      selectedAnnouncement: {}
    };
  },
  computed: {
    // 判断当前用户是否是管理员
    isAdmin() {
      return sessionStorage.getItem('role') === 'Admin';
    }
  },
  created() {
    // this.fetchAnnouncements(11); // 在组件创建时获取所有公告
    this.initAnnouncement();
  },
  methods: {
    initAnnouncement() {
      axios.get(`http://47.93.172.156:8081/announcement/find_all`)
          .then((response) => {
            response.data.ids.forEach((id) => {
              this.fetchAnnouncements(id);
            });
          })
          .catch((error) => {
            console.error('Error load announcements:', error);
            this.$message.error('加载公告失败');
          });
    },
    fetchAnnouncements(id) {
      axios.get(`http://47.93.172.156:8081/announcement/find/${id}`, id)
          .then((response) => {
            console.log(response.data);
            console.log('ok');
            const announcement = response.data;

            /// 将日期字符串转换为 Date 对象
            if (typeof announcement.date === 'string') {
              announcement.date = new Date(announcement.date);
            }

            // 将公告对象添加到 announcements 数组
            this.announcements.push({
              id: announcement.id,
              title: announcement.title, // 假设返回的数据可能没有 title 字段
              content: announcement.content,
              date: announcement.date,
              publisher: announcement.publisher,
            });
          })
          .catch((error) => {
            console.error('Error fetching announcements:', error);
            this.$message.error('无法获取公告信息，请检查网络连接或联系管理员。');
          });
    },
    addAnnouncement() {
      const date = Date.now().toString();

      console.log('发布公告检测')
      const content = this.newContent.trim();
      const publisher = sessionStorage.getItem('id');
      const title = this.newTitle.trim();
      axios.post(`http://47.93.172.156:8081/announcement/post`, {
        date: date,
        content: content,
        publisher: publisher,
        title: title
      })
          .then((res) => {
            if (res.status === 201) {
              this.$message.success('发布公告成功');
              this.fetchAnnouncements(res.data.id);//更新页面
              console.log('here')
              console.log(res.data)
            } else {
              console.log('发布失败', res.status);
            }
          })
          .catch(err => {
            if (err.response && err.response.status === 400) {
              this.$message.error('发布公告失败');
            } else {
              console.error(err);
              this.$message.error('发布公告过程中发生错误');
            }
          });
    },
    removeAnnouncement(id) {
      this.announcements = this.announcements.filter(announcement => announcement.id !== id);
      axios.delete(`http://47.93.172.156:8081/announcement/delete/${id}`, id)
          .then(() => {
            this.$message.success('删除公告成功');
          })
          .catch((error) => {
            console.error('Error delete announcements:', error);
            this.$message.error('无法删除公告信息，请检查网络连接或联系管理员。');
          });
    },
    detailAnnouncement(id) {
      axios.get(`http://47.93.172.156:8081/announcement/find/${id}`, id)
          .then((res) => {
            const announcement = res.data;
            const formattedDate = new Date(parseInt(res.data.date));
            // 格式化为可读的时间格式，例如 "YYYY-MM-DD HH:MM:SS"
            const year = formattedDate.getFullYear();
            const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
            const day = formattedDate.getDate().toString().padStart(2, '0');
            const hours = formattedDate.getHours().toString().padStart(2, '0');
            const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
            const seconds = formattedDate.getSeconds().toString().padStart(2, '0');

            const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            console.log(formattedTime);
            this.selectedAnnouncement.id = announcement.id
            this.selectedAnnouncement.title = announcement.title
            this.selectedAnnouncement.content = announcement.content
            this.selectedAnnouncement.date = formattedTime
            this.showModal = true;
          })
          .catch(err => {
            console.error(err);
          });
    },
    formatDate(date) {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    },
  }
};
</script>

<style scoped>
body {
  font-family: 'Georgia', serif;
  background: linear-gradient(to right, #e6e9f0, #eef1f3);
}

.announcement-board {
  max-width: 900px;
  margin: 30px auto;
  padding: 25px;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border: 2px solid #007bff; /* 蓝色边框 */
}

.board-title {
  text-align: center;
  color: #007bff;
  font-size: 2.5em;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.announcement-list {
  margin-bottom: 20px;
}

.announcement-item {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin: 15px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.announcement-item:hover {
  transform: translateY(-2px); /* 悬停效果 */
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #007bff;
  padding-bottom: 10px;
}

.announcement-title {
  font-weight: bold;
  font-size: 1.5em;
  color: #333;
}

.announcement-date {
  font-size: 0.9em;
  color: #888;
}

.announcement-content {
  margin: 15px 0;
  line-height: 1.6;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
  transform: scale(1.05);
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
  transform: scale(1.05);
}

.add-announcement {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.input-title,
.input-content {
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  font-size: 1em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.input-title {
  font-weight: bold;
  border-color: #007bff;
}

.input-content {
  height: 100px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #2c3e50;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  width: 450px;
}

.modal-title {
  color: #FFD700; /* 金色标题 */
  text-align: center;
  font-size: 2em; /* 增大标题字体 */
  border-bottom: 2px solid #8B0000; /* 深红色底边 */
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.modal-content p {
  color: #ffffff; /* 白色文字 */
  margin: 10px 0;
  line-height: 1.5;
}

.btn-secondary {
  background-color: #8B0000; /* 深红色按钮 */
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0; /* 上方留出空间，按钮居中 */
  transition: background-color 0.3s, transform 0.2s;
}

.btn-secondary:hover {
  background-color: #A52A2A; /* 鼠标悬停效果 */
  transform: scale(1.05);
}
</style>
