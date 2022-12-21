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
    <h1>{{ postData.title }}</h1>
    <p>帖子id: {{ postId }}</p>
    <p>帖子浏览量: {{ postData.browseNumber }}</p>

    <!-- tags -->
    <!-- <v-chip class="ma-2" v-for="tag in postData.tags.map((t) => '#' + t)" :key="tag">{{tag}}</v-chip> -->

    <!-- 是否收藏 -->
    <v-btn :disabled="!is_login" v-on:click="open_collect_dialog">
      <v-icon :color="postData.isCollected ? 'orange' : 'grey'"
        >mdi-star
      </v-icon>
      {{ is_login ? "收藏" : "请先登录再收藏" }}
    </v-btn>

    <!-- 收藏文件夹 -->
    <v-dialog v-model="show_collect_dialog">
      <v-card>
        <v-card-title>选择收藏文件夹</v-card-title>
        <v-card-text>
          <v-select
            v-model="folderId"
            :items="folders"
            item-text="folderName"
            item-value="id"
            label="选择收藏夹"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue"
            class="ma-2 white--text"
            small
            @click.native="close_collect_dialog"
            >取消
          </v-btn>
          <v-btn color="blue" class="ma-2 white--text" small @click="collect">
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
          ><span>{{ postData.updateTime }}</span></v-card-subtitle
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
        :is_login="Boolean(is_login)"
        @refresh="refreshList"
      />
    </v-col>

    <!-- 分页 -->
    <v-pagination
      v-if="Math.ceil(postData.total / limit) > 1"
      v-model="curPage"
      :length="Math.ceil(postData.total / limit)"
      total-visible="7"
      @input="onPageChange(curPage, limit)"
    ></v-pagination>

    <!-- comment on post -->
    <!-- <v-col>
      <v-card>
        <v-card-title>发表你的看法..</v-card-title>
        <v-card-subtitle>请文明发言哦~</v-card-subtitle>
        <v-card-text>
          <v-textarea
            v-model="commentContent"
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
            @click="reply_on_post"
            :disabled="!is_login"
          >
            {{ is_login ? "评论" : "请先登录再发表评论" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col> -->

    <!-- 富文本 -->
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

    <v-btn
      color="blue"
      class="ma-2 white--text"
      small
      @click="reply_on_post"
      :disabled="!is_login"
    >
      {{ is_login ? "评论" : "请先登录再发表评论" }}
    </v-btn>
  </v-container>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { getToken } from "@/utils/auth";

// eslint-disable-next-line no-unused-vars
import { IEditorConfig } from "@wangeditor/editor";

import PostComment from "@/views/home/post/components/comment.vue";
import { get_post_info, collect_post, reply_on_post } from "@/api/post";
import { get_folders } from "@/api/account";

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
      // user collect folder
      folders: [],
      folderId: undefined,
      show_collect_dialog: false,

      // pagination
      curPage: 1,
      limit: 5,

      // comment
      commentContent: "<p>发表你的看法~</p>",
      // comment_image_info: [],

      // is login?
      is_login: this.$store.getters.roles.length > 0,

      // post id (from query)
      postId: undefined,

      // post data (from backend)
      postData: {},

      // comment data (from backend)
      commentVOList: {},

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
              "JK-Token": "Bearer " + getToken(),
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
    onPageChange(curPage, limit) {
      this.refreshList(curPage, limit);
    },
    refreshList(curPage = this.curPage, limit = this.limit) {
      get_post_info({
        id: this.postId,
        offset: curPage,
        limit: limit,
      })
        .then((res) => {
          this.postData = res.data;
          this.postData.floor = 1;
          this.postData.commentVOList.forEach(
            (c, index) =>
              (c.floor = index + this.limit * (this.curPage - 1) + 2)
          );
        })
        .catch((err) => console.log("error: " + err));
    },

    // comment
    reply_on_post() {
      if (this.commentContent == "") {
        this.$message.error("评论内容还为空哦");
        return;
      }

      // let fd = new FormData();
      // fd.append("content", this.commentContent);
      // this.comment_image_info.forEach((f) => fd.append("image", f));
      // fd.append("postId", this.postId);

      reply_on_post({ content: this.commentContent, postId: this.postId })
        .then((res) => {
          if (res.code === 20000) {
            this.$message.success("回复成功！");
            this.refreshList();
          } else this.$message.error("阿欧，好像回复出现了一点小问题..");
        })
        .catch((err) => console.log("error: " + err));
    },

    // collect
    open_collect_dialog() {
      if (this.postData.isCollected == true) {
        collect_post({ id: this.postId })
          .then(() => {
            this.postData.isCollected = !this.postData.isCollected;
            this.$message.success("取消收藏成功！");
          })
          .error(() => {
            this.$message.error("额，似乎取消收藏出现了问题..");
          });
        return;
      }

      this.show_collect_dialog = true;
    },

    close_collect_dialog() {
      this.show_collect_dialog = false;
    },

    collect() {
      collect_post({ id: this.postId, folderId: this.folderId })
        .then(() => {
          this.postData.isCollected = !this.postData.isCollected;
          this.$message.success("收藏成功");
          this.show_collect_dialog = false;
        })
        .error(() => {
          this.$message.error("额，似乎收藏出现了问题..");
        });
    },

    // rich text
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
  },
  mounted() {
    this.postId = this.$route.params.postId;
    if (this.is_login) {
      get_folders().then((res) => {
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
