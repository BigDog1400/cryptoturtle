import { elementsStrings } from "../views/base";

//1. Import coingecko-api
const CoinGecko = require("coingecko-api");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
export default class Cryptocurrency {
  constructor(query) {
    this.query = query;
  }
  async getData() {
    try {
      const result = await CoinGeckoClient.coins.fetch(this.query, {});
      this.data = result.data;
    } finally {
      console.log("Cryptocurrency information obtained");
    }
  }

  convertValue(element, amount) {
    const convertFrom = element === elementsStrings.inputCurrencyOrigin ? "crypto" : "fiat";
    if (convertFrom === "crypto") {
      return this.data.market_data.current_price.usd * amount;
    } else if (convertFrom === "fiat") {
      return amount / this.data.market_data.current_price.usd;
    }
  }
}
