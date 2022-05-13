import {getGuesses} from '../contentScripts/contentScript.js';

export function onStartupRunContentScript() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: getGuesses,
      });
    });
  }