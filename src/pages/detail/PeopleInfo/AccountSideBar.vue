<!--<template>-->
<!--  <v-card style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">-->
<!--    <v-list-item two-line>-->
<!--      <v-list-item-avatar>-->
<!--        <img :src="avatar">-->
<!--      </v-list-item-avatar>-->

<!--      <v-list-item-content>-->
<!--        <v-list-item-title>{{ username }}</v-list-item-title>-->
<!--      </v-list-item-content>-->
<!--    </v-list-item>-->

<!--      <v-divider></v-divider>-->

<!--      &lt;!&ndash; <v-list dense>-->
<!--        <v-list-item-->
<!--          v-for="item in items"-->
<!--          :key="item.title"-->
<!--        >-->
<!--          <v-list-item-icon>-->
<!--            <v-icon>{{ item.icon }}</v-icon>-->
<!--          </v-list-item-icon>-->

<!--          <v-list-item-content>-->
<!--            <v-list-item-title @click="changeLink(item.link)" class="nav-title">-->
<!--              {{ item.title }}-->
<!--            </v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
<!--      </v-list> &ndash;&gt;-->
<!--      <v-list shaped style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">-->
<!--      <v-list-item-group-->
<!--        v-model="selectedItem"-->
<!--        color="primary"-->
<!--      >-->
<!--        <v-list-item-->
<!--          v-for="item in items"-->
<!--          :key="item.title"-->
<!--          @click="changeLink(item.link)"-->
<!--        >-->
<!--          <v-list-item-icon>-->
<!--            <v-icon v-text="item.icon"></v-icon>-->
<!--          </v-list-item-icon>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title class="nav-title">-->
<!--              {{ item.title }}-->
<!--            </v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
<!--      </v-list-item-group>-->
<!--    </v-list>-->
<!--  </v-card>-->
<!--</template>-->

<!--<script>-->
<!--import store from '@/store'-->
<!--import router from '@/router'-->
<!--  export default {-->
<!--    name: "AccountSideBar",-->
<!--    data () {-->
<!--      return {-->
<!--        items: [-->
<!--          { title: '个人信息', icon: 'mdi-account', link: 'accountInfo'},-->
<!--          { title: '修改邮箱', icon: 'mdi-home-city', link:'changeEmail'},-->
<!--          { title: '修改密码', icon: 'mdi-account', link:'changePassword'},-->
<!--          { title: '修改用户名', icon: 'mdi-account', link: 'changeUserName'},-->
<!--        ],-->
<!--      }-->
<!--    },-->
<!--    computed: {-->
<!--      selectedItem: {-->
<!--        get: function() {-->
<!--          return this.items.findIndex(item => item.link === router.history.current.name);-->
<!--        },-->
<!--        set: function(/*v*/) {-->

<!--        }-->
<!--      },-->
<!--      username() {-->
<!--        return store.getters['user/name']-->
<!--      },-->
<!--      avatar() {-->
<!--        return store.getters['user/avatar']-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      changeLink(link) {-->
<!--        this.$emit("childChangeLink", link);-->
<!--      }-->
<!--    },-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->
<!--.nav-title:hover {-->
<!--  text-decoration:underline;-->
<!--  cursor: pointer;-->
<!--  transform: scale(1.05);-->
<!--  transition: all .2s ease-in-out;-->
<!--}-->
<!--.nav-title {-->
<!--  padding-left: 3px;-->
<!--}-->
<!--</style>-->

<template>
  <div>
    <div  style="width:14%;height: 130px;border-radius: 100px;display:inline-block;">
      <img
          style="width:100%;height: 100%;border-radius: 100px"
          src="/static/temporary/headpic.jpg"
          class="image"
      >
    </div>

    <br>
    <br>
    <el-descriptions :column="1" border>

      <el-descriptions-item label="用户名" v-model="username" ><p class="message">{{username}}</p></el-descriptions-item>
      <el-descriptions-item label="邮箱号" v-model="email" class="message"><p class="message">{{email}}</p></el-descriptions-item>
      <el-descriptions-item label="白洞值" v-model="level" class="message"><p class="message">{{level}}</p></el-descriptions-item>
      <el-descriptions-item label="座右铭" v-model="motto" class="message" ><p class="message">{{motto}}</p></el-descriptions-item>
      <el-descriptions-item label="居住地" v-model="city" class="message"><p class="message">{{city}}</p></el-descriptions-item>

    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "showinfo",
  data(){
    return{
      username: "Huterox",
      email: 18100000000,
      motto: "除非我不想赢，否则没人能让我输",
      city: "九江",
      level: 9999

    }
  }
}
</script>

<style scoped>
.message{
  width: 20em;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>