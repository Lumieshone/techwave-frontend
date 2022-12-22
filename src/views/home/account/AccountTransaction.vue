<template>
  <v-container>
    <v-card height="580" class="ma-4">
      <v-card-title> 我的交易 </v-card-title>
      <v-tabs color="#6A5ACD">
        <v-tab
          v-for="theme in themes"
          :key="theme.name"
          @change="change_v_tab(theme.name)"
        >
          {{ theme.chinese }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item >
          <v-list tile dense height="270%">
            <v-list-item-group active-class="deep-purple--text">
              <template v-for="transactionData in transactionsData">
                <v-list-item :key="transactionData.id">
                  <v-list-item-content
                    @click="stepToTransaction(transactionData.id)"
                  >
                    <v-list-item-title
                      v-text="transactionData.title"
                    ></v-list-item-title>
                    <v-list-item-subtitle>
                      <span>{{ transactionData.campus }} 校区</span>
                      <span>价格: {{ transactionData.price }}</span>
                      <br />
                      <span>{{
                        transactionData.summary.length > 15
                          ? transactionData.summary.slice(0, 15) + ".."
                          : transactionData.summary
                      }}</span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      @click.native="open_delete_dialog(transactionData.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider :key="transactionData.id" />
              </template>
            </v-list-item-group>
          </v-list>
        </v-tab-item>
        <v-tab-item >
          <v-list tile dense height="270%">
            <v-list-item-group active-class="deep-purple--text">
              <template v-for="transactionData in transactionsData">
                <v-list-item :key="transactionData.id">
                  <v-list-item-content
                    @click="stepToTransaction(transactionData.id)"
                  >
                    <v-list-item-title
                      v-text="transactionData.title"
                    ></v-list-item-title>
                    <v-list-item-subtitle>
                      <span>{{ transactionData.campus }} 校区</span>
                      <span>价格: {{ transactionData.price }}</span>
                      <br />
                      <span>{{
                        transactionData.summary.length > 15
                          ? transactionData.summary.slice(0, 15) + ".."
                          : transactionData.summary
                      }}</span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      @click.native="open_delete_dialog(transactionData.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider :key="transactionData.id" />
              </template>
            </v-list-item-group>
          </v-list>
        </v-tab-item>
        <v-tab-item >
          <v-list tile dense height="270%">
            <v-list-item-group active-class="deep-purple--text">
              <template v-for="transactionData in transactionsData">
                <v-list-item :key="transactionData.id">
                  <v-list-item-content
                    @click="stepToTransaction(transactionData.id)"
                  >
                    <v-list-item-title
                      v-text="transactionData.title"
                    ></v-list-item-title>
                    <v-list-item-subtitle>
                      <span>{{ transactionData.campus }} 校区</span>
                      <span>价格: {{ transactionData.price }}</span>
                      <br />
                      <span>{{
                        transactionData.summary.length > 15
                          ? transactionData.summary.slice(0, 15) + ".."
                          : transactionData.summary
                      }}</span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn @click.native="collect(transactionData.id)">
                      <v-icon
                        :color="transactionData.isCollected ? 'orange' : 'grey'"
                        >mdi-star
                      </v-icon></v-btn
                    >
                  </v-list-item-action>
                </v-list-item>
                <v-divider :key="transactionData.id" />
              </template>
            </v-list-item-group>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
      <!-- 分页 -->
      <v-pagination
        style="margin-top: 10px"
        v-if="Math.ceil(total / limit) > 1"
        v-model="curPage"
        :length="Math.ceil(total / limit)"
        total-visible="7"
        color="#6A5ACD"
        @input="onPageChange(curPage, limit)"
      ></v-pagination>
    </v-card>
    <!-- delete -->
    <v-dialog v-model="show_delete_dialog" width="30%">
      <v-card>
        <v-card-title>确认删除？</v-card-title>
        <v-card-actions>
          <v-btn
            color="#7d73be"
            class="ma-2 white--text"
            small
            @click="close_delete_dialog"
            >取消
          </v-btn>
          <v-btn
            color="#7d73be"
            class="ma-2 white--text"
            small
            @click="delete_transaction()"
          >
            删除
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {
  get_my_collect_transaction,
  get_my_sell_transaction,
  get_my_seek_transaction,
  delete_my_sell_transaction,
  delete_my_seek_transaction,
} from "@/api/account";
import { collect_transaction } from "@/api/transaction";

export default {
  name: "AccountTransaction",
  data() {
    return {
      // if have permission
      have_permission:
        this.$store.getters.roles.length > 0 &&
        this.$store.getters.isAuthenticated,
      // tab
      tab: 0,
      name:'',
      themes: [
        {
          name: "sell",
          chinese: "我的出售",
        },
        {
          name: "seek",
          chinese: "我的求购",
        },
        { name: "collect", chinese: "我收藏的" },
      ],
      transactionsData: [
        // {
        //   id: 1,
        //   title: "iphone 14急出",
        //   price: 9999,
        //   coverImage:
        //     "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
        //   campus: "嘉定",
        //   summary:
        //     "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说凑字数凑字数345tyuhytrcdfyguhiytfguhiYTFyguhiygftguHIgftyguhiygftguhi",
        // },
        // {
        //   id: 2,
        //   title: "iphone 13急出",
        //   price: 99299,
        //   coverImage:
        //     "https://picx.zhimg.com/v2-141592629306b41bff01a28a18a78acb_1440w.jpg?source=172ae18b",
        //   campus: "嘉定",
        //   summary: "集美们快充呀苹果爸爸就上了就是说",
        // },
      ],

      // pagination
      curPage: 1,
      limit: 6,
      total: undefined,

      // delete
      show_delete_dialog: false,
      delete_id: undefined,
    };
  },
  methods: {
    change_v_tab(name) {
      console.log(this.name);
      this.name = name;
      if (name === 'sell') {
        this.tab = 0;
        this.transactionsData = [];
        get_my_sell_transaction({
          offset: this.curPage,
          limit: this.limit,
        }).then((res) => {
          this.transactionsData = res.data.transactionPageVOList;
          this.total = res.data.total;
        });
      } else if (name === 'seek') {
        this.tab = 1;
        this.transactionsData = [];
        get_my_seek_transaction({
          offset: this.curPage,
          limit: this.limit,
        }).then((res) => {
          this.transactionsData = res.data.transactionPageVOList;
          this.total = res.data.total;
        });
      } else if (name === 'collect') {
        this.tab = 2;
        this.transactionsData = [];
        get_my_collect_transaction({
          offset: this.curPage,
          limit: this.limit,
        }).then((res) => {
          this.transactionsData = res.data.transactionPageVOList;
          this.transactionsData.forEach((t) => (t.isCollected = true));
          this.total = res.data.total;
        });
      }
    },
    // collect
    collect(id) {
      let fd = new FormData();
      fd.append("id", id);
      collect_transaction(fd).then(() => {
        let newTransactionData = JSON.parse(
          JSON.stringify(this.transactionsData)
        );
        newTransactionData.forEach((t) => {
          if (t.id === id) {
            t.isCollected = !t.isCollected;
          }
        });
        this.transactionsData = newTransactionData;
      });
    },
    // delete
    open_delete_dialog(id) {
      this.show_delete_dialog = true;
      this.delete_id = id;
    },
    close_delete_dialog() {
      this.show_delete_dialog = false;
      this.delete_id = undefined;
    },
    delete_transaction() {
      console.log("tab", this.tab);
      let fd = new FormData();
      fd.append("transactionId", this.delete_id);
      if (this.name === 'sell') {
        delete_my_sell_transaction(fd)
          .then(() => {
            this.$message.success("删除成功！");
            this.refreshList();
          })
          .catch(() => {
            this.$message.error("额，好像网络出了点问题..");
          });
      } else if (this.name === 'seek') {
        delete_my_seek_transaction(fd)
          .then(() => {
            this.$message.success("删除成功！");
            this.refreshList();
          })
          .catch(() => {
            this.$message.error("额，好像网络出了点问题..");
          });
      }
    },
    stepToTransaction(id) {
      this.$router.push({ path: "/transaction/" + id });
    },

    // pagination
    onPageChange(curPage, limit) {
      this.refreshList(curPage, limit);
    },

    refreshList(curPage = this.curPage, limit = this.limit) {
      console.log(this.name);
      if (this.name === 'sell') {
        this.transactionsData = [];
        get_my_sell_transaction({
          offset: curPage,
          limit: limit,
        }).then((res) => {
          this.transactionsData = res.data.transactionPageVOList;
          this.total = res.data.total;
        });
      } else if (this.name === 'seek') {
        this.transactionsData = [];
        get_my_seek_transaction({
          offset: curPage,
          limit: limit,
        }).then((res) => {
          this.transactionsData = res.data.transactionPageVOList;
          this.total = res.data.total;
        });
      } else if (this.name === 'collect') {
        this.transactionsData = [];
        get_my_collect_transaction({
          offset: curPage,
          limit: limit,
        }).then((res) => {
          this.transactionsData = res.data.transactionPageVOList;
          this.total = res.data.total;
        });
      }
    },
  },
  mounted() {
    if (this.have_permission) {
      this.name="sell";
      get_my_sell_transaction({
        offset: 1,
        limit: 6,
      }).then((res) => {
        this.transactionsData = res.data.transactionPageVOList;
        this.total = res.data.total;
      });
    } else {
      this.$message.error("额，你似乎还未完成认证...");
    }
  },
};
</script>

<style scoped></style>
