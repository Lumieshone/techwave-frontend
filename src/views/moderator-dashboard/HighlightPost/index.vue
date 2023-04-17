<template>
  <p>设为精华</p>
</template>

<script>
export default {
  name: "HighlightPost",
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
