<template>
<v-container fluid>
  <v-card color="#F5F5F5">
        <v-card-title>
          {{title}}
        </v-card-title>
        <v-card-subtitle>
          发帖人: {{username}}
        </v-card-subtitle>
        <v-card-subtitle>
          <v-chip-group>
            <v-chip
              v-for="tag in tagInfo.usedTags"
              :key="tag.tagName"
              color="teal lighten-4"
              :close="tagInfo.modify"
              @click:close="deleteTag(tag.tagName)"
            >
              {{ tag.tagName }}
            </v-chip>
            <v-btn
              icon
              v-show="postDelPermissions"
              @click="tagInfo.modify = true"
              v-if="!tagInfo.modify"
            >
            <v-icon>mdi-map-marker-plus-outline</v-icon>
            </v-btn>
          </v-chip-group>

          <v-chip-group
            v-if="tagInfo.modify"
          >
            <v-chip
              v-for="tag in tagInfo.unUsedTags"
              :key="tag.tagName"
              color="cyan lighten-5"
              @click="addTag(tag.tagName)"
            >
              {{ tag.tagName }}
            </v-chip>
            <v-btn
              icon
              v-show="postDelPermissions"
              @click="tagInfo.modify = false"
            >
            <v-icon>mdi-tooltip-check-outline</v-icon>
            </v-btn>
          </v-chip-group>

        </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="4" md="4" lg="3">
                <v-carousel
                  cycle
                  height="400"
                  hide-delimiter-background
                  show-arrows-on-hover
                  class="show-img-slide"
                  v-if="this.type === 'sell'"
                >
                  <v-carousel-item
                    v-for="(postImg, i) in postGoodImgs"
                    :key="i"
                    max-height="500"
                    max-width="500"
                  >
                  <v-img
                    :src="postImg"
                    max-height="500"
                    max-width="800"
                  >

                  </v-img>
                  </v-carousel-item>
                </v-carousel>

              <v-carousel
                cycle
                height="400"
                hide-delimiter-background
                show-arrows-on-hover
                class="show-img-slide"
                v-else
              >
                <v-carousel-item
                  v-for="(postImg, i) in postImgs"
                  :key="i"
                  max-height="500"
                  max-width="500"
                >
                  <v-img
                    :src="postImg"
                    max-height="500"
                    max-width="800"
                  >

                  </v-img>
                </v-carousel-item>
              </v-carousel>
                <!-- 待添加按钮、点击告诉帖主有对应物品
                待添加按钮、收藏 -->
            </v-col>
            <v-divider
              vertical
            ></v-divider>
            <v-col cols="12" sm="8" class="content">
              <mavon-editor class="markdown"
                  :value="content"
                  :subfield="false"
                  :defaultOpen ="'preview'"
                  :toolbarsFlag ="false"
                  :editable="false"
                  :scrollStyle="false"
                  :boxShadow="false"
                  :previewBackground="'#F5F5F5'"
              ></mavon-editor>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mt-6"></v-divider>
      </v-card>

        <!-- 评论区 -->
      <post-comments-view
      class="comments"
      :comments="comments"
      :reloadComments="loadComments">

      </post-comments-view>
      <v-dialog
        v-model="goodDialog"
        max-width="700px"
      >
        <post-good-table
          :items="allGoods"
          :onlyNum="true"
          v-on:delete="deleteCommodity"
          v-on:add="addCommodity"
          v-on:edit="modifyCommodity"
        />
      </v-dialog>

        <!-- 购物界面 -->



      <v-dialog
        v-model="cartDialog"
        width="700"
      >
        <v-card>
          <v-card-text>
              <v-chip-group
                mandatory
                v-model="selectedGood.ids"
              >
                <v-chip
                  v-for="good in allGoods"
                  :key="good.groupId"
                  color="cyan lighten-1"
                  :value="{groupId:good.groupId,commodityId:good.commodityId}"
                  filter
                >
                 {{ good.name }}
                </v-chip>
              </v-chip-group>
          </v-card-text>
          <v-divider/>
          <v-card-text>
            <v-avatar
              tile
              style="float:right"
              size="140"
            >
              <img :src="selectGoodPreview"/>
            </v-avatar>
          </v-card-text>
          <v-card-text>
            剩余数量: {{remainNum}}
          </v-card-text>
          <v-card-text>
            商品描述: {{ selectedDescription }}
          </v-card-text>
          <v-card-text>
            商品单价: {{ price }}
          </v-card-text>
          <v-divider/>
          <v-card-text>
            <v-form
              ref="form"
            >
              <v-text-field
                type="number"
                v-model="selectedGood.num"
                :rules="[rules.min,rules.max]"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              icon
              color="pink darken-3"
              @click="cartDialog = false"
            >
              <v-icon>mdi-bookmark-remove-outline</v-icon>
            </v-btn>
            <v-spacer/>
            <v-btn
              text
              color="orange darken-3"
              @click="addCommodityToCart"
            >
              加入购物车
            </v-btn>
            <v-btn
              text
              color="light-blue darken-3"
              @click="buyCommodity"
            >
              购买
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <v-dialog
        v-model="dialog"
        persistent
        max-width="1000px"
        style="z-index: 1501;"
      >
        <v-card>
          <v-card-subtitle>
            <v-container>
              <p class="headline" style="margin-top: 30px;">请输入帖子标题</p>
                  <v-text-field
                    maxlength="25"
                    v-model="editTitle"
                  />
            </v-container>
          </v-card-subtitle>
          <v-card-subtitle>
            <v-container>
              <p class="headline">请输入帖子内容</p>
            </v-container>
          </v-card-subtitle>
          <v-card-text>
            <v-container>
              <mavon-editor v-model="editContent"
                :toolbars="toolbars"
              />
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="indigo lighten-1"
                  text
                  @click="dialog = false">
              关闭
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="indigo lighten-1"
              text
              :disabled="disableSubmitDiscussion"
              @click="editPost">
              提交
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

