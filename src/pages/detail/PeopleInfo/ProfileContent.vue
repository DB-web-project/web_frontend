<template>
  <div>
    <v-container
        fluid
    >
      <v-row
          align="stretch"
          justify="start"
      >
        <v-col :cols="12" md="2" sm="12">
          <account-side-bar v-on:childChangeLink="changeLink"></account-side-bar>
        </v-col>
        <v-col :cols="12" md="10" sm="12">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {
  },
  name:"ProfileContent",
  methods: {
    changeLink(name) {
      this.$router.push({ name: name });
    }
  },
}
</script>

<style>

</style>
