<template>
  <v-card shaped>
    <v-card-title
      >举报{{ this.reportType === "reply" ? "回复" : "评论" }}</v-card-title
    >
    <v-card-text class="mt-4">
      <v-select
        :items="reportSubtypes"
        label="选择举报类型"
        outlined
        shaped
        v-model="reportSubtype"
        class="mx-auto"
      ></v-select>
      <v-textarea
        color="#7d73be"
        outlined
        shaped
        label="输入具体描述"
        v-model="reportReason"
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="#7d73be"
        class="ma-2 white--text"
        small
        @click="closeReportDialog"
        >取消
      </v-btn>
      <v-btn
        color="#7d73be"
        class="ma-2 white--text"
        small
        @click="submitReport"
        >举报</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { reportInPost } from "@/api/post";

export default {
  name: "ReportCommentAndReply",
  props: {
    reportType: {
      type: String,
      required: true,
    },
    sectionId: {
      type: Number,
      required: true,
    },
    reportedId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      reportSubtypes: [
        "色情低俗",
        "垃圾广告",
        "辱骂攻击",
        "时政不实信息",
        "侵犯权益",
        "违法犯罪",
        "青少年不宜",
        "其他",
      ],
      reportSubtype: "",
      reportReason: "",
    };
  },
  methods: {
    closeReportDialog() {
      this.$emit("closeReportDialog");
    },
    submitReport() {
      reportInPost({
        reportType: this.reportType,
        reportSubtype: this.reportSubtype,
        reportReason: this.reportReason,
        sectionId: this.sectionId,
        reportedId: this.reportedId,
      }).then(() => {
        this.$message("举报成功");
        this.$emit("closeReportDialog");
      });
    },
  },
};
</script>
