<template>
  <main class="p-10">
    <span
      v-show="
        availableCards.length <= 0 && isLoadingCards === false && error == null
      "
      class="text-xl text-theme-gray"
    >
      Er zijn nog geen kaarten aangemaakt.
    </span>
    <span
      v-show="availableCards.length <= 0 && isLoadingCards === true"
      class="text-xl text-theme-gray"
    >
      Kaarten worden geladen...
    </span>
    <span v-if="error != null && error.length > 0" class="text-xl text-red-900">
      {{ error }}
    </span>
    <template v-if="availableCards.length > 0 && isLoadingCards === false">
      <ul
        class="grid grid-flow-row grid-cols-2 gap-10 mb-10 cards-list md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
      >
        <li
          v-for="card in availableCards"
          :key="card.id"
          class="relative overflow-hidden transition-all duration-200 card"
        >
          <NuxtLink :to="`/kaart/${card.id}`">
            <img
              :src="card.picture"
              :alt="card.name"
              class="absolute inset-0 object-cover w-full h-full"
            />
          </NuxtLink>
        </li>
      </ul>
      <p>
        Ben je zelf creatief? Is er een kaart die jij graag zou willen delen met
        anderen?<br />Stuur ons een mailtje op
        <a
          class="underline"
          href="mailto:alexander@atlesque.com?subject=Kaart voor Stuurkracht"
          >alexander@atlesque.com</a
        >
        met jouw kaart!
      </p>
    </template>
  </main>
</template>

<style lang="less" scoped>
.card {
  padding-top: 100%;

  &:hover {
    @apply shadow-lg;
  }
}
</style>

<script>
import { mapActions, mapState } from "vuex";

export default {
  async fetch() {
    /*
      Simple client-side caching:
      Only get cards on server, when none are available
      or when user is logged in.
    */
    if (
      process.server ||
      this.availableCards == null ||
      this.availableCards.length <= 0 ||
      this.$auth.loggedIn === true
    ) {
      await this.getAvailableCards();
    }
  },
  computed: {
    ...mapState("cards", ["availableCards", "error", "isLoadingCards"]),
  },
  methods: {
    ...mapActions("cards", ["getAvailableCards"]),
  },
};
</script>
