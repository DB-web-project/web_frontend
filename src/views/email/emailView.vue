<template>
<v-card class="overflow-y-hidden">
  <v-card-title>
    你的消息
  </v-card-title>
  <v-tabs
    color="deep-purple accent-4"
  >

    <v-tab>评论回复</v-tab>
    <v-tab>购买请求</v-tab>
    <v-tab>交易状态</v-tab>

    <v-tab-item>
      <v-card class="overflow-y-auto" width="800" max-height="500">
        <v-container fluid v-if="commentReportMessage?.length === 0">
          <v-row justify="center" align="center" style="min-height: 300px;">
            <v-card-title class="no-comment-message">
              当前暂时没有人回复你哦，去别的地方逛逛吧~~~
            </v-card-title>
          </v-row>
        </v-container>
        <v-list v-else>
          <v-list-item-group v-model="messagePos" color="primary">
            <template v-for="message in commentReportMessage">
              <v-list-item :key="message.id"
                           v-ripple="{ class: `info--text` }"
                           @click="openCommentMessage(message.id)"
                           two-line>
                <v-list-item-icon>
                  <v-icon large v-if="message.hasChecked">
                    mdi-comment-processing
                  </v-icon>
                  <v-icon large v-else class="checked-icon">
                    mdi-comment-processing
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title style="overflow: hidden" v-if="message.hasChecked" class="checked">
                    你在「{{message.postTitle}}」下的评论被回复了，点我去看看吧~
                  </v-list-item-title>
                  <v-list-item-title style="overflow: hidden" v-else>
                    你在「{{message.postTitle}}」下的评论被回复了，点我去看看吧~
                  </v-list-item-title>
                  <v-list-item-subtitle style="overflow: hidden">
                    评论人:{{message.username}}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                :key="message.id + 'index'"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-tab-item>


    <v-tab-item>
      <v-card class="overflow-y-auto" width="800" max-height="500">
        <v-container fluid v-if="buyRequestMessage?.length === 0">
          <v-row justify="center" align="center" style="min-height: 300px;">
            <v-card-title class="no-comment-message">
              当前暂时没有人购买你的东西哦，去别的地方逛逛吧~~~
            </v-card-title>
          </v-row>
        </v-container>
        <v-list v-else>
          <v-list-item-group v-model="buyPos" color="primary">
            <template v-for="message in buyRequestMessage">
              <v-list-item :key="message.id"
                           v-ripple="{ class: `info--text` }"
                           @click="openBuyMessage(message.id)"
                           two-line
              >
                <v-list-item-icon>
                  <v-icon large v-if="message.hasChecked">
                    mdi-cart
                  </v-icon>
                  <v-icon large v-else class="checked-icon">
                    mdi-cart
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title style="overflow: hidden" v-if="message.hasChecked" class="checked">
                    你在「{{message.postTitle}}」下的发布的物品被购买了，点我去看看吧~
                  </v-list-item-title>
                  <v-list-item-title style="overflow: hidden" v-else>
                    你在「{{message.postTitle}}」下的发布的物品被购买了，点我去看看吧~
                  </v-list-item-title>
                  <v-list-item-subtitle style="overflow: hidden">
                    购买人:{{message.username}}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                :key="message.id + 'index'"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-tab-item>



    <v-tab-item>
      <v-card class="overflow-y-auto" width="800" max-height="500">
        <v-container fluid v-if="tradeStateMessage?.length === 0">
          <v-row justify="center" align="center" style="min-height: 300px;">
            <v-card-title class="no-comment-message">
              当前暂时没有交易记录哦，去别的地方逛逛吧~~~
            </v-card-title>
          </v-row>
        </v-container>
        <v-list v-else>
          <v-list-item-group v-model="tradePos" color="primary">
            <template v-for="message in tradeStateMessage">
              <v-list-item :key="message.id"
                           v-ripple="{ class: `info--text` }"
                           @click="openBuyMessage(message.id)"
                           two-line>
                <v-list-item-icon >
                  <v-icon large v-if="message.hasChecked">
                    mdi-state-machine
                  </v-icon>
                  <v-icon large v-else class="checked-icon">
                    mdi-state-machine
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title style="overflow: hidden" v-if="message.hasChecked" class="checked">
                    你在「{{message.postTitle}}」下的交易情况有变化，点我去看看吧~
                  </v-list-item-title>
                  <v-list-item-title style="overflow: hidden" v-else>
                    你在「{{message.postTitle}}」下的交易情况有变化，点我去看看吧~
                  </v-list-item-title>
                  <v-list-item-subtitle style="overflow: hidden">
                    发送人:{{message.username}}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                :key="message.id + 'index'"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-tab-item>
  </v-tabs>



  <v-dialog
    v-model="dialog"
    width="600px"
  >
    <v-card>
      <v-card-title>
        {{ messageTitle }}
      </v-card-title>
      <v-card-text>
        <maven-content
          :content="messageContent">

        </maven-content>
      </v-card-text>
        <v-card-subtitle v-if="curMessageType == 1" style="margin-bottom: 0; padding-bottom: 0;">
          交易物品:{{ commodityName }}
        </v-card-subtitle>
        <v-card-subtitle v-if="curMessageType == 1" style="margin-top: 0">
          交易数量:{{ commodityNum }}
        </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="purple darken-1"
          text
          @click="confirmBuyReq"
          v-if="curMessageType == 1"
        >
          同意购买
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="goToPost"
        >
          前往帖子
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="closeMessage"
        >
          已阅读
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</v-card>
</template>

