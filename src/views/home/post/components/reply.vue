<template>
  <v-container>
    <v-col v-for="singleReplyData in replyData" :key="singleReplyData.replyId">
      <v-card>
        <v-card-title>{{ singleReplyData.authorName }}</v-card-title>
        <v-card-subtitle v-show="singleReplyData.toName"
          ><span
            >回复给 {{ singleReplyData.toName }}
            {{ singleReplyData.time }}</span
          ></v-card-subtitle
        >
        <v-card-text>{{ singleReplyData.content }}</v-card-text>
        <v-card-actions>
          <v-btn
            color="#7d73be"
            fab
            small
            :disabled="!isLogin"
            v-on:click="
              openReplyDialog(
                singleReplyData.authorName,
                singleReplyData.replyId
              )
            "
          >
            <v-icon color="white">mdi-comment</v-icon>
          </v-btn>
          <v-btn
            color="#7d73be"
            fab
            small
            :disabled="!isLogin"
            v-show="isLogin && singleReplyData.ableToDelete"
            v-on:click="openDeleteDialog(singleReplyData.replyId)"
          >
            <v-icon color="white">mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

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
  </v-container>
</template>

<script>
import { replyOnReply, deleteReply } from "@/api/post";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PostReply",
  props: {
    isLogin: Boolean,
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
