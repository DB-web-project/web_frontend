<template>
  <v-container fluid>
    <v-list>
      <v-list-item-group v-model="model" color="primary">
        <template v-for="(bulletin, i) in bulletins">
          <v-list-item :key="i">
            <v-list-item-content @click="change(i)">
              <v-list-item-title
                v-text="bulletin.title"
                class="pre-title">
              </v-list-item-title>
              <v-list-item-subtitle v-text="bulletin.postTime">

              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider
            :key="i + 'index'"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>

    <v-dialog
      v-model="dialog"
      width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ boardTitle }}</span>
        </v-card-title>
        <v-card-subtitle>
          {{boardTime}}
        </v-card-subtitle>
        <v-card-text>
          <maven-content
          :content="boardContent">

          </maven-content>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="closeBoard"
          >
            已阅读
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
import MavenContent from "@/components/mavenContent";

export default {
  name: "PreBoardView",
  components: {
    MavenContent

  },
  data() {
    return {
      model: -1,
      dialog: false,
      boardContent: "",
      boardTitle: "",
      boardTime: "",
    }
  },
  props: {
    bulletins: {
      type: Array,
      default: [],
      require: false,
    },
  },
  methods: {
    change(i) {
      this.boardTitle = this.bulletins[i].title;
      this.boardContent = this.bulletins[i].context;
      this.boardTime = this.bulletins[i].postTime;
      this.dialog = true;
    },
    closeBoard() {
      this.model = -1;
      this.dialog = false;
      this.boardTitle = "";
      this.boardContent = "";
      this.boardTime = "";
    }
  }
}
</script>

<style scoped>
.pre-title {
  font-weight: bold;
  font-size: x-large;
}
</style>
