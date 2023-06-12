<template>
  <v-card height="580" class="ma-4 mb-6">
    <v-card-title v-text="title"></v-card-title>
    <v-row style="margin-left: 20px" class="d-flex justify-center align-center">
      <v-col cols="2">
        <div>
          <v-combobox
              v-model="selectedUser"
              :items="results"
              label="选择用户"
              item-text="username"
              item-value="id"
              placeholder="请搜索用户"
              append-icon="mdi-magnify"
              style="width: 400px"
              @change="selectUser"
              @keyup.enter="search"
          ></v-combobox>
        </div>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="banUntil"
          :items="['一个月', '三个月', '半年', '一年']"
          label="封禁时间"
        />
      </v-col>
      <v-col>
        <v-btn @click="ban(targetId, banUntil)" small>
          <v-icon>mdi-account-off-outline</v-icon>

          封禁用户
        </v-btn>
      </v-col>
    </v-row>
    <div style="font-weight: bold; margin-left: 20px; margin-top: 50px">
      封禁用户列表
    </div>
    <v-row no-gutters justify="center">
      <v-col>
        <v-data-table
          :headers="headers"
          :items="pinnedPostInfo"
          class="elevation-1 px-5"
          hide-default-footer
          height="460"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="unban(item.userId)"
                  v-bind="attrs"
                  v-on="on"
                  small
                >
                  <v-icon left>mdi-lock-open</v-icon>
                  解封
                </v-btn>
              </template>
              <span>解除封禁</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {getBannedUsers, searchUser} from "@/api/moderator";
import { unbanUser, banUser } from "@/api/moderator";
export default {
  name: "BanUser",
  data() {
    return {
      selectedUser: null,
      targetId: null,
      banUntil: null,
      sectionId: null,
      keyword: "",
      results: [],
      title: "封禁用户",
      banDate: "",
      headers: [
        {
          text: "用户ID",
          align: "start",
          sortable: false,
          value: "userId",
        },
        { text: "用户名", value: "userName", sortable: false },
        { text: "封禁时间", value: "createdAt", sortable: false },
        { text: "解禁时间", value: "banUntil", sortable: false },
        { text: "操作", value: "actions", sortable: false },
      ],
      pinnedPostInfo: [],
    };
  },
  methods: {
    selectUser() {
      // 当选中某个用户时，将其对应的 ID 值存储在 this.targetId 中
      this.targetId = this.selectedUser.id;
    },
    search() {
      console.log(this.selectedUser)
      searchUser(this.selectedUser, 1, 10)
          .then(res => {
            if(res.code === 20000){
              console.log("搜索用户信息成功")
              this.results = res.data.result
            }
            else{
              console.log(res.msg)
              this.$message.error("搜索用户信息获取失败！")
            }
          })
          .catch((err) => console.log("error: " + err));
      console.log(this.results)
    },
    unban(id) {
      console.log(id, this.$route.params.sectionId);
      unbanUser({ targetId: id, sectionId: this.$route.params.sectionId }).then((res) => {
        if (res.code == 20000) {
          this.$message.success("操作成功！");
          this.dialog = false;
          getBannedUsers(this.$route.params.sectionId).then((res) => {
            if (res.code === 20000) {
              this.pinnedPostInfo = res.data;
            }
          });
        }
      });
    },
    ban(targetId, banUntil) {
      console.log(targetId, this.$route.params.sectionId, banUntil);
      banUser(targetId, this.$route.params.sectionId, banUntil)
        .then((res) => {
          if (res.code === 20000){
            console.log("封禁用户成功");
            this.dialog = false;
            getBannedUsers(this.$route.params.sectionId).then((res) => {
              if (res.code === 20000) {
                this.pinnedPostInfo = res.data;
              }
            });
          }
          else {
            console.log(res.msg);
            this.$message.error("封禁用户失败！");
          }
        })
        .catch((err) => console.log("error: " + err));
    },
  },
  mounted() {
    this.sectionId = this.$route.params.sectionId;
    getBannedUsers(this.$route.params.sectionId)
      .then((res) => {
        if (res.code === 20000) {
          console.log("获取封禁用户信息成功");
          this.pinnedPostInfo = res.data;
        } else {
          console.log(res.msg);
          this.$message.error("封禁用户获取失败！");
        }
      })
      .catch((err) => console.log("error: " + err));
  },
};
</script>
