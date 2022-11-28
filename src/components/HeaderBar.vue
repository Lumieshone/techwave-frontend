<template>
  <v-card>
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
      <v-col
          class="text-center"
          cols="1"
      >
        <strong>济客空间</strong>
      </v-col>
      <v-divider
          class="mx-4"
          vertical
          dark
      ></v-divider>
      <v-tabs align-with-title >
        <v-tab
            class="mx-2 white--text"
            to="/news"
        >
          <v-icon
              left
              dense
          >
          mdi-home
        </v-icon>
          首页资讯
        </v-tab>
        <v-tab
            class="mx-2 white--text"
            to="/forum"
        >
          <v-icon
              left
              dense
          >
            mdi-facebook-messenger
          </v-icon>
          交流论坛
        </v-tab>
        <v-tab
            class="mx-2 white--text"
            to="/sale"
        >
          <v-icon
              left
              dense
          >
            mdi-hand-coin
          </v-icon>
          二手交易
        </v-tab>
        <v-tab
            class="mx-2 white--text"
            to="/account"
        >
          <v-icon
              left
              dense
          >
            mdi-account
          </v-icon>
          个人中心
        </v-tab>
      </v-tabs>
      <v-avatar
          size="50"
      ><img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
      ></v-avatar>
    </v-app-bar>
    <router-view />
  </v-card>
</template>

<script>
export default {
  name: "HeaderBar"
}
</script>

<style scoped>

</style>