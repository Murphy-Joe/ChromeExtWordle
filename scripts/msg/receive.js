import { callApis } from '../api/apiCalls.js';

export function receiveGuessesAndCallApis() {
  chrome.runtime.onMessage.addListener((storage, sender, sendResponse) => {
    sendResponse({ farewell: "goodbye" }) // here till bug fix in chrome 102
    if (storage.boardstate){
      callApis(storage)
    }
    else {
      console.log('no changes');
    }
  });
}