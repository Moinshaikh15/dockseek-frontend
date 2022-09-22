import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  (requestConfig) => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      requestConfig.headers["Authorization"] = "Bearer " + accessToken;
    }
    return requestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    let originalConfig = err.config;
    let statusCode = err.response.status;
    if (statusCode === 400 && originalConfig.url === "auth/token") {
      return Promise.reject(err);
    }
    if (statusCode === 400) {
      originalConfig.attemptMade = true;
      let tokenResponse = await axiosClient.post("/auth/token", {
        token: localStorage.getItem("refreshToken"),
      });
      localStorage.setItem("accessToken", tokenResponse.data.accessToken);
      return axiosClient(originalConfig);
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
