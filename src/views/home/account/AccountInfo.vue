<template>
  <v-card height="580" class="mx-4 my-5">
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
        label="用户名"
        :value="username"
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
        v-model="nickname"
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
          class="ma-4 white--text"
          :disabled="isDisabled"
          @click="changeInfo"
          >编辑
        </v-btn>
        <v-btn
          color="#6A5ACD"
          :disabled="!valid || !isDisabled"
          class="ma-4 white--text"
          @click="submitChange"
          >保存
        </v-btn>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { edit_info, get_user_info } from "@/api/account";

export default {
  name: "AccountInfo",
  data() {
    return {
      is_login: this.$store.getters.roles.length != 0,

      title: "个人信息",
      isReadonly: true,
      isFilled: true,
      isDisabled: false,
      valid: true,
      avatar: require("@/assets/avatar.jpg"),
      username: "",
      nickname: "",
      phoneNum: "",
      gender: "",

      // username: 'wlf',
      // nickname: "wlf_1989",
      // phoneNum: "19890604918",
      // gender: "男",
      genderList: ["男", "女", "其他"],
      intro: "",
      // intro: "你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。" +
      //     "游戏发生在一个被称作「提瓦特」的幻想世界，" +
      //     "在这里，被神选中的人将被授予「神之眼」，导引元素之力。后边忘了",
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
          nickname: this.nickname,
          phone: this.phoneNum,
          gender: this.gender,
          intro: this.intro,
        };
        edit_info(form)
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
    if (this.is_login) {
      get_user_info()
        .then((res) => {
          if (res.code === 20000) {
            console.log("获取用户信息成功");
            this.nickname = res.data.nickname;
            this.username = res.data.username;
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
