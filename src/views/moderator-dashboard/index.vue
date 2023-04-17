<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>TechWave版主中台</v-toolbar-title>
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
        <v-list-item :to="{ path: '/moderator-dashboard/edit-section' }">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>编辑版块数据</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ path: '/moderator-dashboard/pin-post' }">
            <v-list-item-icon>
              <v-icon>mdi-pin-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>置顶帖子</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ path: '/moderator-dashboard/highlight-post' }">
            <v-list-item-icon>
              <v-icon>mdi-certificate-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>设为精华</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ path: '/moderator-dashboard/process-report' }">
            <v-list-item-icon>
              <v-icon>mdi-alert-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>处理举报</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ path: '/moderator-dashboard/ban-user' }">
            <v-list-item-icon>
              <v-icon>mdi-account-off-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>封禁用户</v-list-item-title>
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
  name: "ModeratorDashboard",
  data() {
    return {
      drawer: true,
      mini: true,
    };
  },
};
</script>
