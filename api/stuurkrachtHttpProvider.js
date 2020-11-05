import axios from "axios";
// import store from "@/store/index";

axios.interceptors.request.use(
  (config) => {
    // TODO: Add JWT token here later
    /* const token = store.getters.oidcAccessToken;
    if (token != null) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } */
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { axios as HTTP };
