import { callApis } from '../api/apiCalls.js';

let lastGuessList = []

export function receiveGuesses() {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    sendResponse({ farewell: "goodbye" }) // here till bug fix in chrome 102
    if (msg.guesses && JSON.stringify(msg.guesses) !== JSON.stringify(lastGuessList)) {
      callApis(msg)
      lastGuessList = msg.guesses
    }
    else {
      console.log('no changes');
    }
  });
}

export function receiveGuessSelection() {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    sendResponse({ farewell: "goodbye" }) // here till bug fix in chrome 102
    console.log(`IM LISTENING! I was sent a message: ${JSON.stringify(msg)}`);
    if (msg.selectedGuess) {
      console.log('entered listening if');
      fillInGuess(msg.selectedGuess)
    }
  });
}