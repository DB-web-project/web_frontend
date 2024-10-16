<template>
  <div class="basic-detail-container">
    <div class="sidebar">
      <h2 class="sidebar-title">个人信息设置</h2>
      <div class="button-panel">
        <button @click="toggleEditPersonalInfo" :aria-pressed="showEditPersonalInfo" class="sidebar-button">
          <span class="button-icon">👤</span> 个人信息
        </button>
        <button @click="toggleEditEmail" :aria-pressed="showEditEmail" class="sidebar-button">
          <span class="button-icon">📧</span> 修改邮箱
        </button>
        <button @click="toggleEditPassword" :aria-pressed="showEditPassword" class="sidebar-button">
          <span class="button-icon">🔒</span> 修改密码
        </button>
        <button @click="toggleEditUsername" :aria-pressed="showEditUsername" class="sidebar-button">
          <span class="button-icon">🎫</span> 修改用户名
        </button>
      </div>
    </div>
    <div class="content-panel">
      <transition name="fade">
        <edit-email v-if="showEditEmail" @close="toggleEditEmail" />
      </transition>
      <transition name="fade">
        <edit-password v-if="showEditPassword" @close="toggleEditPassword" />
      </transition>
      <transition name="fade">
        <edit-username v-if="showEditUsername" @close="toggleEditUsername" />
      </transition>
      <transition name="fade">
        <edit-personal-info v-if="showEditPersonalInfo" @close="toggleEditPersonalInfo" />
      </transition>
    </div>
  </div>
</template>

<script>
import EditEmail from './PeopleInfo/EditEmail.vue';
import EditPassword from './PeopleInfo/EditPassword.vue';
import EditUsername from './PeopleInfo/EditUsername.vue'; // 新增
import EditPersonalInfo from './PeopleInfo/AccountInfo.vue'; // 新增

export default {
  name: 'BasicDetail',
  components: {
    EditEmail,
    EditPassword,
    EditUsername, // 新增
    EditPersonalInfo // 新增
  },
  data() {
    return {
      showEditEmail: false,
      showEditPassword: false,
      showEditUsername: false, // 新增
      showEditPersonalInfo: true // 新增
    };
  },
  methods: {
    toggleEditEmail() {
      this.showEditEmail = true;
      this.showEditPassword = false;
      this.showEditUsername = false; // 新增，确保其他组件隐藏
      this.showEditPersonalInfo = false; // 新增，确保其他组件隐藏
    },
    toggleEditPassword() {
      this.showEditPassword = true;
      this.showEditEmail = false;
      this.showEditUsername = false; // 新增，确保其他组件隐藏
      this.showEditPersonalInfo = false; // 新增，确保其他组件隐藏
    },
    toggleEditUsername() {
      this.showEditUsername = true; // 新增
      this.showEditEmail = false;
      this.showEditPassword = false;
      this.showEditPersonalInfo = false; // 新增，确保其他组件隐藏
    },
    toggleEditPersonalInfo() {
      this.showEditPersonalInfo = true; // 新增
      this.showEditEmail = false;
      this.showEditPassword = false;
      this.showEditUsername = false; // 新增，确保其他组件隐藏
    }
  }
};
</script>

<!-- 样式部分保持不变 -->
<style scoped>
/* ...（样式部分与之前相同，保持不变）... */
</style>

<style scoped>
.basic-detail-container {
  display: flex;
  height: 100vh;
  background-color: #f0f4f8; /* Light background for the whole container */
  font-family: 'Arial', sans-serif;
}

.sidebar {
  width: 250px; /* Fixed width for sidebar */
  background-color: #ffffff; /* Sidebar background */
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  border-right: 1px solid #e0e0e0; /* Light border for separation */
}

.sidebar-title {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px; /* Space below the title */
}

.button-panel {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
}

.sidebar-button {
  margin-bottom: 15px; /* Space between buttons */
  padding: 12px 15px;
  background-color: #007bff; /* Button color */
  color: white; /* Text color */
  border: none;
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 1em;
  transition: background-color 0.3s, transform 0.2s; /* Animation effects */
}

.sidebar-button:hover {
  background-color: #0056b3; /* Darker shade on hover */
  transform: translateY(-2px); /* Slight lift effect */
}

.sidebar-button:focus {
  outline: none; /* Remove outline on focus */
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); /* Custom focus outline */
}

.content-panel {
  flex-grow: 1; /* Take remaining width */
  padding: 20px; /* Padding inside content area */
  background-color: #ffffff; /* Content background */
  overflow-y: auto; /* Scroll if content overflows */
  transition: background-color 0.3s; /* Smooth background transition */
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1); /* Inner shadow for depth */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

/* Add responsive design */
@media (max-width: 768px) {
  .basic-detail-container {
    flex-direction: column; /* Stack sidebar on top of content on small screens */
  }

  .sidebar {
    width: 100%; /* Full width on small screens下面是继续为 `BasicDetail` 组件添加的代码，以实现更美观和用户友好的界面。我们将继续完善样式并添加一些响应式设计，以确保在不同设备上的良好体验。以下是继续的部分：

```vue
    height: auto; /* Auto height for sidebar on small screens */
    box-shadow: none; /* Remove shadow on small screens */
    border-right: none; /* Remove border on small screens */
  }

  .content-panel {
    padding: 15px; /* Reduced padding on small screens */
  }

  .sidebar-button {
    font-size: 0.9em; /* Slightly smaller button text */
  }
}

/* Additional styles for edit email and password components */
.edit-email, .edit-password {
  border: 1px solid #e0e0e0; /* Border for edit forms */
  border-radius: 5px; /* Rounded corners */
  padding: 20px;
  background-color: #ffffff; /* White background for forms */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Shadow for forms */
  transition: transform 0.3s, box-shadow 0.3s; /* Smooth transitions */
}

.edit-email:hover, .edit-password:hover {
  transform: translateY(-2px); /* Lift effect on hover */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); /* Darker shadow on hover */
}

.edit-email-header, .edit-password-header {
  font-size: 1.5em; /* Header size for forms */
  margin-bottom: 15px;
  color: #333; /* Color for headers */
}

.input-field {
  width: 100%; /* Full width for input fields */
  padding: 10px;
  margin-bottom: 15px; /* Space between inputs */
  border: 1px solid #ccc; /* Light border */
  border-radius: 5px; /* Rounded corners */
  transition: border-color 0.3s; /* Smooth border transition */
}

.input-field:focus {
  outline: none; /* Remove default outline */
  border-color: #007bff; /* Change border color on focus */
}

.submit-button {
  padding: 10px 15px;
  background-color: #28a745; /* Success color */
  color: white; /* Text color */
  border: none;
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  font-size: 1em; /* Font size */
  transition: background-color 0.3s, transform 0.2s; /* Animation effects */
}

.submit-button:hover {
  background-color: #218838; /* Darker shade on hover */
  transform: translateY(-2px); /* Lift effect */
}

.cancel-button {
  padding: 10px 15px;
  background-color: #dc3545; /* Danger color */
  color: white; /* Text color */
  border: none;
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  font-size: 1em; /* Font size */
  transition: background-color 0.3s, transform 0.2s; /* Animation effects */
}

.cancel-button:hover {
  background-color: #c82333; /* Darker shade on hover */
  transform: translateY(-2px); /* Lift effect */
}
</style>
