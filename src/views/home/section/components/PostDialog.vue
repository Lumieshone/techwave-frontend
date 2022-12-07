<template>
  <v-dialog
      v-model="this.show_dialog"
      persistent
      width="45%"
  >
    <v-card class="mx-auto">
      <v-toolbar
          color="#483D8B"
          cards
          dark
          flat
      >
        <v-icon>mdi-application-edit-outline</v-icon>
        <v-card-title class="text-h6 font-weight-regular">
          <strong>发布帖子</strong>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="close_post_dialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="pa-4 pt-6"
      >
        <v-text-field
            color="#483D8B"
            filled
            readonly
            dense
            outlined
            prepend-icon="mdi-form-select"
            label="发帖分区"
            :value="this.section_name"
        ></v-text-field>
        <v-text-field
            v-model="form.title"
            color="#483D8B"
            maxlength="30"
            :rules="title_rules"
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
            :rules="[v => !!v || '请选择帖子分区']"
            item-text="name"
            item-value="id"
            label="请选择对应分区"
            required
        ></v-select>
        <v-textarea
            v-model="form.content"
            maxlength="400"
            :rows="7"
            filled
            outlined
            prepend-icon="mdi-draw-pen"
            :counter="400"
            :rules="content_rules"
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
        </v-file-input>
        <v-row justify="end">
          <v-btn
              color="#6A5ACD"
              class="ma-3 white--text"
              @click="close_post_dialog"
          >返回
          </v-btn>
          <v-btn
              color="#6A5ACD"
              :disabled="!valid"
              class="ma-3 white--text"
              @click="publish_post"
          >发布
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import {publish_post} from "@/api/section";
export default {
  name: "PostDialog",
  props:{
    show_post_dialog: Boolean,
    subsection_list: undefined,
    section_id: undefined,
    section_name: String,
  },
  data(){
    return{
      show_dialog: this.show_post_dialog,
      files: [],
      subsections: this.subsection_list,
      title_rules: [
        v => !!v || '请输入标题',
        v => (v && v.length <= 30) || '标题长度不应超过30个字符',
      ],
      content_rules: [
        v => !!v || '请输入帖子内容',
        v => (v && v.length <= 400) || '帖子内容不应超过400个字符',
      ],
      valid: true,
      form:{
        title: '',
        subsection: '',
        content: ''
      }
    }
  },
  methods:{
    clear_dialog(){
      this.form.title = ''
      this.form.subsection = ''
      this.form.content = ''
      this.files = []
      this.$refs.form.resetValidation()
    },
    close_post_dialog(){
      this.$emit("callBack",false)
      this.clear_dialog()
    },
    publish_post(){
      console.log(this.$refs.form.validate())
      if(this.$refs.form.validate()){
        let fd = new FormData();
        fd.append('section_id',this.section_id)
        fd.append('title',this.form.title);
        fd.append('subsection',this.form.subsection);
        fd.append('content',this.form.content);
        fd.append('picture_list',this.files);
        for (let [a, b] of fd.entries()) {
          console.log(a, b)
        }
        publish_post(fd)
            .then((res) => {
              console.log(res.message)
              if(res.code === 20000)
                this.$message.success("发布帖子成功！")
              else
                this.$message.error("发布帖子失败~");
            })
            .catch((err) => console.log("error: " + err))
        this.$emit("callBack",false)
        this.clear_dialog()
      }
    }
  },
  watch: {
    show_post_dialog(val) {
      this.show_dialog = val
    },
    subsection_list(val){
      this.subsections = val
    }
  }
}
</script>

<style scoped>

</style>