<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="pa-0">
        <v-card
            height="580"
            width="100%"
            color="#6A5ACD"
        >
          <v-navigation-drawer
              color="#6A5ACD"
              width="100%"
              dark
              permanent
          >
            <v-list>
              <v-list-item class="ml-3">
                <v-list-item-avatar size="56">
                  <v-img :src="user_avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    {{ user_name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ user_email }}</v-list-item-subtitle>
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
                    class="pl-15"
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
                <v-btn block>
                  登出
                </v-btn>
              </div>
            </template>
          </v-navigation-drawer>
        </v-card>
      </v-col>
      <v-col cols="9" class="pa-0">
        <v-card height="580" class="pa-0" width="100%">
          <router-view />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Account",
  data() {
    return {
      user_name:'莴苣某人',
      user_email:'2053382@tongji.edu.cn',
      user_avatar:require('@/assets/avatar.jpg'),
      items: [
        { title: '个人信息', icon: 'mdi-account-box', router: '/account/info'},
        { title: '我的收藏', icon: 'mdi-star', router: '/account/collect'},
        { title: '我的帖子', icon: 'mdi-view-dashboard', router: '/account/post'},
        { title: '回复我的', icon: 'mdi-message-reply-text', router: '/account/reply'},
        { title: '我的交易', icon: 'mdi-wallet', router: '/account/transaction'},
        { title: '安全设置', icon: 'mdi-lock', router: '/account/safety'},
        { title: '学生认证', icon: 'mdi-account-check', router: '/account/certify'},
      ],
    };
  },
};
</script>