const baseUrl = process.env.NUXT_ENV_API_URL;

export const API = {
  auth: {
    root: baseUrl + "/auth",
    login: baseUrl + "/auth/login",
    profile: baseUrl + "/auth/profile",
  },
  cards: {
    root: baseUrl + "/cards",
  },
  messages: {
    root: baseUrl + "/messages",
    statistics: baseUrl + "/messages/statistics",
  },
};
