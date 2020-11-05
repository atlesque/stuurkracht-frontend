<template>
  <main class="p-10">
    <span v-show="availableCards.length <= 0" class="text-xl text-theme-gray">
      Er zijn nog geen kaarten aangemaakt.
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
        class="relative overflow-hidden card"
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
}
</style>

<script>
import { mapActions, mapState } from "vuex";

export default {
  async fetch() {
    // Only get cards on server
    if (process.server) {
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
