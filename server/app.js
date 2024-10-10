const express = require("express");
const fs = require("fs");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// Read data
const prodBenchmarks = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/product-benchmarks.json`, "utf-8")
);
const exRates = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/exchange-rates.json`, "utf-8"));

// POST PROVIDER
const postProvider = (req, res) => {
  console.log(req.body);
  const {provider} = req.body;
  console.log(provider);

  if (!provider) {
    res.status(400).json({msg: "please provider name"});
    return;
  }

  // Find provider that matches the query
  const {product_benchmarks} = prodBenchmarks;
  const results = product_benchmarks.filter(obj => obj.provider_name === provider);
  console.log(results);

  res.json({
    status: "success",
    results: prodBenchmarks.length,
    data: {
      results,
    },
  });
};

// GET CHART
const getExchangeRates = (req, res) => {
  res.status(200).json({
    status: "success",
    results: exRates.length,
    data: {
      exRates,
    },
  });
};

// POST YEARS RATE
const postYearsRate = (req, res) => {
  const {year} = req.body;
  let yearNum = parseInt(year, 10);

  if (!year) {
    res.status(400).json({msg: "please provider year"});
    return;
  }

  // Find provider that matches the query
  const {exchange_rates} = exRates;
  console.log(exchange_rates);
  const results = exchange_rates.filter(obj => obj.year === yearNum);
  console.log(results);

  res.json({
    status: "success",
    results: exRates.length,
    data: {
      results,
    },
  });
};

// Routes
app.route("/product_benchmarks").post(postProvider);
app.route("/exchange_rates").post(postYearsRate);
app.route("/exchange_rates").get(getExchangeRates);

const port = 5000;

// Start server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
