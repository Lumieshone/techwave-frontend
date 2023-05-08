<template>
  <v-card height="580px" class="mx-4 my-5" :loading="this.loading">
    <v-card-title v-text="title"></v-card-title>
    <v-row class="ml-5 mt-3 mr-n16">
      <v-col cols="8">
        <v-text-field
          color="#483D8B"
          dense
          readonly
          outlined
          prepend-icon="mdi-lock"
          label="密码"
          value="***************"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn color="#6A5ACD" class="white--text" @click="changePassword"
          >修改
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="ml-5 mr-n16">
      <v-col cols="8">
        <v-text-field
          color="#483D8B"
          dense
          outlined
          readonly
          prepend-icon="mdi-mail"
          label="邮箱"
          v-model="email"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn color="#6A5ACD" class="white--text" @click="changeEmail"
          >修改
        </v-btn>
      </v-col>
    </v-row>
    <EditPassword :dialogVisible="this.dialogVisible_1" @callBack="callBack_1">
    </EditPassword>
    <EditEmail
      :dialogVisible="this.dialogVisible_2"
      :oldEmail="this.email"
      @close="close"
      @callBack="callBack_2"
    >
    </EditEmail>
  </v-card>
</template>

<script>
import EditEmail from "@/views/home/account/components/EditEmail";
import EditPassword from "@/views/home/account/components/EditPassword";
import { getUserInfo } from "@/api/account";
export default {
  name: "AccountSafety",
  data() {
    return {
      title: "安全设置",
      loading: false,
      email: "",
      dialogVisible_1: false,
      dialogVisible_2: false,
    };
  },
  components: {
    EditEmail,
    EditPassword,
  },
  methods: {
    close(flag) {
      this.dialogVisible_2 = flag;
    },
    callBack_1(flag) {
      this.dialogVisible_1 = flag;
    },
    callBack_2(flag) {
      this.email = flag;
    },
    changePassword() {
      this.dialogVisible_1 = !this.dialogVisible_1;
    },
    changeEmail() {
      this.dialogVisible_2 = !this.dialogVisible_2;
    },
  },
  mounted() {
    this.loading = true;
    getUserInfo()
      .then((res) => {
        if (res.code === 20000) {
          console.log("获取邮箱成功");
          this.email = res.data.email;
          this.loading = false;
        } else {
          this.$message.error("用户邮箱获取失败！");
        }
      })
      .catch((err) => console.log("error: " + err));
  },
};
</script>

<style scoped></style>
