import axios from "axios";

export const customFetch = axios.create({
  baseURL: "http://localhost:5000/",
});

export const getTotals = array => {
  const exchangeRate = 0.9157;
  let totalPrice = 0;
  array && array.map(obj => (totalPrice = totalPrice + obj.payment));
  return totalPrice * exchangeRate;
};

export const getBenchmarkTotals = array => {
  const exchangeRate = 0.9157;
  let totalBench = 0;
  array && array.map(obj => (totalBench = totalBench + obj.benchmark));
  return totalBench * exchangeRate;
};
