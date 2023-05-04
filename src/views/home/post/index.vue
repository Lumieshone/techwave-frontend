<template>
  <v-container>
    <v-breadcrumbs>
      <v-breadcrumbs-item to="forum">论坛 </v-breadcrumbs-item>
      <v-icon>mdi-chevron-right</v-icon>
      <v-breadcrumbs-item :to="`/section/${postData.sectionId}`"
        >{{ postData.sectionName }}
      </v-breadcrumbs-item>
      <v-icon>mdi-chevron-right</v-icon>
      <v-breadcrumbs-item>{{ postData.subsectionName }} </v-breadcrumbs-item>
    </v-breadcrumbs>

    <!-- TODO: 加上空骨架 -->

    <!-- title -->
    <h1 style="margin-bottom: 20px; margin-top: 10px">{{ postData.title }}</h1>
    <p>帖子id: {{ postId }}</p>
    <p>帖子浏览量: {{ postData.browseNumber }}</p>

    <!-- 是否收藏 -->
    <v-btn :disabled="!isLogin" @click="openCollectDialog">
      <v-icon :color="postData.isCollected ? 'orange' : 'grey'"
        >mdi-star
      </v-icon>
      {{ isLogin ? "收藏" : "请先登录再收藏" }}
    </v-btn>

    <v-dialog v-model="showCollectDialog" width="50%">
      <select-collect
        :folders="folders"
        :postId="postId"
        @closeCollectDialog="showCollectDialog = false"
        @collectSuccess="
          postData.isCollected = true;
          showCollectDialog = false;
        "
      ></select-collect>
    </v-dialog>

    <!-- 是否点赞 -->
    <v-btn :disabled="!isLogin" @click="likeOrUnlike">
      <v-icon :color="postData.isLiked ? 'red' : 'grey'">mdi-thumb-up </v-icon
      >{{ postData.likeCount }}
      {{ isLogin ? "点赞" : "请先登录再点赞" }}
    </v-btn>

    <!-- 是否只看楼主 -->
    <v-btn @click="changeOnlySeeHost">
      <v-icon :color="isOnlyHost ? 'orange' : 'grey'">mdi-account </v-icon>
      {{ isOnlyHost ? "取消只看楼主" : "只看楼主" }}
    </v-btn>

    <!-- 举报 -->
    <v-btn @click="showReportDialog=true" v-show="isLogin">
      <v-icon>mdi-alert-circle-outline </v-icon>举报
    </v-btn>

    <!-- 一楼 -->
    <post-body
      :author="postData.author"
      :avatar="postData.avatar"
      :content="postData.content"
      :time="postData.time"
    ></post-body>

    <!-- 浏览评论 -->
    <div
      v-for="singleCommentVOList in postData.commentVOList"
      :key="singleCommentVOList.floor"
    >
      <post-comment
        :commentData="singleCommentVOList"
        :postId="Number(postId)"
        :isLogin="Boolean(isLogin)"
        :sectionId="postData.sectionId"
        @refresh="refreshList"
      />
    </div>

    <!-- 分页 -->
    <v-pagination
      v-if="Math.ceil((postData.total - 1) / perPage) > 1"
      v-model="page"
      :length="Math.ceil((postData.total - 1) / perPage)"
      total-visible="7"
      color="#6A5ACD"
      @input="onPageChange(page, perPage)"
    ></v-pagination>

    <!-- 富文本 -->
    <div v-show="isLogin">
      <template>
        <div style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 500px; overflow-y: hidden"
            v-model="commentContent"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
          />
        </div>
      </template>
    </div>

    <v-btn
      color="#7d73be"
      class="ma-2 white--text"
      small
      @click="replyOnPost"
      :disabled="!isLogin"
    >
      {{ isLogin ? "评论" : "请先登录再发表评论" }}
    </v-btn>

    <!-- 举报 -->
    <v-dialog width="50%" v-model="showReportDialog">
      <report-post
        :reportType="'post'"
        :reportedId="postId"
        :sectionId="sectionId"
        @closeReportDialog="
          showReportDialog = false;
        "
      ></report-post>
    </v-dialog>
  </v-container>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { getToken } from "@/utils/auth";

