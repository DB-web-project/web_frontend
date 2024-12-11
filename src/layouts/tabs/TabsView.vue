<template>
  <div class="tabs-layout">
    <!-- 左侧导航栏 -->
    <div class="tabs-sidebar">
      <el-menu
          default-active="$route.path"
          @select="handleTabClick"
          class="tabs-menu"
          router
          background-color="#ffffff"
          text-color="#333"
          active-text-color="#409EFF"
          mode="vertical"
          theme="light"
      >
        <el-menu-item index="/Home">
          <i class="el-icon-house"></i>
          <span>商品推荐</span>
        </el-menu-item>
        <el-menu-item index="/Market">
          <i class="el-icon-goods"></i>
          <span>商品集市</span>
        </el-menu-item>
        <el-menu-item index="/workplace">
          <i class="el-icon-s-help"></i>
          <span>帖子广场</span>
        </el-menu-item>
        <el-menu-item index="/MyLog">
          <i class="el-icon-document"></i>
          <span>我的帖子</span>
        </el-menu-item>
        <el-menu-item index="/announcement">
          <i class="el-icon-bell"></i>
          <span>公告</span>
        </el-menu-item>
        <el-menu-item index="/account">
          <i class="el-icon-user"></i>
          <span>个人页面</span>
        </el-menu-item>
        <el-menu-item index="/logout" @click="logout">
          <i class="el-icon-switch-button"></i>
          <span>退出登录</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 主体内容区域 -->
    <div class="tabs-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "TabsView",
  methods: {
    handleTabClick(path) {
      this.$router.push(path); // 切换路由
    },
    logout() {
      // 清理登录信息
      sessionStorage.clear();
      // 跳转到登录页面
      window.location.replace('/login');
    }
  },
};
</script>

<style scoped>
/* 全局布局样式 */
.tabs-layout {
  display: flex;
  height: 100vh;
  background-color: #f7f7f7; /* 更柔和的灰色背景 */
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

/* 左侧导航栏样式 */
.tabs-sidebar {
  width: 240px;
  background-color: #f5f5f5; /* 添加一个轻微的灰色背景 */
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1); /* 轻微阴影，增加层次感 */
  box-sizing: border-box;
}

/* 菜单样式 */
.tabs-menu {
  margin-top: 20px;
}

/* 菜单项样式 */
.tabs-menu .el-menu-item {
  display: flex;
  align-items: center; /* 使图标和文字垂直居中 */
  padding: 12px 18px;
  font-size: 14px;
  color: #666; /* 默认文字颜色 */
  background-color: transparent; /* 透明背景，减少干扰 */
  border-radius: 6px; /* 圆角，简洁感 */
  margin-bottom: 12px;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tabs-menu .el-menu-item i {
  margin-right: 8px; /* 图标和文字之间的间距 */
}

/* 悬浮效果，去掉背景色和字体变蓝 */
.tabs-menu .el-menu-item:hover {
  background-color: transparent !important; /* 悬浮时不显示背景色 */
  color: #666 !important; /* 悬浮时不变字体颜色 */
}

/* 选中项样式，去掉背景色和字体变蓝 */
.tabs-menu .el-menu-item.is-active {
  background-color: transparent !important; /* 选中项不变背景色 */
  color: #666 !important; /* 选中项字体颜色 */
}

/* 主体内容区域样式 */
.tabs-content {
  flex: 1;
  padding: 30px;
  background-color: #ffffff;
  overflow-y: auto;
  box-sizing: border-box;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05); /* 内容区域轻微阴影 */
  border-radius: 8px; /* 内容区四角圆角 */
}
</style>
