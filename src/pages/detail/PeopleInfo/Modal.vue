<template>
  <transition name="modal">
    <div v-if="visible" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h2>修改密码</h2>
          <form @submit.prevent="submit">
            <div class="form-group">
              <label for="oldPassword">旧密码</label>
              <input type="password" id="oldPassword" v-model="oldPassword" required />
            </div>
            <div class="form-group">
              <label for="newPassword">新密码</label>
              <input type="password" id="newPassword" v-model="newPassword" required />
            </div>
            <div class="form-group">
              <label for="confirmPassword">确认新密码</label>
              <input type="password" id="confirmPassword" v-model="confirmPassword" required />
            </div>
            <button type="submit">提交</button>
          </form>
          <button @click="$emit('close')">关闭</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: ['visible'],
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  },
  methods: {
    submit() {
      if (this.newPassword !== this.confirmPassword) {
        alert('新密码和确认密码不匹配');
        return;
      }
      // 这里可以添加提交密码的逻辑
      console.log('旧密码:', this.oldPassword);
      console.log('新密码:', this.newPassword);
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  cursor: pointer;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>