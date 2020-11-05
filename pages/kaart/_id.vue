<template>
  <main class="p-10">
    <span v-show="isLoadingCardDetails === true" class="text-xl text-theme-gray"
      >Kaart wordt geladen...</span
    >
    <div class="flex flex-col md:flex-row">
      <figure
        v-if="card != null && card.picture != null"
        class="flex-1 pb-4 md:pb-0"
      >
        <img :src="card.picture" :alt="card.name" />
        <figcaption v-if="card.copyright != null">
          {{ card.copyright }}
        </figcaption>
      </figure>
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
              >Max. {{ $v.message.senderName.$params.maxLength.max }} karakters
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
              >Max. {{ $v.message.senderEmail.$params.maxLength.max }} karakters
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
            <span v-if="!$v.message.recipientName.maxLength" class="form-error"
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
            <span v-if="!$v.message.recipientEmail.required" class="form-error"
              >Dit veld is vereist</span
            >
            <span v-if="!$v.message.recipientEmail.maxLength" class="form-error"
              >Max.
              {{ $v.message.recipientEmail.$params.maxLength.max }} karakters
            </span>
            <span v-if="!$v.message.recipientEmail.email" class="form-error"
              >Voer een geldig emailadres in
            </span>
          </div>
          <div
            class="flex flex-col col-span-2"
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
        <div class="flex justify-between">
          <button type="submit" class="button-primary">Stuur deze kaart</button>
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
          <span> {{ message.senderName }} heeft je kracht gestuurd</span>
        </h1>
        <pre
          v-if="message.body.length > 0"
          class="p-10 mb-10 shadow-md bg-theme-letter font-handwritten"
          >{{ message.body }}</pre
        >
        <div class="flex justify-between">
          <button class="button-primary" @click="handleSubmitForm">
            Stuur deze kaart
          </button>
          <button
            class="button-primary-outline"
            @click.prevent="isPreviewVisible = false"
          >
            Terug naar bewerken
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import { required, maxLength, email } from "vuelidate/lib/validators";
import AutoSizingTextarea from "@/components/AutoSizingTextarea.vue";

export default {
  components: {
    AutoSizingTextarea,
  },
  async fetch() {
    this.isLoadingCardDetails = true;
    this.card = await this.getCardById(this.cardId);
    this.isLoadingCardDetails = false;
  },
  data() {
    return {
      card: null,
      isLoadingCardDetails: false,
      isPreviewVisible: false,
      message: {
        senderName: "Alex",
        senderEmail: "alexander@atlesque.com",
        recipientName: "Inge",
        recipientEmail: "inge.van.meenen@hotmail.com",
        body: "",
      },
    };
  },
  computed: {
    cardId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions("cards", ["getCardById"]),
    handleSubmitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("ERROR: form is not valid!");
      } else {
        console.log("form valid!");
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
};
</script>
