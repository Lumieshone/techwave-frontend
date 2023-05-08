<template>
  <v-container>
    <LoginReminder></LoginReminder>
    <v-row v-show="isLogin">
      <v-col cols="3" class="pa-0">
        <v-card height="650px" width="100%" color="#483D8B" tile>
          <v-navigation-drawer color="#483D8B" width="100%" dark tile permanent>
            <v-list>
              <v-list-item class="ml-8">
                <v-list-item-avatar size="56">
                  <v-img :src="userAvatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 ml-2">
                    消息中心
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <div v-for="(item, index) in items" :key="item.title">
                <v-list-item :to="item.router" @click="read(item.type)" link class="pl-16 py-1">
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="pt-0">
                      <v-list-item-title>
                        <v-badge
                            color="red"
                            :offset-x="-3"
                            :content="item.count"
                            :value="item.count">
                        {{ item.title }}
                        </v-badge>
                      </v-list-item-title>
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
      <v-col cols="9" class="pa-0">
        <v-card height="100%" width="100%" color="#483D8B" tile>
          <v-container>
            <v-row>
              <v-col cols="12">
                <router-view />
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
  computed:{
      items() {
        return [
          {
            title: "我的消息",
            icon: "mdi-message",
            router: "/message/my-message",
            count: this.$store.getters.listCount,
            type: "message"
          },
          {
            title: "系统通知",
            icon: "mdi-bell",
            router: "/message/system-notification",
            count: this.$store.getters.notificationCount,
            type: "system"
          },
          {
            title: "收到的赞",
            icon: "mdi-thumb-up",
            router: "/message/received-like",
            count: this.$store.getters.likeCount,
            type: "like"
          },
          {
            title: "回复我的",
            icon: "mdi-reply",
            router: "/message/reply-me",
            count: this.$store.getters.replyCount,
            type: "reply"
          },
        ];
      },
  },
  data() {
    return {
      isLogin: this.$store.getters.roles.length !== 0,
      show: false,
      size: 2.5,
      userAvatar: "",
      username: "",
    };
  },
  //注册组件
  components: {
    LoginReminder,
  },
  methods: {
    read(type){
      this.$store.dispatch(
          "count/updateState",type
      ).then(()=>{
        console.log(this.$store.getters.total)
        console.log(this.items)
      }).catch((err) => console.log("error: " + err))
    }
  },
  mounted() {
    if (this.isLogin) {
      console.log("获取用户信息成功");
      this.username = this.$store.getters.username;
      this.userAvatar = this.$store.getters.avatar;
    }
  },
};
</script>
<style scoped>

</style>
