export default function ({ $axios, app, store }) {
  $axios.onRequest((config) => {
    if ((store.state.auth.loggedInUser || {}).accessToken != null) {
      config.headers.common.Authorization = `Bearer ${store.state.auth.loggedInUser.accessToken}`;
    }
  });

  $axios.onError((error) => {
    /* 
      HACK: Right now, every 401 request will clear the entire auth state.
      This is not compatible with a multi-role login solution, so beware
      when copy-pasting!

      The reason is Nuxt Auth module (4.9.1) does not set the auth token
      for the 'local' strategy. See: https://github.com/nuxt-community/auth-module/issues/844
      Solution comes from: https://github.com/nuxt-community/auth-module/issues/424
    */
    if (error.response && error.response.status === 401) {
      app.$auth.reset();
    }
    return Promise.reject(error);
  });
}