<!--  投诉界面-->
  <v-dialog
    v-model="reportDialog"
    persistent
    max-width="1000px"
    style="z-index: 1501;"
  >
    <v-card>
      <v-card-subtitle>
        <v-container>
          <p class="headline">请输入投诉帖子的内容</p>
        </v-container>
      </v-card-subtitle>
      <v-card-text>
        <v-container>
          <mavon-editor v-model="reportContent"
                        :toolbars="toolbars"
          />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="indigo lighten-1"
               text
               @click="closeReportArea">
          关闭
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="indigo lighten-1"
          text
          :disabled="disableSubmitReport"
          @click="submitReport">
          提交
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

<!--显示隐藏其他按钮-->
  <div class="show-btn">
    <v-btn
      color="indigo"
      fab
      dark
      large
      class="my-2"
      @click="expand = !expand"
    >
      <v-icon v-if="!expand">mdi-arrow-up-bold</v-icon>
      <v-icon v-else>mdi-arrow-down-bold</v-icon>
    </v-btn>
  </div>



      <!-- 评论功能 -->
      <div class="comment-btn" v-if="expand" :key="1">
        <v-btn
          color="indigo"
          fab
          dark
          large
          class="my-2"
          @click="dialogOfComment = !dialogOfComment"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    <!--      购物车-->
    <div class="cart-btn" v-if="(curUserId !== postOwnerId) && (type === 'sell') && (expand)" :key="4">
      <v-btn
        color="cyan"
        class="my-2"
        fab
        dark
        large
        @click="cartDialog = true"
      >
        <v-icon dark>
          mdi-cart-variant
        </v-icon>
      </v-btn>
    </div>
    <!-- 卖家修改货物界面 -->
    <div class="cart-check-btn" v-if="(curUserId === postOwnerId) && (type === 'sell') && (expand)" :key="5">
      <v-btn
        color="cyan"
        class="my-2"
        fab
        dark
        large
        @click="goodDialog = !goodDialog"
      >
        <v-icon dark>
          mdi-cart-variant
        </v-icon>
      </v-btn>
    </div>
    <!--    投诉功能-->
    <div class="report-btn" v-if="expand" :key="6">
      <v-btn
        color="orange lighten-2"
        fab
        dark
        large
        class="my-2"
        @click="reportDialog = true"
      >
        <v-icon>mdi-alert</v-icon>
      </v-btn>
    </div>
