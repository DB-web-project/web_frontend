<template>
  <div :class="['sidebar', { 'collapsed': collapsed }]" :style="sidebarStyles">
    <!-- Logo Section -->
    <div class="sidebar-header">
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="Logo" />
      </div>
      <button @click="toggle" class="toggle-btn">
        <i class="icon" :class="collapsed ? 'icon-expand' : 'icon-collapse'"></i>
      </button>
    </div>

    <!-- Menu Section -->
    <div class="menu-container">
      <el-menu :default-active="activeMenu" class="menu-list" mode="vertical" :background-color="menuBackground">
        <el-menu-item index="1" @click="setActiveMenu('1')">
          <router-link to="/workplace">主页</router-link>
        </el-menu-item>
        <el-menu-item index="2" @click="setActiveMenu('2')">
          <router-link to="/announcement">公告</router-link>
        </el-menu-item>
        <el-menu-item index="3" @click="setActiveMenu('3')">
          <router-link to="/account">个人信息</router-link>
        </el-menu-item>
        <el-menu-item index="4" @click="setActiveMenu('4')">
          <router-link to="/myposts">我的发帖</router-link>
        </el-menu-item>
        <el-menu-item index="5" @click="setActiveMenu('5')">
          <router-link to="/postgood">添加商品</router-link>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- Footer Section -->
    <div class="sidebar-footer">
      <span>© 航评万象</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeMenu: '1', // 默认选中的菜单项
      sidebarWidth: '250px', // 初始宽度
    };
  },
  computed: {
    sidebarStyles() {
      return {
        width: this.collapsed ? '80px' : this.sidebarWidth,
        boxShadow: this.collapsed ? 'none' : '2px 0 10px rgba(0, 0, 0, 0.15)', // 添加柔和阴影
        transition: 'all 0.3s ease',
      };
    },
    menuBackground() {
      return this.collapsed ? '#1b2636' : '#2b3a47'; // 收缩和展开状态的不同背景色
    }
  },
  methods: {
    // 切换侧边栏收缩状态
    toggle() {
      this.$emit('toggle');
    },
    // 设置当前激活的菜单项
    setActiveMenu(menuIndex) {
      this.activeMenu = menuIndex;
    }
  }
};
</script>

<style scoped>
/* Global Styles for Sidebar */
.sidebar {
  background-color: #2b3a47;
  color: white;
  transition: all 0.3s ease;
  overflow: hidden;
  font-family: 'Roboto', Arial, sans-serif;
  border-radius: 15px 0 0 15px; /* 更圆润的圆角 */
  height: 100vh; /* 满屏高度 */
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1); /* 增加阴影效果 */
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #1e2a3a;
  border-radius: 15px 0 0 0;
  position: relative;
}

.logo img {
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease;
  object-fit: cover; /* 保证图片不变形 */
}

.logo img:hover {
  transform: scale(1.1); /* 放大效果 */
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;
  z-index: 10;
}

.toggle-btn:hover {
  color: #ff9900; /* 变色 */
}

.toggle-btn:focus {
  outline: none; /* 去掉焦点框 */
}

/* Menu Container Styling */
.menu-container {
  padding: 20px; /* 增加容器的内边距，避免菜单项贴近容器边缘 */
  overflow-y: auto; /* 允许垂直滚动 */
  height: 100%; /* 确保容器撑满整个高度 */
}

/* Menu List Styling */
.menu-list {
  background-color: transparent;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column; /* 垂直排列菜单项 */
  gap: 10px; /* 每个菜单项之间的间隔 */
}

/* Menu Item Styling */
.el-menu-item {
  color: #f0f0f0;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
  text-align: left; /* 让文字对齐 */
  width: 100%; /* 保证每个菜单项宽度充满父容器 */
}

/* Hover Effect for Menu Items */
.el-menu-item:hover {
  background-color: #3d4d63;
  transform: scale(1.05);
}

/* Active Menu Item Styling */
.el-menu-item.is-active {
  background-color: #ff9900;
  color: #2f3b52;
}

.el-menu-item.is-active a {
  color: #2f3b52;
}

/* Router Link Styling */
.el-menu-item a {
  color: inherit;
  text-decoration: none;
  display: block; /* 让链接占满整个菜单项 */
  padding: 10px 0;
  font-weight: 600;
}

/* Responsive Adjustments */
@media screen and (max-width: 768px) {
  .menu-container {
    padding: 10px;
  }

  .el-menu-item {
    font-size: 14px;
    padding: 10px 15px; /* 增加更适合移动端的内边距 */
  }

  .el-menu-item:hover {
    background-color: #475563;
  }
}

