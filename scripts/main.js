import {addElementListeners} from './eventListeners/elementListeners.js';
import {callApis} from './api/apiCalls.js';
import {onStartupRunContentScript} from './chromeMsg/send.js';

let lastGuessList = []

onStartupRunContentScript()
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