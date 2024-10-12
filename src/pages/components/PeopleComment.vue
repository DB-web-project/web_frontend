<template>
  <div class="store-review">
    <h2>商店评价系统</h2>

    <div class="store-form">
      <input
          type="text"
          v-model="storeName"
          placeholder="商店名称"
      />
      <button @click="addStore">添加商店</button>
    </div>

    <div v-if="stores.length > 0" class="store-list">
      <div
          class="store-item"
          v-for="(store) in stores"
          :key="store.id"
      >
        <h3>{{ store.name }}</h3>
        <div class="rating">
          <span>平均评分: {{ calculateAverageRating(store.id) }}</span>
        </div>

        <div class="review-form">
          <input
              type="number"
              v-model.number="newRating"
              min="1"
              max="5"
              placeholder="评分 (1-5)"
          />
          <textarea
              v-model="newComment"
              placeholder="写下你的评价"
          ></textarea>
          <button @click="addReview(store.id)">提交评价</button>
        </div>

        <div class="reviews">
          <h4>评论:</h4>
          <ul>
            <li v-for="(review, idx) in store.reviews" :key="idx">
              <strong>评分: {{ review.rating }}</strong>
              <p>{{ review.comment }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreReview',
  data() {
    return {
      storeName: '',
      newRating: null,
      newComment: '',
      stores: [],
    };
  },
  methods: {
    addStore() {
      if (this.storeName.trim()) {
        this.stores.push({
          id: Date.now(),
          name: this.storeName.trim(),
          reviews: [],
        });
        this.storeName = '';
      }
    },
    addReview(storeId) {
      if (this.newRating && this.newComment.trim()) {
        const store = this.stores.find(s => s.id === storeId);
        if (store) {
          store.reviews.push({
            rating: this.newRating,
            comment: this.newComment.trim(),
          });
          this.newRating = null;
          this.newComment = '';
        }
      }
    },
    calculateAverageRating(storeId) {
      const store = this.stores.find(s => s.id === storeId);
      if (store && store.reviews.length > 0) {
        const total = store.reviews.reduce((sum, review) => sum + review.rating, 0);
        return (total / store.reviews.length).toFixed(1); // 保留一位小数
      }
      return '无评分';
    },
  },
};
</script>

<style scoped>
.store-review {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.store-form,
.review-form {
  margin-bottom: 20px;
}

input,
textarea {
  width: calc(100% - 20px);
  padding: 10px;
  margin-top: 10px;
}

button {
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.store-list {
  margin-top: 20px;
}

.store-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.reviews {
  margin-top: 10px;
}
</style>