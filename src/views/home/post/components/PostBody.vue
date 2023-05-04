<template>
  <v-card>
    <v-card-title>
      <span style="margin: 5px">1 楼 </span>
      <span style="margin: 5px">{{ author }}</span>
      <v-avatar>
        <img :src="avatar" :alt="author" />
      </v-avatar>
    </v-card-title>
    <v-card-subtitle
      ><span>{{ time }}</span></v-card-subtitle
    >
    <v-card-text>
      <div v-html="content"></div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
    name: "PostBody",
    props: {
        author: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
}
</script>