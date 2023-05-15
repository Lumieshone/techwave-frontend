<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="11">
        <v-card shaped class="mt-4 mb-4">
          <v-row>
            <v-col cols="2" align="center">
              <v-row>
                <v-col cols="10">
                  <v-menu open-on-hover rounded>
                    <template v-slot:activator="{ on }">
                      <v-avatar>
                        <img
                          :src="commentData.avatar"
                          :alt="commentData.authorName"
                          v-on="on"
                        />
                      </v-avatar>
                    </template>
                    <user-card
                      :userId="commentData.authorId"
                      :avatar="commentData.avatar"
                    ></user-card>
                  </v-menu>
                  <v-card-subtitle>{{ commentData.floor }} 楼</v-card-subtitle>
                  <v-card-text
                    v-text="commentData.authorName"
                    class="font-weight-medium"
                  ></v-card-text>
                </v-col>
                <v-col cols="2">
                  <v-divider vertical></v-divider>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="10">
              <v-row style="margin-top: 10px">
                <div v-html="commentData.content"></div>
              </v-row>
              <v-row>
                <v-col cols="12" v-if="commentData.replyVOList.length > 0">
                  <v-divider></v-divider>
                  <PostReply
                    :replyData="commentData.replyVOList"
                    :sectionId="sectionId"
                    :isBanned="Boolean(isBanned)"
                    :isLogin="Boolean(isLogin)"
                    @refresh="refresh"
                  ></PostReply>
                </v-col>
              </v-row>
              <v-row no-gutters class="d-flex justify-end">
                <v-col cols="auto" class="d-flex align-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="#7d73be"
                        fab
                        small
                        :disabled="!isLogin | isBanned"
                        @click="openReplyDialog(commentData.commentId)"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="white">mdi-comment</v-icon>
                      </v-btn>
                    </template>
                    <span>{{
                      isBanned ? "当前被封禁中，无法发言" : "评论"
                    }}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="#7d73be"
                        fab
                        small
                        :disabled="!isLogin"
                        class="ml-2"
                        v-show="isLogin && commentData.ableToDelete"
                        @click="openDeleteDialog(commentData.commentId)"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="white">mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>删除</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="#7d73be"
                        fab
                        small
                        class="ml-2"
                        :disabled="!isLogin"
                        v-show="isLogin"
                        @click="showReportDialog = true"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="white">mdi-alert</v-icon>
                      </v-btn>
                    </template>
                    <span>举报</span>
                  </v-tooltip>
                </v-col>
                <v-col cols="auto" class="d-flex justify-end align-center">
                  <v-card-text class="time caption"
                    >发布时间 {{ commentData.time }}</v-card-text
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col></v-row
    >
    <!-- reply -->
    <v-dialog v-model="showReplyDialog" width="50%">
      <v-card shaped>
        <v-card-title>回复给 {{ commentData.floor }} 楼</v-card-title>
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
    <v-dialog v-model="showDeleteDialog" width="50%">
      <v-card shaped>
        <v-card-title>确认删除 {{ commentData.floor }} 楼？</v-card-title>
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
            @click="deleteComment"
          >
            删除
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>

    <!-- report -->
    <v-dialog width="50%" v-model="showReportDialog">
      <report-post
        :reportType="'comment'"
        :reportedId="commentData.commentId"
        :sectionId="sectionId"
        @closeReportDialog="showReportDialog = false"
      ></report-post>
    </v-dialog>
  </div>
</template>

<script>
import PostReply from "@/views/home/post/components/reply.vue";
import ReportPost from "./ReportPost.vue";
import { replyOnComment, deleteComment } from "@/api/post";
import UserCard from "./UserCard.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PostComment",
  props: {
    commentData: {
      commentId: Number,
      floor: Number,
      avatar: String,
      authorName: String,
      authorId: Number,
      time: Date,
      content: String,
      replyVOList: Array,
      ableToDelete: Boolean,
      sectionId: Number,
      isBanned: Boolean,
    },
    sectionId: Number,
    postId: Number,
    isLogin: Boolean,
  },
  components: {
    PostReply,
    ReportPost,
    UserCard,
  },
  data() {
    return {
      // reply to some commentId
      showReplyDialog: false,
      replyToCommentId: undefined,
      replyContent: undefined,

      // delete my commentId
      showDeleteDialog: false,
      deleteCommentId: undefined,

      // report
      showReportDialog: false,
    };
  },
  methods: {
    // reply
    openReplyDialog(commentId) {
      this.showReplyDialog = true;
      this.replyToCommentId = commentId;
      this.replyContent = "";
    },
    closeReplyDialog() {
      this.showReplyDialog = false;
      this.replyToCommentId = undefined;
      this.replyContent = "";
    },
    reply() {
      if (this.replyContent == "") {
        this.$message.error("评论内容还为空哦");
        return;
      }

      replyOnComment({
        content: this.replyContent,
        commentId: this.replyToCommentId,
      }).then((res) => {
        if (res.code === 20000) {
          this.$message.success("回复成功！");
          this.$emit("refresh");
        }
        this.showReplyDialog = false;
      });
    },

    // delete
    openDeleteDialog(commentId) {
      this.showDeleteDialog = true;
      this.deleteCommentId = commentId;
    },
    closeDeleteDialog() {
      this.showDeleteDialog = false;
      this.deleteCommentId = undefined;
    },
    deleteComment() {
      deleteComment(this.deleteCommentId).then((res) => {
        if (res.code === 20000) {
          this.$message.success("删除成功！");
          this.$emit("refresh");
        }
      });
      this.showDeleteDialog = false;
    },
    refresh() {
      console.log("receive message from reply");
      this.$emit("refresh");
    },
  },
};
</script>
