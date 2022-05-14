import { callApis } from '../api/apiCalls.js';

let lastGuessList = []

export function receiveGuessesAndCallApis() {
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