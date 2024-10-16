<template>
  <v-card class="edit-personal-info" style="background-color: #f5f7fa;">
    <v-card-title class="title-bar" style="background-color: #42b883; color: white; text-align: center; padding: 16px;">
      个人信息
    </v-card-title>

    <v-card-text class="content">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 sm6 md6>
            <v-text-field
                label="用户名"
                v-model="username"
                readonly
                prepend-icon="mdi-account"
                :rules="[v => !!v || '用户名不能为空',]"
                outline
            ></v-text-field>

            <!-- 注意：原描述中的下拉菜单并未在图中明确显示，这里省略 -->

            <v-text-field
                label="学号"
                v-model="studentId"
                readonly
                prepend-icon="mdi-school"
                :rules="[v => !!v || '学号不能为空',]"
                outline
            ></v-text-field>

            <!-- 用户ID或编号部分并未在图中明确显示，这里省略 -->

            <v-text-field
                label="电子邮箱"
                v-model="email"
                readonly
                prepend-icon="mdi-email"
                :rules="[v => !!v || '电子邮箱不能为空', v => v.includes('@') || '电子邮箱格式不正确',]"
                outline
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md6 style="text-align: center;">
            <v-avatar class="avatar" size="150">
              <img :src="avatar" alt="用户头像">
            </v-avatar>
            <v-file-input
                label="修改头像"
                accept="image/*"
                @change="onAvatarChange"
                hide-details
            ></v-file-input>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="modifyInfo">修改信息</v-btn>
      <v-btn color="accent" @click="submitInfo">提交</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      username: 'dongfeng', // 假设用户名是从服务器获取的，这里只是示例
      studentId: '23373177', // 假设学号是从服务器获取的，这里只是示例
      email: '2373177@buaa.edu.cn', // 注意：原文字中的邮箱地址有误，这里已更正为图中显示的地址
      avatar: require('@/assets/img/alipay.png'), // 默认头像路径，需要替换为你的项目中的路径
      avatarFiles: null, // 用来存储用户上传的头像文件
    };
  },
  methods: {
    onAvatarChange (files) {
      this.avatarFiles = files[0]; // 获取用户上传的第一个文件
      // 你可以在这里添加代码来处理头像上传，比如通过API发送到服务器
    },
    modifyInfo () {
      // 实现修改信息的逻辑，比如通过API发送到服务器
      alert('修改信息功能尚未实现');
    },
    submitInfo () {
      // 实现提交信息的逻辑，比如通过API发送到服务器
      alert('提交信息功能尚未实现');
    },
  },
};
</script>

<style scoped>
.title-bar {
  font-size: 1.25rem;
  font-weight: bold;
}

.content {
  padding: 16px;
}

.avatar {
  margin-top: 24px;
}
</style>