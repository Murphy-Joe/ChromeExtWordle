import { callApis } from '../api/apiCalls.js';

let lastGuessList = []

export function receiveGuesses() {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.guesses && JSON.stringify(msg.guesses) !== JSON.stringify(lastGuessList)) {
      callApis(msg)
      lastGuessList = msg.guesses
    }
    else {
      console.log('no changes');
    }
    sendResponse({ farewell: "goodbye" }) // here till bug fix in chrome 102
  });
}

// export function receiveGuessToFillIn() {
//   chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//     if (msg.selectedGuess) {
//       fillInGuess(msg.selectedGuess)
//       sendResponse({ farewell: "goodbye" }) // here till bug fix in chrome 102
//     }
//   });
// }

export function receiveGuessSelection() {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    // sendResponse({ farewell: "goodbye" }) // here till bug fix in chrome 102
    console.log(`IM LISTENING! I was sent a message: ${JSON.stringify(msg)}`);
    if (msg.selectedGuess) {
      console.log('entered listening if');
      fillInGuess(msg.selectedGuess)
    }
  });

  function fillInGuess(guess) {
    console.log(`how the hell did I get here?`);
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
      console.log(selectedRow);
      return selectedRow;
    }

    function getGameTiles(selectedRow) {
      const tiles = selectedRow.shadowRoot.querySelector(".row").children
      console.log(tiles);
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