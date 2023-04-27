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
          <span class="section_intro">关注：{{ sectionData.followCount }}</span>
          <template v-slot:actions>
            <v-btn color="#6A5ACD" text v-on:click="followOrUnfollow">
              <v-icon :color="sectionData.isFollowed ? 'orange' : 'grey'"
                >mdi-bell</v-icon
              >
              关注
            </v-btn>
            <v-btn color="#6A5ACD" text v-on:click="collect">
              <v-icon :color="sectionData.isCollected ? 'orange' : 'grey'"
                >mdi-star</v-icon
              >
              收藏
            </v-btn>
            <v-btn color="#6A5ACD" text v-on:click="post">
              <v-icon>mdi-square-edit-outline</v-icon>
              发帖
            </v-btn>
            <v-btn color="#6A5ACD" text v-on:click="report">
              <v-icon>mdi-chart-multiple</v-icon>
              举报
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
          <v-tab @change="refreshList"> 全部帖子 </v-tab>
          <v-tab @change="getPinnedPost">置顶</v-tab>
          <v-tab @change="getHighlightedPosts">精华</v-tab>
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
                      v-text="item.likeCount"
                    ></v-list-item-action-text>
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
        <v-row>
          <v-col cols="8">
            <v-pagination
              color="#6A5ACD"
              v-if="Math.ceil(sectionData.postCount / perPage) > 1"
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
      :sectionName="this.sectionName"
      :showPostDialog="this.showPostDialog"
      @callBack="callBack"
    >
    </PostDialog>
  </v-container>
</template>

<script>
import {
  collectSection,
  // getHighlightedPosts,
  // getPinnedPosts,
  // getAllPosts,
  getPostsBySubsection,
  getSectionData,
  // followOrUnfollowSection,
  // searchPostInSection,
} from "@/api/section";

import PostDialog from "@/views/home/section/components/PostDialog";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Section",
  data() {
    return {
      page: 1,
      ifFilter: false,
      showPostDialog: false,
      perPage: 10,
      subsectionId: 0,
      subsectionList: [],
      itemLength: 20,
      whichPage: 1,
      // ability to collect(is login?)
      ableToCollect: this.$store.getters.roles.length > 0,
      sectionId: undefined,
      sectionName: "",
      sectionData: {},
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
    collect() {
      this.sectionData.isCollected = !this.sectionData.isCollected;
      collectSection(this.sectionId)
        .then((res) => {
          console.log(res.message);
          if (res.code === 20000) {
            if (this.sectionData.isCollected)
              this.$message.success("收藏版块成功！");
            else this.$message.success("取消收藏成功！");
          } else {
            if (this.sectionData.isCollected)
              this.$message.error("收藏版块失败！");
            else this.$message.success("取消收藏失败！");
          }
        })
        .catch((err) => console.log("error: " + err));
    },
    post() {
      this.showPostDialog = true;
    },
    stepToPost(postId) {
      this.$router.push({ path: "/post/" + postId, params: { id: postId } });
    },
    onPageChange(page, perPage) {
      if (this.subsectionId === 0)
        getPostsBySubsection(this.sectionId, page, perPage)
          .then((res) => {
            this.sectionData = res.data;
          })
          .catch((err) => console.log("error: " + err));
      else {
        getPostsBySubsection(this.sectionId, this.subsectionId, page, perPage)
          .then((res) => {
            console.log(res.data.total);
            this.sectionData.postCount = res.data.total;
            this.sectionData.postVOList = res.data.postDataVOList;
          })
          .catch((err) => console.log("error: " + err));
      }
    },
    jumpPage() {
      this.page = Number(this.whichPage);
      this.onPageChange(this.page, this.perPage);
    },
    refreshList() {
      this.subsectionId = 0;
      this.page = 1;
      getPostsBySubsection(this.sectionId, 1, 10)
        .then((res) => {
          this.sectionData = res.data;
        })
        .catch((err) => console.log("error: " + err));
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
    followOrUnfollow() {
      // TODO: finish
    },
    report() {
      // TODO: finish
    },
    getPinnedPost() {
      // TODO: finish
    },
    getHighlightedPosts() {
      // TODO: finish
    },
  },
  mounted() {
    this.sectionId = this.$route.params.sectionId;
    getSectionData(this.sectionId, 1, this.perPage)
      .then((res) => {
        console.log(res.data)
        this.sectionData = res.data;
        this.subsectionList = res.data.subSectionList;
        this.sectionName = res.data.name;
        console.log(this.sectionData);
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
