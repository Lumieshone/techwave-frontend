<template>
  <v-container>
    <v-tabs centered v-model="topic" style="margin-bottom: 20px">
      <v-tab key="sell" @click="change_v_tab('sell')">出售</v-tab>
      <v-tab key="seek" @click="change_v_tab('seek')">求购</v-tab>
    </v-tabs>
    <v-row>
      <v-col cols="5">
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
      <v-col cols="2">
        <v-select
          v-model="tag_id"
          :items="tags"
          item-text="name"
          item-value="id"
          dense
          label="一级tag"
          persistent-hint
          @change="filter_by_tag_and_get_subtags()"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="subtag_id"
          :items="subtags"
          item-text="name"
          item-value="id"
          dense
          label="二级tag"
          persistent-hint
          @change="filter_by_subtag()"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="campus_zone_filter"
          :items="campus_zones"
          dense
          disable-lookup
          label="校区"
          persistent-hint
          @change="search()"
        ></v-select>
      </v-col>
    </v-row>
    <!-- <v-tabs-items v-model="topic">
      <v-tab-item key="sell"> 

      </v-tab-item>
      <v-tab-item key="seek"> 

      </v-tab-item>
    </v-tabs-items> -->

    <v-row>
      <v-col
        cols="4"
        v-for="transaction_data in transactions_data"
        :key="transaction_data.transaction_id"
      >
        <v-card
          height="360px"
          :to="`/transaction/${transaction_data.transaction_id}`"
        >
          <v-img :src="transaction_data.image_url" height="200px"> </v-img>
          <v-card-title v-text="transaction_data.title"></v-card-title>
          <v-card-subtitle>
            <span>{{ transaction_data.campus_zone }} 校区</span>
            <span style="margin: 10px">|</span>
            <span>价格: {{ transaction_data.price }}</span>
          </v-card-subtitle>
          <v-card-text>
            <span>{{
              transaction_data.description.length > 40
                ? transaction_data.description.slice(0, 40) + ".."
                : transaction_data.description
            }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 分页 -->
    <v-pagination
      style="margin-top: 10px"
      v-if="Math.ceil(total / limit) > 1"
      v-model="curPage"
      :length="Math.ceil(total / limit)"
      total-visible="7"
      @input="onPageChange(curPage, limit)"
    ></v-pagination>

    <!-- 发布交易帖子 -->
    <v-dialog
      v-model="show_publish_dialog"
      transition="dialog-bottom-transition"
      max-width="60%"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn top absolute right v-bind="attrs" v-on="on"
          >发布{{ topic == "seek" ? "求购" : "出售" }}帖子</v-btn
        >
      </template>
      <PublishTransaction
        @close_publish_dialog="show_publish_dialog = false"
        :topic="topic"
      />
    </v-dialog>

    <!-- 提示需要完成注册 -->
    <v-row justify="center">
      <v-card max-width="50%" v-show="!have_permission">
        <v-card-title> 阿欧..你还没有登录/完成学生认证.. </v-card-title>
        <v-card-text
          >为保护同学们的个人隐私，进入此页面需要先完成认证哦~</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            style="margin-right: 10px"
            outlined
            :to="`/login?redirect=/sale`"
            >登录</v-btn
          ><v-btn outlined to="/account/certify">前往学生认证</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { get_sale_info, get_all_first_tags, get_subtags } from "@/api/sale";

import PublishTransaction from "@/views/home/sale/components/publish-transaction.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Sale",
  components: {
    PublishTransaction,
  },
  data() {
    return {
      topic: 0, // 0->sell 1->seek

      // pagination
      curPage: 1,
      limit: 9,
      total: undefined,

      // transaction data
      transactions_data: [],

      // filter by campus
      campus_zones: ["全部", "四平", "嘉定", "彰武", "沪西"],
      campus_zone_filter: "全部",

      // filter by tags
      tags: undefined,
      subtags: undefined,
      tag_id: undefined,
      subtag_id: undefined,

      // search
      search_content: "",
      search_loading: false,

      // publish dialog
      show_publish_dialog: false,

      // if have permission
      have_permission:
        this.$store.getters.roles.length > 0 &&
        this.$store.getters.is_authenticated,
    };
  },
  methods: {
    // change v-tab
    change_v_tab(topic) {
      if (topic == "sell") this.topic = 0;
      else if (topic == "seek") this.topic = 1;

      this.curPage = 1;
      this.refreshList();
    },

    // pagination
    onPageChange(curPage, limit) {
      this.refreshList(curPage, limit);
    },

    refreshList(curPage = this.curPage, limit = this.limit) {
      get_sale_info({
        search_content: this.search_content,
        campus_zone: this.campus_zone_filter,
        tag_id: this.tag_id,
        subtag_id: this.subtag_id,
        offset: (curPage - 1) * limit,
        limit: limit,
        type: this.topic == 0 ? "sell" : "seek",
      })
        .then((res) => {
          this.transactions_data = res.transactions_data;
          this.total = res.total;
        })
        .catch((err) => console.log("error: " + err));
    },

    // search
    search() {
      get_sale_info({
        search_content: this.search_content,
        campus_zone: this.campus_zone_filter,
        tag_id: this.tag_id,
        subtag_id: this.subtag_id,
        offset: 0,
        limit: this.limit,
        type: this.topic == 0 ? "sell" : "seek",
      })
        .then((res) => {
          this.transactions_data = res.transactions_data;
          this.total = res.total;
          this.curPage = 1;
        })
        .catch((err) => console.log("error: " + err));
    },

    filter_by_tag_and_get_subtags() {
      get_sale_info({
        search_content: this.search_content,
        campus_zone: this.campus_zone_filter,
        tag_id: this.tag_id,
        offset: 0,
        limit: this.limit,
        type: this.topic == 0 ? "sell" : "seek",
      })
        .then((res) => {
          this.transactions_data = res.transactions_data;
          this.total = res.total;
          this.curPage = 1;
        })
        .catch((err) => console.log("error: " + err));

      get_subtags(this.tag_id)
        .then((res) => {
          this.subtags = res.tags;
        })
        .error(() => {
          this.$message.error("获取二级tag失败...");
        });

      this.subtag_id = undefined;
    },

    filter_by_subtag() {
      get_sale_info({
        search_content: this.search_content,
        campus_zone: this.campus_zone_filter,
        tag_id: this.tag_id,
        subtag_id: this.subtag_id,
        offset: 0,
        limit: this.limit,
        type: this.topic == 0 ? "sell" : "seek",
      })
        .then((res) => {
          this.transactions_data = res.transactions_data;
          this.total = res.total;
          this.curPage = 1;
        })
        .catch((err) => console.log("error: " + err));
    },
  },

  mounted() {
    if (this.have_permission) {
      this.refreshList();
      get_all_first_tags()
        .then((res) => {
          this.tags = res.tags;
        })
        .error(() => {
          this.$message.error("获取一级tag失败...");
        });
    }
  },
};
</script>
