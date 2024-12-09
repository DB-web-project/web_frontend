<template>
  <div class="search-bar-container" :class="{ active: !isActive }">
    <img
        src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/magnifier-512.png"
        alt="magnifier"
        class="magnifier"
        @click="toggleSearch"
    />
    <input
        type="text"
        class="input"
        placeholder="Search ..."
        v-model="inputValue"
        @input="onInputChange"
        :disabled="!isActive"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inputValue: this.modelValue,
      isActive: false, // 搜索框是否激活
    };
  },
  watch: {
    // 当输入框值改变时通知父组件
    inputValue(newValue) {
      this.$emit("update:modelValue", newValue);
    },
    // 父组件输入内容更新时，更新搜索框的内容
    modelValue(newValue) {
      this.inputValue = newValue;
    },
  },
  methods: {
    toggleSearch() {
      this.isActive = !this.isActive; // 切换激活状态
      if (!this.isActive) {
        this.inputValue = ""; // 关闭时清空输入框
        this.$emit("update:modelValue", "");
      }
    },
    clearSearch() {
      this.inputValue = ""; // 清空输入框内容
      this.$emit("update:modelValue", "");
    },
    onInputChange() {
      // 当输入框内容变更时实时触发
      this.$emit("search-input", this.inputValue);
    },
  },
};
</script>

<style scoped>
.search-bar-container {
    display: flex;
    align-items: center;
    background-color: aliceblue;
    padding: 5px;
    width: 400px;
    height: 50px;
    border-radius: 50px;
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.2),
      -6px -6px 10px rgba(255, 255, 255, 0.7);
    margin : 0 auto;
    position: relative;
    transition: width 1.5s;
}

.magnifier {
    width: 25px;
    cursor: pointer;
    position: absolute;
    left: 13px;
}

.mic-icon {
    width: 30px;
    position: absolute;
    right: 10px;
    transition: width 0.4s;
    transition-delay: 1s;
}

.input {
    background-color: transparent;
    border: none;
    margin: 10px 50px;
    width: 100%;
    outline: none;
    color: rgb(100, 100, 100);
    transition: width 1s;
    transition-delay: 0.5s;
    font-weight: bold;
}

.active.search-bar-container {
    width: 50px;
}

.active .input {
    width: 0;
}

.active .mic-icon {
    width: 0;
}
</style>
