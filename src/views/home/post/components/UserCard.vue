<template>
  <v-card>
    <v-avatar>
      <img :src="avatar" />
    </v-avatar>
    <v-card-title v-text="userCardVO.username"></v-card-title>
    <v-card-subtitle v-text="userCardVO.account"></v-card-subtitle>
    <v-card-text v-text="userCardVO.summary"></v-card-text>
    <v-card-text>
      关注数: {{ userCardVO.followCount }} 粉丝数: {{ userCardVO.fanCount }}
    </v-card-text>
  </v-card>
</template>
<script>
import { getUserCard } from "@/api/account";

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
    };
  },
  mounted() {
    console.log(this.userId);
    getUserCard(this.userId).then((response) => {
      this.userCardVO = response.data;
    });
  },
};
</script>
