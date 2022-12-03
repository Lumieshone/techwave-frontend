<template>
  <v-card
    ><v-card-title
      >发布{{ topic == "seek" ? "求购" : "出售" }}帖子</v-card-title
    >
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
                  v-model="transaction_info.title"
                  :error-messages="errors"
                  label="Title"
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
                  v-model="transaction_info.price"
                  :error-messages="errors"
                  label="Price(￥)"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <validation-provider
                v-slot="{ errors }"
                name="Description"
                rules="required"
              >
                <v-select
                  v-model="transaction_info.campus_zone"
                  :items="campus_zones"
                  :error-messages="errors"
                  label="Campus Zone"
                ></v-select> </validation-provider
            ></v-col>

            <v-spacer></v-spacer>
            <v-col cols="2">
              <validation-provider
                v-slot="{ errors }"
                name="Description"
                rules="required"
              >
                <v-select
                  v-model="transaction_info.contact_type"
                  :items="contact_types"
                  :error-messages="errors"
                  label="Contact Type"
                ></v-select>
              </validation-provider>
            </v-col>

            <v-col cols="7">
              <validation-provider
                v-slot="{ errors }"
                name="Contact Number"
                rules="required"
              >
                <v-text-field
                  v-model="transaction_info.contact_number"
                  :error-messages="errors"
                  label="Contact Number"
                  required
                ></v-text-field>
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
                  v-model="transaction_info.description"
                  :error-messages="errors"
                  label="Description"
                  required
                  solo
                ></v-textarea>
              </validation-provider>
            </v-col>
          </v-row>
          <v-file-input
            v-model="transaction_info.image"
            accept="image/*"
            small-chips
            multiple
            label="上传图片"
          ></v-file-input>

          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text @click="close_publish_dialog">
            Close
          </v-btn>
          <v-btn color="blue darken-1" type="submit" :disabled="invalid" text>
            Save
          </v-btn>
        </form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
import { publish_transaction } from "@/api/sale";

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
    topic: String,
  },
  data() {
    return {
      campus_zones: ["嘉定", "四平", "彰武", "沪西"],
      contact_types: ["微信", "QQ", "手机", ""],
      transaction_info: {
        title: "iphone 18",
        price: 1234,
        image: [],
        time: new Date(),
        description: "十分帝豪啊",
        campus_zone: "嘉定",
        contact_type: "微信",
        contact_number: "1234",
        tag1: undefined,
        tag2: undefined,
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
          publish_transaction({
            ...this.transaction_info,
          }).then(() => {
            this.$message.success("发布成功！");
          });
        })
        .catch(() => {
          this.$message.error("发布失败！");
        });
    },
  },
};
</script>
