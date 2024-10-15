<template>
  <aside class="profile-menu">
    <ul>
      <li>用户名</li>
      <li>学号</li>
      <li>电子邮箱</li>
      <li>修改邮箱</li>
      <li>修改密码</li>
      <li>修改用户名</li>
      <li>修改头像</li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'ProfileMenu'
}
</script>

<style scoped>
.profile-menu {
  background-color: #e7e7e7;
  padding: 20px;
  min-width: 200px;
}
.profile-menu ul {
  list-style: none;
  padding: 0;
}
.profile-menu li {
  padding: 10px;
  cursor: pointer;
}
.profile-menu li:hover {
  background-color: #d4d4d4;
}
</style>