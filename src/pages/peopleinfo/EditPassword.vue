<template>
  <div class="edit-password">
    <h2>修改密码</h2>
    <form @submit.prevent="updatePassword">
      <div class="form-group">
        <label for="oldPassword">旧密码</label>
        <input type="password" id="oldPassword" v-model="oldPassword" required />
        <span v-if="oldPasswordError" class="error">{{ oldPasswordError }}</span>
      </div>
      <div class="form-group">
        <label for="newPassword">新密码</label>
        <input type="password" id="newPassword" v-model="newPassword" required />
        <span v-if="newPasswordError" class="error">{{ newPasswordError }}</span>
      </div>
      <div class="form-group">
        <label for="confirmNewPassword">确认新密码</label>
        <input type="password" id="confirmNewPassword" v-model="confirmNewPassword" required />
        <span v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</span>
      </div>
      <button type="submit" class="btn btn-primary">更新密码</button>
    </form>
    <div class="footer">
      <p>请记住您的新密码，以便于下次登录。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditPassword',
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      oldPasswordError: '',
      newPasswordError: '',
      confirmPasswordError: '',
    };
  },
  methods: {
    updatePassword() {
      this.clearErrors();
      if (this.newPassword !== this.confirmNewPassword) {
        this.confirmPasswordError = '新密码和确认密码不匹配，请重新输入。';
        return;
      }
      if (this.newPassword.length < 8) {
        this.newPasswordError = '新密码至少应为8个字符。';
        return;
      }
      // 调用 API 更新密码
      this.$api.updatePassword(this.oldPassword, this.newPassword)
          .then(() => {
            this.$alert('密码更新成功。', '成功');
            this.clearFields();
          })
          .catch(error => {
            this.$alert('密码更新失败：' + error.message, '错误');
          });
    },
    clearErrors() {
      this.oldPasswordError = '';
      this.newPasswordError = '';
      this.confirmPasswordError = '';
    },
    clearFields() {
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmNewPassword = '';
    },
  },
};
</script>

<style scoped>
.edit-password {
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 26px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.error {
  color: #d9534f;
  font-size: 14px;
  margin-top: 5px;
}

.btn {
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #777;
}
</style>
