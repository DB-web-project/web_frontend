<template>
  <div class="user-profile">
    <div class="background-animation"></div>
    <header class="header">
      <div class="profile-info">
        <img class="profile-pic" :src="profilePicture" alt="Profile Picture" />
        <!--        <h1 class="username">{{ username }}</h1>-->
        <!--        <p class="user-status">{{ userStatus }}</p>-->
      </div>
      <nav class="nav">
        <ul>
          <li v-for="tab in tabs" :key="tab.name">
            <button
                @click="currentTab = tab.name"
                :class="{ active: currentTab === tab.name }"
                class="nav-button"
            >
              <i :class="tab.icon" aria-hidden="true"></i> {{ tab.label }}
            </button>
          </li>
        </ul>
      </nav>
    </header>
    <main class="main-content">
      <keep-alive>
        <component :is="currentTabComponent" class="tab-component"></component>
      </keep-alive>
    </main>
    <!--    <footer class="footer">-->
    <!--      <p>&copy; 2024 User Center - Inspired by Genshin Impact</p>-->
    <!--    </footer>-->
  </div>
</template>

<script>
import EditProfile from '@/pages/peopleinfo/EditProfile.vue';
import EditPassword from '@/pages/peopleinfo/EditPassword.vue';
import EditUsername from '@/pages/peopleinfo/EditUsername.vue';
import EditEmail from '@/pages/peopleinfo/EditEmail.vue';

export default {
  name: 'UserProfile',
  data() {
    return {
      currentTab: 'profile',
      username: 'Traveler',
      userStatus: 'Adventurer',
      profilePicture: require('@/assets/img/logo.png'),
      tabs: [
        {name: 'profile', label: 'Profile', icon: 'fas fa-user'},
        {name: 'editpassword', label: 'Change Password', icon: 'fas fa-lock'},
        {name: 'editusername', label: 'Change Username', icon: 'fas fa-id-card'},
        {name: 'editemail', label: 'Change Email', icon: 'fas fa-envelope'},
      ],
      components: {
        profile: EditProfile,
        editpassword: EditPassword,
        editusername: EditUsername,
        editemail: EditEmail,
      },
    };
  },
  computed: {
    currentTabComponent() {
      return this.components[this.currentTab];
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f0f0f0;
  color: #333;
}

.user-profile {
  max-width: 900px;
  margin: 40px auto;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: url('https://example.com/genshin-background.jpg') no-repeat center center;
  background-size: cover;
  z-index: -1;
  filter: blur(5px);
  animation: backgroundMovement 20s infinite alternate;
}

@keyframes backgroundMovement {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

.header {
  background: rgba(255, 255, 255, 0.8);
  padding: 30px;
  text-align: center;
  position: relative;
  backdrop-filter: blur(10px);
  border-radius: 20px 20px 0 0;
}

.profile-info {
  margin-bottom: 15px;
}

.profile-pic {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 4px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.profile-pic:hover {
  transform: scale(1.05);
}

.username {
  font-size: 32px;
  font-weight: bold;
  color: #4a4a4a;
  margin: 10px 0;
}

.user-status {
  font-size: 16px;
  color: #888;
  margin-bottom: 20px;
}

.nav {
  margin-top: 15px;
}

.nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
}

.nav-button {
  padding: 12px 20px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(90deg, #ff6f61, #de6161);
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.nav-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.nav-button.active {
  background: #4a90e2;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.nav-button i {
  margin-right: 8px;
}

.main-content {
  padding: 30px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.5s ease-in;
}

.tab-component {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.footer {
  text-align: center;
  padding: 20px 0;
  background: rgba(255, 255, 255, 0.8);
  margin-top: 20px;
  border-radius: 0 0 20px 20px;
}

.footer p {
  color: #555;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 适应性设计 */
@media (max-width: 600px) {
  .user-profile {
    padding: 10px;
  }

  .profile-pic {
    width: 100px;
    height: 100px;
  }

  .username {
    font-size: 24px;
  }

  .user-status {
    font-size: 14px;
  }

  .nav-button {
    font-size: 14px;
    padding: 8px 15px;
  }

  .main-content {
    padding: 15px;
  }
}

/* 额外效果 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.profile-pic {
  animation: pulse 2s infinite;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

.nav-button:hover {
  animation: shake 0.5s;
}
</style>