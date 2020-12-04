<template>
  <main class="p-10">
    <div
      v-if="isCardUploadSuccess === false && isAddingNewCard === false"
      class="flex flex-col md:flex-row"
    >
      <div
        class="flex flex-col flex-1 mb-4 md:mb-0"
        :class="{ 'form-group--error': $v.cardName.$error }"
      >
        <div
          class="flex flex-1 font-bold border-2 border-theme-blue text-theme-blue min-h-20vh"
        >
          <FileUploader
            class="flex flex-1"
            upload-text="Klik hier om een afbeelding toe te voegen"
            :disable-other-drag-events="true"
            @change="handleFileChanged"
          />
        </div>
        <span v-if="!$v.picture.required || true" class="form-error"
          >Dit veld is vereist</span
        >
      </div>

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
    <div
      v-if="isCardUploadSuccess === true && isAddingNewCard === false"
      class="max-w-xl mx-auto text-center"
    >
      <h1 class="mb-8 upperclass">De kaart is toegevoegd!</h1>
      <div class="flex flex-col">
        <NuxtLink
          :to="`/kaart/${newCardId}`"
          class="self-center mb-4 button-primary"
        >
          Bekijk de nieuwe kaart
        </NuxtLink>
        <button
          class="self-center mb-8 button-primary-outline"
          @click="resetForm"
        >
          Nieuwe kaart toevoegen
        </button>
        <NuxtLink to="/kaarten" class="self-center">
          Terug naar alle kaarten
        </NuxtLink>
      </div>
    </div>
    <div
      v-if="isAddingNewCard === true"
      class="flex items-center justify-center flex-1 md:pl-10"
    >
      <span class="p-10 text-xl text-theme-gray"
        >Een ogenblik alsjeblieft...</span
      >
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
import { mapActions, mapState } from "vuex";

export default {
  middleware: "auth",
  data() {
    return {
      picture: null,
      cardName: "",
      authorName: "",
      newCardId: null,
      isCardUploadSuccess: false,
    };
  },
  computed: {
    ...mapState("cards", ["isAddingNewCard", "isAddingNewCard"]),
  },
  methods: {
    ...mapActions("cards", ["addNewCard"]),
    async handleAddCard() {
      this.$v.$touch();
      if (this.$v.$invalid === false) {
        const response = await this.addNewCard({
          picture: this.picture,
          cardName: this.cardName,
          authorName: this.authorName,
        });
        if (response != null) {
          this.isCardUploadSuccess = true;
          this.newCardId = response.id;
        }
      }
    },
    handleFileChanged(result) {
      this.picture = result;
    },
    resetForm() {
      this.picture = null;
      this.cardName = "";
      this.authorName = "";
      this.$v.$reset();
      this.isCardUploadSuccess = false;
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
