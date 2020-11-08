/* eslint-disable no-unused-vars */
import { API } from "@/config/endpoints/stuurkrachtApi";
// import { HTTP } from "@/api/stuurkrachtHttpProvider";
// import { axios as HTTP } from "@/plugins/axios";
// import axios from "@/plugins/axios.js";
// import * as HTTP from "@/plugins/axios.js";
import * as HTTP from "axios";

export default {
  async getAvailableCards() {
    // const bar = axios;
    // const foo = HTTP;
    // debugger;
    const response = await HTTP.get(`${API.cards.root}`);
    return response;
  },
  async getCardById(id) {
    const response = await HTTP.get(`${API.cards.root}/${id}`);
    return response;
  },
};
