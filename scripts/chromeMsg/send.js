import {getAndSendGuesses} from '../contentScripts/contentScript.js';

export function onStartupRunContentScriptToGetAndSendGuesses() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        // reminder: the following function may not call other functions
        function: getAndSendGuesses,
      });
    });
  }