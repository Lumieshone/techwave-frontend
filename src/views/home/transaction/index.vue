<template>
  <v-container>
    <v-card>
      <v-chip label class="ma-2" color="#e6e6f9"><strong>{{transaction_info.tag1_name}}</strong></v-chip>
      <v-chip label class="ma-2" color="#e6e6f9">{{transaction_info.tag2_name}}</v-chip>

      <v-card-title>
        <span style="margin: 20px 10px"
          >[{{ transaction_info.type }}] {{ transaction_info.title }}</span
        ></v-card-title
      >
      <v-card-subtitle>
        <v-avatar>
          <img :src="transaction_info.avatar" :alt="transaction_info.author" />
        </v-avatar>
        <span style="margin: 10px">
          {{ transaction_info.author }} {{ transaction_info.time }}
          {{ transaction_info.campus_zone }} 校区</span
        >
        <v-btn
          v-on:click="collect"
          v-show="transaction_info.type == '出售'"
          absolute
          right
        >
          <v-icon :color="is_collected ? 'orange' : 'grey'">mdi-star</v-icon>
          收藏
          {{
            transaction_info.type == "出售"
              ? transaction_info.collect_number
              : ""
          }}
        </v-btn>
      </v-card-subtitle>
      <v-card-text>
        <p>{{ transaction_info.description }}</p>
        <v-row>
          <v-col
            v-for="image_url in transaction_info.images_url"
            :key="image_url"
            class="d-flex child-flex"
            cols="4"
          >
            <v-img
              :src="image_url"
              :lazy-src="image_url"
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
    <v-dialog v-model="show_contact_dialog">
      <v-card>
        <v-card-title>联系方式</v-card-title>
        <v-card-text
          >{{ contact_info.method }} ： {{ contact_info.number }}
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue"
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
        :to="`/login?redirect=transaction/${transaction_id}`"
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
      able_to_see_transaction: this.$store.getters.is_authenticated,

      // is collected (for 出售)
      is_collected: false,

      // contact
      show_contact_dialog: false,
      contact_info: {},

      // transaction
      transaction_id: undefined,
      transaction_info: {},
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
      collect_transaction(this.transaction_id)
        .then(() => {
          this.is_collected = !this.is_collected;
          if (this.is_collected == true) {
            this.transaction_info.collect_number++;
          } else {
            this.transaction_info.collect_number--;
          }
        })
        .catch((err) => console.log("error: " + err));
    },
  },
  mounted() {
    this.transaction_id = this.$route.params.transaction_id;
    if (this.able_to_see_transaction) {
      get_transaction_info(this.post_id)
        .then((res) => {
          this.transaction_info = res.transaction_info;
          this.contact_info = res.contact_info;
        })
        .catch((err) => console.log("error: " + err));
    }
  },
};
</script>
