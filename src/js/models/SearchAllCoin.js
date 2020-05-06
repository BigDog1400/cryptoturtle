import Cryptocurrency from "./SearchCoin";
import { rejects } from "assert";

//1. Import coingecko-api
const CoinGecko = require("coingecko-api");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
export default class GlobalCryptos {
  constructor() {
    this.GlobalCryptos = [];
  }

  async getAllCurrentsCryptos(numberPage = 1) {
    if (numberPage === 1) {
      this.GlobalCryptos = [];
    }
    try {
      let result = await CoinGeckoClient.coins.markets({ vs_currency: "usd", order: "market_cap_desc", per_page: "250", page: numberPage });
      this.GlobalCryptos.push(...result.data);
      console.log(this.GlobalCryptos);
      if (result.data.length > 0) {
        await this.getAllCurrentsCryptos(numberPage + 1);
      }
    } finally {
      console.log("Information obtained");
    }
  }

  display() {
    console.log(this.GlobalCryptos);
  }

  searchCoin(nameToSearch) {
    const nameToSearchExp = new RegExp(`^${nameToSearch.toLowerCase()}`);
    let results = [];
    let currentCoinPosition = 0;
    const seekForCoin = () => {
      let count = 0;
      do {
        if (currentCoinPosition >= this.GlobalCryptos.length || results.length > 6) {
          console.log("Terminado la busqueda");
          break;
        }
        if (
          nameToSearchExp.test(this.GlobalCryptos[currentCoinPosition].name.toLowerCase()) ||
          nameToSearchExp.test(this.GlobalCryptos[currentCoinPosition].symbol.toLowerCase())
        ) {
          results.push(this.GlobalCryptos[currentCoinPosition]);
        }
        currentCoinPosition++;
        count++;
      } while (count < 500);
      if (count === 500) {
        setTimeout(seekForCoin);
      }
    };
    seekForCoin();
    return results;
  }
}
