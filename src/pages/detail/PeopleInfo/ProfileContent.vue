<template>
  <div class="profile-content">
    <div class="user-info">
      <h2>dongfeng</h2>
      <p>用户名：dongfeng</p>
      <p>学号：23373177</p>
      <p>电子邮箱：22373177@buaa.edu.cn</p>
    </div>
    <div class="edit-info">
      <edit-email></edit-email>
      <edit-password @openModal="$emit('openModal')"></edit-password>
      <edit-username></edit-username>
    </div>
  </div>
</template>

<script>
import EditEmail from './EditEmail.vue';
import EditPassword from './EditPassword.vue';
import EditUsername from './EditUsername.vue';

export default {
  name: 'ProfileContent',
  components: {
    EditEmail,
    EditPassword,
    EditUsername
  }
}
</script>

<style scoped>
.profile-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.user-info {
  margin-bottom: 40px;
}
.edit-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
</style>