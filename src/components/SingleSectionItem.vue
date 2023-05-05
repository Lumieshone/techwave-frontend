<template>
  <v-card
    :to="`/section/${item.sectionId}`"
    shaped
    class="elevation-2"
    height="150px"
  >
    <v-row no-gutters>
      <v-col cols="3" class="d-flex align-center justify-center">
        <v-avatar size="40"
          ><img :src="item.avatar" :alt="item.name"
        /></v-avatar>
      </v-col>
      <v-col cols="9">
        <v-card-title v-text="item.name"> </v-card-title>
        <v-card-subtitle v-text="item.summary"></v-card-subtitle>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-row>
        <v-col offset="1">
          <v-chip label outlined>收藏：{{ item.collectCount }}</v-chip>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SingleSectionItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
