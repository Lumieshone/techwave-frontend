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
        <v-icon>mdi-bullhorn-outline</v-icon>
        <v-card-title class="text-h6 font-weight-regular">
          <strong>举报用户</strong>
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
        <v-select
            v-model="reportType"
            color="#483D8B"
            :items="choices"
            :rules="typeRules"
            dense
            outlined
            label="请选择违规类型"
        ></v-select>
        <v-textarea
            v-if="reportType === choices[3]"
            v-model="reportReason"
            outlined
            color="#483D8B"
            :rules="reasonRules"
            label="具体原因"
        ></v-textarea>
        <v-file-input
            v-if="reportType === choices[3]"
            v-model="imageList"
            label="上传图片"
            counter
            dense
            multiple
            outlined
            :show-size="1000"
            accept="image/*"
            color="#483D8B"
        >
        </v-file-input>
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
import {reportUser} from "@/api/message";
export function formatNum(num){
  return num < 10 ? "0" + num : num
}
export default {
  name: "ReportUser",
  props:{
    dialogVisible: Boolean,
    targetId: Number
  },
  data(){
    return{
      showDialog: this.dialogVisible,
      reportedUserId: this.targetId,
      choices:['头像违规','个人简介违规','昵称违规','发布内容违规'],
      reportType:'',
      reportReason:'',
      imageList:[],
      typeRules: [
        v => !!v || '请选类型',
      ],
      reasonRules: [
        (v) => !!v || "请输入具体原因",
        (v) => (v && v.length <= 250) || "长度不应超过250个字符",
      ],
      valid: true,
    }
  },
  methods:{
    // 实时-时间-数据转换
    formatDate(value) {
      let year = value.getFullYear()
      let month = formatNum(value.getMonth() + 1)
      let day = formatNum(value.getDate())
      let hour = formatNum(value.getHours())
      let min = formatNum(value.getMinutes())
      let sec = formatNum(value.getSeconds())
      return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec
    },
    clearDialog(){
      this.reportType = ''
      this.$refs.form.resetValidation()
    },
    closeDialog(){
      this.$emit("callBack",false)
      this.clearDialog()
    },
    submit(){
      console.log(this.$refs.form.validate());
      if (this.$refs.form.validate()) {
        let fd = new FormData();
        fd.append("reportedUserId", this.reportedUserId);
        fd.append("reportType", this.reportType);
        fd.append("createAt", this.formatDate(this.timeDate));
        fd.append("reportReason", this.reportReason);
        for (const imageListKey in this.imageList) {
          fd.append("imageList",this.imageList[imageListKey])
        }
        console.log(this.imageList);
        reportUser(fd)
            .then((res) => {
              if(res.code === 20000){
                this.$message.success("举报成功！")
                this.$emit("submit",false)
              }
              else{
                console.log(res.msg)
                this.$message.error("举报失败~");
              }
            })
            .catch((err) => console.log("error: " + err))
        this.clearDialog()
      }
    }
  },
  watch: {
    dialogVisible(val) {
      this.showDialog = val
    },
    targetId(val) {
      this.reportedUserId = val
    }
  },
  mounted() {
    let self = this;
    setInterval(function(){
      self.timeDate = new Date()
    },1000)
  },
  // 实时-时间
  beforeDestroy() {
    if(this.timer){
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped>

</style>