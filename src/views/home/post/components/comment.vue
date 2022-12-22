<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span style="margin: 5px">{{ commentData.floor }} 楼 </span>
        <span style="margin: 5px">{{ commentData.author }}</span>
        <v-avatar>
          <img :src="commentData.avatar" :alt="commentData.author" />
        </v-avatar>
      </v-card-title>
      <v-card-subtitle
        ><span>{{ commentData.updateTime }}</span></v-card-subtitle
      >
      <v-card-text>
        <div v-html="commentData.content"></div>
        <PostReply
          :replyData="commentData.replyVOList"
          :is_login="Boolean(is_login)"
          @refresh="refresh"
        ></PostReply>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="#7d73be"
          fab
          small
          :disabled="!is_login"
          v-on:click="open_reply_dialog(commentData.commentId)"
        >
          <v-icon color="white">mdi-comment</v-icon>
        </v-btn>
        <v-btn
          color="#7d73be"
          fab
          small
          :disabled="!is_login"
          v-show="is_login && commentData.ableToDelete"
          v-on:click="open_delete_dialog(commentData.commentId)"
        >
          <v-icon color="white">mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- reply -->
    <v-dialog v-model="show_reply_dialog">
      <v-card>
        <v-card-title>回复给 {{ commentData.floor }} 楼</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="replyContent"
            outlined
            label="输入你的评论（请文明发言~）"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue"
            class="ma-2 white--text"
            small
            @click="close_reply_dialog"
            >取消
          </v-btn>
          <v-btn color="blue" class="ma-2 white--text" small @click="reply">
            回复
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>

    <!-- delete -->
    <v-dialog v-model="show_delete_dialog" width="30%">
      <v-card>
        <v-card-title>确认删除 {{ commentData.floor }} 楼？</v-card-title>
        <v-card-actions>
          <v-btn
            color="#7d73be"
            class="ma-2 white--text"
            small
            @click="close_delete_dialog"
            >取消
          </v-btn>
          <v-btn
            color="#7d73be"
            class="ma-2 white--text"
            small
            @click="delete_comment"
          >
            删除
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import PostReply from "@/views/home/post/components/reply.vue";
import { reply_on_comment, delete_comment } from "@/api/post";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PostComment",
  props: {
    commentData: {
      commentId: Number,
      floor: Number,
      avatar: String,
      author: String,
      updateTime: Date,
      content: undefined,
      replyVOList: undefined,
      ableToDelete: Boolean,
    },
    postId: Number,
    is_login: Boolean,
  },
  components: {
    PostReply,
  },
  data() {
    return {
      // reply to some commentId
      show_reply_dialog: false,
      replyToCommentId: undefined,
      replyContent: undefined,

      // delete my commentId
      show_delete_dialog: false,
      delete_commentId: undefined,
    };
  },
  methods: {
    // reply
    open_reply_dialog(commentId) {
      this.show_reply_dialog = true;
      this.replyToCommentId = commentId;
      this.replyContent = "";
    },
    close_reply_dialog() {
      this.show_reply_dialog = false;
      this.replyToCommentId = undefined;
      this.replyContent = "";
    },
    reply() {
      if (this.replyContent == "") {
        this.$message.error("评论内容还为空哦");
        return;
      }

      reply_on_comment({
        content: this.replyContent,
        commentId: this.replyToCommentId,
      })
        .then((res) => {
          if (res.code === 20000) {
            this.$message.success("回复成功！");
            this.$emit("refresh");
          } else this.$message.error("阿欧，好像回复出现了一点小问题..");
          this.show_reply_dialog = false;
        })
        .catch((err) => console.log("error: " + err));
    },

    // delete
    open_delete_dialog(commentId) {
      this.show_delete_dialog = true;
      this.delete_commentId = commentId;
    },
    close_delete_dialog() {
      this.show_delete_dialog = false;
      this.delete_commentId = undefined;
    },
    delete_comment() {
      delete_comment(this.delete_commentId).then((res) => {
        if (res.code === 20000) {
          this.$message.success("删除成功！");
          this.$emit("refresh");
        } else this.$message.error("阿欧，好像删除出现了一点小问题..");
      });
      this.show_delete_dialog = false;
    },
    refresh() {
      console.log("receive message from reply");
      this.$emit("refresh");
    },
  },
};
</script>
