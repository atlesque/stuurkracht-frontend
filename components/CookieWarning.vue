<template>
  <section
    v-if="isVisible === true"
    class="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center p-4 bg-white border-t cookie-warning md:px-4"
  >
    <div class="flex flex-wrap items-center justify-around w-full max-w-2xl">
      <span class="mb-4 text-center md:mb-0 font-regular">
        Door gebruik te maken van deze site, ga je akkoord met ons
        <NuxtLink to="/privacybeleid" class="underline">privacybeleid</NuxtLink
        >.
      </span>
      <button
        class="font-bold text-theme-blue button"
        @click="handleAcceptCookiesClick"
      >
        Bevestigen
      </button>
    </div>
  </section>
</template>
<script>
export default {
  name: "CookieWarning",
  data() {
    return {
      isVisible: true,
    };
  },
  mounted() {
    const hasAcceptedCookies = JSON.parse(
      localStorage.getItem("acceptedCookies")
    );
    if (hasAcceptedCookies === true) {
      this.isVisible = false;
    }
  },
  methods: {
    handleAcceptCookiesClick() {
      localStorage.setItem("acceptedCookies", true);
      this.isVisible = false;
    },
  },
};
</script>
