<template>
<v-container fluid>
  <v-card style="margin-bottom: 150px; background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);">
    <v-card-title class="board-head">
      公告板
    </v-card-title>
    <v-divider></v-divider>
    <v-tabs
      color="deep-purple accent-4"
      right
      background-color="transparent"
    >
      <v-tab>完全显示</v-tab>

      <v-tab>缩略图显示</v-tab>

      <v-tab-item style="background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);">
        <v-container fluid v-if="bulletins?.length === 0">
          <v-row justify="center" align="center" style="min-height: 300px;">
            <v-card-title class="no-bulletin">
              当前暂无公告哦，去别的地方逛逛吧~~~
            </v-card-title>
          </v-row>
        </v-container>
        <v-row v-else>
          <v-col v-for="(bulletin, index) in bulletins" :key="index" :cols="12" :sm="12">
            <full-board-view
            :board-title="bulletin.title"
            :board-content="bulletin.context"
            :board-time="bulletin.postTime"
            :boardcast-id="String(bulletin.broadcastId)">

            </full-board-view>
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item style="background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);">
        <v-container fluid v-if="bulletins?.length === 0">
          <v-row justify="center" align="center" style="min-height: 300px;">
            <v-card-title class="no-bulletin">
              当前暂无公告哦，去别的地方逛逛吧~~~
            </v-card-title>
          </v-row>
        </v-container>
        <pre-board-view v-else
        :bulletins="bulletins">
        </pre-board-view>
      </v-tab-item>
    </v-tabs>
  </v-card>


  <div
    class="speed-dial"
    v-if='$store.getters["user/role"] === "admin"'
  >
    <v-btn color="indigo" fab dark large @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
  <!-- 新建公告 -->
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
          @click="addBoard"
        >
          提交
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</v-container>
</template>

<script>
import FullBoardView from "@/views/Bulletinboard/FullBoardView";
import {boardReq} from "@/api/board";
import {actionFailed, actionPostFailed, actionSuccess} from "@/components/ActionState";
import PreBoardView from "@/views/Bulletinboard/PreBoardView";

let testBulletions = [
  {
    title: "芝士标题",
    context: "# 芝士内容",
    postTime: "芝士时间 1949-10-1",
    broadcastId: "1",
  },
  {
    title: "芝士标题",
    context: "芝士内容",
    postTime: "芝士时间 1949-10-1",
    broadcastId: "1",
  },
  {
    title: "芝士标题",
    context: "芝士内容",
    postTime: "芝士时间 1949-10-1",
    broadcastId: "1",
  },
  {
    title: "芝士标题",
    context: "芝士内容",
    postTime: "芝士时间 1949-10-1",
    broadcastId: "1",
  },
  {
    title: "芝士标题",
    context: "芝士内容",
    postTime: "芝士时间 1949-10-1",
    broadcastId: "1",
  },
  {
    title: "芝士标题",
    context: "芝士内容",
    postTime: "芝士时间 1949-10-1",
    broadcastId: "1",
  },
  {
    title: "芝士标题",
    context: "芝士内容",
    postTime: "芝士时间 1949-10-1",
    broadcastId: "1",
  },

]

export default {
  name: "BulletinBoardView",
  components: {
    PreBoardView,
    FullBoardView

  },
  data() {
    return {
      bulletins: [],
      dialog: false,
      boardTitle: "",
      boardContent: "",
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
  methods:{
    loadBoards() {
      let vm = this;
      boardReq('get', {

      }).then(res => {
        if (res.data.success) {
          vm.bulletins = res.data.data.broadcasts;
        } else {
          actionPostFailed(res);
        }
      }).catch(err => {
        actionFailed();
      })
    },
    closeBoardDialog() {
      this.dialog = false;
      this.boardContent = "";
      this.boardTitle = "";
    },
    addBoard() {
      let vm = this;
      boardReq('post', {
        title: this.boardTitle,
        content: this.boardContent,
      }).then(res => {
        if (res.data.success) {
          vm.boardContent = "";
          vm.boardTitle = "";
          this.dialog = false;
          this.$router.go(0);
          actionSuccess(res);
        } else {
          this.dialog = false;
          actionPostFailed(res)
        }
      }).catch(err => {
        this.bulletins.unshift({
          title: vm.boardTitle,
          context: vm.boardContent,
          postTime: new Date().getDate(),
          broadcastId: "1",
        })
        this.dialog = false;
        actionFailed();
      })
    },
  },
  computed: {
    disableSubmitDiscussion() {
      return this.boardTitle == null || this.boardTitle === "" ||
        this.boardContent === null || this.boardContent === null;
    }
  },
  mounted() {
    this.loadBoards();
  }
}
</script>

<style scoped>
.no-bulletin {
  font-size: xx-large;
  color: gray;
  opacity: 0.5;
}

.board-head {
  justify-content: center;
  font-size: xx-large;
}

.speed-dial {
  position: fixed;
  right: 1.5em;
  bottom: 1.5em;
  display: inline-grid;
}

</style>
