import { getAndSendGuesses, receiveGuessSelection } from '../content/contentScript.js';

export function executeApiCallsFromGuesses() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      // reminder: the following EXECUTION function may not call other functions
      function: getAndSendGuesses
    });
  });
}

export function executeGuessSelectionReceiver() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      // reminder: the following EXECUTION function may not call other functions
      function: receiveGuessSelection
    });
  });
}



export function sendMsgToContentScriptFillInGuess(guess) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { selectedGuess: guess }, (response) => {
      console.log(`sent selected guess: ${guess}`)
    }
    );
  });
}