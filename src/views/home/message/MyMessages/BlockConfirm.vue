<template>
  <v-dialog v-model="showDialog" persistent width="22%">
    <v-card class="mx-auto my-auto">
      <v-toolbar color="#483D8B" cards dense dark>
        <v-icon>mdi-application-edit-outline</v-icon>
        <v-card-title class="text--lighten-5">
          <strong>拉黑用户</strong>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeConfirm">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form lazy-validation class="pa-4 pt-0">
        <v-card-text class="ma-4 text--lighten-5">
          <strong>您确定要拉黑该用户吗？</strong>
        </v-card-text>
        <v-row justify="end">
          <v-btn
              small
              color="#6A5ACD"
              class="ma-4 mr-2 white--text"
              @click="closeConfirm"
          >取消
          </v-btn>
          <v-btn
              small
              color="#6A5ACD"
              class="ma-4 ml-1 white--text"
              @click="confirmDelete"
          >确定
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { blockUser } from "@/api/message";

export default {
  name: "BlockConfirm",
  props: {
    dialogVisible: Boolean,
    targetId: Number,
  },
  data() {
    return {
      showDialog: this.dialogVisible,
      id: this.targetId,
    };
  },
  methods: {
    closeConfirm() {
      this.$emit("callBack", false);
    },
    confirmDelete() {
      blockUser(this.id)
          .then((res) => {
            if (res.code === 20000) {
              this.$message.success("拉黑成功！");
              this.$emit("submit", false);
            } else this.$message.error(res.msg);
          })
          .catch((err) => console.log("error: " + err));
    },
  },
  watch: {
    dialogVisible(val) {
      this.showDialog = val;
    },
    targetId(val){
      this.id = val;
    }
  },
};
</script>
