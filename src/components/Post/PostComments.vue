<template>
  <v-container fluid>
    <v-row>
      <v-avatar class="my-avatar">
        <img :src="this.avatar" alt="暂无头像" />
      </v-avatar>

      <span class="name">{{ commentUserName }}({{ commentUserRole == 2 ? "管理员" : "用户"}})</span>
      <span class="comment-time">{{ commentTime }}</span>
      <v-spacer></v-spacer>
      <!--删除评论-->
      <v-btn
        v-show="commentDelPermission"
        class="ma-2"
        text
        icon
        x-large
        color="red darken-2"
        @click="deleteComment"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <div class="d-none d-sm-flex col col-1"></div>
    </v-row>
    <v-row :justify="'center'">
      <v-col sm="10" md="10" lg="10" class="editor-outer">
        <mavon-editor
          class="markdown"
          :value="content"
          :subfield="false"
          :defaultOpen="'preview'"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="false"
          :boxShadow="false"
          :style="'padding: 0px;'"
          :preview-background="'#F5F5F5'"
        ></mavon-editor>
      </v-col>
    </v-row>
    <v-card-actions>
      <div class="d-none d-sm-flex col col-1"></div>
      <v-btn class="ma-2" text icon x-large color="blue lighten-2" @click="addLike">
        <v-icon>mdi-thumb-up</v-icon>&nbsp;{{likes}}
      </v-btn>

      <v-btn class="ma-2" text icon x-large color="red lighten-2" @click="addUnLike">
        <v-icon>mdi-thumb-down</v-icon>&nbsp;{{unlikes}}
      </v-btn>
      <v-spacer></v-spacer>
      <div v-show="hasSecondComments">
        <v-btn
          class="ma-2"
          text
          color="green lighten-1"
          depressed
          @click="showSecondComments"
        >
          <v-icon left x-large>mdi-message</v-icon>
          <span class="show-reply" v-if="!isSecondCommentsSeen">显示回复</span>
          <span class="show-reply" v-if="isSecondCommentsSeen">收起回复</span>
        </v-btn>
      </div>

      <div>
        <v-btn
          class="ma-2"
          text
          color="light-blue lighten-2"
          depressed
          @click="dialogOfReplyPost = true"
        >
          <v-icon left x-large>mdi-reply</v-icon>
          <span class="show-reply">回复</span>
        </v-btn>
      </div>

      <v-dialog
        v-model="dialogOfReplyPost"
        persistent
        max-width="1000px"
        style="z-index: 1501"
      >
        <v-card>
          <v-card-subtitle>
            <v-container>
              <p class="headline" style="margin-top: 30px">请输入回复内容</p>
            </v-container>
          </v-card-subtitle>
          <v-card-text>
            <v-container>
              <mavon-editor v-model="replyContent" :toolbars="toolbars" />
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="indigo lighten-1" text @click="closeReplyEditor">
              关闭
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="indigo lighten-1"
              text
              :disabled="checkReply"
              @click="replyCommentSuccess"
            >
              提交
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="d-none d-sm-flex col col-1"></div>
    </v-card-actions>
    <v-expand-transition>
      <v-card class="second-comment-area" v-show="isSecondCommentsSeen">
        <template v-for="(secondComment, index) in secondComments">
          <post-second-comments
            :content="secondComment.content"
            :comment-user-name="secondComment.authorName"
            :comment-user-role="String(secondComment.authorRole)"
            :comment-time="secondComment.commentTime"
            :target-user-name="secondComment.targetName"
            :target-user-role="String(secondComment.targetRole)"
            :comment-id="String(secondComment.id)"
            :first-comment-id="String(commentId)"
            :post-id="String(postId)"
            :author-id="String(authorId)"
            :likes="Number(secondComment.likes)"
            :unlikes="Number(secondComment.unlikes)"
            :avatar="secondComment.avatar"
            :reloadComments="$emit('reloadComments')"
            :key="index"
          >
          </post-second-comments>
        </template>
      </v-card>
    </v-expand-transition>

    <v-divider></v-divider>
  </v-container>
</template>

<script>
import PostSecondComments from "@/components/Post/PostSecondComments";
import {commentDeleteReq, commentLikesReq, commentSecondNewReq} from "@/api/post";
import {actionFailed, actionPostFailed, actionSuccess} from "@/components/ActionState";

