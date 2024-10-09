<template>
  <v-container
    fluid
  >

    <v-row v-if="carts?.length === 0" justify="center" align="center" style="min-height: 300px;">
      <v-card-title class="no-comment">
        当前购物车暂无物品
      </v-card-title>
    </v-row>

    <template
      v-for="cart in carts"
    >
      <cart-panel-item
        :selectedGoods="selectedGoods"
        :cart="cart"
        :key="cart.postId"
        v-on:reload="loadCart"
        style="margin:0% 5% 3% 0%"
      />
    </template>

  <div >
    <v-btn
      color="indigo"
      fab
      dark
      large
      class="my-2 buy-btn"
      @click="buyGood"
    >
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </div>

    <div >
    <v-btn
      color="error"
      fab
      dark
      large
      class="my-2 delete-btn"
      @click="deleteGood"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </div>
  </v-container>
</template>

<script>
import {cartReq} from "@/api/cart.js"
import CartPanelItem from "@/components/cart/CartPanelItem.vue"
import {actionFailed, actionPostFailed, actionSuccess} from "@/components/ActionState";

// {
//   postId:1,
//     postTitle:"test1",
//   goods:[
//   {
//     trolleyId:1,
//     name:"计算机组成原理",
//     num:1,
//     price:20,
//     commodityId:1,
//     img:"https://static.nike.com.cn/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f895b4a9-ed56-45ee-b078-314622e4cce2/air-jordan-1-retro-high-og-%E5%A4%8D%E5%88%BB%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-Xk3sJX.png"
//   },
//   {
//     trolleyId:3,
//     name:"计算机",
//     num:1,
//     price:20,
//     commodityId:3,
//     img:"https://static.nike.com.cn/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f895b4a9-ed56-45ee-b078-314622e4cce2/air-jordan-1-retro-high-og-%E5%A4%8D%E5%88%BB%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-Xk3sJX.png"
//   }
// ]
// },
// {
//   postId:2,
//     postTitle:"test2",
//   goods:[
//   {
//     trolleyId:2,
//     name:"计算机组成原理",
//     num:1,
//     price:20,
//     commodityId:2,
//     img:"https://static.nike.com.cn/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f895b4a9-ed56-45ee-b078-314622e4cce2/air-jordan-1-retro-high-og-%E5%A4%8D%E5%88%BB%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-Xk3sJX.png"
//   }
// ]
// }

export default {
  name:"MyCartView",
  components:{CartPanelItem},
  data : () => {
    return{
      carts: [],
      selectedGoods:[],
    }
  },
  methods: {
    loadCart() {
      const vm = this
      cartReq('get',{}).then(res => {
        if (res.data.success) {
          vm.carts = res.data.data.carts
        } else {
          actionPostFailed(res)
        }
      }).catch(err => {
        actionFailed();
      })
    },
    allGoodSelected(cart) {
      let ret = true
      cart.goods.forEach(element => {
        if (!this.selectedGoods[element.trolleyId]) {
          ret = false
        }
      })
      return ret
    },
    buyGood() {
      const vm = this
      cartReq('post',{'goods':this.postData}).then(res => {
        if (res.data.success) {
          this.$router.go(0)
        } else {
          actionPostFailed(res)
        }
      }).catch(err => {
        console.log(err)
        vm.loadCart()
      })
    },
    deleteGood() {
      const vm = this
      cartReq('delete',this.postData).then(res => {
        if (res.data.success) {

        } else {
          actionPostFailed(res)
        }
        vm.loadCart()
      }).catch(err => {
        actionFailed()
        vm.loadCart()
      })
    }
  },
  computed: {
    postData () {
      let ret = []
      this.selectedGoods.forEach(element => {
        ret.push({trolleyId:element})
      })
      return ret
    }
  },
  mounted() {
    this.loadCart()
  }
}
</script>

<style scoped>
.buy-btn, .delete-btn{
  position: fixed;
  display: inline-grid;
  z-index: 9999;
}

.buy-btn {
  right: 1.5em;
  bottom: 1.5em;
}

.delete-btn {
  right: 1.5em;
  bottom: 6.5em;
}

.no-comment {
  font-size: xx-large;
  color: gray;
  opacity: 0.5;
}
</style>
