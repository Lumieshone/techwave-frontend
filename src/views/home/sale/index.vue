<template>
  <v-container>
    <v-tabs centered v-model="topic" style="margin-bottom: 20px">
      <v-tab key="sell">出售</v-tab>
      <v-tab key="seek">求购</v-tab>
    </v-tabs>
    <v-row>
      <v-col cols="9">
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
      <v-col cols="3">
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
        :key="transaction_data.id"
      >
        <v-card height="360px">
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
  </v-container>
</template>

<script>
import { get_sale_info } from "@/api/sale";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Sale",
  data() {
    return {
      topic: "sell", // or seek

      // pagination
      curPage: 1,
      limit: 9,
      total: undefined,

      // transaction data
      transactions_data: [],

      // filter by campus
      campus_zones: ["全部", "四平", "嘉定", "彰武", "沪西"],
      campus_zone_filter: "全部",

      // filter by tags?

      // search
      search_content: "",
      search_loading: false,
    };
  },
  methods: {
    // pagination
    onPageChange(curPage, limit) {
      this.refreshList(curPage, limit);
    },

    refreshList(curPage = this.curPage, limit = this.limit) {
      get_sale_info({
        search_content: this.search_content,
        campus_zone: this.campus_zone_filter,
        // tag?
        offset: (curPage - 1) * limit,
        limit: limit,
        type: this.topic,
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
        // tag?
        offset: 0,
        limit: this.limit,
        type: this.type,
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
    this.refreshList();
  },
};
</script>
