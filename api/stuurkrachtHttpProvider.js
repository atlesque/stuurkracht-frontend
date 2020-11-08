import axios from "axios";
// import authStore from "@/store/auth.js";

axios.interceptors.request.use(
  (config) => {
    /* if (
      (((authStore || {}).state || {}).loggedInUser || {}).accessToken != null
    ) {
      const token = authStore.state.loggedInUser.accessToken;
      config.headers.Authorization = `Bearer ${token}`;
    } */
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { axios as HTTP };
