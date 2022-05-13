import {addEventListeners} from './eventListeners/listeners.js';
import {callApis} from './api/apiCalls.js';
import {onStartupRunContentScript} from './chromeMsg/send.js';

let lastGuessList = []

onStartupRunContentScript()
addEventListeners();
let refresh = document.getElementById("refresh");
refresh.addEventListener("click", onStartupRunContentScript)


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