<template>
  <!-- 注册商品 -->
  <div class="dialog">
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

              // 获取原文件的名称
              const originalFile = this.uploadfile;

              // 获取文件扩展名（例如 .jpg, .png）
              const fileExtension = originalFile.name.split('.').pop().toLowerCase();

              // 根据扩展名设置新的文件名
              const newFileName = this.commodity_id + 'good.' + fileExtension;

              // 创建一个新的 File 实例，重命名文件
              const newFile = new File([originalFile], newFileName, {
                type: originalFile.type, // 保留文件的 MIME 类型
              });


              // 创建 FormData 实例，确保文件和其他数据一起上传
              const pictureData = new FormData();
              pictureData.append('id', this.commodity_id); // 假设 id 是 2
              pictureData.append('homepage', newFile); // 传递新文件

              axios.post('http://47.93.172.156:8081/commodity/upload', pictureData)
                  .then((response) => {
                    if (response.status === 200) {
                      console.log('llllll')
                    } else {
                      console.log('pppppp')
                    }
                  })
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

      this.$router.push({ path: '/account' });

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
/* 完全合并的弹窗样式 */
.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 居中显示 */
  box-sizing: border-box; /* 确保内外边距计算正确 */
  z-index: 1001; /* 弹窗置于上层 */
  padding: 35px; /* 默认内边距 */
  opacity: 0; /* 初始透明度 */
  animation: zoomIn 0.5s ease forwards; /* 弹窗显示动画 */
  max-width: 95%; /* 最大宽度 */
  width: 800px; /* 默认宽度 */
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.8)); /* 渐变背景 */
  border-radius: 20px; /* 圆角 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15); /* 阴影效果 */
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica Neue', Arial, sans-serif; /* 字体 */
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
