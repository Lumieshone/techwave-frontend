<template>
  <p>封禁账户</p>
</template>

<script>
export default {
  name: "BanUser",
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
