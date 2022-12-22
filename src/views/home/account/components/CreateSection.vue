<template>
  <v-dialog v-model="this.showDialog" persistent width="40%">
    <v-card class="mx-auto">
      <v-toolbar color="#483D8B" cards dark flat>
        <v-icon>mdi-application-edit-outline</v-icon>
        <v-card-title class="text-h6 font-weight-regular">
          <strong>创建版块</strong>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form" v-model="valid" lazy-validation class="pa-4 pt-6 pb-6">
        <v-text-field
            v-model="title"
            color="#483D8B"
            maxlength="20"
            :rules="titleRules"
            dense
            outlined
            prepend-icon="mdi-view-dashboard-edit-outline"
            :counter="20"
            label="版块名"
            required
        ></v-text-field>
        <v-file-input
            v-model="file"
            label="版块头像"
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
            maxlength="20"
            dense
            outlined
            prepend-icon="mdi-draw-pen"
            :counter="20"
            :rules="introRules"
            color="#483D8B"
            label="版块简介"
            required
        ></v-text-field>
        <v-combobox
            v-model="model"
            :filter="filter"
            color="#483D8B"
            prepend-icon="mdi-tag-plus-outline"
            :hide-no-data="!search"
            :items="items"
            :search-input.sync="search"
            hide-selected
            label="初始子版块"
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
              @click="createSection"
          >创建
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import {create_section} from "@/api/account";
export default {
  name: "CreateSection",
  props: {
    showSectionDialog: Boolean,
  },
  data() {
    return {
      showDialog: this.showSectionDialog,
      title: "",
      file: [],
      intro:"",
      titleRules: [
        (v) => !!v || "请输入版块名",
        (v) => (v && v.length <= 10) || "长度不应超过10个字符",
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
        { header: '选择或创建初始子版块' },
        {
          text: '手机',
          color: 'purple',
        },
        {
          text: '电脑',
          color: 'red',
        },
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
      this.title = "";
      this.model = [];
      this.intro = "";
      this.file = [];
      this.nonce= 1;
      this.items=[
        { header: '选择或创建初始子版块' },
        {
          text: '手机',
          color: 'purple',
        },
        {
          text: '电脑',
          color: 'red',
        },
      ];
      this.$refs.form.resetValidation();
    },
    closeDialog() {
      this.$emit("callBack_1", false);
      this.clearDialog();
    },
    createSection() {
      console.log(this.$refs.form.validate());
      if (this.$refs.form.validate()) {
        let fd = new FormData();
        fd.append("sectionName", this.title);
        fd.append("sectionAvatar", this.file);
        fd.append("sectionIntro", this.intro);
        let subsections = []
        console.log(this.model)
        for (let i = 0; i < this.model.length; i++) {
          subsections.push(this.model[i].text)
        }
        console.log(subsections)
        fd.append("subsections", subsections);
        for (let [a, b] of fd.entries()) {
          console.log(a, b);
        }
        create_section(fd)
            .then((res) => {
              console.log(res.message);
              if (res.code === 20000) this.$message.success("创建版块成功！");
              else this.$message.error("创建版块失败~");
            })
            .catch((err) => console.log("error: " + err));
        this.$emit("submit_1", false);
        this.clearDialog();
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
    showSectionDialog(val) {
      this.showDialog = val;
    }
  },
};
</script>

<style scoped>

</style>
