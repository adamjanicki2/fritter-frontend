import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import util from "./util";

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    feedFreets: [], //feed freets
    exploreFreets: [], // explore page freets
    memories: [], // memories page freets
    username: null, // Username of the logged in user
    goodSportScore: null, // Good sport score of the logged in user
    followingInfo: null, // Following info of the logged in user
    alerts: {}, // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    setGoodSportScore(state, score) {
      /**
       * Update the stored score to the specified one.
       * @param score - new score to set
       */
      state.goodSportScore = score;
    },
    setFollowingInfo(state, info) {
      state.followingInfo = info;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    async refreshFreets(state) {
      let url = state.filter
        ? `/api/users/${state.filter}/freets`
        : "/api/freets/feed";
      let res = (await util.get(url)) ?? [];
      state.feedFreets = res;
      url = "/api/freets/explore";
      res = (await util.get(url)) ?? [];
      state.exploreFreets = res;
    },
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()],
});

export default store;
