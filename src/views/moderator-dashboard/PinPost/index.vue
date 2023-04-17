<template>
  <p>置顶帖子</p>
</template>

<script>
export default {
  name: "PinPost",
  data() {
    return {
      sectionId: null,
    };
  },
  mounted() {
    this.sectionId = this.$route.params.sectionId;
  },
};
</script>
