<template>
  <v-card height="100%" class="ma-4 my-5">
    <v-card-title v-text="title"></v-card-title>
    <v-row no-gutters justify="center">
      <v-col>
        <v-list
            min-height="480"
            max-height="1000"
        >
          <v-divider></v-divider>
          <v-list-item-group>
            <template v-for="(item, index) in likes">
              <v-list-item :key="index">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content @click="stepToPost(item.link)">
                  <template >
                    <v-list-item-title v-text="item.content"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.createAt"></v-list-item-subtitle>
                  </template>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                  :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
        <v-row v-if="this.total > 10">
          <v-col cols="8">
            <v-pagination
                circle
                class="left"
                color="#6A5ACD"
                v-if="Math.ceil(total / perPage) > 1"
                v-model="page"
                :length="Math.ceil(total/ perPage)"
                :total-visible="10"
                @input="onPageChange(page)"
            ></v-pagination>
          </v-col>
          <v-col cols="4">
            <v-row no-gutters>
              <span class="lead">跳转至第</span>
              <v-text-field class="shrink" color="#7d73be" solo dense v-model="whichPage" ></v-text-field>
              <span class="lead">页</span>
              <v-btn class="goBtn" small fab @click="jumpPage()">GO</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {getLike} from "@/api/message";

export default {
  name: "ReceivedLikes",
  data(){
    return {
      title:"收到的赞",
      page: 1,
      perPage: 6,
      whichPage: 1,
      total:20,
      likes:[]
    }
  },
  methods:{
    stepToPost(link){
      this.$router.push({path: link})
    },
    jumpPage() {
      this.page = Number(this.whichPage);
    },
    onPageChange(page) {
      getLike(page, this.perPage)
          .then((res) => {
            console.log(res.data.total)
            this.total = res.data.total;
            this.likes = res.data.myLikes;
          })
          .catch((err) => console.log("error: " + err))
    },
    refreshList() {
      this.page = 1;
      getLike(this.page, this.perPage)
          .then((res) => {
            this.likes = res.data.myLikes;
          })
          .catch((err) => console.log("error: " + err))
    },
  },
  mounted() {
    getLike(1, this.perPage)
        .then((res) => {
          console.log(res.data.total)
          this.total = res.data.total;
          this.likes = res.data.myLikes;
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