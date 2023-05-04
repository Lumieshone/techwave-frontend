<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-card width="90%">
        <v-banner single-line tile>
          <v-avatar>
            <img :src="sectionData.avatar" :alt="sectionData.name" />
          </v-avatar>
          <v-chip class="ma-2" color="#E6E6FA" label text-color="#6A5ACD">
            <strong>{{ sectionData.name }}</strong>
          </v-chip>
          <span class="section_intro">介绍：{{ sectionData.summary }}</span>
          <template v-slot:actions>
            <v-btn color="#6A5ACD" text v-on:click="collectOrUnCollect">
              <v-icon :color="sectionData.isCollected ? 'orange' : 'grey'"
                >mdi-bell</v-icon
              >
              收藏{{ sectionData.collectCount }}
            </v-btn>
            <v-btn color="#6A5ACD" text @click="showPostDialog = true">
              <v-icon>mdi-square-edit-outline</v-icon>
              发帖
            </v-btn>
            <v-text-field
              v-model="searchContent"
              label="搜索帖子"
            ></v-text-field>
            <v-btn color="#6A5ACD" text @click="refreshList('search')">
              <v-icon>mdi-magnify</v-icon>
              搜索
            </v-btn>
          </template>
        </v-banner>
      </v-card>
    </v-row>
    <v-row no-gutters justify="center">
      <v-card width="90%">
        <v-tabs
          light
          color="#6A5ACD"
          next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline"
          show-arrows
        >
          <v-tabs-slider color="#6A5ACD"></v-tabs-slider>
          <v-tab @change="refreshList('all')"> 全部帖子 </v-tab>
          <v-tab @change="refreshList('pinned')">置顶</v-tab>
          <v-tab @change="refreshList('highlighted')">精华</v-tab>
          <v-tab
            v-for="subsection in sectionData.subSectionList"
            :key="subsection.id"
            @change="getPostBySubsection(subsection.id)"
          >
            {{ subsection.name }}
          </v-tab>
        </v-tabs>
      </v-card>
    </v-row>
    <v-row no-gutters justify="center">
      <v-card width="90%">
        <v-list subheader tile min-height="600" max-height="1000">
          <v-list-item-group active-class="deep-purple--text">
            <template v-for="(item, index) in sectionData.postVOList">
              <v-list-item @click="stepToPost(item.id)" :key="item.id">
                <template>
                  <v-list-item-avatar>
                    <v-chip color="#E6E6FA" label small>
                      {{ item.commentCount }}
                    </v-chip>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
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
                      >comment: {{ item.commentCount }}</v-list-item-action-text
                    >
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < sectionData.postVOList.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
        <v-row
          v-if="
            Math.ceil(sectionData.postCount / perPage) > 1 && type != 'pinned'
          "
        >
          <v-col cols="8">
            <v-pagination
              color="#6A5ACD"
              v-model="page"
              :length="Math.ceil(sectionData.postCount / perPage)"
              :total-visible="12"
              @input="onPageChange(page, perPage)"
            ></v-pagination>
          </v-col>
          <v-col cols="4">
            <v-row no-gutters>
              <span class="lead">跳转至第</span>
              <v-text-field
                class="shrink"
                solo
                dense
                color="#7d73be"
                v-model="whichPage"
              ></v-text-field>
              <span class="lead">页</span>
              <v-btn class="goBtn" small fab @click="jumpPage()">GO</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <PostDialog
      :subsectionList="this.subsectionList"
      :sectionId="this.sectionId"
      :sectionName="this.sectionData.name"
      :showPostDialog="this.showPostDialog"
      @callBack="callBack"
    >
    </PostDialog>
  </v-container>
</template>

<script>
import {
  collectSection,
  getHighlightedPosts,
  getPinnedPosts,
  getAllPosts,
  getPostsBySubsection,
  getSectionData,
  searchPostInSection,
} from "@/api/section";

