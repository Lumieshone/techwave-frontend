<template>
  <v-container>
    <v-col
      v-for="singlereply_data in reply_data"
      :key="singlereply_data.reply_id"
    >
      <v-card>
        <v-card-title>{{ singlereply_data.author }}</v-card-title>
        <v-card-subtitle v-show="singlereply_data.reply_to"
          ><span
            >回复给 {{ singlereply_data.reply_to }}
            {{ singlereply_data.time }}</span
          ></v-card-subtitle
        >
        <v-card-text>{{ singlereply_data.content }}</v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            fab
            small
            :disabled="!is_login"
            v-on:click="
              open_reply_dialog(
                singlereply_data.author,
                singlereply_data.reply_id
              )
            "
          >
            <v-icon>mdi-comment</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            fab
            small
            v-show="singlereply_data.able_to_delete"
            v-on:click="open_delete_dialog(singlereply_data.reply_id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <!-- reply -->
    <v-dialog v-model="show_reply_dialog">
      <v-card>
        <v-card-title>回复给 {{ reply_to_user_name }}</v-card-title>
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
    reply_data: {
      reply_id: Number,
      time: Date,
      author: String,
      reply_to: String,
      content: String,
      able_to_delete: Boolean,
    },
  },
  data() {
    return {
      // reply
      show_reply_dialog: false,
      reply_id: undefined,
      reply_to_user_name: "",
      reply_content: undefined,

      // delete
      show_delete_dialog: false,
      delete_reply_id: undefined,
    };
  },
  methods: {
    // arrow methods can't bind to this, so use function instead!!

    // reply
    open_reply_dialog(author, reply_id) {
      this.show_reply_dialog = true;
      this.reply_id = reply_id;
      this.reply_to_user_name = author;
      this.reply_content = "";
    },
    close_reply_dialog() {
      this.show_reply_dialog = false;
      this.reply_id = undefined;
      this.reply_to_user_name = "";
      this.reply_content = "";
    },
    reply() {
      if (this.reply_content == "") {
        this.$message.error("评论内容还为空哦");
        return;
      }

      reply_on_reply({
        reply_content: this.reply_content,
        rreply_id: this.reply_id,
      })
        .then((res) => {
          if (res.code === 20000) this.$message.success("回复成功！");
          else this.$message.error("阿欧，好像回复出现了一点小问题..");
          this.show_reply_dialog = false;
        })
        .catch((err) => console.log("error: " + err));
    },

    // delete
    open_delete_dialog(reply_id) {
      this.show_delete_dialog = true;
      this.delete_reply_id = reply_id;
    },
    close_delete_dialog() {
      this.show_delete_dialog = false;
      this.delete_reply_id = undefined;
    },
    delete_reply() {
      delete_reply(this.reply_id).then((res) => {
        if (res.code === 20000) this.$message.success("删除成功！");
        else this.$message.error("阿欧，好像删除出现了一点小问题..");
      });
      this.show_delete_dialog = false;
    },
  },
};
</script>
