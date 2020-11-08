import { API } from "@/config/endpoints/stuurkrachtApi";
import { HTTP } from "@/api/stuurkrachtHttpProvider";

export default {
  async login({ username, password }) {
    const response = await HTTP.post(`${API.auth.login}`, {
      username,
      password,
    });
    return response;
  },
};
