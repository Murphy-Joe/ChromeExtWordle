export function executeContentScript(passedInFunction) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      // reminder: the following EXECUTION function may not call other functions
      function: passedInFunction
    });
  });
}

export const getGuessesAndSendBackToExtension = () => {
  let storage = JSON.parse(localStorage.getItem("nyt-wordle-state"))
  const guesses = storage.boardState

  chrome.runtime.sendMessage({ guesses: guesses }, (response) => {
    // console.log(`sent guesses: ${JSON.stringify(guesses)}`)
    // response here till bug fixed in chrome 102
  })
  
  return guesses;
}


export function receiveGuessSelectionAndPopulateTiles() {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    sendResponse({ farewell: "goodbye" }) // here till bug fix in chrome 102
    // console.log(`IM LISTENING! I was sent a message: ${JSON.stringify(msg)}`);
    if (msg.selectedGuess) {
      const game = document.querySelector("#game")
      for (let letter of msg.selectedGuess){
        game.dispatchEvent("game-key-press", {detail: {key: letter}})
      }
      // fillInGuess(msg.selectedGuess)
    }
  });


  function fillInGuess(guess) {
    let storage = JSON.parse(localStorage.getItem("nyt-wordle-state"))
    const guesses = storage.boardState
    const game = document.getElementById("game")


    // const rowIdx = getRowIdx(guesses)
    // const selectedRow = getNthChildRow(rowIdx)
    // fillInSelectedRow(selectedRow, guess)
    // const gameTiles = getGameTiles(selectedRow)
    // fillInTiles(gameTiles, guess)

    function dispatchGameKeyPressEvents(guess){
      for (let letter of guess){
        game.dispatchEvent("game-key-press", {detail: {key: letter}})
        // const gameKeyPressEvent = new KeyboardEvent("keydown", {
        //   bubbles: true,
        //   cancelable: true,
        //   key: letter
        // })
        // game.dispatchEvent(gameKeyPressEvent)
      }
    }

    function getRowIdx(guesses) {
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

    function fillInSelectedRow(selectedRow, guess) {
      selectedRow.setAttribute("letters", guess)
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