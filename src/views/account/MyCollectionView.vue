<template>
  <v-container fluid class="pl-16 pr-16">
    <v-row align="stretch" no-gutters justify="start" >
      <v-col
        v-for="(post, index) in posts"
        :key="index"
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <post-pre-view
          :postName="post.title"
          :postUserName="post.authorName"
          :postDescription="post.annotation"
          :postImg="
            post.postImg ?? 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
          "
          :post-user-id="String(post.userId)"
          :postId="String(post.postId)"
          :favorite="post.favorite == 1"
          v-on:linkToPost="changeLink"
          :tags="post.tags"
          :heat="post.heat"
          class="ma-2"
        >
        </post-pre-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import postPreView from "@/views/ground/Post/PostPreView";
import {followReq} from "@/api/post";

let posts = [];
// for (let i = 0; i < 2; i += 1) {
//   posts.push({
//     title: "010",
//     userId: "114514",
//     authorName: "七海Nana7mi",
//     annotation:
//       "鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼鱼鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅鱼翅",
//     postImg: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
//     postId: "1",
//     favorite: 1,
//   });
// }

export default {
  name: "MyCollectionView",
  components: {
    postPreView
  },
  data() {
    return {
      posts: posts,

    }
  },
  methods: {
    changeLink(postId) {
      this.$router.push({name: "buyPost", params: {postId}});
    },
    loadCollectionPosts() {
      let vm = this;
      followReq('get',{

      }).then(res => {
        vm.posts = res.data.data.followPosts;
        for (let i = 0; i < vm.posts.length; i++) {
          console.log(vm.posts[i])
        }
      }).catch(err => {

      })
    },
  },
  mounted() {
    this.loadCollectionPosts();
  }
}
</script>

<style scoped>

</style>
