<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span style="margin: 5px">{{ comment_data.floor }} 楼 </span>
        <span style="margin: 5px">{{ comment_data.author }}</span>
        <v-avatar>
          <img :src="comment_data.avatar" :alt="comment_data.author" />
        </v-avatar>
      </v-card-title>
      <v-card-subtitle
        ><span>{{ comment_data.time }}</span></v-card-subtitle
      >
      <v-card-text>
        <span>{{ comment_data.content }}</span>
        <PostReply
          :reply_data="comment_data.reply_data"
          :is_login="Boolean(is_login)"
        ></PostReply>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          fab
          small
          :disabled="!is_login"
          v-on:click="open_reply_dialog(comment_data.comment_id)"
        >
          <v-icon>mdi-comment</v-icon>
        </v-btn>
        <v-btn
          color="primary"
          fab
          small
          v-show="comment_data.able_to_delete"
          v-on:click="open_delete_dialog(comment_data.comment_id)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- reply -->
    <v-dialog v-model="show_reply_dialog">
      <v-card>
        <v-card-title>回复给 {{ reply_to_comment_id }} 楼</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="reply_content"
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
    <v-dialog v-model="show_delete_dialog">
      <v-card>
        <v-card-title>确认删除 {{ delete_comment_id }} 楼？</v-card-title>
        <v-card-actions>
          <v-btn
            color="blue"
            class="ma-2 white--text"
            small
            @click="close_delete_dialog"
            >取消
          </v-btn>
          <v-btn
            color="blue"
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
    comment_data: {
      comment_id: Number,
      floor: Number,
      avatar: String,
      author: String,
      time: Date,
      content: undefined,
      reply_data: undefined,
      able_to_delete: Boolean,
    },
    post_id: Number,
    is_login: Boolean,
  },
  components: {
    PostReply,
  },
  data() {
    return {
      // reply to some comment_id
      show_reply_dialog: false,
      reply_to_comment_id: undefined,
      reply_content: undefined,

      // delete my comment_id
      show_delete_dialog: false,
      delete_comment_id: undefined,
    };
  },
  methods: {
    // reply
    open_reply_dialog(comment_id) {
      this.show_reply_dialog = true;
      this.reply_to_comment_id = comment_id;
      this.reply_content = "";
    },
    close_reply_dialog() {
      this.show_reply_dialog = false;
      this.reply_to_comment_id = undefined;
      this.reply_content = "";
    },
    reply() {
      if (this.reply_content == "") {
        this.$message.error("评论内容还为空哦");
        return;
      }

      reply_on_comment({
        content: this.reply_content,
        comment_id: this.reply_to_comment_id,
      })
        .then((res) => {
          if (res.code === 20000) this.$message.success("回复成功！");
          else this.$message.error("阿欧，好像回复出现了一点小问题..");
          this.show_reply_dialog = false;
        })
        .catch((err) => console.log("error: " + err));
    },

    // delete
    open_delete_dialog(comment_id) {
      this.show_delete_dialog = true;
      this.delete_comment_id = comment_id;
    },
    close_delete_dialog() {
      this.show_delete_dialog = false;
      this.delete_comment_id = undefined;
    },
    delete_comment() {
      delete_comment(this.delete_comment_id).then((res) => {
        if (res.code === 20000) this.$message.success("删除成功！");
        else this.$message.error("阿欧，好像删除出现了一点小问题..");
      });
      this.show_delete_dialog = false;
    },
  },
};
</script>
