<template>
<v-container fluid>
  <v-row v-if="reports?.length === 0" justify="center" align="center" style="min-height: 300px;">
    <v-card-title class="no-comment">
      当前暂无投诉
    </v-card-title>
  </v-row>
  <v-row v-else>
    <v-col v-for="(report, index) in reports" :key="index" :cols="12" :sm="12">
      <report-card
      :complaint-id="report.complaintId"
      :source-id="String(report.sourceId)"
      :target="String(report.target)"
      :post-title="String(report.postTitle)"
      :post-id="String(report.postId)"
      :post-type="report.type"
      :context="report.context">

      </report-card>
    </v-col>
  </v-row>
</v-container>
</template>


<script>
import ReportCard from "@/views/repport/reportCard";
import {reportReq} from "@/api/report";
import {actionFailed, actionPostFailed} from "@/components/ActionState";

let testReport =
  {
    complaintId: "1",
    sourceId: "1",
    target: "1",
    postTitle: "关注塔菲谢谢喵关注塔菲谢谢喵",
    postId: "1",
    type: "buy",
    context:`# 投诉api文档

投诉会给帖子扣 2 分,解决了加 1 分

## 管理员获得投诉 /complaint

- 请求路径 : \`/api/complaint\`.
- 请求方法 : \`get\`.
- 请求数据格式 : 无请求数据,后端判断该用户为 admin 则返回所有投诉
- 返回数据格式 :
  - complaints: 数组格式, 每一项代表投诉记录,
    -  complaintId: 整型格式, 投诉id
    -  sourceId: 整型格式, 代表投诉人id.
    -  target: 整型格式, 代表被投诉人id.
    -  postTitle: 整型格式, 代表投诉帖子标题.
    -  postId: 整型格式, 代表被投诉帖子id
    -  postType: 整型格式, 代表被投诉帖子种类, 1代表求物贴, 2代表售卖贴.
    -  context: 字符串格式, 投诉内容

## 管理员投诉解决确认

- 请求路径 : \`/api/complaint\`.
- 请求方法 : \`post\`.
- 请求数据格式 :
  - complaintId: 整型格式, 代表解决投诉的id
- 返回数据格式 : 除 success 和 message 外无其他返回数据`
  };

let testReports = [];
for (let i = 0; i < 20; i++) {
  testReports.push(testReport)
}

export default {
  name: "reportView",
  components: {ReportCard},
  data() {
    return {
      reports: []
    }
  },
  methods: {
    loadReport() {
      let vm = this;
      reportReq('get',{

      }).then(res => {
        if (res.data.success) {
          vm.reports = res.data.data.complaints;
        } else {
          actionPostFailed(res);
        }
      }).catch(err => {
        vm.reports = testReports;
        actionFailed();
      })
    }
  },
  mounted() {
    this.loadReport();
  }
}
</script>

<style scoped>
.no-comment {
  font-size: xx-large;
  color: gray;
  opacity: 0.5;
}
</style>
