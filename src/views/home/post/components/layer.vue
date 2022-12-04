<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span style="margin: 5px">{{ layer_data.floor }} 楼 </span>
        <span style="margin: 5px">{{ layer_data.author }}</span>
        <v-avatar>
          <img :src="layer_data.avatar" :alt="layer_data.author" />
        </v-avatar>
      </v-card-title>
      <v-card-subtitle
        ><span>{{ layer_data.time }}</span></v-card-subtitle
      >
      <v-card-text>
        <span>{{ layer_data.content }}</span>
        <PostComment :comment_data="layer_data.comment_data" :is_login="Boolean(is_login)"></PostComment>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          fab
          small
          :disabled="!is_login"
          v-on:click="open_reply_dialog(layer_data.floor)"
        >
          <v-icon>mdi-comment</v-icon>
        </v-btn>
        <v-btn
          color="primary"
          fab
          small
          v-show="layer_data.able_to_delete"
          v-on:click="open_delete_dialog(layer_data.floor)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- reply -->
    <v-dialog v-model="show_reply_dialog">
      <v-card>
        <v-card-title>回复给 {{ reply_to_floor }} 楼</v-card-title>
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
        <v-card-title>确认删除 {{ delete_floor }} 楼？</v-card-title>
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
            @click="delete_layer"
          >
            删除
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import PostComment from "@/views/home/post/components/comment.vue";
import { reply_on_layer, delete_layer } from "@/api/post";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PostLayer",
  props: {
    layer_data: {
      floor: Number,
      avatar: String,
      author: String,
      time: Date,
      content: undefined,
      comment_data: undefined,
      able_to_delete: Boolean,
    },
    post_id: Number,
    is_login: Boolean,
  },
  components: {
    PostComment,
  },
  data() {
    return {
      // reply to some floor
      show_reply_dialog: false,
      reply_to_floor: undefined,
      reply_content: undefined,

      // delete my floor
      show_delete_dialog: false,
      delete_floor: undefined,
    };
  },
  methods: {
    // reply
    open_reply_dialog(floor) {
      this.show_reply_dialog = true;
      this.reply_to_floor = floor;
      this.reply_content = "";
    },
    close_reply_dialog() {
      this.show_reply_dialog = false;
      this.reply_to_floor = undefined;
      this.reply_content = "";
    },
    reply() {
      if (this.reply_content == "") {
        this.$message.error("评论内容还为空哦");
        return;
      }

      reply_on_layer({
        content: this.reply_content,
        layer: this.reply_to_floor,
        post_id: this.post_id,
      })
        .then((res) => {
          if (res.code === 20000) this.$message.success("回复成功！");
          else this.$message.error("阿欧，好像回复出现了一点小问题..");
          this.show_reply_dialog = false;
        })
        .catch((err) => console.log("error: " + err));
    },

    // delete
    open_delete_dialog(floor) {
      this.show_delete_dialog = true;
      this.delete_floor = floor;
    },
    close_delete_dialog() {
      this.show_delete_dialog = false;
      this.delete_floor = undefined;
    },
    delete_layer() {
      delete_layer(this.delete_floor, this.post_id).then((res) => {
        if (res.code === 20000) this.$message.success("删除成功！");
        else this.$message.error("阿欧，好像删除出现了一点小问题..");
      });
      this.show_delete_dialog = false;
    },
  },
};
</script>
