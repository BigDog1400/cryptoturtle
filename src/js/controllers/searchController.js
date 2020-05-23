import searchAllCryptos from "../models/SearchAllCoin";
import searchDataOfCurrency from "../models/SearchCoin";
import { elements, elementsStrings } from "../views/base";
import { renderResults, highlightResult } from "../views/searchView";
import * as resultView from "../views/resultView";

const state = {};

const controlSearch = async () => {
  if (state.currentGlobalCryptos.GlobalCryptos.length > 1) {
    const search = elements.inputSearchBox.value;
    const searchResults = state.currentGlobalCryptos.searchCoin(search);
    renderResults(searchResults);
    if (searchResults.length > 0) {
      state.currentCryptoSelected = elements.searchBoxResults.children[0].children[0];
      highlightResult(false, state.currentCryptoSelected);
      elements.searchBoxResults.querySelectorAll("li").forEach(eachResult => eachResult.addEventListener("mouseenter", controlChangeCryptoSelected));
      elements.searchBoxResults.querySelectorAll("li").forEach(eachResult => eachResult.addEventListener("click", controlGetCurrencyInformation));
    } else {
      state.currentCryptoSelected = false;
    }
  } else {
    if (state.delaySearch) {
      clearTimeout(state.delaySearch);
    }
    console.log("Buscando");
    state.delaySearch = setTimeout(controlSearch, 2000);
  }
};

const prepareSearchElements = async () => {
  // 1) Get the currents cryptos
  state.currentGlobalCryptos = new searchAllCryptos();
  //TODO: generar resolve and reject para generar avisos al usuario
  try {
    await state.currentGlobalCryptos.getAllCurrentsCryptos();
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};

const controlGetCurrencyInformation = async () => {
  if (state.currentCryptoSelected) {
    // Render Loading Spinner
    resultView.renderLoaderSpinner();
    state.currentSearch = new searchDataOfCurrency(state.currentCryptoSelected.dataset.id);
    try {
      await state.currentSearch.getData();
      console.log(state.currentSearch);
      resultView.renderResult(state.currentSearch.data);
    } catch (e) {
      console.log(`Error : ${e}`);
    }
    //Render results
  }
};

const controlConvertValue = (elementSelected, amount) => {
  const newValues = state.currentSearch.convertValue(elementSelected, amount);
  resultView.renderConversion(newValues, elementSelected);
};

const controlChangeCryptoSelected = () => {
  highlightResult(state.currentCryptoSelected ? state.currentCryptoSelected : false, event.target);
  //Change Current Selected Cryptocurrency
  state.currentCryptoSelected = event.target;
};

const startController = () => {
  //Habilitar caja de busqueda
  elements.inputSearchBox.addEventListener("keyup", () => {
    console.log(event.key);
    if (event.key === "Enter" || event.key === "Return") {
      controlGetCurrencyInformation();
    } else {
      controlSearch();
    }
  });
  //Habilitar convertidor de divisa
  elements.currencyDataResult.addEventListener("keyup", () => {
    if (event.target.matches(`.${elementsStrings.inputCurrencyOrigin}`) || event.target.matches(`.${elementsStrings.inputCurrencyDestiny}`)) {
      controlConvertValue(event.target.className, event.target.value);
    }
  });
  //Realizar consulta de todas las monedas para realizar sugerencias en busqueda
  prepareSearchElements();
};
startController();
