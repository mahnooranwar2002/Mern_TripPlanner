const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

// Fetch real-time currency list
app.get("/api/currencies", async (req, res) => {
  try {
    const response = await axios.get("https://api.exchangerate.host/symbols");
    res.json(response.data.symbols); // returns live list
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch currency list" });
  }
});

// Convert currency
app.get("/api/convert", async (req, res) => {
  const { from, to, amount } = req.query;
  try {
    const response = await axios.get(
      `https://api.exchangerate.host/latest?base=${from}&symbols=${to}`
    );
    const rate = response.data.rates[to];
    const converted = (amount * rate).toFixed(2);
    res.json({ from, to, amount, rate, converted });
  } catch (error) {
    res.status(500).json({ error: "Conversion failed" });
  }
});