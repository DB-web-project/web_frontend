<template>
  <v-card
    class="mx-auto"
  >

    <v-card-title>
      被投诉帖子: {{postTitle}}
    </v-card-title>

    <v-card-subtitle style="padding-bottom: 0;">
      投诉人: {{ sourceId }}
    </v-card-subtitle>

    <v-card-subtitle style="padding-top: 0; padding-bottom: 0">
      被投诉人: {{ target }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="red lighten-1"
        text
        @click="goToPost"
      >
        前往帖子
      </v-btn>
      <v-btn
        color="teal darken-1"
        text
        @click="deleteReport"
      >
        解决投诉
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-title>
          投诉内容
        </v-card-title>
        <v-card-text>
          <maven-content
          :content="context">

          </maven-content>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import MavenContent from "@/components/mavenContent";
import {reportReq} from "@/api/report";
import {actionFailed, actionPostFailed, actionSuccess} from "@/components/ActionState";
export default {
  name: "reportCard",
  components: {MavenContent},
  props: {
    complaintId: {
      type: String,
      default: "明前奶绿",
      require: false
    },
    sourceId: {
      type: String,
      default: "1",
      require: false,
    },
    target: {
      type: String,
      default: "1",
      require: false,
    },
    postTitle: {
      type: String,
      default: "关注塔菲谢谢喵关注塔菲谢谢喵",
      require: false
    },
    postId: {
      type: String,
      default: "1",
      require: false,
    },
    postType: {
      type: String,
      default: "buy",
      require: false,
    },
    context: {
      type: String,
      default: "杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼杰尼",
      require: false
    }
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    goToPost() {
      if (this.postType === "sell") {
        this.$router.push({name: "sellPost", params: {postId: this.postId}})
      } else {
        this.$router.push({name: "buyPost", params: {postId: this.postId}})
      }
    },
    deleteReport() {
      let vm = this;
      reportReq('delete', {
        complaintId: this.complaintId
      }).then(res => {
        if (res.data.success) {
          this.$router.go(0);
          actionSuccess(res);
        } else {
          actionPostFailed(res);
        }
      }).catch(err => {
        actionFailed();
      })
    }
  }
}
</script>

<style scoped>

</style>
