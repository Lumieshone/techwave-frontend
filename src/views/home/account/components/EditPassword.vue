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
          <strong>修改密码</strong>
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
            v-model="oldPassword"
            :append-icon="showPassword_1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword_1 ? 'text' : 'password'"
            @click:append="showPassword_1 = !showPassword_1"
            color="#483D8B"
            :rules="oldRules"
            dense
            outlined
            label="旧密码"
            required
        ></v-text-field>
        <v-text-field
            v-model="newPassword"
            :append-icon="showPassword_2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword_2 ? 'text' : 'password'"
            @click:append="showPassword_2 = !showPassword_2"
            color="#483D8B"
            maxlength="30"
            :rules="newRules"
            outlined
            dense
            :counter="30"
            label="新密码"
            required
        ></v-text-field>
        <v-text-field
            v-model="password"
            :append-icon="showPassword_3 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword_3 ? 'text' : 'password'"
            @click:append="showPassword_3 = !showPassword_3"
            color="#483D8B"
            maxlength="30"
            :rules="Rules"
            dense
            outlined
            :counter="30"
            label="确认密码"
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
              @click="submit()"
          >提交
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import {editPassword} from "@/api/account";

export default {
  name: "EditPassword",
  props:{
    dialogVisible: Boolean,
  },
  data(){
    return{
      showDialog: this.dialogVisible,
      showPassword_1:false,
      showPassword_2:false,
      showPassword_3:false,
      oldRules: [
        v => !!v || '请输入旧密码',
      ],
      newRules: [
        v => !!v || '请输入新密码',
        v => (v && v.length <= 30 && v.length >= 6) || '密码长度应为6-30个字符',
      ],
      Rules: [
        v => !!v || '请确认新密码',
        v => (v && v.length <= 30 && v.length >= 6) || '密码长度应为6-30个字符',
      ],
      valid: true,
      oldPassword:'',
      newPassword:'',
      password:''
    }
  },
  methods:{
    clearDialog(){
      this.oldPassword = ''
      this.newPassword = ''
      this.password = ''
      this.showPassword_1 = false
      this.showPassword_2 = false
      this.showPassword_3 = false
      this.$refs.form.resetValidation()
    },
    closeDialog(){
      this.$emit("callBack",false)
      this.clearDialog()
    },
    submit(){
      if(this.newPassword === this.password)
        editPassword(this.oldPassword, this.newPassword)
            .then((res) => {
              console.log(res.message)
              if(res.code === 20000){
                if(res.data.result === true){
                  this.$message.success("修改密码成功！")
                  this.$emit("callBack",false)
                  this.clearDialog()
                }
                else{
                  this.$message.error("旧密码输入错误！");
                }
              }
              else{
                this.$message.error("修改密码失败~");
                this.clearDialog()
              }
            })
            .catch((err) => console.log("error: " + err))
      else{
        this.password = ''
        this.$refs.form.resetValidation()
        this.$message.error("两次输入密码不一致！")
      }
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