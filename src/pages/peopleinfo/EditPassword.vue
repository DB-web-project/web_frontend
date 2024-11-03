<template>
  <div class="edit-password">
    <h2>修改密码</h2>
    <form @submit.prevent="updatePassword">
      <div class="form-group">
        <label for="oldPassword">旧密码</label>
        <input type="password" id="oldPassword" v-model="oldPassword" required @focus="flashInput('oldPassword')" />
        <span v-if="oldPasswordError" class="error">{{ oldPasswordError }}</span>
      </div>
      <div class="form-group">
        <label for="newPassword">新密码</label>
        <input type="password" id="newPassword" v-model="newPassword" required @focus="flashInput('newPassword')" />
        <span v-if="newPasswordError" class="error">{{ newPasswordError }}</span>
      </div>
      <div class="form-group">
        <label for="confirmNewPassword">确认新密码</label>
        <input type="password" id="confirmNewPassword" v-model="confirmNewPassword" required @focus="flashInput('confirmNewPassword')" />
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
    flashInput(inputId) {
      const inputElement = document.getElementById(inputId);
      inputElement.classList.add('flashing');
      setTimeout(() => {
        inputElement.classList.remove('flashing');
      }, 1000);
    },
  },
};
</script>

<style scoped>
.edit-password {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 20px;
  border: 2px solid #e0b0d8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  font-family: 'Georgia', serif;
  position: relative;
}

.edit-password:before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 5px solid #f0b5d0;
  border-radius: 25px;
  z-index: -1;
}

h2 {
  text-align: center;
  color: #5d2a58;
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 700;
  color: #6f2c91;
}

.form-group input {
  width: 100%;
  padding: 15px;
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
}

.form-group input:focus {
  border-color: #6f2c91;
  box-shadow: 0 0 5px rgba(111, 44, 145, 0.5);
  outline: none;
}

.flashing {
  animation: flash 0.5s linear infinite alternate;
}

@keyframes flash {
  0% {
    border-color: #6f2c91;
  }
  100% {
    border-color: #ffcc00;
  }
}

.error {
  color: #d9534f;
  font-size: 14px;
  margin-top: 5px;
}

.btn {
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 15px;
  background-color: #6f2c91;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
  background-color: #5a235e;
  transform: translateY(-2px);
}

.footer {
  text-align: center;
  margin-top: 30px;
  font-size: 16px;
  color: #777;
}

.footer p {
  margin: 0;
  line-height: 1.5;
}
</style>
