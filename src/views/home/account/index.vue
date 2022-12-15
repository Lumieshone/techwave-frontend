<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="pa-0">
        <v-card
            height="100%"
            width="100%"
            color="#483D8B"
            tile
        >
          <v-navigation-drawer
              color="#483D8B"
              width="100%"
              dark
              tile
              permanent
          >
            <v-list>
              <v-list-item class="ml-4">
                <v-list-item-avatar size="56">
                  <v-img :src="userAvatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    {{ nickname }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="pt-1" @click="changeAvatar" id="change_avatar">
                    <v-icon
                        dark
                        small
                        >mdi-pencil
                    </v-icon>
                    修改头像
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <template v-for="(item, index) in items">
                <v-list-item
                    :key="item.title"
                    :to="item.router"
                    link
                    class="pl-16"
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                    v-if="index < items.length - 1"
                    :key="index"
                ></v-divider>
              </template>
            </v-list>

            <template v-slot:append>
              <div class="pa-5">
                <v-btn block light>
                  <span id="logout">
                  登出
                  </span>
                </v-btn>
              </div>
            </template>
          </v-navigation-drawer>
        </v-card>
      </v-col>
      <v-col cols="9" class="pa-0">
        <v-card height="100%" width="100%" color="#483D8B" tile>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
              >
                <my-upload
                    ref="uploadRef"
                    field="Avatar"
                    v-model="show"
                    @crop-success="cropSuccess"
                    :width="300"
                    :height="300"
                    img-format="jpg"
                    :size="size">
                </my-upload>
                <router-view />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import 'babel-polyfill'
import myUpload from 'vue-image-crop-upload/upload-2.vue'
import {change_avatar, get_user_info} from "@/api/account";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Account",
  data() {
    return {
      show:false,
      size:2.5,
      nickname:'莴苣某人',
      userEmail:'2053382@tongji.edu.cn',
      userAvatar:require("@/assets/avatar.jpg"),
      items: [
        { title: '个人信息', icon: 'mdi-account-box', router: '/account/info'},
        { title: '我的收藏', icon: 'mdi-star', router: '/account/collect'},
        { title: '我的帖子', icon: 'mdi-note-edit', router: '/account/post'},
        { title: '回复我的', icon: 'mdi-message-reply-text', router: '/account/reply'},
        { title: '我的交易', icon: 'mdi-wallet', router: '/account/transaction'},
        { title: '我的版块', icon: 'mdi-view-dashboard', router: '/account/section'},
        { title: '安全设置', icon: 'mdi-lock', router: '/account/safety'},
        { title: '学生认证', icon: 'mdi-account-check', router: '/account/certify'},
      ],
    };
  },
  //注册组件
  components: {
    "my-upload": myUpload
  },
  methods:{
    changeAvatar(){
      this.show = !this.show
    },
    cropSuccess(imgDataUrl){
      this.userAvatar = imgDataUrl
      let bytes = window.atob(imgDataUrl.split(',')[1]);
      let array = [];
      for(let i = 0; i < bytes.length; i++){
        array.push(bytes.charCodeAt(i));
      }
      let file = new File([new Uint8Array(array)], 'Avatar.jpg',{type: 'image/jpeg'});
      let fd = new FormData();
      fd.append('Avatar',file);
      for (let [a, b] of fd.entries()) {
        console.log(a, b)
      }
      this.$refs.uploadRef.off();
      change_avatar(fd).then((res) => {
        console.log(res.message)
        if(res.code === 20000)
          this.$message.success("修改头像成功！")
        else
          this.$message.error("修改头像失败~");
      }).catch((err) => console.log("error: " + err))
    }
  },
  mounted() {
    get_user_info()
        .then(res => {
          if(res.code === 20000){
            console.log("获取用户信息成功")
            this.nickname = res.data.nickname
            this.userEmail = res.data.email
            this.userAvatar = res.data.avatar
          }
          else{
            this.$message.error("用户信息获取失败！")
          }
        })
        .catch((err) => console.log("error: " + err));
  }
};
</script>

<style scoped>
#logout{
  color: #483D8B
}

#change_avatar:hover{
  color: white;
  cursor:pointer
}
</style>