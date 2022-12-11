<template>
  <v-container>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2">{{ slide }} Slide</div>
          </v-row>
        </v-sheet>
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
                        {{ item.reply }}
                      </v-chip>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="item.subtitle"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.poster"
                      ></v-list-item-action-text>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.time"
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
                        {{ item.reply }}
                      </v-chip>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="item.subtitle"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.poster"
                      ></v-list-item-action-text>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.time"
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
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],

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
        this.postsInfo = res.data.postsInfo;
      })
      .catch((err) => console.log("error: " + err));
    get_news()
      .then((res) => {
        this.newsInfo = res.data.newsInfo;
      })
      .catch((err) => console.log("error: " + err));
  },
};
</script>
