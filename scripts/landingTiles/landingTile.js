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
  let lastDigitIdx = resp.count.toString().length - 1;
  for (let i = 4; i > 0; i--) {
    if (lastDigitIdx >= 0) {
      wordsLeftTiles[i].innerText = resp.count.toString()[lastDigitIdx]
    }
    else {
      wordsLeftTiles.item(i).classList.remove("green-tile");
      wordsLeftTiles.item(i).classList.add("light-gray-tile");
    }
    lastDigitIdx--;
  }
  appendIconToElem("gg-align-center", wordsLeftTiles.item(0));
}

export function fillInBestGuessTiles(resp) {
  bestGuessTiles.forEach(tile => { tile.innerText = "" })
  const bestGuessScore = Math.ceil(resp[0][1])
  console.log(bestGuessScore);
  let lastDigitIdx = bestGuessScore.toString().length - 1;
  for (let i = 4; i > 0; i--) {
    if (lastDigitIdx >= 0) {
      bestGuessTiles[i].innerText = bestGuessScore.toString()[lastDigitIdx]
    }
    else {
      bestGuessTiles.item(i).classList.remove("yellow-tile");
      bestGuessTiles.item(i).classList.add("light-gray-tile");
    }
    lastDigitIdx--;
  }
  appendIconToElem("gg-calculator", bestGuessTiles.item(0));
}

export function fillInBestLettersTiles(resp) {
  appendIconToElem("abc", bestLettersTiles.item(0));
}