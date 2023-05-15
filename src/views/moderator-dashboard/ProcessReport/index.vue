<template>
  <v-card class="mx-4 my-5">
    <v-row no-gutters justify="center">
      <v-col>
        <v-card-title v-text="title1"></v-card-title>
        <v-data-table
            :headers="headers"
            :items="reportPostInfo"
            class="elevation-1 px-5"
            hide-default-footer
            height="400"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip top class="mr-1">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on">
                  <v-icon
                      @click="stepToSection(item)"
                  >
                    mdi-arrow-right-bold-box-outline
                  </v-icon>
                </v-btn>
              </template>
              <span>进入帖子</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on">
                  <v-icon
                      @click="acceptPostDelete(item)"
                  >
                    mdi-alert
                  </v-icon>
                </v-btn>
              </template>
              <span>通过举报</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on">
                  <v-icon
                      @click="deny1(item)"
                  >
                    mdi-close
                  </v-icon>
                </v-btn>
              </template>
              <span>拒绝举报</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <v-card-title v-text="title2"></v-card-title>
        <v-data-table
            :headers="headers2"
            :items="reportCommentInfo"
            class="elevation-1 px-5"
            hide-default-footer
            height="400"
        >
          <template v-slot:[`item.commentContent`]="{ item }">
            <div  v-html="item.commentContent"></div>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on">
                  <v-icon
                      @click="acceptCommentDelete(item)"
                  >
                    mdi-alert
                  </v-icon>
                </v-btn>
              </template>
              <span>通过举报</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on">
                  <v-icon
                      @click="deny1(item)"
                  >
                    mdi-close
                  </v-icon>
                </v-btn>
              </template>
              <span>拒绝举报</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {acceptCommentReport, acceptPostReport, denyPostReport, getCommentReport, getPostReport} from "@/api/moderator";

export default {
  name: "AccountSection",
  data(){
    return {
      title1:"举报帖子列表",
      title2:"举报评论列表",
      showSectionDialog: false,
      showEditDialog: false,
      headers: [
        { text: '举报者ID', value: 'userId', sortable: false },
        { text: '举报原因', value: 'reportReason', sortable: false },
        { text: '举报类型', value: 'reportType', sortable: false },
        { text: '举报子类型', value: 'reportSubtype', sortable: false },
        { text: '举报时间', value: 'createdAt', sortable: false },
        { text: '处理方法', value: 'actions', sortable: false },
      ],
      headers2: [
        { text: '举报者ID', value: 'userId', sortable: false },
        { text: '举报原因', value: 'reportReason', sortable: false },
        { text: '举报类型', value: 'reportType', sortable: false },
        { text: '举报子类型', value: 'reportSubtype', sortable: false },
        { text: '被举报内容', value: 'commentContent', sortable: false },
        { text: '处理方法', value: 'actions', sortable: false },
      ],
      item:[],
      sectionInfo:[],
      reportCommentInfo:[],
      reportPostInfo:[],
      postId:0,
      control:false,
      showConfirm:false,
      valid: true,
      isEdit:false,
    }
  },
  methods:{
    createSection(){
      this.showSectionDialog = !this.showSectionDialog
    },
    deny1(item){
      console.log(item.id)
      denyPostReport(item.id)
          .then(res => {
            if(res.code === 20000)
              console.log("拒绝举报成功")
            else{
              console.log(res.msg)
              this.$message.error("拒绝举报失败！")
            }
          })
          .catch((err) => console.log("error: " + err));
      window.location.reload();
    },
    acceptPostDelete(item){
      console.log(item.reportedId)
      acceptPostReport(item.reportedId)
          .then(res => {
            if(res.code === 20000)
              console.log("通过帖子举报成功")
            else{
              console.log(res.msg)
              this.$message.error("通过帖子举报失败！")
            }
          })
          .catch((err) => console.log("error: " + err));
      window.location.reload();
    },
    acceptCommentDelete(item){
      console.log(item.reportedId, item.reportType)
      acceptCommentReport(item.reportedId, item.reportType)
          .then(res => {
            if(res.code === 20000)
              console.log("通过评论或回复举报成功")
            else{
              console.log(res.msg)
              this.$message.error("通过评论或回复举报失败！")
            }
          })
          .catch((err) => console.log("error: " + err));
      window.location.reload();
    },
    editItem(item){
      console.log(item)
      this.showEditDialog = !this.showEditDialog
      this.item = item
    },
    callBack_1(flag){
      this.showSectionDialog  = flag
    },
    callBack_2(flag){
      this.showEditDialog  = flag
    },
    submit_1(flag){
      this.showSectionDialog = flag
      window.location.reload();
    },
    submit_2(flag){
      this.showEditDialog = flag
      window.location.reload();
    },
    closeConfirm(flag){
      this.showConfirm = flag
      window.location.reload();
    },
    stepToSection(item){
      this.$router.push({path: '/post/'+ item.reportedId})
    },
  },
  mounted() {
    getCommentReport(this.$route.params.sectionId,1,10)
        .then(res => {
          if(res.code === 20000){
            console.log("获取举报评论信息成功")
            console.log(res.data.reportDataVOList)
            this.reportCommentInfo = res.data.reportDataVOList
          }
          else{
            console.log(res.msg)
            this.$message.error("举报评论信息获取失败！")
          }
        })
        .catch((err) => console.log("error: " + err));

    getPostReport(this.$route.params.sectionId,1,10)
        .then(res => {
          if(res.code === 20000){
            console.log("获取举报帖子信息成功")
            console.log(res.data.postReportDataVOList)
            this.reportPostInfo = res.data.postReportDataVOList
          }
          else{
            console.log(res.msg)
            this.$message.error("举报评论帖子获取失败！")
          }
        })
        .catch((err) => console.log("error: " + err));
  }


}
</script>

<style scoped>
.lead{
  margin-top:7px
}
.v-text-field{
  width:45px;
  height:20px;
  margin-left: 8px;
  margin-right: 8px
}
.goBtn{
  margin-left:10px
}
</style>