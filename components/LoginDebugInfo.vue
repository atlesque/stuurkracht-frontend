<template>
  <section>
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
  </section>
</template>

<style lang="less" scoped>
.token-debug-info {
  h3 {
    @apply mt-4;
  }
}
</style>

<script>
import jwtDecode from "jwt-decode";

export default {
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
};
</script>