// eslint-disable-next-line no-unused-vars
import { IEditorConfig } from "@wangeditor/editor";

import PostComment from "@/views/home/post/components/comment.vue";
import SelectCollect from "@/views/home/post/components/SelectCollect.vue";
import PostBody from "./components/PostBody.vue";
import ReportPost from "@/views/home/post/components/ReportPost.vue";

import {
  getPostInfo,
  collectOrUncollectPost,
  replyOnPost,
  likeOrUnlikePost,
} from "@/api/post";
import { getFolders } from "@/api/account";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  components: {
    PostComment,
    SelectCollect,
    PostBody,
    ReportPost,
    // rich text
    Editor,
    Toolbar,
  },
  data() {
    return {
      // is only host
      isOnlyHost: 0,

      // user collect folder
      folders: [],
      showCollectDialog: false,

      // pagination
      page: 1,
      perPage: 5,

      // comment
      commentContent: "<p>发表你的看法~</p>",
      // comment_image_info: [],

      // is login?
      isLogin: this.$store.getters.roles.length > 0,

      // post id (from query)
      postId: undefined,

      // post data (from backend)
      postData: {},

      // comment data (from backend)
      commentVOList: [],

      // report
      showReportDialog: false,

      // rich text
      editor: null,
      toolbarConfig: {},
      editorConfig: {
        placeholder: "请输入内容...",
        MENU_CONF: {
          uploadImage: {
            server: this.$baseURL + "/post/upload_picture",
            fieldName: "image",
            headers: {
              "T-Token": "Bearer " + getToken(),
            },
            withCredentials: true,
            // 自定义插入图片
            customInsert(res, insertFn) {
              console.log(res);
              // 从 res 中找到 url alt href ，然后插入图片
              insertFn(res.data.url, "", "");
            },
          },
        },
      },
      mode: "default", // or 'simple'
    };
  },
  watch: {
    // 监听父组件传值，将值赋值给编辑器
    value(n) {
      if (this.editor && n !== this.temp) {
        this.editor.$textElem.html(n);
      }
    },
  },
  methods: {
    // is only host
    changeOnlySeeHost() {
      this.isOnlyHost = this.isOnlyHost == 0 ? 1 : 0;
      this.page = 1;
      this.refreshList();
    },
    // pagination
    onPageChange(page, perPage) {
      this.refreshList(page, perPage);
    },
    refreshList(page = this.page, perPage = this.perPage) {
      getPostInfo(this.postId, page, perPage, this.isOnlyHost)
        .then((res) => {
          this.postData = res.data;
          this.postData.commentVOList.forEach(
            (c, index) => (c.floor = index + this.perPage * (this.page - 1) + 2)
          );
        })
        .catch((err) => console.log("error: " + err));
    },

    // comment
    replyOnPost() {
      if (this.commentContent == "") {
        this.$message.error("评论内容还为空哦");
        return;
      }

      replyOnPost({ content: this.commentContent, postId: this.postId })
        .then((res) => {
          if (res.code === 20000) {
            this.$message.success("回复成功！");
            this.refreshList();
            this.commentContent = "<p>发表你的看法~</p>";
          }
        })
        .catch((err) => console.log("error: " + err));
    },

    // collect
    openCollectDialog() {
      if (this.postData.isCollected == true) {
        collectOrUncollectPost({ id: this.postId }).then(() => {
          this.postData.isCollected = !this.postData.isCollected;
          this.$message.success("取消收藏成功！");
        });
        return;
      }

      this.showCollectDialog = true;
    },

    // rich text
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },

    // like
    likeOrUnlike() {
      likeOrUnlikePost({ postId: this.postId }).then((res) => {
        if (res.code === 20000) {
          this.postData.isLiked = !this.postData.isLiked;
          this.postData.likeCount += this.postData.isLiked ? 1 : -1;
          if (this.postData.isLiked) {
            this.$message.success("点赞成功！");
          } else {
            this.$message.success("取消点赞成功！");
          }
        }
      });
    },
  },
  mounted() {
    this.postId = parseInt(this.$route.params.postId);
    if (this.isLogin) {
      getFolders().then((res) => {
        this.folders = res.data.folders;
      });
    }
    this.refreshList();
  },

  // rich text
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
