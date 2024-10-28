<template>
  <div>
    <div class="PersonTop">
      <div class="PersonTop_img">
        <img src="@/assets/img/alipay.png" alt="User Avatar" />
      </div>
      <div class="PersonTop_text">
        <div class="user_text">
          <div class="user_name">
            <span>{{ nickname }}</span>
          </div>
          <div class="user-v">
            <img src="@/assets/img/logo.png" class="user-v-img" />
            <span class="user-v-font">优质媒体作者</span>
          </div>
          <div class="user_qianming">
            <span>个人签名</span>
          </div>
          <div class="user_anniu">
            <el-button
                class="el-icon-edit"
                type="primary"
                size="medium"
                plain
            >编辑</el-button>
            <el-button
                type="primary"
                size="medium"
                icon="el-icon-check"
            >已关注</el-button>
          </div>
        </div>
        <div class="user_num">
          <div @click="myfan">
            <div class="num_number">1000</div>
            <span class="num_text">粉丝</span>
          </div>
          <div @click="myfollow">
            <div class="num_number">500</div>
            <span class="num_text">关注</span>
          </div>
          <div>
            <div class="num_number">200</div>
            <span class="num_text">获赞</span>
          </div>
        </div>
      </div>
    </div>
    <div class="person_body">
      <div class="person_body_left">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span class="person_body_list" style="border-bottom: none"
            >个人中心</span
            >
          </div>
          <el-menu
              router
              active-text-color="#00c3ff"
              class="el-menu-vertical-demo"
          >
            <el-menu-item
                index="info"
                :route="{ name: 'info', params: $route.params.id }"
            >
              <i class="el-icon-user"></i>
              <span slot="title">个人简介</span>
            </el-menu-item>
            <el-menu-item
                index="myarticle"
                :route="{ name: 'myarticle', params: $route.params.id }"
            >
              <i class="el-icon-edit-outline"></i>
              <span slot="title">发帖</span>
            </el-menu-item>
            <el-menu-item
                index="mycollect"
                :route="{ name: 'mycollect', params: $route.params.id }"
            >
              <i class="el-icon-document"></i>
              <span slot="title">收藏</span>
            </el-menu-item>
            <el-menu-item
                index="myfan"
                :route="{ name: 'myfan', params: $route.params.id }"
            >
              <i class="el-icon-tableware"></i>
              <span slot="title">粉丝</span>
            </el-menu-item>
            <el-menu-item
                index="myfollow"
                :route="{ name: 'myfollow', params: $route.params.id }"
            >
              <i class="el-icon-circle-plus-outline"></i>
              <span slot="title">关注</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </div>
      <div class="person_body_right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import PersonalDia from "./PersonalDia.vue";

import axios from "axios";

export default {
  components: { /*PersonalDia*/ },
  name: "Personal",
  data() {
    return {
      // Static data
      avatar: "/path/to/default/avatar.png",
      nickname: "",
      v: 3,
      design: "个人签名",
      followCounts: "500",
      fanCounts: "1000",
      goodCounts: "200",
      email: "",
      preference: null,
      avator: "",
      url_switch_login: '',
    };
  },
  created() {
    if (JSON.parse(sessionStorage.getItem('roles')) === "用户") {
      this.url_switch_login = 'http://127.0.0.1:3000/user/find/'
    } else if (JSON.parse(sessionStorage.getItem('roles')) === "管理员") {
      this.url_switch_login = 'http://127.0.0.1:3000/admin/find/'
    } else if (JSON.parse(sessionStorage.getItem('roles')) === "商家") {
      this.url_switch_login = 'http://127.0.0.1:3000/business/find/'
    }
    this.fetchUserInfo(JSON.parse(sessionStorage.getItem('id')));
  },
  methods: {
    fetchUserInfo(id) {
      axios.get(this.url_switch_login + `${id}`, id)
          .then(response => {
            const data = response.data;
            this.email = data.email;
            this.nickname = data.name;
            this.preference = data.preference;
            this.avator = data.avator;
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
    },
    myfan() {
      // Method for handling fan click
    },
    myfollow() {
      // Method for handling follow click
    },
  },
};
</script>

<style scoped>
.me-video-player {
  background-color: transparent;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  position: fixed;
  left: 0;
  z-index: 0;
  top: 0;
}
.PersonTop {
  width: 1000px;
  height: 140px;
  padding-top: 20px;
  background-color: white;
  margin-top: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  border-radius: 5px;
}

.PersonTop_img {
  width: 150px;
  height: 120px;
  background-color: #8c939d;
  margin-right: 24px;
  margin-left: 20px;
  overflow: hidden;
  border-radius: 20px;
}

.PersonTop_img img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.PersonTop_text {
  height: 120px;
  width: 880px;
  display: flex;
}

.user_text {
  width: 60%;
  height: 100%;
  line-height: 30px;
}

.user_name {
  font-weight: bold;
}
.user-v {
  margin-bottom: -5px;
}
.user-v-img {
  width: 15px;
  height: 15px;
}
.user-v-font {
  font-size: 15px;
  color: #00c3ff;
}
.user_qianming {
  font-size: 14px;
  color: #999;
}

.user_num {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
}

.user_num > div {
  text-align: center;
  border-right: 1px dotted #999;
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  line-height: 20px;
}

.num_text {
  color: #999;
}

.num_number {
  font-size: 20px;
  color: #333;
}
.el-menu-item>span {
  font-size: 16px;
  color: #999;
}

/*下面部分样式*/
.person_body {
  width: 1000px;
  margin-top: 210px;
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

.person_body_left {
  width: 27%;
  height: 600px;
  border-radius: 5px;
  margin-right: 3%;
  text-align: center;
}

.person_body_list {
  width: 100%;
  height: 50px;
  margin-top: 25px;
  font-size: 22px;
  border-bottom: 1px solid #f0f0f0;
  background-image: -webkit-linear-gradient(
      left,
      rgb(42, 134, 141),
      #e9e625dc 20%,
      #3498db 40%,
      #e74c3c 60%,
      #09ff009a 80%,
      rgba(82, 196, 204, 0.281) 100%
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;
}

.el-menu-item {
  margin-top: 22px;
}

.person_body_right {
  width: 70%;
  /* height: 500px; */
  border-radius: 5px;
  background-color: white;
}

.box-card {
  height: 500px;
}

/*ui样式*/
.el-button {
  width: 84px;
}
</style>

