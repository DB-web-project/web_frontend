<template>
  <div class="dialog-backdrop">
    <div class="dialog">
      <!-- 左侧图片 -->
      <div class="dialog-left">
        <img :src="card.url" alt="Card Image" />
      </div>

      <!-- 右侧内容 -->
      <div class="dialog-right">
        <!-- 文案部分 -->
        <div class="dialog-text">
          <h2>{{ card.name }}</h2>
          <p>{{ card.introduction }}</p>
        </div>
        <hr class="divider" />


        <!-- 商家信息 -->
        <div class="business-info">
          <h4>商家: {{ businessName }}</h4>
        </div>

        <hr class="divider" />

        <!-- 价格 -->
        <div class="price-section">
          <h4>Price: ￥{{ card.price }}</h4>
        </div>

        <!-- 评分显示 -->
        <div class="score-section">
          星级: <span class="score-value">{{ card.score }}</span> score
        </div>


        <!-- 星级评分 -->
        <div class="rating-header">
          <h4>你的评分</h4>
        </div>
        <div class="rating-section">
          <StarRating :initialRating="rating" @rating-selected="handleRating" />
          <p class="rating-display">{{ rating }} stars</p>
        </div>


      <!-- 关闭按钮 -->
      <button class="close-button" @click="$emit('close-dialog')">×</button>
    </div>
  </div>
  </div>
</template>

<script>
import StarRating from './Score.vue';
export default {
  name: "CardDialog",
  components: { StarRating },
  props: {
    card: Object, // 接收卡片数据
  },
  data() {
    return {
      comments: [],
      newComment: "",
      canDelete: true,
      rating: 0, // 当前星级评价
      businessName: "", // 商家名称
    };
  },

  mounted() {
    this.loadBusinessInfo();
  },

  methods: {
    // 加载商家信息
    async loadBusinessInfo() {
      try {
        const response = await fetch(`http://47.93.172.156:8081/business/find/${this.card.bussiness_id}`);
        if (response.ok) {
          const data = await response.json();
          this.businessName = data.name || "Unknown Business";
        } else {
          console.error("Failed to fetch business data");
        }
      } catch (error) {
        console.error("Error fetching business info:", error);
        this.businessName = "Unknown Business";
      }
    },

    // 处理星级评分
    handleRating(selectedRating) {
      this.rating = selectedRating; // 更新星级评价
      console.log(`Rated ${selectedRating} stars for card ${this.card.id}`);
    },

    async getUserInfo(userId) {
      try {
        // 根据 userId 获取用户信息，分别查找用户、商家或管理员
        let userInfo = {};
        // 尝试从用户接口获取信息
        const userResponse = await fetch(`http://47.93.172.156:8081/user/find/${userId}`);
        if (userResponse.ok) {
          userInfo = await userResponse.json();
        } else {
          // 如果没有找到用户信息，尝试从商家接口获取
          const businessResponse = await fetch(`http://47.93.172.156:8081/business/find/${userId}`);
          if (businessResponse.ok) {
            userInfo = await businessResponse.json();
          } else {
            // 如果商家也没有，尝试从管理员接口获取
            const adminResponse = await fetch(`http://47.93.172.156:8081/admin/find/${userId}`);
            if (adminResponse.ok) {
              userInfo = await adminResponse.json();
            }
          }
        }

        return {
          username: userInfo.name || "Unknown User",
          avatar: userInfo.avatar || "https://via.placeholder.com/150",
        };
      } catch (error) {
        console.error("Error fetching user info:", error);
        return {
          username: "Unknown User",
          avatar: "https://via.placeholder.com/150",
        };
      }
    },
  },
};
</script>

<style scoped>

* {
  font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* 背景遮罩 */
.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 弹窗主体 */
.dialog {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  width: 1000px;
  height: 1000px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  font-family: "Arial", "Helvetica", sans-serif;
  color: #333;
}

/* 左侧图片 */
.dialog-left {
  flex: 3;
}

.dialog-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

/* 右侧内容 */
.dialog-right {
  flex: 2;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

/* 文案部分 */
.dialog-text {
  margin-bottom: 20px; /* 增加一些底部间距 */
}

.dialog-text h2 {
  font-size: 28px; /* 增加标题字体大小 */
  font-weight: 700; /* 强调标题 */
  margin-bottom: 15px;
  color: #333; /* 颜色改为深灰，避免太突兀 */
}

.dialog-text p {
  font-size: 16px;
  line-height: 1.8; /* 增加行距，提升可读性 */
  color: #555; /* 使用稍微浅一些的灰色 */
}

/* 分割线 */
.divider {
  border: 0;
  height: 1px;
  background: #e0e0e0;
  margin: 20px 0;
}

/* 评论标题固定 */
.comments-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  padding: 10px 0;
  text-align: center;
  font-size: 22px; /* 增加标题字号 */
  font-weight: bold;
  color: #444;
  border-bottom: 1px solid #ddd; /* 增加分隔线 */
}

/* 关闭按钮 */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 22px; /* 增大关闭按钮字体 */
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.close-button:hover {
  color: #000;
}

/* 价格区域 */
.price-section {
  margin-bottom: 20px;
  font-size: 20px; /* 增加价格字体大小 */
  font-weight: 600; /* 稍微加粗价格，突出显示 */
  color: #333;
}

/* 商家信息 */
.business-info {
  margin-bottom: 20px;
  font-size: 18px; /* 商家信息稍微大一点 */
  color: #777; /* 使用更浅的颜色 */
}

/* 评分部分 */
.score-section, .rating-display {
  margin-bottom: 20px;
  font-size: 20px; /* 统一字体大小 */
  font-weight: 600; /* 统一字体加粗 */
  color: #333; /* 统一字体颜色 */
}

/* 显示评分的文本 */
.score-value {
  font-weight: bold;
  color: #ff9800; /* 使用橙色显示评分 */
  font-size: 22px; /* 评分值稍微加大 */
}

/* 星级评分部分 */
.rating-section .rating-display {
  font-size: 20px; /* 统一评分的显示字体大小 */
  font-weight: 600; /* 统一字体加粗 */
  color: #333; /* 统一字体颜色 */
}

.rating-section .score-value {
  font-size: 22px; /* 星级评分稍微加大 */
  color: #ff9800; /* 使用橙色显示评分 */
}

</style>
