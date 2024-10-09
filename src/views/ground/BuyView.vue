<template>
  <v-container
    fluid
  >

    <v-divider></v-divider>
    <v-container fluid>
      <v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        v-if="slides.length > 0"
      >
        <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
        >
        <v-img
          :src="slide.img"
          class="hot-img"
          max-height="500"
          contain
          @click="gotoLink(slide.postId);"
        >

        </v-img>
        </v-carousel-item>
      </v-carousel>
    </v-container>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="6" sm="6" md="6" lg="6">
        <v-chip-group
          v-model="tags_search_in"
          multiple column
          @change="tagSearch"
        >
          <v-chip
            v-for="tag in all_tags"
            :key="tag.tagName"
            :filter="!modifyTag"
            outlined
            style="background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);"
            :value="tag.tagName"
            :close="modifyTag"
            @click:close='handleTagModify(tag.tagName,"delete")'
          >
            <span style="color: #536DFE">{{tag.tagName}}</span>
          </v-chip>
          <v-btn
            icon
            v-if="all_tags.length>0 && !modifyTag"
            @click="clearTag"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn
            icon
            v-if='$store.getters["user/role"] === "admin"'
            @click="modifyTag = !modifyTag"
          >
            <v-icon>mdi-tools</v-icon>
          </v-btn>
        </v-chip-group>
          <v-text-field
            v-if="modifyTag"
            append-icon="mdi-tooltip-check-outline"
            v-model="newTagName"
            @click:append='handleTagModify(newTagName,"post")'
            @keyup.enter='handleTagModify(newTagName,"post")'
            label="输入新增的 tag 的名字"
            placeholder="Dense & Rounded"
            filled
            rounded
            dense
          >
          </v-text-field>
      </v-col>
      <v-col cols="6" sm="6" md="6" lg="6" class="d-flex">
        <v-btn
          class="ma-2"
          outlined
          fab
          color="indigo"
          @click=searchPost(searchText)
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-text-field
          hide-details
          placeholder="搜索帖子"
          single-line
          v-model="searchText"
          @keyup.enter=searchPost(searchText)
        ></v-text-field>
      </v-col>
    </v-row>
    <v-container fluid class="" >
      <v-row align="stretch" no-gutters justify="start">
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
            :postDescription="post.description"
            :postImg="post.img"
            :postId="String(post.postId)"
            :postUserId="String(post.postUserId)"
            :favorite="post.favorite == 1"
            :tags="post.tags"
            :heat="post.heat"
            v-on:linkToPost="changeLink"
            class="ma-2"
          >
          </post-pre-view>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-pagination
        v-if="Math.ceil(totalCnt / pageSize) >= 1"
        v-model="curPage"
        :length="Math.ceil(totalCnt / pageSize)"
      ></v-pagination>
    </div>
    <div class="speed-dial">
      <v-btn color="indigo" fab dark large @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <!-- 新建帖子 -->
    <v-dialog
      v-model="dialog"
      persistent
      max-width="1000px"
      style="z-index: 1501"
    >
      <v-card>
        <v-card-subtitle>
          <v-container>
            <p class="headline" style="margin-top: 30px">请输入帖子标题</p>
            <v-text-field label="输入帖子标题" maxlength="25" v-model="postInfo.title" />
          </v-container>
        </v-card-subtitle>

        <v-card-text>
          <v-container>
            <p class="headline">
              请选择帖子标签
            </p>
            <v-chip-group
              v-model="postInfo.tags"
              multiple column
            >
              <v-chip
                v-for="tag in all_tags"
                :key="tag.tagName"
                filter
                outlined color="cyan darken-3"
                :value="tag.tagName"
              >
                {{tag.tagName}}
              </v-chip>
            </v-chip-group>
          </v-container>
        </v-card-text>

        <v-card-subtitle>
          <v-container>
            <p class="headline">请输入帖子内容</p>
          </v-container>
        </v-card-subtitle>

        <v-card-text>
          <v-container>
            <mavon-editor v-model="postInfo.content" :toolbars="toolbars" />
          </v-container>
        </v-card-text>

        <v-card-text v-if='type==="sell"'>
          <v-container>
            <p class="headline">请增加帖子商品</p>
            <post-good-table
              :items="postInfo.goods"
            />
          </v-container>
        </v-card-text>

        <v-card-text v-else>
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;"
          >
            <v-avatar
              size="100"
            >
              <img :src="preViewImg(postInfo.buyImg)" />
            </v-avatar>
          </div>
          <v-file-input
            v-model="postInfo.buyImg"
            prepend-icon="mdi-camera"
            placeholder="选择想要的商品图片"
            accept=".jpg,.png,.svg,.jpeg"
            style="font-size: 0.875rem;"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn color="indigo lighten-1" text @click="dialog = false">
            关闭
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="indigo lighten-1"
            text
            :disabled="disableSubmitDiscussion"
            @click="addPost"
          >
            提交
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <router-view></router-view>
  </v-container>
