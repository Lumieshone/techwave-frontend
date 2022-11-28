<template>
  <v-container>
    <h1>{{ post_data.title }}</h1>
    <p>帖子id: {{ post_id }}</p>
    <!-- // icon 是否收藏 -->
    <v-col
      v-for="singlelayer_data in post_data.layer_data"
      :key="singlelayer_data.floor"
    >
      <PostLayer :layer_data="singlelayer_data" />
    </v-col>
    <!-- comment on post -->
    <v-col>
      <v-card>
        <v-card-title>发表你的看法..</v-card-title>
        <v-card-subtitle>请文明发言哦~</v-card-subtitle>
        <v-card-text>
          <v-textarea v-model="comment_data" outlined label="评论"></v-textarea>
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
            >发表评论
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import PostLayer from "@/views/home/post/components/layer.vue";

import {get_post_info} from "@/api/post";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  components: {
    PostLayer,
  },
  data() {
    return {
      // comment
      comment_data: "",
      comment_image_info: undefined,

      // post id (from query)
      post_id: undefined,

      // post data (from backend)
      post_data: {},
    };
  },
  methods: {
    comment_on_post() {
      console.log("comment on " + this.post_id);
      // 可能会有一个重新加载post_data的过程...
    },
  },
  mounted() {
    this.post_id = this.$route.params.post_id;
    get_post_info(this.post_id)
      .then((res) => {
        this.post_data = res.post_data;
      })
      .catch((err) => console.log("error: " + err));
  },
};
</script>
