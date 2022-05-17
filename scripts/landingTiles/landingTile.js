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
  const bestGuessScore = Math.round(resp[0][1])
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
  const entries = Object.entries(resp)
  const numLetters = entries.length;
  bestLettersTiles.forEach(tile => { tile.innerText = "" })
  let lastDigitIdx = numLetters.toString().length - 1;
  for (let i = 4; i > 0; i--) {
    if (lastDigitIdx >= 0) {
      bestLettersTiles[i].innerText = numLetters.toString()[lastDigitIdx]
    }
    else {
      bestLettersTiles.item(i).classList.remove("gray-tile");
      bestLettersTiles.item(i).classList.add("light-gray-tile");
    }
    lastDigitIdx--;
  }
  appendIconToElem("abc", bestLettersTiles.item(0));
}