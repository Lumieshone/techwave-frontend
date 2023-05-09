<template>
  <v-card>
  <v-data-table
    :headers="headers"
    :items="sectionRequests"
    :search="search"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>版块申请</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="搜索版块名"
        single-line
        hide-details
      ></v-text-field>
      
      <!-- 确认框 -->
      <confirm
      :showConfirm="dialog"
      @close="closeApprove"
      @confirm="approveItemConfirm">
      确认通过该版块申请？
      </confirm>
      <confirm
      :showConfirm="dialogDelete"
      @close="closeDelete"
      @confirm="deleteItemConfirm">
      确认不通过该版块申请？
      </confirm>
      </v-toolbar>

    <!-- 操作栏 -->
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.avatar="{ item }">
      <v-avatar><img :src=item.avatar>
      </v-avatar>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.operation="{ item }">
      
      <v-btn
        class="ma-2"
        color="green"
        dark
        @click="approveItem(item)"
      >
        通过
        <v-icon
          dark
          right
        >
          mdi-checkbox-marked-circle
        </v-icon>
      </v-btn>
      <v-btn
        class="ma-2"
        color="red"
        dark
        @click="disapproveItem(item)"
      >
        不通过
        <v-icon
          dark
          right
        >
          mdi-cancel
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
import {getSectionRequest, passSectionRequest} from "@/api/admin.js"
import Confirm from "@/components/Confirm.vue"

export default {
  name: "ProcessSectionRequest",
  data:()=>({
    search:'',
    headers:[
      {
        text:'申请ID',
        align:'start',
        sortable:false,
        value:'id',
      },
      {text:'申请人',sortable:false,value:'userName'},
      {text:'版块名',sortable:false,value:'name'},
      {text:'版块简介',sortable:false,value:'description'},
      {text:'版块头像',sortable:false,value:'avatar'},
      {text:'操作',sortable:false,value:'operation'},
    ],
    total:0,
    sectionRequests:[],
    operatingItem:[],
    page:1,
    perPage:5,
    isPassed:false,
    dialog: false,
    dialogDelete: false,
  }),
  components:{
    Confirm,
  },
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
      getSectionRequest(this.page,this.perPage)
      .then((res)=>{
        console.log(res)
        this.total=res.data.total;
        this.sectionRequests=res.data.sectionRequestsVOList
      })
    },
    onPageChange(page=this.page,perPage=this.perPage){
      getSectionRequest(page,perPage)
      .then((res)=>{
        console.log(res)
        this.total=res.data.total;
        this.sectionRequests=res.data.sectionRequestsVOList
      })
    },
    
    approveItem(item){
      this.operatingItem=Object.assign({},item);
      this.dialog=true;
    },
    closeApprove(){
      this.dialog=false;
      this.$nextTick(()=>{
        this.operatingItem=[];
      })
    },
    approveItemConfirm(){
      this.isPassed=true;
      passSectionRequest({id:this.operatingItem.id , isPassed:this.isPassed})
      .then((res)=>{
        console.log(res);
        this.closeApprove();
        this.$nextTick(()=>{
          this.initialize();
        })
      })
    },
    disapproveItem(item){
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
      this.isPassed=false;
      passSectionRequest({id:this.operatingItem.id , isPassed:this.isPassed})
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
