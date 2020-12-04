<template>
  <client-only>
    <main class="p-10">
      <transition name="fade">
        <span v-if="isAuthenticating === true" class="text-xl text-theme-gray"
          >Bezig met inloggen...</span
        >
      </transition>
      <span
        v-if="isAuthenticating === false && error != null"
        class="block p-4 mt-4 text-xl text-white bg-red-800"
        >{{ error }}</span
      >
      <form
        v-if="isAuthenticating === false && $auth.loggedIn === false"
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

      <div
        v-if="
          $auth.user != null && $auth.user != false && isRedirecting === false
        "
      >
        <h1>
          Je bent aangemeld als
          <span class="text-theme-gray">{{ $auth.user }}</span>
        </h1>
        <button
          class="block underline"
          @click="isDebugInfoVisible = !isDebugInfoVisible"
        >
          <span v-if="isDebugInfoVisible === true"
            >Verberg technische details</span
          >
          <span v-else>Toon technische details</span>
        </button>
        <div v-if="isDebugInfoVisible === true" class="pl-4">
          <h2>Technische details</h2>
          <div class="pl-4 token-debug-info">
            <h3 class="font-bold">Nuxt auth module state:</h3>
            <pre>{{ nuxtAuthStatus }}</pre>
            <h3 class="font-bold">Decoded JWT token:</h3>
            <pre>{{ decodedToken }}</pre>
            <h3 class="font-bold">Token expires at:</h3>
            <pre>{{ tokenExpiryTime }}</pre>
            <h3 class="font-bold">Raw JWT token:</h3>
            <p class="max-w-xl break-all">{{ rawToken }}</p>
          </div>
        </div>
        <button class="mt-8 button-primary" @click="handleLogout">
          Afmelden
        </button>
      </div>
    </main>
  </client-only>
</template>

<style lang="less" scoped>
.token-debug-info {
  h3 {
    @apply mt-4;
  }
}
</style>

<script>
import { mapActions } from "vuex";
import jwtDecode from "jwt-decode";

export default {
  data() {
    return {
      username: "",
      password: "",
      isRedirecting: false,
      isAuthenticating: false,
      isDebugInfoVisible: false,
      error: null,
    };
  },
  computed: {
    nuxtAuthStatus() {
      return this.$store.state.auth;
    },
    rawToken() {
      const token = this.$auth.$storage.getUniversal("_token.local");
      return token;
    },
    decodedToken() {
      return jwtDecode(this.rawToken);
    },
    tokenExpiryTime() {
      return new Date(this.decodedToken.exp * 1000);
    },
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    async handleLogin() {
      this.isAuthenticating = true;
      this.isRedirecting = false;
      this.error = null;
      try {
        const response = await this.$auth.loginWith("local", {
          data: {
            username: this.username,
            password: this.password,
          },
        });
        this.isRedirecting = true;
        console.log(response);
      } catch (err) {
        console.log(err);
        this.error = "Fout tijdens het inloggen. Controleer je gegevens.";
      } finally {
        this.isAuthenticating = false;
      }
    },
    async handleLogout() {
      await this.$auth.logout();
    },
  },
};
</script>
