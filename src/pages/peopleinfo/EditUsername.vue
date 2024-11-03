<template>
  <div class="edit-username">
    <h2>修改用户名</h2>
    <form @submit.prevent="updateUsername">
      <div class="form-group">
        <label for="newUsername">新用户名</label>
        <input type="text" id="newUsername" v-model="newUsername" required />
      </div>
      <button type="submit" class="btn">更新用户名</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditUsername',
  data() {
    return {
      newUsername: '',
    };
  },
  methods: {
    updateUsername() {
      this.$api.updateUsername(this.newUsername).then(() => {
        this.$alert('用户名更新成功。', '成功');
      }).catch(error => {
        this.$alert('用户名更新失败：' + error.message, '错误');
      });
    },
  },
};
</script>

<style scoped>
.edit-username {
  max-width: 500px; /* 增大框的宽度 */
  margin: 40px auto; /* 增大上下间距 */
  padding: 30px; /* 增大内边距 */
  background-color: #ffffff; /* 背景色 */
  border-radius: 12px; /* 圆角 */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); /* 阴影效果 */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* 字体 */
}

h2 {
  margin-bottom: 20px; /* 标题下方间距 */
  font-size: 28px; /* 标题字体大小 */
  color: #333; /* 字体颜色 */
  text-align: center; /* 标题居中 */
}

.form-group {
  margin-bottom: 20px; /* 表单组下方间距 */
}

.form-group label {
  display: block; /* 标签块状显示 */
  margin-bottom: 8px; /* 标签下方间距 */
  font-weight: 600; /* 加粗 */
  color: #555; /* 标签颜色 */
}

.form-group input {
  width: 100%; /* 输入框宽度 */
  padding: 12px; /* 输入框内边距 */
  border: 1px solid #ccc; /* 边框 */
  border-radius: 8px; /* 圆角 */
  font-size: 16px; /* 字体大小 */
  transition: border-color 0.3s; /* 边框颜色过渡效果 */
}

.form-group input:focus {
  border-color: #007bff; /* 聚焦时边框颜色 */
  outline: none; /* 去除默认外边框 */
}

.btn {
  padding: 12px 24px; /* 按钮内边距 */
  border: none; /* 去除边框 */
  border-radius: 8px; /* 圆角 */
  background-color: #007bff; /* 按钮背景色 */
  color: white; /* 按钮字体颜色 */
  font-weight: bold; /* 加粗 */
  cursor: pointer; /* 鼠标指针 */
  font-size: 16px; /* 字体大小 */
  transition: background-color 0.3s, transform 0.2s; /* 背景颜色和变换效果 */
}

.btn:hover {
  background-color: #0056b3; /* 悬停时背景色 */
  transform: translateY(-2px); /* 悬停时上移效果 */
}
</style>
