<template>
  <v-container
    fluid
  >
  <v-tabs
    vertical
  >
    <v-tab>
      <v-icon left color="primary">
        mdi-progress-helper
      </v-icon>
      进行中
    </v-tab>
    <v-tab>
      <v-icon left color="success">
        mdi-progress-check
      </v-icon>
       已完成
    </v-tab>
    <v-tab-item>
        <v-list two-line>
          <v-list-item-group
            multiple
          >
            <template
              v-for="(order,index) in proceeding"
            >
              <v-list-item
                :key="order.target + order.name + order.num"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="'商品名: '+order.name"
                    />

                    <v-list-item-subtitle
                      v-text="'卖家: '+order.target"
                      class="text--primary"
                    >
                    </v-list-item-subtitle>

                      <v-list-item-content
                        v-text="'数量: x'+order.num"
                        class="text--primary"

                      >
                      </v-list-item-content>

                      <v-list-item-content
                        v-text="'总价: '+order.price"
                        class="text--primary"
                      >
                      </v-list-item-content>
                  </v-list-item-content>
                </template>
              </v-list-item>
              <v-divider
                v-if="index < proceeding.length - 1"
                :key="index"

              ></v-divider>
            </template>

          </v-list-item-group>
        </v-list>
      </v-tab-item>
      <v-tab-item>
        <v-list two-line>
          <v-list-item-group
            multiple
          >
            <template
              v-for="(order,index) in finished"
            >
              <v-list-item
                :key="order.target + order.name + order.num"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="'商品名: '+order.name"
                    />

                    <v-list-item-subtitle
                      v-text="'卖家: '+order.target"
                      class="text--primary"
                    >
                    </v-list-item-subtitle>

                      <v-list-item-content
                        v-text="'数量: x'+order.num"
                        class="text--primary"

                      >
                      </v-list-item-content>

                      <v-list-item-content
                        v-text="'总价: '+order.price"
                        class="text--primary"
                      >
                      </v-list-item-content>
                  </v-list-item-content>
                </template>
              </v-list-item>
              <v-divider
                v-if="index < finished.length - 1"
                :key="index"

              ></v-divider>
            </template>

          </v-list-item-group>
        </v-list>
      </v-tab-item>
  </v-tabs>
  </v-container>
</template>

<script>
import { orderReq } from '@/api/order'
import {actionPostFailed} from "@/components/ActionState";
export default {
  name:"MyOrderView",
  data: () => {
    return {
      proceeding: [],
      finished: []
    }
  },
  methods: {
    loadOrder() {
      const vm = this
      orderReq("get").then(res => {
        if (res.data.success) {
          vm.proceeding = res.data.data.proceeding
          vm.finished = res.data.data.finished
        } else {
          actionPostFailed(res)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.loadOrder()
  }
}
</script>

<style>

</style>
