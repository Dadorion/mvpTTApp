import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/",
});
const TOKEN = "token";

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);

    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export const authAPI = {
  async registration(formData) {
    try {
      return await instance.post("auth/registration", formData);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async me() {
    try {
      return instance.get("auth/me");
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  login(formData) {
    return instance.post("auth/login", formData);
  },
  logout() {
    return instance.delete("auth/login");
  },
};

export const profileAPI = {
  async changePassword(newPassword) {
    try {
      const response = await instance.post("api/profile", newPassword);
      return response;
    } catch (error) {
      console.error("Ошибка смены пароля: ", error);
      throw error;
    }
  },
};
export const playersAPI = {
  async getPlayers() {
    try {
      const response = await instance.get("api/players");
      return response;
    } catch (error) {
      console.error("Ошибка запроса игроков: ", error);
      throw error;
    }
  },
  async createNewPlayer(name, surname) {
    try {
      const response = await instance.post("api/players", { name, surname });
      return response;
    } catch (error) {
      console.error("Ошибка добавления игрока: ", error);
      throw error;
    }
  },
};
