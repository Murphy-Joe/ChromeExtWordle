export const getAndSendGuesses = () => {
  let storage = JSON.parse(localStorage.getItem("nyt-wordle-state"))
  const guesses = storage.boardState

  chrome.runtime.sendMessage({ guesses: guesses }, (response) => {
    console.log(`sent guesses: ${JSON.stringify(guesses)}`)
    // response here till bug fixed in chrome 102
  });

  return guesses;
}

export const fillInGuess = (guess) => {
  let storage = JSON.parse(localStorage.getItem("nyt-wordle-state"))
  const guesses = storage.boardState

  const rowNthChild = getRowNthChild(guesses)
  const selectedRow = getNthChildRow(rowNthChild)
  const gameTiles = getGameTiles(selectedRow)
  fillInTiles(gameTiles, "hello")

  function getRowNthChild(guesses) {
    let nth = 1
    guesses.forEach((guess) => {
      if (guess) nth += 1
    })
  }
  
  function getNthChildRow(nthChild) {
    const selectedRow = document.querySelector("body > game-app").shadowRoot.querySelector(`#board > game-row:nth-child(${nthChild})`)
    console.log(`selected row: ${selectedRow}`);
    return selectedRow;
  }

  function getGameTiles(selectedRow) {
    const tiles = selectedRow.shadowRoot.querySelector(".row").children
    console.log(`tiles: ${tiles}`);
    return tiles;
  }

  function fillInTiles(tiles, guess) {
    tiles.forEach((tile, idx) => {
      tile.setAttribute("letter", guess[idx])
    })
  }

}
