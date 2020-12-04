<template>
  <main class="p-10">
    <div v-if="isCardSavedSuccess === false" class="flex flex-col md:flex-row">
      <div
        class="flex flex-col flex-1 mb-4 md:mb-0"
        :class="{ 'form-group--error': $v.cardName.$error }"
      >
        <div class="flex flex-1 font-bold">
          <img :src="picture" />
        </div>
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
    <div v-else class="max-w-xl mx-auto text-center">
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
  },
  data() {
    return {
      picture: null,
      cardName: "",
      authorName: "",
      isCardSavedSuccess: false,
    };
  },
  computed: {
    ...mapState("cards", ["isAddingNewCard"]),
    cardId() {
      return this.$route.params.cardId;
    },
  },
  methods: {
    ...mapActions("cards", ["getCardById", "saveCard"]),
    async handleAddCard() {
      this.$v.$touch();
      if (this.$v.$invalid === false) {
        const response = await this.saveCard({
          id: this.cardId,
          // picture: this.picture,
          cardName: this.cardName,
          authorName: this.authorName,
        });
        if (response != null) {
          this.isCardSavedSuccess = true;
        }
      }
    },
    /* handleFileChanged(result) {
      this.picture = result;
    }, */
    /* resetForm() {
      this.picture = null;
      this.cardName = "";
      this.authorName = "";
      this.$v.$reset();
      this.isCardSavedSuccess = false;
    }, */
  },
  validations: {
    cardName: {
      required,
      maxLength: maxLength(100),
    },
    authorName: {
      maxLength: maxLength(100),
    },
    /* picture: {
      required,
    }, */
  },
};
</script>
