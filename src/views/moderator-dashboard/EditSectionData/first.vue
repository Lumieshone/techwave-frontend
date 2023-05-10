<template>
  <v-card height="580" class="mx-4 my-5">
    <v-card-title v-text="title"></v-card-title>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        :readonly="isReadonly"
        class="pa-8 pt-6"
    >
      <v-list>
        <v-list-item class="ml-4">
          <v-list-item-avatar size="56">
            <v-img :src="sectionAvatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle
                class="pt-1"
                @click="changeAvatar"
                id="changeAvatar"
            >
              <v-icon dark small>mdi-pencil </v-icon>
              修改头像
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-textarea
          v-model="name"
          maxlength="100"
          :rows="1"
          outlined
          no-resize
          :filled="isFilled"
          :rules="introRules"
          prepend-icon="mdi-card-account-details-outline"
          :counter="100"
          color="#483D8B"
          label="板块名称"
      ></v-textarea>
      <v-textarea
          v-model="intro"
          maxlength="100"
          :rows="3"
          outlined
          no-resize
          :filled="isFilled"
          :rules="introRules"
          prepend-icon="mdi-face-man-shimmer"
          :counter="100"
          color="#483D8B"
          label="板块介绍"
      ></v-textarea>
      <v-row justify="end">
        <v-btn
            color="#6A5ACD"
            class="ma-4 mt-6 white--text"
            :disabled="isDisabled"
            @click="changeInfo"
        >编辑
        </v-btn>
        <v-btn
            color="#6A5ACD"
            :disabled="!valid || !isDisabled"
            class="ma-4 mt-6 white--text"
            @click="submitChange"
        >保存
        </v-btn>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import {getSectionInfo, editSectionDescription, changeSectionName, editSectionAvatar} from "@/api/moderator";
import "babel-polyfill";

export default {
  name: "EditSectionData",
  data() {
    return {
      isLogin: this.$store.getters.roles.length !== 0,
      title: "板块信息",
      isReadonly: true,
      isFilled: true,
      isDisabled: false,
      valid: true,
      sectionId: null,
      file: [],
      id:this.SectionId,
      name: "",
      sectionAvatar: "",
      introRules: [(v) => v.length <= 150 || "板块介绍不应超过150个字符"],
      intro: ""
    };
  },
  methods: {
    changeAvatar(){
      this.show = !this.show;
      console.log(this.$refs.form.validate());
      if (this.$refs.form.validate()) {
          let fd = new FormData();
          fd.append("sectionId", this.id);
          fd.append("avatar", this.file);
          editSectionAvatar(fd)
              .then((res) => {
                console.log(res.message);
                if (res.code === 20000) {
                  this.$message.success("更换头像成功！");
                  this.$emit("submit_2", false);
                }
                else this.$message.error("更换头像失败~");
              })
              .catch((err) => console.log("error: " + err));
      }
    },
    submitChange() {
      this.sectionId = this.$route.params.sectionId;
      if (this.$refs.form.validate()) {
        this.isDisabled = !this.isDisabled;
        this.isReadonly = !this.isReadonly;
        this.isFilled = !this.isFilled;
        changeSectionName(this.sectionId,this.name)
            .then((res) => {
              console.log(res.message);
              if (res.code === 20000) {
                this.$message.success("修改板块名称成功！");
                window.location.reload();
              }
              else this.$message.error("修改板块名称失败~");
            })
            .catch((err) => console.log("error: " + err));
        editSectionDescription(this.sectionId,this.intro)
            .then((res) => {
              console.log(res.message);
              if (res.code === 20000) {
                this.$message.success("修改板块简介成功！");
                window.location.reload();
              }
              else this.$message.error("修改板块简介失败~");
            })
            .catch((err) => console.log("error: " + err));
      }
    },
    logout() {
      this.$store
          .dispatch("user/logout")
          .then(() => {
            console.log("logout completed");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
  mounted() {
    this.sectionId = this.$route.params.sectionId;
    if (this.isLogin) {
      getSectionInfo(this.sectionId)
          .then((res) => {
            if (res.code === 20000) {
              console.log("获取板块信息成功");
              this.sectionAvatar = res.data.avatar;
              this.name = res.data.name;
              this.intro = res.data.description;
            } else {
              this.$message.error("板块信息获取失败！");
            }
          })
          .catch((err) => console.log("error: " + err));
    }
  },
};
</script>

<style scoped></style>