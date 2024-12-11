<template>
  <el-col :span="6" :offset="offset"> <!-- 修改 span 值，调整卡片宽度 -->
    <el-card :body-style="{ padding: '0px' }" class="card">
      <div class="image-container">
        <img :src="imageUrl" class="image" />
      </div>
      <div style="padding: 14px;">
        <span class="title">{{ title }}</span>
        <div class="rating-container">
          <!-- 根据评分显示星星 -->
          <span v-for="n in 5" :key="n" class="star" :class="{'filled': n <= fullStars}">
            &#9733; <!-- 完整的星星符号 -->
          </span>
          <!-- 半颗星 -->
          <span v-if="hasHalfStar" class="star half">
            &#9733; <!-- 半颗星 -->
          </span>
        </div>
        <div class="bottom clearfix">
          <time class="time">{{ description }}</time>
          <el-button type="text" class="button" @click="handleClick">click</el-button>
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
  computed: {
    // 将评分转换为数字
    rating() {
      return parseFloat(this.description) || 0; // 如果无法转换为数字，则默认为 0
    },
    // 完整的星星数量
    fullStars() {
      return Math.floor(this.rating); // 获取评分的整数部分
    },
    // 是否需要半颗星
    hasHalfStar() {
      return this.rating % 1 >= 0.5; // 判断评分的小数部分是否大于等于 0.5
    }
  },
  methods: {
    handleClick() {
      this.$emit('card-clicked', {index: this.index, title: this.title});
      console.log("点击了");
    }
  }
};
</script>

<style scoped>
.time {
  font-size: 20px;
  font-weight: bold;
  color: #d30808;
  display: block;
  margin-top: 4px;
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
  padding-top: 75%; /* 调整为 75% 以拉长图片容器 */
  overflow: hidden;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.title {
  font-weight: bold;
  font-size: 16px;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.card {
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

/* 新增的星星样式 */
.rating-container {
  margin-top: 8px;
  font-size: 18px;
}

.star {
  color: #ccc; /* 未选中的星星为灰色 */
}

.star.filled {
  color: #f5a623; /* 选中的星星为橙色 */
}

/* 半颗星的样式 */
.star.half {
  color: #f5a623;
  position: relative;
}

.star.half::after {
  content: '\2605'; /* Unicode 星星符号 */
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  overflow: hidden;
  color: #ccc; /* 半颗星的颜色为灰色 */
}
</style>
