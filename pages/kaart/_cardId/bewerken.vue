<template>
  <main class="p-10">
    <div v-if="isEditFormVisible === true" class="flex flex-col md:flex-row">
      <div class="flex flex-col flex-1 mb-4 md:mb-0">
        <div class="flex flex-1 font-bold">
          <img :src="picture" />
        </div>
        <button
          v-if="isArchived === false && isArchiveConfirmationVisible === false"
          class="mt-4"
          @click="isArchiveConfirmationVisible = true"
        >
          Archiveer deze kaart
        </button>
        <div v-if="isArchiveConfirmationVisible === true" class="p-4">
          <p>
            Ben je zeker dat je deze kaart wilt archiveren? De kaart zal niet
            meer voorkomen in de lijst met alle kaarten. Alle verzonden
            boodschappen met deze kaart blijven behouden.
          </p>
          <div class="flex justify-between">
            <button class="font-bold text-red-600" @click="handleArchiveCard">
              Ja, archiveer deze kaart
            </button>
            <button @click="isArchiveConfirmationVisible = false">
              Annuleren
            </button>
          </div>
        </div>
        <template v-if="isArchived === true">
          <div class="block p-4 text-center text-white bg-red-600">
            Deze kaart is gearchiveerd
          </div>
          <button class="mt-4" @click="handleUnarchiveCard">
            Maak deze kaart weer actief
          </button>
        </template>
      </div>
      <form class="flex-1 md:pl-10" @submit.prevent="handleAddCard">
        <div class="flex flex-col-reverse justify-between lg:flex-row">
          <h1 class="mt-0 uppercase">Bewerk deze kaart</h1>
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
          <button type="submit" class="button-primary">
            Wijzigingen opslaan
          </button>
          <NuxtLink :to="`/kaart/${cardId}`" class="button-primary-outline">
            Annuleren
          </NuxtLink>
        </div>
      </form>
    </div>
    <div
      v-if="isCardSavedSuccess === true"
      class="max-w-xl mx-auto text-center"
    >
      <h1 class="mb-8 upperclass">Je wijzigingen zijn opgeslagen!</h1>
      <div class="flex flex-col">
        <NuxtLink
          :to="`/kaart/${cardId}`"
          class="self-center mb-8 button-primary"
        >
          Bekijk de gewijzigde kaart
        </NuxtLink>
        <NuxtLink to="/kaarten" class="self-center">
          Terug naar alle kaarten
        </NuxtLink>
      </div>
    </div>
    <div
      v-if="isCardArchivedSuccess === true"
      class="max-w-xl mx-auto text-center"
    >
      <h1 class="mb-8 upperclass">De kaart is gearchiveerd!</h1>
      <p class="mb-8">
        Mocht je ooit deze kaart opnieuw actief willen maken, contacteer dan de
        beheerder.
      </p>
      <div class="flex flex-col">
        <NuxtLink to="/kaarten" class="self-center mb-8 button-primary">
          Terug naar alle kaarten
        </NuxtLink>
      </div>
    </div>
    <div
      v-if="isCardUnarchivedSuccess === true"
      class="max-w-xl mx-auto text-center"
    >
      <h1 class="mb-8 upperclass">De kaart is terug actief!</h1>
      <p class="mb-8">
        De kaart zal opnieuw getoond worden in de lijst met kaarten. Je kan het
        op ieder moment weer archiveren.
      </p>
      <div class="flex flex-col">
        <NuxtLink
          :to="`/kaart/${cardId}`"
          class="self-center mb-8 button-primary"
        >
          Bekijk de actieve kaart
        </NuxtLink>
        <NuxtLink to="/kaarten" class="self-center">
          Terug naar alle kaarten
        </NuxtLink>
      </div>
    </div>
    <div
      v-if="isSavingCard === true"
      class="flex items-center justify-center flex-1 md:pl-10"
    >
      <span class="p-10 text-xl text-theme-gray"
        >Een ogenblik alsjeblieft...</span
      >
    </div>
    <span
      v-show="error != null && error.length > 0"
      class="block p-4 mt-4 text-xl text-white bg-red-800"
      >{{ error }}</span
    >
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
  async fetch() {
    const response = await this.getCardById(this.cardId);
    this.picture = response.picture;
    this.cardName = response.name;
    this.authorName = response.copyright;
    this.isArchived = response.isArchived;
  },
  data() {
    return {
      picture: null,
      cardName: "",
      authorName: "",
      isArchived: false,
      isCardSavedSuccess: false,
      isArchiveConfirmationVisible: false,
      isCardArchivedSuccess: false,
      isCardUnarchivedSuccess: false,
    };
  },
  computed: {
    ...mapState("cards", ["isAddingNewCard", "isSavingCard", "error"]),
    cardId() {
      return this.$route.params.cardId;
    },
    isEditFormVisible() {
      return (
        this.isCardSavedSuccess === false &&
        this.isCardArchivedSuccess === false &&
        this.isCardUnarchivedSuccess === false
      );
    },
  },
  methods: {
    ...mapActions("cards", [
      "getCardById",
      "saveCard",
      "archiveCard",
      "unarchiveCard",
    ]),
    async handleAddCard() {
      this.$v.$touch();
      if (this.$v.$invalid === false) {
        const response = await this.saveCard({
          id: this.cardId,
          cardName: this.cardName,
          authorName: this.authorName,
        });
        if (response != null) {
          this.isCardSavedSuccess = true;
        }
      }
    },
    async handleArchiveCard() {
      const response = await this.archiveCard(this.cardId);
      if (response != null) {
        this.isCardArchivedSuccess = true;
      }
    },
    async handleUnarchiveCard() {
      const response = await this.unarchiveCard(this.cardId);
      if (response != null) {
        this.isCardUnarchivedSuccess = true;
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
  },
};
</script>
