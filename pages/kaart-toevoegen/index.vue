<template>
  <main class="p-10">
    <div class="flex flex-col md:flex-row">
      <div
        class="flex flex-col flex-1"
        :class="{ 'form-group--error': $v.cardName.$error }"
      >
        <div class="font-bold border-2 border-theme-blue text-theme-blue">
          <div class="relative upload-form">
            <button
              class="absolute inset-0 flex flex-col items-center justify-center w-full upload-form--content"
              @click="handleUploadImageClick"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="53"
                height="53"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                class="mb-4"
              >
                <path
                  d="M51 34.667v10.9c0 1.444-.574 2.83-1.595 3.85S47 51 45.556 51H7.444c-1.444 0-2.83-.574-3.85-1.595S2 47 2 45.556v-10.9M40.1 15.6L26.5 2 12.9 15.6"
                />
                <path d="M26.5 2v32.667" />
              </svg>
              <span>Klik hier om een afbeelding toe te voegen</span>
            </button>
          </div>
        </div>
        <span v-if="!$v.picture.required || true" class="form-error"
          >Dit veld is vereist</span
        >
      </div>

      <!-- <figure
        v-if="card != null && card.picture != null"
        class="flex-1 pb-4 md:pb-0"
      >
        <img :src="card.picture" :alt="card.name" />
        <figcaption v-if="card.copyright != null">
          {{ card.copyright }}
        </figcaption>
      </figure> -->

      <form class="flex-1 md:pl-10" @submit.prevent="handleAddCard">
        <div class="flex flex-col-reverse justify-between lg:flex-row">
          <h1 class="mt-0 uppercase">Voeg een nieuwe kaart toe</h1>
        </div>
        <div class="grid grid-cols-1 gap-4 mb-10 lg:gap-10">
          <div
            class="flex flex-col"
            :class="{ 'form-group--error': $v.cardName.$error }"
          >
            <label for="cardName" class="label"
              >Titel van de kaart <span class="text-red-500">*</span></label
            >
            <input
              id="cardName"
              v-model.trim="$v.cardName.$model"
              type="text"
              class="input"
              name="cardName"
              maxlength="100"
            />
            <span v-if="!$v.cardName.required" class="form-error"
              >Dit veld is vereist</span
            >
            <span v-if="!$v.cardName.maxLength" class="form-error"
              >Max. {{ $v.cardName.$params.maxLength.max }} karakters
            </span>
          </div>
          <div
            class="flex flex-col"
            :class="{ 'form-group--error': $v.authorName.$error }"
          >
            <label for="authorName" class="label">Naam van de artiest</label>
            <input
              id="authorName"
              v-model.trim="$v.authorName.$model"
              type="text"
              class="input"
              name="authorName"
              maxlength="100"
            />
            <span v-if="!$v.authorName.maxLength" class="form-error"
              >Max. {{ $v.authorName.$params.maxLength.max }} karakters
            </span>
          </div>
        </div>
        <div class="flex justify-between">
          <button type="submit" class="button-primary">Kaart toevoegen</button>
          <NuxtLink to="/kaarten" class="button-primary-outline">
            Annuleren
          </NuxtLink>
        </div>
      </form>
    </div>
  </main>
</template>

<style lang="less" scoped>
.upload-form {
  padding-top: 100%;
}
</style>

<script>
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  middleware: "auth",
  data() {
    return {
      picture: null,
      cardName: "",
      authorName: "",
    };
  },
  methods: {
    handleUploadImageClick() {
      // TODO
    },
    handleAddCard() {
      this.$v.$touch();
      if (this.$v.$invalid === false) {
        // TODO
      }
    },
  },
  validations: {
    cardName: {
      required,
      maxLength: maxLength(100),
    },
    authorName: {
      maxLength: maxLength(100),
    },
    picture: {
      required,
    },
  },
};
</script>
