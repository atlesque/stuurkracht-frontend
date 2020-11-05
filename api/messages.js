import { API } from "@/config/endpoints/stuurkrachtApi";
import { HTTP } from "@/api/stuurkrachtHttpProvider";

export default {
  async sendMessage({
    cardId,
    senderName,
    senderEmail,
    recipientName,
    recipientEmail,
    body,
  }) {
    const response = await HTTP.post(`${API.messages.root}`, {
      cardId,
      senderName,
      senderEmail,
      recipientName,
      recipientEmail,
      body,
    });
    return response;
  },
};
