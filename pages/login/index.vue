<template>
  <client-only>
    <main class="p-10">
      <span v-if="isAuthenticating === true" class="text-xl text-theme-gray"
        >Bezig met inloggen...</span
      >
      <span
        v-if="isAuthenticating === false && error != null"
        class="block p-4 mt-4 text-xl text-white bg-red-800"
        >{{ error }}</span
      >
      <form
        v-if="isAuthenticating === false && isLoggedIn === false"
        @submit.prevent="handleLogin"
      >
        <h1>Login als beheerder</h1>
        <div class="grid grid-cols-1 gap-4 mb-10 lg:grid-cols-2 lg:gap-10">
          <div class="flex flex-col">
            <label for="username" class="label">Gebruikersnaam</label>
            <input id="username" v-model="username" type="text" class="input" />
          </div>
          <div class="flex flex-col">
            <label for="password" class="label">Wachtwoord</label>
            <input
              id="password"
              v-model="password"
              type="password"
              name="password"
              class="input"
            />
          </div>
        </div>
        <button type="submit" class="button-primary">Inloggen</button>
      </form>
      <div v-if="loggedInUser != null && isRedirecting === false">
        <h1>
          Je bent aangemeld als
          <span class="text-theme-gray">{{ loggedInUser.username }}</span>
        </h1>
        <!-- <pre>{{ loggedInUser }}</pre> -->
        <button class="button-primary" @click="handleLogout">Afmelden</button>
      </div>
    </main>
  </client-only>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      isRedirecting: false,
    };
  },
  computed: {
    ...mapState("auth", ["isAuthenticating", "loggedInUser", "error"]),
    ...mapGetters("auth", ["isLoggedIn"]),
  },
  methods: {
    ...mapActions("auth", ["login", "logout"]),
    async handleLogin() {
      const response = await this.login({
        username: this.username,
        password: this.password,
      });
      if (response.accessToken != null) {
        this.isRedirecting = true;
        this.$router.push("/kaarten");
      }
    },
    async handleLogout() {
      await this.logout();
    },
  },
};
</script>
