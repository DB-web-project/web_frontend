<template>
  <div class="body">
    <div class="rating">
      <!-- 星级5 -->
      <input type="radio" id="star5" name="rate" value="5" v-model="currentRating" @change="emitRating" />
      <label for="star5" title="text">
        <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="star-solid">
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
        </svg>
      </label>

      <!-- 星级4 -->
      <input type="radio" id="star4" name="rate" value="4" v-model="currentRating" @change="emitRating" />
      <label for="star4" title="text">
        <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="star-solid">
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
        </svg>
      </label>

      <!-- 星级3 -->
      <input type="radio" id="star3" name="rate" value="3" v-model="currentRating" @change="emitRating" />
      <label for="star3" title="text">
        <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="star-solid">
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
        </svg>
      </label>

      <!-- 星级2 -->
      <input type="radio" id="star2" name="rate" value="2" v-model="currentRating" @change="emitRating" />
      <label for="star2" title="text">
        <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="star-solid">
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
        </svg>
      </label>

      <!-- 星级1 -->
      <input type="radio" id="star1" name="rate" value="1" v-model="currentRating" @change="emitRating" />
      <label for="star1" title="text">
        <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="star-solid">
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
        </svg>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "StarRating",
  props: {
    // 接收父组件传递的初始评分
    initialRating: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 当前评分的状态，初始化为父组件传递的值
      currentRating: this.initialRating
    };
  },
  watch: {
    // 监听 initialRating 的变化
    initialRating(newRating) {
      this.currentRating = newRating;
    }
  },
  methods: {
    // 当评分改变时，通知父组件
    emitRating() {
      this.$emit("rating-selected", this.currentRating);
    },
    setRating(newRating) {
      this.currentRating = newRating; // 手动更新当前评分
    },
  }
};
</script>

<style scoped lang="css">
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8e8e8;
}

.rating:not(:checked) > input {
  position: absolute;
  appearance: none;
}

.rating:not(:checked) > label {
  float: right;
  cursor: pointer;
  font-size: 30px;
  fill: #666;
}

.rating:not(:checked) > label > svg {
  fill: #666;
  /* Set default color for SVG */
  transition: fill 0.3s ease;
  /* Add a transition effect */
}

.rating > input:checked + label:hover,
.rating > input:checked + label:hover ~ label,
.rating > input:checked ~ label:hover,
.rating > input:checked ~ label:hover ~ label,
.rating > label:hover ~ input:checked ~ label {
  fill: #e58e09;
}

.rating:not(:checked) > label:hover,
.rating:not(:checked) > label:hover ~ label {
  fill: #ff9e0b;
}

.rating > input:checked ~ label > svg {
  fill: #ffa723;
  /* Set color for selected stars */
}

.rating:not(:checked) > label > svg {
  fill: #666; /* 默认未选中的星星颜色 */
}

.rating > input:checked ~ label > svg {
  fill: #ffa723; /* 选中的星星颜色 */
}

.rating > input:checked + label:hover ~ label > svg,
.rating:not(:checked) > label:hover ~ label > svg {
  fill: #ff9e0b; /* 悬停时高亮 */
}
</style>
