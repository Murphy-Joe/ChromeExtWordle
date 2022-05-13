let wordsLeftTiles = document.querySelectorAll("#wordsLeft .tiles");

export function fillInWordsLeftTiles(resp) {
  wordsLeftTiles.forEach(tile => { tile.innerText = "" })
  let wordsLeftTilesIdx = 4;
  let digitsInAmtWordsLeft = resp.count.toString().length;
  for (let i = digitsInAmtWordsLeft; i > 0; i--) {
    wordsLeftTiles[wordsLeftTilesIdx].innerText = resp.count.toString()[i - 1]
    wordsLeftTilesIdx--;
  }
}

export function loadingWordsLeftTiles() {
  wordsLeftTiles.forEach(tile => {
    tile.innerText = ""
    let iconSpan = document.createElement("span");
    iconSpan.className = "gg-loadbar";
    tile.appendChild(iconSpan);
  }
  )
}