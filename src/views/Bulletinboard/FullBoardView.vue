<template>
  <v-container fluid>
    <v-card class="full-board-area">
        <v-card-title class="board-title">
          {{boardTitle}}
        </v-card-title>
      <v-card-text style="padding-top: 16px;">
        <maven-content
          :content="boardContent">

        </maven-content>
      </v-card-text>
      <v-card-actions>
        <v-card-subtitle style="padding-left: 7px; color: gray">
          {{ boardTime }}
        </v-card-subtitle>
        <v-btn
          class="ma-2"
          text
          icon
          large
          color="red darken-2"
          @click="deleteBoard"
          v-show="$store.getters['user/role'] === 'admin'"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn
          class="ma-2"
          text
          icon
          large
          color="blue lighten-3"
          @click="dialog = true"
          v-show="$store.getters['user/role'] === 'admin'"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="1000px"
      style="z-index: 1501"
    >
      <v-card>
        <v-card-subtitle>
          <v-container>
            <p class="headline" style="margin-top: 30px">请输入公告标题</p>
            <v-text-field label="输入公告标题" maxlength="25" v-model="boardTitle" />
          </v-container>
        </v-card-subtitle>

        <v-card-subtitle>
          <v-container>
            <p class="headline">请输入公告内容</p>
          </v-container>
        </v-card-subtitle>

        <v-card-text>
          <v-container>
            <mavon-editor v-model="boardContent" :toolbars="toolbars" />
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn color="indigo lighten-1" text @click="closeBoardDialog">
            关闭
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="indigo lighten-1"
            text
            :disabled="disableSubmitDiscussion"
            @click="editBoard"
          >
            提交
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
import MavenContent from "@/components/mavenContent";
import {boardPost} from "@/api/board";
import {actionFailed, actionPostFailed, actionSuccess} from "@/components/ActionState";

export default {
  name: "FullBoardView",
  components: {
    MavenContent

  },
  data() {
    return {
      dialog: false,
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
    }
  },
  props: {
    boardTitle: {
      type: String,
      default: "芝士公告标题",
      require: false,
    },
    boardContent: {
      type: String,
      default: "### 芝士公告内容",
      require: false
    },
    boardTime: {
      type: String,
      default: "1949-10-1",
      require: false,
    },
    boardcastId: {
      type: String,
      default: "1",
      require: false,
    }
  },
  methods: {
    editBoard() {
      let vm = this;
      boardPost('put', {
        title: vm.boardTitle,
        content: vm.boardContent
      }, this.boardcastId).then(res => {
        if (res.data.success) {
          vm.dialog = false
          actionSuccess(res);
        } else {
          vm.dialog = false;
          actionPostFailed(res);
        }
      }).catch(err => {
        vm.dialog = false;
        actionFailed()
      })
    },
    closeBoardDialog() {
      this.dialog = false;
    },
    deleteBoard() {
      let vm = this;
      boardPost('delete', {

      }, this.boardcastId).then(res => {
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
  },
  computed: {
    disableSubmitDiscussion() {
      return this.boardTitle == null || this.boardTitle === "" ||
        this.boardContent === null || this.boardContent === null;
    }
  },
}
</script>

<style scoped>
.full-board-area {
  box-shadow: inset 0 0px 3px 0px rgb(162, 161, 161) !important;
}

.board-title {
  font-size: x-large;
}
</style>
