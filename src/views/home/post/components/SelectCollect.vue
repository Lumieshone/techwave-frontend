<template>
  <!-- 收藏文件夹 -->
  <v-card shaped>
    <v-card-title>选择收藏文件夹</v-card-title>
    <v-card-text>
      <v-select
        v-model="folderId"
        :items="folders"
        item-text="folderName"
        item-value="id"
        label="选择收藏夹"
        color="#7d73be"
      ></v-select>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="#7d73be"
        class="ma-2 white--text"
        small
        @click="closeCollectDialog"
        >取消
      </v-btn>
      <v-btn color="#7d73be" class="ma-2 white--text" small @click="collect">
        确定
      </v-btn></v-card-actions
    >
  </v-card>
</template>

<script>
import { collectOrUncollectPost } from "@/api/post";
export default {
  name: "SelectCollect",
  data() {
    return {
      folderId: undefined,
    };
  },
  props: {
    postId: {
      type: Number,
      required: true,
    },
    folders: {
      type: Array,
      required: true,
    },
  },
  methods: {
    closeCollectDialog() {
      this.$emit("closeCollectDialog");
    },

    collect() {
      collectOrUncollectPost({ id: this.postId, folderId: this.folderId}).then(() => {
        this.$message.success("收藏成功");
        this.$emit("collectSuccess");
      });
    },
  },
};
</script>
