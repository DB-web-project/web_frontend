<template>
      <v-card
        :color="selfGoods.indexOf(good.trolleyId) === -1 ? 'blue-grey lighten-5' : 'light-blue lighten-2'"
        style="width:75%;padding:1% 0%;margin-right:0%"
      >
        <v-row>
          <v-col
            sm="3"
            md="2"
            lg="2"
          >
            <v-avatar
              color="grey"
              size="100"
              tile
              style="margin-left:10%"
            >
              <v-img :src="good.img"></v-img>
            </v-avatar>
          </v-col>
          <v-col
            sm="9"
            md="10"
            lg="10"
          >
            <v-card-title
              style="padding-top:0% !important"
            >
              商品: &nbsp; {{good.name}}
            </v-card-title>

            <v-card-text
            >

              <p class="text-h6" style="display:inline-block;margin-top:1%">
                ￥ {{good.price}}
              </p>
                <v-btn
                  style="float:right;"
                  @click="changeEdit"
                  v-if="!editable"
                  text
                  outlined
                  top
                >
                  <ul
                    style="padding-top:17px"
                  >
                    x<p class="text-h6" style="display:inline-block;"> {{good.num}} </p>
                  </ul>
                </v-btn>
                <v-text-field
                  v-if="editable"
                  style="float:right;"
                  outlined
                  v-model="good.num"
                  label="test"
                  @blur="changeNum()"
                  @keyup.enter="changeNum()"
                  ref="input"
                >
                </v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>


</template>

<script>
import {cartReq} from "@/api/cart.js"
import {actionPostFailed} from "@/components/ActionState";
export default {
  name:"CartGoodItem",
  props:{
    cart:{
      type: Object,
      default: {},
      required: true
    },
    good: {
      type: Object,
      default: {},
      required: true
    },
    selfGoods: {
      type: Array,
      default: [],
      required: true
    }
  },
  data: () => {
    return {
      editable:false
    }
  },
  methods: {
    changeNum() {
      const vm = this
      this.editable = false
      cartReq("put",{
        trolleyId: this.good.trolleyId,
        num: this.good.num
      }).then(res => {
        if (res.success) {

        } else {
          actionPostFailed(res)
        }
        vm.$emit("reload")
      }).catch(err => {
        console.log(err)
        vm.$emit("reload")
      })
    },
    changeEdit() {
      this.editable = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
  }
}
</script>

<style>

</style>
