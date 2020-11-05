import messagesApi from "@/api/messages";

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
  lastSentMessage: {
    uuid: "test",
  },
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
    { cardId, senderName, senderEmail, recipientName, recipientEmail, body }
  ) {
    commit(types.CLEAR_ERROR);
    commit(types.START_SENDING_MESSAGE);
    let sentMessage;
    try {
      const response = await messagesApi.sendMessage({
        cardId,
        senderName,
        senderEmail,
        recipientName,
        recipientEmail,
        body,
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
};
