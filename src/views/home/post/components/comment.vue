<template>
  <v-container>
    <v-col
      v-for="singlecomment_data in comment_data"
      :key="singlecomment_data.comment_id"
    >
      <v-card>
        <v-card-title>{{ singlecomment_data.author }}</v-card-title>
        <v-card-subtitle v-show="singlecomment_data.reply_to"
          ><span
            >回复给 {{ singlecomment_data.reply_to }}
            {{ singlecomment_data.time }}</span
          ></v-card-subtitle
        >
        <v-card-text>{{ singlecomment_data.content }}</v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            fab
            small
            v-on:click="
              open_reply_dialog(
                singlecomment_data.author,
                singlecomment_data.comment_id
              )
            "
          >
            <v-icon>mdi-comment</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            fab
            small
            v-show="singlecomment_data.able_to_delete"
            v-on:click="open_delete_dialog(singlecomment_data.comment_id)"
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
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PostComment",
  props:{
    comment_data:{
        comment_id: Number,
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
      reply_to_comment_id: undefined,
      reply_to_user_name: "",
      reply_content: undefined,

      // delete
      show_delete_dialog: false,
      delete_comment_id: undefined,
    };
  },
  methods: {
    // TODO: 帖子分页
    // arrow methods can't bind to this, so use function instead!!

    // reply
    open_reply_dialog(author, comment_id) {
      this.show_reply_dialog = true;
      this.reply_to_comment_id = comment_id;
      this.reply_to_user_name = author;
      this.reply_content = "";
    },
    close_reply_dialog() {
      this.show_reply_dialog = false;
      this.reply_to_comment_id = undefined;
      this.reply_to_user_name = "";
      this.reply_content = "";
    },
    reply() {
      console.log("reply successfully");
      this.show_reply_dialog = false;
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
      console.log("delete reply successfully");
      this.show_delete_dialog = false;
    },
  },
};
</script>
