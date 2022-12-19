<template>
  <v-container>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-row class="fill-height" align="center" justify="center">
          <div
            class="carousel"
            :style="`backgroundImage:url(${require(`@/assets/homepage_bg/pic${
              i + 1
            }.jpg`)})`"
          >
            <!-- <img src=https://source.unsplash.com/random > -->
            <div class="text-h3 carousel__title" style="text-stroke:black">{{ slide }}</div>
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <h1>热门新闻</h1>
    <v-row align="center" justify="center">
      <v-col md="12">
        <v-card>
          <v-list subheader tile>
            <v-list-item-group active-class="brown--text">
              <template>
                <v-list-item
                  v-for="item in newsInfo"
                  :key="item.id"
                  @click="step_to_post(item.id)"
                >
                  <template>
                    <v-list-item-avatar>
                      <v-chip color="#f5e8cb" label small>
                        {{ item.commentCounts }}
                      </v-chip>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="item.summary"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.poster"
                      ></v-list-item-action-text>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.updateTime"
                      ></v-list-item-action-text>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <h1>热门帖子</h1>
    <v-row align="center" justify="center">
      <v-col md="12">
        <v-card>
          <v-list subheader tile>
            <v-list-item-group active-class="brown--text">
              <template>
                <v-list-item
                  v-for="item in postsInfo"
                  :key="item.id"
                  @click="step_to_post(item.id)"
                >
                  <template>
                    <v-list-item-avatar>
                      <v-chip color="#f5e8cb" label small>
                        {{ item.commentCounts }}
                      </v-chip>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="item.summary"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.poster"
                      ></v-list-item-action-text>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.updateTime"
                      ></v-list-item-action-text>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { get_news, get_hot_posts } from "@/api/get-news";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "GetNews",
  data() {
    return {
      slides: [
        "发现最新的电子产品资讯",
        "与校内的同道中人讨论电子产品",
        "与同学做交易，更加信得过",
        "学号认证，你我更加安全",
        "济客空间，欢迎你的到来",
      ],

      postsInfo: [],
      newsInfo: [],
    };
  },
  methods: {
    step_to_post(post_id) {
      this.$router.push({ path: "/post/" + post_id, params: { id: post_id } });
    },
  },
  mounted() {
    get_hot_posts()
      .then((res) => {
        this.postsInfo = res.data;
      })
      .catch((err) => console.log("error: " + err));
    get_news()
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
