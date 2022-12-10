<template>
  <v-dialog
      v-model="this.showDialog"
      persistent
      width="22%">
    <v-card class="mx-auto my-auto">
      <v-toolbar
          color="#483D8B"
          cards
          dense
          dark
      >
        <v-icon>mdi-application-edit-outline</v-icon>
        <v-card-title class="text--lighten-5">
          <strong>删除帖子</strong>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeConfirm">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form lazy-validation
              class="pa-4 pt-0">
        <v-card-text class="ma-4 text--lighten-5">
          <strong>您确定要删除该帖子吗？</strong>
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
import {delete_folder} from "@/api/account";

export default {
  name: "DeletePost",
  props:{
    showConfirm: Boolean,
    postId: Number
  },
  data(){
    return{
      showDialog:this.showConfirm,
    }
  },
  methods:{
    closeConfirm(){
      this.$emit("close",false)
    },
    confirmDelete(){
      delete_folder(this.postId)
          .then((res) => {
            if(res.code === 20000){
              this.$message.success("删除成功！")
              window.location.reload();
            }
            else
              this.$message.error(res.message);
          })
          .catch((err) => console.log("error: " + err))
    }
  },
  watch:{
    showConfirm(val){
      this.showDialog = val
    }
  }

}
</script>

<style scoped>

</style>