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
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
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
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {
  // get_collect_sections,
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

      // sections(hot sections as default)
      sectionsInfo: [],
    };
  },
  methods: {
    search() {
      this.searchLoading = true;
      getSearchSections(this.searchContent).then((res) => {
        this.sectionsInfo = res.data;
      });
      this.searchLoading = false;
    },
  },
  mounted() {
    // if (this.isLogin) {
    //   get_collect_sections().then((res) => {
    //     this.collectSectionsInfo = res.data;
    //   });
    // }
    getHotSections().then((res) => {
      this.sectionsInfo = res.data;
    });
  },
};
</script>
