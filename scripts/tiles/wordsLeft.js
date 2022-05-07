let wordsLeftTiles = document.querySelectorAll("#wordsLeft .tiles");

function fillInWordsLeftTiles(resp) {
  wordsLeftTiles.forEach(tile => { tile.innerText = "" })
  let wordsLeftTilesIdx = 4;
  let digitsInAmtWordsLeft = resp.count.toString().length;
  for (let i = digitsInAmtWordsLeft; i > 0; i--) {
    wordsLeftTiles[wordsLeftTilesIdx].innerText = resp.count.toString()[i - 1]
    wordsLeftTilesIdx--;
  }
}