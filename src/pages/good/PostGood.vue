<template>
  <!-- 注册商品 -->
  <div class="post-dialog card-dialog">
    <div class="post-content">
      <!-- 左侧图片预览 -->
      <div class="image-preview" v-if="postImage">
        <img :src="postImage" alt="图片预览" />
      </div>

      <!-- 右侧内容输入 -->
      <div class="input-section">
        <!-- 图片上传 -->
        <div class="upload-section">
          <input type="file" id="upload" @change="handleImageUpload" />
          <label for="upload">上传图片</label>
        </div>

        <!-- 标题输入 -->
        <input
            type="text"
            v-model="commodity_name"
            placeholder="请输入商品名称"
            class="post-title-input"
        />

        <!-- 标题输入 -->
        <input
            type="number"
            v-model="commodity_price"
            placeholder="请输入商品价格"
            class="post-title-input"
        />

        <!-- 文案输入 -->
        <textarea
            v-model="commodity_description"
            placeholder="请输入商品介绍"
        ></textarea>
      </div>
    </div>

    <!-- 发布按钮 -->
    <button class="post-button" @click="publishPost">
      发布
    </button>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      postImage: null,               // 上传的商品图片
      commodity_name: '',            // 商品名称
      commodity_price: '',           // 商品价格
      commodity_description: '',     // 商品描述
      uploadfile: null,
      commodity_id: 0,
    };
  },
  methods: {
    // 处理图片上传
    handleImageUpload(event) {
      const file = event.target.files[0]; // 获取上传的文件
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.postImage = reader.result; // 将图片转换为 base64 并显示在预览中
          this.uploadfile = file
        };
        reader.readAsDataURL(file); // 读取文件为 DataURL
      }
    },

    // 发布商品
    publishPost() {
      if (!this.commodity_name || !this.commodity_price || !this.commodity_description) {
        alert('请填写所有商品信息！');
        return;
      }

      // 模拟商品发布逻辑
      const postData = {
        name: this.commodity_name,
        price: this.commodity_price,
        introduction: this.commodity_description,
        business_id: sessionStorage.getItem('id'),
      };

      // 发送数据到后台 (假设是一个 API 请求)
      axios.post('http://47.93.172.156:8081/commodity/register', postData)
          .then((response) => {
            if (response.status === 201) {
              this.commodity_id = response.data.id
              const pictureData = {
                id: this.commodity_id,
                homepage: this.uploadfile,
              };
              axios.post('http://47.93.172.156:8081/commodity/upload', pictureData)
              alert('商品发布成功！');
              // 清空表单
              this.resetForm();
              this.$message.success('注册商品成功');

            } else {
              alert('商品发布失败，请稍后再试！');
            }
          })
          .catch((error) => {
            console.error(error);
            alert('商品发布失败，请稍后再试！');
          });
    },

    // 重置表单
    resetForm() {
      this.postImage = null;
      this.commodity_name = '';
      this.commodity_price = '';
      this.commodity_description = '';
    },
  },
};
</script>



<style scoped>
/* 容器样式 */
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  z-index: 1;
  min-height: 100vh;
  width: 100%;
}

/* 背景模糊遮罩 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 100;
}

/* 卡片容器 */
.cards-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 60px;
  width: 100%;
}

/* 帖子弹窗样式 */
.card-dialog-old {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5); /* 初始缩放比例 */
  opacity: 0; /* 初始透明度 */
  animation: zoomIn 0.5s ease forwards;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 101; /* 保证弹窗位于遮罩层上方 */
}



/* 弹窗样式 */
.card-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9); /* 让弹窗略微缩小，避免过大 */
  opacity: 0; /* 初始透明度 */
  animation: zoomIn 0.5s ease forwards;
  background: #fff;
  border-radius: 8px;
  padding: 35px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 101; /* 保证弹窗位于遮罩层上方 */
  max-width: 95%; /* 弹窗宽度最大占据屏幕的95% */
  width: 800px; /* 增大弹窗宽度 */
}

/* 发布帖子弹窗样式 */
.post-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.8));
  border-radius: 20px;
  width: 90%; /* 弹窗宽度设为90% */
  max-width: 900px; /* 增加最大宽度 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  padding: 40px; /* 增加内边距 */
  box-sizing: border-box;
}

/* 其他内容区域样式 */
.post-content {
  display: flex;
  padding: 20px;
  justify-content: space-between;
}

.image-preview {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 250px;
}

.image-preview img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.input-section {
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

textarea {
  padding: 18px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid #e1e1e1;
  min-height: 150px;
  resize: vertical;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

textarea:focus {
  border-color: #0078d4;
  box-shadow: 0 0 5px rgba(0, 120, 212, 0.5);
  outline: none;
}

.post-title-input {
  padding: 16px 20px;
  font-size: 20px;
  border-radius: 12px;
  border: 1px solid #e1e1e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: #333;
}

.post-title-input:focus {
  border-color: #0078d4;
  box-shadow: 0 0 5px rgba(0, 120, 212, 0.5);
  outline: none;
}

.upload-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.upload-section input {
  font-size: 18px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s ease;
}

.upload-section input:focus {
  border-color: #0078d4;
  box-shadow: 0 0 5px rgba(0, 120, 212, 0.5);
}

.post-button {
  margin-top: 30px;
  padding: 14px 28px;
  background-color: #0078d4;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-button:hover {
  background-color: #005fa3;
  transform: translateY(-2px);
}

.post-button:active {
  transform: translateY(1px);
}

/* 卡片动画 */
@keyframes zoomIn {
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
