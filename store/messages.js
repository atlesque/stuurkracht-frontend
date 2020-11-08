import { API } from "@/config/endpoints/stuurkrachtApi";

const types = {
  START_SENDING_MESSAGE: "⏱ [Start] loading messages",
  STOP_SENDING_MESSAGE: "⏱ [Stop] loading messages",
  SET_LAST_SENT_MESSAGE: "✅ Set last sent message",
  SET_ERROR: "⚠ Set error",
  CLEAR_ERROR: "✨ Cleared error",
};
export const state = () => ({
  isSendingMessage: false,
  error: null,
  lastSentMessage: null,
});

export const mutations = {
  [types.START_SENDING_MESSAGE](state) {
    state.isSendingMessage = true;
  },
  [types.STOP_SENDING_MESSAGE](state) {
    state.isSendingMessage = false;
  },
  [types.SET_LAST_SENT_MESSAGE](state, message) {
    state.lastSentMessage = message;
  },
  [types.SET_ERROR](state, error) {
    state.error = error;
  },
  [types.CLEAR_ERROR](state) {
    state.error = null;
  },
};

export const actions = {
  async sendMessage(
    { commit },
    {
      cardId,
      senderName,
      senderEmail,
      recipientName,
      recipientEmail,
      body,
      recaptchaResponse,
    }
  ) {
    commit(types.CLEAR_ERROR);
    commit(types.START_SENDING_MESSAGE);
    let sentMessage;
    try {
      const response = await this.$axios.post(`${API.messages.root}`, {
        cardId,
        senderName,
        senderEmail,
        recipientName,
        recipientEmail,
        body,
        recaptchaResponse,
      });
      sentMessage = response.data;
      commit(types.SET_LAST_SENT_MESSAGE, sentMessage);
    } catch (err) {
      console.error(err);
      commit(
        types.SET_ERROR,
        "Fout bij versturen van de kaart. Probeer het later opnieuw."
      );
    } finally {
      commit(types.STOP_SENDING_MESSAGE);
    }
    return sentMessage;
  },
  async getMessageById({ commit }, id) {
    commit(types.CLEAR_ERROR);
    let messageDetails;
    try {
      const response = await this.$axios.get(`${API.messages.root}/${id}`);
      messageDetails = response.data;
    } catch (err) {
      console.error(err);
      commit(
        types.SET_ERROR,
        "Fout bij laden van de kaart. Probeer het later opnieuw."
      );
    }
    return messageDetails;
  },
};
