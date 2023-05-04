<template>
  <v-container>
    <v-list>
      <v-list-group :value="true">
        <v-list-item
          v-for="singleReplyData in replyData"
          :key="singleReplyData.replyId"
        >
          <v-list-item-content>
            <v-row>
              <v-col cols="8">
                <v-list-item-title
                  >{{ singleReplyData.authorName }} 回复
                  {{ singleReplyData.toName }}:
                  {{ singleReplyData.content }}</v-list-item-title
                >
              </v-col>
              <v-col cols="4">
                <v-list-item-subtitle>
                  {{ singleReplyData.time }}
                </v-list-item-subtitle>
                <v-list-item-action>
                  <v-btn
                    text
                    :disabled="!isLogin"
                    v-show="isLogin && singleReplyData.ableToDelete"
                    >删除</v-btn
                  >
                  <v-btn text @click="openReportDialog(singleReplyData.replyId)" v-show="isLogin"
                    >举报</v-btn
                  >
                  <v-btn
                    text
                    :disabled="!isLogin"
                    @click="
                      openReplyDialog(
                        singleReplyData.authorName,
                        singleReplyData.replyId
                      )
                    "
                    >回复</v-btn
                  >
                </v-list-item-action>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

    <!-- reply -->
    <v-dialog v-model="showReplyDialog" width="50%">
      <v-card>
        <v-card-title>回复给 {{ replyToUserName }}</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="replyContent"
            color="#7d73be"
            outlined
            label="输入你的评论（请文明发言~）"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="#7d73be"
            class="ma-2 white--text"
            small
            @click="closeReplyDialog"
            >取消
          </v-btn>
          <v-btn color="#7d73be" class="ma-2 white--text" small @click="reply">
            回复
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>

    <!-- delete -->
    <v-dialog v-model="showDeleteDialog" width="30%">
      <v-card>
        <v-card-title>确认删除？</v-card-title>
        <v-card-actions>
          <v-btn
            color="#7d73be"
            class="ma-2 white--text"
            small
            @click="closeDeleteDialog"
            >取消
          </v-btn>
          <v-btn
            color="#7d73be"
            class="ma-2 white--text"
            small
            @click="deleteReply"
          >
            删除
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>

    <!-- report -->
    <v-dialog width="50%" v-model="showReportDialog">
      <report-post
        :reportType="'reply'"
        :reportedId="reportedId"
        :sectionId="sectionId"
        @closeReportDialog="
          showReportDialog = false;
          reportedId = undefined;
        "
      ></report-post>
    </v-dialog>
  </v-container>
</template>

<script>
import { replyOnReply, deleteReply } from "@/api/post";
import ReportPost from "./ReportPost.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PostReply",
  components: {
    ReportPost,
  },
  props: {
    isLogin: Boolean,
    sectionId: Number,
    replyData: {
      replyId: Number,
      time: Date,
      authorName: String,
      authorId: Number,
      toName: String,
      toId: Number,
      content: String,
      ableToDelete: Boolean,
    },
  },
  data() {
    return {
      // report
      showReportDialog: false,
      reportedId: undefined,

      // reply
      showReplyDialog: false,
      replyId: undefined,
      replyToUserName: "",
      replyContent: undefined,

      // delete
      showDeleteDialog: false,
      deleteReplyId: undefined,
    };
  },
  methods: {
    // arrow methods can't bind to this, so use function instead!!
    // report
    openReportDialog(replyId) {
      this.reportedId = replyId;
      this.showReportDialog = true;
    },

    // reply
    openReplyDialog(author, replyId) {
      this.showReplyDialog = true;
      this.replyId = replyId;
      this.replyToUserName = author;
      this.replyContent = "";
    },
    closeReplyDialog() {
      this.showReplyDialog = false;
      this.replyId = undefined;
      this.replyToUserName = "";
      this.replyContent = "";
    },
    reply() {
      if (this.replyContent == "") {
        this.$message.error("评论内容还为空哦");
        return;
      }

      replyOnReply({
        content: this.replyContent,
        replyId: this.replyId,
      })
        .then((res) => {
          if (res.code === 20000) {
            this.$message.success("回复成功！");
            this.$emit("refresh");
          }
          this.showReplyDialog = false;
        })
        .catch((err) => console.log("error: " + err));
    },

    // delete
    openDeleteDialog(replyId) {
      this.showDeleteDialog = true;
      this.deleteReplyId = replyId;
      console.log(this.deleteReplyId);
    },
    closeDeleteDialog() {
      this.showDeleteDialog = false;
      this.deleteReplyId = undefined;
    },
    deleteReply() {
      deleteReply(this.deleteReplyId).then((res) => {
        if (res.code === 20000) {
          this.$message.success("删除成功！");
          this.$emit("refresh");
        }
      });
      this.showDeleteDialog = false;
    },
  },
};
</script>
