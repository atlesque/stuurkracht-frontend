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
