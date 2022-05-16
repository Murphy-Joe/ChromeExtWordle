let wordsLeftTiles = document.querySelectorAll("#wordsLeft .tiles");
let bestGuessTiles = document.querySelectorAll("#bestGuess .tiles");

export function loadingWordsLeftTiles() {
  wordsLeftTiles.forEach(tile => {
    tile.innerText = ""
    const iconSpan = document.createElement("span");
    iconSpan.className = "gg-loadbar-alt";
    tile.appendChild(iconSpan);
  }
  )
}

export function fillInWordsLeftTiles(resp) {
  wordsLeftTiles.forEach(tile => { tile.innerText = "" })
  let wordsLeftTilesIdx = 4;
  let digitsInAmtWordsLeft = resp.count.toString().length;
  for (let i = digitsInAmtWordsLeft; i > 0; i--) {
    wordsLeftTiles[wordsLeftTilesIdx].innerText = resp.count.toString()[i - 1]
    wordsLeftTilesIdx--;
  }
}

export function loadingbestGuessTiles() {
  bestGuessTiles.forEach(tile => {
    const iconSpan = document.createElement("span");
    iconSpan.className = "gg-loadbar-alt";
    tile.appendChild(iconSpan);
  }
  )
}

export function fillInBestGuessTiles() {
  bestGuessTiles.forEach(tile => { 
    const span = tile.querySelector("span");
    span.classList.remove("gg-loadbar-alt");
  })
}

