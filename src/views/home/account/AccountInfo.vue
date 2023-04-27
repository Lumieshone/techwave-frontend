<template>
  <v-card height="550" class="mx-4 my-5">
    <v-card-title v-text="title"></v-card-title>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      :readonly="isReadonly"
      class="pa-8 pt-6"
    >
      <v-text-field
        color="#483D8B"
        dense
        readonly
        filled
        outlined
        prepend-icon="mdi-card-account-details-outline"
        label="账户名"
        :value="account"
      ></v-text-field>
      <v-text-field
        color="#483D8B"
        dense
        outlined
        maxlength="10"
        :counter="10"
        :filled="isFilled"
        prepend-icon="mdi-account-circle-outline"
        :rules="nameRules"
        label="昵称"
        v-model="username"
      ></v-text-field>
      <v-text-field
        v-model="phoneNum"
        color="#483D8B"
        maxlength="11"
        dense
        outlined
        :filled="isFilled"
        prepend-icon="mdi-cellphone"
        :rules="phoneRules"
        label="联系方式"
      ></v-text-field>
      <v-select
        v-model="gender"
        color="#483D8B"
        prepend-icon="mdi-gender-transgender"
        dense
        outlined
        :filled="isFilled"
        :items="genderList"
        item-text="name"
        item-value="id"
        label="性别"
      ></v-select>
      <v-textarea
        v-model="intro"
        maxlength="100"
        :rows="3"
        outlined
        no-resize
        :filled="isFilled"
        :rules="introRules"
        prepend-icon="mdi-face-man-shimmer"
        :counter="100"
        color="#483D8B"
        label="自我介绍"
      ></v-textarea>
      <v-row justify="end">
        <v-btn
          color="#6A5ACD"
          class="ma-4 mt-6 white--text"
          :disabled="isDisabled"
          @click="changeInfo"
          >编辑
        </v-btn>
        <v-btn
          color="#6A5ACD"
          :disabled="!valid || !isDisabled"
          class="ma-4 mt-6 white--text"
          @click="submitChange"
          >保存
        </v-btn>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { editInfo, getUserInfo } from "@/api/account";

export default {
  name: "AccountInfo",
  data() {
    return {
      isLogin: this.$store.getters.roles.length !== 0,
      title: "个人信息",
      isReadonly: true,
      isFilled: true,
      isDisabled: false,
      valid: true,
      avatar: require("@/assets/avatar.jpg"),
      username: "",
      account: "",
      phoneNum: "",
      gender: "",
      genderList: ["男", "女", "其他"],
      intro: "",
      nameRules: [(v) => v.length <= 10 || "昵称长度不应超过10个字符"],
      phoneRules: [(v) => v.length >= 11 || "电话号码长度为11位"],
      introRules: [(v) => v.length <= 100 || "自我介绍不应超过100个字符"],
    };
  },
  methods: {
    changeInfo() {
      this.isReadonly = !this.isReadonly;
      this.isFilled = !this.isFilled;
      this.isDisabled = !this.isDisabled;
    },
    submitChange() {
      if (this.$refs.form.validate()) {
        this.isDisabled = !this.isDisabled;
        this.isReadonly = !this.isReadonly;
        this.isFilled = !this.isFilled;
        let form = {
          username: this.username,
          phone: this.phoneNum,
          gender: this.gender,
          intro: this.intro,
        };
        editInfo(form)
          .then((res) => {
            console.log(res.message);
            if (res.code === 20000) {
              this.$message.success("修改个人信息成功！");
              window.location.reload();
            }
            else this.$message.error("修改个人信息失败~");
          })
          .catch((err) => console.log("error: " + err));
      }
    },
  },
  mounted() {
    if (this.isLogin) {
      getUserInfo()
        .then((res) => {
          if (res.code === 20000) {
            console.log("获取用户信息成功");
            this.username = res.data.username;
            this.account = res.data.account;
            this.phoneNum = res.data.phoneNumber;
            this.gender = res.data.gender;
            this.intro = res.data.summary;
          } else {
            this.$message.error("用户信息获取失败！");
          }
        })
        .catch((err) => console.log("error: " + err));
    }
  },
};
</script>

<style scoped></style>
