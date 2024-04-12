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
      return await instance.post('auth/registration', formData);
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
  async getMyProfile() {
    try {
      const response = await instance.get("api/profile/me");
      return response.data;
    } catch (error) {
      console.error("Ошибка при запросе за профилем: ", error);
      throw error;
    }
  },
};