<!--      删除功能-->
      <div class="delete-btn" v-if="(postDelPermissions)" :key="2">
        <v-btn
          class="my-2"
          fab
          dark
          large
          color="red"
          @click="deletePost"
        >
          <v-icon dark>
            mdi-delete
          </v-icon>
        </v-btn>
      </div>
<!--      编辑帖子-->
      <div class="edit-btn" v-if="(curUserId === postOwnerId) && (expand)" :key="3">
        <v-btn
          color="cyan"
          class="my-2"
          fab
          dark
          large
          @click="dialog=!dialog"
        >
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
      </div>


      <v-dialog
        v-model="dialogOfComment"
        persistent
        max-width="1000px"
        style="z-index: 1501;"
      >
        <v-card>
          <v-card-subtitle>
            <v-container>
              <p class="headline" style="margin-top: 30px;">请输入评论内容</p>
            </v-container>
          </v-card-subtitle>
          <v-card-text>
            <v-container>
              <mavon-editor v-model="commentContent"
                :toolbars="toolbars"
              />
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="indigo lighten-1"
                  text
                  @click="closeCommentEditor">
              关闭
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="indigo lighten-1"
              text
              :disabled="checkComment"
              @click="commentPost">
              提交
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-dialog>
</v-container>
</template>

<script>
import {
  postOpenReq,
  postDelReq,
  postEditReq,
  commentsReq,
  commentFirstNewReq,
  postIdTagReq,
  postIdTagAddReq,
  postIdTagDeleteReq,
  postIdCommodityReq,
  postIdCommodityNewReq,
  postIdCommodityBuyReq,
  postReportReq,
  postIdCartReq,
  postsNewImgReq
} from '@/api/post'
import store from '@/store';
import { mavonEditor } from "mavon-editor";
import router from '@/router';
import PostCommentsView from '@/components/Post/PostCommentsView.vue';
import {actionFailed, actionPostFailed, actionSuccess} from "@/components/ActionState";
import PostGoodTable from "@/components/Post/PostGoodTable.vue"

