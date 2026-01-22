import axios from "axios";

const API_URL = "http://localhost:5000/api/purchases";

export const getPurchases = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addPurchase = async (purchase) => {
  const res = await axios.post(API_URL, purchase);
  return res.data;
};