import PostDialog from "@/views/home/section/components/PostDialog";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Section",
  data() {
    return {
      sectionId: undefined,

      // section info and post vo list
      sectionData: {},

      // pagination
      page: 1,
      perPage: 10,

      showPostDialog: false,

      subsectionId: undefined,
      subsectionList: [],

      whichPage: 1,

      // ability to collect(is login?)
      ableToCollect: this.$store.getters.roles.length > 0,

      // filter type
      type: "all",

      // search
      searchContent: "",
    };
  },
  components: {
    PostDialog,
  },
  methods: {
    callBack(flag) {
      this.showPostDialog = flag;
      window.location.reload();
    },
    collectOrUnCollect() {
      collectSection(this.sectionId)
        .then((res) => {
          console.log(res.message);
          if (res.code === 20000) {
            this.sectionData.isCollected = !this.sectionData.isCollected;
            if (this.sectionData.isCollected) {
              this.sectionData.collectCount++;
              this.$message.success("收藏成功！");
            } else {
              this.sectionData.collectCount--;
              this.$message.success("取消收藏成功！");
            }
          }
        })
        .catch((err) => console.log("error: " + err));
    },
    stepToPost(postId) {
      this.$router.push({ path: "/post/" + postId });
    },
    onPageChange(page, perPage) {
      const fetchData = (fn) => {
        fn()
          .then((res) => {
            this.sectionData.postCount = res.data.total;
            this.sectionData.postVOList = res.data.postDataVOList;
          })
          .catch((err) => console.log("error: " + err));
      };

      if (this.type === "all") {
        fetchData(() => getAllPosts(this.sectionId, page, perPage));
      } else if (this.type === "highlighted") {
        fetchData(() => getHighlightedPosts(this.sectionId, page, perPage));
      } else if (this.type === "search")
        fetchData(() =>
          searchPostInSection(this.sectionId, this.searchContent, page, perPage)
        );
      else {
        // subsection
        fetchData(() =>
          getPostsBySubsection(this.sectionId, this.subsectionId, page, perPage)
        );
      }
    },
    jumpPage() {
      this.page = Number(this.whichPage);
      this.onPageChange(this.page, this.perPage);
    },
    refreshList(type) {
      this.page = 1;
      this.type = type;
      if (type === "all") {
        this.onPageChange(this.page, this.perPage);
      } else if (type === "highlighted") {
        this.onPageChange(this.page, this.perPage);
      } else if (type === "search") {
        this.onPageChange(this.page, this.perPage);
      } else if (type === "pinned") {
        getPinnedPosts(this.sectionId).then((res) => {
          this.sectionData.postCount = res.data.total;
          this.sectionData.postVOList = res.data.postDataVOList;
        });
      } else {
        // subsection
        this.getPostBySubsection(type);
      }
    },
    getPostBySubsection(id) {
      this.page = 1;
      this.subsectionId = id;
      console.log(id);
      getPostsBySubsection(this.sectionId, id, 1, 10)
        .then((res) => {
          if (res.code === 20000) {
            console.log(res.data.total);
            this.sectionData.postCount = res.data.total;
            this.sectionData.postVOList = res.data.postDataVOList;
          } else {
            console.log(res.msg);
          }
        })
        .catch((err) => console.log("error: " + err));
    },
    report() {
      // TODO: finish
    },
  },
  mounted() {
    this.sectionId = this.$route.params.sectionId;
    getSectionData(this.sectionId, 1, this.perPage)
      .then((res) => {
        this.sectionData = res.data;
        this.subsectionList = res.data.subSectionList;
      })
      .catch((err) => console.log("error: " + err));
  },
};
</script>

<style scoped>
.lead {
  margin-top: 7px;
}
.section_intro {
  margin-left: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #6a5acd;
}
.v-text-field {
  width: 45px;
  height: 20px;
  margin-left: 8px;
  margin-right: 8px;
}
.goBtn {
  margin-left: 10px;
}
</style>
