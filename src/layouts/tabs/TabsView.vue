<template>
  <div class="tabs-layout">
    <!-- 左侧导航栏 -->
    <div class="tabs-sidebar">
      <el-menu
          default-active="$route.path"
          @select="handleTabClick"
          class="tabs-menu"
          router
      >
        <el-menu-item index="/Home">
          <i class="el-icon-house"></i>
          <span>商品市场</span>
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
          <i class="el-icon-notification"></i>
          <span>公告</span>
        </el-menu-item>
        <el-menu-item index="/account">
          <i class="el-icon-user"></i>
          <span>个人页面</span>
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
  },
};
</script>

<style scoped>
/* 全局布局样式 */
.tabs-layout {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 左侧导航栏样式 */
.tabs-sidebar {
  width: 240px;
  background-color: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.tabs-menu {
  width: 100%;
  height: 100%;
  border-right: 1px solid #ebebeb;
}

.tabs-menu .el-menu-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 14px;
  color: #333;
  transition: all 0.3s ease;
}

.tabs-menu .el-menu-item i {
  margin-right: 10px;
}

.tabs-menu .el-menu-item:hover {
  background-color: #e6f7ff;
  color: #1890ff;
}

.tabs-menu .el-menu-item.is-active {
  background-color: #1890ff;
  color: #fff;
  border-radius: 4px;
}

/* 主体内容区域样式 */
.tabs-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-sizing: border-box;
}
</style>
