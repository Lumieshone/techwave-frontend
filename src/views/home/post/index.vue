<template>
  <v-container>
    <!-- corresponding sections -->
    <v-btn text :to="`/forum`">论坛</v-btn>
    <span>></span>
    <v-btn text :to="`/section/${postData.sectionId}`"
      >{{ postData.sectionName }}
    </v-btn>
    <span>></span>
    <v-btn text>{{ postData.subsectionName }}</v-btn>

    <!-- title -->
    <h1 style="margin-bottom: 20px; margin-top: 10px">{{ postData.title }}</h1>
    <p>帖子id: {{ postId }}</p>
    <p>帖子浏览量: {{ postData.browseNumber }}</p>

    <!-- 是否收藏 -->
    <v-btn :disabled="!isLogin" v-on:click="openCollectDialog">
      <v-icon :color="postData.isCollected ? 'orange' : 'grey'"
        >mdi-star
      </v-icon>
      {{ isLogin ? "收藏" : "请先登录再收藏" }}
    </v-btn>

    <!-- 收藏文件夹 -->
    <v-dialog v-model="showCollectDialog" width="30%">
      <v-card>
        <v-card-title>选择收藏文件夹</v-card-title>
        <v-card-text>
          <v-select
            v-model="folderId"
            :items="folders"
            item-text="folderName"
            item-value="id"
            label="选择收藏夹"
            color="#7d73be"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="#7d73be"
            class="ma-2 white--text"
            small
            @click="closeCollectDialog"
            >取消
          </v-btn>
          <v-btn
            color="#7d73be"
            class="ma-2 white--text"
            small
            @click="collect"
          >
            确定
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>

    <!-- 一楼 -->
    <v-container>
      <v-card>
        <v-card-title>
          <span style="margin: 5px">{{ postData.floor }} 楼 </span>
          <span style="margin: 5px">{{ postData.author }}</span>
          <v-avatar>
            <img :src="postData.avatar" :alt="postData.author" />
          </v-avatar>
        </v-card-title>
        <v-card-subtitle
          ><span>{{ postData.time }}</span></v-card-subtitle
        >
        <v-card-text>
          <div v-html="postData.content"></div>
        </v-card-text>
      </v-card>
    </v-container>

    <!-- 浏览评论 -->
    <v-col
      v-for="singleCommentVOList in postData.commentVOList"
      :key="singleCommentVOList.floor"
    >
      <PostComment
        :commentData="singleCommentVOList"
        :postId="Number(postId)"
        :isLogin="Boolean(isLogin)"
        @refresh="refreshList"
      />
    </v-col>

    <!-- 分页 -->
    <v-pagination
      v-if="Math.ceil(postData.total / perPage) > 1"
      v-model="page"
      :length="Math.ceil(postData.total / perPage)"
      total-visible="7"
      color="#6A5ACD"
      @input="onPageChange(page, perPage)"
    ></v-pagination>

    <!-- comment on post -->
    <!-- <v-col>
      <v-card>
        <v-card-title>发表你的看法..</v-card-title>
        <v-card-subtitle>请文明发言哦~</v-card-subtitle>
        <v-card-text>
          <v-textarea
            v-model="commentContent"
            color="#7d73be"
            outlined
            label="评论"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-file-input
            v-model="comment_image_info"
            accept="image/*"
            small-chips
            multiple
            label="上传图片"
          ></v-file-input>
          <v-btn
            color="blue"
            class="ma-2 white--text"
            small
            @click="replyOnPost"
            :disabled="!isLogin"
          >
            {{ isLogin ? "评论" : "请先登录再发表评论" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col> -->

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
  </v-container>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { getToken } from "@/utils/auth";

// eslint-disable-next-line no-unused-vars
import { IEditorConfig } from "@wangeditor/editor";

import PostComment from "@/views/home/post/components/comment.vue";
import { getPostInfo, collectOrUncollectPost, replyOnPost } from "@/api/post";
import { getFolders } from "@/api/account";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  components: {
    PostComment,
    Editor,
    Toolbar,
  },
  data() {
    return {
      // is only host
      isOnlyHost: false,

      // user collect folder
      folders: [],
      folderId: undefined,
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
    // pagination
    onPageChange(page, perPage) {
      this.refreshList(page, perPage);
    },
    refreshList(page = this.page, perPage = this.perPage) {
      getPostInfo(this.postId, page, perPage, this.isOnlyHost)
        .then((res) => {
          this.postData = res.data;
          this.postData.floor = 1;
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

      // let fd = new FormData();
      // fd.append("content", this.commentContent);
      // this.comment_image_info.forEach((f) => fd.append("image", f));
      // fd.append("postId", this.postId);

      replyOnPost({ content: this.commentContent, postId: this.postId })
        .then((res) => {
          if (res.code === 20000) {
            this.$message.success("回复成功！");
            this.refreshList();
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

    closeCollectDialog() {
      this.showCollectDialog = false;
    },

    collect() {
      collectOrUncollectPost({ id: this.postId, folderId: this.folderId }).then(
        () => {
          this.postData.isCollected = !this.postData.isCollected;
          this.$message.success("收藏成功");
          this.showCollectDialog = false;
        }
      );
    },

    // rich text
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
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

  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
