<template>
  <v-card height="580" class="ma-4 mb-6">
    <v-card-title v-text="title"></v-card-title>
    <div style="margin-left: 20px;">
      <v-text-field
          v-model="keyword"
          placeholder="请搜索用户"
          append-icon="mdi-magnify"
          style="width: 400px"
          @input="search"
          @keyup.enter="search"
          @click:append="search"
      ></v-text-field>
    </div>
    <div style="font-weight: bold;margin-left: 20px;margin-top: 50px;">搜索用户列表</div>
    <v-row no-gutters justify="center">
      <v-col>
        <v-data-table
            :headers="headers"
            :items="results"
            class="elevation-1 px-5"
            :hide-default-footer="results.length === 0"
            height="435"
        >
          <template v-slot:[`item.avatar`]="{ item }">
            <v-avatar class="my-2"><img
                alt="Avatar"
                :src=item.avatar
            ></v-avatar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on">
                  <v-icon
                      @click="transfer(item.id,item.username)"
                  >
                    mdi-account-switch
                  </v-icon>
                </v-btn>
              </template>
              <span>转让版主</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <v-dialog
            v-model="dialog"
            max-width="500"
        >
          <v-card>
            <v-card-title class="headline">确认转让</v-card-title>

            <v-card-text>你确定要将版主转让给 {{ userName }} 吗？</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                  color="indigo" dark
                  text
                  @click="dialog = false"
              >
                取消
              </v-btn>

              <v-btn
                  color="indigo" dark
                  text
                  @click="confirmTransfer()"
              >
                确认
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {searchUser, transferSection} from "@/api/moderator";
export default {
  name: "ModeratorTransfer",
  data() {
    return {
      showAlert: false,
      results: [],
      keyword: "",
      banUntil: null,
      dialog: false,
      sectionId: null,
      userName: null,
      title: '版主转让',
      banDate:"",
      targetId:null,
      headers: [
        {
          text: '用户ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: '用户名', value: 'username', sortable: false },
        { text: '邮箱', value: 'email', sortable: false },
        { text: '头像', value: 'avatar', sortable: false },
        { text: '性别', value: 'gender', sortable: false },
        { text: '操作', value: 'actions', sortable: false },
      ],
      pinnedPostInfo: []
    };
  },
  methods:{
    search() {
      console.log(this.keyword)
      searchUser(this.keyword, 1, 10)
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
    transfer(targetId,userName){
      console.log(this.targetId)
      this.dialog = true;
      this.userName = userName
      this.targetId = targetId
    },
    confirmTransfer () {
      console.log(this.$route.params.sectionId, this.targetId)
      transferSection(this.$route.params.sectionId, this.targetId)
          .then((res) => {
            if (res.code === 20000) {
              console.log("转让版主成功");
            } else {
              console.log(res.msg);
              this.$message.error("转让版主失败！");
            }
          })
          .catch((err) => console.log("error: " + err));
      alert(`已将版主转让给 ${this.userName}`);
      this.$router.push('/');
    },
  },
};
</script>
