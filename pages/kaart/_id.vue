<template>
  <main class="max-w-6xl p-10 mx-auto">
    <span v-show="isLoadingCardDetails === true" class="text-xl text-theme-gray"
      >Kaart wordt geladen...</span
    >
    <div v-if="hasCardLoadError === false" class="flex flex-col md:flex-row">
      <div class="flex flex-col flex-1">
        <figure v-if="card != null && card.picture != null" class="pb-4">
          <img :src="card.picture" :alt="card.name" />
          <figcaption
            v-if="card.copyright != null && card.copyright.length > 0"
            class="h-0 mb-2 text-sm"
          >
            &copy;&nbsp;<i>{{ card.copyright }}</i>
          </figcaption>
        </figure>
        <client-only v-if="$auth.loggedIn === true">
          <NuxtLink
            :to="`/kaart/${cardId}/bewerken`"
            class="button-primary-outline"
            >Bewerk deze kaart</NuxtLink
          >
        </client-only>
      </div>
      <template
        v-if="isSendingMessage === false && isSuccessMessageVisible === false"
      >
        <form
          v-show="isPreviewVisible === false"
          class="flex-1 md:pl-10"
          @submit.prevent="handleSubmitForm"
        >
          <div class="flex flex-col-reverse justify-between lg:flex-row">
            <h1 class="mt-0 uppercase">Vul je gegevens in</h1>
            <NuxtLink to="/kaarten" class="self-start link-primary"
              >Terug naar overzicht</NuxtLink
            >
          </div>
          <div class="grid grid-cols-1 gap-4 mb-10 lg:grid-cols-2 lg:gap-10">
            <div
              class="flex flex-col"
              :class="{ 'form-group--error': $v.message.senderName.$error }"
            >
              <label for="senderName" class="label"
                >Jouw naam <span class="text-red-500">*</span></label
              >
              <input
                id="senderName"
                v-model.trim="$v.message.senderName.$model"
                type="text"
                class="input"
                name="senderName"
                maxlength="100"
              />
              <span v-if="!$v.message.senderName.required" class="form-error"
                >Dit veld is vereist</span
              >
              <span v-if="!$v.message.senderName.maxLength" class="form-error"
                >Max.
                {{ $v.message.senderName.$params.maxLength.max }} karakters
              </span>
            </div>
            <div
              class="flex flex-col"
              :class="{ 'form-group--error': $v.message.senderEmail.$error }"
            >
              <label for="senderEmail" class="label"
                >Jouw e-mailadres <span class="text-red-500">*</span></label
              >
              <input
                id="senderEmail"
                v-model.trim="$v.message.senderEmail.$model"
                type="text"
                class="input"
                name="senderEmail"
                maxlength="320"
              />
              <span v-if="!$v.message.senderEmail.required" class="form-error"
                >Dit veld is vereist</span
              >
              <span v-if="!$v.message.senderEmail.maxLength" class="form-error"
                >Max.
                {{ $v.message.senderEmail.$params.maxLength.max }} karakters
              </span>
              <span v-if="!$v.message.senderEmail.email" class="form-error"
                >Voer een geldig emailadres in
              </span>
            </div>
            <div
              class="flex flex-col"
              :class="{ 'form-group--error': $v.message.recipientName.$error }"
            >
              <label for="recipientName" class="label"
                >Naam bestemmeling <span class="text-red-500">*</span></label
              >
              <input
                id="recipientName"
                v-model.trim="$v.message.recipientName.$model"
                type="text"
                class="input"
                name="recipientName"
                maxlength="100"
              />
              <span v-if="!$v.message.recipientName.required" class="form-error"
                >Dit veld is vereist</span
              >
              <span
                v-if="!$v.message.recipientName.maxLength"
                class="form-error"
                >Max.
                {{ $v.message.recipientName.$params.maxLength.max }} karakters
              </span>
            </div>
            <div
              class="flex flex-col"
              :class="{ 'form-group--error': $v.message.recipientEmail.$error }"
            >
              <label for="recipientEmail" class="label"
                >E-mailadres bestemmeling
                <span class="text-red-500">*</span></label
              >
              <input
                id="recipientEmail"
                v-model.trim="$v.message.recipientEmail.$model"
                type="text"
                class="input"
                name="recipientEmail"
                maxlength="320"
              />
              <span
                v-if="!$v.message.recipientEmail.required"
                class="form-error"
                >Dit veld is vereist</span
              >
              <span
                v-if="!$v.message.recipientEmail.maxLength"
                class="form-error"
                >Max.
                {{ $v.message.recipientEmail.$params.maxLength.max }} karakters
              </span>
              <span v-if="!$v.message.recipientEmail.email" class="form-error"
                >Voer een geldig emailadres in
              </span>
            </div>
            <div
              class="flex flex-col lg:col-span-2"
              :class="{ 'form-group--error': $v.message.body.$error }"
            >
              <label for="body" class="label">Boodschap</label>
              <AutoSizingTextarea>
                <textarea
                  id="body"
                  v-model.trim="$v.message.body.$model"
                  type="text"
                  class="font-handwritten input"
                  name="body"
                  maxlength="2000"
                  rows="5"
                />
              </AutoSizingTextarea>
              <span
                v-if="message.body.length > 1900"
                class="font-bold"
                :class="[{ 'text-red-500': message.body.length >= 2000 }]"
                >{{ message.body.length }}/2000</span
              >
              <span v-if="!$v.message.body.maxLength" class="form-error"
                >Max. {{ $v.message.body.$params.maxLength.max }} karakters
              </span>
            </div>
          </div>
          <div class="flex flex-col justify-between lg:flex-row">
            <button
              v-show="isRecaptchaVisible === false"
              class="mb-4 button-primary lg:mb-0"
              type="button"
              @click="handleSubmitClick"
            >
              Stuur deze kaart
            </button>
            <RecaptchaButton
              v-show="isRecaptchaVisible === true"
              :only-show-captcha="true"
              class="mx-auto mb-4 lg:mb-0"
              @response="handleSubmitForm"
              >Stuur deze kaart</RecaptchaButton
            >
            <button
              class="button-primary-outline"
              @click.prevent="handleShowPreview"
            >
              Bekijk een voorbeeld
            </button>
          </div>
        </form>
        <div
          v-show="isPreviewVisible === true"
          class="flex flex-col justify-between flex-1 md:pl-10"
        >
          <span class="mt-0 font-bold uppercase text text-theme-blue-light">
            Zo zal jouw boodschap eruit zien:
          </span>
          <h1 class="mt-0">
            <span>{{ message.senderName }} heeft je kracht gestuurd</span>
          </h1>
          <pre
            v-if="message.body.length > 0"
            class="p-10 mb-10 shadow-md bg-theme-letter font-handwritten"
            >{{ message.body }}</pre
          >
          <div class="flex justify-between">
            <button
              v-show="isRecaptchaVisible === false"
              class="button-primary"
              type="button"
              @click="handleSubmitClick"
            >
              Stuur deze kaart
            </button>
            <RecaptchaButton
              v-show="isRecaptchaVisible === true"
              :only-show-captcha="true"
              class="mx-auto mb-4 lg:mb-0"
              @response="handleSubmitForm"
              >Stuur deze kaart</RecaptchaButton
            >
            <button
              class="button-primary-outline"
              @click.prevent="isPreviewVisible = false"
            >
              Terug naar bewerken
            </button>
          </div>
        </div>
      </template>
      <template
        v-if="isSendingMessage === true && isSuccessMessageVisible === false"
      >
        <div class="flex items-center justify-center flex-1 md:pl-10">
          <span class="p-10 text-xl text-theme-gray"
            >Een ogenblik alsjeblieft, je kaart wordt verstuurd...</span
          >
        </div>
      </template>
      <template
        v-if="isSendingMessage === false && isSuccessMessageVisible === true"
      >
        <div class="flex items-center justify-center flex-1 md:pl-10">
          <span class="p-10 text-xl text-green-500">Bericht verstuurd!</span>
        </div>
      </template>
    </div>
    <span
      v-show="isSendingMessage === false && error != null"
      class="block p-4 mt-8 text-xl text-white bg-red-800"
      >{{ error }}</span
    >
    <span
      v-if="hasCardLoadError === true"
      class="block p-4 mt-8 text-xl text-white bg-red-800"
      >Fout tijdens laden van de kaart. Controleer de link of probeer een andere
      kaart.</span
    >
  </main>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, maxLength, email } from "vuelidate/lib/validators";
