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
      Fout: {{ error }}
    </span>
    <ul
      class="grid grid-flow-row grid-cols-2 gap-10 cards-list md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
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
    // Only get cards on server or when none are available
    if (
      process.server ||
      this.availableCards == null ||
      this.availableCards.length <= 0
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