/* Sidebar Footer */
.sidebar-footer {
  text-align: center;
  padding: 10px;
  background-color: #1e2a3a;
  border-radius: 0 0 15px 0;
  font-size: 14px;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.sidebar-footer span {
  color: #ffffff;
  font-size: 14px;
  font-weight: 300;
}

/* Collapsed State Styles */
.sidebar.collapsed .logo img {
  width: 30px;
  height: 30px;
}

.sidebar.collapsed .menu-list .el-menu-item {
  text-align: center;
  font-size: 14px;
}

.sidebar.collapsed .menu-list .el-menu-item a {
  font-size: 12px;
}

.sidebar.collapsed .toggle-btn {
  font-size: 20px;
}

/* Hover Animations */
.menu-list .el-menu-item::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 5px;
  height: 80%;
  background-color: #ff9900;
  opacity: 0;
  transition: opacity 0.3s ease;
  transform: translateY(-50%);
}

.menu-list .el-menu-item:hover::before {
  opacity: 1;
}

.menu-list .el-menu-item.is-active::before {
  opacity: 1;
}

.menu-list .el-menu-item.is-active {
  background-color: #ff9900;
  color: #2f3b52;
}

/* Active Link Styles */
.menu-list .el-menu-item.is-active a {
  color: #2f3b52;
}

/* Nested Menu Styles */
.submenu .el-menu-item {
  padding-left: 30px;
}

.submenu .el-menu-item:hover {
  background-color: #475563;
}

/* Darker Hover on Menu Item */
.menu-list .el-menu-item:hover {
  background-color: #3d4d63;
  transform: scale(1.05);
}

/* Responsive Styles for Mobile */
@media screen and (max-width: 768px) {
  .sidebar {
    width: 60px;
  }

  .sidebar-header {
    padding: 15px;
  }

  .sidebar-header .logo img {
    width: 30px;
    height: 30px;
  }

  .menu-container {
    padding: 10px;
  }

  .menu-list .el-menu-item {
    font-size: 14px;
  }

  .menu-list .el-menu-item a {
    padding: 8px 12px;
  }

  .toggle-btn {
    font-size: 18px;
  }

  .sidebar-footer {
    padding: 5px;
  }
}

/* Larger Screen Adjustments */
@media screen and (min-width: 1200px) {
  .sidebar {
    width: 300px;
  }

  .menu-list .el-menu-item {
    font-size: 18px;
  }

  .menu-list .el-menu-item a {
    padding: 12px 20px;
  }
}

/* Sidebar Overlay (for collapsed state) */
.sidebar.collapsed::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
}

.sidebar.collapsed.opened::before {
  display: block;
}

/* Dropdown Menu Styles */
.el-menu-item .el-dropdown {
  position: relative;
}

.el-dropdown-link::after {
  content: '▼';
  font-size: 12px;
  margin-left: 10px;
  transition: transform 0.3s ease;
}

.el-dropdown-link:hover::after {
  transform: rotate(180deg); /* 下拉箭头动画 */
}

/* Tooltip Styles for Sidebar */
.el-tooltip__popper {
  background-color: #2b3a47;
  color: #ffffff;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
}

.el-tooltip__popper:after {
  border-color: #2b3a47 transparent transparent transparent;
}

/* Sidebar Hover Effects */
.sidebar:hover .sidebar-header {
  background-color: #2b3a47;
  transition: background-color 0.3s ease;
}

.sidebar:hover .menu-list .el-menu-item {
  background-color: #475563;
}

/* Dark Mode Styles */
body.dark-mode .sidebar {
  background-color: #1e2a3a;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
}

body.dark-mode .menu-list .el-menu-item {
  color: #c1c1c1;
}

body.dark-mode .menu-list .el-menu-item:hover {
  background-color: #3d4d63;
}

body.dark-mode .menu-list .el-menu-item.is-active {
  background-color: #ff9900;
  color: #2f3b52;
}

/* Media Queries for Tablet */
@media (max-width: 1024px) {
  .sidebar {
    width: 250px;
  }

  .menu-list .el-menu-item {
    font-size: 14px;
  }

  .sidebar-footer {
    font-size: 12px;
  }
}

/* Advanced Hover Animation */
.menu-list .el-menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background-color: #ff9900;
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.menu-list .el-menu-item:hover::before {
  transform: scaleY(1);
}

/* Sidebar with Multiple States */
.sidebar.multi-state .sidebar-header {
  background-color: #2b3a47;
}

</style>