import AutoSizingTextarea from "@/components/AutoSizingTextarea.vue";
import RecaptchaButton from "@/components/RecaptchaButton.vue";

export default {
  components: {
    AutoSizingTextarea,
    RecaptchaButton,
  },
  async fetch() {
    this.isLoadingCardDetails = true;
    const cardInfo = await this.getCardById(this.cardId);
    if (cardInfo != null && typeof cardInfo === "object") {
      this.card = cardInfo;
    } else {
      this.hasCardLoadError = true;
    }
    this.isLoadingCardDetails = false;
  },
  data() {
    return {
      card: null,
      isLoadingCardDetails: false,
      isPreviewVisible: false,
      isSuccessMessageVisible: false,
      isRecaptchaVisible: false,
      hasCardLoadError: false,
      message: {
        senderName: "",
        senderEmail: "",
        recipientName: "",
        recipientEmail: "",
        body: "",
      },
    };
  },
  computed: {
    ...mapState("messages", ["isSendingMessage", "error"]),
    cardId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions("cards", ["getCardById"]),
    ...mapActions("messages", ["sendMessage"]),
    handleSubmitClick() {
      this.$v.$touch();
      if (this.$v.$invalid === false) {
        this.isRecaptchaVisible = true;
      }
    },
    async handleSubmitForm(recaptchaResponse) {
      this.$v.$touch();
      if (this.$v.$invalid === false) {
        await this.sendMessage({
          ...this.message,
          cardId: this.cardId,
          recaptchaResponse,
        });
        if (this.isSendingMessage === false && this.error == null) {
          this.$gtag("event", `send_card_${this.cardId}`, {
            event_category: "messages",
          });
          this.$router.push("/kaart-verstuurd");
        }
      }
    },
    handleShowPreview() {
      this.$v.$touch();
      if (this.$v.$invalid === false) {
        this.isPreviewVisible = true;
      }
    },
  },
  validations: {
    message: {
      senderName: {
        required,
        maxLength: maxLength(100),
      },
      senderEmail: {
        required,
        email,
        maxLength: maxLength(320),
      },
      recipientName: {
        required,
        maxLength: maxLength(100),
      },
      recipientEmail: {
        required,
        email,
        maxLength: maxLength(320),
      },
      body: {
        maxLength: maxLength(2000),
      },
    },
  },
  head() {
    const title = this.card != null ? this.card.name : "Kaart sturen";
    const description =
      "Stuur deze gratis kaart met steunende boodschap via Stuurkracht.be";
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
