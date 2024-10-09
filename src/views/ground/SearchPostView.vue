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
          :postUserName="post.username"
          :postDescription="post.annotation"
          :postImg="
            post.img ?? 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
          "
          :postId="String(post.postId)"
          :favorite="post.favorite == 1"
          v-on:linkToPost="changeLink"
          :tags="post.tags"
          :heat="post.heat"
          :post-user-id="post.postUserId"
          class="ma-2"
        >
        </post-pre-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import postPreView from "@/views/ground/Post/PostPreView";
import {postSearchReq} from "@/api/post";
import {actionFailed, actionPostFailed} from "@/components/ActionState";

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
      searchText: this.$route.query.searchText
    }
  },
  methods: {
    changeLink(postId) {
      if (this.$route.meta.type === "buy") {
        this.$router.push({name: "buyPost", params: {postId}});
      } else {
        this.$router.push({name: "sellPost", params: {postId}});
      }
    },
    loadSearchPost() {
      let vm = this;
      console.log(this.searchText)
      postSearchReq('post', {
        title: this.searchText,
        type: this.$route.meta.type === "buy" ? 1 : 2
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          vm.posts = res.data.data.post;
        } else {
          actionPostFailed(res);
        }
      }).catch(err => {
        actionFailed();
      })
    }
  },
  mounted() {
    this.loadSearchPost();
  }
}
</script>

<style scoped>

</style>
