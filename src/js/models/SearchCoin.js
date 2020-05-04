//1. Import coingecko-api
const CoinGecko = require("coingecko-api");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
export default class Cryptocurrency {
  constructor(query) {
    this.query = query;
  }
  async getData(numberPage = 0) {
    try {
      const result = await CoinGeckoClient.coins.markets({ vs_currency: "usd", order: "market_cap_desc", per_page: "250", page: numberPage });
      if (result.length > 0) {
        console.log(result);
        this.getData(numberPage + 1);
      }
    } catch (e) {
      console.log(`Error ${e}`);
    } finally {
      console.log("Cryptocurrency information obtained");
    }
  }
}
