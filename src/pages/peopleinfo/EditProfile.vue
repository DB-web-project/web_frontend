<template>
  <div class="profile">
    <div class="profile-header">
      <h2>个人资料</h2>
      <!-- 如果是商家角色，显示添加商品按钮 -->
      <button
          v-if="profile.role.slice(1, -1) === 'Business'"
          class="add-product-button"
          @click="goToAddProductPage"
      >
        添加商品
      </button>
      <button
          v-if="profile.role.slice(1, -1) === 'Business'"
          class="add-product-button"
          @click="goToMyProductPage"
      >
        我的商品
      </button>

    </div>
    <div class="avatar-container">
      <!-- 添加 title 属性 -->
      <img
          :src="profile.avatar"
          alt="用户头像"
          class="avatar"
          @click="chooseAvatar"
          title="点击修改"
      />
      <input
          type="file"
          ref="fileInput"
          accept="image/*"
          style="display: none"
          @change="updateAvatar"
      />
    </div>
    <div class="info-section">
      <div class="info-item">
        <label>用户名:</label>
        <span>{{ profile.username.slice(1, -1) }}</span>
      </div>
      <div class="info-item">
        <label>邮箱:</label>
        <span>{{ profile.email.slice(1, -1) }}</span>
      </div>
      <div class="info-item">
        <label>身份:</label>
        <span>{{ profile.role.slice(1, -1) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'EditProfile',
  data() {
    return {
      profile: {
        username: sessionStorage.getItem('name'),
        email: sessionStorage.getItem('email'),
        avatar: sessionStorage.getItem('avator').slice(1, -1), // 头像占位符
        role: sessionStorage.getItem('role'),
        englishrole: sessionStorage.getItem('role'),
        uploadfile: null
      }
    };
  },
  methods: {
    // 跳转到添加商品页面
    goToAddProductPage() {
      this.$router.push({ path: '/postgood' });
    },
    goToMyProductPage() {
      this.$router.push({ path: '/mycommodity' });
    },
    // 点击头像时触发文件选择
    chooseAvatar() {
      this.$refs.fileInput.click(); // 模拟点击文件输入框
    },
    // 更新头像并上传到后端
    updateAvatar(event) {
      const file = event.target.files[0]; // 获取选择的文件
      if (file) {
        this.profile.avatar = URL.createObjectURL(file); // 更新头像显示
        this.uploadfile = file

        let uploadUrl = '';
        if (sessionStorage.getItem('role') === '"Business"') {
          uploadUrl = 'http://47.93.172.156:8081/business/upload';
          this.profile.englishrole = 'business'
        } else if (sessionStorage.getItem('role') === '"Admin"') {
          uploadUrl = 'http://47.93.172.156:8081/admin/upload';
          this.profile.englishrole = 'admin'
        } else if (sessionStorage.getItem('role') === '"User"') {
          uploadUrl = 'http://47.93.172.156:8081/user/upload';
          this.profile.englishrole = 'user'
        }


        // 获取原文件的名称
        const originalFile = this.uploadfile;

        // 获取文件扩展名（例如 .jpg, .png）
        const fileExtension = originalFile.name.split('.').pop().toLowerCase();

        // 根据扩展名设置新的文件名
        const newFileName = sessionStorage.getItem('id') + this.profile.englishrole + '.' + fileExtension;

        // 创建一个新的 File 实例，重命名文件
        const newFile = new File([originalFile], newFileName, {
          type: originalFile.type, // 保留文件的 MIME 类型
        });


        // 创建一个 FormData 实例用于上传文件
        const formData = new FormData();
        formData.append('id', sessionStorage.getItem('id'));
        formData.append('avatar', newFile);

        // 使用 axios 上传 FormData 到后端
        axios.post(uploadUrl, formData)
            .then(response => {
              console.log('头像上传成功:', response.data);
            })
            .catch(error => {
              console.error('头像上传失败:', error);
            });
      }
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

.add-product-button {
  padding: 16px;
  width: 56px; /* 确保按钮是圆形的 */
  height: 56px; /* 确保按钮是圆形的 */
  border: none;
  border-radius: 50%;
  background: linear-gradient(145deg, #6a9e3f, #4c8c27); /* 渐变效果 */
  color: white;
  font-size: 12px; /* 更大字体，适应圆形按钮 */
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 10px 15px rgba(0, 0, 0, 0.1); /* 绝对的光影效果 */
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
}

.add-product-button:hover {
  background: linear-gradient(145deg, #5a8e35, #43721a); /* 悬浮时渐变更深 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3), 0 15px 25px rgba(0, 0, 0, 0.15); /* 悬浮时更强的光影效果 */
  transform: translateY(-4px); /* 悬浮时轻微上浮效果 */
}

.add-product-button:active {
  background: linear-gradient(145deg, #4b7b2e, #39601d); /* 按下时的渐变颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 5px 8px rgba(0, 0, 0, 0.1); /* 按下时的光影效果 */
  transform: translateY(2px); /* 按下时轻微下沉效果 */
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
