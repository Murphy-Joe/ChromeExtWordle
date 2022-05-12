import {addEventListeners} from './eventListeners/listeners.js';
import {callApis} from './api/apiCalls.js';

let lastGuessList = []

function getGuesses() {
  let storage = JSON.parse(localStorage.getItem("nyt-wordle-state"))
  const guesses = storage.boardState

  chrome.runtime.sendMessage({ guesses: guesses }, (response) => {
    console.log(`sent guesses: ${JSON.stringify(guesses)}`)
    // response here till bug fixed in chrome 102
  });

  return guesses;
}

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