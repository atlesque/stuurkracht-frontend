import { API } from "@/config/endpoints/stuurkrachtApi";

const types = {
  START_LOADING_CARDS: "⏱ [Start] loading cards",
  STOP_LOADING_CARDS: "⏱ [Stop] loading cards",
  SET_AVAILABLE_CARDS: "✅ Set available cards",
  START_ADDING_CARD: "⏱ [Start] adding card",
  STOP_ADDING_CARD: "⏱ [Stop] adding card",
  START_SAVING_CARD: "⏱ [Start] saving card",
  STOP_SAVING_CARD: "⏱ [Stop] saving card",
  /*
    Error handling
  */
  SET_ERROR: "⚠ Set error",
  CLEAR_ERROR: "✨ Cleared error",
};
export const state = () => ({
  isLoadingCards: false,
  isSavingCard: false,
  availableCards: [],
  /*
    Error handling
  */
  error: null,
});

export const mutations = {
  [types.START_LOADING_CARDS](state) {
    state.isLoadingCards = true;
  },
  [types.STOP_LOADING_CARDS](state) {
    state.isLoadingCards = false;
  },
  [types.SET_AVAILABLE_CARDS](state, cards) {
    state.availableCards = cards;
  },
  [types.START_ADDING_CARD](state) {
    state.isAddingNewCard = true;
  },
  [types.STOP_ADDING_CARD](state) {
    state.isAddingNewCard = false;
  },
  [types.START_SAVING_CARD](state) {
    state.isSavingCard = true;
  },
  [types.STOP_SAVING_CARD](state) {
    state.isSavingCard = false;
  },
  /*
    Error handling
  */
  [types.SET_ERROR](state, error) {
    state.error = error;
  },
  [types.CLEAR_ERROR](state) {
    state.error = null;
  },
};

export const actions = {
  async getAvailableCards({ commit }) {
    commit(types.CLEAR_ERROR);
    commit(types.START_LOADING_CARDS);
    let availableCards;
    try {
      const response = await this.$axios.get(`${API.cards.root}`);
      availableCards = response.data;
      commit(types.SET_AVAILABLE_CARDS, availableCards);
    } catch (err) {
      console.error(err);
      commit(
        types.SET_ERROR,
        "Fout bij laden van de kaarten. Probeer het later opnieuw."
      );
    } finally {
      commit(types.STOP_LOADING_CARDS);
    }
    return availableCards;
  },
  async getCardById({ commit }, id) {
    commit(types.CLEAR_ERROR);
    let cardDetails;
    try {
      const response = await this.$axios.get(`${API.cards.root}/${id}`);
      cardDetails = response.data;
    } catch (err) {
      console.error(err);
      commit(
        types.SET_ERROR,
        "Fout bij laden van de kaart. Probeer het later opnieuw."
      );
    }
    return cardDetails;
  },
  async addNewCard({ commit }, { picture, cardName, authorName }) {
    commit(types.CLEAR_ERROR);
    commit(types.START_ADDING_CARD);
    let newCard;
    try {
      const formData = new FormData();
      formData.append("picture", picture, picture.name);
      formData.append("name", cardName);
      formData.append("copyright", authorName);
      const response = await this.$axios.post(API.cards.root, formData);
      newCard = response.data;
    } catch (err) {
      console.error(err);
      commit(
        types.SET_ERROR,
        "Fout bij opladen van de nieuwe kaart. Contacteer de beheerder."
      );
    } finally {
      commit(types.STOP_ADDING_CARD);
    }
    return newCard;
  },
  async saveCard({ commit }, { id, cardName, authorName }) {
    commit(types.CLEAR_ERROR);
    commit(types.START_SAVING_CARD);
    let savedCard;
    try {
      const response = await this.$axios.put(`${API.cards.root}/${id}`, {
        name: cardName,
        copyright: authorName,
      });
      savedCard = response.data;
    } catch (err) {
      console.error(err);
      commit(
        types.SET_ERROR,
        "Fout bij opslaan van de kaart. Contacteer de beheerder."
      );
    } finally {
      commit(types.STOP_SAVING_CARD);
    }
    return savedCard;
  },
};
