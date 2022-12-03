<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col  md="10">
        <v-card>
          <v-banner
              single-line
              tile
          >
            <v-chip
                class="ma-2"
                color="#F0E68C"
                label
                text-color="#696969"
            >
              <strong>{{section_data.title}}</strong>
            </v-chip>
            <span class="section_intro">{{section_data.intro}}</span>
            <template v-slot:actions>
              <v-btn
                  color="#6A5ACD"
                  text
                  v-on:click="collect"
              >
                <v-icon :color="section_data.is_collected?'orange':'grey'">mdi-star</v-icon>
                收藏
              </v-btn>
              <v-btn
                  color="#6A5ACD"
                  text
                  v-on:click="post"
              >
                <v-icon>mdi-square-edit-outline</v-icon>
                发帖
              </v-btn>
            </template>
          </v-banner>
        </v-card>
      </v-col>
      <v-col md="10">
        <v-card>
          <v-tabs
              light
              color="#6A5ACD"
              next-icon="mdi-arrow-right-bold-box-outline"
              prev-icon="mdi-arrow-left-bold-box-outline"
              show-arrows
          >
            <v-tabs-slider color="#6A5ACD"></v-tabs-slider>
            <v-tab @change="refresh_list">
              全部帖子
            </v-tab>
            <v-tab
                v-for="tag in section_data.tags"
                :key="tag.id"
                @change="get_post_by_tag(tag.id,1,10)"
            >
              {{tag.name}}
            </v-tab>
          </v-tabs>
        </v-card>
      </v-col>
      <v-col md="10">
        <v-card>
          <v-list
              subheader
              tile
              min-height="600"
              max-height="1000"
          >
            <v-list-item-group
                active-class="brown--text"
            >
              <template v-for="(item, index) in section_data.posts">
                <v-list-item :key="item.id" @click="step_to_post(item.id)">
                  <template>
                    <v-list-item-avatar>
                      <v-chip
                          color="#f5e8cb"
                          label
                          small
                      >
                        {{item.reply}}
                      </v-chip>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text v-text="item.poster"></v-list-item-action-text>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-list-item-action-text v-text="item.time"></v-list-item-action-text>
                    </v-list-item-action>
                  </template>
                </v-list-item>
                <v-divider
                    v-if="index < section_data.posts.length - 1"
                    :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
          <v-row>
            <v-col cols="8">
              <v-pagination
                  v-if="Math.ceil(section_data.total / limit) > 1"
                  v-model="cur_page"
                  :length="Math.ceil(section_data.total/ limit)"
                  :total-visible="12"
                  @input="on_page_change(cur_page, limit)"
              ></v-pagination>
            </v-col>
            <v-col cols="4">
                <v-row no-gutters>
                    <span class="lead">跳转至第</span>
                    <v-text-field class="shrink" solo dense v-model="which_page" ></v-text-field>
                    <span class="lead">页</span>
                    <v-btn class="goBtn" small fab @click="jump_page()">GO</v-btn>
                </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <PostDialog
        :tag_list="this.tag_list"
        :section_id="this.section_id"
        :section_name="this.section_name"
        :show_post_dialog="this.show_post_dialog"
        @callBack="call_back"
    >
    </PostDialog>
  </v-container>
</template>

<script>
import {collect_section, filter_post_by_tag, get_section_info} from "@/api/section";
import PostDialog from "@/views/home/section/components/PostDialog";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Section",
  data(){
    return {
      user_id: this.$store.getters.user_id,
      cur_page: 1,
      if_filter: false,
      show_post_dialog: false,
      limit: 10,
      tag_id: 0,
      tag_list: [],
      item_length: 20,
      which_page: 1,
      // ability to collect(is login?)
      able_to_collect: this.$store.getters.roles.length > 0,
      section_id: undefined,
      section_name: '',
      section_data: {},
    }
  },
  components:{
    PostDialog
  },
  methods:{
    call_back(flag){
      this.show_post_dialog = flag
    },
    collect() {
      this.section_data.is_collected = !this.section_data.is_collected;
      collect_section(this.section_id)
          .then(res => {
            console.log(res.message)
            if(res.code === 20000)
              this.$message.success("收藏版块成功")
            else
              this.$message.error("收藏版块失败！")
          })
          .catch((err) => console.log("error: " + err));
    },
    post(){
      this.show_post_dialog = true;
    },
    step_to_post(post_id){
      this.$router.push({path: '/post/'+ post_id, params:{id:post_id}})
    },
    jump_page() {
      this.cur_page = Number(this.which_page);
    },
    on_page_change(cur_page, limit) {
      if(this.tag_id === 0)
        get_section_info(this.section_id,cur_page,limit)
            .then(res => {
              this.section_data = res.section_data;
            })
            .catch((err) => console.log("error: " + err));
      else{
        filter_post_by_tag(this.section_id,this.tag_id,cur_page,limit)
            .then((res) => {
              console.log(res.total)
              this.section_data.total = res.total;
              this.section_data.posts = res.posts_data;
            })
            .catch((err) => console.log("error: " + err));
      }
    },
    refresh_list() {
      this.tag_id = 0;
      this.cur_page = 1;
        get_section_info(this.section_id,1,10)
            .then(res => {
              this.section_data = res.section_data;
            })
            .catch((err) => console.log("error: " + err));
    },
    get_post_by_tag(id){
      this.cur_page = 1;
      this.tag_id = id;
      filter_post_by_tag(this.section_id,this.tag_id,1,10)
          .then((res) => {
            console.log(res.total)
            this.section_data.total = res.total;
            this.section_data.posts = res.posts_data;
          })
          .catch((err) => console.log("error: " + err));
    }
  },
  mounted() {
    this.section_id = this.$route.params.section_id;
    get_section_info(this.section_id,1,10)
        .then((res) => {
          this.section_data = res.section_data;
          this.tag_list = res.section_data.tags;
          this.section_name = res.section_data.title;
          console.log(this.tag_list)
        })
        .catch((err) => console.log("error: " + err));
  },
};
</script>

<style scoped>
.lead{
  margin-top:7px
}
.section_intro{
  margin-left: 12px;
  font-size: 14px;
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