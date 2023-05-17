<template>
  <div>
    <v-list dense>
      <v-list-group :value="true">
        <v-list-item
          v-for="singleReplyData in replyData"
          :key="singleReplyData.replyId"
        >
          <v-container>
            <v-row>
              <!-- 左侧：回复内容 -->
              <v-col class="pr-2" cols="8">
                <v-list-item-title style="white-space: pre-wrap;">
                  <span>{{ singleReplyData.authorName }}</span> 回复
                  <span>{{ singleReplyData.toName }}:</span>
                  <span>{{ singleReplyData.content }}</span>
                </v-list-item-title>
                <v-list-item-subtitle class="caption">{{
                  singleReplyData.time
                }}</v-list-item-subtitle>
              </v-col>
              <!-- 右侧：操作按钮 -->
              <v-col cols="4" class="d-flex align-center justify-end">
                <v-btn
                  text
                  small
                  :disabled="!isLogin"
                  v-show="isLogin && singleReplyData.ableToDelete"
                  @click="openDeleteDialog(singleReplyData.replyId)"
                >
                  <span style="color: grey">删除</span>
                </v-btn>
                <v-btn
                  text
                  small
                  @click="openReportDialog(singleReplyData.replyId)"
                  v-show="isLogin"
                  class="ml-2"
                >
                  <span style="color: grey">举报</span>
                </v-btn>
                <v-btn
                  text
                  small
                  :disabled="!isLogin || isBanned"
                  @click="
                    openReplyDialog(
                      singleReplyData.authorName,
                      singleReplyData.replyId
                    )
                  "
                  class="ml-2"
                >
                  <span style="color: grey">{{
                    isBanned ? "无法发言" : "评论"
                  }}</span>
                </v-btn>
              </v-col>
            </v-row>

            <!-- <v-row>
              <v-col cols="12">
                <v-list-item-subtitle>
                  <span>{{ singleReplyData.authorName }}</span> 回复
                  <span>{{ singleReplyData.toName }}:</span>
                  <span>{{ singleReplyData.content }}</span>
                </v-list-item-subtitle>
              </v-col>
            </v-row> -->

            <!-- <v-row no-gutters>
              <v-col cols="6" offset="6" justify="end">
                <v-list-item-subtitle>
                  {{ singleReplyData.time }}
                </v-list-item-subtitle>
                <v-list-item-action>
                  <v-btn
                    fab
                    small
                    :disabled="!isLogin"
                    v-show="isLogin && singleReplyData.ableToDelete"
                  >
                    <v-icon color="grey">mdi-delete</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    small
                    @click="openReportDialog(singleReplyData.replyId)"
                    v-show="isLogin"
                    ><v-icon color="grey">mdi-alert</v-icon></v-btn
                  >
                  <v-btn
                    fab
                    small
                    :disabled="!isLogin"
                    @click="
                      openReplyDialog(
                        singleReplyData.authorName,
                        singleReplyData.replyId
                      )
                    "
                    ><v-icon color="grey">mdi-comment</v-icon></v-btn
                  >
                </v-list-item-action>
              </v-col>
            </v-row> -->
          </v-container>
        </v-list-item>
      </v-list-group>
    </v-list>

    <!-- reply -->
    <v-dialog v-model="showReplyDialog" width="50%">
      <v-card shaped>
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
      <v-card shaped>
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
  </div>
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
    isBanned: Boolean,
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
