<template>
  <v-card height="580" class="ma-4 mb-6">
    <v-card-title v-text="title"></v-card-title>
    <v-row no-gutters justify="center">
      <v-col>
        <v-list
            tile
            dense
            min-height="470"
            max-height="1000"
        >
          <v-divider></v-divider>
          <v-list-item-group>
            <template v-for="(item, index) in posts">
              <v-list-item :key="item.postId">
                  <v-list-item-avatar>
                    <v-chip
                        color="#E6E6FA"
                        label
                        small
                    >
                      {{item.commentCount}}
                    </v-chip>
                  </v-list-item-avatar>
                  <v-list-item-content @click="stepToPost(item.postId)">
                    <template >
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.sectionName"></v-list-item-subtitle>
                    </template>
                  </v-list-item-content>
                  <v-list-item-action>
                      <v-list-item-action-text v-text="item.updateTime"></v-list-item-action-text>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn icon @click="deletePost(item.postId)">
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </v-list-item-action>
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
      </v-col>
    </v-row>
    <DeletePost
        :showConfirm="this.showConfirm"
        :postId="this.postId"
        @close="closeConfirm"
    >
    </DeletePost>
  </v-card>
</template>

<script>
import {get_my_post} from "@/api/account";
import DeletePost from "@/views/home/account/components/DeletePost";

export default {
  name: "AccountPost",
  components: {DeletePost},
  data(){
    return {
      title:"我的帖子",
      postId:0,
      control:false,
      showConfirm:false,
      valid: true,
      isEdit:false,
      curPage: 1,
      if_filter: false,
      limit: 8,
      whichPage: 1,
      total:20,
      posts:[]
    }
  },
  methods:{
    submit(flag){
      this.dialogVisible = flag
      window.location.reload();
    },
    closeConfirm(flag){
      this.showConfirm = flag
      window.location.reload();
    },
    stepToPost(postId){
      this.$router.push({path: '/post/'+ postId, params:{id:postId}})
    },
    jumpPage() {
      this.curPage = Number(this.whichPage);
    },
    onPageChange(curPage, limit) {
      get_my_post(curPage,limit)
          .then((res) => {
            console.log(res.data.total)
            this.total = res.data.total;
            this.posts = res.data.myPosts;
          })
          .catch((err) => console.log("error: " + err));
    },
    refreshList() {
      this.curPage = 1;
      get_my_post(1,this.limit)
          .then(res => {
            this.posts = res.data.myPosts;
          })
          .catch((err) => console.log("error: " + err));
    },
    deletePost(id){
      this.postId = id
      this.showConfirm = !this.showConfirm
    },

  },
  mounted() {
    get_my_post(1,this.limit)
        .then((res) => {
          console.log(res.data.total)
          this.total = res.data.total;
          this.posts = res.data.myPosts;
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