<script>

import {
  buyMessageConfirmReq,
  buyMessageReq,
  commentMessageReq,
  openBuyMessageReq,
  openCommentMessageReq,
} from "@/api/message";
import {actionFailed, actionPostFailed, actionSuccess} from "@/components/ActionState";
import MavenContent from "@/components/mavenContent";

let testEmails = [];

let testId = 1;

for (let i = 0; i < 30; i++) {
  testEmails.push({
    id: testId++,
    category: 1,
    username: "玛奇玛",
    studentId: 1,
    postTitle: "帕瓦给电次庆祝生日"
  });
  testEmails.push({
    id: testId++,
    category: 2,
    username: "玛奇玛",
    studentId: 1,
    postTitle: "帕瓦给电次庆祝生日"
  });
  testEmails.push({
    id: testId++,
    category: 3,
    username: "玛奇玛",
    studentId: 1,
    postTitle: "帕瓦给电次庆祝生日"
  });
}


export default {
  name: "emailView",
  components: {MavenContent},
  data() {
    return {
      messageId: "",
      postId: "",
      messageTitle: "",
      messageContent: "",
      dialog: false,
      commodityName: "",
      commodityNum: -1,
      curMessageType: 0,
      messagePos: -1,
      buyPos: -1,
      tradePos: -1,
      postType: -1,
      commentReportMessage: [],
      buyRequestMessage: [],
      tradeStateMessage: [],
    }
  },
  methods: {
    loadBuyMessage() {
      let vm = this;
      buyMessageReq('get',{

      }).then(res => {
        if (res.data.success) {
          for (let message of res.data.data.unchecked) {
            message.hasChecked =  false;
            if (message.category == 1) {
              vm.buyRequestMessage.push(message);
            } else if (message.category == 2) {
              vm.tradeStateMessage.push(message);
            }
          }
          for (let i = 0; i < res.data.data.checked.length; i++) {
            res.data.data.checked[i].hasChecked =  true;
            if (res.data.data.checked[i].category == 2) {
              vm.tradeStateMessage.push(res.data.data.checked[i]);
            }
          }
        } else {
          actionPostFailed(res);
        }
      }).catch(err => {
        for (let message of testEmails) {
          message.hasChecked =  false;
          if (message.category == 1) {
            vm.buyRequestMessage.push(message);
          } else if (message.category == 2) {
            vm.tradeStateMessage.push(message);
          }
        }
        actionFailed();
      })
    },
    loadCommentMessage() {
      let vm = this;
      commentMessageReq('get', {}).then(res => {
        if (res.data.success) {
          for (let message of res.data.data.unchecked) {
            message.hasChecked = false;
            vm.commentReportMessage.push(message);
          }
          for (let message of res.data.data.checked) {
            message.hasChecked = true;
            vm.commentReportMessage.push(message);
          }
        } else {
          actionPostFailed(res);
        }
      }).catch(err => {
        for (let message of testEmails) {
          message.hasChecked =  false;
          if (message.category == 3){
            vm.commentReportMessage.push(message);
          }
        }
        actionFailed();
      });
    },
    openCommentMessage(id) {
      let vm = this;
      openCommentMessageReq('get', {

      },id).then(res => {
        if (res.data.success) {
          vm.messageId = id;
          vm.curMessageType = 3;
          vm.postId = res.data.data.postId;
          vm.messageTitle = "评论回复";
          vm.messageContent = res.data.data.content;
          vm.dialog = true;
        } else {
          actionPostFailed(res);
        }
      }).catch(err => {
        vm.messageId = "1";
        vm.postId = "3";
        vm.curMessageType = 2;
        vm.commodityName = "波奇塔";
        vm.commodityNum = 114514;
        vm.messageTitle = "测试标题玛奇玛";
        vm.messageContent = "生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉"
        vm.dialog = true;
        actionFailed();
      })
    },
    openBuyMessage(id) {
      let vm = this;
      openBuyMessageReq('get', {

      },id).then(res => {
        if (res.data.success) {
          vm.messageId = id;
          vm.curMessageType = res.data.data.category;
          vm.postId = res.data.data.postId;
          vm.postType = res.data.data.postType;
          if (res.data.data.category == 1) {
            vm.messageTitle = "购买请求";
            vm.commodityName = res.data.data.commodityName;
            vm.commodityNum = res.data.data.number;
          } else if (res.data.data.category == 2) {
            vm.messageTitle = "交易状态";
          }
          vm.messageContent = res.data.data.content;
          vm.dialog = true;
        } else {
          actionPostFailed(res);
        }
      }).catch(err => {
        vm.messageId = "1";
        vm.postId = "3";
        vm.curMessageType = 2;
        vm.commodityName = "波奇塔";
        vm.commodityNum = 114514;
        vm.messageTitle = "测试标题玛奇玛";
        vm.messageContent = "生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉生姜炒肉"
        vm.dialog = true;
        actionFailed();
      })
    },
    closeMessage() {
      this.messageId = "";
      this.dialog = false;
      this.postId = 0;
      this.curMessageType = 0;
      this.messageTitle = "";
      this.messageContent = "";
      this.messagePos = -1;
      this.buyPos = -1;
      this.tradePos = -1;
      this.postType = -1;
    },
    goToPost() {
      if (this.postType == 2) {
        let routeUrl = this.$router.resolve({
          name: "sellPost",
          params: {postId: this.postId}
        });
        window.open(routeUrl.href, '_blank');
      } else {
        let routeUrl = this.$router.resolve({
          name: "buyPost",
          params: {postId: this.postId}
        });
        window.open(routeUrl.href, '_blank');
      }
      this.closeMessage();
    },
    confirmBuyReq() {
      buyMessageConfirmReq('get', {

      }, this.messageId).then(res => {
        if (res.data.success) {
          actionSuccess(res);
        } else {
          actionPostFailed(res);
        }
      }).catch(err => {
        actionFailed();
      })
      this.closeMessage();
    },
  },
  mounted() {
    this.loadBuyMessage();
    this.loadCommentMessage();
  }
}
</script>

<style scoped>
.no-comment-message {
  font-size: x-large;
  color: gray;
  opacity: 0.5;
}

.checked {
  color: rgba(0, 0, 0, 0.6);
}

.checked-icon {
  animation: twinkle 1s infinite alternate;
}

@keyframes twinkle {
  0%{
    opacity: 0.8;
  }
  100%{
    opacity:0;
  }
}
</style>
