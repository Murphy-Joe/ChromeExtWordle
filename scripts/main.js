import {addElementListeners} from './eventListeners/elementListeners.js';
import {callApis} from './api/apiCalls.js';
import {getGuesses, runGetGuessesAsContentScript} from './content/contentScript.js';

let lastGuessList = []

runGetGuessesAsContentScript()
addElementListeners();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (JSON.stringify(msg.guesses) !== JSON.stringify(lastGuessList)) {
    callApis(msg)
    lastGuessList = msg.guesses
  }
  else {
    console.log('no changes');
  }
  sendResponse({ farewell: "goodbye" }) // here till bug fix in chrome 102
});