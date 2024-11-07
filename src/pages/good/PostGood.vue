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
        />
      </div>

      <div class="form-group">
        <label for="introduction">商品介绍</label>
        <textarea
            id="introduction"
            v-model="form.introduction"
            placeholder="请输入商品介绍"
            required
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-button">提交商品</button>
      </div>
    </form>

    <div v-if="isSuccess" class="success-message">
      商品发布成功！感谢您的提交。
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        price: '',
        introduction: '',
        business_id: sessionStorage.getItem('id'),
      },
      isSuccess: false,
    };
  },
  methods: {
    submitForm() {
      // Simulate a successful form submission
      this.isSuccess = true;

      // Optionally, you could send the data to a backend API
      console.log('提交的商品信息：', this.form);

      // Reset form after submission (optional)
      setTimeout(() => {
        this.form = { name: '', price: '', introduction: '', business_id: '' };
        this.isSuccess = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.post-good-container {
  max-width: 800px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.post-good-header {
  text-align: center;
  margin-bottom: 40px;
}

.post-good-header h1 {
  font-size: 32px;
  font-weight: bold;
  color: #4c8c27;
}

.post-good-header p {
  font-size: 16px;
  color: #6a9e3f;
}

.post-good-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #6a9e3f;
  box-shadow: 0 0 8px rgba(106, 158, 63, 0.2);
  outline: none;
}

.form-group textarea {
  resize: vertical;
  height: 150px;
}

.form-actions {
  text-align: center;
}

.submit-button {
  padding: 14px 32px;
  font-size: 18px;
  background: linear-gradient(145deg, #6a9e3f, #4c8c27);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.submit-button:hover {
  background: linear-gradient(145deg, #5a8e35, #43721a);
  transform: translateY(-4px);
}

.submit-button:active {
  background: linear-gradient(145deg, #4b7b2e, #39601d);
  transform: translateY(2px);
}

.success-message {
  background-color: #4c8c27;
  color: white;
  padding: 16px;
  text-align: center;
  margin-top: 40px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
}
</style>
