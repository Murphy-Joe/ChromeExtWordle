import { callApis } from '../api/apiCalls.js';

export function receiveGuessesAndCallApis() {
  chrome.runtime.onMessage.addListener((boardState, sender, sendResponse) => {
    sendResponse({ farewell: "goodbye" }) // here till bug fix in chrome 102
    if (boardState.guesses){
      callApis(boardState)
    }
    else {
      console.log('no changes');
    }
  });
}