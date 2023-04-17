<template>
  <v-dialog v-model="this.showDialog" persistent width="22%">
    <v-card class="mx-auto my-auto">
      <v-toolbar color="#483D8B" cards dense dark>
        <v-icon>mdi-application-edit-outline</v-icon>
        <v-card-title class="text--lighten-5">
          <strong>确认</strong>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeConfirm">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form lazy-validation class="pa-4 pt-0">
        <v-card-text class="ma-4 text--lighten-5">
          <strong> <slot>确认？</slot></strong>
        </v-card-text>
        <v-row justify="end">
          <v-btn
            small
            color="#6A5ACD"
            class="ma-4 mr-2 white--text"
            @click="closeConfirm"
            >取消
          </v-btn>
          <v-btn
            small
            color="#6A5ACD"
            class="ma-4 ml-1 white--text"
            @click="confirmDelete"
            >确定
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Confirm",
  props: {
    showConfirm: Boolean,
  },
  data() {
    return {
      showDialog: this.showConfirm,
    };
  },
  methods: {
    closeConfirm() {
      this.$emit("close");
    },
    confirmDelete() {
      this.$emit("confirm");
    },
  },
  watch: {
    showConfirm(val) {
      this.showDialog = val;
    },
  },
};
</script>
