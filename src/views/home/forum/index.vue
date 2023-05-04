<template>
  <v-container>
    <v-card>
      <v-card-title>
        <!-- <v-avatar size="50"
          ><img
            :src="isLogin ? avatar : ''"
            :alt="isLogin ? this.$store.getters.name : '登录'"
        /></v-avatar> -->
        {{ isLogin ? "我的收藏" : "登录后查看收藏~" }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="3"
            v-for="collectSectionInfo in collectSectionsInfo"
            :key="collectSectionInfo.sectionId"
          >
            <v-card :to="`/section/${collectSectionInfo.sectionId}`">
              <v-card-title>
                <v-avatar size="50"
                  ><img
                    :src="collectSectionInfo.avatar"
                    :alt="collectSectionInfo.name"
                /></v-avatar>
                {{ collectSectionInfo.name }}
              </v-card-title>
              <v-card-text v-text="collectSectionInfo.summary"></v-card-text>
              <v-card-text
                >follower: {{ collectSectionInfo.collectCount }}</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-pagination
          circle
          color="#6A5ACD"
          v-if="Math.ceil(totalCollectSections / collectPerPage) > 1"
          v-model="collectPage"
          :length="Math.ceil(totalCollectSections / collectPerPage)"
          @input="getCollectSectionsByPage()"
        ></v-pagination>
      </v-card-actions>
    </v-card>

    <v-divider></v-divider>
    <v-card min-height="500">
      <v-card-title>推荐版块</v-card-title>
      <v-card-text>
        <v-col cols="10" class="mx-auto">
          <v-text-field
            v-model="searchContent"
            label="输入搜索关键词~"
            outlined
            dense
            color="#7d73be"
            clearable
            :append-icon="searchLoading ? 'mdi-loading' : 'mdi-magnify'"
            @click:append="search()"
          ></v-text-field>
        </v-col>

        <v-row>
          <v-col
            cols="3"
            v-for="sectionInfo in sectionsInfo"
            :key="sectionInfo.sectionId"
          >
            <v-card :to="`/section/${sectionInfo.sectionId}`">
              <v-card-title>
                <v-avatar size="50"
                  ><img :src="sectionInfo.avatar" :alt="sectionInfo.name"
                /></v-avatar>
                {{ sectionInfo.name }}
              </v-card-title>
              <v-card-text v-text="sectionInfo.summary"></v-card-text>
              <v-card-text
                >follower: {{ sectionInfo.collectCount }}</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-pagination
          circle
          color="#6A5ACD"
          v-if="Math.ceil(totalSections / sectionPerPage) > 1"
          v-model="collectPage"
          :length="Math.ceil(totalSections / sectionPerPage)"
          @input="onSectionPageChange()"
        ></v-pagination>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {
  getCollectSections,
  getHotSections,
  getSearchSections,
} from "@/api/homepage";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Forum",

  data() {
    return {
      // search
      searchContent: "",
      searchLoading: false,

      // info
      isLogin: this.$store.getters.roles.length > 0,
      avatar: this.$store.getters.avatar,

      // collect sections
      collectSectionsInfo: [],
      totalCollectSections: 0,
      collectPage: 1,
      collectPerPage: 10,
      collectLoading: false,

      // sections(hot sections as default)
      sectionsInfo: [],
      totalSections: 0,
      sectionPage: 1,
      sectionPerPage: 10,
      sectionLoading: false,
    };
  },
  methods: {
    getCollectSectionsByPage() {
      this.collectLoading = true;
      getCollectSections(this.collectPage, this.collectPerPage)
        .then((res) => {
          this.collectSectionsInfo = res.data.result;
          this.totalCollectSections = res.data.total;
        })
        .finally(() => {
          this.collectLoading = false;
        });
    },
    getHotSectionsByPage() {
      this.sectionLoading = true;
      getHotSections(this.sectionPage, this.sectionPerPage)
        .then((res) => {
          this.sectionsInfo = res.data.result;
          this.totalSections = res.data.total;
        })
        .finally(() => {
          this.sectionLoading = false;
        });
    },
    getSearchSectionsByPage() {
      this.searchLoading = true;

      getSearchSections(
        this.searchContent,
        this.sectionPage,
        this.sectionPerPage
      )
        .then((res) => {
          this.sectionsInfo = res.data.result;
          this.totalSections = res.data.total;
        })
        .finally(() => {
          this.searchLoading = false;
        });
    },
    search() {
      this.sectionPage = 1;
      if (this.searchContent === "") {
        this.getHotSectionsByPage();
      } else {
        this.getSearchSectionsByPage();
      }
    },
    onSectionPageChange() {
      if (this.searchContent === "") {
        this.getHotSectionsByPage();
      } else {
        this.getSearchSectionsByPage();
      }
    },
  },
  mounted() {
    if (this.isLogin) {
      this.getCollectSectionsByPage();
    }
    this.getHotSectionsByPage();
  },
};
</script>
