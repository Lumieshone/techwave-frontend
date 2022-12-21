<template>
  <v-card height="580" class="mx-4 my-6">
    <v-card-title v-text="title"></v-card-title>
    <v-banner outlined single-line transition="slide-y-transition">
      您的学生认证状态：
      <v-chip class="ma-1" color="success" v-if="this.isStudent">
        <span style="color: white">已认证</span>
      </v-chip>
      <v-chip v-else class="ma-1" color="red">
        <span style="color: white">未认证</span>
      </v-chip>
    </v-banner>
    <v-container class="mx-4">
      <v-card-title v-if="!isStudent">学生认证申请</v-card-title>
      <v-card-title v-else>我的学生信息</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation class="pa-4 mr-16">
        <v-text-field
          color="#483D8B"
          dense
          :readonly="isStudent"
          :outlined="!isStudent"
          :rules="IDRules"
          prepend-icon="mdi-account"
          label="学号"
          v-model="studentId"
        ></v-text-field>
        <v-file-input
          v-if="!isStudent"
          v-model="file"
          label="上传一卡通清晰照片"
          :show-size="1000"
          accept="image/*"
          color="#483D8B"
          prepend-icon="mdi-panorama-outline"
        >
        </v-file-input>
        <v-row justify="end" class="mt-5">
          <v-btn
            v-if="!isStudent"
            color="#6A5ACD"
            :disabled="!valid"
            class="ma-3 white--text"
            @click="publishCertify"
            >提交
          </v-btn>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { get_user_info, publish_certify } from "@/api/account";

export default {
  name: "AccountCertify",
  data() {
    return {
      title: "学生认证",
      valid: true,
      studentId: "",
      IDRules: [(v) => v.length === 7 || "学号必须是7位！"],
      file: [],
      isStudent: false,
      email: "",
    };
  },
  methods: {
    publishCertify() {
      let fd = new FormData();
      fd.append("studentId", this.studentID);
      fd.append("cardPicture", this.file);
      for (let [a, b] of fd.entries()) {
        console.log(a, b);
      }
      publish_certify(fd)
        .then((res) => {
          console.log(res.message);
          if (res.code === 20000) this.$message.success("成功！");
          else this.$message.error("失败~");
        })
        .catch((err) => console.log("error: " + err));
    },
  },
  mounted() {
    get_user_info()
      .then((res) => {
        if (res.code === 20000) {
          console.log("获取用户信息成功");
          if (res.data.studentId !== null) {
            this.studentId = res.data.studentId;
            this.isStudent = true;
          }
        } else {
          this.$message.error("用户信息获取失败！");
        }
      })
      .catch((err) => console.log("error: " + err));
  },
};
</script>

<style scoped></style>
