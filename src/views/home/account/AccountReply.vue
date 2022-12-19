<template>
  <v-container>
    <v-card height="580" class="ma-4">
      <v-card-title>回复我的</v-card-title>
      <v-list tile dense height="270%">
        <v-list-item-group active-class="deep-purple--text">
          <template v-for="item in list_data">
            <v-list-item :key="item.id">
              <v-list-item-content>
                <v-list-item-title v-text="item.content"></v-list-item-title>
                <v-list-item-subtitle
                  >回复:{{ item.myContent }}
                  {{ item.time }}</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-btn @click.native="open_reply_dialog(item.id, item.type)">
                  <v-icon>mdi-reply</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="item.id" />
          </template>
        </v-list-item-group>
      </v-list>
      <v-row>
        <v-col cols="8">
          <v-pagination
            circle
            class="left"
            color="#6A5ACD"
            v-if="Math.ceil(total / limit) > 1"
            v-model="curPage"
            :length="Math.ceil(total / limit)"
            :total-visible="10"
            @input="onPageChange(curPage, limit)"
          ></v-pagination>
        </v-col>
        <v-col cols="4">
          <v-row no-gutters>
            <span class="lead">跳转至第</span>
            <v-text-field
              class="shrink"
              solo
              dense
              v-model="whichPage"
            ></v-text-field>
            <span class="lead">页</span>
            <v-btn class="goBtn" small fab @click="jumpPage()">GO</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <!-- reply -->
    <v-dialog v-model="show_reply_dialog">
      <v-card>
        <v-card-title>回复</v-card-title>
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
          <v-btn
            color="blue"
            class="ma-2 white--text"
            small
            @click.native="reply()"
          >
            回复
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { get_my_comment_and_reply } from "@/api/account";
import { reply_on_comment, reply_on_reply } from "@/api/post";

export default {
  name: "AccountReply",
  data() {
    return {
      curPage: 1,
      limit: 10,
      whichPage: 1,
      total: undefined,

      list_data: [],

      show_reply_dialog: false,
      reply_id: undefined,
      reply_content: undefined,
      reply_type: undefined,
    };
  },
  methods: {
    open_reply_dialog(id, type) {
      this.show_reply_dialog = true;
      this.reply_type = type;
      this.reply_id = id;
    },
    close_reply_dialog() {
      this.show_reply_dialog = false;
      this.reply_id = undefined;
      this.reply_content = undefined;
      this.reply_type = undefined;
    },
    reply() {
      if (this.reply_content == "") {
        this.$message.error("评论内容还为空哦");
        return;
      }

      if (this.reply_type == "Comment") {
        reply_on_comment({
          content: this.reply_content,
          commentId: this.reply_id,
        })
          .then((res) => {
            if (res.code === 20000) this.$message.success("回复成功！");
            else this.$message.error("阿欧，好像回复出现了一点小问题..");
            this.show_reply_dialog = false;
          })
          .catch((err) => console.log("error: " + err));
      } else if (this.reply_type == "Reply") {
        reply_on_reply({
          content: this.reply_content,
          replyId: this.reply_id,
        })
          .then((res) => {
            if (res.code === 20000) this.$message.success("回复成功！");
            else this.$message.error("阿欧，好像回复出现了一点小问题..");
            this.show_reply_dialog = false;
          })
          .catch((err) => console.log("error: " + err));
      }
    },
    jumpPage() {
      this.curPage = Number(this.whichPage);
    },
    onPageChange(curPage, limit) {
      get_my_comment_and_reply({ offset: curPage, limit: limit })
        .then((res) => {
          console.log(res.data.total);
          this.total = res.data.total;
          this.posts = res.data.myPosts;
        })
        .catch((err) => console.log("error: " + err));
    },
  },
  mounted() {
    get_my_comment_and_reply({ offset: this.curPage, limit: this.limit }).then(
      (res) => {
        this.list_data = res.data;
        this.total = res.data.total;
      }
    );
  },
};
</script>

<style scoped></style>
