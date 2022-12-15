<template>
  <v-card class="ma-4">
    <v-card-title v-text="title"></v-card-title>
    <v-row no-gutters justify="center">
      <v-col>
        <v-card>
          <v-row>
            <v-col cols="10">
              <v-tabs
                  light
                  color="#6A5ACD"
                  show-arrows
              >
                <v-tab
                    v-for="(folder,index) in folders"
                    :key="folder.id"
                    @change="getCollects(folder.id,folder.folderName)"
                >
                  <v-icon v-if="index === 0" class="mr-1">mdi-folder-home-outline</v-icon>
                  <v-icon v-else class="mr-1">mdi-folder-outline</v-icon>
                  {{folder.folderName}}
                </v-tab>
              </v-tabs>
            </v-col>
         <v-col cols="2">
           <v-btn
               color="#6A5ACD"
               class="mb-n5 mr-0 white--text"
               small
               @click="createFolder"
           ><v-icon class="mr-1" small>mdi-plus</v-icon>
             新建</v-btn>
         </v-col>
          </v-row>
        </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-row class="mt-2 ml-2 pt-4  mr-16 pr-16 mb-4" no-gutters>
              <v-text-field
                  ref="form"
                  color="#483D8B"
                  class="mr-4"
                  dense
                  :outlined="this.isEdit"
                  :rules="[v => !!v || '收藏夹名称不能为空！',v => v && v.length <= 8 || '名称长度不超过8个字符',]"
                  :readonly="!this.isEdit"
                  :append-icon="this.isEdit ? 'mdi-check':'mdi-pencil-outline'"
                  label="收藏夹名称"
                  @click:append="renameFolder"
                  :value="this.folderName"
              ></v-text-field>
              <v-btn
                  color="#6A5ACD"
                  class="mx-6 white--text"
                  :disabled="this.folderId === this.folders[0].id"
                  small
                  @click="deleteFolder"
              ><v-icon class="mr-1" small>mdi-trash-can-outline</v-icon>
                删除收藏夹</v-btn>
            </v-row>
              <v-list
                  tile
                  dense
                  min-height="400"
                  max-height="1000"
              >
                <v-list-item-group
                    active-class="deep-purple--text"
                >
                  <template v-for="(item, index) in collects">
                    <v-list-item :key="item.postId" @click="stepToPost(item.postId)">
                      <template>
                        <v-list-item-content>
                          <v-list-item-title v-text="item.title"></v-list-item-title>
                          <v-list-item-subtitle v-text="item.posterName"></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-list-item-action-text v-text="item.sectionName"></v-list-item-action-text>
                        </v-list-item-action>
                        <v-list-item-action>
                          <v-list-item-action-text v-text="item.time"></v-list-item-action-text>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                    <v-divider
                        :key="index"
                    ></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
                <v-row>
                  <v-col cols="8">
                    <v-pagination
                        circle
                        class="left"
                        color="#6A5ACD"
                        v-if="Math.ceil(total / limit) > 1"
                        v-model="curPage"
                        :length="Math.ceil(total/ limit)"
                        :total-visible="10"
                        @input="onPageChange(curPage, limit)"
                    ></v-pagination>
                  </v-col>
                  <v-col cols="4">
                    <v-row no-gutters>
                      <span class="lead">跳转至第</span>
                      <v-text-field class="shrink" solo dense v-model="whichPage" ></v-text-field>
                      <span class="lead">页</span>
                      <v-btn class="goBtn" small fab @click="jumpPage()">GO</v-btn>
                    </v-row>
                  </v-col>
                </v-row>
          </v-card>
        </v-col>
    </v-row>
    <DeleteConfirm
        :showConfirm="this.showConfirm"
        :folder="this.folderId"
        @close="closeConfirm"
    >
    </DeleteConfirm>
    <CreateFolder
        :dialogVisible="this.dialogVisible"
        @callBack="callBack"
        @submit="submit"
    >
    </CreateFolder>
  </v-card>
</template>

<script>
import {get_collect_info, get_folders, rename_folder} from "@/api/account";
import CreateFolder from "@/views/home/account/components/CreateFolder";
import DeleteConfirm from "@/views/home/account/components/DeleteConfirm";

export default {
  name: "AccountCollect",
  components: {DeleteConfirm, CreateFolder},
  data(){
    return {
      title:"我的收藏",
      showConfirm:false,
      dialogVisible:false,
      valid: true,
      isEdit:false,
      curPage: 1,
      show_post_dialog: false,
      limit: 8,
      whichPage: 1,
      total:20,
      folderId:0,
      folderName:'默认收藏夹',
      folders: [],
      collects:[]
    }
  },
  methods:{
    submit(flag){
      this.dialogVisible = flag
      window.location.reload();
    },
    callBack(flag){
      this.dialogVisible = flag
    },
    closeConfirm(flag){
      this.showConfirm = flag
    },
    stepToPost(postId){
      this.$router.push({path: '/post/'+ postId, params:{id:postId}})
    },
    jumpPage() {
      this.curPage = Number(this.whichPage);
    },
    onPageChange(curPage, limit) {
        get_collect_info(this.folderId,curPage,limit)
            .then((res) => {
              console.log(res.data.total)
              this.total = res.data.total;
              this.collects = res.data.folderPostDTOList;
            })
            .catch((err) => console.log("error: " + err));
      },
    refreshList() {
      this.folderId = 0;
      this.folderName = '默认收藏夹';
      this.curPage = 1;
      get_collect_info(this.folderId,1,this.limit)
          .then(res => {
            this.collects = res.data.folderPostDTOList;
          })
          .catch((err) => console.log("error: " + err));
    },
    getCollects(id,name){
      this.curPage = 1;
      this.folderId = id;
      this.folderName = name;
      get_collect_info(id,1,this.limit)
          .then((res) => {
            console.log(res.data.total)
            this.total = res.data.total;
            this.collects = res.data.folderPostDTOList;
          })
          .catch((err) => console.log("error: " + err));
    },
    renameFolder(){
      if(this.isEdit){
        if(this.$refs.form.validate()){
          this.isEdit = !this.isEdit
          rename_folder(this.folderId,this.folderName)
              .then((res) => {
                if(res.code === 20000){
                  this.$message.success("重命名成功！")
                  window.location.reload();
                }
                else
                  this.$message.error(res.message);
              })
              .catch((err) => console.log("error: " + err))
        }
      }
      else
        this.isEdit = !this.isEdit
    },
    createFolder(){
      this.dialogVisible = !this.dialogVisible
    },
    deleteFolder(){
      this.showConfirm = !this.showConfirm
    },

  },
  mounted() {
    get_folders()
        .then((res) => {
          this.folders = res.data.folders;
        })
        .catch((err) => console.log("error: " + err));
    get_collect_info(0,1,this.limit)
        .then((res) => {
          console.log(res.data.total)
          this.total = res.data.total;
          this.collects = res.data.folderPostDTOList;
        })
        .catch((err) => console.log("error: " + err))
  },
}
</script>

<style scoped>
.lead{
  margin-top:7px
}
.v-text-field{
  width:45px;
  height:20px;
  margin-left: 8px;
  margin-right: 8px
}
.goBtn{
  margin-left:10px
}
</style>