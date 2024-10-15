<template>
  <div class="personal-info-container">
    <profile-header></profile-header>
    <profile-menu></profile-menu>
    <profile-content @openModal="openModal"></profile-content>
    <profile-footer></profile-footer>
    <modal v-if="isModalVisible" @close="closeModal"></modal>
  </div>
</template>

<script>
import ProfileHeader from './PeopleInfo/ProfileHeader.vue';
import ProfileMenu from './PeopleInfo/ProfileMenu.vue';
import ProfileContent from './PeopleInfo/ProfileContent.vue';
import ProfileFooter from './PeopleInfo/ProfileFooter.vue';
import Modal from './PeopleInfo/Modal.vue';

export default {
  name: 'PersonalInfo',
  components: {
    ProfileHeader,
    ProfileMenu,
    ProfileContent,
    ProfileFooter,
    Modal
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
}
</script>

<style scoped>
.personal-info-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>