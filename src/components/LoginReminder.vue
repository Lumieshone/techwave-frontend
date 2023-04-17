<template>
  <!-- 提示需要登录 -->
  <v-row justify="center">
    <v-card
      max-width="50%"
      v-show="!isLogin"
      style="
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <v-card-title> 阿欧..你还没有登录..</v-card-title>
      <v-card-text>进入此页面需要登录哦~ </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          style="margin-right: 10px"
          outlined
          :to="`/login?redirect=${redirect}`"
          >登录
        </v-btn>
        <v-btn style="margin-right: 10px" outlined :to="`/register`"
          >注册
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: "LoginReminder",
  props: {
    redirect: {
      type: String,
      default: "/",
    },
  },
  data: () => ({
    isLogin: false,
  }),
  created() {
    this.isLogin = this.$store.getters.roles.length != 0
  },
};
</script>
