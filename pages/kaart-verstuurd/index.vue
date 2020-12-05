<template>
  <main class="flex flex-col max-w-5xl mx-auto md:flex-row">
    <div class="flex-1 p-10">
      <img
        src="~assets/images/sent-message.svg"
        alt="Kaart bevestigd aan een parachute"
      />
    </div>
    <div class="flex-1 p-10">
      <h1 class="mt-0 mb-10 uppercase">Je kaart is onderweg!</h1>
      <p>Je bestemmeling ontvangt binnenkort je kaart via mail.</p>
      <p>
        Indien het binnen een uur nog niet toegekomen is, verzoek je
        bestemmeling dan even hun spamfolder te bekijken.
      </p>
      <template v-if="lastSentMessage != null">
        <p>Je kan de kaart ook delen of zelf bekijken via deze link:</p>
        <div class="flex mb-10">
          <input
            type="text"
            class="flex-1 mr-4 text-sm input"
            readonly
            :value="messageUrl"
          />
          <button class="button-primary-outline" @click="handleCopyLink">
            Kopieer de link
          </button>
        </div>
        <NuxtLink
          :to="`/boodschap/${lastSentMessage.id}`"
          class="button-primary"
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
