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
          <img :src="avator" alt="User Avatar" class="avatar" />
          <span class="username">{{ businessName }}</span>
        </div>

        <hr class="divider" />

        <!-- 价格 -->
        <div class="price-section">
          <h4>价格: ￥{{ card.price }}</h4>
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
          <p class="rating-display">{{ des }}</p>
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
      avator:null,
      des:"未知评分"
    };
  },
  mounted() {
    this.initRate();
    this.loadBusinessInfo();
    this.getUserInfo(JSON.parse(sessionStorage.getItem('id')),"Business")
  },

  methods: {
    ratingDescription(x) {
      console.log(x)
      if (x === '0') {
        this.des = "未评分"
      }
      if (x === '1') {
        this.des = "令人失望"
      }
      if (x === '2') {
        this.des = "不尽人意"
      }
      if (x === '3') {
        this.des = "马马虎虎"
      }
      if (x === '4') {
        this.des = "继续努力"
      }
      if (x === '5') {
        this.des = "非常满意"
      }
      console.log(x)
      console.log(this.des)
    },
    async initRate(){
      const ratingData = {
        commodity_id: this.card.id,    // 卡片的 ID
        user_id: JSON.parse(sessionStorage.getItem('id'))
      };

      // 发送 POST 请求到后端接口
      fetch('http://47.93.172.156:8081/scores/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // 请求体类型是 JSON
        },
        body: JSON.stringify(ratingData)      // 将评分数据转为 JSON 格式
      })
          .then(response => {
            if (response.ok) {
              return response.json();  // 解析响应为 JSON 格式
            }
            throw new Error('Failed to submit rating');
          })
          .then(data => {
            console.log(data)
            if (data.score === -1) {
              this.rating = 0
            }
            else {
              this.rating = data.score
              console.log(this.rating)
            }
            this.ratingDescription(String(this.rating))
            console.log('Rating init successfully:', data);
            // 你可以在此处处理返回的数据，例如提示用户评分成功等
          })
          .catch(error => {
            console.error('Error init rating:', error);
            // 处理错误，例如提示用户提交失败
          });
    } ,
    // 加载商家信息
    async loadBusinessInfo() {
      try {
        const response = await fetch(`http://47.93.172.156:8081/business/find/${this.card.business_id}`);
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
      this.ratingDescription(this.rating)
      console.log(this.rating)
      console.log(this.des)
      console.log(`Rated ${selectedRating} stars for card ${this.card.id}`);

      // 创建评分数据
      const ratingData = {
        commodity_id: this.card.id,    // 卡片的 ID
        score: this.rating,   // 用户选择的评分
        user_id: JSON.parse(sessionStorage.getItem('id'))
      };

      // 发送 POST 请求到后端接口
      fetch('http://47.93.172.156:8081/commodity/update_score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // 请求体类型是 JSON
        },
        body: JSON.stringify(ratingData)      // 将评分数据转为 JSON 格式
      })
          .then(response => {
            if (response.ok) {
              return response.json();  // 解析响应为 JSON 格式
            }
            throw new Error('Failed to submit rating');
          })
          .then(data => {
            let number = Number(data.score);
            console.log('Rating submittedssss successfully:', data.score);
            this.card.score = parseFloat(number.toFixed(1));
            console.log('Rating submitted successfully:', data);
            // 你可以在此处处理返回的数据，例如提示用户评分成功等
          })
          .catch(error => {
            console.error('Error submitting rating:', error);
            // 处理错误，例如提示用户提交失败
          });
    },
    async getUserInfo(userId,type) {
      try {
        // 2. 根据 userId 获取用户信息，分别查找用户、商家或管理员
        let userInfo = {};
        let Response = null
        if (type === "User") {
          Response = await fetch(`http://47.93.172.156:8081/user/find/${userId}`);
        }
        else if (type === "Admin") {
          Response = await fetch(`http://47.93.172.156:8081/admin/find/${userId}`);
        }
        else {
          Response = await fetch(`http://47.93.172.156:8081/business/find/${userId}`);
        }
        userInfo = await Response.json();
        // 尝试从用户接口获取信息
        // const userResponse = await fetch(`http://47.93.172.156:8081/user/find/${userId}`);
        // if (userResponse.ok) {
        //   userInfo = await userResponse.json();
        // } else {
        //   // 如果没有找到用户信息，尝试从商家接口获取
        //   const businessResponse = await fetch(`http://47.93.172.156:8081/business/find/${userId}`);
        //   if (businessResponse.ok) {
        //     userInfo = await businessResponse.json();
        //   } else {
        //     // 如果商家也没有，尝试从管理员接口获取
        //     const adminResponse = await fetch(`http://47.93.172.156:8081/admin/find/${userId}`);
        //     if (adminResponse.ok) {
        //       userInfo = await adminResponse.json();
        //     }
        //   }
        // }

        this.avator = userInfo.avator

        return {
          username: userInfo.name || "Unknown User",
          avatar: userInfo.avator || "https://via.placeholder.com/150",
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

.business-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

/* 用户头像 */
.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
}

/* 用户名 */
.username {
  font-size: 26px;
  font-weight: bold;
  color: #333;
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
  margin-bottom: 20px; /* 增加底部间距 */
  text-align: center; /* 文案居中，增加艺术感 */
}

.dialog-text h2 {
  font-size: 30px; /* 略微增大字体 */
  font-weight: bold;
  margin-bottom: 12px; /* 调整间距 */
  color: #222;
  font-family: "Georgia", "Times New Roman", serif; /* 使用艺术字体 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  letter-spacing: 1px; /* 增加字间距，提升高级感 */
}

.dialog-text p {
  font-size: 23px; /* 增大字体，提升阅读体验 */
  line-height: 1.8; /* 增加行距，提升可读性 */
  color: #555;
  font-family: "Palatino Linotype", "Book Antiqua", serif; /* 使用优雅字体 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* 轻微阴影，让文字更柔和 */
  margin-top: 10px;
  margin-bottom: 15px; /* 均匀分布段落间距 */
  text-align: justify; /* 对齐段落，增加美感 */
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
