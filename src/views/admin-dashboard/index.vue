<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>TechWave管理员中台</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="grey lighten-4"
      :mini-variant.sync="mini"
    >
      <v-list-item class="px-2">
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>{{ mini ? "mdi-chevron-right" : "mdi-chevron-left" }}</v-icon>
          <v-title v-if="!mini">导航栏</v-title>
        </v-btn>
      </v-list-item>
      <v-list>
        <v-list-item :to="{ path: '/admin-dashboard/process-report' }">
          <v-list-item-icon>
            <v-icon>mdi-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-title>处理举报</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ path: '/admin-dashboard/process-section-request' }">
          <v-list-item-icon>
            <v-icon>mdi-sitemap</v-icon>
          </v-list-item-icon>
          <v-list-item-title>处理版块申请</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AdminDashboard",
  data() {
    return {
      drawer: true,
      mini: true,
    };
  },
};
</script>
