<template>
  <v-list-item @click="stepToPost(item.id)" :key="item.id">
    <template>
      <v-list-item-avatar>
        <v-chip color="#E6E6FA" label small>
          {{ item.commentCount }}
        </v-chip>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-action style="margin-right: 5px">
        <v-list-item-action-text v-text="item.author"></v-list-item-action-text>
      </v-list-item-action>
      <v-list-item-action>
        <v-list-item-action-text v-text="item.time"></v-list-item-action-text>
      </v-list-item-action>
      <v-list-item-action>
        <v-list-item-action-text class="d-flex justify-center">
          <v-icon color="grey" small>mdi-thumb-up</v-icon>
          <span style="margin-left: 5px">{{ item.likeCount }}</span>
        </v-list-item-action-text>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
export default {
    name: "SinglePostItem",
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    methods: {
        stepToPost(id) {
            this.$router.push(`/post/${id}`);
        }
    }
}
</script>
