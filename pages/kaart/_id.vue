<template>
  <main class="p-10">
    <h1>Kaart {{ cardId }}</h1>
  </main>
</template>

<script>
export default {
  computed: {
    cardId() {
      return this.$route.params.id;
    },
  },
};
</script>
