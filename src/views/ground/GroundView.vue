<template>
    <router-view :type="$route.meta.type" v-on:changeGround="changeLink"></router-view>
</template>

<script>
export default {
  name:"GroundView",
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    changeLink(postId) {
      this.$router.push({path: `/ground/${this.type}/${postId}`});
    },
  },
  computed: {
    type () {
      return this.$route.meta.type
    }
  }
}
</script>

<style>

</style>
