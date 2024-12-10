<template>
  <el-col :span="6" :offset="offset"> <!-- 修改 span 值，调整卡片宽度 -->
    <el-card :body-style="{ padding: '0px' }" class="card">
      <div class="image-container">
        <img :src="imageUrl" class="image" />
      </div>
      <div style="padding: 14px;">
        <span class="title">{{ title }}</span>
        <div class="bottom clearfix">
          <time class="time">{{ description }}</time>
          <el-button type="text" class="button" @click="handleClick">entry</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    offset: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
    };
  },
  methods: {
    handleClick() {
      // 在点击时触发父组件传入的事件，并传递 index 或其他数据
      this.$emit('card-clicked', {index: this.index, title: this.title});
      console.log("点击了");
    }
  }
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 使容器宽高相等，保持正方形 */
  overflow: hidden; /* 隐藏超出容器的部分 */
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* 保证图片填满正方形容器 */
  object-fit: cover; /* 保持图片的纵横比，裁剪超出部分 */
  border-radius: 6px; /* 让图片的四个角变得圆滑 */
}

.title {
  font-weight: bold; /* 加粗标题 */
  font-size: 16px;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.card {
  transition: all 0.3s ease; /* 添加平滑的过渡效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 给卡片添加阴影 */
  border-radius: 6px; /* 圆角效果 */
}

.card:hover {
  transform: translateY(-10px); /* 鼠标悬浮时卡片提升 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 悬浮时增加阴影效果 */
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
