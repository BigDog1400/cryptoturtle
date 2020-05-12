import { elements } from "./base";
import Cryptocurrency from "../models/SearchCoin";
import { parse } from "querystring";

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

const parseGeneralLinks = anyUrl => {
  const url = new URL(anyUrl);
  return `${url.hostname.match(/[^w{3}.].*/)}`;
};

export const renderResult = data => {
  const htmlTemplate = `
     <div class="currencie__data">
        <div class="currencie__data-general-info">
          <div class="basic-info-name">
            <img src="${data.image.large}" class="cryptocurrencie-logo" alt="${data.name} logo" /> <span class="cryptocurrencie-name"> ${data.name} </span
            ><span class="cryptocurrencie-symbol">(${data.symbol.toUpperCase()})</span>
          </div>
          <div class="currencie__data-detailed-info">
            <table class="currencie-general-info">
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

        <div class="currencie__data-prices-info">
          <div class="currencie__data-price">
            <span>Price</span>
            <span class="data-current-price">
              $${data.market_data.current_price.usd.toString().replace(".", ",")}
            </span>
            <span class="data-price-changes-24h ${data.market_data.price_change_percentage_24h > 0 ? "bullish" : "bear"}">
              (${data.market_data.price_change_percentage_24h.toString().slice(0, 5)}%)
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
                <td>${new Intl.NumberFormat().format(data.market_data.total_supply)}  ${data.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="currencie-calculadora">
        <span class="symbol-origin">Bitcoin</span> <input type="text" class="currencie-origin-input" />
        <img class="swap-icon" src="./imgs/swap-horizontal.svg" alt="" />
        <span class="symbol-destiny">USD</span>
        <input class="currencie-destiny-input" type="text" />
      </div>
      <div class="currencie__data-prices-changes">
        <span>Last Changes:</span>
        <table class="market-changes">
          <tbody>
            <tr>
              <th>24h:</th>
              <td class="${data.market_data.price_change_percentage_24h > 0 ? "bullish" : "bear"}" >${new Intl.NumberFormat().format(
    data.market_data.price_change_percentage_24h
  )}%</td>
            </tr>
            <tr>
              <th>7d:</th>
               <td class="${data.market_data.price_change_percentage_7d > 0 ? "bullish" : "bear"}">${new Intl.NumberFormat().format(
    data.market_data.price_change_percentage_7d
  )}%</td>
            </tr>
            <tr>
              <th>14d:</th>
          <td class="${data.market_data.price_change_percentage_14d > 0 ? "bullish" : "bear"}">${new Intl.NumberFormat().format(
    data.market_data.price_change_percentage_14d
  )}%</td>
             </tr>
          </tbody>
        </table>
      </div>
`;
  elements.currencieDataResult.innerHTML = htmlTemplate;
};
/*
asset_platform_id: null
block_time_in_minutes: 10
categories: ["Cryptocurrency"]
coingecko_rank: 1
coingecko_score: 90.107
community_data: {facebook_likes: 0, twitter_followers: 68739, reddit_average_posts_48h: 6.583, reddit_average_comments_48h: 373.667, reddit_subscribers: 1404977, …}
community_score: 84.75
country_origin: ""
description: {en: "Bitcoin is the first successful internet money bas…kitties-need-1-billion-on-eos">CryptoKitties</a>.", de: "Bitcoin is the first successful internet money bas…kitties-need-1-billion-on-eos">CryptoKitties</a>.", es: "Bitcoin is the first successful internet money bas…kitties-need-1-billion-on-eos">CryptoKitties</a>.", fr: "Bitcoin is the first successful internet money bas…kitties-need-1-billion-on-eos">CryptoKitties</a>.", it: "Bitcoin is the first successful internet money bas…kitties-need-1-billion-on-eos">CryptoKitties</a>.", …}
developer_data: {forks: 25669, stars: 43195, subscribers: 3494, total_issues: 5402, closed_issues: 4831, …}
developer_score: 98.726
genesis_date: "2009-01-03"
hashing_algorithm: "SHA-256"
id: "bitcoin"
image: {thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579", small: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579", large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"}
last_updated: "2020-05-07T14:39:32.998Z"
links: {homepage: Array(3), blockchain_site: Array(5), official_forum_url: Array(3), chat_url: Array(3), announcement_url: Array(2), …}
liquidity_score: 99.797
localization: {en: "Bitcoin", de: "Bitcoin", es: "Bitcoin", fr: "Bitcoin", it: "Bitcoin", …}
market_cap_rank: 1
market_data: {current_price: {…}, roi: null, ath: {…}, ath_change_percentage: {…}, ath_date: {…}, …}
name: "Bitcoin"
public_interest_score: 42.787
public_interest_stats: {alexa_rank: 11039, bing_matches: 91100000}
sentiment_votes_down_percentage: 15.82
sentiment_votes_up_percentage: 84.18
status_updates: []
symbol: "btc"
tickers: (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
__proto__: Object
query: "bitcoin"
__proto__: Object

*/
