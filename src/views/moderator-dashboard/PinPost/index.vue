<template>
  <v-card height="580" class="ma-4 mb-6">
    <v-card-title v-text="title"></v-card-title>
    <v-toolbar flat>
      <v-btn
        color="indigo"
        dark
        class="mt-1 ml-1 white--text"
        @click="dialog = true"
      >
        <v-icon>mdi-plus</v-icon>
        新增置顶帖子
      </v-btn>
    </v-toolbar>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>搜索帖子</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="keyword"
              label="请输入关键词"
              placeholder="请通过关键词搜索帖子"
              append-icon="mdi-magnify"
              style="width: 400px"
              @input="search"
              @keyup.enter="search"
              @click:append="search"
            ></v-text-field>
            <v-data-table
              :items="results"
              :headers="[
                { text: '标题', value: 'title' },
                { text: '操作', value: 'action' },
              ]"
              class="my-table"
              :hide-default-footer="results.length === 0"
            >
              <template v-slot:[`item.title`]="{ item }">
                <span>{{ item.title }}</span>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-btn small color="indigo" dark @click="pinPost(item.id)"
                  >置顶</v-btn
                >
              </template>
            </v-data-table>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon @click="pinPost(item.id)"> mdi-pin-off </v-icon>
                </v-btn>
              </template>
              <span>取消置顶</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { getPinnedPosts, searchPostInSection } from "@/api/section";
import { pinOrNotPinPost } from "@/api/moderator";
export default {
  name: "AccountSection",
  data() {
    return {
      title: "置顶帖子列表",
      showSectionDialog: false,
      showEditDialog: false,
      headers: [
        {
          text: "帖子标题",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "帖子作者", value: "author", sortable: false },
        { text: "点赞人数", value: "likeCount", sortable: false },
        { text: "更新时间", value: "time", sortable: false },
        { text: "置顶操作", value: "actions", sortable: false },
      ],
      item: [],
      pinnedPostInfo: [],
      reportCommentInfo: [],
      postId: 0,
      page: 1,
      perPage: 10,
      control: false,
      showConfirm: false,
      valid: true,
      isEdit: false,
      dialog: false,
      keyword: "",
      results: [],
      isLoading: false,
      searchResult: [],
      searchText: "",
      defaultText: "请通过关键词搜索帖子",
    };
  },
  methods: {
    createSection() {
      this.showSectionDialog = !this.showSectionDialog;
    },
    pinPost(id) {
      pinOrNotPinPost(id).then((res) => {
        if (res.code == 20000) {
          this.$message.success("操作成功！");
          this.dialog = false;
          getPinnedPosts(this.$route.params.sectionId).then((res) => {
            if (res.code === 20000) {
              this.pinnedPostInfo = res.data.postDataVOList;
            }
          });
        }
      });
    },
    search() {
      console.log(this.keyword);
      searchPostInSection(this.$route.params.sectionId, this.keyword, 1, 10)
        .then((res) => {
          if (res.code === 20000) {
            console.log("搜索帖子信息成功");
            this.results = res.data.postDataVOList;
          } else {
            console.log(res.msg);
            this.$message.error("搜索帖子信息获取失败！");
          }
        })
        .catch((err) => console.log("error: " + err));
      console.log(this.results);
    },
  },
  mounted() {
    getPinnedPosts(this.$route.params.sectionId)
      .then((res) => {
        if (res.code === 20000) {
          console.log("获取置顶帖子信息成功");
          console.log(res.data.postDataVOList);
          this.pinnedPostInfo = res.data.postDataVOList;
        } else {
          console.log(res.msg);
          this.$message.error("置顶帖子信息获取失败！");
        }
      })
      .catch((err) => console.log("error: " + err));
  },
};
</script>

<style scoped>
.lead {
  margin-top: 7px;
}
.v-text-field {
  width: 45px;
  height: 20px;
  margin-left: 8px;
  margin-right: 8px;
}
.goBtn {
  margin-left: 10px;
}
.my-table {
  margin-top: 20px;
}
</style>
