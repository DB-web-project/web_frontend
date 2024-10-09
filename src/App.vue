<template>
  <v-app style="letter-spacing: 2px;" >
      <Message />
      <router-view/>
  </v-app>
</template>

<script>
import Message from "@/components/Message.vue"
export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: {
    Message,
  },
};
</script>

<style scoped>
pre {
  font-family: 'SF Mono', 'Consolas', monospace;
}

</style>
