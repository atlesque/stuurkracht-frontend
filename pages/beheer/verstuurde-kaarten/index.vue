<template>
  <main class="p-10">
    <h1>Verstuurde kaarten</h1>
    <ul class="grid grid-cols-1 gap-5 mt-3 sm:gap-6">
      <li
        v-for="(message, index) in sentMessages"
        :key="index"
        class="flex col-span-1 rounded-md shadow-sm"
      >
        <div
          class="flex items-center justify-center flex-shrink-0 w-32 overflow-hidden text-sm font-medium rounded-l-md bg-theme-blue"
        >
          <img :src="message.card.picture" class="object-cover w-full h-full" />
        </div>
        <div
          class="flex items-center justify-between flex-1 bg-white border-t border-b border-r border-gray-200 rounded-r-md"
        >
          <ul class="flex flex-col flex-1 px-4 py-2 break-all">
            <li class="flex flex-col">
              <span class="mr-2 font-bold text-theme-blue" title="Verzender"
                >📨 {{ message.senderName }}</span
              >
              <span class="text-sm text-theme-blue-light">{{
                message.senderEmail
              }}</span>
            </li>
            <li class="flex flex-col">
              <span class="mr-2 font-bold text-theme-blue" title="Ontvanger"
                >📬 {{ message.recipientName }}</span
              >
              <span class="text-sm text-theme-blue-light">{{
                message.recipientEmail
              }}</span>
            </li>
            <li class="flex flex-col">
              <span class="font-bold text-theme-blue"
                >🕓
                {{
                  $dateFns.format(message.dateCreated, "yyyy-MM-dd HH:mm:ss")
                }}</span
              >
            </li>
          </ul>
          <NuxtLink
            :to="`/boodschap/${message.id}`"
            class="p-4 hover:text-theme-blue"
            >👁</NuxtLink
          >
        </div>
      </li>
    </ul>
    <div
      v-if="sentMessages != null && sentMessages.length > 0"
      class="flex items-center justify-center"
    >
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :is-loading="isLoadingAllSentMessages === true"
        @change="handlePageChanged"
      />
    </div>
    <transition name="fade">
      <div
        v-if="
          isLoadingAllSentMessages === true && isInitialLoadComplete === false
        "
        class="flex items-center justify-center flex-1 md:pl-10"
      >
        <span class="p-10 text-xl text-theme-gray"
          >Een ogenblik alsjeblieft...</span
        >
      </div>
    </transition>
    <span
      v-if="error != null"
      class="block p-4 mt-4 text-xl text-white bg-red-800"
      >{{ error }}</span
    >
  </main>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  middleware: "auth",
  async fetch() {
    await this.loadMessages();
  },
  data() {
    return {
      sentMessages: [],
      totalSentMessages: 0,
      currentPage: 0,
      pageSize: 1,
      isInitialLoadComplete: false,
    };
  },
  computed: {
    ...mapState("messages", ["isLoadingAllSentMessages", "error"]),
    totalPages() {
      if (this.totalSentMessages > this.pageSize) {
        return this.totalSentMessages / this.pageSize;
      } else {
        return 1;
      }
    },
  },
  methods: {
    ...mapActions("messages", ["getAllSentMessages"]),
    async loadMessages() {
      const response = await this.getAllSentMessages({
        page: this.currentPage,
        pageSize: this.pageSize,
      });
      if (response != null) {
        this.sentMessages = response.messages;
        this.totalSentMessages = response.totalMessages;
        this.isInitialLoadComplete = true;
      }
    },
    handlePageChanged(newPage) {
      this.currentPage = newPage;
      this.loadMessages();
    },
  },
};
</script>
