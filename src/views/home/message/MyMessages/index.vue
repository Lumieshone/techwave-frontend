<template>
  <v-card height="570" class="ma-4 my-6" :loading="this.loading" >
    <v-row class="d-flex align-center justify-center " dense>
      <v-col class="pt-0 pb-0">
        <v-card-title v-text="title"></v-card-title>
      </v-col>
      <v-col cols="1">
        <v-menu offset-y open-on-click>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                :disabled="selectedItem < 0"
                v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                dense
                v-for="item in items"
                :key="item.id"
                @click.stop="options(item.id)"
            >
              <v-icon left small> {{ item.icon }} </v-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{item.title}}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row class="mt-0 pl-0 ml-0">
      <v-col cols="4" class="px-0">
        <v-divider></v-divider>
        <v-list class="pt-0">
          <v-list-item-group v-model="selectedItem">
            <v-virtual-scroll
                :items="followLists"
                :item-height="62"
                height="484">
            <template v-slot:default="{ item,index }">
              <v-list-item :key="index" class="pl-8" @click="openChat(item.userId,index)">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <template>
                    <v-list-item-title>
                        {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle v-text="item.recentChat"></v-list-item-subtitle>
                  </template>
                </v-list-item-content>
                <v-list-item-action>
                  <v-badge
                      color="red"
                      :offset-y="10"
                      :offset-x="20"
                      :content="item.count"
                      :value="item.count">
                  </v-badge>
                </v-list-item-action>
              </v-list-item>
              <v-divider
                  :key="index"
              ></v-divider>
            </template>
            </v-virtual-scroll>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-divider vertical class="mt-3 mr-n1 pb-6"></v-divider>
      <v-col cols="8" class="pl-1 pr-2">
        <v-divider></v-divider>
        <JwChat
            v-model="inputMsg"
            height="490"
            width="100%"
            :taleList="listData"
            :toolConfig="tool"
            :config="config"
            scrollType="scroll"
            @enter="bindEnter"
            @clickTalk="talkEvent"
        ></JwChat>
      </v-col>
    </v-row>
    <ReportUser
        :dialogVisible="this.dialogVisible_1"
        :targetId="this.targetId"
        @callBack="callBack_1"
        @submit="submit_1"
    >
    </ReportUser>
    <BlockConfirm
        :dialogVisible="this.dialogVisible_2"
        :targetId="this.targetId"
        @callBack="callBack_2"
        @submit="submit_2"
    >
    </BlockConfirm>
  </v-card>
</template>

<script>
import {getMessageHistory, getMessageList, sendMessage} from "@/api/message";
import {getUserInfo} from "@/api/account";
import ReportUser from "@/views/home/message/MyMessages/ReposrtUser";
import BlockConfirm from "@/views/home/message/MyMessages/BlockConfirm";

export function formatNum(num){
  return num < 10 ? "0" + num : num
}
const defaultImg = "https://jike-space.oss-cn-shanghai.aliyuncs.com/2023-05-05/0472a75ecd3540d59e44b035c0a9096b-Avatar.jpg"
export default {
  name: "MyMessages",
  components: {BlockConfirm, ReportUser},
  data(){
    return{
      title:"我的消息",
      dialogVisible_1:false,
      dialogVisible_2:false,
      isBlocked: false,
      loading: false,
      selectedItem: -1,
      targetId: 0,
      items:[
        {id:1, title: "举报用户", icon:"mdi mdi-alert-octagram-outline"},
        {id:2, title:"拉黑用户",icon:"mdi-cancel"},
        {id:3, title:"删除记录",icon:"mdi-delete-sweep"}
      ],
      listData:[],
      myName: "狗蛋",
      myAvatar: defaultImg,
      timeDate:new Date(),
      // 输入框中的文字
      inputMsg: "",
      // 工具栏配置
      tool: {
        showEmoji: true, // 是否显示表情图标
        callback: this.toolEvent,
      },
      followLists:[
      ],
      // 组件配置
      config: {
        img: this.myAvatar,
        name: this.myName,
        callback: this.bindCover,
        historyConfig: {
          show: true,
          tip: "已经滚动到底了哦~",
        }
      },
    }
  },
  methods:{
    options(id){
      if(id === 1){
        this.dialogVisible_1 = !this.dialogVisible_1
      }
      else if(id === 2){
        this.dialogVisible_2 = !this.dialogVisible_2
      }
      // else if(id === 3){
      //
      // }
    },
    callBack_1(flag){
      this.dialogVisible_1  = flag
    },
    submit_1(flag){
      this.dialogVisible_1  = flag
    },
    callBack_2(flag){
      this.dialogVisible_2  = flag
    },
    submit_2(flag){
      this.dialogVisible_2  = flag
      this.isBlocked = flag
    },
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
    // 点击聊天框列中的用户和昵称触发事件
    talkEvent(play) {
      console.log(play);
    },
    // 输入框点击就发送或者回车触发的事件
    bindEnter(e) {
      console.log(e);
      const msg = this.inputMsg;
      if (!msg) return;
      const msgObj = {
        date: this.formatDate(this.timeDate),
        text: { text: msg },
        mine: true,
        name: this.myName,
        img: this.myAvatar,
      };
      if(!this.isBlocked){
        this.listData.push(msgObj);
        // 发送请求
        const data = {
          targetId: this.targetId,
          text: msg,
          time: msgObj.date
        }
        console.log("data.targetId"+data.targetId)
        sendMessage(data)
            .then((res) => {
              if (res.code === 20000) {
                console.log(res.msg)
                getMessageList()
                    .then((res) => {
                      if (res.code === 20000) {
                        console.log("获取用户私信列表成功");
                        this.followLists = res.data.myLists
                        for (let i = 0; i < this.followLists.length; i++) {
                          if(this.followLists[i].userId == data.targetId)
                          {
                            this.selectedItem = i
                            break
                          }
                        }
                      } else {
                        console.log(res.msg);
                        this.$message.error("用户私信列表获取失败！");
                      }
                    })
                    .catch((err) => console.log("error: " + err));
              } else {
                console.log(res.msg);
                this.$message.error("发送失败！");
              }
            })
            .catch((err) => console.log("error: " + err));
      }
      else
        this.$message.error("您已被对方拉黑，无法发送消息！")
    },
    openChat(userId,index){
      this.selectedItem = index
      this.targetId = userId
      console.log(this.selectedItem)
      getMessageHistory(userId)
          .then((res) => {
            if (res.code === 20000) {
              console.log("获取私信消息成功");
              this.isBlocked = res.data.isBlocked
              this.listData = res.data.myHistories
            } else {
              console.log(res.msg);
              this.$message.error("私信消息获取失败！");
            }
          })
          .catch((err) => console.log("error: " + err));
      this.$store.dispatch(
          "count/updateState", { type: "message", count: this.followLists[index].count }
      ).then(()=>{
        console.log(this.$store.getters.total)
      }).catch((err) => console.log("error: " + err))
      this.followLists[index].count = 0
    },
    /**
     * @description:
     * @param {*} type 当前点击的按钮
     * @param {*} plyload 附加文件或者需要处理的数据
     * @return {*}
     */
    toolEvent(type, plyload) {
      console.log("tools", type, plyload);
    },
    bindCover(event) {
      console.log("header", event);
    }
  },
  mounted() {
    let self = this;
    let follows = [];
    // 实时-时间-计时
    setInterval(function(){
      self.timeDate = new Date()
    },1000)
    getUserInfo()
        .then((res) => {
          if (res.code === 20000) {
            console.log("获取用户信息成功");
            this.myName = res.data.username;
            this.myAvatar = res.data.avatar;
          } else {
            console.log(res.msg);
            this.$message.error("用户信息获取失败！");
          }
        })
        .catch((err) => console.log("error: " + err));
    getMessageList()
        .then((res) => {
          if (res.code === 20000) {
            console.log("获取用户私信列表成功");
            this.followLists = res.data.myLists
            follows = res.data.myLists
            this.targetId = res.data.myLists[0].userId
            let id = this.$route.query.userId;
            if(id){
              console.log("followLists:",follows)
              for (let i = 0; i < follows.length; i++) {
                if(follows[i].userId == id)
                {
                  this.selectedItem = i
                  break
                }
              }
              this.targetId = id
              getMessageHistory(id)
                  .then((res) => {
                    if (res.code === 20000) {
                      console.log("获取私信消息成功");
                      this.isBlocked = res.data.isBlocked
                      this.listData = res.data.myHistories
                    } else {
                      console.log(res.msg);
                      this.$message.error("私信消息获取失败！");
                    }
                  })
                  .catch((err) => console.log("error: " + err));
              this.$store.dispatch(
                  "count/updateState",
                  { type: "message", count: this.followLists[this.selectedItem].count }
              ).then(()=>{
                console.log(this.$store.getters.total)
              }).catch((err) => console.log("error: " + err))
            }
          } else {
            console.log(res.msg);
            this.$message.error("用户私信列表获取失败！");
          }
        })
        .catch((err) => console.log("error: " + err));
  },
  // 实时-时间
  beforeDestroy() {
    if(this.timer){
      clearInterval(this.timer)
    }
  }
};
</script>
