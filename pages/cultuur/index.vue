<template>
  <main class="flex flex-col md:flex-row">
    <div class="flex-1 bg-candles min-h-50vh md:min-h-0"></div>
    <div class="flex-1 p-10 md:py-0">
      <h1 class="mt-0">Cultuur</h1>
      <p>
        Verlies is eigen aan het leven en heeft veel betekenissen zoals verlies
        van een job, gezondheid, een relatiebreuk, een dierbaar persoon door
        overlijden. Voor elk mens is het omgaan met verlies anders. Rouwen is
        het antwoord dat mensen geven op verlies. Rouwen doen we niet alleen.
        Dit gebeurt in wisselwerking met de omgeving, de samenleving en de
        cultuur waarin wij leven.
      </p>
      <p class="pb-4">
        Dit initiatief wil een bijdrage leveren aan een cultuur die open staat
        en verdraagzaam is voor verlies en pijn. Een cultuur die uitgaat van de
        eigen veer- en stuurkracht van mensen. Een cultuur waar elke persoon
        zijn of haar uniek rouwtraject kan bewandelen en beleven.
      </p>
      <NuxtLink to="/kaarten" class="button-primary">Stuur een kaart</NuxtLink>
    </div>
  </main>
</template>

<style lang="less" scoped>
.bg-candles {
  background-image: url("~assets/images/candles-heart.jpg");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
