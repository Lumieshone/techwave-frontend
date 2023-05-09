<template>
  <v-card>
  <v-data-table
    :headers="headers"
    :items="reportData"
    :search="search"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>举报信息</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="搜索被举报者信息"
        single-line
        hide-details
      ></v-text-field>
      
      <!-- 确认框 -->
      <confirm
      :showConfirm="dialog"
      @close="closeBan"
      @confirm="banItemConfirm">
      <v-form v-model="valid">
      <v-select
          :items="banTime"
          v-model="banUntil"
          :rules="[v => !!v || '请选择封禁时间！']"
          label="封禁时间"
          outlined
        ></v-select>
      </v-form>
      </confirm>
      <confirm
      :showConfirm="dialogDelete"
      @close="closeDelete"
      @confirm="deleteItemConfirm">
      确认拒绝处理该举报信息？
      </confirm>
      </v-toolbar>

   
    </template>
    <!-- 头像与图片 -->
    <!-- eslint-disable-next-line -->
    <template v-slot:item.avatar="{ item }">
      <v-avatar><img :src=item.avatar>
      </v-avatar>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.image="{ item }">
      <v-img 
      max-height="200"
      max-width="200"
      :src=item.image>
      </v-img>
    </template>
    <!--操作栏-->
    <!-- eslint-disable-next-line -->
    <template v-slot:item.operation="{ item }">
      
      <v-btn
        v-if="!item.isBanned"
        class="ma-2"
        color="primary"
        dark
        @click="ban(item)"
      >
        封禁
        <v-icon
          dark
          right
        >
          mdi-checkbox-marked-circle
        </v-icon>
      </v-btn>
      <v-btn
      v-if="!item.isBanned"
        class="ma-2"
        color="red"
        dark
        @click="deleteItem(item)"
      >
        拒绝处理
        <v-icon
          dark
          right
        >
          mdi-cancel
        </v-icon>
      </v-btn>
      <v-btn
      v-if="item.isBanned"
        class="ma-2"
        color="green"
        dark
        
      >
        解禁
        <v-icon
          dark
          right
        >
          mdi-checkbox-marked-circle
        </v-icon>
      </v-btn>
    </template>
   
  </v-data-table>
  <!-- 分页 -->
  <v-pagination
    style="margin-top: 30px"
    v-if="Math.ceil((total ) / perPage) > 1"
    v-model="page"
    :length="Math.ceil((total ) / perPage)"
    total-visible="7"
    color="#6A5ACD"
    @input="onPageChange(page, perPage)"
  ></v-pagination>
</v-card>
</template>

<script>
import Confirm from "@/components/Confirm.vue"
import {  banUser, denyReport, getReport} from "@/api/admin";

export default {
  name: "ProcessReport",
  components:{
    Confirm
  },
  data:()=>({
    search:'',
    headers:[{
        text:'被举报者ID',
        align:'start',
        sortable:false,
        value:'reportedUserId',
      },
      {text:'举报类型',sortable:false,value:'reportType'},
      {text:'昵称',sortable:false,value:'userName'},
      {text:'个性签名',sortable:false,value:'summary'},
      {text:'头像',sortable:false,value:'avatar'},
      {text:'举报理由',sortable:false,value:'reportReason'},
      {text:'图片',sortable:false,value:'image'},
      {text:'操作',sortable:false,value:'operation'},
    ],
    total:0,
    valid:false,
    reportData:[],
    operatingItem:[],
    createdAt:'',
    banTime:['一个月','三个月','半年','一年'],
    banUntil:'',
    page:1,
    perPage:5,
    dialog: false,
    dialogDelete: false,
  }),
  watch: {
    dialog (val) {
      val || this.closeApprove()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  created(){
    this.initialize();
  },
  methods:{
    initialize(){
      getReport(this.page,this.perPage)
      .then((res)=>{
        console.log(res)
        this.total=res.data.total;
        this.reportData=res.data.adminReportListVO
      })
    },
    onPageChange(page=this.page,perPage=this.perPage){
      getReport(page,perPage)
      .then((res)=>{
        console.log(res)
        this.total=res.data.total;
        this.sectionRequests=res.data.sectionRequestsVOList
      })
    },
    /**
    * 获取当前时间
    */
    currentTime() {
      var date = new Date();
      var year = date.getFullYear(); //月份从0~11，所以加一
      let month = date.getMonth();
      console.log("month",month);
      var dateArr = [
          date.getMonth() + 1,
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
      ];
      //如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
      for (var i = 0; i < dateArr.length; i++) {
          if (dateArr[i] >= 1 && dateArr[i] <= 9) {
              dateArr[i] = "0" + dateArr[i];
          }
      }
      var strDate =
          year +
          "/" +
          dateArr[0] +
          "/" +
          dateArr[1] +
          " " +
          dateArr[2] +
          ":" +
          dateArr[3] +
          ":" +
          dateArr[4];
      this.createdAt=strDate;
        
    },

    ban(item){
      this.operatingItem=Object.assign({},item);
      this.dialog=true;
    },
    closeBan(){
      this.dialog=false;
      this.$nextTick(()=>{
        this.operatingItem=[];
      })
    },
    banItemConfirm(){
      console.log(this.banUntil)
      if(!this.valid)
        this.$message.error("请选择封禁时间！")
      else{
        this.currentTime();
        banUser({targetId:this.operatingItem.reportedUserId,  banUntil:this.banUntil, reportId:this.operatingItem.reportId, createdAt:this.createdAt})
        .then((res)=>{
          console.log(res);
          this.$message.success(res.msg);
          this.closeBan();
          this.$nextTick(()=>{
            this.initialize();
          })
        })
      }
    },
    deleteItem(item){
      this.operatingItem=Object.assign({},item);
      this.dialogDelete=true;
    },
    closeDelete(){
      this.dialogDelete=false;
      this.$nextTick(()=>{
        this.operatingItem=[];
      })
    },
    deleteItemConfirm(){
      console.log(this.operatingItem.reportId)
      denyReport(this.operatingItem.reportId)
      .then((res)=>{
        console.log(res);
        this.closeDelete();
        this.$nextTick(()=>{
          this.initialize();
        })
      })
    }
  }
};
</script>
