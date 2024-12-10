<template>
  <div class="tabs-layout">
    <!-- 左侧导航栏 -->
    <div class="tabs-sidebar">
      <el-menu
          default-active="$route.path"
          @select="handleTabClick"
          class="tabs-menu"
          router
          background-color="#fff"
          text-color="#333"
          active-text-color="#fff"
          mode="vertical"
          theme="dark"
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
          <i class="el-icon-bell"></i>
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
  background: linear-gradient(135deg, #f0f4f7, #e0e7ff);
}

/* 左侧导航栏样式 */
.tabs-sidebar {
  width: 280px;
  background-color: #222;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  position: relative;
  z-index: 5;
  transition: width 0.3s ease-in-out;
}

.tabs-sidebar:hover {
  width: 300px;
}

.tabs-menu {
  width: 100%;
  height: 100%;
  border-right: 1px solid #ebebeb;
}

.tabs-menu .el-menu-item {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  color: #dcdcdc;
  position: relative;
  border-radius: 10px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.tabs-menu .el-menu-item i {
  margin-right: 15px;
  font-size: 20px;
  transition: transform 0.2s ease-in-out;
}

.tabs-menu .el-menu-item span {
  transition: transform 0.2s ease-in-out;
}

.tabs-menu .el-menu-item:hover {
  background-color: #3e8e41;
  color: #fff;
}

.tabs-menu .el-menu-item:hover i {
  transform: scale(1.1);
}

.tabs-menu .el-menu-item:hover span {
  transform: translateX(5px);
}

.tabs-menu .el-menu-item.is-active {
  background-color: #1890ff;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* 主体内容区域样式 */
.tabs-content {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  background-color: #f9f9f9;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

/* 精致的渐变效果 */
.tabs-sidebar:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #FF6F61, #6B3FA0);
  z-index: -1;
  opacity: 0.15;
  border-radius: 15px;
}

/* 菜单项动画效果 */
@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.8);
  }
  50% {
    box-shadow: 0 0 15px rgba(0, 123, 255, 1);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.8);
  }
}

.tabs-menu .el-menu-item.is-active {
  animation: glow 1.5s infinite ease-in-out;
}

/* 确保所有文字有流畅的过渡效果 */
.tabs-menu .el-menu-item span,
.tabs-menu .el-menu-item i {
  transition: color 0.2s ease-in-out, transform 0.3s ease-in-out;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .tabs-layout {
    flex-direction: column;
  }

  .tabs-sidebar {
    width: 100%;
    height: auto;
    box-shadow: none;
    padding: 10px;
  }

  .tabs-menu .el-menu-item {
    font-size: 14px;
    padding: 10px 18px;
  }
}
</style>
