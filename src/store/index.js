import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import user from "./modules/user";
import count from "./modules/count";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    count
  },
  getters,
});

export default store;
