export function sendMsgToContentScriptFillInGuess(guess) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { selectedGuess: guess }, (response) => {
      console.log(`sent selected guess: ${guess}`)
    }
    );
  });
}