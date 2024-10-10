import {POST_PROVIDER, GET_EXCHANGE_RATES, GET_EXCHANGE_RATES_PER_YEAR} from "../actions";

const appReducer = (state, action) => {
  switch (action.type) {
    case POST_PROVIDER:
      return {
        ...state,
        data: action.payload,
        error: false,
      };
    case GET_EXCHANGE_RATES:
      return {
        ...state,
        exchange_rates: action.payload,
        error: false,
      };
    case GET_EXCHANGE_RATES_PER_YEAR:
      return {
        ...state,
        exchange_rates_per_year: action.payload,
        error: false,
      };

    default:
      return state;
  }
};

export default appReducer;
