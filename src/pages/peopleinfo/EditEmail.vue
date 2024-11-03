<template>
  <div class="edit-email">
    <h2>修改邮箱</h2>
    <form @submit.prevent="updateEmail">
      <div class="form-group">
        <label for="newEmail">新邮箱地址</label>
        <input type="email" id="newEmail" v-model="newEmail" required />
        <span v-if="emailError" class="error">{{ emailError }}</span>
      </div>
      <div class="form-group">
        <label for="confirmEmail">确认邮箱地址</label>
        <input type="email" id="confirmEmail" v-model="confirmEmail" required />
        <span v-if="confirmEmailError" class="error">{{ confirmEmailError }}</span>
      </div>
      <button type="submit" class="btn btn-primary">更新邮箱</button>
      <div v-if="loading" class="loader">更新中...</div>
    </form>
    <div class="footer">
      <p>请确保您输入的邮箱地址有效，以便接收确认邮件。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditEmail',
  data() {
    return {
      newEmail: '',
      confirmEmail: '',
      emailError: '',
      confirmEmailError: '',
      loading: false,
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    clearErrors() {
      this.emailError = '';
      this.confirmEmailError = '';
    },
    async updateEmail() {
      this.clearErrors();
      if (!this.validateEmail(this.newEmail)) {
        this.emailError = '请输入有效的邮箱地址。';
        return;
      }
      if (this.newEmail !== this.confirmEmail) {
        this.confirmEmailError = '确认邮箱地址与新邮箱地址不匹配。';
        return;
      }
      this.loading = true;
      try {
        await this.$api.updateEmail(this.newEmail);
        this.$alert('邮箱更新成功。', '成功');
        this.clearFields();
      } catch (error) {
        this.$alert('邮箱更新失败：' + error.message, '错误');
      } finally {
        this.loading = false;
      }
    },
    clearFields() {
      this.newEmail = '';
      this.confirmEmail = '';
    },
  },
};
</script>

<style scoped>
.edit-email {
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

.loader {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #007bff;
}

.footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #777;
}
</style>
