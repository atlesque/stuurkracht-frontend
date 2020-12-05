<template>
  <main class="max-w-6xl p-10 mx-auto">
    <span
      v-show="isLoadingMessageDetails === true"
      class="text-xl text-theme-gray"
      >Kaart wordt geladen...</span
    >
    <div
      v-if="message != null && isLoadingMessageDetails === false"
      class="flex flex-col md:flex-row"
    >
      <figure class="flex-1 pb-4 md:pb-0">
        <img :src="message.card.picture" :alt="message.card.name" />
        <figcaption
          v-if="message.card.copyright != null"
          class="h-0 mb-2 text-sm"
        >
          &copy;&nbsp;<i>{{ message.card.copyright }}</i>
        </figcaption>
      </figure>
      <div class="flex flex-col flex-1 md:pl-10">
        <h1 class="mt-0">
          <span> {{ message.senderName }} heeft je kracht gestuurd</span>
        </h1>
        <pre
          v-if="message.body.length > 0"
          class="flex-1 p-10 mb-10 shadow-md bg-theme-letter font-handwritten"
          >{{ message.body }}</pre
        >
        <div>
          <span
            >Met Stuurkracht stuur je digitale kaarten naar mensen die je kracht
            wilt toewensen.&nbsp;
          </span>
          <NuxtLink to="/kaarten" class="link-primary"
            >Stuur zelf een kaart</NuxtLink
          >
        </div>
      </div>
    </div>
    <span
      v-show="isLoadingMessageDetails === false && error != null"
      class="block p-4 mt-4 text-xl text-white bg-red-800"
      >{{ error }}</span
    >
  </main>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  async fetch() {
    this.isLoadingMessageDetails = true;
    this.message = await this.getMessageById(this.messageId);
    this.isLoadingMessageDetails = false;
  },
  data() {
    return {
      message: null,
      isLoadingMessageDetails: false,
    };
  },
  computed: {
    ...mapState("messages", ["error"]),
    messageId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions("messages", ["getMessageById"]),
  },
};
</script>
