<template>
  <div class="profile">
    <div class="profile-header">
      <h2>个人资料</h2>
      <!-- 如果是商家角色，显示添加商品按钮 -->
      <div class="button-container">
        <button
            v-if="profile.role.slice(1, -1) === 'Business'"
            class="combined-button part-left"
            @click="goToAddProductPage"
        >
          <i class="el-icon-plus"></i> 添加商品
        </button>

        <button
            v-if="profile.role.slice(1, -1) === 'Business'"
            class="combined-button part-right"
            @click="goToMyProductPage"
        >
          <i class="el-icon-goods"></i> 我的商品
        </button>
      </div>

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
        avatar: null, // 头像占位符
        role: sessionStorage.getItem('role'),
        englishrole: sessionStorage.getItem('role'),
        uploadfile: null
      }
    };
  },
  mounted() {
    console.log(sessionStorage.getItem('id'));
    this.getUserInfo(sessionStorage.getItem('id'),sessionStorage.getItem('role'))

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
    async getUserInfo(userId,type) {
      try {
        // 2. 根据 userId 获取用户信息，分别查找用户、商家或管理员
        let userInfo = {};
        let Response = null
        if (type === '"User"') {
          Response = await fetch(`http://47.93.172.156:8081/user/find/${userId}`);
          console.log(888)
        }
        else if (type === '"Admin"') {
          Response = await fetch(`http://47.93.172.156:8081/admin/find/${userId}`);
        }
        else {
          Response = await fetch(`http://47.93.172.156:8081/business/find/${userId}`);
        }
        userInfo = await Response.json();
        console.log(userInfo);
        // 尝试从用户接口获取信息
        // const userResponse = await fetch(`http://47.93.172.156:8081/user/find/${userId}`);
        // if (userResponse.ok) {
        //   userInfo = await userResponse.json();
        // } else {
        //   // 如果没有找到用户信息，尝试从商家接口获取
        //   const businessResponse = await fetch(`http://47.93.172.156:8081/business/find/${userId}`);
        //   if (businessResponse.ok) {
        //     userInfo = await businessResponse.json();
        //   } else {
        //     // 如果商家也没有，尝试从管理员接口获取
        //     const adminResponse = await fetch(`http://47.93.172.156:8081/admin/find/${userId}`);
        //     if (adminResponse.ok) {
        //       userInfo = await adminResponse.json();
        //     }
        //   }
        // }
        this.profile.avatar = userInfo.avator;
        console.log(this.avatar);

        return {
          username: userInfo.name || "Unknown User",
          avatar: userInfo.avator || "https://via.placeholder.com/150",
        };
      } catch (error) {
        console.error("Error fetching user info:", error);
        return {
          username: "Unknown User",
          avatar: "https://via.placeholder.com/150",
        };
      }
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

.button-container {
  display: flex;
  border-radius: 12px; /* 四角圆润 */
  overflow: hidden; /* 确保两个按钮不会超出容器 */
}

.combined-button {
  padding: 12px 20px; /* 内边距，调整按钮的大小 */
  font-size: 14px; /* 字体大小 */
  font-weight: bold;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  height: 40px; /* 固定按钮的高度 */
}

.part-left {
  background-color: #6a9e3f; /* 左按钮背景色 */
  border-right: 1px solid #fff; /* 左右按钮之间有一条边框 */
}

.part-right {
  background-color: #4c8c27; /* 右按钮背景色 */
}

.combined-button i {
  margin-right: 8px; /* 图标与文字的间距 */
}

.combined-button:hover {
  opacity: 0.9; /* 悬浮效果 */
}

.combined-button:active {
  opacity: 0.7; /* 按下效果 */
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