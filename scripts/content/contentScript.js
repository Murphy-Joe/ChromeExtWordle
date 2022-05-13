export const getAndSendGuesses = () => {
  let storage = JSON.parse(localStorage.getItem("nyt-wordle-state"))
  const guesses = storage.boardState

  chrome.runtime.sendMessage({ guesses: guesses }, (response) => {
    console.log(`sent guesses: ${JSON.stringify(guesses)}`)
    // response here till bug fixed in chrome 102
  })
  
  return guesses;
}


export function receiveGuessSelection() {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    sendResponse({ farewell: "goodbye" }) // here till bug fix in chrome 102
    console.log(`IM LISTENING! I was sent a message: ${JSON.stringify(msg)}`);
    if (msg.selectedGuess) {
      fillInGuess(msg.selectedGuess)
    }
  });
  function fillInGuess(guess) {
    let storage = JSON.parse(localStorage.getItem("nyt-wordle-state"))
    const guesses = storage.boardState

    const rowNthChild = getRowNthChild(guesses)
    const selectedRow = getNthChildRow(rowNthChild)
    const gameTiles = getGameTiles(selectedRow)
    fillInTiles(gameTiles, guess)

    function getRowNthChild(guesses) {
      let nth = 1
      guesses.forEach((guess) => {
        if (guess) nth += 1
      })
      return nth;
    }

    function getNthChildRow(nthChild) {
      const selectedRow = document.querySelector("body > game-app").shadowRoot.querySelector(`#board > game-row:nth-child(${nthChild})`)
      return selectedRow;
    }

    function getGameTiles(selectedRow) {
      const tiles = selectedRow.shadowRoot.querySelector(".row").children
      return tiles;
    }

    function fillInTiles(tiles, guess) {
      let idx = 0
      for (let tile of tiles) {
        tile.setAttribute("letter", guess[idx])
        idx += 1
      }
    }
  }
}