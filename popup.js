// Initialize butotn with users's prefered color
function runContentScript() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getGuesses,
  
    });
  });
}
let changeColor = document.getElementById("changeColor");
changeColor.addEventListener("click", runContentScript)

runContentScript()

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.guesses !== "hello")
      sendResponse({farewell: "goodbye"});
  }
);

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});


// The body of this function will be execuetd as a content script inside the
// current page
function getGuesses() {
  let storage = JSON.parse(localStorage.getItem("nyt-wordle-state"))
  const guesses = JSON.stringify(storage.boardState)

  chrome.runtime.sendMessage({guesses: guesses }, function(response) {
    console.log(`sent guesses: ${guesses}`);
    console.log(`got response: ${response.farewell}`);
  });

  chrome.storage.sync.set({guesses: guesses }, function() {
    console.log('Value is set to ' + guesses);
  });

  return guesses;
}