</template>

<script>
import {tagReq} from "@/api/tag.js"
import PostPreView from "./Post/PostPreView.vue";
import { postsReq, postsNewReq, postsNewImgReq } from "@/api/post";
import {actionFailed, actionPostFailed, actionSuccess} from "@/components/ActionState";
import PostGoodTable from "@/components/Post/PostGoodTable.vue";

export default {
  components: { PostPreView, PostGoodTable},
  name: "BuyView",
  data() {
    return {
      searchText: "",
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [],
      modifyTag:false,
      newTagName:"",
      //just static now
      posts: [],
      //posts,
      curPage: 1,
      totalCnt: 0,
      pageSize: 10,
      dialog: false,
      postInfo: {
        userId: this.$store.getters["user/id"],
        buyImg: [],
        goods: [],
        title: '',
        content: '',
        tags: [],
      },
      defaultInfo: {
        userId: this.$store.getters["user/id"],
        buyImg: [],
        goods: [],
        title: '',
        content: '',
        tags: [],
      },
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
      curPostId: "1", //demo and it can be removed
      all_tags:[{
        tagName:"学院路"
      }, {
        tagName:"沙河"
      }],
      tags_search_in:[]
    };
  },
  props:{
    type:{
      type: String,
      default: "Unknown",
      required: false
    }
  },
  methods: {
    gotoLink(postId) {
      if (this.type === 'buy') {
        let routeUrl = this.$router.resolve({
          name: "buyPost",
          params: {postId: postId}
        });
        window.open(routeUrl.href, '_blank');
      } else {
        let routeUrl = this.$router.resolve({
          name: "sellPost",
          params: {postId: postId}
        });
        window.open(routeUrl.href, '_blank');
      }
    },
    handleTagModify(tagName,method) {
      const vm = this
      tagReq(method,{tagName:tagName}).then(res => {
        if (res.data.success) {
          actionSuccess(res)
          vm.getAllTag()
        } else {
          actionPostFailed(res)
        }
      }).catch(err => {
        actionFailed()
      })
      this.modifyTag = false
    },
    getPost() {
      const vm = this;
      postsReq("get", {
        curPage: this.curPage,
        pageSize: this.pageSize,
        tags: this.tags_search_in,
        type: this.type
      }).then((res) => {
        vm.posts = res.data.data.posts;
        vm.slides = res.data.data.posts.slice(0,  Math.min(res.data.data.posts.length, 5));
        vm.totalCnt = res.data.data.totalCnt;
      });
    },
    clearTag() {
      this.tags_search_in = []
      this.loadData()
    },
    tagSearch() {
      this.loadData()
    },
    getAllTag() {
      const vm = this
      tagReq("get",{}).then(res => {
        if (res.data.success) {
          vm.all_tags = res.data.data.tags
        } else {
          vm.$store.commit("snack/setState",{snackShow:true,snackMsg:res.data.message,snackType:"error"})
        }
      }).catch(err => {

      })
    },
    loadData() {
      this.getAllTag()
      this.getPost()
    },
    addPost() {
      const vm = this;
      console.log(this.postInfo)
      postsNewReq("put", this.postInfo,this.type)
        .then((res) => {
          if (res.data.success) {
            if (vm.type == 'buy') {
              let postId = res.data.data.postId
              const formData =  new window.FormData()
              formData.append("img", vm.postInfo.buyImg)
              formData.append("postId", postId??1)
              postsNewImgReq('post', formData, this.type).then(res => {
                if (res.data.success) {
                  vm.loadData();
                  vm.postInfo = vm.defaultInfo
                  actionSuccess(res);
                } else {
                  actionPostFailed(res);
                }
              }).catch(error => {
                actionFailed()
              })
            } else {
              let ids = res.data.data.commodityIds
              for (let i = 0; i < vm.postInfo.goods.length; i++) {
                const formData =  new window.FormData()
                formData.append("img", vm.postInfo.goods[i].img)
                formData.append("commodityId", ids?ids[i]:i)
                postsNewImgReq('post', formData, this.type).then(res => {
                  if (res.data.success) {
                    vm.loadData();
                    vm.dialog = false;
                    vm.postInfo = vm.defaultInfo
                    actionSuccess(res);
                  } else {
                    console.log(res)
                    actionPostFailed(res);
                  }
                }).catch(error => {
                  actionFailed()
                })
              }
            }
          } else {
            actionPostFailed(res);
          }
        })
        .catch(function (error) {
          //现在调试用，默认error，发帖
          //将来可以弄个弹窗警告出错啥的
          actionFailed()
          vm.posts.push({
            title: vm.postInfo.title,
            userId: "20231204",
            username: "七海Nana7mi",
            description: vm.postInfo.content,
            postImg: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            id: String(vm.curPostId),
          });
          vm.dialog = false;
          vm.curPostId++;
        });
    },
    changeLink(postId) {
      this.$emit("changeGround", postId);
    },
    preViewImg(file) {
      const windowURL = window.URL || window.webkitURL;
      const ret = !(file instanceof File) ? 'https://t14.baidu.com/it/u=2616247270,2231407640&amp;fm=179&amp;app=42&amp;size=w54&amp;n=0&amp;f=JPEG&amp;fmt=auto?s=AB63F416D991EBE1414334D60300D0EA&amp;sec=1667667600&amp;t=9b2e76d05cecbc1f6d2eecd0bd8db2ec' : windowURL.createObjectURL(file)
      return ret
    },
    searchPost(searchText) {
      if (this.type === 'buy') {
        let routeUrl = this.$router.resolve({
          name: "buySearchPost",
          query: {searchText: searchText}
        });
        window.open(routeUrl.href, '_blank');
      } else {
        let routeUrl = this.$router.resolve({
          name: "sellSearchPost",
          query: {searchText: searchText}
        });
        window.open(routeUrl.href, '_blank');
      }
    },
  },
  mounted() {
    this.loadData();
    console.log(this.$store.getters['user/role']);
  },
  computed: {
    disableSubmitDiscussion() {
      //检查帖子是否合法
      return (
        this.postInfo.content == null ||
        this.postInfo.content === "" ||
        this.postInfo.title == null ||
        this.postInfo.title === "" || (this.type === "sell" && this.postInfo.goods.length === 0)
        || (this.type === 'buy' && !(this.postInfo.buyImg instanceof File))
      );
    },
  },
  watch: {
    curPage (newPage,oldPage) {
      this.loadData();
    },
    type (newType, oldType) {
      this.loadData();
    }
  }
}
</script>

<style scoped>
.speed-dial {
  position: fixed;
  right: 1.5em;
  bottom: 1.5em;
  display: inline-grid;
}

.background-img {
  background:url("@/assets/static/img/login_2.jpg");
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.hot-img:hover {
  cursor: pointer;
}
</style>
