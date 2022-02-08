<template>
  <main class="flex flex-col max-w-5xl mx-auto md:flex-row">
    <div class="flex-1 p-10">
      <img
        src="~assets/images/sent-message.svg"
        alt="Kaart bevestigd aan een parachute"
      />
    </div>
    <div class="flex-1 p-10">
      <h1 class="mt-0 mb-10 uppercase">
        <template v-if="isLastCardSentViaEmail === true"
          >Je kaart is onderweg!</template
        >
        <template v-else>Deel je kaart via een link</template>
      </h1>
      <template v-if="isLastCardSentViaEmail === true">
        <p>Je bestemmeling ontvangt binnenkort je kaart via mail.</p>
        <p>
          Indien het binnen een uur nog niet toegekomen is, verzoek je
          bestemmeling dan even hun spamfolder te bekijken.
        </p>
      </template>
      <template v-else>
        <p>Kopieer onderstaande link en stuur deze naar je bestemmeling.</p>
        <p>Zij kunnen zo jouw kaart bekijken.</p>
      </template>
      <template v-if="lastSentMessage != null">
        <p v-if="isLastCardSentViaEmail === true">
          Je kan de kaart ook delen of zelf bekijken via deze link:
        </p>
        <div class="flex flex-col mb-10 sm:flex-row">
          <input
            type="text"
            class="flex-1 mb-4 text-sm sm:mr-4 input sm:mb-0"
            readonly
            :value="messageUrl"
          />
          <button class="button-primary-outline" @click="handleCopyLink">
            Kopieer de link
          </button>
        </div>
        <NuxtLink
          :to="`/boodschap/${lastSentMessage.id}`"
          class="w-full button-primary md:w-auto"
          >Bekijk je kaart</NuxtLink
        >
      </template>
    </div>
  </main>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("messages", ["lastSentMessage"]),
    messageUrl() {
      return `${
        process.client ? window.location.origin : "https://stuurkracht.be"
      }/boodschap/${this.lastSentMessage.id}`;
    },
    isLastCardSentViaEmail() {
      return (this.lastSentMessage.recipientEmail || "").length > 0;
    },
  },
  methods: {
    handleCopyLink() {
      navigator.clipboard.writeText(this.messageUrl);
    },
  },
  head() {
    const title = "Kaart verstuurd";
    const description = "Je kaart werd verstuurd!";
    return {
      title,
      description,
      meta: [
        {
          property: "og:title",
          content: title,
          hid: "og:title",
        },
        {
          property: "og:description",
          content: description,
          hid: "og:description",
        },
      ],
    };
  },
};
</script>
