import { callApis } from '../api/apiCalls.js';

export function receiveGuessesAndCallApis() {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    sendResponse({ farewell: "goodbye" }) // here till bug fix in chrome 102
    if (msg.storage){
      callApis(msg)
    }
    else {
      console.log('did not call APIs');
    }
  });
}