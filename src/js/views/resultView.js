import { elements, elementsStrings } from "./base";
import imgSwapHorizontal from "../../img/swap-horizontal.svg";
import imgCopyOutline from "../../img/copy-outline.svg";

export const renderLoaderSpinner = () => {
  const htmlTemplate = ` <div class="loader-spinner">
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>`;
  elements.currencyDataResult.innerHTML = htmlTemplate;
};

const parseReposLinks = reposUrls => {
  let results = [];
  Object.entries(reposUrls).forEach(([key, urlArray]) => {
    if (urlArray.length > 0) {
      urlArray.forEach((url, index) => {
        if (index < 1) {
          results.push(`<a class="link-website" href="${url}">${parseGeneralLinks(url)}</a>`);
        }
      });
    }
    // results.push(`<a class="link-website" href="${url}">${url.match(/([^https://]|w{3}).[.a-zA-Z]+\w+/)[0]}</a>`);
  });
  results = results.join("");
  return results;
};

const formatterPercentage = new Intl.NumberFormat(navigator.language, { style: "unit", unit: "percent", signDisplay: "always", maximumFractionDigits: 2 });

const formatterPrice = new Intl.NumberFormat(
  navigator.language,
  { style: "currency", currency: "USD" },
  { minimumFractionDigits: 2, maximumFractionDigits: 2 }
);

const parseGeneralLinks = anyUrl => {
  const url = new URL(anyUrl);
  return `${url.hostname.match(/[^w{3}.].*/)}`;
};

export const renderConversion = (value, element) => {
  const boxResult = element === elementsStrings.inputCurrencyOrigin ? elementsStrings.inputCurrencyDestiny : elementsStrings.inputCurrencyOrigin;
  document.querySelector(`.${boxResult}`).value = value;
};

export const copyToClipboardConversion = (currentPrice, name, symbol) => {
  const el = document.createElement("textarea");
  const amountInCrypto = document.querySelector(`.${elementsStrings.inputCurrencyOrigin}`).value;
  const amountInFiat = document.querySelector(`.${elementsStrings.inputCurrencyDestiny}`).value;
  el.value = `${name}\nCurrent Price: ${currentPrice}$ \n${amountInCrypto} ${symbol} = ${formatterPrice.format(amountInFiat)}$`;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const renderResult = data => {
  const htmlTemplate = `
     <div class="currency__data">
        <div class="currency__data-general-info">
          <div class="basic-info-name">
            <img src="${data.image.large}" class="cryptocurrency-logo" alt="${data.name} logo" /> <span class="cryptocurrency-name"> ${data.name} </span
            ><span class="cryptocurrency-symbol">(${data.symbol.toUpperCase()})</span>
          </div>
          <div class="currency__data-detailed-info">
            <table class="currency-general-info">
              <tbody>
                <tr>
                  <th>Market Cap</th>
                  <td>Rank #${data.market_cap_rank}</td>
                </tr>
                <tr>
                  <th>Website</th>
                  <td>${data.links.homepage
                    .map(url => {
                      if (url) {
                        return `<a class="link-website" href="${url}">${parseGeneralLinks(url)}</a>`;
                      }
                    })
                    .join("")}</td>
                </tr>
                <tr>
                  <th>Explorers</th>
                     <td>${data.links.blockchain_site
                       .map((url, index) => {
                         if (url.length > 0 && index < 3) {
                           return `<a class="link-website" href="${url}">${parseGeneralLinks(url)}</a>`;
                         }
                       })
                       .join("")}</td>
                </tr>
                <tr>
                  <th>Source Code</th>
                  <td>${parseReposLinks(data.links.repos_url)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="currency__data-prices-info">
          <div class="currency__data-price">
            <span>Price</span>
            <span class="data-current-price">
              ${formatterPrice.format(data.market_data.current_price.usd)}
            </span>
            <span class="data-price-changes-24h ${data.market_data.price_change_percentage_24h > 0 ? "bullish" : "bear"}">
              (${formatterPercentage.format(data.market_data.price_change_percentage_24h)})
            </span>
          </div>
          <table class="market-data">
            <tbody>
              <tr>
                <th>Market Cap</th>
                <td>$${new Intl.NumberFormat().format(data.market_data.market_cap.usd)} USD</td>
              </tr>
              <tr>
                <th>Volume (24h)</th>
                <td>$${new Intl.NumberFormat().format(data.market_data.total_volume.usd)} USD</td>
              </tr>
              <tr>
                <th>Circulating Supply</th>
                <td>${new Intl.NumberFormat().format(data.market_data.circulating_supply)} ${data.name}</td>
              </tr>
              <tr>
                <th>Max Supply</th>
                <td>${data.market_data.total_supply === null ? "∞" : new Intl.NumberFormat().format(data.market_data.total_supply)}  ${data.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="currency-calculator">
      <div class="currency-calculator-container">
        <span class="symbol-origin">${data.symbol.toUpperCase()}</span> <input type="number" class="currency-origin-input" /> </div>
        <img class="swap-icon" src="${imgSwapHorizontal}"/>
        <div class="currency-calculator-container">
        <span class="symbol-destiny">USD</span>
        <input class="currency-destiny-input" type="number" /> </div>
          <img class="copy-icon" src="${imgCopyOutline}" title="Copy" alt="Copy" />

      </div>
      <div class="currency__data-prices-changes">
        <span>Last Changes:</span>
        <table class="market-changes">
          <tbody>
            <tr>
              <th>24h:</th>
              <td class="${data.market_data.price_change_percentage_24h > 0 ? "bullish" : "bear"}" >${formatterPercentage.format(
    data.market_data.price_change_percentage_24h
  )}</td>
            </tr>
            <tr>
              <th>7d:</th>
               <td class="${data.market_data.price_change_percentage_7d > 0 ? "bullish" : "bear"}">${formatterPercentage.format(
    data.market_data.price_change_percentage_7d
  )}</td>
            </tr>
            <tr>
              <th>14d:</th>
        <td class="${data.market_data.price_change_percentage_14d > 0 ? "bullish" : "bear"}">${formatterPercentage.format(
    data.market_data.price_change_percentage_14d
  )}</td>
             </tr>
          </tbody>
        </table>
      </div>
`;
  elements.currencyDataResult.innerHTML = htmlTemplate;
};

export const rendertListResult = data => {
  document.querySelector(`.${elementsStrings.currencyListBody}`).innerHTML = "";
  const htmlTemplate = `
    ${data
      .map(
        data => ` <tr class="currency_list-result">
              <td>${data.market_cap_rank}</td>
              <td><img  class="icon-result-list" src="${data.image}"> ${data.name}</td>
              <td>${data.symbol}</td>
              <td>${formatterPrice.format(data.current_price)}</td>
              <td class="${data.price_change_percentage_24h > 0 ? "bullish" : "bear"}">${formatterPercentage.format(data.price_change_percentage_24h)}</td>
              <td>${new Intl.NumberFormat().format(data.circulating_supply)} ${data.symbol.toUpperCase()}</td>
              <td>${data.total_supply === null ? "∞" : new Intl.NumberFormat().format(data.total_supply)} ${data.symbol.toUpperCase()}</td>
            </tr>`
      )
      .join("")}
  `;
  document.querySelector(`.${elementsStrings.currencyListBody}`).innerHTML = htmlTemplate;
};
