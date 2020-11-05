import { API } from "@/config/endpoints/stuurkrachtApi";
import { HTTP } from "@/api/stuurkrachtHttpProvider";

export default {
  async getAvailableCards() {
    const response = await HTTP.get(`${API.cards.root}`);
    return response;
  },
};
