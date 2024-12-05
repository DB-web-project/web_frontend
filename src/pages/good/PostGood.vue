<template>
  <div class="post-good-container">
    <div class="post-good-header">
      <h1>发布商品</h1>
      <p>请填写商品信息，以便我们帮助您更好地展示商品。</p>
    </div>

    <form @submit.prevent="submitForm" class="post-good-form">
      <div class="form-group">
        <label for="name">商品名称</label>
        <input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="请输入商品名称"
            required
            class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="price">商品价格</label>
        <input
            type="number"
            id="price"
            v-model="form.price"
            placeholder="请输入商品价格"
            required
            class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="introduction">商品介绍</label>
        <textarea
            id="introduction"
            v-model="form.introduction"
            placeholder="请输入商品介绍"
            required
            class="form-textarea"
        ></textarea>
      </div>

      <!-- 图片上传功能 -->
      <div class="form-group">
        <label for="image">商品图片</label>
        <input
            type="file"
            id="image"
            @change="handleImageUpload"
            accept="image/*"
            class="form-input-file"
        />
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Image Preview" />
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-button">提交商品</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: '',
        price: 0,
        introduction: '',
        business_id: sessionStorage.getItem('id'),
        image: null,  // 存储上传的图片
      },
      imagePreview: null,  // 图片预览
      isSuccess: false,
      commodity_id: 0,
    };
  },
  methods: {
    submitForm() {
      this.isSuccess = true;
      const formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('price', this.form.price);
      formData.append('introduction', this.form.introduction);
      formData.append('business_id', this.form.business_id);


      // 发送表单数据到后端 API
      axios.post('http://47.93.172.156:8081/commodity/register', formData)
          .then((res) => {
            if (res.status === 201) {
              console.log('注册商品的第一步成功')
              this.commodity_id = res.data.id
              axios.post('http://47.93.172.156:8081/commodity/upload', {
                id: this.commodity_id,
                picture: this.form.image,
              })
              this.$message.success('商品注册成功');
            } else {
              this.$message.error('商品注册失败');
            }
          })
          .catch(err => {
            if (err.response && err.response.status === 400) {
              this.$message.error('注册商品失败');
            } else {
              console.error(err);
              this.$message.error('注册商品过程中发生错误');
            }
          });

    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.image = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
  },
};
</script>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Crimson Pro', serif;
  background-color: #f9f9f9;
  color: #333;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.post-good-container {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 960px;
  padding: 40px 40px;
  text-align: left;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.post-good-header {
  margin-bottom: 30px;
  text-align: center;
}

.post-good-header h1 {
  font-size: 2.5rem;
  font-family: 'Playfair Display', serif;
  color: #333;
  font-weight: 700;
  margin-bottom: 10px;
}

.post-good-header p {
  font-size: 1.1rem;
  color: #777;
}

.form-group {
  margin-bottom: 25px;
  width: 100%;
}

label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
  display: block;
}

.form-input,
.form-textarea,
.form-input-file {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  background-color: #f7f7f7;
  color: #333;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-input-file:focus {
  border-color: #007bff;
  outline: none;
}

.form-textarea {
  resize: vertical;
  min-height: 150px;
}

.form-actions {
  margin-top: 35px;
  display: flex;
  justify-content: center;
}

.submit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 14px 36px;
  border-radius: 25px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 250px;
}

.submit-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #28a745;
  color: #fff;
  border-radius: 8px;
  font-size: 1.1rem;
  text-align: center;
}

.image-preview {
  margin-top: 20px;
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #ddd;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .post-good-container {
    width: 90%;
    padding: 25px;
  }

  .post-good-header h1 {
    font-size: 2rem;
  }

  .submit-button {
    width: 100%;
    padding: 14px;
  }
}



</style>
