<template>
  <main class="mx-auto max-w-7xl">
    <section class="px-10 pb-16 mx-auto text-center max-w-7xl">
      <h1>
        <span v-if="error.statusCode === 404">Pagina niet gevonden</span>
        <span v-else>Fout bij laden van pagina</span>
      </h1>
      <NuxtLink to="/" class="button-primary">Terug naar voorpagina</NuxtLink>
    </section>
  </main>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
