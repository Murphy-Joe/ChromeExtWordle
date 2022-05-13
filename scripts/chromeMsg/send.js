import { getAndSendGuesses } from '../contentScripts/contentScript.js';

// export function sendMsgToContentScript(passedInFunc) {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       // reminder: the following function may not call other functions
//       function: passedInFunc,
//     });
//   });
// }

export function sendMsgToContentScriptGetAndSendGuesses() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      // reminder: the following function may not call other functions
      function: getAndSendGuesses,
    });
  });
}

export function sendMsgToContentScriptFillInGuess(guess) {
  console.log(`I SENT A MESSAGE TO WITH A GUESS`);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { selectedGuess: guess }, (response) => { 
      console.log(`sent selected guess: ${guess}`)}
    );
  });
}