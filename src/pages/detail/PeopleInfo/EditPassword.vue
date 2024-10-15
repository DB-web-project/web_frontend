<template>
  <div class="edit-password">
    <h3>修改密码</h3>
    <button @click="$emit('openModal')">修改密码</button>
  </div>
</template>

<script>
export default {
  name: 'EditPassword'
}
</script>

<style scoped>
.edit-password {
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
}
</style>