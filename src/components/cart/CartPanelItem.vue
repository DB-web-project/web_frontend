<template>
  <v-card
    outlined
  >
    <v-card-title>
        <div
          @click.stop=""
          class="shrink"
        >
          <v-checkbox
            v-model='checkAll'
            :key="cart.postId"
            @click="changeAllCheck"
            class="shrink"
          ></v-checkbox>
        </div>
        <v-icon
          class="shrink"
          color="primary"
          style="padding-right:5px"
        >
          mdi-store
        </v-icon>
        <ul
          class="text-h5 shrink"
          :color="'grey darken-3'"
          @click="jumpToPost()"
        >帖子: {{cart.postTitle}}</ul>
    </v-card-title>

    <v-card-text
      v-for="good in cart.goods"
      :key="good.commodityId"
    >
      <v-container
        fluid
      >
        <v-row>
            <v-checkbox
              v-model='selfGoods'
              :key="cart.postId+'___'+good.trolleyId"
              :value="good.trolleyId"
              class="shrink"
              style="display:inline-block;margin-right:5%"
              @change="checkGood"
            ></v-checkbox>
            <cart-good-item
              :cart="cart"
              :good="good"
              :selfGoods="selfGoods"
              style="display:inline-block"
              v-on:reload="$emit('reload')"
            />
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import CartGoodItem from "@/components/cart/CartGoodItem.vue"

export default {
  name: "CartPanelItem",
  components: {CartGoodItem},
  props: {
    cart: {
      type: Object,
      default: {},
      required: true,
    },
    selectedGoods: {
      type: Array,
      default: [],
      required: true
    },

  },
  data: () => {
    return {
      checkAll:false,
      selfGoods: [],
      editable:{}
    }
  },
  methods: {
    checkGood() {
      let flag = true
      this.cart.goods.forEach(element => {
        if (this.selfGoods.indexOf(element.trolleyId) === -1) {
          flag = false;
          let record = this.selectedGoods.indexOf(element.trolleyId)
          if (record !== -1) {
            this.selectedGoods.splice(record,1)
          }
        }
      });
      this.checkAll = flag
      flag = false
      this.selfGoods.forEach(element => {
        if (this.selectedGoods.indexOf(element) === -1) {
          this.selectedGoods.push(element)
        }
      })
    },
    changeAllCheck() {
      if (this.checkAll == true) {
        this.cart.goods.forEach(element => {
          let record = this.selectedGoods.indexOf(element.trolleyId)
          if (record === -1) {
            this.selectedGoods.push(element.trolleyId)
          }
          if (this.selfGoods.indexOf(element.trolleyId) === -1) {
            this.selfGoods.push(element.trolleyId)
          }
        })
      } else {
        this.cart.goods.forEach(element => {
          let record = this.selectedGoods.indexOf(element.trolleyId)
          if (record !== -1) {
            this.selectedGoods.splice(record,1)
          }
          record = this.selfGoods.indexOf(element.trolleyId)
          if (this.selfGoods.indexOf(element.trolleyId) !== -1) {
            this.selfGoods.splice(record,1)
          }
        })
      }
    },
    jumpToPost() {
      this.$router.push({path: `/ground/sell/${this.cart.postId}`})
    }
  },
  watch: {
  }
}
</script>

<style>

</style>
