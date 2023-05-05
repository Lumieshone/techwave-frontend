<template>
  <v-container>
    <v-carousel
      cycle
      height="200"
      hide-delimiter-background
      show-arrows-on-hover
      style="border-radius: 20px"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-row class="fill-height" align="center" justify="center">
          <div
            class="carousel"
            :style="`backgroundImage:url(${require(`@/assets/homepage_bg/pic${
              i + 1
            }.jpg`)})`"
          >
            <div class="text-h4 carousel__title" style="text-stroke: black">
              {{ slide }}
            </div>
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-card shaped>
      <v-card-title style="margin-top: 20px; margin-bottom: 20px"
        >热门新闻</v-card-title
      >
      <v-card-subtitle>浏览最新的电子产品资讯！</v-card-subtitle>
      <v-divider></v-divider>
      <v-row align="center" justify="center">
        <v-col md="12">
          <v-list subheader tile>
            <v-list-item-group active-class="brown--text">
              <template v-for="(item, index) in newsInfo">
                <single-post-item :item="item" :key="index"></single-post-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-card>

    <v-card shaped>
      <v-card-title style="margin-top: 50px; margin-bottom: 20px"
        >热门帖子</v-card-title
      >
      <v-card-subtitle>浏览当下的热门帖子，一起来交流！</v-card-subtitle>
      <v-divider></v-divider>
      <v-row align="center" justify="center">
        <v-col md="12">
          <v-list subheader tile>
            <v-list-item-group active-class="brown--text">
              <template v-for="(item, index) in postsInfo">
                <single-post-item :item="item" :key="index"></single-post-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { getNews, getHotPosts } from "@/api/homepage.js";
import SinglePostItem from "@/components/SinglePostItem.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "GetNews",
  data() {
    return {
      slides: [
        "发现最新的电子产品资讯",
        "TechWave，欢迎你的到来",
        "与科技同行，畅游数码世界",
        "拓展科技视野，获取前沿资讯",
      ],

      postsInfo: [],
      newsInfo: [],
    };
  },
  components: {
    SinglePostItem,
  },
  methods: {
    stepToPost(postId) {
      this.$router.push({ path: "/post/" + postId, params: { id: postId } });
    },
  },
  mounted() {
    getHotPosts()
      .then((res) => {
        this.postsInfo = res.data;
      })
      .catch((err) => console.log("error: " + err));
    getNews()
      .then((res) => {
        this.newsInfo = res.data;
      })
      .catch((err) => console.log("error: " + err));
  },
};
</script>

<style scoped>
.carousel {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.carousel__title {
  margin: 0;
  padding: 0;
  color: #fff;
}
</style>
