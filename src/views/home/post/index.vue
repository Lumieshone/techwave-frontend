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

    <!-- tags -->
    <!-- <v-chip class="ma-2" v-for="tag in post_data.tags.map((t) => '#' + t)" :key="tag">{{tag}}</v-chip> -->

    <!-- 是否收藏 -->
    <v-btn :disabled="!is_login" v-on:click="collect">
      <v-icon :color="post_data.is_collected ? 'orange' : 'grey'"
        >mdi-star</v-icon
      >
      {{ is_login ? "收藏" : "请先登录再收藏" }}
    </v-btn>

    <!-- 楼层 -->
    <v-col
      v-for="singlelayer_data in post_data.layer_data"
      :key="singlelayer_data.floor"
    >
      <PostLayer
        :layer_data="singlelayer_data"
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
    <v-col>
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
    </v-col>

    <!-- test rich text editor -->
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="rich_post_data"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div>
  </v-container>
</template>

<script>
import PostLayer from "@/views/home/post/components/layer.vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

import { get_post_info, collect_post, reply_on_post } from "@/api/post";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  components: {
    PostLayer,
    Editor,
    Toolbar,
  },
  data() {
    return {
      // pagination
      curPage: 1,
      limit: 5,

      // comment
      comment_content: "",
      comment_image_info: [],

      // is login?
      is_login: this.$store.getters.roles.length > 0,

      // post id (from query)
      post_id: undefined,

      // post data (from backend)
      post_data: {},

      // test rich text editor
      editor: null,
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
      rich_post_data: '<p>hello</p>',
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
        })
        .catch((err) => console.log("error: " + err));
    },

    // comment
    reply_on_post() {
      if (this.comment_content == "") {
        this.$message.error("评论内容还为空哦");
        return;
      }

      let fd = new FormData();
      fd.append("content", this.comment_content);
      this.comment_image_info.forEach((f) => fd.append("image", f));
      fd.append("post_id", this.post_id);

      reply_on_post(fd)
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

    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
  },
  mounted() {
    this.post_id = this.$route.params.post_id;
    this.refreshList();

    setTimeout(() => {
      this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
    }, 1500);
  },

  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>