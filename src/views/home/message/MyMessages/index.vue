<template>
  <v-card height="570" class="ma-4 my-5" :loading="this.loading" >
    <v-card-title v-text="title"></v-card-title>
    <v-row>
      <v-col cols="4" class="pr-0">
        <v-divider></v-divider>
        <v-list class="pt-0">
          <v-list-item-group v-model="selectedItem">
            <v-virtual-scroll
                :items="followLists"
                :item-height="62"
                height="497">
            <template v-slot:default="{ item,index }">
              <v-list-item :key="index" class="pl-8">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <template >
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.dept"></v-list-item-subtitle>
                  </template>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                  :key="index"
              ></v-divider>
            </template>
            </v-virtual-scroll>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-divider vertical class="mt-3 mr-n1"></v-divider>
      <v-col cols="8" class="pl-1">
        <v-divider></v-divider>
        <JwChat
            v-model="inputMsg"
            height="500px"
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
  </v-card>
</template>

<script>
const defaultImg = "https://jike-space.oss-cn-shanghai.aliyuncs.com/2023-05-05/0472a75ecd3540d59e44b035c0a9096b-Avatar.jpg"
export default {
  name: "MyMessages",
  data(){
    return{
      title:"我的消息",
      loading: false,
      selectedItem: 0,
      listData:[
        {
          date: "2020/04/25 21:19:07",
          "text": { "text": "起床不" },
          "mine": false,
          "name": "留恋人间不羡仙",
          "img": defaultImg
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>" },
          "mine": false,
          "name": "只盼流星不盼雨",
          "img": defaultImg
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "<img data-src='"+defaultImg+"' />" },
          "mine": false,
          "name": "只盼流星不盼雨",
          "img": defaultImg
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "<img data-src='"+defaultImg+"'/>" },
          "mine": false,
          "name": "只盼流星不盼雨",
          "img": defaultImg
        },
        {
          "date": "2020/04/16 21:19:07",
          "text": { "text": "你好" },
          "mine": true,
          "name": "JwChat",
          "img": defaultImg
        },
        {
          "date": "2021/03/02 13:14:21",
          "mine": false,
          "name": "留恋人间不羡仙",
          "img": defaultImg,
          "text": {"text": "你好呀"}
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": {
            "text": "<i class='el-icon-document-checked' style='font-size:2rem;'/>",
            "subLink":{
              "text": "a.txt",
              "prop": {
                underline: false
              }
            },
          },
          "mine": false,
          "name": "留恋人间不羡仙",
          "img": defaultImg
        },
      ],
      name_A: "狗蛋",
      name_B: "傻逼",
      avatar_A: "",
      avatar_B: "",
      timeDate:new Date(),
      // 输入框中的文字
      inputMsg: "",
      // 工具栏配置
      tool: {
        show: ['file'],
        callback: this.toolEvent,
      },
      followLists:[
        {
          avatar: defaultImg,
          name: 'JwChat',
          dept: '最简单、最便捷',
          callback: this.bindCover
        },
        {
          avatar: defaultImg,
          name: 'JwChat',
          dept: '最简单、最便捷',
          callback: this.bindCover
        },
        {
          avatar: defaultImg,
          name: 'JwChat',
          dept: '最简单、最便捷',
          callback: this.bindCover
        },
        {
          avatar: defaultImg,
          name: 'JwChat',
          dept: '最简单、最便捷',
          callback: this.bindCover
        },
        {
          avatar: defaultImg,
          name: 'JwChat',
          dept: '最简单、最便捷',
          callback: this.bindCover
        },
        {
          avatar: defaultImg,
          name: 'JwChat',
          dept: '最简单、最便捷',
          callback: this.bindCover
        },
        {
          avatar: defaultImg,
          name: 'JwChat',
          dept: '最简单、最便捷',
          callback: this.bindCover
        },
        {
          avatar: defaultImg,
          name: 'JwChat',
          dept: '最简单、最便捷',
          callback: this.bindCover
        },
        {
          avatar: defaultImg,
          name: 'JwChat',
          dept: '最简单、最便捷',
          callback: this.bindCover
        },
        {
          avatar: defaultImg,
          name: 'JwChat',
          dept: '最简单、最便捷',
          callback: this.bindCover
        },
        {
          avatar: defaultImg,
          name: 'JwChat',
          dept: '最简单、最便捷',
          callback: this.bindCover
        },
      ],
      // 组件配置
      config: {
        img: this.avatar_A,
        name: this.name_A,
        callback: this.bindCover,
        historyConfig: {
          show: true,
          tip: "滚动到顶时候显示的提示",
        }
      },
    }
  },
  methods:{
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
        date: this.timeDate,
        text: { text: msg },
        mine: true,
        name: this.name_A,
        img: this.avatar_A,
      };
      this.listData.push(msgObj);
      // 发送请求
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
    // 实时-时间-计时
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
};
</script>
