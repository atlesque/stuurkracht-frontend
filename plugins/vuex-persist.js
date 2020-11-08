import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  new VuexPersistence({
    key: "vuex",
    storage: window.localStorage,
    reducer: (state) => ({
      auth: state.auth,
    }),
  }).plugin(store);
};

/* import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const store =
  new Vuex.Store() <
  State >
  {
    state: {
      user: { name: "Arnav" },
      navigation: { path: "/home" },
    },
    plugins: [new VuexPersistence().plugin],
  };

export default store; */
