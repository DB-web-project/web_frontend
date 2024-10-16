<template>
  <div class="edit-email-container">
    <h1>修改邮箱地址</h1>
    <form @submit.prevent="updateEmail">
      <div class="form-group">
        <label for="new-email">新邮箱地址：</label>
        <input
            type="email"
            id="new-email"
            v-model="newEmail"
            required
            @blur="validateEmail"
        />
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>
      <button type="submit" :disabled="isSubmitting">提交更改</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newEmail: '',
      emailError: '',
      isSubmitting: false,
    };
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.newEmail)) {
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
        this.newEmail = ''; // 清空输入框
        alert('邮箱地址已成功更新！');
      }, 1000);
    },
  },
};
</script>

<style scoped>
.edit-email-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}
</style>