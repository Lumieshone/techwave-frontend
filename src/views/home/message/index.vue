<template>
  <v-container>
    <v-card>
      <v-card-title>消息中心</v-card-title>
    </v-card>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Message",
  data() {
    return {};
  },
};
</script>
