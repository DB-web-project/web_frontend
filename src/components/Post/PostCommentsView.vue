<template>
    <v-card
      style="margin-bottom: 150px;"
    color="#F5F5F5">
      <v-card-title>
        评论区
      </v-card-title>
      <v-divider></v-divider>
      <v-container fluid v-if="comments?.length === 0">
        <v-row justify="center" align="center" style="min-height: 300px;">
          <v-card-title class="no-comment">
            当前暂无评论哦，欢迎你发送第一条~~~
          </v-card-title>
        </v-row>
      </v-container>
      <v-row v-else>
          <v-col v-for="(comment, index) in comments" :key="index" :cols="12" :sm="12">
            <post-comments
            :comment-user-name="comment.authorName"
            :comment-user-role="String(comment.authorRole)"
            :comment-time="comment.commentTime"
            :content="comment.content"
            :second-comments="comment.children"
            :comment-id="String(comment.id)"
            :author-id="comment.authorId"
            :likes="Number(comment.likes)"
            :unlikes="Number(comment.unlikes)"
            :avatar="comment.avatar"
            :reloadComments="reloadComments">
            </post-comments>
          </v-col>
      </v-row>
    </v-card>
</template>

<script>
import PostComments from "@/components/Post/PostComments";

export default {
  name: "PostCommentsView",
  props: {
    comments: {
      type: Array,
      require: true
    }
  },
  components: {
    PostComments,
  },
  methods: {
    reloadComments() {
      this.$emit("reloadComments")
    }
  },
  mounted() {
    console.log(this.comments === null);
  }
}
</script>

<style scoped>
.no-comment {
  font-size: xx-large;
  color: gray;
  opacity: 0.5;
}

</style>
