<template>
  <v-dialog
      v-model="this.showDialog"
      persistent
      width="20%">
    <v-card class="mx-auto">
      <v-toolbar
          color="#483D8B"
          cards
          dark
          flat
      >
        <v-icon>mdi-application-edit-outline</v-icon>
        <v-card-title class="text-h6 font-weight-regular">
          <strong>新建收藏夹</strong>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="pa-4 pt-6"
      >
        <v-text-field
            v-model="folderName"
            color="#483D8B"
            :rules="folderRules"
            dense
            outlined
            required
            label="收藏夹名称"
        ></v-text-field>
        <v-row justify="end">
          <v-btn
              color="#6A5ACD"
              class="ma-3 white--text"
              @click="closeDialog"
          >返回
          </v-btn>
          <v-btn
              color="#6A5ACD"
              :disabled="!valid"
              class="ma-3 white--text"
              @click="submit"
          >提交
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import {createFolder} from "@/api/account";

export default {
  name: "CreateFolder",
  props:{
    dialogVisible: Boolean,
  },
  data(){
    return{
      showDialog: this.dialogVisible,
      folderRules: [
        v => !!v || '请输入名称',
      ],
      folderName:'',
      valid: true,
    }
  },
  methods:{
    clearDialog(){
      this.folderName = ''
      this.$refs.form.resetValidation()
    },
    closeDialog(){
      this.$emit("callBack",false)
      this.clearDialog()
    },
    submit(){
      createFolder(this.folderName)
          .then((res) => {
            console.log(res.message)
            if(res.code === 20000){
                this.$message.success("创建成功！")
                this.$emit("submit",false)
            }
            else
              this.$message.error("创建失败~");
          })
          .catch((err) => console.log("error: " + err))
      this.clearDialog()
    }
  },
  watch: {
    dialogVisible(val) {
      this.showDialog = val
    }
  }
}
</script>

<style scoped>

</style>