<template>
  <v-footer
      app
      dark
      color="#483D8B"
      padless
      absolute
  >
    <v-col
        class="text-center"
        cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>济客空间</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer",
  data() {
    return {};
  },
};
</script>
