import {useContext} from "react";
import AppContext from "./context/appContext";
import {getTotals, getBenchmarkTotals} from "./utils";
import {
  ChartComponent,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Category,
} from "@syncfusion/ej2-react-charts";

const Results = () => {
  const appContext = useContext(AppContext);
  const {data, exchange_rates, exchange_rates_per_year} = appContext;

  let totalAmount, totalBenchmark, totalDifference;

  // If data, use helper function and calculate totals
  if (data) {
    totalAmount = getTotals(data.data.results).toFixed(2);
    totalBenchmark = getBenchmarkTotals(data.data.results).toFixed(2);
    totalDifference = totalAmount - totalBenchmark;
  }

  return (
    <section className="results">
      <h3 className="display-5">
        "Payment totals(2021-2024): {totalAmount ? <span>&euro;{totalAmount}</span> : ""}
      </h3>
      <h3 className="display-5">
        Benchmark totals(2021-2024): {totalBenchmark ? <span>&euro;{totalBenchmark}</span> : ""}
      </h3>
      <h3 className="display-5">
        Total benchmark difference(2021-2024):{" "}
        {totalDifference ? <span>&euro;{totalDifference.toFixed(2)}</span> : ""}
      </h3>
      <h3 className="display-5">
        Exchange rate:{" "}
        {exchange_rates_per_year?.data?.results[0]
          ? exchange_rates_per_year?.data?.results[0]?.exchange_rate
          : ""}
      </h3>

      <ChartComponent primaryXAxis={{valueType: "Category"}}>
        <Inject services={[LineSeries, Category]}></Inject>
        <SeriesCollectionDirective>
          {exchange_rates && (
            <SeriesDirective
              type="Line"
              dataSource={exchange_rates.data.exRates.exchange_rates}
              xName="year"
              yName="exchange_rate"
            ></SeriesDirective>
          )}
        </SeriesCollectionDirective>
      </ChartComponent>
    </section>
  );
};
export default Results;
