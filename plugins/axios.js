export default function ({ $axios, app, store }) {
  $axios.onRequest((config) => {
    if ((store.state.auth.loggedInUser || {}).accessToken != null) {
      config.headers.common.Authorization = `Bearer ${store.state.auth.loggedInUser.accessToken}`;
    }
  });
}
