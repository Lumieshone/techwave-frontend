<template>
  <v-container>
    <v-card>
      <v-card-title>
        <!-- <v-avatar size="50"
          ><img
            :src="is_login ? avatar : ''"
            :alt="is_login ? this.$store.getters.name : '登录'"
        /></v-avatar> -->
        {{ is_login ? "我的收藏" : "登录后查看收藏~" }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="3"
            v-for="collect_section_info in collect_sections_info"
            :key="collect_section_info.id"
          >
            <v-card :to="`/section/${collect_section_info.id}`">
              <v-card-title>
                <v-avatar size="50"
                  ><img
                    :src="collect_section_info.avatar"
                    :alt="collect_section_info.name"
                /></v-avatar>
                {{ collect_section_info.name }}
              </v-card-title>
              <v-card-text v-text="collect_section_info.intro"></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-divider></v-divider>
    <v-card>
      <v-card-title>推荐版块</v-card-title>
      <v-card-text>
        <v-col cols="10" class="mx-auto">
          <v-text-field
            v-model="search_content"
            label="输入搜索关键词~"
            outlined
            dense
            clearable
            :append-icon="search_loading ? 'mdi-loading' : 'mdi-magnify'"
            @click:append="search()"
          ></v-text-field>
        </v-col>

        <v-row>
          <v-col
            cols="3"
            v-for="section_info in sections_info"
            :key="section_info.id"
          >
            <v-card :to="`/section/${section_info.id}`">
              <v-card-title>
                <v-avatar size="50"
                  ><img :src="section_info.avatar" :alt="section_info.name"
                /></v-avatar>
                {{ section_info.name }}
              </v-card-title>
              <v-card-text v-text="section_info.intro"></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {
  get_collect_sections,
  get_hot_sections,
  get_search_sections,
} from "@/api/forum";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Forum",

  data() {
    return {
      // search
      search_content: "",
      search_loading: false,

      // info
      is_login: this.$store.getters.roles.length > 0,
      avatar: this.$store.getters.avatar,

      // collect sections
      collect_sections_info: [],

      // sections(hot sections as default)
      sections_info: [],
    };
  },
  methods: {
    search() {
      this.search_loading = true;
      get_search_sections(this.search_content).then((res) => {
        this.sections_info = res.sections_info;
      });
      this.search_loading = false;
    },
  },
  mounted() {
    if (this.is_login) {
      get_collect_sections().then((res) => {
        this.collect_sections_info = res.collect_sections_info;
      });
    }
    get_hot_sections().then((res) => {
      this.sections_info = res.sections_info;
    });
  },
};
</script>
