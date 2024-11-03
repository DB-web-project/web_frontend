<template>
  <div class="profile">
    <div class="profile-header">
      <h2>个人资料</h2>
<!--      <button class="edit-button" @click="editProfile">编辑资料</button>-->
    </div>
    <div class="avatar-container">
      <img :src="profile.avatar" alt="用户头像" class="avatar" />
    </div>
    <div class="info-section">
      <div class="info-item">
        <label>用户名:</label>
        <span>{{ profile.username }}</span>
      </div>
      <div class="info-item">
        <label>邮箱:</label>
        <span>{{ profile.email }}</span>
      </div>
      <div class="info-item">
        <label>身份:</label>
        <span>{{ profile.role }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfile',
  data() {
    return {
      profile: {
        username: sessionStorage.getItem('name'),
        email: sessionStorage.getItem('email'),
        avatar: require('@/assets/img/logo.png'), // 头像占位符
        role: sessionStorage.getItem('role'),
      }
    };
  },
  methods: {
    editProfile() {
      alert('编辑资料功能尚未实现');
    },
  },
};
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #e2e2e2;
  padding-bottom: 20px;
}

.profile-header h2 {
  font-size: 28px;
  color: #333;
}

.edit-button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.edit-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #007bff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-section {
  margin-top: 20px;
}

.info-item {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.info-item label {
  font-weight: 600;
  color: #555;
}

.info-item span {
  color: #333;
  font-size: 16px;
}

.social-links {
  margin-top: 30px;
}

.social-links h3 {
  margin-bottom: 10px;
  font-size: 24px;
  color: #333;
}

.social-links ul {
  list-style: none;
  padding: 0;
}

.social-links li {
  margin-bottom: 10px;
}

.social-links a {
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #0056b3;
}
</style>
