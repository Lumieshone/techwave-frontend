<template>
  <p>处理举报</p>
</template>

<script>
export default {
  name: "ProcessReport",
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
