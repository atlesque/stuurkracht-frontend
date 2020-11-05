import { API } from "@/config/endpoints/stuurkrachtApi";
import { HTTP } from "@/api/stuurkrachtHttpProvider";

export default {
  async getAvailableCards() {
    const response = await HTTP.get(`${API.cards.root}`);
    return response;
  },
  async getCardById(id) {
    const response = await HTTP.get(`${API.cards.root}/${id}`);
    return response;
  },
};
