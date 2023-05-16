<template>
  <v-dialog
      v-model="this.showDialog"
      persistent
      width="35%">
    <v-card class="mx-auto">
      <v-toolbar
          color="#483D8B"
          cards
          dark
          flat
      >
        <v-icon>mdi-application-edit-outline</v-icon>
        <v-card-title class="text-h6 font-weight-regular">
          <strong>修改邮箱</strong>
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
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            color="#483D8B"
            :rules="passwordRules"
            dense
            outlined
            required
            label="密码"
        ></v-text-field>
        <v-text-field
            v-model="email"
            color="#483D8B"
            :rules="emailRules"
            outlined
            dense
            label="新邮箱"
            required
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
import {editEmail} from "@/api/account";

export default {
  name: "EditEmail",
  props:{
    dialogVisible: Boolean,
    oldEmail:String
  },
  data(){
    return{
      showDialog: this.dialogVisible,
      showPassword:false,
      passwordRules: [
        v => !!v || '请输入密码',
      ],
      emailRules: [
        v => !!v || '请输入新邮箱',
        v => /.+@.+\..+/.test(v) || '邮箱格式不正确',
      ],
      valid: true,
      password:'',
      email:this.oldEmail
    }
  },
  methods:{
    clearDialog(){
      this.password = ''
      this.showPassword = false
      this.$refs.form.resetValidation()
    },
    closeDialog(){
      this.$emit("close",false)
      this.clearDialog()
    },
    submit(){
      editEmail(this.password,this.email)
          .then((res) => {
            console.log(res.data)
            if(res.code === 20000){
              if(res.data.result){
                this.$message.success("修改邮箱成功！")
                this.$emit("callBack",this.email)
                this.$emit("close",false)
                this.clearDialog()
              }
              else{
                this.$message.error("密码输入错误！");
              }
            }
            else
              this.$message.error(res.msg);
          })
          .catch((err) => console.log("error: " + err))
    }
  },
  watch: {
    dialogVisible(val) {
      this.showDialog = val
    },
    oldEmail(val) {
      this.email = val
    }
  },
  mounted() {
    this.email = this.oldEmail
  }
}
</script>

<style scoped>

</style>