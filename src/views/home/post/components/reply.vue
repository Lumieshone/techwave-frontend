<template>
  <v-container>
    <v-col v-for="singlereplyData in replyData" :key="singlereplyData.replyId">
      <v-card>
        <v-card-title>{{ singlereplyData.authorName }}</v-card-title>
        <v-card-subtitle v-show="singlereplyData.replyTo"
          ><span
            >回复给 {{ singlereplyData.replyTo }}
            {{ singlereplyData.time }}</span
          ></v-card-subtitle
        >
        <v-card-text>{{ singlereplyData.content }}</v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            fab
            small
            :disabled="!is_login"
            v-on:click="
              open_reply_dialog(singlereplyData.authorName, singlereplyData.replyId)
            "
          >
            <v-icon>mdi-comment</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            fab
            small
            :disabled="!is_login"
            v-show="is_login && singlereplyData.ableToDelete"
            v-on:click="open_delete_dialog(singlereplyData.replyId)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <!-- reply -->
    <v-dialog v-model="show_reply_dialog">
      <v-card>
        <v-card-title>回复给 {{ replyToUserName }}</v-card-title>
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
        <v-card-title>确认删除？</v-card-title>
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
            @click="delete_reply"
          >
            删除
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { reply_on_reply, delete_reply } from "@/api/post";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Postreply",
  props: {
    is_login: Boolean,
    replyData: {
      replyId: Number,
      time: Date,
      authorName: String,
      replyTo: String,
      content: String,
      ableToDelete: Boolean,
    },
  },
  data() {
    return {
      // reply
      show_reply_dialog: false,
      replyId: undefined,
      replyToUserName: "",
      reply_content: undefined,

      // delete
      show_delete_dialog: false,
      delete_replyId: undefined,
    };
  },
  methods: {
    // arrow methods can't bind to this, so use function instead!!

    // reply
    open_reply_dialog(author, replyId) {
      this.show_reply_dialog = true;
      this.replyId = replyId;
      this.replyToUserName = author;
      this.reply_content = "";
    },
    close_reply_dialog() {
      this.show_reply_dialog = false;
      this.replyId = undefined;
      this.replyToUserName = "";
      this.reply_content = "";
    },
    reply() {
      if (this.reply_content == "") {
        this.$message.error("评论内容还为空哦");
        return;
      }

      reply_on_reply({
        content: this.reply_content,
        replyId: this.replyId,
      })
        .then((res) => {
          if (res.code === 20000) this.$message.success("回复成功！");
          else this.$message.error("阿欧，好像回复出现了一点小问题..");
          this.show_reply_dialog = false;
        })
        .catch((err) => console.log("error: " + err));
    },

    // delete
    open_delete_dialog(replyId) {
      this.show_delete_dialog = true;
      this.delete_replyId = replyId;
    },
    close_delete_dialog() {
      this.show_delete_dialog = false;
      this.delete_replyId = undefined;
    },
    delete_reply() {
      delete_reply(this.replyId).then((res) => {
        if (res.code === 20000) this.$message.success("删除成功！");
        else this.$message.error("阿欧，好像删除出现了一点小问题..");
      });
      this.show_delete_dialog = false;
    },
  },
};
</script>
