<template>
  <div>
    <transition name="fade" mode="out-in">
      <button
        v-if="isInitialButtonVisible === true"
        :class="buttonClass"
        @click.prevent="handleClick"
      >
        <slot></slot>
      </button>
    </transition>
    <div
      v-if="isInitialButtonVisible === false || isRecaptchaVisible === true"
      key="recaptchaVerification"
    >
      <vue-recaptcha
        class="h-0 transition-opacity duration-200"
        :class="[{ 'opacity-0': isRecaptchaLoaded === false }]"
        :sitekey="recaptchaKey"
        :load-recaptcha-script="true"
        @verify="handleRecaptchaResponse"
        @render="handleRecaptchaLoaded"
      ></vue-recaptcha>
    </div>
  </div>
</template>
<script>
import VueRecaptcha from "vue-recaptcha";

export default {
  components: {
    VueRecaptcha,
  },
  props: {
    buttonClass: {
      type: String,
      default: "button-primary",
    },
    onlyShowCaptcha: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isRecaptchaVisible: false,
      isRecaptchaLoaded: false,
    };
  },
  computed: {
    recaptchaKey() {
      return process.env.NUXT_ENV_RECAPTCHA_KEY;
    },
    isInitialButtonVisible() {
      return (
        this.onlyShowCaptcha === false && this.isRecaptchaVisible === false
      );
    },
  },
  methods: {
    handleClick() {
      this.isRecaptchaVisible = true;
    },
    handleRecaptchaResponse(recaptchaResponse) {
      this.$emit("response", recaptchaResponse);
    },
    handleRecaptchaLoaded() {
      setTimeout(() => {
        this.isRecaptchaLoaded = true;
      }, 200);
    },
  },
};
</script>
