<template>
  <v-card
    :loading="loading"
    id="post-card"
    style="background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      :src="postImg"
      class="post-img"
      max-height="300"
      contain
    ></v-img>

    <v-row>
      <v-col cols="12" sm="6" md="6" lg="6">
        <v-card-title class="post-name" style="padding-bottom: 0; padding-top: 5px; ">
          {{ postName }}
        </v-card-title>

        <v-card-text class="pb-0" style="">
          <div class="text-subtitle-1 post-user-name pb-0"
               @click="goToOtherInfo">
            {{ postUserName }}
          </div>
        </v-card-text>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" align-self="center" class="d-flex justify-center">
        <v-btn
          depressed
          style="background-image: linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%);"
          @click="link(postId)"
          dark
          rounded
          x-large
          class="btn-enter-post"
        >
          进入帖子
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-icon
        :color="calColor"
        v-if="heat >= 10"
      >
        mdi-fire
      </v-icon>
      <v-icon
        :color="calColor"
        v-else
      >
        mdi-snowflake
      </v-icon>
      <v-chip
        v-for="tag in tags"
        :key="tag.tagName"
        color="#0099CC"
        outlined
      >
        {{ tag.tagName }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!favorite"
        :color="'grey '"
        text
        icon
        @click="addCollection"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn
        v-if="favorite"
        :color="'red accent-3'"
        text
        icon
        @click="removeCollection"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card-actions>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">收藏备注</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="annotation"
                  label="对收藏进行备注"

                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="cancelCollectionAction"
          >
            关闭
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addCollectionSuccessful"
          >
            提交
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-card>
</template>

<script>
import {postIdFollow} from "@/api/post";
import {actionFailed, actionPostFailed, actionSuccess} from "@/components/ActionState";

export default {
  name: 'PostPreView',
  data() {
    return {
      loading: false,
      selection: 1,
      dialog: false,
      annotation: null,
      postHeatColors: [
        {
          background: "indigo lighten-2",
        },
        {
          background: "yellow accent-2",
        },
        {
          background: "orange lighten-2",
        },
        {
          background: "pink darken-1",
        },
      ],
      postHeatLevelMargin: 10
    }
  },
  props: {
    postName: {
      type: String,
      default: "Unknown",
      required: false
    },
    postUserName: {
      type: String,
      default: "UnknowUser",
      required: false
    },
    postUserId: {
      type: String,
      default: "22231204",
      require: false
    },
    postDescription: {
      type: String,
      default: "The post has no description",
      required: false
    },
    postImg: {
      type: String,
      default: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      required: false
    },
    postId: {
      type: String,
      default: "1",
      require: false
    },
    favorite: {
      type: Boolean,
      default: false,
      require: true,
    },
    tags: {
      type: Array,
      default: () => [{tagName: '学院路'}],
      require: true
    },
    heat: {
      type: Number,
      default: 30,
      require: false
    }
  },
  methods: {
    goToOtherInfo() {
      console.log(this.postUserId)
      this.$router.push({name: 'otherInfo', params: {userId: this.postUserId}});
    },
    link(postId) {
      this.$emit('linkToPost', postId)
    },
    addCollection() {
      if (!this.favorite) {
        this.dialog = true;
      }
    },
    removeCollection() {
      let vm = this;
      if (this.favorite) {
        postIdFollow('delete', {

        }, this.postId).then( res => {
          if (res.data.success) {
            this.$router.go(0);
            actionSuccess(res);
          } else  {
            this.$router.go(0);
            actionPostFailed(res);
          }
        }).catch(err => {
          vm.favorite = false;
          actionFailed();
        });
      }
    },
    cancelCollectionAction() {
      this.annotation = null;
      this.favorite = false;
      this.dialog = false;
    },
    addCollectionSuccessful() {
      let vm = this;
      console.log(this.annotation)
      postIdFollow('post', {
        annotation: this.annotation
      }, this.postId).then(res => {
        if (res.data.success) {
          vm.annotation = null;
          vm.dialog = false;
          this.$router.go(0);
          actionSuccess(res);
        } else {
          this.$router.go(0);
          actionPostFailed(res);
        }
      }).catch(err => {
        actionFailed();
        vm.annotation = null;
        vm.dialog = false;
      })
    },
  },
  computed: {
    calColor() {
      // console.log(Math.max(0,Math.floor((this.heat) / this.postHeatLevelMargin)))
      return this.postHeatColors[Math.min(Math.max(0,Math.floor((this.heat) / this.postHeatLevelMargin)), this.postHeatColors.length - 1)].background
    },
  },
  mounted() {
  }
}
</script>

<style scoped>
#post-card {
  border-radius: 4%;
}


.post-user-name:hover{
  opacity: 0.6;
  cursor: pointer;
}

.post-user-name {
  font-family: Verdana, Arial, Helvetica, sans-serif !important;
  font-weight: 600 !important;
}

.post-name {
  font-size: x-large;
  font-family: Verdana, Arial, Helvetica, sans-serif !important;
  font-weight: bold;
}

.btn-enter-post {
  font-weight: 400;
  line-height: 35px;
  font-size: 20px;
}
</style>
