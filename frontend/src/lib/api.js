import axios from "axios";

const BACKEND_API_ENDPOINT = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: BACKEND_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getCurrentTonPrice = async () => {
  try {
    const response = await axiosInstance.get("/current-ton-price");
    return response.data;
  } catch (err) {
    console.log("fetch current ton price: ", err);
  }
};

export const buyWithTon = async (data) => {
  try {
    const response = await axiosInstance.post("/buy-with-ton", data);
    return response.data;
  } catch (err) {
    console.log("buy with ton error: ", err);
  }
};
