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
      },
      isSuccess: false,
    };
  },
  methods: {
    submitForm() {
      this.isSuccess = true;

      // Send form data to backend API
      axios.post('http://127.0.0.1:3000/commodity/register', {
        name: this.form.name,
        price: this.form.price,
        introduction: this.form.introduction,
        business_id: this.form.business_id,
      }).then((res) => {
        if (res.status === 201) {
          this.$message.success('商品注册成功');
        } else {
          this.$message.success('商品注册失败');
        }
      }).catch(err => {
        if (err.response && err.response.status === 400) {
          this.$message.error('注册商品失败');
        } else {
          console.error(err);
          this.$message.error('注册商品过程中发生错误');
        }
      });
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
  background-color: #2b2d2f;
  color: #d1d1d1;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.post-good-container {
  background-color: #3a3d41;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 80%;
  max-width: 800px;
  padding: 30px;
  text-align: center;
}

.post-good-header {
  margin-bottom: 20px;
}

.post-good-header h1 {
  font-size: 2.5rem;
  font-family: 'Playfair Display', serif;
  color: #ff9f00;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.post-good-header p {
  font-size: 1.1rem;
  color: #d1d1d1;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 1.1rem;
  font-weight: bold;
  color: #d1d1d1;
  margin-bottom: 5px;
  display: block;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #444;
  background-color: #2f3539;
  color: #d1d1d1;
  border-radius: 8px;
  font-size: 1rem;
}

.form-input:focus, .form-textarea:focus {
  border-color: #ff9f00;
  outline: none;
}

.form-textarea {
  resize: vertical;
  min-height: 150px;
}

.form-actions {
  margin-top: 20px;
}

.submit-button {
  background-color: #ff9f00;
  color: #2b2d2f;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 200px;
}

.submit-button:hover {
  background-color: #e68a00;
  transform: scale(1.05);
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #4b8b3b;
  color: white;
  border-radius: 8px;
  font-size: 1.1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .post-good-container {
    width: 95%;
  }

  .post-good-header h1 {
    font-size: 2rem;
  }

  .submit-button {
    width: 100%;
  }
}
</style>
