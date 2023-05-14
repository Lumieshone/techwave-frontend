<template>
  <v-card>
  <v-tabs
    v-model="tab"
  >
    <v-tab
      v-for="item in menu"
      :key="item"
    >
      {{ item }}
    </v-tab>
  </v-tabs>
  <v-tabs-items v-model="tab">
  <v-tab-item>
    <!--处理举报部分-->
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
    <!--违规类型-->
    <!-- eslint-disable-next-line -->
    <template v-slot:item.reportType="{ item }">
      <v-chip
      color="red"
      outlined
      small>
    {{item.reportType}}</v-chip>
    </template>
    <!-- 头像与图片 -->
    <!-- eslint-disable-next-line -->
    <template v-slot:item.avatar="{ item }">
      <v-avatar><img :src=item.avatar>
      </v-avatar>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.image="{ item }">
        <v-row>
          <v-col
          v-for="items in item.image"
          :key="items"
          cols="5">
          <v-img 
            max-height="200"
            max-width="200"
            :src=items>
          </v-img>
        </v-col>
        </v-row>
    </template>
    <!--操作栏-->
    <!-- eslint-disable-next-line -->
    <template v-slot:item.operation="{ item }">
      <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          @click="ban(item)"
        >
        mdi-checkbox-marked-circle
        </v-icon>
      </template>
      <span>封禁</span>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          color="red"
          dark
          v-bind="attrs"
          v-on="on"
          @click="deleteItem(item)"
        >
        mdi-cancel
        </v-icon>
      </template>
      <span>拒绝处理</span>
    </v-tooltip>
      
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
  </v-tab-item>
  
  <v-tab-item>
    <!--解封部分-->
<v-card>
  <v-data-table
    :headers="headersOfBan"
    :items="banList"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>封禁用户列表</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="搜索封禁用户信息"
        single-line
        hide-details
      ></v-text-field>
      
      <!-- 确认框 -->
      
      <confirm
      :showConfirm="dialogUnban"
      @close="closeUnban"
      @confirm="unbanItemConfirm">
      确认解除该用户封禁？
      </confirm>
      </v-toolbar>

   
    </template>
   
    <!--操作栏-->
    <!-- eslint-disable-next-line -->
    <template v-slot:item.operation="{ item }">
      <v-btn
        class="ma-2"
        color="green"
        dark
        @click="unban(item)"
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

    <!--可展开部分-->
    <!-- <template v-slot:expanded-item="{ item }">
      <v-card>
        {{item.userName}}
      </v-card>
    </template> -->

  </v-data-table>
</v-card>
  </v-tab-item>
</v-tabs-items>
  <v-divider></v-divider>
</v-card>
</template>

<script>
import Confirm from "@/components/Confirm.vue"
import {  banUser, denyReport, getBanList, getReport, unbanUser} from "@/api/admin";
import { VCol } from "vuetify/lib";

export default {
  name: "ProcessReport",
  components:{
    Confirm,
    VCol
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
      { text: '', value: 'data-table-expand' },
    ],
    headersOfBan:[{
        text:'封禁列表ID',
        align:'start',
        sortable:false,
        value:'id',
      },
      {text:'用户ID',sortable:false,value:'userId'},
      {text:'昵称',sortable:false,value:'userName'},
      {text:'解封时间',sortable:false,value:'banUntil'},
      {text:'操作',sortable:false,value:'operation'},
    ],
    tab:null,
    menu:['处理举报信息','处理封禁用户'],
    total:0,
    valid:false,
    reportData:[],
    operatingItem:[],
    banList:[],
    createdAt:'',
    banTime:['一个月','三个月','半年','一年'],
    banUntil:'',
    page:1,
    perPage:5,
    dialog: false,
    dialogDelete: false,
    dialogUnban:false,
    expanded:[],
  }),
  watch: {
    dialog (val) {
      val || this.closeApprove()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    dialogUnban(val){
      val || this.closeUnban()
    }
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
      });
      getBanList().then((res)=>{
        console.log(res);
        this.banList=res.data.chatBanListVO;
      })
    },
    onPageChange(page=this.page,perPage=this.perPage){
      getReport(page,perPage)
      .then((res)=>{
        console.log(res)
        this.total=res.data.total;
        this.reportData=res.data.adminReportListVO
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
    },
    unban(item){
      this.operatingItem=Object.assign({},item);
      this.dialogUnban=true;
    },
    closeUnban(){
      this.dialogUnban=false;
      this.$nextTick(()=>{
        this.operatingItem=[];
      })
    },
    unbanItemConfirm(){
      unbanUser({chatBanId:this.operatingItem.id}).then((res)=>{
        console.log(res);
        this.closeUnban();
        this.$message.success("解封成功!")
        this.$nextTick(()=>{
          this.initialize();
        })
      })
    }
  }
};
</script>
