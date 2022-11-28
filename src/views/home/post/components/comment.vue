<template>
  <v-container>
    <v-col
      v-for="singleCommentData in commentData"
      :key="singleCommentData.comment_id"
    >
      <v-card>
        <v-card-title>{{ singleCommentData.author }}</v-card-title>
        <v-card-subtitle v-show="singleCommentData.reply_to"
          ><span
            >回复给 {{ singleCommentData.reply_to }}
            {{ singleCommentData.time }}</span
          ></v-card-subtitle
        >
        <v-card-text>{{ singleCommentData.content }}</v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            fab
            small
            v-on:click="
              open_reply_dialog(
                singleCommentData.author,
                singleCommentData.comment_id
              )
            "
          >
            <v-icon>mdi-comment</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            fab
            small
            v-show="singleCommentData.able_to_delete"
            v-on:click="open_delete_dialog(singleCommentData.comment_id)"
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

      // comment
      commentData: [
        {
          comment_id: 1,
          time: new Date(),
          author: "ysj",
          reply_to: "mb",
          content: "woww it' s a little bit ee",
          able_to_delete: false,
        },
        {
          comment_id: 2,
          time: new Date(),
          author: "mb",
          reply_to: "ysj",
          content: "woww it' s a ssss bit ee",
          able_to_delete: false,
        },
        {
          comment_id: 3,
          time: new Date(),
          author: "fbc",
          reply_to: "",
          content: "jialguajian",
          able_to_delete: true,
        },
      ],
    };
  },
  methods: {
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
