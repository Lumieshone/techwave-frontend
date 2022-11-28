<template>
    <v-card>
    <p>forum首页</p>
      <ForumDetail></ForumDetail>
    </v-card>
</template>

<script>
import ForumDetail from "@/components/ForumDetail";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Forum",
  components: {
    ForumDetail
  },
  data() {
    return {};
  },
};
</script>