<template>
  <v-dialog v-model="this.showDialog" persistent width="30%">
    <v-card class="mx-auto">
      <v-toolbar color="#483D8B" cards dark flat>
        <v-icon>mdi-application-edit-outline</v-icon>
        <v-card-title class="text-h6 font-weight-regular">
          <strong>编辑版块</strong>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form" v-model="valid" lazy-validation class="pa-4 pt-6 pb-6">
        <v-select
            v-model="select"
            :items="choices"
            prepend-icon="mdi-checkbox-marked-outline"
            color="#483D8B"
            label="选择要编辑的内容"
        >
        </v-select>
        <v-file-input
            v-model="file"
            v-if="select===choices[0]"
            label="上传新头像"
            counter
            dense
            outlined
            :show-size="1000"
            accept="image/*"
            color="#483D8B"
            prepend-icon="mdi-panorama-outline"
        >
        </v-file-input>
        <v-text-field
            v-model="intro"
            v-if="select===choices[1]"
            maxlength="20"
            dense
            outlined
            prepend-icon="mdi-draw-pen"
            :counter="20"
            :rules="introRules"
            color="#483D8B"
            label="编辑版块简介"
            required
        ></v-text-field>
        <v-select
            v-if="select===choices[2]"
            v-model="subSelect"
            :items="subChoices"
            prepend-icon="mdi-tag-heart-outline"
            label="选择对子版块进行的操作"
            color="#483D8B"
        >
        </v-select>
        <v-combobox
            v-model="model"
            v-if="select===choices[2] && subSelect===subChoices[0]"
            :filter="filter"
            color="#483D8B"
            prepend-icon="mdi-tag-plus-outline"
            :hide-no-data="!search"
            :items="items"
            :search-input.sync="search"
            hide-selected
            label="添加子版块"
            multiple
            small-chips
            solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <span class="subheading mr-2">新建</span>
              <v-chip
                  :color="`${colors[nonce - 1]} lighten-3`"
                  label
                  small
              >
                {{ search }}
              </v-chip>
              <v-spacer></v-spacer>
              <v-list-item-action @click.stop>
                <v-btn
                    icon
                    @click.stop.prevent="create(search,colors[nonce - 1])"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
                v-if="item === Object(item)"
                v-bind="attrs"
                :color="`${item.color} lighten-3`"
                :input-value="selected"
                label
                small
            >
          <span class="pr-2">
            {{ item.text }}
          </span>
              <v-icon
                  small
                  @click="parent.selectItem(item)"
              >
                $delete
              </v-icon>
            </v-chip>
          </template>
          <template v-slot:item="{ index, item }">
            <v-text-field
                v-if="editing === item"
                v-model="editing.text"
                autofocus
                flat
                background-color="transparent"
                hide-details
                solo
                @keyup.enter="edit(index, item)"
            ></v-text-field>
            <v-chip
                v-else
                :color="`${item.color} lighten-3`"
                dark
                label
                small
            >
              {{ item.text }}
            </v-chip>
            <v-spacer></v-spacer>
            <v-list-item-action @click.stop>
              <v-btn
                  icon
                  @click.stop.prevent="edit(index, item)"
              >
                <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-combobox>
        <v-select
            v-if="select===choices[2] && (subSelect===subChoices[1] || subSelect===subChoices[2])"
            v-model="subSection"
            :items="subSections"
            prepend-icon="mdi-tag-search-outline"
            label="请选择子版块"
            color="#483D8B"
            item-text="name"
            item-value="id"
        >
        </v-select>
        <v-text-field
            v-model="subSectionName"
            v-if="select===choices[2] && subSelect===subChoices[1]"
            maxlength="20"
            dense
            outlined
            prepend-icon="mdi-draw-pen"
            :counter="20"
            :rules="nameRules"
            color="#483D8B"
            label="新名字"
            required
        ></v-text-field>
        <v-row justify="end">
          <v-btn
              color="#6A5ACD"
              class="ma-3 white--text"
              @click="closeDialog"
          >返回
          </v-btn>
          <v-btn
              color="#6A5ACD"
              :disabled="!valid"
              class="ma-3 white--text"
              @click="Submit"
          >提交
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  add_subsection,
  change_section_avatar,
  change_section_intro,
  delete_subsection,
  rename_subsection
} from "@/api/account";

