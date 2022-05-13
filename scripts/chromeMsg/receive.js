export function receiveGuesses() {
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
}