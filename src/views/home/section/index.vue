<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-card width="90%" shaped>
        <v-banner single-line tile>
          <v-avatar>
            <img :src="sectionData.avatar" :alt="sectionData.name" />
          </v-avatar>
          <v-chip class="ma-2" color="#E6E6FA" label text-color="#6A5ACD">
            <strong>{{ sectionData.name }}</strong>
          </v-chip>
          <span class="section_intro">介绍：{{ sectionData.summary }}</span>
          <template v-slot:actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#6A5ACD"
                  text
                  v-on:click="collectOrUnCollect"
                  v-bind="attrs"
                  v-on="on"
                  small
                >
                  <v-icon :color="sectionData.isCollected ? 'orange' : 'grey'"
                    >mdi-bell</v-icon
                  >
                  {{ sectionData.collectCount }}
                </v-btn>
              </template>
              <span>收藏</span>
            </v-tooltip>
            <v-menu
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" color="#6A5ACD" text small>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-subtitle>分享到</v-card-subtitle>
                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item
                    v-for="(item, index) in shareItems"
                    :key="index"
                    @click="share(item)"
                  >
                    <v-list-item-icon>
                      <v-icon size="18" dense>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content class="font-weight-regular">{{
                      item.label
                    }}</v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#6A5ACD"
                  text
                  @click="showPostDialog = true"
                  v-bind="attrs"
                  v-on="on"
                  small
                >
                  <v-icon>mdi-square-edit-outline</v-icon>
                </v-btn>
              </template>
              <span>发帖</span>
            </v-tooltip>
            <div class="d-flex justify-center align-center">
              <!-- TODO: 添加loading -->

              <!-- <v-text-field
                v-model="searchContent"
                color="#6A5ACD"
                dense
                shaped
                outlined
                label="搜索帖子"
              ></v-text-field> -->
              <v-menu
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="#6A5ACD" text v-bind="attrs" v-on="on" small>
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </template>
                <v-card width="300px" shaped>
                  <v-card-title class="subtitle-2">版块内搜索</v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="searchContent"
                      dense
                      label="请输入搜索关键字"
                      full-width
                      color="#6A5ACD"
                      clearable
                      style="width: 200px"
                    ></v-text-field>
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-btn color="#6A5ACD" text @click="searchContent = ''">
                      清空</v-btn
                    >
                    <v-btn text color="#6A5ACD" @click="refreshList('search')"
                      >搜索</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-menu>
            </div>
          </template>
        </v-banner>
      </v-card>
    </v-row>
    <v-row no-gutters justify="center" style="margin-top: 25px">
      <v-card width="90%" shaped>
        <v-tabs
          light
          center-active
          color="#6A5ACD"
          show-arrows
          next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline"
        >
          <v-tabs-slider color="#6A5ACD"></v-tabs-slider>
          <v-tab @change="refreshList('all')">
            <v-icon color="grey" small>mdi-expand-all-outline </v-icon>全部帖子
          </v-tab>
          <v-tab @change="refreshList('pinned')"
            ><v-icon color="grey" small>mdi-arrow-up-bold</v-icon>置顶</v-tab
          >
          <v-tab @change="refreshList('highlighted')"
            ><v-icon color="grey" small>mdi-marker</v-icon>精华</v-tab
          >
          <v-tab
            v-for="subsection in sectionData.subSectionList"
            :key="subsection.id"
            @change="getPostBySubsection(subsection.id)"
          >
            {{ subsection.name }}
          </v-tab>
        </v-tabs>

        <v-list subheader tile min-height="600" max-height="1000">
          <v-list-item-group active-class="deep-purple--text">
            <template v-for="(item, index) in sectionData.postVOList">
              <single-post-item :item="item" :key="index"></single-post-item>
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
import SinglePostItem from "@/components/SinglePostItem.vue";

import {
  // toQQzone,
  toWeibo,
  // toQQ
} from "@/utils/share";

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

      // share
      shareItems: [
        // { label: "QQ", icon: "mdi-qqchat" },
        { label: "微博", icon: "mdi-sina-weibo" },
        // { label: "QQ空间", icon: "mdi-qrcode" },
        { label: "复制链接", icon: "mdi-link" },
      ],
    };
  },
  components: {
    PostDialog,
    SinglePostItem,
  },
  methods: {
    copyToClipboard(text) {
      const tempInput = document.createElement("input");
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    },
    share(item) {
      item = item.label;
      let title = "快来TechWave看看这个版块吧！" + this.sectionData.name;
      console.log(window.location.href);
      // if (item == "QQ") {
      //   toQQ(window.location.href, title);
      // } else if (item == "微博") {
      //   toWeibo(window.location.href, title);
      // } else if (item == "QQ空间") {
      //   toQQzone(window.location.href, title);
      // } else if (item == "复制链接") {
      //   this.$copyText(window.location.href).then(() => {
      //     this.$message.success("复制成功！");
      //   });
      // }
      if (item == "微博") {
        toWeibo(window.location.href, title);
      } else if (item == "复制链接") {
        this.copyToClipboard(window.location.href);
        this.$message.success("复制成功！");
      }
    },
    callBack(flag, ifPost) {
      this.showPostDialog = flag;
      if (ifPost) {
        window.location.reload();
      }
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
