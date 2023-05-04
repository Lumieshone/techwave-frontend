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
            <div class="text-h3 carousel__title" style="text-stroke: black">
              {{ slide }}
            </div>
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <h2 style="margin-top: 20px; margin-bottom: 20px">热门新闻</h2>
    <v-row align="center" justify="center">
      <v-col md="12">
        <v-card>
          <v-list subheader tile>
            <v-list-item-group active-class="brown--text">
              <template v-for="item in newsInfo">
                <v-list-item @click="stepToPost(item.id)" :key="item.id">
                  <template>
                    <v-list-item-avatar>
                      <v-chip color="#E6E6FA" label small>
                        {{ item.commentCount }}
                      </v-chip>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.author"
                      ></v-list-item-action-text>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.time"
                      ></v-list-item-action-text>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-list-item-action-text
                        >like:{{ item.likeCount }}
                      </v-list-item-action-text>
                      <v-list-item-action-text
                        >comment:
                        {{ item.commentCount }}</v-list-item-action-text
                      >
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <h2 style="margin-top: 20px; margin-bottom: 20px">热门帖子</h2>
    <v-row align="center" justify="center">
      <v-col md="12">
        <v-card>
          <v-list subheader tile>
            <v-list-item-group active-class="brown--text">
              <template v-for="item in postsInfo">
                <v-list-item @click="stepToPost(item.id)" :key="item.id">
                  <template>
                    <v-list-item-avatar>
                      <v-chip color="#E6E6FA" label small>
                        {{ item.commentCount }}
                      </v-chip>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>
                      <!--                    <v-list-item-subtitle-->
                      <!--                      v-text="item.title"-->
                      <!--                    ></v-list-item-subtitle>-->
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.author"
                      ></v-list-item-action-text>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.time"
                      ></v-list-item-action-text>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-list-item-action-text
                        >like:{{ item.likeCount }}
                      </v-list-item-action-text>
                      <v-list-item-action-text
                        >comment:
                        {{ item.commentCount }}</v-list-item-action-text
                      >
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
import { getNews, getHotPosts } from "@/api/homepage.js";
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