export default {
  name:"PostFullView",
  components: {
    mavonEditor,
    PostCommentsView,
    PostGoodTable
  },
  data() {
    return {
      postImgs: [],
      reportDialog: false,
      reportContent: "",
      expand: false,
      tagInfo:{
        usedTags:[
        ],
        modify:false,
        unUsedTags:[
        ]
      },
      content: null,
      title: null,
      username: null,
      postOwnerId: null,
      curUserId: store.getters['user/id'],
      dialog:false,
      editContent: null,
      editTitle: null,
      dialogOfComment: false,
      commentContent: null, //发布评论内容
      comments: null, //所有评论
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
      selectedGood:{ids:{},num:0},
      allGoods:[
        ],
      cartDialog:false,
      rules:{
          min:v => Number(v) > 0 || '数量应该大于0',
          max: v => Number(v) <= this.remainNum || '数量应该小于最大数量'
      },
      goodDialog: false,
      editDialog: false,

    }
  },
  props: {
    postId: {
      type: String,
      require: true,
    }
  },
  methods: {
    submitReport() {
      let vm = this;
      postReportReq('post', {
        content: this.reportContent
      }, this.postId).then(res => {
        if (res.data.success) {
          vm.reportContent = "";
          vm.reportDialog = false;
          actionSuccess(res);
        } else {
          vm.reportDialog = false;
          actionPostFailed(res);
        }
      }).catch(err => {
        vm.reportDialog = false;
        actionFailed();
      })
    },
    closeReportArea() {
      this.reportContent = "";
      this.reportDialog = false;
    },
    addTag(tagName){
      const vm = this
      postIdTagAddReq('post',{tagName:tagName},this.postId).then(res => {
        if (res.data.success) {
          vm.tagInfo.unUsedTags = res.data.data.tags
          vm.tagInfo.usedTags.push({tagName:tagName})
          actionSuccess(res);
          vm.loadTags()
        } else {
          vm.$store.commit("snack/setState",{snackShow:true,snackMsg:res.data.message,snackType:"error"})
        }
      })
    },
    deleteTag(tagName) {
      const vm = this
      postIdTagDeleteReq('delete',{tagName:tagName},this.postId).then(res => {
        if (res.data.success) {
          vm.tagInfo.unUsedTags = res.data.data.tags;
          vm.tagInfo.usedTags = vm.tagInfo.usedTags.filter(each => each.tagName !== tagName);
          actionSuccess(res);
          vm.loadTags()
        } else {
          vm.$store.commit("snack/setState",{snackShow:true,snackMsg:res.data.message,snackType:"error"})
        }
      })
    },
    loadPost() {
      const vm = this;
      postOpenReq('get',{}, this.postId).then( res => {
        vm.content=res.data.data.content;
        vm.title=res.data.data.title;
        vm.username=res.data.data.username;
        vm.postImgs = [];
        vm.postImgs.push(res.data.data.postImg);
        vm.postOwnerId=res.data.data.postOwnerId;
        vm.editTitle = res.data.data.title;
        vm.editContent = res.data.data.content;
        vm.tagInfo.tags = res.data.data.tags
      }).catch(err => {
        //调试，以后改成错误提示
        actionFailed();
      })
    },
    loadTags() {
      const vm = this
      postIdTagReq('get',{},this.postId).then(res => {
        if (res.data.success) {
          vm.tagInfo.usedTags = res.data.data.usedTags
          vm.tagInfo.unUsedTags = res.data.data.unUsedTags
        } else {
          vm.$store.commit("snack/setState",{snackShow:true,snackMsg:res.data.message,snackType:"error"})
        }
      }).catch(err => {
        actionFailed();
        console.log(err)
      })
    },
    loadGoods() {
      postIdCommodityReq("get",{},this.postId).then(res => {
        const vm = this
        if (res.data.success) {
          vm.allGoods = res.data.data.goods
        }else {
          actionPostFailed(res)
        }
      }).catch(err => {
        actionFailed()
      })
    },
    deletePost() {
      const vm = this
      postDelReq('delete', {}, vm.postId).then(res => {
        actionSuccess(res);
        router.push({name: this.type});
      }).catch(err => {
        actionFailed();
      })
    },
    editPost() {
      const vm = this;
      postEditReq('put', {
        title: vm.editTitle,
        content: vm.editContent
      }, vm.postId).then(res => {
        vm.dialog = false;
        actionSuccess(res);
        router.push({name: "buy"});
      }).catch(err => {
        console.log("error in editPost");
        vm.title = vm.editTitle;
        vm.content = vm.editContent;
        vm.dialog = false;
        actionFailed();
      })
    },
    commentPost() {
      let vm = this;
      commentFirstNewReq('post', {
        content: vm.commentContent,
      }, vm.postId).then((res) => {
        vm.loadComments();
        vm.commentContent = "";
        vm.dialogOfComment = false;
        actionSuccess(res);
      }).catch(err => {
        vm.commentContent = "";
        vm.dialogOfComment = false;
        actionFailed();
      })
      this.loadComments();
    },
    closeCommentEditor() {
      this.dialogOfComment = false;
      this.commentContent = "";
    },
    loadComments() {
      const vm = this;
      commentsReq("get", {}, vm.postId).then((res) => {
        vm.comments = res.data.data.comments;
      }).catch((err) => {
        actionFailed();
        console.log("error in loadComments")
      });
    },
    buyCommodity() {
      if (!this.$refs.form.validate())
        return
      postIdCommodityBuyReq("post",{goods:[{num:Number(this.selectedGood.num),...this.selectedGood.ids}]},this.postId).then(res => {
        if (!res.data.success) {
          actionPostFailed(res)
        } else {
          actionSuccess({data:{message:'下单成功,等待卖家确认'}})
        }
      }).catch(err => {
        console.log(err)
      })
      this.cartDialog = false
    },
    addCommodity(item) {
      const vm = this
      postIdCommodityNewReq("post",item,this.postId).then(res => {
        if (res.data.success) {
          let id = res.data.data.commodityId
          let form = new window.FormData()
          form.append("commodityId",id?id:1)
          form.append("img",item.img)
          postsNewImgReq("post",form, this.type).then(res2 => {
            if (res2.data.success) {
              vm.loadGoods()
            } else {
              this.actionPostFailed(res2)
            }
          }).catch(err2 => {
            throw err2
          })
        } else {
          this.$router.go(0)
          this.actionPostFailed(res)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    modifyCommodity(item) {
      const vm = this
      postIdCommodityReq("put",{groupId:item.groupId,num:Number(item.num)},this.postId).then(res => {
        if (res.data.success) {
          vm.loadGoods()
          this.$router.go(0)
        } else {
          this.$router.go(0)
          this.actionPostFailed(res)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    deleteCommodity(item) {
      const vm = this
      postIdCommodityReq("delete",{groupId:item.groupId},this.postId).then(res => {
        if (res.data.success) {
          this.$router.go(0)
          vm.loadGoods()
        } else {
          this.$router.go(0)
          this.actionPostFailed(res)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addCommodityToCart() {
      postIdCartReq("post",{goods:[{num:Number(this.selectedGood.num),...this.selectedGood.ids}]},this.postId).then(res => {
        if (!res.data.success) {
          actionPostFailed(res)
        } else {
          actionSuccess({data:{message:'记得去购物车看看哟'}})
        }
      }).catch(err => {
        console.log(err)
      })
      this.cartDialog = false
    }
  },
  mounted() {
    this.loadPost();
    this.loadTags();
    this.loadComments();
    if (this.type === "sell") {
      this.loadGoods();
    }
  },
  computed:{
    disableSubmitDiscussion() {
      //检查帖子是否合法
      return this.editContent == null || this.editContent === ""
      || this.editTitle == null || this.editTitle === "";
    },
    checkComment() {
      return this.commentContent === null || this.commentContent === "";
    },
    postDelPermissions() {
      return this.curUserId === this.postOwnerId || this.$store.getters["user/role"] === "admin";
    },
    type() {
      return this.$route.meta.type
    },
    remainNum() {
      return this.allGoods.filter(each => each.groupId === this.selectedGood.ids.groupId)[0]?.num
    },
    selectedDescription() {
      return this.allGoods.filter(each => each.groupId === this.selectedGood.ids.groupId)[0]?.description
    },
    disableSubmitReport() {
      return this.reportContent === null || this.reportContent === "";
    },
    price() {
      return this.allGoods.filter(each => each.groupId === this.selectedGood.ids.groupId)[0]?.price
    },
    postGoodImgs() {
      return this.allGoods.map(item => item.img);
    },
    selectGoodPreview() {
      return this.allGoods.filter(each => each.groupId === this.selectedGood.ids.groupId)[0]?.img
    }
  },
}
</script>

<style scoped>
.show-img-slide {
  margin-top: 30px;
}

.edit-btn, .delete-btn, .comment-btn, .cart-btn, .cart-check-btn, .show-btn, .report-btn{
  position: fixed;
  display: inline-grid;
  z-index: 9999;
}

.comment-btn {
  right: 1.5em;
  bottom: 6.5em;
}

.cart-check-btn {
  right: 1.5em;
  bottom: 16.5em;

}
.edit-btn {
  right: 1.5em;
  bottom: 21.5em;
}

.delete-btn {
  right: 6.5em;
  bottom: 1.5em;
}

.cart-btn {
  right: 1.5em;
  bottom: 16.5em;
}

.show-btn {
  right: 1.5em;
  bottom: 1.5em;
}

.report-btn {
  right: 1.5em;
  bottom: 11.5em;
}

.comments {
  margin-top: 50px;
  margin-bottom: 50px;
}

.markdown {
  margin: 0 auto;
  border: none !important;
  background-color: white !important;
  min-height: 0px;
  border-left-width: 0px;
  z-index: 0;
}

</style>
