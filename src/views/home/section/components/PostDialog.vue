<template>
  <v-dialog v-model="this.show_dialog">
    <v-card>
      <v-card-text>
        <v-textarea
            v-model="reply_content"
            outlined
            label="输入你的评论（请文明发言~）"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn
            color="blue"
            class="ma-2 white--text"
            small
            @click="close_post_dialog"
        >取消
        </v-btn>
        <v-btn color="blue" class="ma-2 white--text" small @click="reply">
          回复
        </v-btn></v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PostDialog",
  props:{
    show_post_dialog: Boolean
  },
  data(){
    return{
      show_dialog: this.show_post_dialog,

    }
  },
  watch: {
    show_post_dialog(val) {
      this.show_dialog = val
    }
  }
}
</script>

<style scoped>

</style>