import {useContext, useState} from "react";
import AppContext from "./context/appContext";

const Form = () => {
  const appContext = useContext(AppContext);
  const {postProvider, getChart, getChartPerYear} = appContext;

  const [provider, setProvider] = useState("");
  const [year, setYear] = useState("");

  // Get form values
  const onChangeProvider = e => {
    setProvider(e.target.value);
  };
  const onChangeYear = e => {
    setYear({[e.target.name]: e.target.value});
  };

  const onSubmitProvider = e => {
    e.preventDefault();
    postProvider(provider);
  };

  const onSubmitYear = () => {
    console.log(year);
    getChartPerYear(year);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg">
          <form onSubmit={onSubmitProvider}>
            <label className="display-6 my-2" htmlFor="provider">
              Provider
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="provider"
              onChange={onChangeProvider}
            >
              <option defaultValue>Enter Provider</option>
              <option value="Market Data Inc.">MarketData Inc.</option>
              <option value="Telecomms">Telecomms</option>
              <option value="SpeeData Corp">SpeeData Corp</option>
            </select>

            <button type="submit" className="btn btn-light w-50 my-5">
              Submit Provider
            </button>
          </form>
        </div>

        <div className="col-lg">
          <form>
            <label className="display-6 my-2" htmlFor="year">
              Enter year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              min="2020"
              max="2024"
              placeholder="Year"
              className="w-100 form-control"
              onChange={onChangeYear}
            />

            <button type="button" className="btn btn-info w-75 my-5" onClick={onSubmitYear}>
              Exchange rate per year
            </button>
            <button type="button" className="btn btn-info w-75 my-5" onClick={() => getChart()}>
              Get rates chart
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Form;
