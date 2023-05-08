<template>
  <div>
    <v-list-item :key="item.id" @click="stepToPost(item.id)">
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
          <v-btn
            text
            small
            dense
            color="#6A5ACD"
            @click.stop="showConfirm = true"
            v-show="isModeratorAndAbleToDelete"
          >
            <v-icon color="#6A5ACD">mdi-delete-outline</v-icon>
          </v-btn>
        </v-list-item-action-text>
      </v-list-item-action>
    </v-list-item>
    <confirm
      :showConfirm="showConfirm"
      @close="closeConfirm"
      @confirm="confirmDelete"
      >确认删除此帖子？</confirm
    >
  </div>
</template>

<script>
import Confirm from "./Confirm.vue";
import { deletePost } from "@/api/post";

export default {
  name: "SinglePostItem",
  data() {
    return {
      showConfirm: false,
    };
  },
  components: {
    Confirm,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    isModeratorAndAbleToDelete: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    stepToPost(id) {
      this.$router.push(`/post/${id}`);
    },
    closeConfirm() {
      this.showConfirm = false;
    },
    confirmDelete() {
      deletePost(this.item.id)
        .then(() => {
          this.$emit("delete-post", this.item.id);
          this.$message.success("删除成功");
        })
        .catch((err) => {
          console.log(err);
          this.$message.err("删除失败");
        });
    },
  },
};
</script>
