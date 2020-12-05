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
        <!-- <button type="submit" class="button-primary">Inloggen</button> -->
        <RecaptchaButton @response="handleLogin">Inloggen</RecaptchaButton>
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
        <div class="mb-10">
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
            <LoginDebugInfo />
          </div>
        </div>
        <div class="flex flex-col max-w-sm action-buttons">
          <NuxtLink to="/beheer/kaart-toevoegen" class="button-primary"
            >Nieuwe kaart toevoegen</NuxtLink
          >
          <NuxtLink to="/beheer/statistieken" class="button-primary-outline"
            >Statistieken bekijken</NuxtLink
          >
          <button class="button-primary-outline" @click="handleLogout">
            Afmelden
          </button>
        </div>
      </div>
    </main>
  </client-only>
</template>

<style lang="less" scoped>
.action-buttons {
  & > * {
    @apply mb-4;
  }
}
</style>

<script>
import { mapActions } from "vuex";

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
  methods: {
    ...mapActions("auth", ["logout"]),
    async handleLogin(recaptchaResponse) {
      this.isAuthenticating = true;
      this.isRedirecting = false;
      this.error = null;
      try {
        const response = await this.$auth.loginWith("local", {
          data: {
            username: this.username,
            password: this.password,
            recaptchaResponse,
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
