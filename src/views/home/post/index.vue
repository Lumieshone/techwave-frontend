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
      <v-icon :color="post_data.is_collected ? 'orange' : 'grey'">mdi-star</v-icon>
      {{ is_login ? "收藏" : "请先登录再收藏" }}
    </v-btn>

    <!-- 楼层 -->
    <v-col
      v-for="singlelayer_data in post_data.layer_data"
      :key="singlelayer_data.floor"
    >
      <PostLayer :layer_data="singlelayer_data" />
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
            @click="comment_on_post"
            disabled="!is_login"
          >
            {{ is_login ? "评论" : "请先登录再发表评论" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import PostLayer from "@/views/home/post/components/layer.vue";

import { get_post_info, collect_post } from "@/api/post";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  components: {
    PostLayer,
  },
  data() {
    return {
      // pagination
      curPage: 1,
      limit: 5,

      // comment
      comment_content: "",
      comment_image_info: undefined,

      // is login?
      is_login: this.$store.getters.roles.length > 0,

      // post id (from query)
      post_id: undefined,

      // post data (from backend)
      post_data: {},
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
    comment_on_post() {
      console.log("comment on " + this.post_id);
      // 可能会有一个重新加载post_data的过程...
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
