<template>
  <v-container>
    <v-card>
      <v-banner
          single-line
      >
        <v-chip
            class="ma-2"
            label
        >
          原神
        </v-chip>
        虚空鼓动，劫火高扬
        <template v-slot:actions>
          <v-btn
              color="primary"
              text
          >
            收藏
          </v-btn>
        </template>
      </v-banner>
    </v-card>
    <v-card>
      <v-tabs
          background-color="cyan"
          light
          next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline"
          show-arrows
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab
            v-for="i in 30"
            :key="i"
            :href="'#tab-' + i"
        >
          Item {{ i }}
        </v-tab>
      </v-tabs>
    </v-card>
    <v-card>
      <v-list three-line>
        <template v-for="(item, index) in items">
          <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
          ></v-subheader>

          <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
          ></v-divider>

          <v-list-item
              v-else
              :key="item.title"
          >
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
    <v-pagination
        v-model="page"
        :length="15"
        :total-visible="7"
    ></v-pagination>
  </v-container>
</template>

<script>
export default {
  name: "ForumDetail",
  data(){
    return {
      page: 1,
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>