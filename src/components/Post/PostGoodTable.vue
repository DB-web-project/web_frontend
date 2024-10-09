<template>
  <v-data-table
    :headers="headers"
    :items="items"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer/>
        <v-dialog
          v-model="editDialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              增加商品
            </v-btn>
          </template>

          <v-card>
            <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="商品名字"
                        :disabled = "disabled"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-form
                        ref="form"
                      >
                        <v-text-field
                          v-model="editedItem.num"
                          label="商品数量"
                          type="number"
                          :rules="[rules.min]"
                        />
                      </v-form>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.price"
                        label="商品单价(元)"
                        :disabled = "disabled"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-textarea
                      v-model="editedItem.description"
                      label="商品描述"
                      rows="3"
                      :disabled = "disabled"
                    ></v-textarea>
                  </v-row>

                    <p class="text-subtitle-1" > 图片预览 </p>
                    <div
                      style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;"
                    >
                      <v-avatar
                        size="100"
                      >
                        <img :src="preViewImg(editedItem.img)" />
                      </v-avatar>
                    </div>
                    <v-file-input
                      v-model="editedItem.img"
                      prepend-icon="mdi-camera"
                      placeholder="选择商品图片"
                      accept=".jpg,.png,.svg,.jpeg"
                      style="font-size: 0.875rem;"
                    />
                </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="closeEditDialog"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :disabled="canNotSubmit"
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
  </template>
  <template v-slot:[`item.img`]="{ item }">
    <v-avatar
      tile
      size="80"
    >
      <img :src="preViewImg(item.img)"/>
    </v-avatar>
  </template>
  </v-data-table>
</template>

<script>
export default {
  name:"PostGoodTable",
  data() {
    return {
      headers:[
        {text: '商品名字', value:'name'},
        {text: '商品图片', value:'img',sortable: false},
        {text: '商品数量', value:'num'},
        {text: '商品描述', value:'description'},
        {text: '商品单价', value:'price'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedItem:{
          name: "计算机组成",
          num: "5",
          description: "无",
          price: "20",
          img: 'https://t14.baidu.com/it/u=2616247270,2231407640&amp;fm=179&amp;app=42&amp;size=w54&amp;n=0&amp;f=JPEG&amp;fmt=auto?s=AB63F416D991EBE1414334D60300D0EA&amp;sec=1667667600&amp;t=9b2e76d05cecbc1f6d2eecd0bd8db2ec'
      },
      editDialog:false,
      defaultItem: {
          groupId: 5,
          name: "计算机组成",
          num: "5",
          description: "无",
          price: "20",
          img: 'https://t14.baidu.com/it/u=2616247270,2231407640&amp;fm=179&amp;app=42&amp;size=w54&amp;n=0&amp;f=JPEG&amp;fmt=auto?s=AB63F416D991EBE1414334D60300D0EA&amp;sec=1667667600&amp;t=9b2e76d05cecbc1f6d2eecd0bd8db2ec'
      },
    editedIndex:-1,
    rules:{
      min:v => Number(v) > 0 || '数量应该大于0'
    },
    }
  },
  props:{
    items: {
      type:Array,
      default: () => [{}]
    },
    onlyNum: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.items.splice(this.editedIndex,1)
      this.$emit("delete",item)
      this.closeEditDialog()
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
    },
    closeEditDialog() {
        this.editDialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
    },
    save () {
      if (!this.$refs.form.validate())
        return
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
        this.$emit("edit",this.editedItem)
      } else {
        this.items.push(this.editedItem)
        this.$emit("add",this.editedItem)
      }
      this.closeEditDialog()
    },
    preViewImg(file) {
      const windowURL = window.URL || window.webkitURL;
      const ret = !(file instanceof File) ? file : windowURL.createObjectURL(file)
      return ret
    }
  },
  computed: {
    disabled() {
      return this.onlyNum && this.editedIndex !== -1
    },
    canNotSubmit() {
      return !(this.editedItem.img instanceof File)
    }
  }
}
</script>

<style>

</style>
