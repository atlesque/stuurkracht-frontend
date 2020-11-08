import authApi from "@/api/auth";

const types = {
  START_LOGIN_AUTHENTICATION: "⏱ [Start] login authentication",
  STOP_LOGIN_AUTHENTICATION: "⏱ [Stop] login authentication",
  SET_LOGGED_IN_USER: "✅ Set logged in user",
  SET_ERROR: "⚠ Set error",
  CLEAR_ERROR: "✨ Cleared error",
};
export const state = () => ({
  isAuthenticating: false,
  loggedInUser: null,
  error: null,
});

export const getters = {
  isLoggedIn(state) {
    return state.loggedInUser != null;
  },
};

export const mutations = {
  [types.START_LOGIN_AUTHENTICATION](state) {
    state.isAuthenticating = true;
  },
  [types.STOP_LOGIN_AUTHENTICATION](state) {
    state.isAuthenticating = false;
  },
  [types.SET_LOGGED_IN_USER](state, user) {
    state.loggedInUser = user;
  },
  [types.SET_ERROR](state, error) {
    state.error = error;
  },
  [types.CLEAR_ERROR](state) {
    state.error = null;
  },
};

export const actions = {
  async login({ commit }, { username, password }) {
    commit(types.CLEAR_ERROR);
    commit(types.START_LOGIN_AUTHENTICATION);
    let loggedInUser;
    try {
      const response = await authApi.login({
        username,
        password,
      });
      loggedInUser = {
        username,
        accessToken: response.data.access_token,
      };
      commit(types.SET_LOGGED_IN_USER, loggedInUser);
    } catch (err) {
      console.error(err);
      commit(
        types.SET_ERROR,
        "Fout bij het inloggen. Controleer je gegevens alsjeblieft."
      );
    } finally {
      commit(types.STOP_LOGIN_AUTHENTICATION);
    }
    return loggedInUser;
  },
  logout({ commit }) {
    commit(types.SET_LOGGED_IN_USER, null);
  },
};
