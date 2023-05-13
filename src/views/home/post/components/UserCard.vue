<template>
  <v-card shaped width="300px" height="300px">
    <v-avatar>
      <img :src="avatar" />
    </v-avatar>
    <v-card-title v-text="userCardVO.username"></v-card-title>
    <v-card-subtitle v-text="userCardVO.account"></v-card-subtitle>
    <v-card-content>
      <v-card-text>签名：{{ userCardVO.summary }}</v-card-text>
      <v-card-text>
        关注数: {{ userCardVO.followCount }} 粉丝数: {{ userCardVO.fanCount }}
      </v-card-text>
    </v-card-content>
    <v-card-actions>
      <v-btn
        color="#7d73be"
        class="ma-2 white--text"
        small
        @click="followOrUnfollow"
        >{{ this.ifFollow ? "已关注" : "未关注" }}</v-btn
      >
      <v-btn color="#7d73be" class="ma-2 white--text" small @click="goToChat"
        >私信</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import { getUserCard } from "@/api/account";
import { followOrUnfollowUser, getIfFollowUser } from "@/api/post";
import { createChatList } from "@/api/message";

export default {
  name: "UserCard",
  props: {
    userId: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userCardVO: {},
      ifFollow: false,
      // is login?
      isLogin: this.$store.getters.roles.length > 0,
    };
  },
  methods: {
    followOrUnfollow() {
      if (this.isLogin) {
        followOrUnfollowUser(this.userId).then(() => {
          this.ifFollow = !this.ifFollow;
          if (this.ifFollow) {
            this.$message.success("已关注" + this.userCardVO.username);
          } else {
            this.$message.success("已取消关注" + this.userCardVO.username);
          }
        });
      } else {
        this.$message.error("请先登录");
      }
    },
    goToChat() {
      createChatList(this.userId).then((res) => {
        if (res.code === 20000) {
          console.log("create chat list success");
          this.$router.push({
            path: "/message/my-message",
            query: {
              userId: this.userId,
            },
          });
        }
      });
    },
  },
  mounted() {
    getUserCard(this.userId).then((response) => {
      this.userCardVO = response.data;
    });
    getIfFollowUser(this.userId).then((response) => {
      this.ifFollow = response.data;
    });
  },
};
</script>