export default {
  name: "PostComments",
  components: {
    PostSecondComments,
  },
  props: {
    commentUserName: {
      type: String,
      require: true,
      default: "Unkonwn",
    },
    commentUserRole: {
      type: String,
      require: true,
      default: "Unkonwn",
    },
    commentTime: {
      type: String,
      require: true,
      default: "11-45-14",
    },
    content: {
      type: String,
      require: true,
      default: "嘉然今晚吃什么？",
    },
    secondComments: {
      type: Array,
      require: false,
      default: null,
    },
    commentId: {
      type: String,
      default: "1",
      require: true,
    },
    postId: {
      type: Number,
      default: 1,
      require: true,
    },
    authorId: {
      type: String,
      default: "20373057",
      require: true,
    },
    likes: {
      type: Number,
      default: 0,
      require: true,
    },
    unlikes: {
      type: Number,
      default: 0,
      require: true,
    },
    avatar: {
      type: String,
      default: "",
      require: true,
    }
  },
  data() {
    return {
      dialogOfReplyPost: false,
      replyContent: null,
      isSecondCommentsSeen: false,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        superscript: true, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        help: true, // 帮助
        code: true, // code
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        undo: true, // 上一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
      },
    };
  },
  methods: {
    showSecondComments() {
      this.isSecondCommentsSeen = !this.isSecondCommentsSeen;
    },
    closeReplyEditor() {
      this.replyContent = null;
      this.dialogOfReplyPost = false;
    },
    replyCommentSuccess() {
      let vm = this;
      commentSecondNewReq(
        "post",
        {
          content: vm.replyContent,
        },
        this.postId,
        this.commentId
      )
        .then((res) => {
          if (res.data.success) {
            vm.$emit("reloadComments");
            vm.replyContent = "";
            vm.dialogOfReplyPost = false;
            vm.$router.go(0);
            actionSuccess(res);
          } else {
            vm.$router.go(0);
            actionPostFailed(res);
          }
        })
        .catch((err) => {
          // console.log(vm.replyContent)
          let testSecondComments = {
            commentId: 1,
            content: vm.replyContent,
            authorName: "嘉然",
            authorRole: "用户",
            commentTime: "1919-5-14",
            targetName: "向晚",
            targetRole: "用户",
            authorId: "20373057",
          };
          vm.secondComments.push(testSecondComments);
          vm.replyContent = "";
          vm.dialogOfReplyPost = false;
          actionFailed();
        });
    },
    deleteComment() {
      const vm = this;
      commentDeleteReq(
        "delete",
        {
          commentType: 1,
        },
        this.postId,
        this.commentId
      )
        .then((res) => {
          if (res.data.success) {
            vm.$emit("reloadComments");
            this.$router.go(0);
            actionSuccess(res);
          } else {
            this.$router.go(0);
            actionPostFailed(res);
          }
        })
        .catch((err) => {
          actionFailed();
          console.log("delete 1 comment");
        });
    },
    addLike() {
      this.likes++;
      commentLikesReq('post', {
        'commentType': 1,
        'likes': 1
      },
        this.postId,
        this.commentId
      ).then(res => {
        if (res.data.success) {
          actionSuccess(res);
        } else {
          actionSuccess(res);
        }
      }).catch(err => {
        actionFailed();
      });
    },
    addUnLike() {
      this.unlikes++;
      commentLikesReq('post', {
          'commentType': 1,
          'likes': 2
        },
        this.postId,
        this.commentId
      ).then(res => {
        if (res.data.success) {
          actionSuccess(res);
        } else {
          actionSuccess(res);
        }
      }).catch(err => {
        actionFailed();
      });
    }
  },
  computed: {
    hasSecondComments() {
      return this.secondCommentsNum > 0;
    },
    checkReply() {
      return this.replyContent === null || this.replyContent === "";
    },
    secondCommentsNum() {
      return this.secondComments.length;
    },
    commentDelPermission() {
      return this.$store.getters["user/id"] === this.authorId || this.$store.getters["user/role"] == 2;
    },
  },
};
</script>

<style scoped>
.my-avatar {
  margin-left: 50px;
  margin-right: 10px;
  margin-top: 15px;
}

.name {
  font-size: 17px;
  /* margin-bottom: 5px; */
  margin-top: 25px;
  margin-left: 20px;
  color: black;
}

.comment-time {
  font-size: 13px;
  margin-top: 30px;
  margin-left: 40px;
}

.markdown {
  /* 暂时未限制高度 height: 500px;*/
  margin: 0 auto;
  border: none !important;
  background-color: white !important;
  min-height: 0px;
  border-left-width: 0px;
  z-index: 0;
}

.markdown >>> .v-show-content {
  padding: 0px !important;
}

.show-reply {
  padding-left: 10px;
  padding-bottom: 5px;
  font-size: 18px;
}

.second-comment-area {
  box-shadow: inset 0 1px 8px 0px rgb(162, 161, 161) !important;
  border-radius: 3px !important;
}
</style>
