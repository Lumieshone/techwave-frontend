<template>
  <v-container>
    <LoginReminder></LoginReminder>
    <v-row v-show="isLogin">
      <v-col cols="2" class="pa-0">
        <v-card height="100%" width="100%" color="#483D8B" tile>
          <v-navigation-drawer color="#483D8B" width="100%" dark tile permanent>
            <v-list>
              <v-list-item class="ml-4">
                <v-list-item-avatar size="56">
                  <v-img :src="userAvatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-title><h3>消息中心</h3></v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <div v-for="(item, index) in items" :key="item.title">
                <v-list-item :to="item.router" link class="pl-10">
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="index < items.length - 1"
                  :key="index"
                ></v-divider>
              </div>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-col>
      <v-col cols="10" class="pa-0">
        <v-card height="100%" width="100%" color="#483D8B" tile>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card height="580" class="mx-4 my-5">
                  <router-view />
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginReminder from "@/components/LoginReminder";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Message",
  data() {
    return {
      isLogin: this.$store.getters.roles.length != 0,

      show: false,
      size: 2.5,
      // username:'莴苣某人',
      // userAvatar:require("@/assets/avatar.jpg"),
      userAvatar: "",
      username: "",
      items: [
        {
          title: "我的消息",
          icon: "mdi-message",
          router: "/message/my-message",
        },
        {
          title: "系统通知",
          icon: "mdi-bell",
          router: "/message/system-notification",
        },
        {
          title: "收到的赞",
          icon: "mdi-thumb-up",
          router: "/message/received-like",
        },
        { title: "回复我的", icon: "mdi-reply", router: "/message/reply-me" },
      ],
    };
  },
  //注册组件
  components: {
    LoginReminder,
  },
  methods: {},
  mounted() {
    if (this.isLogin) {
      console.log("获取用户信息成功");
      this.username = this.$store.getters.username;
      this.userAvatar = this.$store.getters.avatar;
    }
  },
};
</script>
