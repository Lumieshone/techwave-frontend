<template>
  <v-container>
    <v-card>
      <v-chip label class="ma-2" color="#e6e6f9"
        ><strong>{{ transactionInfo.tagName }}</strong></v-chip
      >
      <v-chip label class="ma-2" color="#e6e6f9">{{
        transactionInfo.subtagName
      }}</v-chip>

      <v-card-title>
        <span style="margin: 20px 10px"
          >[{{ transactionInfo.type }}] {{ transactionInfo.title }}</span
        ></v-card-title
      >
      <v-card-subtitle>
        <v-avatar>
          <img :src="transactionInfo.avatar" :alt="transactionInfo.authorName" />
        </v-avatar>
        <span style="margin: 10px">
          {{ transactionInfo.authorName }} {{ transactionInfo.publishTime }}
          {{ transactionInfo.campus }} 校区</span
        >
        <v-btn
          v-on:click="collect"
          v-show="transactionInfo.type == '出售'"
          absolute
          right
        >
          <v-icon :color="transactionInfo.isCollected ? 'orange' : 'grey'">mdi-star</v-icon>
          收藏
          <!-- {{
            transactionInfo.type == "出售" ? transactionInfo.collectNumber : ""
          }} -->
        </v-btn>
        浏览{{ transactionInfo.viewCounts }}
      </v-card-subtitle>
      <v-card-text>
        <p>Price: {{transactionInfo.price}}</p>
        <p>{{ transactionInfo.content }}</p>
        <v-row>
          <v-col
            v-for="imageUrl in transactionInfo.imagesList"
            :key="imageUrl"
            class="d-flex child-flex"
            cols="4"
          >
            <v-img
              :src="imageUrl"
              :lazy-src="imageUrl"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          elevation="2"
          :disabled="!able_to_see_transaction"
          v-on:click="open_contact_dialog()"
        >
          <v-icon>mdi-card-account-mail</v-icon>
          <span>{{
            able_to_see_transaction ? "查看联系方式" : "请先登录"
          }}</span>
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- contact -->
    <v-dialog v-model="show_contact_dialog" width="30%">
      <v-card >
        <v-card-title>联系方式</v-card-title>
        <v-card-text
          >{{ contactInfo.contactType }} ： {{ contactInfo.contactNumber }}
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="#7d73be" 
            class="ma-2 white--text"
            small
            @click="close_contact_dialog"
          >
            关闭
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>

    <!-- authenticate -->
    <v-alert type="info" v-show="!able_to_see_transaction"
      >请先完成登录且完成学生认证！<v-btn
        style="margin-right: 10px"
        outlined
        :to="`/login?redirect=transaction/${transactionId}`"
        >登录</v-btn
      ><v-btn outlined to="/account/certify">前往学生认证</v-btn></v-alert
    >
  </v-container>
</template>

<script>
import { get_transaction_info, collect_transaction } from "@/api/transaction";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "TransactionPost",
  components: {},
  data() {
    return {
      // authenticate
      able_to_see_transaction:
        this.$store.getters.roles.length > 0 &&
        this.$store.getters.isAuthenticated,

      // is collected (for 出售)
      isCollected: false,

      // contact
      show_contact_dialog: false,
      contactInfo: {},

      // transaction
      transactionId: undefined,
      transactionInfo: {},
    };
  },
  methods: {
    // contact
    open_contact_dialog() {
      this.show_contact_dialog = true;
    },
    close_contact_dialog() {
      this.show_contact_dialog = false;
    },

    // collect
    collect() {
      let fd = new FormData();
      fd.append("id", this.transactionId);
      collect_transaction(fd)
        .then(() => {
          this.transactionInfo.isCollected = !this.transactionInfo.isCollected;
        })
        .catch((err) => console.log("error: " + err));
    },
  },
  mounted() {
    this.transactionId = this.$route.params.transactionId;
    if (this.able_to_see_transaction) {
      get_transaction_info(this.transactionId)
        .then((res) => {
          this.transactionInfo = res.data;
          this.contactInfo.contactNumber = res.data.contactNumber;
          this.contactInfo.contactType = res.data.contactType;
        })
        .catch((err) => console.log("error: " + err));
    }
  },
};
</script>
