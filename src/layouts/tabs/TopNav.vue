<template>
  <div class="top-nav">
    <!-- Logo (optional) -->
    <div class="logo">
      <img src="@/assets/img/logo.png" alt="Logo" />
    </div>

    <!-- User Info & Actions -->
    <div class="user-info">
      <el-dropdown @command="handleCommand">
        <span class="user-name">Hello, User</span>
        <i class="el-icon-caret-bottom"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">个人资料</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$router.push('/login');
      } else if (command === 'profile') {
        this.$router.push('/account');
      }
    }
  }
};
</script>

<style scoped>
.top-nav {
  height: 60px;
  background-color: #ffffff;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo img {
  width: 50px;
  height: 50px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  margin-right: 10px;
  color: #333;
}
</style>
