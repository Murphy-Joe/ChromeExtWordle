import {addEventListeners} from './eventListeners/listeners.js';
import {callApis} from './api/apiCalls.js';
import {getGuesses} from './content/contentScript.js';

let lastGuessList = []

function runContentScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // command to execute a content script
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getGuesses,

    });
  });
}

runContentScript()
addEventListeners();
let refresh = document.getElementById("refresh");
refresh.addEventListener("click", runContentScript)


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