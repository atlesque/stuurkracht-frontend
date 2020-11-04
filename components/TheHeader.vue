<template>
  <nav
    ref="navMenu"
    class="fixed flex justify-between w-full px-10 py-6 transition-all duration-500 md:justify-start"
    :class="[
      { 'is-dark': isPageTransparent === false || isAtPageTop === false },
    ]"
  >
    <NuxtLink to="/" class="pr-4 text-2xl font-bold uppercase logo"
      >Stuurkracht</NuxtLink
    >
    <div class="items-center hidden md:flex">
      <NuxtLink to="/kaarten" class="nav-link">Kaarten</NuxtLink>
      <NuxtLink to="/cultuur" class="nav-link">Cultuur</NuxtLink>
    </div>
    <button
      class="flex items-center mobile-menu-toggle md:hidden"
      @click="openMobileMenu"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fal"
        data-icon="bars"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="w-6 h-6"
      >
        <path
          fill="currentColor"
          d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"
          class=""
        ></path>
      </svg>
    </button>
    <div v-show="isMobileMenuVisible === true" class="mobile-menu">
      <div class="flex flex-col">
        <div class="flex justify-between pb-4">
          <button class="logo--mobile" @click="handleMobileLinkClick('/')">
            Stuurkracht
          </button>
          <button class="flex items-center" @click="closeMobileMenu">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="times"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              class="w-6 h-6"
            >
              <path
                fill="currentColor"
                d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                class=""
              ></path>
            </svg>
          </button>
        </div>
        <button
          class="flex nav-link--mobile"
          @click="handleMobileLinkClick('/kaarten')"
        >
          Kaarten
        </button>
        <button
          class="flex nav-link--mobile"
          @click="handleMobileLinkClick('/cultuur')"
        >
          Cultuur
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMobileMenuVisible: false,
      scrollTop: 0,
    };
  },
  computed: {
    isPageTransparent() {
      return ["/"].includes(this.$route.path);
    },
    isAtPageTop() {
      return this.scrollTop <= 30;
    },
  },
  mounted() {
    document.addEventListener("scroll", () => {
      /* if (document.documentElement.scrollTop > 20) {
        this.$refs.navMenu.classList.add("fixed");
      } else {
        this.$refs.navMenu.classList.remove("fixed");
      } */
      this.scrollTop = document.documentElement.scrollTop;
    });
  },
  methods: {
    openMobileMenu() {
      this.isMobileMenuVisible = true;
    },
    closeMobileMenu() {
      this.isMobileMenuVisible = false;
    },
    handleMobileLinkClick(linkUrl) {
      this.isMobileMenuVisible = false;
      this.$router.push(linkUrl);
    },
  },
};
</script>

<style lang="less" scoped>
nav {
  @apply bg-white;

  &:not(.is-dark) {
    @apply bg-transparent;

    a:not(.nav-link--mobile, .logo--mobile),
    .mobile-menu-toggle {
      text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
      color: rgba(255, 255, 255, 0.85);

      &:hover {
        color: white;
      }
    }
  }
}

.logo {
  @apply pr-4;
}

.logo--mobile {
  @apply text-2xl;
  @apply font-bold;
  @apply uppercase;
}

.nav-link {
  @apply px-4;
  @apply uppercase;
  @apply font-bold;
}

.nav-link--mobile {
  @apply uppercase;
  @apply font-bold;
  @apply py-3;
}

.mobile-menu {
  @apply absolute;
  @apply inset-0;
  @apply w-screen;
  @apply h-screen;
  @apply px-10;
  @apply py-6;
  @apply bg-white;
  @apply text-theme-black;
  @apply overscroll-contain;
  @apply z-10;
  @apply max-h-screen;
  @apply overflow-auto;
}
</style>
