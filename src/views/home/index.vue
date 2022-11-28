<template>
  <v-container>
    <v-app-bar app>
      <v-btn
        class="mx-2 white--text"
        elevation="2"
        rounded
        color="blue"
        to="/home"
      >
        首页资讯
      </v-btn>
      <v-btn
        class="mx-2 white--text"
        elevation="2"
        rounded
        color="blue"
        to="/forum"
      >
        论坛
      </v-btn>
      <v-btn
        class="mx-2 white--text"
        elevation="2"
        rounded
        color="blue"
        to="/sale"
      >
        交易
      </v-btn>
      <v-spacer />
      <v-btn
        class="mx-2 white--text"
        elevation="2"
        rounded
        color="blue"
        to="/account"
        >个人页面
      </v-btn>
    </v-app-bar>
    <router-view />
  </v-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "HomeLayout",
  data() {
    return {};
  },
};
</script>