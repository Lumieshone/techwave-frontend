<template>
  <v-container>
    <v-app-bar
      app
      color="#6A76AB"
      dark
      shrink-on-scroll
      height="60"
      src="@/assets/background.jpg"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-col class="text-center" cols="1">
        <strong>TechWave</strong>
      </v-col>
      <v-divider class="mx-4" vertical dark></v-divider>
      <v-tabs align-with-title>
        <v-tab class="mx-2 white--text" to="/news">
          <v-icon left dense> mdi-home </v-icon>
          首页资讯
        </v-tab>
        <v-tab class="mx-2 white--text" to="/forum">
          <v-icon left dense> mdi-facebook-messenger </v-icon>
          交流论坛
        </v-tab>
        <v-tab class="mx-2 white--text" to="/account">
          <v-icon left dense> mdi-account </v-icon>
          个人中心
        </v-tab>
      </v-tabs>

      <!-- 右部菜单栏 -->
      <v-menu offset-y>
        <v-tab class="mx-2 white--text" to="/message">
          <v-icon left dense> mdi-account </v-icon>
          消息
        </v-tab>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="50" v-on:click.native="drawer = !drawer"
            ><img
              :src="is_login ? avatar : ''"
              :alt="is_login ? name : '登录'"
              v-bind="attrs"
              v-on="on"
          /></v-avatar>
        </template>
        <v-list>
          <v-list-item :disabled="is_login" @click="login()"
            ><v-list-item-title>登录</v-list-item-title></v-list-item
          >
          <v-list-item :disabled="!is_login" @click="logout()"
            ><v-list-item-title>登出</v-list-item-title></v-list-item
          >
        </v-list>
      </v-menu>
    </v-app-bar>
    <router-view />
  </v-container>
</template>

<script>
export default {
  name: "HeaderBar",
  data() {
    return {
      drawer: false,
      is_login: this.$store.getters.roles.length != 0,
      avatar: this.$store.getters.avatar,
      name: this.$store.getters.name,
    };
  },
  methods: {
    login() {
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    logout() {
      this.$store
        .dispatch("user/logout")
        .then(() => {
          console.log("logout completed");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
