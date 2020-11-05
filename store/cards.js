import cardsApi from "@/api/cards";

const types = {
  START_LOADING_CARDS: "⏱ [Start] loading cards",
  STOP_LOADING_CARDS: "⏱ [Stop] loading cards",
  SET_AVAILABLE_CARDS: "✅ Set available cards",
  SET_ERROR: "⚠ Set error",
  CLEAR_ERROR: "✨ Cleared error",
};
export const state = () => ({
  isLoadingCards: false,
  availableCards: [],
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
      const response = await cardsApi.getAvailableCards();
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
    let cardDetails;
    try {
      const response = await cardsApi.getCardById(id);
      cardDetails = response.data;
    } catch (err) {
      console.error(err);
    }
    return cardDetails;
  },
};
