<template>
  <main class="max-w-6xl p-10 mx-auto">
    <div class="flex flex-col mb-10 lg:flex-row">
      <div class="flex-1 mb-10 lg:mb-0 bg-candles min-h-50vh lg:min-h-0"></div>
      <div class="flex-1 lg:px-10">
        <h1 class="mt-0">Cultuur</h1>
        <p>
          Verlies is eigen aan het leven en heeft veel betekenissen zoals
          verlies van een job, gezondheid, een relatiebreuk, een dierbaar
          persoon door overlijden. Voor elk mens is het omgaan met verlies
          anders. Rouwen is het antwoord dat mensen geven op verlies. Rouwen
          doen we niet alleen. Dit gebeurt in wisselwerking met de omgeving, de
          samenleving en de cultuur waarin wij leven.
        </p>
        <p class="pb-4">
          Dit initiatief wil een bijdrage leveren aan een cultuur die open staat
          en verdraagzaam is voor verlies en pijn. Een cultuur die uitgaat van
          de eigen veer- en stuurkracht van mensen. Een cultuur waar elke
          persoon zijn of haar uniek rouwtraject kan bewandelen en beleven.
        </p>
        <NuxtLink to="/kaarten" class="button-primary"
          >Stuur een kaart</NuxtLink
        >
      </div>
    </div>
    <div class="">
      <h1>Contact</h1>
      <p>Dit initiatief werd bedacht door Francky Debusschere.</p>
      <p>
        Bij vragen of technische problemen, gelieve contact op te nemen met de
        beheerder van de website: Alexander Van Maele (alexander@atlesque.com).
      </p>
      <p>
        We hechten belang aan je privacy.
        <NuxtLink to="/privacybeleid" class="underline"
          >Lees hier ons privacybeleid</NuxtLink
        >.
      </p>
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
