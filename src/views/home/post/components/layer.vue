<template>
  <v-container>
    <h1>{{ post_data.title }}</h1>
    <p>帖子id: {{post_id}}</p>
    <v-col
      v-for="singlelayer_data in post_data.layer_data"
      :key="singlelayer_data.floor"
    >
      <v-card>
        <v-card-title>
          <span style="margin: 5px">{{ singlelayer_data.floor }} 楼 </span>
          <span style="margin: 5px">{{ singlelayer_data.author }}</span>
          <v-avatar>
            <img
              :src="singlelayer_data.avatar"
              :alt="singlelayer_data.author"
            />
          </v-avatar>
        </v-card-title>
        <v-card-subtitle
          ><span>{{ singlelayer_data.time }}</span></v-card-subtitle
        >
        <v-card-text>
          <span>{{ singlelayer_data.content }}</span>
          <PostComment></PostComment>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- comment on post -->
    <v-col>
      <v-card>
        <v-card-title>发表你的看法..</v-card-title>
        <v-card-subtitle>请文明发言哦~</v-card-subtitle>
        <v-card-text>
          <v-textarea
            v-model="comment_data"
            outlined
            label="评论"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
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
import PostComment from "@/views/home/post/components/comment.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PostLayer",
  components: {
    PostComment,
  },
  data() {
    return {
      // comment
      comment_data: "",
      // post id (from query)
      post_id: undefined,
      // post data (from backend)
      post_data: {
        title: "an Apple a day keeps op away",
        layer_data: [
          {
            floor: 1,
            avatar:
              "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
            author: "baokker",
            time: new Date(),
            content:
              "apple nb,\n但是说到原神《原神》为我们的女儿我们唯一也是正确的能做的事。保护可莉！！！举报 八，我绝不后退. 删评证据，是谁在心虚. ",
          },
          {
            floor: 2,
            avatar:
              "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
            author: "ph",
            time: new Date(),
            content: "iphone nb",
          },
        ],
      },
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
  },
};
</script>
