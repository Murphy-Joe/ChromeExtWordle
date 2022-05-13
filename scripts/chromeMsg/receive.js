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