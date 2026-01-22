import axios from "axios";

const API_URL = "http://localhost:5000/api/sales";

export const getSales = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addSale = async (sale) => {
  const res = await axios.post(API_URL, sale);
  return res.data;
};
