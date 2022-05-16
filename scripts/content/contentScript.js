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
      dispatchGameKeyPressEvent(msg.selectedGuess);
    }
  });

  function dispatchGameKeyPressEvent(guess) {
    const game = document.querySelector("body > game-app").shadowRoot.querySelector("#game");
    for (let letter of guess) {
      const gameKeyPressEvent = new CustomEvent("game-key-press", {
        bubbles: true,
        cancelable: true,
        detail: {
          key: letter
        }
      });
      console.log(gameKeyPressEvent);
      game.dispatchEvent(gameKeyPressEvent);
    }
  }
}