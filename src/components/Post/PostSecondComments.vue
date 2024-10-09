<template>
  <v-container fluid style="padding-bottom: 0px">
    <v-row>
      <v-avatar class="my-avatar">
        <img :src="this.avatar" alt="暂无头像" />
      </v-avatar>

      <span class="name">
        {{ commentUserName }}({{ commentUserRole == 2 ? "管理员" : "用户"}})
        回复: @{{targetUserName }}({{ targetUserRole == 2 ? "管理员" : "用户"}})
      </span>
      <span class="comment-time">{{ commentTime }}</span>
      <v-spacer></v-spacer>
      <v-btn
        class="ma-2"
        text
        icon
        x-large
        color="red darken-2"
        v-show="authorId == $store.getters['user/id']"
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
          :previewBackground="'#ffffff'"
          :style="'padding: 0px;'"
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
      <div>
        <v-btn
          class="ma-2"
          text
          color="light-blue lighten-2"
          depressed
          @click="dialogOfReplyComment = true"
        >
          <v-icon left x-large>mdi-reply</v-icon>
          <span class="show-reply">回复</span>
        </v-btn>
      </div>
      <div class="d-none d-sm-flex col col-1"></div>

      <v-dialog
        v-model="dialogOfReplyComment"
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
    </v-card-actions>
    <v-divider inset></v-divider>
  </v-container>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import {commentDeleteReq, commentLikesReq, commentSecondNewReq} from "@/api/post";
import {actionFailed, actionPostFailed, actionSuccess} from "@/components/ActionState";

export default {
  name: "PostSecondComments",
  components: {
    mavonEditor,
  },
  props: {
    content: {
      type: String,
      default: "嘉然今晚吃向晚",
      require: true,
    },
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
    targetUserName: {
      type: String,
      require: true,
      default: "Unkonwn",
    },
    targetUserRole: {
      type: String,
      require: true,
      default: "Unkonwn",
    },
    commentId: {
      type: String,
      require: true,
      default: "114514",
    },
    firstCommentId: {
      type: String,
      require: true,
      default: "114514",
    },
    postId: {
      type: String,
      require: true,
      default: "1",
    },
    authorId: {
      type: String,
      default: "1145141989",
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
      dialogOfReplyComment: false,
      replyContent: null,
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
    replyCommentSuccess() {
      let vm = this;
      commentSecondNewReq(
        "put",
        {
          content: vm.replyContent,
          replyCommentId: vm.commentId,
        },
        this.postId,
        this.firstCommentId
      )
        .then((res) => {
          if (res.data.success) {
            vm.$emit("reloadComments");
            vm.replyContent = "";
            vm.dialogOfReplyComment = false;
            this.$router.go(0);
            actionSuccess(res);
          } else {
            this.$router.go(0);
            actionPostFailed(res);
          }
        })
        .catch((err) => {
          console.log(vm.replyContent);
          vm.replyContent = "";
          vm.dialogOfReplyComment = false;
          actionFailed();
        });
    },
    closeReplyEditor() {
      console.log(111);
      this.replyContent = null;
      this.dialogOfReplyComment = false;
    },
    deleteComment() {
      const vm = this;
      commentDeleteReq(
        "delete",
        {
          commentType: 2,
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
        });
    },
    addLike() {
      this.likes++;
      commentLikesReq('post', {
          'commentType': 2,
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
          'commentType': 2,
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
    checkReply() {
      return this.replyContent === null || this.replyContent === "";
    },
    commentDelPermission() {
      return this.$store.getters["user/id"] === this.authorId || this.$store.getters["user/role"] == 1;
    },
  },

};
</script>

<style scoped>
.my-avatar {
  margin-left: 50px;
  margin-right: 10px;
  margin-top: 25px;
}

.name {
  font-size: 17px;
  /* margin-bottom: 5px; */
  margin-top: 35px;
  margin-left: 20px;
  color: black;
}

.comment-time {
  font-size: 13px;
  margin-top: 40px;
  margin-left: 40px;
}

.markdown {
  /* 暂时未限制高度 height: 500px;*/
  margin: 0 auto;
  border: none !important;
  background-color: white !important;
  min-height: 0px;
  box-sizing: 0;
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
</style>
