import React, {useReducer} from "react";
import axios from "axios";

import AppContext from "./appContext";
import appReducer from "./appReducer";

import {
  POST_PROVIDER,
  GET_EXCHANGE_RATES,
  GET_EXCHANGE_RATES_PER_YEAR,
  PROVIDER_ERROR,
  GET_EXCHANGE_RATES_ERROR,
  GET_EXCHANGE_RATES_PER_YEAR_ERROR,
} from "../actions";

// Initial state
const AppState = props => {
  const initialState = {
    data: "",
    exchange_rates: "",
    exchange_rates_per_year: "",
    isLoading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  // Send provider to server
  const postProvider = async provider => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("http://localhost:5000/product_benchmarks", {provider}, config);

      dispatch({
        type: POST_PROVIDER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROVIDER_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Get chart
  const getChart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/exchange_rates");

      dispatch({
        type: GET_EXCHANGE_RATES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_EXCHANGE_RATES_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
  // Get exchange rate per year
  const getChartPerYear = async year => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(year);
    try {
      const res = await axios.post("http://localhost:5000/exchange_rates", year, config);

      dispatch({
        type: GET_EXCHANGE_RATES_PER_YEAR,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_EXCHANGE_RATES_PER_YEAR_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        data: state.data,
        exchange_rates: state.exchange_rates,
        exchange_rates_per_year: state.exchange_rates_per_year,
        isLoading: state.isLoading,
        error: state.error,
        postProvider,
        getChart,
        getChartPerYear,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export default AppState;