export default {
  name: "EditSection",
  props: {
    showEditDialog: Boolean,
    SectionId: undefined,
    Intro: String,
    SubsectionList: undefined,
  },
  data() {
    return {
      showDialog: this.showEditDialog,
      choices:['头像','简介','子版块'],
      subChoices:['新建','重命名','删除'],
      subSections:this.SubsectionList,
      subSection:'',
      subSectionName:'',
      select:'',
      subSelect:'',
      file: [],
      intro:this.Intro,
      id:this.SectionId,
      nameRules: [
        (v) => !!v || "请输入新名字",
        (v) => (v && v.length <= 10) || "内容不应超过10个字符",
      ],
      introRules: [
        (v) => !!v || "请输入版块简介",
        (v) => (v && v.length <= 20) || "内容不应超过20个字符",
      ],
      valid: true,
      activator: null,
      attach: null,
      colors: ['green', 'indigo', 'cyan', 'teal', 'orange', 'purple'],
      editing: null,
      editingIndex: -1,
      items: [
        { header: '创建子版块' }
      ],
      nonce: 1,
      menu: false,
      model: [],
      x: 0,
      search: null,
      y: 0,
    }
  },
  methods: {
    clearDialog() {
      this.$refs.form.reset()
      this.model = [];
      this.intro = this.Intro;
      this.file = [];
      this.nonce= 1;
      this.items=[
        { header: '创建子版块' }
      ];
      this.$refs.form.resetValidation();
    },
    closeDialog() {
      this.$emit("callBack_2", false);
      this.clearDialog();
    },
    Submit() {
      console.log(this.$refs.form.validate());
      if (this.$refs.form.validate()) {
        if(this.select===this.choices[0]){
          let fd = new FormData();
          fd.append("sectionId", this.id);
          fd.append("avatar", this.file);
          change_section_avatar(fd)
            .then((res) => {
              console.log(res.message);
              if (res.code === 20000) {
                this.$message.success("更换头像成功！");
                this.$emit("submit_2", false);
              }
              else this.$message.error("更换头像失败~");
            })
            .catch((err) => console.log("error: " + err));
          this.clearDialog()
        }
        else if(this.select===this.choices[1]){
          change_section_intro(this.id,this.intro)
              .then((res) => {
                console.log(res.message);
                if (res.code === 20000) {
                  this.$message.success("编辑简介成功！");
                  this.$emit("submit_2", false);
                }
                else this.$message.error("编辑简介失败~");
              })
              .catch((err) => console.log("error: " + err));
          this.clearDialog()
        }
        else if(this.select===this.choices[2]){
          if(this.subSelect===this.subChoices[0])
          {
            let subsections = []
            console.log(this.model)
            for (let i = 0; i < this.model.length; i++) {
              subsections.push(this.model[i].text)
            }
            console.log(subsections)
            add_subsection(this.id,subsections) .then((res) => {
              console.log(res.message);
              if (res.code === 20000) {
                this.$message.success("创建子版块成功！");
                this.$emit("submit_2", false);
              }
              else this.$message.error("创建子版块失败~");
            })
                .catch((err) => console.log("error: " + err));
            this.clearDialog()
          }
          else if(this.subSelect===this.subChoices[1]){
            rename_subsection(this.subSection,this.subSectionName).then((res) => {
              console.log(res.message);
              if (res.code === 20000) {
                this.$message.success("重命名成功！");
                this.$emit("submit_2", false);
              }
              else this.$message.error("重命名失败~");
            })
                .catch((err) => console.log("error: " + err));
            this.clearDialog()
          }
          else if(this.subSelect===this.subChoices[2]){
            delete_subsection(this.subSection).then((res) => {
              console.log(res.message);
              if (res.code === 20000) {
                this.$message.success("删除成功！");
                this.$emit("submit_2", false);
              }
              else this.$message.error("删除失败~");
            })
                .catch((err) => console.log("error: " + err));
            this.clearDialog()
          }
        }
      }
    },
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    create(search,color){
      this.items.push({color:color,text:search})
      this.nonce = (this.nonce +1)%this.colors.length
    },
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
    },
  },
  watch: {
    model (val, prev) {
      if (val.length === prev.length) return

      this.model = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }
          this.items.push(v)
          this.nonce++
        }
        return v
      })
    },
    showEditDialog(val) {
      this.showDialog = val;
    },
    SubsectionList(val) {
      this.subSections = val;
    },
    SectionId(val) {
      this.id = val;
    },
    Intro(val) {
      this.intro = val;
    },
  },
};
</script>

<style scoped>

</style>
