<template>
  <p>编辑版块资料</p>
</template>

<script>
export default {
  name: "EditSectionData",
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
