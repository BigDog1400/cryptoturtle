import searchAllCryptos from "../models/SearchAllCoin";
import searchDataOfCurrency from "../models/SearchCoin";
import { elements } from "../views/base";
import { inherits } from "util";

const state = {};

const controlSearch = () => {
  if (state.currentGlobalCryptos.GlobalCryptos.length > 1) {
    const search = elements.inputSearchBox.value;
    state.currentGlobalCryptos.searchCoin(search);
  } else {
    console.log("Sin data");
  }
};

const prepareSearchElements = async () => {
  // 1) Get the currents cryptos
  state.currentGlobalCryptos = new searchAllCryptos();
  await state.currentGlobalCryptos.getAllCurrentsCryptos();
  console.log(state.currentGlobalCryptos);
  //   currentGlobalCryptos.display();
  // state.currentSearch = new searchDataOfCurrency("bssitcoin");
  // await state.currentSearch.getData();
  // console.log(state);
};

const startController = () => {
  //Habilitar caja de busqueda
  elements.inputSearchBox.addEventListener("keyup", controlSearch);
  //Realizar consulta de todas las monedas para realizar sugerencias en busqueda
  prepareSearchElements();
};
startController();
