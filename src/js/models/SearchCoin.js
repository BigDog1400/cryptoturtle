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
    } catch (e) {
      console.log(`Error: ${e}`);
    } finally {
      console.log("Cryptocurrency information obtained");
    }
  }
}
