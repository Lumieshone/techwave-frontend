<template>
  <h1>haha!</h1>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
