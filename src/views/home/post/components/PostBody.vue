<template>
  <v-row justify="center">
    <v-col cols="12" md="11">
      <v-card shaped class="mt-4 mb-4">
        <v-row>
          <v-col cols="2" align="center">
            <v-row>
              <v-col cols="10">
                <v-menu open-on-hover rounded>
                  <template v-slot:activator="{ on }">
                    <v-avatar>
                      <img :src="avatar" :alt="author" v-on="on" />
                    </v-avatar>
                  </template>
                  <user-card :userId="authorId" :avatar="avatar"></user-card>
                </v-menu>
                <v-card-subtitle class="font-weight-black"
                  >1 楼</v-card-subtitle
                >
                <v-card-text v-text="author" class="font-weight-medium"></v-card-text>
              </v-col>
              <v-col cols="2">
                <v-divider vertical></v-divider>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="10">
            <v-row style="margin-top: 10px">
              <div v-html="content"></div>
            </v-row>
            <v-row no-gutters class="d-flex">
              <v-col cols="12" class="d-flex justify-end">
                <v-card-text class="time caption"
                  >发布时间 {{ time }}</v-card-text
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col></v-row
  >
</template>
<script>
import UserCard from "./UserCard.vue";

export default {
  name: "PostBody",
  components: {
    UserCard,
  },
  props: {
    author: {
      type: String,
      required: true,
    },
    authorId: {
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
    },
  },
};
</script>

<style scoped>
.post-item {
  margin-bottom: 20px;
}

.name {
  font-size: 16px;
  margin-bottom: 5px;
}

.time {
  font-size: 14px;
  text-align: right;
}
</style>
