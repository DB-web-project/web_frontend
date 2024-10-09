<template>
  <mavon-editor
    class="markdown"
    :value="content"
    :subfield="false"
    :defaultOpen="'preview'"
    :toolbarsFlag="false"
    :editable="false"
    :scrollStyle="false"
    :boxShadow="false"
    :previewBackground="'#ffffff'"
    :style="'padding: 0px;'"
  ></mavon-editor>
</template>

<script>
export default {
  name: "mavenContent",
  props: {
    content: {
      type: String,
      require: true,
      default: "芝士maven-content"
    }
  },
}
</script>

<style scoped>
.markdown {
  /* 暂时未限制高度 height: 500px;*/
  margin: 0 auto;
  border: none !important;
  background-color: white !important;
  min-height: 0px;
  border-left-width: 0px;
  z-index: 0;
}

.markdown >>> .v-show-content {
  padding: 0px !important;
}
</style>
