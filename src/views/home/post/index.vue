<template>
  <v-container>
    <!-- corresponding sections -->
    <v-btn text :to="`/forum`">论坛</v-btn>
    <span>></span>
    <v-btn text :to="`/section/${post_data.section_id}`">{{
      post_data.section_name
    }}</v-btn>
    <span>></span>
    <v-btn text>{{ post_data.subsection_name }}</v-btn>

    <!-- title -->
    <h1>{{ post_data.title }}</h1>
    <p>帖子id: {{ post_id }}</p>
    <p>帖子浏览量: {{ post_data.browse_number }}</p>

    <!-- tags -->
    <!-- <v-chip class="ma-2" v-for="tag in post_data.tags.map((t) => '#' + t)" :key="tag">{{tag}}</v-chip> -->

    <!-- 是否收藏 -->
    <v-btn :disabled="!is_login" v-on:click="collect">
      <v-icon :color="post_data.is_collected ? 'orange' : 'grey'"
        >mdi-star</v-icon
      >
      {{ is_login ? "收藏" : "请先登录再收藏" }}
    </v-btn>

    <!-- 一楼 -->
    <v-container>
      <v-card>
        <v-card-title>
          <span style="margin: 5px">{{ post_data.floor }} 楼 </span>
          <span style="margin: 5px">{{ post_data.author }}</span>
          <v-avatar>
            <img :src="post_data.avatar" :alt="post_data.author" />
          </v-avatar>
        </v-card-title>
        <v-card-subtitle
          ><span>{{ post_data.time }}</span></v-card-subtitle
        >
        <v-card-text>
          {{ post_data.content }}
        </v-card-text>
      </v-card>
    </v-container>

    <!-- 浏览评论 -->
    <v-col
      v-for="singlecomment_data in comment_data"
      :key="singlecomment_data.floor"
    >
      <PostComment
        :comment_data="singlecomment_data"
        :post_id="Number(post_id)"
        :is_login="Boolean(is_login)"
      />
    </v-col>

    <!-- 分页 -->
    <v-pagination
      v-if="Math.ceil(post_data.total / limit) > 1"
      v-model="curPage"
      :length="Math.ceil(post_data.total / limit)"
      total-visible="7"
      @input="onPageChange(curPage, limit)"
    ></v-pagination>

    <!-- comment on post -->
    <!-- <v-col>
      <v-card>
        <v-card-title>发表你的看法..</v-card-title>
        <v-card-subtitle>请文明发言哦~</v-card-subtitle>
        <v-card-text>
          <v-textarea
            v-model="comment_content"
            outlined
            label="评论"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-file-input
            v-model="comment_image_info"
            accept="image/*"
            small-chips
            multiple
            label="上传图片"
          ></v-file-input>
          <v-btn
            color="blue"
            class="ma-2 white--text"
            small
            @click="reply_on_post"
            :disabled="!is_login"
          >
            {{ is_login ? "评论" : "请先登录再发表评论" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col> -->

    <!-- 富文本 -->
    <WangEditor
      v-model="comment_content"
      upload_api="/upload/ReplyImage"
    ></WangEditor>
    <v-btn
      color="blue"
      class="ma-2 white--text"
      small
      @click="reply_on_post"
      :disabled="!is_login"
    >
      {{ is_login ? "评论" : "请先登录再发表评论" }}
    </v-btn>
  </v-container>
</template>

<script>
import PostComment from "@/views/home/post/components/comment.vue";
import WangEditor from "@/components/wang-editor.vue";
import { get_post_info, collect_post, reply_on_post } from "@/api/post";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  components: {
    PostComment,
    WangEditor,
  },
  data() {
    return {
      // pagination
      curPage: 1,
      limit: 5,

      // comment
      comment_content: "<p>发表你的看法~</p>",
      // comment_image_info: [],

      // is login?
      is_login: this.$store.getters.roles.length > 0,

      // post id (from query)
      post_id: undefined,

      // post data (from backend)
      post_data: {},

      // comment data (from backend)
      comment_data: {},
    };
  },
  methods: {
    // pagination
    onPageChange(curPage, limit) {
      this.refreshList(curPage, limit);
    },
    refreshList(curPage = this.curPage, limit = this.limit) {
      get_post_info({
        id: this.post_id,
        offset: (curPage - 1) * limit,
        limit: limit,
      })
        .then((res) => {
          this.post_data = res.post_data;
          this.post_data.floor = 1;
          this.comment_data = res.comment_data;
          this.comment_data.forEach(
            (c, i) => (c.floor = i + (this.curPage - 1) * this.limit + 2)
          );
        })
        .catch((err) => console.log("error: " + err));
    },

    // comment
    reply_on_post() {
      if (this.comment_content == "") {
        this.$message.error("评论内容还为空哦");
        return;
      }

      // let fd = new FormData();
      // fd.append("content", this.comment_content);
      // this.comment_image_info.forEach((f) => fd.append("image", f));
      // fd.append("post_id", this.post_id);

      reply_on_post({ content: this.comment_content, post_id: this.post_id })
        .then((res) => {
          if (res.code === 20000) {
            this.$message.success("回复成功！");
          } else this.$message.error("阿欧，好像回复出现了一点小问题..");
        })
        .catch((err) => console.log("error: " + err));
    },

    // collect
    collect() {
      collect_post(this.post_id).then(() => {
        this.post_data.is_collected = !this.post_data.is_collected;
      });
    },
  },
  mounted() {
    this.post_id = this.$route.params.post_id;
    this.refreshList();
  },
};
</script>
