<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span style="margin: 5px">{{ commentData.floor }} 楼 </span>
        <span style="margin: 5px">{{ commentData.authorName }}</span>
        <v-hover v-slot:default="{ hover }">
          <div>
            <v-avatar>
              <img :src="commentData.avatar" :alt="commentData.authorName" />
            </v-avatar>
            <user-card
              :userId="commentData.authorId"
              :avatar="commentData.avatar"
              v-if="hover"
              style="z-index: 1000; position: absolute; right: 0; top: 0"
            ></user-card></div
        ></v-hover>
      </v-card-title>
      <v-card-subtitle
        ><span>{{ commentData.time }}</span></v-card-subtitle
      >
      <v-card-text>
        <div v-html="commentData.content"></div>
        <PostReply
          :replyData="commentData.replyVOList"
          :sectionId="sectionId"
          :isLogin="Boolean(isLogin)"
          @refresh="refresh"
        ></PostReply>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="#7d73be"
          fab
          small
          :disabled="!isLogin"
          @click="openReplyDialog(commentData.commentId)"
        >
          <v-icon color="white">mdi-comment</v-icon>
        </v-btn>
        <v-btn
          color="#7d73be"
          fab
          small
          :disabled="!isLogin"
          v-show="isLogin && commentData.ableToDelete"
          @click="openDeleteDialog(commentData.commentId)"
        >
          <v-icon color="white">mdi-delete</v-icon>
        </v-btn>
        <v-btn
          color="#7d73be"
          fab
          small
          :disabled="!isLogin"
          v-show="isLogin"
          @click="showReportDialog = true"
        >
          <v-icon color="white">mdi-alert</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- reply -->
    <v-dialog v-model="showReplyDialog" width="50%">
      <v-card>
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
    <v-dialog v-model="showDeleteDialog" width="30%">
      <v-card>
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
  </v-container>
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
