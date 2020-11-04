<template>
  <main class="main-content">
    <section class="flex items-end min-h-screen p-10 pb-20 hero">
      <div>
        <p class="text-2xl font-bold text-white hero-text">
          Op deze website kunnen bezoekers een e-card sturen om kracht en steun
          te geven in verbondenheid. In het bijzonder aan personen die met
          verlies omgaan.
        </p>
        <NuxtLink to="/kaarten" class="uppercase button-primary"
          >Stuur een kaartje</NuxtLink
        >
      </div>
    </section>
    <section class="flex flex-col md:flex-row">
      <div class="flex-1 bg-feather"></div>
      <div class="flex items-center flex-1">
        <div class="p-10">
          <h1 class="pb-4">Stuurkracht</h1>
          <p>
            Stuurkracht betekent een signaal sturen als teken van verbondenheid
            en nabijheid met of zonder woorden.
          </p>
          <p>
            In een tweede betekenis verwijst stuurkracht naar de mogelijkheid om
            zelf invloed uit te oefenen in het omgaan met verlies en de
            veranderingen die dit met zich meebrengt. Verlies vraagt een
            heroriëntatie. Zowel voor de persoon en de omgeving. Stuurkracht
            drukt respect uit voor personen in rouw en zijn of haar omgeving.
            Het is een uitnodiging om verlies bespreekbaar te maken met
            mildheid.
          </p>
          <NuxtLink to="/cultuur" class="uppercase button-primary"
            >Ontdek de cultuur</NuxtLink
          >
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.hero {
  background: url("~assets/images/home-hero.jpg");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.hero-text {
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
  @apply max-w-xl;
}
.bg-feather {
  background-image: url("~assets/images/feather-on-water.jpg");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
