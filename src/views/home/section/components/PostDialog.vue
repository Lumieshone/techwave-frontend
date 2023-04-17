<template>
  <v-dialog v-model="this.showDialog" persistent width="70%">
    <v-card class="mx-auto">
      <v-toolbar color="#483D8B" cards dark flat>
        <v-icon>mdi-application-edit-outline</v-icon>
        <v-card-title class="text-h6 font-weight-regular">
          <strong>发布帖子</strong>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closePostDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form" v-model="valid" lazy-validation class="pa-4 pt-6">
        <v-text-field
          color="#483D8B"
          filled
          readonly
          dense
          outlined
          prepend-icon="mdi-form-select"
          label="发帖分区"
          :value="this.sectionName"
        ></v-text-field>
        <v-text-field
          v-model="form.title"
          color="#483D8B"
          maxlength="30"
          :rules="titleRules"
          filled
          dense
          outlined
          prepend-icon="mdi-view-dashboard-edit-outline"
          :counter="30"
          label="帖子标题"
          required
        ></v-text-field>
        <v-select
          v-model="form.subsection"
          color="#483D8B"
          prepend-icon="mdi-tag-heart-outline"
          filled
          dense
          outlined
          :items="subsections"
          :rules="[(v) => !!v || '请选择帖子分区']"
          item-text="name"
          item-value="id"
          label="请选择对应分区"
          required
        ></v-select>

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
              v-model="form.content"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="onCreated"
            />
          </div>
        </template>

        <!-- <v-textarea
            v-model="form.content"
            maxlength="400"
            color="#7d73be"
            :rows="7"
            filled
            outlined
            prepend-icon="mdi-draw-pen"
            :counter="400"
            :rules="contentRules"
            color="#483D8B"
            label="帖子内容"
            required
        ></v-textarea>
        <v-file-input
            v-model="files"
            label="添加图片"
            counter
            dense
            multiple
            filled
            outlined
            :show-size="1000"
            accept="image/*"
            color="#483D8B"
            prepend-icon="mdi-panorama-outline"
        >
          <template v-slot:selection="{ index, text }">
            <v-chip
                v-if="index < 2"
                label
                dark
                small
                color="#6A5ACD"
            >
              {{ text }}
            </v-chip>
            <span
                v-else-if="index === 2"
                class="text-overline grey--text text--darken-3 mx-2"
            >
          +{{ files.length - 2 }} Picture(s)
        </span>
          </template>
        </v-file-input> -->
        <v-row justify="end">
          <v-btn
            color="#6A5ACD"
            class="ma-3 white--text"
            @click="closePostDialog"
            >返回
          </v-btn>
          <v-btn
            color="#6A5ACD"
            :disabled="!valid"
            class="ma-3 white--text"
            @click="publishPost"
            >发布
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
// rich text editor
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { getToken } from "@/utils/auth";

// eslint-disable-next-line no-unused-vars
import { IEditorConfig } from "@wangeditor/editor";

import { publishPost } from "@/api/section";
export default {
  name: "PostDialog",
  components: {
    Editor,
    Toolbar,
  },
  props: {
    showPostDialog: Boolean,
    subsectionList: undefined,
    sectionId: undefined,
    sectionName: String,
  },
  data() {
    return {
      showDialog: this.showPostDialog,
      files: [],
      subsections: this.subsectionList,
      titleRules: [
        (v) => !!v || "请输入标题",
        (v) => (v && v.length <= 30) || "标题长度不应超过30个字符",
      ],
      contentRules: [
        (v) => !!v || "请输入帖子内容",
        (v) => (v && v.length <= 400) || "帖子内容不应超过400个字符",
      ],
      valid: true,
      form: {
        title: "",
        subsection: "",
        content: "<p>来说点什么吧~</p>",
      },

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

  // rich text
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },

  methods: {
    // rich text
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },

    clearDialog() {
      this.form.title = "";
      this.form.subsection = "";
      this.form.content = "";
      this.files = [];
      this.$refs.form.resetValidation();
    },
    closePostDialog() {
      this.$emit("callBack", false);
      this.clearDialog();
    },
    publishPost() {
      console.log(this.$refs.form.validate());
      if (this.$refs.form.validate()) {
        // let fd = new FormData();
        // fd.append("sectionId", this.sectionId);
        // fd.append("title", this.form.title);
        // fd.append("subsection", this.form.subsection);
        // fd.append("content", this.form.content);
        // fd.append("pictureList", this.files);
        // for (let [a, b] of fd.entries()) {
        //   console.log(a, b);
        // }
        publishPost({
          sectionId: this.sectionId,
          subsectionId: this.form.subsection,
          title: this.form.title,
          content: this.form.content,
        })
          .then((res) => {
            console.log(res.message);
            if (res.code === 20000) this.$message.success("发布帖子成功！");
            else this.$message.error("发布帖子失败~");
            window.location.reload();
          })
          .catch((err) => console.log("error: " + err));
        this.$emit("callBack", false);
        this.clearDialog();
      }
    },
  },
  watch: {
    showPostDialog(val) {
      this.showDialog = val;
    },
    subsectionList(val) {
      this.subsections = val;
    },
    // rich text
    // 监听父组件传值，将值赋值给编辑器
    value(n) {
      if (this.editor && n !== this.temp) {
        this.editor.$textElem.html(n);
      }
    },
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
