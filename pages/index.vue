<template>
  <main class="transparent-header">
    <section class="flex items-end min-h-screen p-10 pb-20 hero">
      <div>
        <p class="text-2xl font-bold text-white hero-text">
          Op deze website kan je gratis e-cards sturen om kracht en steun te
          geven in verbondenheid. In het bijzonder aan personen die omgaan met
          verlies.
        </p>
        <NuxtLink to="/kaarten" class="button-primary"
          >Stuur een kaartje</NuxtLink
        >
      </div>
    </section>
    <section class="flex flex-col md:flex-row">
      <div class="flex-1 bg-feather min-h-50vh md:min-h-0"></div>
      <div class="flex items-center flex-1">
        <div class="p-10">
          <h1>Stuurkracht</h1>
          <p>
            Stuurkracht betekent een signaal sturen als teken van verbondenheid
            en nabijheid met of zonder woorden.
          </p>
          <p class="pb-4">
            In een tweede betekenis verwijst stuurkracht naar de mogelijkheid om
            zelf invloed uit te oefenen in het omgaan met verlies en de
            veranderingen die dit met zich meebrengt. Verlies vraagt een
            heroriëntatie. Zowel voor de persoon en de omgeving. Stuurkracht
            drukt respect uit voor personen in rouw en zijn of haar omgeving.
            Het is een uitnodiging om verlies bespreekbaar te maken met
            mildheid.
          </p>
          <NuxtLink to="/cultuur" class="button-primary"
            >Ontdek de cultuur</NuxtLink
          >
        </div>
      </div>
    </section>
    <section
      class="flex items-center justify-center p-4 text-white bg-theme-black"
    >
      <span class="text-sm"
        >Made with <span class="text-red-400">♥</span> by
        <a href="https://atlesque.com" target="_blank" class="link"
          >Atlesque</a
        ></span
      >
    </section>
  </main>
</template>

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
