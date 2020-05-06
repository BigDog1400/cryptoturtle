import { elements } from "./base";
export const renderResults = resultsToRender => {
  if (resultsToRender.length > 0) {
    let htmlTemplate = `
            <ul class="search-box-result-list">
             
              ${resultsToRender
                .map(
                  (singleResult, index) => `
               <li class="result-list-element" data-result=${index} data-id=${singleResult.id}>
                <img src="${singleResult.image}" alt="${singleResult.name}" class="icon-result-list" /> <span class="cryptocurrency-result-list">${
                    singleResult.name
                  }(${singleResult.symbol.toUpperCase()})</span>
                <span class="rank-result-list">#${singleResult.market_cap_rank}</span>
              </li>
              `
                )
                .join("")}
            </ul>`;
    elements.searchBoxResults.innerHTML = htmlTemplate;
  } else {
    const htmlTemplate = `
    <ul class="search-box-result-list">
             
                 <li class="result-list-element" data-result="0">Nothing found 😔</li>
            </ul>`;
    elements.searchBoxResults.innerHTML = htmlTemplate;
  }
};

export const highlightResult = (oldHighlightedResult, resultToHighlight) => {
  if (oldHighlightedResult) {
    oldHighlightedResult.classList.remove("selected");
  }

  resultToHighlight.classList.add("selected");
};
