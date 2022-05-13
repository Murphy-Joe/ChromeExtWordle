export function sendMsgToContentScript(passedInFunc) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          // reminder: the following function may not call other functions
          function: passedInFunc,
        });
      });
}