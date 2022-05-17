export let wordsLeftTiles = document.querySelectorAll("#wordsLeft .tiles");
export let bestGuessTiles = document.querySelectorAll("#bestGuess .tiles");
export let bestLettersTiles = document.querySelectorAll("#bestLetters .tiles");


function appendIconToElem(iconClassName, elem) {
  const iconSpan = document.createElement("span");
    iconSpan.className = iconClassName;
    elem.appendChild(iconSpan);
}

function addLoadingBars(containerElem) {
  containerElem.forEach(tile => {
    tile.innerText = ""
    appendIconToElem("gg-loadbar-alt", tile);
  })
}

export function removeLoadingBars(containerElem) {
  containerElem.forEach(tile => { 
    const span = tile.querySelector("span");
    span.classList.remove("gg-loadbar-alt");
  })
}

export function addLoadingBarsToAllTiles() {
  addLoadingBars(wordsLeftTiles);
  addLoadingBars(bestGuessTiles);
  addLoadingBars(bestLettersTiles);
}


export function fillInWordsLeftTiles(resp) {
  wordsLeftTiles.forEach(tile => { tile.innerText = "" })
  let wordsLeftTilesIdx = 4;
  let digitsInAmtWordsLeft = resp.count.toString().length;
  for (let i = digitsInAmtWordsLeft; i > 0; i--) {
    wordsLeftTiles[wordsLeftTilesIdx].innerText = resp.count.toString()[i - 1]
    wordsLeftTilesIdx--;
  }
  appendIconToElem("gg-align-center", wordsLeftTiles.item(0));
}