<template>
  <v-card
    ><v-card-title>发布{{ topic == 1 ? "求购" : "出售" }}帖子</v-card-title>
    <v-card-subtitle>*可以查看联系方式的用户均经过学号认证</v-card-subtitle>
    <v-card-text>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="handlePublishTransaction">
          <v-row>
            <v-col cols="8">
              <validation-provider
                v-slot="{ errors }"
                name="Title"
                rules="required"
              >
                <v-text-field
                  v-model="transactionInfo.title"
                  :error-messages="errors"
                  label="主题"
                  color="#7d73be"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3">
              <validation-provider
                v-slot="{ errors }"
                name="Price"
                rules="required|numeric"
              >
                <v-text-field
                  v-model="transactionInfo.price"
                  :error-messages="errors"
                  label="价格(￥)"
                  color="#7d73be"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <validation-provider
                v-slot="{ errors }"
                name="Campus Zone"
                rules="required"
              >
                <v-select
                  v-model="transactionInfo.campus"
                  :items="campusZones"
                  item-value="value"
                  item-text="text"
                  color="#7d73be"
                  :error-messages="errors"
                  label="校区"
                ></v-select> </validation-provider
            ></v-col>

            <v-col cols="2">
              <validation-provider
                v-slot="{ errors }"
                name="Contact Type"
                rules="required"
              >
                <v-select
                  v-model="transactionInfo.contactType"
                  :items="contactTypes"
                  color="#7d73be"
                  :error-messages="errors"
                  label="联系方式"
                ></v-select>
              </validation-provider>
            </v-col>

            <v-col cols="3">
              <validation-provider
                v-slot="{ errors }"
                name="Contact Number"
                rules="required"
              >
                <v-text-field
                  v-model="transactionInfo.contactNumber"
                  :error-messages="errors"
                  label="联系号码"
                  color="#7d73be"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-spacer></v-spacer>

            <v-col cols="2">
              <validation-provider
                v-slot="{ errors }"
                name="Tag"
                rules="required"
              >
                <v-select
                  :error-messages="errors"
                  v-model="transactionInfo.selectTagId"
                  :items="tags"
                  item-text="tagName"
                  item-value="tagId"
                  color="#7d73be"
                  label="标签"
                  persistent-hint
                ></v-select>
              </validation-provider>
            </v-col>
            <v-col cols="2">
              <validation-provider
                v-slot="{ errors }"
                name="Sub Tag"
                rules="required"
              >
                <v-select
                  :error-messages="errors"
                  v-model="transactionInfo.selectSubtagId"
                  :items="subtags"
                  item-text="subtagName"
                  item-value="subtagId"
                  label="子标签"
                  color="#7d73be"
                  persistent-hint
                ></v-select>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <validation-provider
                v-slot="{ errors }"
                name="Description"
                rules="required"
              >
                <v-textarea
                  v-model="transactionInfo.summary"
                  :error-messages="errors"
                  label="商品描述"
                  color="#7d73be"
                  required
                  solo
                ></v-textarea>
              </validation-provider>
            </v-col>
          </v-row>
          <v-file-input
            v-model="transactionInfo.image"
            accept="image/*"
            small-chips
            multiple
            label="上传图片"
          ></v-file-input>

          <v-spacer></v-spacer>

          <v-btn color="#483D8B" text @click="close_publish_dialog">
            返回
          </v-btn>
          <v-btn color="#483D8B" type="submit" :disabled="invalid" text>
            发布
          </v-btn>
        </form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
import { publish_transaction, get_all_first_tags } from "@/api/sale";

import { required, numeric } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("numeric", {
  ...numeric,
  message: "{_field_} must be a legal number",
});

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PublishTransaction",
  props: {
    topic: Number,
  },
  data() {
    return {
      tags: [],

      // filter by campus
      campusZones: [
        {
          text: "全部",
          value: "",
        },
        {
          text: "四平",
          value: "四平",
        },
        {
          text: "嘉定",
          value: "嘉定"
        },
        {
          text: "彰武",
          value: "彰武"
        },
        {
          text: "沪西",
          value: "沪西"
        },],

      contactTypes: ["微信", "QQ", "手机", "领英", "邮箱"],
      transactionInfo: {
        title: "iphone 18",
        price: 1234,
        image: [],
        selectTagId: undefined,
        selectSubtagId: undefined,
        summary: "十分帝豪啊",
        campus: "嘉定",
        contactType: "微信",
        contactNumber: "1234",
      },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    close_publish_dialog() {
      this.$emit("close_publish_dialog");
    },

    handlePublishTransaction() {
      this.$refs.observer
        .validate()
        .then(() => {
          let fd = new FormData();
          fd.append("type", this.topic == 0 ? "sell" : "seek");
          fd.append("title", this.transactionInfo.title);
          fd.append("price", this.transactionInfo.price);
          fd.append("tagId", this.transactionInfo.selectTagId);
          fd.append("subtagId", this.transactionInfo.selectSubtagId);
          fd.append("content", this.transactionInfo.summary);
          fd.append("campusZone", this.transactionInfo.campus);
          fd.append("contactType", this.transactionInfo.contactType);
          fd.append("contactNumber", this.transactionInfo.contactNumber);
          this.transactionInfo.image.forEach((f) => fd.append("image", f));
          publish_transaction(fd).then(() => {
            this.$message.success("发布成功！");
            window.location.reload();
          });
        })
        .catch(() => {
          this.$message.error("发布失败！");
        });
    },
  },
  computed: {
    subtags: function () {
      if (this.transactionInfo.selectTagId == undefined) {
        return [];
      } else {
        return this.tags.find((t) => t.tagId == this.transactionInfo.selectTagId).subtagList;
      }
    },
  },
  mounted() {
    get_all_first_tags()
      .then((res) => {
        this.tags = res.data;
      })
      .error(() => {
        this.$message.error("获取tag失败...");
      });
  },
};
</script>
