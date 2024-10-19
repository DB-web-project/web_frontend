<template>
  <div class="edit-email-container">
    <form @submit.prevent="updateEmail" class="email-form">
      <div class="form-group">
        <label for="old-email">旧邮箱地址：</label>
        <input
            type="email"
            id="old-email"
            v-model="oldEmail"
            required
            @blur="validateEmail"
            class="email-input"
        />
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>
      <div class="form-group">
        <label for="new-email">新邮箱地址：</label>
        <input
            type="email"
            id="new-email"
            v-model="newEmail"
            required
            @blur="validateEmail"
            class="email-input"
        />
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>
      <button type="submit" class="submit-button" :disabled="isSubmitting">提交更改</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldEmail: '',
      newEmail: '',
      emailError: '',
      isSubmitting: false,
    };
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.newEmail) && this.newEmail) {
        this.emailError = '请输入有效的邮箱地址。';
      } else {
        this.emailError = '';
      }
    },
    updateEmail() {
      this.isSubmitting = true;
      // 在这里添加提交邮箱更改到服务器的逻辑
      // 例如，使用axios发送POST请求
      // 如果成功，可以清空表单或显示成功消息
      // 如果失败，可以显示错误消息

      // 模拟提交成功
      setTimeout(() => {
        this.isSubmitting = false;
        this.oldEmail = '';
        this.newEmail = ''; // 清空输入框
        alert('邮箱地址已成功更新！');
      }, 1000);
    },
  },
};
</script>

<style scoped>
.edit-email-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
}

.title {
  color: #333;
  font-size: 2.5em;
  margin-bottom: 0.5em;
}

.email-form {
  width: 100%;
  max-width: 600px;
  padding: 2em;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5em;
  position: relative;
}

label {
  display: block;
  color: #555;
  margin-bottom: 0.5em;
  font-size: 1em;
}

.email-input {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.email-input:focus {
  outline: none;
  border-color: #007bff;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: 0.5em;
}

.submit-button {
  width: 100%;
  padding: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>